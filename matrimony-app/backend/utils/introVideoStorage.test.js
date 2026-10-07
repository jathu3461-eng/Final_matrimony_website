const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const {
  MIN_INTRO_VIDEO_SIZE,
  MAX_INTRO_VIDEO_SIZE,
  VIDEO_CHUNK_SIZE,
  validateVideoMetadata,
  assembleVideoChunks,
} = require('./introVideoStorage');

const mp4Signature = Buffer.concat([Buffer.alloc(4), Buffer.from('ftypisom')]);

function metadata(overrides = {}) {
  return {
    fileName: 'intro.mp4',
    mimeType: 'video/mp4',
    fileSize: MIN_INTRO_VIDEO_SIZE,
    signature: mp4Signature,
    ...overrides,
  };
}

test('accepts the 1 MB minimum and 3 GB maximum', () => {
  assert.equal(validateVideoMetadata(metadata()).fileSize, MIN_INTRO_VIDEO_SIZE);
  assert.equal(validateVideoMetadata(metadata({ fileSize: MAX_INTRO_VIDEO_SIZE })).fileSize, MAX_INTRO_VIDEO_SIZE);
});

test('rejects videos below 1 MB and above 3 GB with specific errors', () => {
  assert.throws(() => validateVideoMetadata(metadata({ fileSize: MIN_INTRO_VIDEO_SIZE - 1 })), /at least 1 MB/);
  assert.throws(() => validateVideoMetadata(metadata({ fileSize: MAX_INTRO_VIDEO_SIZE + 1 })), /must not exceed 3 GB/);
});

test('accepts supported containers using their file signature and fallback MIME', () => {
  const formats = [
    ['mp4', 'video/mp4', mp4Signature],
    ['mov', 'application/octet-stream', mp4Signature],
    ['m4v', 'video/x-m4v', mp4Signature],
    ['3gp', 'video/3gpp', mp4Signature],
    ['avi', 'video/x-msvideo', Buffer.from('RIFF0000AVI ')],
    ['mkv', 'application/octet-stream', Buffer.concat([Buffer.from([0x1a, 0x45, 0xdf, 0xa3]), Buffer.from('matroska')])],
    ['webm', 'video/webm', Buffer.concat([Buffer.from([0x1a, 0x45, 0xdf, 0xa3]), Buffer.from('webm')])],
    ['wmv', 'video/x-ms-wmv', Buffer.from('3026b2758e66cf11a6d900aa0062ce6c', 'hex')],
    ['flv', 'video/x-flv', Buffer.from('FLV')],
    ['mpeg', 'video/mpeg', Buffer.from([0, 0, 1, 0xba])],
    ['mpg', 'video/mpeg', Buffer.from([0, 0, 1, 0xb3])],
  ];

  for (const [extension, mimeType, signature] of formats) {
    assert.equal(
      validateVideoMetadata(metadata({ fileName: `intro.${extension}`, mimeType, signature })).extension,
      `.${extension}`,
    );
  }
});

test('rejects dangerous extensions and video-looking names with non-video signatures', () => {
  assert.throws(() => validateVideoMetadata(metadata({ fileName: 'payload.exe' })), /format is not supported/);
  assert.throws(() => validateVideoMetadata(metadata({ signature: Buffer.from('MZ executable') })), /format is not supported/);
  assert.throws(() => validateVideoMetadata(metadata({ mimeType: 'text/html' })), /format is not supported/);
});

test('streams numbered chunks to disk and rejects incomplete uploads', async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'intro-video-test-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const chunks = path.join(root, 'chunks');
  await fs.mkdir(chunks);
  const firstChunk = Buffer.alloc(VIDEO_CHUNK_SIZE, 0x11);
  const secondChunk = Buffer.alloc(MIN_INTRO_VIDEO_SIZE - VIDEO_CHUNK_SIZE, 0x22);
  await fs.writeFile(path.join(chunks, '0.part'), firstChunk);
  await fs.writeFile(path.join(chunks, '1.part'), secondChunk);

  const output = path.join(root, 'assembled.mp4');
  await assembleVideoChunks({
    uploadDirectory: chunks,
    totalChunks: 2,
    expectedSize: MIN_INTRO_VIDEO_SIZE,
    destinationPath: output,
  });
  assert.equal((await fs.stat(output)).size, MIN_INTRO_VIDEO_SIZE);
  assert.deepEqual((await fs.readFile(output)).subarray(0, 4), firstChunk.subarray(0, 4));
  assert.deepEqual((await fs.readFile(output)).subarray(-4), secondChunk.subarray(-4));

  await fs.rm(path.join(chunks, '1.part'));
  await assert.rejects(
    assembleVideoChunks({
      uploadDirectory: chunks,
      totalChunks: 2,
      expectedSize: MIN_INTRO_VIDEO_SIZE,
      destinationPath: path.join(root, 'incomplete.mp4'),
    }),
    /incomplete/,
  );
});
