import api from './client';
import { File } from 'expo-file-system';
import type { Profile, ProfileMeta } from '@/types';

const VIDEO_CHUNK_SIZE = 512 * 1024;
const MIN_INTRO_VIDEO_SIZE = 1 * 1024 * 1024;
const MAX_INTRO_VIDEO_SIZE = 3 * 1024 * 1024 * 1024;
const VIDEO_EXTENSIONS = new Set([
  '.3g2', '.3gp', '.asf', '.avi', '.divx', '.f4v', '.flv', '.m2t', '.m2ts', '.m2v', '.m4v',
  '.mkv', '.mod', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mts', '.ogv', '.ts', '.vob',
  '.webm', '.wmv', '.xvid',
]);
const activeVideoUploads = new Map<string, string>();

type UploadProgress = (percent: number, uploadedBytes: number, totalBytes: number) => void;

function getVideoSignatureFormat(header: Uint8Array): string | null {
  const ascii = (start: number, end: number) => String.fromCharCode(...header.slice(start, end));
  if (header.length >= 12 && ascii(4, 8) === 'ftyp') return 'isobmff';
  if (header.length >= 12 && ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'AVI ') return 'avi';
  if (header.length >= 4 && header[0] === 0x1a && header[1] === 0x45 && header[2] === 0xdf && header[3] === 0xa3) {
    const marker = ascii(0, header.length).toLowerCase();
    return marker.includes('webm') ? 'webm' : marker.includes('matroska') ? 'matroska' : 'ebml';
  }
  if (header.length >= 3 && ascii(0, 3) === 'FLV') return 'flv';
  if (header.length >= 16 && Array.from(header.slice(0, 16)).map((byte) => byte.toString(16).padStart(2, '0')).join('') === '3026b2758e66cf11a6d900aa0062ce6c') return 'asf';
  if (header.length >= 4 && header[0] === 0 && header[1] === 0 && header[2] === 1 && [0xb3, 0xba, 0xb8].includes(header[3])) return 'mpeg';
  return null;
}

function isSignatureCompatible(extension: string, format: string | null) {
  if (format === 'isobmff') return ['.mp4', '.mov', '.m4v', '.3gp', '.3g2'].includes(extension);
  if (format === 'avi') return ['.avi', '.divx', '.xvid'].includes(extension);
  if (format === 'matroska' || format === 'ebml') return ['.mkv', '.webm'].includes(extension);
  if (format === 'webm') return extension === '.webm';
  if (format === 'flv') return extension === '.flv';
  if (format === 'asf') return ['.asf', '.wmv'].includes(extension);
  if (format === 'mpeg') return ['.mpeg', '.mpg', '.mpe', '.m2v', '.vob', '.mod'].includes(extension);
  return false;
}

function validateIntroVideo(name: string, mimeType: string, size: number, signature: Uint8Array) {
  if (size < MIN_INTRO_VIDEO_SIZE) throw new Error('Video must be at least 1 MB.');
  if (size > MAX_INTRO_VIDEO_SIZE) throw new Error('Video size must not exceed 3 GB.');
  const extension = name.slice(name.lastIndexOf('.')).toLowerCase();
  if (!VIDEO_EXTENSIONS.has(extension)) throw new Error('This video format is not supported.');
  if (/^(text\/|image\/|application\/(x-msdownload|x-executable|x-sh|x-bat|javascript|x-javascript|x-httpd-php))/i.test(mimeType)) {
    throw new Error('This video format is not supported.');
  }
  if (!isSignatureCompatible(extension, getVideoSignatureFormat(signature))) {
    throw new Error('This video format is not supported.');
  }
}

function videoUploadError(error: any): Error {
  const status = error?.response?.status;
  const responseMessage = error?.response?.data?.error || error?.response?.data?.message;
  if (status === 401) return new Error('Your session has expired. Please log in again.');
  if (responseMessage) return new Error(String(responseMessage));
  if (status >= 500) return new Error('Unable to upload the video right now. Please try again.');
  if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED' || !error?.response) {
    return new Error('Upload interrupted. Check your connection and try again.');
  }
  return new Error(error?.message || 'Unable to upload the video right now. Please try again.');
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function uploadIntroVideoTempFile(
  fileUri: string,
  fileName: string,
  onProgress?: UploadProgress,
  mimeType?: string | null,
): Promise<string> {
  const sourceFile = new File(fileUri);
  if (!sourceFile.exists) throw new Error('The selected video cannot be read. Please select it again.');
  const fileSize = sourceFile.size;
  const safeName = fileName || sourceFile.name;
  const resolvedMimeType = mimeType || sourceFile.type || '';
  if (fileSize < MIN_INTRO_VIDEO_SIZE) throw new Error('Video must be at least 1 MB.');
  if (fileSize > MAX_INTRO_VIDEO_SIZE) throw new Error('Video size must not exceed 3 GB.');
  const signature = new Uint8Array(await sourceFile.slice(0, 4096).arrayBuffer());
  validateIntroVideo(safeName, resolvedMimeType, fileSize, signature);

  const totalChunks = Math.ceil(fileSize / VIDEO_CHUNK_SIZE);
  const fingerprint = `${fileUri}|${safeName}|${fileSize}`;
  let uploadId = activeVideoUploads.get(fingerprint);
  if (!uploadId) {
    uploadId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
    activeVideoUploads.set(fingerprint, uploadId);
  }
  const metadataParams = { uploadId, totalChunks, fileName: safeName, fileSize, mimeType: resolvedMimeType };
  let receivedChunks = new Set<number>();
  try {
    const { data } = await api.get<{ receivedChunks: number[]; completedKey?: string }>(`/profiles/upload-status/${uploadId}`, {
      params: metadataParams,
      timeout: 20000,
    });
    if (data.completedKey) {
      activeVideoUploads.delete(fingerprint);
      onProgress?.(100, fileSize, fileSize);
      return data.completedKey;
    }
    receivedChunks = new Set(data.receivedChunks);
  } catch (error: any) {
    if (error?.response?.status !== 404) throw videoUploadError(error);
    activeVideoUploads.delete(fingerprint);
    uploadId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
    activeVideoUploads.set(fingerprint, uploadId);
    metadataParams.uploadId = uploadId;
  }

  let settledBytes = Array.from(receivedChunks).reduce((total, index) => {
    return total + Math.min(VIDEO_CHUNK_SIZE, fileSize - index * VIDEO_CHUNK_SIZE);
  }, 0);
  const activeChunkBytes = new Map<number, number>();
  const reportProgress = () => {
    const activeBytes = Array.from(activeChunkBytes.values()).reduce((total, value) => total + value, 0);
    const uploadedBytes = Math.min(fileSize, settledBytes + activeBytes);
    onProgress?.(Math.min(100, Math.floor((uploadedBytes / fileSize) * 100)), uploadedBytes, fileSize);
  };

  const uploadChunk = async (chunkIndex: number) => {
    if (receivedChunks.has(chunkIndex)) return;
    const start = chunkIndex * VIDEO_CHUNK_SIZE;
    const chunkBytes = Math.min(VIDEO_CHUNK_SIZE, fileSize - start);
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const formData = new FormData();
      formData.append('chunk', sourceFile.slice(start, start + chunkBytes, resolvedMimeType), safeName);
      try {
        await api.post('/profiles/upload-chunk', formData, {
          params: {
            uploadId,
            chunkIndex,
            totalChunks,
            fileName: safeName,
            fileSize,
            mimeType: resolvedMimeType,
          },
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 120000,
          maxBodyLength: VIDEO_CHUNK_SIZE + 64 * 1024,
          onUploadProgress: (event) => {
            activeChunkBytes.set(chunkIndex, Math.min(chunkBytes, event.loaded));
            reportProgress();
          },
        });
        activeChunkBytes.delete(chunkIndex);
        settledBytes += chunkBytes;
        reportProgress();
        return;
      } catch (error: any) {
        activeChunkBytes.delete(chunkIndex);
        reportProgress();
        const status = error?.response?.status;
        const retryable = !status || status === 408 || status === 429 || status >= 500;
        if (!retryable || attempt === 2) throw videoUploadError(error);
        await wait(500 * (attempt + 1));
      }
    }
  };

  let nextChunk = 0;
  const workers = Array.from({ length: Math.min(3, totalChunks) }, async () => {
    while (nextChunk < totalChunks) {
      const index = nextChunk;
      nextChunk += 1;
      await uploadChunk(index);
    }
  });

  try {
    const results = await Promise.allSettled(workers);
    const failedWorker = results.find((result) => result.status === 'rejected');
    if (failedWorker?.status === 'rejected') throw failedWorker.reason;
    const { data } = await api.post<{ temp_video_key: string }>('/profiles/upload-complete', {
      uploadId,
      totalChunks,
      fileName: safeName,
      fileSize,
      mimeType: resolvedMimeType,
    }, { timeout: 30 * 60 * 1000 });
    reportProgress();
    activeVideoUploads.delete(fingerprint);
    return data.temp_video_key;
  } catch (error) {
    const status = (error as any)?.response?.status;
    const code = (error as any)?.response?.data?.code;
    const canResume = !status || status === 408 || status === 429 || status >= 500 || code === 'VIDEO_CHUNK_MISSING' || code === 'VIDEO_SIZE_MISMATCH';
    if (!canResume) {
      await api.delete(`/profiles/upload-chunks/${uploadId}`, { timeout: 20000 }).catch(() => {});
      activeVideoUploads.delete(fingerprint);
    }
    throw error instanceof Error && !('response' in error)
      ? error
      : videoUploadError(error);
  }
}

export interface SearchParams {
  q?: string;
  gender?: 'M' | 'F';
  min_age?: number;
  max_age?: number;
  religion_id?: number;
  caste_id?: number;
  raasi_id?: number;
  star_id?: number;
  born_country_id?: string;
  current_country_id?: string;
  city_or_state?: string;
  income_range?: string;
  manglik_status?: string;
  page?: number;
  limit?: number;
}

export const profileApi = {
  async search(params: SearchParams = {}): Promise<Profile[]> {
    const { data } = await api.get<{ results: Profile[] }>('/profiles/search', { params });
    return data.results;
  },

  async getMeta(): Promise<ProfileMeta> {
    const { data } = await api.get<ProfileMeta>('/profiles/meta');
    return data;
  },

  async getById(id: number | string): Promise<Profile> {
    const { data } = await api.get<{ profile: Profile }>(`/profiles/${id}`);
    return data.profile;
  },

  async mine(): Promise<Profile[]> {
    const { data } = await api.get<{ profiles: Profile[] }>('/profiles/mine');
    return data.profiles;
  },

  async create(formData: FormData): Promise<Profile> {
    const { data } = await api.post<{ profile: Profile }>('/profiles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.profile;
  },

  async update(id: number | string, formData: FormData): Promise<Profile> {
    const { data } = await api.put<{ profile: Profile }>(`/profiles/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.profile;
  },

  async remove(id: number | string): Promise<void> {
    await api.delete(`/profiles/${id}`);
  },

  async uploadIntroVideo(id: number | string, formData: FormData): Promise<void> {
    await api.post(`/profiles/${id}/intro-video`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async uploadIntroVideoTemp(
    fileUri: string,
    fileName: string,
    mimeType?: string | null,
    onProgress?: UploadProgress,
  ): Promise<string> {
    return uploadIntroVideoTempFile(fileUri, fileName, onProgress, mimeType);
  },

  async linkIntroVideo(id: number | string, tempVideoKey: string, durationSecs: number): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        await api.post(`/profiles/${id}/intro-video`, {
          temp_video_key: tempVideoKey,
          duration_seconds: durationSecs,
        }, { timeout: 30000 });
        return;
      } catch (error: any) {
        const status = error?.response?.status;
        const retryable = !status || status === 408 || status === 429 || status >= 500;
        if (!retryable || attempt === 2) throw videoUploadError(error);
        await wait(500 * (attempt + 1));
      }
    }
  },

  async match(profileId1: number, profileId2: number) {
    const { data } = await api.post('/profiles/match', {
      profile_id_1: profileId1,
      profile_id_2: profileId2,
    });
    return data;
  },

  async lifestyleMatch(profileId1: number, profileId2: number) {
    const { data } = await api.post('/profiles/lifestyle-match', {
      profile_id_1: profileId1,
      profile_id_2: profileId2,
    });
    return data;
  },
};
