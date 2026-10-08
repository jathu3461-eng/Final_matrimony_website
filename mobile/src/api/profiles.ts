import api from './client';
import * as FileSystem from 'expo-file-system/legacy';
import { API_BASE_URL } from './client';
import { tokenStorage } from '@/services/tokenStorage';
import type { Profile, ProfileMeta } from '@/types';

const VIDEO_CHUNK_SIZE = 512 * 1024;
const MIN_INTRO_VIDEO_SIZE = 1 * 1024 * 1024;
const MAX_INTRO_VIDEO_SIZE = 3 * 1024 * 1024 * 1024;
const VIDEO_EXTENSIONS = new Set([
  '.3g2', '.3gp', '.asf', '.avi', '.divx', '.f4v', '.flv', '.m2t', '.m2ts', '.m2v', '.m4v',
  '.mkv', '.mod', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mts', '.ogv', '.ts', '.vob',
  '.webm', '.wmv', '.xvid',
]);
const VIDEO_MIME_BY_EXTENSION: Record<string, string> = {
  '.3g2': 'video/3gpp2', '.3gp': 'video/3gpp', '.avi': 'video/x-msvideo', '.flv': 'video/x-flv',
  '.m4v': 'video/x-m4v', '.mkv': 'video/x-matroska', '.mov': 'video/quicktime', '.mp4': 'video/mp4',
  '.mpeg': 'video/mpeg', '.mpg': 'video/mpeg', '.webm': 'video/webm', '.wmv': 'video/x-ms-wmv',
};
const activeVideoUploads = new Map<string, string>();

type UploadProgress = (percent: number, uploadedBytes: number, totalBytes: number) => void;

function validateIntroVideo(name: string, mimeType: string, size: number) {
  if (size < MIN_INTRO_VIDEO_SIZE) throw new Error('Video must be at least 1 MB.');
  if (size > MAX_INTRO_VIDEO_SIZE) throw new Error('Video size must not exceed 3 GB.');
  const extension = name.slice(name.lastIndexOf('.')).toLowerCase();
  if (!VIDEO_EXTENSIONS.has(extension)) throw new Error('This video format is not supported.');
  if (/^(text\/|image\/|application\/(x-msdownload|x-executable|x-sh|x-bat|javascript|x-javascript|x-httpd-php))/i.test(mimeType)) {
    throw new Error('This video format is not supported.');
  }
}

function videoUploadError(error: any): Error {
  const status = error?.response?.status;
  const responseMessage = error?.response?.data?.error || error?.response?.data?.message;
  if (status === 401) return new Error('Your session has expired. Please log in again.');
  if (responseMessage) return new Error(String(responseMessage));
  if (status >= 500) return new Error('Unable to upload the video right now. Please try again.');
  if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') {
    return new Error('Upload interrupted. Check your connection and try again.');
  }
  if (!error?.response) {
    return new Error(`Upload Failed Local Error: ${error?.message || error || 'Unknown'}`);
  }
  return new Error(error?.message || 'Unable to upload the video right now. Please try again.');
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildChunkUrl(metadata: Record<string, string | number>, chunkIndex: number) {
  const query = new URLSearchParams({ ...metadata, chunkIndex: String(chunkIndex) }).toString();
  return `${API_BASE_URL.replace(/\/$/, '')}/profiles/upload-chunk?${query}`;
}

function parseNativeUploadError(body: string, status: number) {
  try {
    const response = JSON.parse(body);
    return Object.assign(new Error(response.error || response.message || `Upload failed (${status}).`), {
      response: { status, data: response },
    });
  } catch {
    return Object.assign(new Error(`Upload failed (${status}).`), { response: { status } });
  }
}

async function uploadIntroVideoTempFile(
  fileUri: string,
  fileName: string,
  onProgress?: UploadProgress,
  mimeType?: string | null,
): Promise<string> {
  const sourceInfo = await FileSystem.getInfoAsync(fileUri);
  if (!sourceInfo.exists || sourceInfo.isDirectory) throw new Error('The selected video cannot be read. Please select it again.');
  const fileSize = sourceInfo.size || 0;
  
  // Extract filename from URI if not provided
  let defaultName = 'video.mp4';
  if (fileUri.includes('/')) {
    defaultName = fileUri.split('/').pop() || 'video.mp4';
  }
  const safeName = fileName || defaultName;
  const extension = safeName.slice(safeName.lastIndexOf('.')).toLowerCase();
  const resolvedMimeType = mimeType && mimeType !== 'application/octet-stream'
    ? mimeType
    : VIDEO_MIME_BY_EXTENSION[extension] || '';
  if (fileSize < MIN_INTRO_VIDEO_SIZE) throw new Error('Video must be at least 1 MB.');
  if (fileSize > MAX_INTRO_VIDEO_SIZE) throw new Error('Video size must not exceed 3 GB.');
  validateIntroVideo(safeName, resolvedMimeType, fileSize);

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

  const safeDeleteFile = async (uri: string) => {
    try {
      const info = await FileSystem.getInfoAsync(uri);
      if (info.exists) {
        await FileSystem.deleteAsync(uri, { idempotent: true });
      }
    } catch (err) {
      console.warn('[video-upload] Temporary chunk already removed or cannot be deleted:', uri, err);
    }
  };

  const uploadChunk = async (chunkIndex: number) => {
    if (receivedChunks.has(chunkIndex)) return;
    const start = chunkIndex * VIDEO_CHUNK_SIZE;
    const chunkBytes = Math.min(VIDEO_CHUNK_SIZE, fileSize - start);
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const chunkUri = `${FileSystem.cacheDirectory}mukurtham-video-upload-chunks/${uploadId}-${chunkIndex}.part`;
      let uploadTask: FileSystem.UploadTask | null = null;
      try {
        const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}mukurtham-video-upload-chunks/`);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(`${FileSystem.cacheDirectory}mukurtham-video-upload-chunks/`, { intermediates: true });
        }

        const base64Chunk = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
          position: start,
          length: chunkBytes,
        });
        await FileSystem.writeAsStringAsync(chunkUri, base64Chunk, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const accessToken = await tokenStorage.getAccessToken();
        const url = buildChunkUrl(metadataParams, chunkIndex);

        uploadTask = FileSystem.createUploadTask(
          url,
          chunkUri,
          {
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'chunk',
            mimeType: resolvedMimeType || 'application/octet-stream',
            httpMethod: 'POST',
            headers: {
              ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
              'Bypass-Tunnel-Reminder': 'true',
              'User-Agent': 'MukurthamMobileApp/1.0'
            },
          },
          (progress: any) => {
            activeChunkBytes.set(chunkIndex, Math.min(chunkBytes, progress.totalBytesSent));
            reportProgress();
          }
        );

        const result = await uploadTask.uploadAsync();
        if (!result || result.status < 200 || result.status >= 300) {
          if (result?.status === 401) {
            await api.get(`/profiles/upload-status/${uploadId}`, { params: metadataParams });
            throw Object.assign(new Error('Retrying with the refreshed session.'), { retryableAuth: true });
          }
          throw parseNativeUploadError(result?.body || '', result?.status || 0);
        }
        activeChunkBytes.delete(chunkIndex);
        settledBytes += chunkBytes;
        reportProgress();
        return;
      } catch (error: any) {
        activeChunkBytes.delete(chunkIndex);
        reportProgress();
        const status = error?.response?.status;
        const retryable = error?.retryableAuth || !status || status === 408 || status === 429 || status >= 500;
        if (!retryable || attempt === 2) throw videoUploadError(error);
        await wait(500 * (attempt + 1));
      } finally {
        await safeDeleteFile(chunkUri);
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
    await FileSystem.deleteAsync(`${FileSystem.cacheDirectory}mukurtham-video-upload-chunks/`, { idempotent: true }).catch(() => {});
    return data.temp_video_key;
  } catch (error) {
    const status = (error as any)?.response?.status;
    const code = (error as any)?.response?.data?.code;
    const canResume = !status || status === 408 || status === 429 || status >= 500 || code === 'VIDEO_CHUNK_MISSING' || code === 'VIDEO_SIZE_MISMATCH';
    if (!canResume) {
      await api.delete(`/profiles/upload-chunks/${uploadId}`, { timeout: 20000 }).catch(() => {});
      activeVideoUploads.delete(fingerprint);
      await FileSystem.deleteAsync(`${FileSystem.cacheDirectory}mukurtham-video-upload-chunks/`, { idempotent: true }).catch(() => {});
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
