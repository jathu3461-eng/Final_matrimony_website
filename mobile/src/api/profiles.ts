import api from './client';
import type { Profile, ProfileMeta } from '@/types';

const VIDEO_CHUNK_SIZE = 512 * 1024;
const MAX_INTRO_VIDEO_SIZE = 3 * 1024 * 1024 * 1024;

async function uploadIntroVideoTempBase64(
  fileUri: string,
  fileName: string,
  onProgress?: (p: number) => void,
  mimeType?: string | null,
): Promise<string> {
  const FileSystem = require('expo-file-system');
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!fileInfo.exists) throw new Error('Video file does not exist');
  if (!fileInfo.size || fileInfo.size <= 0) throw new Error('Could not read video size');
  if (fileInfo.size > MAX_INTRO_VIDEO_SIZE) throw new Error('Video file is too large (max 3GB)');

  const totalChunks = Math.ceil(fileInfo.size / VIDEO_CHUNK_SIZE);
  const uploadId = Date.now().toString();
  let tempKey: string | null = null;

  for (let i = 0; i < totalChunks; i += 1) {
    const position = i * VIDEO_CHUNK_SIZE;
    const length = Math.min(VIDEO_CHUNK_SIZE, fileInfo.size - position);

    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
      position,
      length,
    });

    const { data } = await api.post('/profiles/upload-chunk-base64', {
      uploadId,
      chunkIndex: i,
      totalChunks,
      fileName,
      mimeType,
      chunkBase64: base64,
    });

    onProgress?.(Math.round(((i + 1) / totalChunks) * 100));

    if (i === totalChunks - 1) {
      tempKey = data.temp_video_key;
    }
  }

  if (!tempKey) throw new Error('Failed to get temp video key');
  return tempKey;
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

  async uploadIntroVideoTempBase64(
    fileUri: string,
    fileName: string,
    onProgress?: (p: number) => void,
    mimeType?: string | null,
  ): Promise<string> {
    return uploadIntroVideoTempBase64(fileUri, fileName, onProgress, mimeType);
  },

  async linkIntroVideo(id: number | string, tempVideoKey: string, durationSecs: number): Promise<void> {
    await api.post(`/profiles/${id}/intro-video`, {
      temp_video_key: tempVideoKey,
      duration_seconds: durationSecs,
    });
  },

  async uploadIntroVideoChunkedBase64(id: number | string, fileUri: string, fileName: string, durationSecs: number, onProgress?: (p: number) => void): Promise<void> {
    const tempKey = await uploadIntroVideoTempBase64(fileUri, fileName, onProgress);
    await this.linkIntroVideo(id, tempKey, durationSecs);
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
