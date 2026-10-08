import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { File as ExpoFile } from 'expo-file-system';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { extractError } from '@/api/client';
import { profileApi } from '@/api/profiles';
import { useTheme } from '@/theme';
import { formatIntroVideoDuration, getIntroVideoDurationError } from '@/utils/introVideoDuration';
import { Button } from './Button';

type IntroVideoUploadState = 'idle' | 'validating' | 'valid' | 'uploading' | 'uploaded' | 'uploadFailed' | 'invalid';
const MIN_VIDEO_SIZE = 1 * 1024 * 1024;
const MAX_VIDEO_SIZE = 3 * 1024 * 1024 * 1024;
const SUPPORTED_VIDEO_EXTENSIONS = new Set([
  '.3g2', '.3gp', '.asf', '.avi', '.divx', '.f4v', '.flv', '.m2t', '.m2ts', '.m2v', '.m4v',
  '.mkv', '.mod', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mts', '.ogv', '.ts', '.vob',
  '.webm', '.wmv', '.xvid',
]);

interface IntroVideoPickerProps {
  hasExisting?: boolean;
  error?: string | null;
  onVideoSelected: (
    uri: string | null,
    duration: number,
    tempVideoKey?: string | null,
    state?: IntroVideoUploadState,
  ) => void;
}

function getVideoFileName(uri: string) {
  const pathOnly = uri.split('?')[0].split('#')[0];
  const ext = pathOnly.split('.').pop()?.toLowerCase();
  const safeExt = ext && ext.length <= 5 ? ext : 'mp4';
  return `intro-video.${safeExt}`;
}

export function IntroVideoPicker({ hasExisting, error, onVideoSelected }: IntroVideoPickerProps) {
  const { colors } = useTheme();
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [videoValidity, setVideoValidity] = useState<'checking' | 'valid' | 'invalid'>('checking');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadBytes, setUploadBytes] = useState(0);
  const [uploadTotalBytes, setUploadTotalBytes] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [tempVideoKey, setTempVideoKey] = useState<string | null>(null);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [videoMimeType, setVideoMimeType] = useState<string | null>(null);
  const uploadTokenRef = useRef<string | null>(null);
  const durationRef = useRef(0);

  const formatTime = formatIntroVideoDuration;

  const formatBytes = (bytes: number) => {
    if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
    if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const uploadSelectedVideo = async (
    uri: string,
    durationSecs: number,
    mimeType?: string | null,
    originalName?: string | null,
  ) => {
    const durationError = getIntroVideoDurationError(durationSecs);
    if (durationError) {
      setVideoValidity('invalid');
      setUploadError(durationError);
      onVideoSelected(uri, durationSecs, null, 'invalid');
      return;
    }

    if (uploadTokenRef.current?.startsWith(`${uri}:`)) return;

    uploadTokenRef.current = `${uri}:${durationSecs}`;
    setUploading(true);
    setUploadProgress(0);
    setUploadBytes(0);
    setUploadError('');
    setTempVideoKey(null);
    onVideoSelected(uri, durationSecs, null, 'uploading');

    try {
      const key = await profileApi.uploadIntroVideoTemp(
        uri,
        originalName || getVideoFileName(uri),
        mimeType,
        (percent, uploadedBytes, totalBytes) => {
          setUploadProgress(percent);
          setUploadBytes(uploadedBytes);
          if (totalBytes > 0) setUploadTotalBytes(totalBytes);
        },
      );
      setTempVideoKey(key);
      setUploadProgress(100);
      setUploadError('');
      setVideoValidity('valid');
      setDuration(durationSecs);
      durationRef.current = durationSecs;
      onVideoSelected(uri, durationSecs, key, 'uploaded');
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : extractError(err, 'Unable to upload the video right now. Please try again.');
      setUploadError(message);
      uploadTokenRef.current = null;
      const rejectedVideo = message === 'This video format is not supported.'
        || message === 'Video must be at least 1 MB.'
        || message === 'Video size must not exceed 3 GB.';
      setVideoValidity(rejectedVideo ? 'invalid' : 'valid');
      onVideoSelected(uri, durationSecs, null, rejectedVideo ? 'invalid' : 'uploadFailed');
    } finally {
      setUploading(false);
    }
  };

  const useSelectedVideo = async (
    uri: string,
    fileName: string,
    mimeType: string | null | undefined,
    fileSize: number | null | undefined,
    durationSecs = 0,
  ) => {
    if (typeof fileSize === 'number' && fileSize < MIN_VIDEO_SIZE) {
      Alert.alert('Video too small', 'Video must be at least 1 MB.');
      return;
    }
    if (typeof fileSize === 'number' && fileSize > MAX_VIDEO_SIZE) {
      Alert.alert('Video too large', 'Video size must not exceed 3 GB.');
      return;
    }
    const safeName = fileName.split(/[\\/]/).pop() || getVideoFileName(uri);
    const extension = safeName.slice(safeName.lastIndexOf('.')).toLowerCase();
    if (!SUPPORTED_VIDEO_EXTENSIONS.has(extension)
      || /^(text\/|image\/|application\/(x-msdownload|x-executable|x-sh|x-bat|javascript|x-javascript|x-httpd-php))/i.test(mimeType || '')) {
      Alert.alert('Unsupported video', 'This video format is not supported.');
      return;
    }
    const durationError = durationSecs > 0 ? getIntroVideoDurationError(durationSecs) : null;

    uploadTokenRef.current = null;
    setUploadError('');
    setUploadProgress(0);
    setUploadBytes(0);
    setUploadTotalBytes(fileSize || 0);
    setTempVideoKey(null);
    setVideoUri(uri);
    setVideoValidity(durationSecs > 0 ? 'valid' : 'checking');
    setVideoFileName(safeName);
    setVideoMimeType(mimeType || null);
    setDuration(durationSecs);
    durationRef.current = durationSecs;
    if (durationError) {
      setVideoValidity('invalid');
      setUploadError(durationError);
      onVideoSelected(uri, durationSecs, null, 'invalid');
      return;
    }
    onVideoSelected(uri, durationSecs, null, durationSecs > 0 ? 'valid' : 'validating');
    if (durationSecs > 0) {
      await uploadSelectedVideo(uri, durationSecs, mimeType, safeName);
    }
  };

  const handlePickVideo = async (useCamera: boolean) => {
    try {
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ['videos'],
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 120,
      };

      const res = useCamera
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);

      if (!res.canceled && res.assets[0]) {
        const asset = res.assets[0];
        const durationSecs = asset.duration ? asset.duration / 1000 : 0;
        await useSelectedVideo(
          asset.uri,
          asset.fileName || getVideoFileName(asset.uri),
          asset.mimeType,
          asset.fileSize,
          durationSecs,
        );
      }
    } catch (error) {
      Alert.alert('Video selection error', error instanceof Error ? error.message : 'Could not pick video.');
    }
  };

  const handlePickFromFiles = async () => {
    try {
      const result = await ExpoFile.pickFileAsync({ mimeTypes: ['video/*', 'application/octet-stream'] });
      if (result.canceled) return;
      const file = result.result;
      await useSelectedVideo(file.uri, file.name, file.type, file.size);
    } catch (error) {
      Alert.alert('Video selection error', error instanceof Error ? error.message : 'Could not open device files.');
    }
  };

  const chooseVideoSource = () => {
    Alert.alert('Choose a video', 'Select a video from your gallery or device files.', [
      { text: 'Gallery', onPress: () => { void handlePickVideo(false); } },
      { text: 'Browse files', onPress: () => { void handlePickFromFiles(); } },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const resetSelection = () => {
    uploadTokenRef.current = null;
    setVideoUri(null);
    setDuration(0);
    durationRef.current = 0;
    setVideoValidity('checking');
    setUploading(false);
    setUploadProgress(0);
    setUploadBytes(0);
    setUploadTotalBytes(0);
    setUploadError('');
    setTempVideoKey(null);
    setVideoFileName(null);
    setVideoMimeType(null);
    onVideoSelected(null, 0, null, 'idle');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: colors.primary }]}>
          <Ionicons name="videocam" size={24} color={colors.white} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.ink }]}>Introduction Video</Text>
          <Text style={[styles.subtitle, { color: colors.inkSoft }]}>
            Any video format up to 3 GB. The video must be between 30 seconds and 2 minutes.
          </Text>
        </View>
      </View>

      <View style={[styles.warningBox, { backgroundColor: colors.warningSoft, borderColor: colors.warningStrong }]}>
        <Ionicons name="lock-closed" size={20} color={colors.warningStrong} style={{ marginTop: 2 }} />
        <Text style={[styles.warningText, { color: colors.warningStrong }]}>
          This video will be reviewed only by our administrators for verification and will NOT be visible to other users. It is completely private.
        </Text>
      </View>

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}

      {!videoUri ? (
        <View style={styles.actionContainer}>
          {hasExisting && (
            <View style={[styles.existingBox, { backgroundColor: colors.successSoft, borderColor: colors.success }]}>
              <View style={styles.existingBoxInner}>
                <Ionicons name="play-circle" size={18} color={colors.success} />
                <Text style={[styles.existingText, { color: colors.success }]}>Valid video already uploaded</Text>
              </View>
              <Text style={[styles.existingSubtext, { color: colors.success }]}>You can replace it below</Text>
            </View>
          )}

          <View style={styles.buttonsRow}>
            <Pressable
              style={[styles.actionBtn, { borderColor: colors.primary, backgroundColor: colors.primarySoft }]}
              onPress={chooseVideoSource}
            >
              <Ionicons name="cloud-upload" size={32} color={colors.primaryDark} />
              <Text style={[styles.actionBtnTitle, { color: colors.primaryDark }]}>Choose from device</Text>
              <Text style={[styles.actionBtnSub, { color: colors.primaryDark }]}>Gallery or Files · 1 MB–3 GB</Text>
            </Pressable>

            <Pressable
              style={[styles.actionBtn, { borderColor: colors.borderStrong, backgroundColor: colors.surface }]}
              onPress={() => handlePickVideo(true)}
            >
              <Ionicons name="camera" size={32} color={colors.inkSoft} />
              <Text style={[styles.actionBtnTitle, { color: colors.ink }]}>Record a Video</Text>
              <Text style={[styles.actionBtnSub, { color: colors.inkFaint }]}>Use your camera</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <View style={[styles.videoWrapper, { backgroundColor: colors.black, borderColor: colors.border }]}>
            <Video
              source={{ uri: videoUri }}
              style={styles.videoPlayer}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              onLoad={(status) => {
                if (status.isLoaded && typeof status.durationMillis === 'number' && status.durationMillis > 0) {
                  const seconds = status.durationMillis / 1000;
                  const durationError = getIntroVideoDurationError(seconds);
                  if (durationError) {
                    setVideoValidity('invalid');
                    setUploadError(durationError);
                    onVideoSelected(videoUri, seconds, null, 'invalid');
                    return;
                  }
                  setVideoValidity('valid');
                  setUploadError('');
                  setDuration(seconds);
                  durationRef.current = seconds;
                  if (tempVideoKey) {
                    onVideoSelected(videoUri, seconds, tempVideoKey, 'uploaded');
                  } else if (!uploadTokenRef.current?.startsWith(`${videoUri}:`)) {
                    uploadSelectedVideo(videoUri, seconds, videoMimeType, videoFileName);
                  } else {
                    onVideoSelected(videoUri, seconds, null, 'uploading');
                  }
                }
              }}
              onError={() => {
                if (!durationRef.current) {
                  setUploadError('Unable to read video duration on this device. Choose a video the player can inspect.');
                  setVideoValidity('checking');
                  onVideoSelected(videoUri, 0, null, 'validating');
                }
              }}
            />
            {uploading && (
              <View style={styles.uploadOverlay}>
                <ActivityIndicator color={colors.primary} size="large" />
                <Text style={styles.uploadTitle}>Uploading Video...</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${uploadProgress}%`, backgroundColor: colors.primary }]} />
                </View>
                <Text style={[styles.progressText, { color: colors.primary }]}>{uploadProgress}%</Text>
                <Text style={[styles.progressDetail, { color: colors.white }]}>
                  {formatBytes(uploadBytes)} / {formatBytes(uploadTotalBytes)}
                </Text>
              </View>
            )}
          </View>

          <View style={[styles.previewMeta, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View>
              <Text style={[styles.previewTitle, { color: colors.ink }]}>Video Preview</Text>
              <Text style={[styles.previewDuration, { color: colors.inkFaint }]}>Duration: {formatTime(duration)}</Text>
            </View>
            <View>
              {videoValidity === 'valid' ? (
                <View style={[styles.badge, { backgroundColor: colors.successSoft }]}> 
                  <Ionicons name="checkmark" size={14} color={colors.success} />
                  <Text style={[styles.badgeText, { color: colors.success }]}>
                    {tempVideoKey ? 'Valid · Uploaded' : uploadError ? 'Valid · Upload failed' : 'Valid'}
                  </Text>
                </View>
              ) : uploading ? (
                <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
                  <ActivityIndicator color={colors.primaryDark} size="small" />
                  <Text style={[styles.badgeText, { color: colors.primaryDark }]}>Uploading</Text>
                </View>
              ) : videoValidity === 'invalid' ? (
                <View style={[styles.badge, { backgroundColor: colors.errorSoft }]}>
                  <Ionicons name="close" size={14} color={colors.error} />
                  <Text style={[styles.badgeText, { color: colors.error }]}>Invalid</Text>
                </View>
              ) : (
                <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
                  <ActivityIndicator color={colors.primaryDark} size="small" />
                  <Text style={[styles.badgeText, { color: colors.primaryDark }]}>Checking duration</Text>
                </View>
              )}
            </View>
          </View>

          {uploadError && (
            <View style={[styles.uploadErrorBox, { backgroundColor: colors.errorSoft, borderColor: colors.error }]}>
              <Text style={[styles.uploadErrorText, { color: colors.error }]}>{uploadError}</Text>
            </View>
          )}

          {uploadError && !uploading && (
            <Button
              title="Retry upload"
              variant="secondary"
              leftIcon="refresh"
              onPress={() => {
                const durationError = getIntroVideoDurationError(duration);
                if (durationError) {
                  setUploadError(durationError);
                  setVideoValidity('invalid');
                  return;
                }
                void uploadSelectedVideo(videoUri, duration, videoMimeType, videoFileName);
              }}
              disabled={videoValidity !== 'valid'}
            />
          )}

          <Button
            title="Replace Video"
            variant="secondary"
            leftIcon="refresh"
            onPress={resetSelection}
            disabled={uploading}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  warningBox: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionContainer: {
    gap: 16,
  },
  existingBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  existingBoxInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  existingText: {
    fontWeight: '700',
    fontSize: 14,
  },
  existingSubtext: {
    fontSize: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  actionBtnSub: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
    opacity: 0.8,
  },
  previewContainer: {
    gap: 16,
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.72)',
    padding: 24,
  },
  uploadTitle: {
    color: '#ffffff',
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 12,
  },
  progressTrack: {
    width: '100%',
    maxWidth: 260,
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#334155',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  progressText: {
    fontWeight: '700',
    fontSize: 16,
    marginTop: 8,
  },
  progressDetail: {
    fontSize: 12,
    marginTop: 4,
  },
  previewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  previewTitle: {
    fontWeight: '700',
    fontSize: 14,
  },
  previewDuration: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  uploadErrorBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  uploadErrorText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
