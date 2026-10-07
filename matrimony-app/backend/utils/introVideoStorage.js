const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const { Readable } = require('stream');
const { pipeline } = require('stream/promises');

const MIN_INTRO_VIDEO_SIZE = 1 * 1024 * 1024;
const MAX_INTRO_VIDEO_SIZE = 3 * 1024 * 1024 * 1024;
const VIDEO_CHUNK_SIZE = 512 * 1024;
const VIDEO_MIME_BY_EXTENSION = {
  '.3g2': 'video/3gpp2',
  '.3gp': 'video/3gpp',
  '.asf': 'video/x-ms-asf',
  '.avi': 'video/x-msvideo',
  '.divx': 'video/x-msvideo',
  '.f4v': 'video/x-f4v',
  '.flv': 'video/x-flv',
  '.m2t': 'video/mp2t',
  '.m2ts': 'video/mp2t',
  '.m2v': 'video/mpeg',
  '.m4v': 'video/x-m4v',
  '.mkv': 'video/x-matroska',
  '.mod': 'video/mpeg',
  '.mov': 'video/quicktime',
  '.mp4': 'video/mp4',
  '.mpe': 'video/mpeg',
  '.mpeg': 'video/mpeg',
  '.mpg': 'video/mpeg',
  '.mts': 'video/mp2t',
  '.ogv': 'video/ogg',
  '.ts': 'video/mp2t',
  '.vob': 'video/mpeg',
  '.webm': 'video/webm',
  '.wmv': 'video/x-ms-wmv',
  '.xvid': 'video/x-msvideo',
};

function createUploadError(message, status = 400, code = 'INVALID_VIDEO') {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}

function getSafeVideoName(fileName) {
  const name = path.basename(String(fileName || '').replace(/\\/g, '/')).trim();
  if (!name || name.length > 255 || name === '.' || name === '..') {
    throw createUploadError('This video format is not supported.');
  }
  const extension = path.extname(name).toLowerCase();
  if (!VIDEO_MIME_BY_EXTENSION[extension]) {
    throw createUploadError('This video format is not supported.');
  }
  return { name, extension };
}

function detectVideoFormat(header) {
  if (!Buffer.isBuffer(header)) header = Buffer.from(header || []);
  if (header.length >= 12 && header.toString('ascii', 4, 8) === 'ftyp') return 'isobmff';
  if (header.length >= 12 && header.toString('ascii', 0, 4) === 'RIFF' && header.toString('ascii', 8, 12) === 'AVI ') return 'avi';
  if (header.length >= 4 && header.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))) {
    const ebmlHeader = header.toString('ascii').toLowerCase();
    if (ebmlHeader.includes('webm')) return 'webm';
    if (ebmlHeader.includes('matroska')) return 'matroska';
    return 'ebml';
  }
  if (header.length >= 3 && header.toString('ascii', 0, 3) === 'FLV') return 'flv';
  if (header.length >= 16 && header.subarray(0, 16).equals(Buffer.from('3026b2758e66cf11a6d900aa0062ce6c', 'hex'))) return 'asf';
  if (header.length >= 4 && header[0] === 0 && header[1] === 0 && header[2] === 1 && [0xb3, 0xba, 0xb8].includes(header[3])) return 'mpeg';
  return null;
}

function isFormatCompatible(extension, format) {
  if (format === 'isobmff') return ['.mp4', '.mov', '.m4v', '.3gp', '.3g2'].includes(extension);
  if (format === 'avi') return ['.avi', '.divx', '.xvid'].includes(extension);
  if (format === 'matroska' || format === 'ebml') return ['.mkv', '.webm'].includes(extension);
  if (format === 'webm') return extension === '.webm';
  if (format === 'flv') return extension === '.flv';
  if (format === 'asf') return ['.asf', '.wmv'].includes(extension);
  if (format === 'mpeg') return ['.mpeg', '.mpg', '.mpe', '.m2v', '.vob', '.mod'].includes(extension);
  return false;
}

function validateVideoMetadata({ fileName, mimeType, fileSize, signature }) {
  const safe = getSafeVideoName(fileName);
  const size = Number(fileSize);
  if (!Number.isSafeInteger(size) || size < MIN_INTRO_VIDEO_SIZE) {
    throw createUploadError('Video must be at least 1 MB.', 400, 'VIDEO_TOO_SMALL');
  }
  if (size > MAX_INTRO_VIDEO_SIZE) {
    throw createUploadError('Video size must not exceed 3 GB.', 413, 'VIDEO_TOO_LARGE');
  }

  const normalizedMime = String(mimeType || '').split(';', 1)[0].trim().toLowerCase();
  if (/^(text\/|image\/|application\/(x-msdownload|x-executable|x-sh|x-bat|javascript|x-javascript|x-httpd-php))/.test(normalizedMime)) {
    throw createUploadError('This video format is not supported.');
  }

  const format = detectVideoFormat(signature);
  if (!format || !isFormatCompatible(safe.extension, format)) {
    throw createUploadError('This video format is not supported.');
  }

  return {
    fileName: safe.name,
    extension: safe.extension,
    fileSize: size,
    mimeType: VIDEO_MIME_BY_EXTENSION[safe.extension],
    format,
  };
}

function createUploadId() {
  return randomUUID();
}

async function assembleVideoChunks({ uploadDirectory, totalChunks, expectedSize, destinationPath }) {
  if (!Number.isInteger(totalChunks) || totalChunks < 1) {
    throw createUploadError('Invalid video chunk metadata.');
  }
  if (!Number.isSafeInteger(expectedSize) || expectedSize < MIN_INTRO_VIDEO_SIZE || expectedSize > MAX_INTRO_VIDEO_SIZE) {
    throw createUploadError(expectedSize > MAX_INTRO_VIDEO_SIZE ? 'Video size must not exceed 3 GB.' : 'Video must be at least 1 MB.', expectedSize > MAX_INTRO_VIDEO_SIZE ? 413 : 400, expectedSize > MAX_INTRO_VIDEO_SIZE ? 'VIDEO_TOO_LARGE' : 'VIDEO_TOO_SMALL');
  }

  let actualSize = 0;
  for (let index = 0; index < totalChunks; index += 1) {
    const chunkPath = path.join(uploadDirectory, `${index}.part`);
    let stats;
    try {
      stats = await fs.promises.stat(chunkPath);
    } catch {
      throw createUploadError('Video upload is incomplete. Please retry the missing chunk.', 409, 'VIDEO_CHUNK_MISSING');
    }
    actualSize += stats.size;
  }
  if (actualSize !== expectedSize) {
    throw createUploadError('Video upload is incomplete. Please retry the missing chunk.', 409, 'VIDEO_SIZE_MISMATCH');
  }

  async function* readChunks() {
    for (let index = 0; index < totalChunks; index += 1) {
      const chunkPath = path.join(uploadDirectory, `${index}.part`);
      for await (const chunk of fs.createReadStream(chunkPath)) yield chunk;
    }
  }

  try {
    await pipeline(Readable.from(readChunks()), fs.createWriteStream(destinationPath, { flags: 'wx' }));
  } catch (error) {
    await fs.promises.rm(destinationPath, { force: true }).catch(() => {});
    throw error;
  }

  const assembledSize = (await fs.promises.stat(destinationPath)).size;
  if (assembledSize !== expectedSize) {
    await fs.promises.rm(destinationPath, { force: true });
    throw createUploadError('Video upload is incomplete. Please retry the missing chunk.', 409, 'VIDEO_SIZE_MISMATCH');
  }
}

async function readVideoSignature(filePath) {
  const handle = await fs.promises.open(filePath, 'r');
  try {
    const buffer = Buffer.alloc(4096);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

async function cleanupExpiredVideoUploads(tempDirectory, permanentDirectory, isReferenced, maxAgeMs = 24 * 60 * 60 * 1000) {
  const cutoff = Date.now() - maxAgeMs;
  const tempEntries = await fs.promises.readdir(tempDirectory, { withFileTypes: true }).catch(() => []);
  for (const entry of tempEntries) {
    if (!entry.isDirectory()) continue;
    const entryPath = path.join(tempDirectory, entry.name);
    const stats = await fs.promises.stat(entryPath).catch(() => null);
    if (stats && stats.mtimeMs < cutoff) await fs.promises.rm(entryPath, { recursive: true, force: true });
  }

  const videoEntries = await fs.promises.readdir(permanentDirectory, { withFileTypes: true }).catch(() => []);
  for (const entry of videoEntries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    const metadataPath = path.join(permanentDirectory, entry.name);
    const stats = await fs.promises.stat(metadataPath).catch(() => null);
    if (!stats || stats.mtimeMs >= cutoff) continue;
    const videoPath = metadataPath.slice(0, -5);
    let metadata;
    try {
      metadata = JSON.parse(await fs.promises.readFile(metadataPath, 'utf8'));
    } catch {
      metadata = null;
    }
    if (isReferenced) {
      if (metadata && await isReferenced(metadata)) continue;
    } else if (metadata?.linked) {
      continue;
    }
    await fs.promises.rm(videoPath, { force: true });
    await fs.promises.rm(metadataPath, { force: true });
  }
}

module.exports = {
  MIN_INTRO_VIDEO_SIZE,
  MAX_INTRO_VIDEO_SIZE,
  VIDEO_CHUNK_SIZE,
  VIDEO_MIME_BY_EXTENSION,
  createUploadError,
  getSafeVideoName,
  validateVideoMetadata,
  createUploadId,
  assembleVideoChunks,
  readVideoSignature,
  cleanupExpiredVideoUploads,
};
