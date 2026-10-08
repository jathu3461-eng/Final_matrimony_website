const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const { VIDEO_CHUNK_SIZE } = require('../utils/introVideoStorage');

const testUserId = 71001;
const testProfileId = 81001;
const testSecret = 'video-upload-route-test-secret';
let profile = {
  id: testProfileId,
  owner_user_id: testUserId,
  name: 'Video Test Profile',
  gender: 'F',
  date_of_birth: '1995-01-01',
  city_or_state: 'Toronto',
  username: 'video-test-user',
  email: 'video-test@example.test',
  intro_video_key: null,
  intro_video_status: null,
  intro_video_duration: null,
};

const mockDb = {
  async get() {
    return profile;
  },
  async all() {
    return profile.intro_video_key ? [profile] : [];
  },
  async run(sql, params) {
    if (sql.includes('intro_video_key = ?')) {
      [
        profile.intro_video_key,
        profile.intro_video_status,
        profile.intro_video_duration,
        profile.intro_video_original_name,
        profile.intro_video_size_bytes,
        profile.intro_video_mime_type,
      ] = params;
      profile.intro_video_uploaded_at = new Date();
    }
    return { changes: 1 };
  },
};

const dbPath = require.resolve('../db');
require.cache[dbPath] = {
  id: dbPath,
  filename: dbPath,
  loaded: true,
  exports: { db: mockDb, dbReady: Promise.resolve() },
};

const authPath = require.resolve('../middleware/auth');
require.cache[authPath] = {
  id: authPath,
  filename: authPath,
  loaded: true,
  exports: {
    JWT_SECRET: testSecret,
    requireAuth: (req, _res, next) => {
      req.user = { id: testUserId, role: 'admin' };
      next();
    },
    requireRole: () => (_req, _res, next) => next(),
    refreshAdminSession: () => {},
  },
};

const profileRoutes = require('./profiles');
const adminRoutes = require('./admin');
const app = express();
app.use(express.json());
app.use((req, _res, next) => {
  req.cookies = { auth_token: jwt.sign({ id: testUserId, role: 'admin' }, testSecret) };
  next();
});
app.use('/api/profiles', profileRoutes);
app.use('/api/admin', adminRoutes);

let server;
let baseUrl;
let uploadId;
let storageKey;
const requestHeaders = { Authorization: 'Bearer route-test-token' };
const videoBytes = Buffer.alloc(1024 * 1024, 0x22);
videoBytes.write('ftyp', 4, 'ascii');
videoBytes.write('isom', 8, 'ascii');
const fileName = 'intro.mp4';
const totalChunks = Math.ceil(videoBytes.length / VIDEO_CHUNK_SIZE);
const metadata = {
  fileName,
  fileSize: videoBytes.length,
  mimeType: 'video/mp4',
  totalChunks,
};

async function uploadChunk(index) {
  const start = index * VIDEO_CHUNK_SIZE;
  const end = Math.min(start + VIDEO_CHUNK_SIZE, videoBytes.length);
  const form = new FormData();
  form.append('chunk', new Blob([videoBytes.subarray(start, end)], { type: 'video/mp4' }), fileName);
  const query = new URLSearchParams({
    ...metadata,
    uploadId,
    chunkIndex: String(index),
  });
  return fetch(`${baseUrl}/api/profiles/upload-chunk?${query}`, {
    method: 'POST',
    headers: requestHeaders,
    body: form,
  });
}

test('authenticated video upload stores, links, lists, and range-streams a profile video', async (t) => {
  uploadId = randomUUID();
  profile = {
    id: testProfileId,
    owner_user_id: testUserId,
    name: 'Video Test Profile',
    gender: 'F',
    date_of_birth: '1995-01-01',
    city_or_state: 'Toronto',
    username: 'video-test-user',
    email: 'video-test@example.test',
    intro_video_key: null,
    intro_video_status: null,
    intro_video_duration: null,
  };
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => {
    if (server.listening) await new Promise((resolve) => server.close(resolve));
    const privateDirectory = path.join(__dirname, '..', 'private_uploads', 'intro_videos');
    const tempDirectory = path.join(__dirname, '..', 'private_uploads', 'temp_videos');
    if (storageKey) {
      await fs.rm(path.join(privateDirectory, storageKey), { force: true });
      await fs.rm(path.join(privateDirectory, `${storageKey}.json`), { force: true });
    }
    await fs.rm(path.join(tempDirectory, `${testUserId}-${uploadId}`), { recursive: true, force: true });
  });

  const statusUrl = new URL(`${baseUrl}/api/profiles/upload-status/${uploadId}`);
  for (const [key, value] of Object.entries(metadata)) statusUrl.searchParams.set(key, String(value));
  const initializedStatus = await fetch(statusUrl, { headers: requestHeaders });
  assert.equal(initializedStatus.status, 200);
  assert.deepEqual((await initializedStatus.json()).receivedChunks, []);

  const [firstChunk, secondChunk] = await Promise.all([uploadChunk(0), uploadChunk(1)]);
  assert.equal(firstChunk.status, 200, `first chunk: ${await firstChunk.text()}`);
  const retriedChunk = await uploadChunk(0);
  assert.equal(retriedChunk.status, 200, `retried chunk: ${await retriedChunk.text()}`);
  assert.equal(secondChunk.status, 200, `second chunk: ${await secondChunk.text()}`);

  const statusResponse = await fetch(statusUrl, { headers: requestHeaders });
  assert.equal(statusResponse.status, 200);
  assert.deepEqual((await statusResponse.json()).receivedChunks, [0, 1]);

  const finalize = await fetch(`${baseUrl}/api/profiles/upload-complete`, {
    method: 'POST',
    headers: { ...requestHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...metadata, uploadId }),
  });
  assert.equal(finalize.status, 200);
  const finalized = await finalize.json();
  storageKey = finalized.temp_video_key;
  assert.equal(finalized.metadata.fileSize, videoBytes.length);
  assert.equal(finalized.metadata.mimeType, 'video/mp4');
  assert.equal((await fs.stat(path.join(__dirname, '..', 'private_uploads', 'intro_videos', storageKey))).size, videoBytes.length);

  const completedStatus = await fetch(statusUrl, { headers: requestHeaders });
  assert.equal(completedStatus.status, 200);
  assert.equal((await completedStatus.json()).completedKey, storageKey);

  for (const [duration, expectedMessage] of [
    [29.9, 'Video must be at least 30 seconds long.'],
    [120.1, 'Video must not exceed 2 minutes.'],
  ]) {
    const invalidLink = await fetch(`${baseUrl}/api/profiles/${testProfileId}/intro-video`, {
      method: 'POST',
      headers: { ...requestHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ temp_video_key: storageKey, duration_seconds: duration }),
    });
    assert.equal(invalidLink.status, 400);
    assert.equal((await invalidLink.json()).error, expectedMessage);
    assert.equal(profile.intro_video_key, null);
  }

  const link = await fetch(`${baseUrl}/api/profiles/${testProfileId}/intro-video`, {
    method: 'POST',
    headers: { ...requestHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ temp_video_key: storageKey, duration_seconds: 90 }),
  });
  assert.equal(link.status, 200);
  assert.equal(profile.intro_video_key, storageKey);
  assert.equal(profile.intro_video_original_name, fileName);
  assert.equal(profile.intro_video_size_bytes, videoBytes.length);
  assert.equal(profile.intro_video_mime_type, 'video/mp4');

  const admin = await fetch(`${baseUrl}/api/admin/intro-videos/pending`, { headers: requestHeaders });
  assert.equal(admin.status, 200);
  const adminVideos = await admin.json();
  assert.equal(adminVideos.videos[0].intro_video_original_name, fileName);
  assert.equal(Number(adminVideos.videos[0].intro_video_size_bytes), videoBytes.length);

  const playback = await fetch(`${baseUrl}/api/profiles/${testProfileId}/intro-video-stream`, {
    headers: { ...requestHeaders, Range: 'bytes=0-7' },
  });
  assert.equal(playback.status, 206);
  assert.equal(playback.headers.get('accept-ranges'), 'bytes');
  assert.equal(playback.headers.get('content-type'), 'video/mp4');
  assert.equal((await playback.arrayBuffer()).byteLength, 8);
});
