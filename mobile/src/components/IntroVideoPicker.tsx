import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Button } from './Button';

interface IntroVideoPickerProps {
  hasExisting?: boolean;
  error?: string | null;
  onVideoSelected: (uri: string | null, duration: number) => void;
}

export function IntroVideoPicker({ hasExisting, error, onVideoSelected }: IntroVideoPickerProps) {
  const { colors, spacing, radius, typography } = useTheme();
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.round(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePickVideo = async (useCamera: boolean) => {
    try {
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ['videos'],
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 180, // 3 minutes limit for camera recording
      };

      const res = useCamera 
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);

      if (!res.canceled && res.assets[0]) {
        const asset = res.assets[0];
        // Asset duration is sometimes in ms, sometimes s depending on platform. 
        // We'll calculate properly or let expo-av check it.
        const durationSecs = asset.duration ? Math.round(asset.duration / 1000) : 0;
        
        // We will validate strictly in the player on playback load if asset.duration is missing.
        // But if asset duration is present:
        if (durationSecs > 0) {
          if (durationSecs < 60) {
            Alert.alert('Invalid Duration', 'Your introduction video must be at least 1 minute long.');
            return;
          }
          if (durationSecs > 180) {
            Alert.alert('Invalid Duration', 'Your introduction video must not exceed 3 minutes.');
            return;
          }
        }
        
        setVideoUri(asset.uri);
        setDuration(durationSecs); // May be updated by video player onLoad
        onVideoSelected(asset.uri, durationSecs);
      }
    } catch (err) {
      Alert.alert('Error', 'Could not pick video.');
    }
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
            Please upload a short introduction video between 1 and 3 minutes.
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
              onPress={() => handlePickVideo(false)}
            >
              <Ionicons name="cloud-upload" size={32} color={colors.primaryStrong} />
              <Text style={[styles.actionBtnTitle, { color: colors.primaryStrong }]}>Choose from device</Text>
              <Text style={[styles.actionBtnSub, { color: colors.primaryStrong }]}>MP4, MOV up to 3GB</Text>
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
                if (status.isLoaded && status.durationMillis) {
                  const s = Math.round(status.durationMillis / 1000);
                  setDuration(s);
                  onVideoSelected(videoUri, s);
                  if (s < 60) {
                    Alert.alert('Invalid Duration', 'Your video is less than 1 minute long. Please re-record or choose another video.');
                  } else if (s > 180) {
                    Alert.alert('Invalid Duration', 'Your video is longer than 3 minutes. Please re-record or choose another video.');
                  }
                }
              }}
            />
          </View>
          
          <View style={[styles.previewMeta, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View>
              <Text style={[styles.previewTitle, { color: colors.ink }]}>Video Preview</Text>
              <Text style={[styles.previewDuration, { color: colors.inkFaint }]}>Duration: {formatTime(duration)}</Text>
            </View>
            <View>
              {duration >= 60 && duration <= 180 ? (
                <View style={[styles.badge, { backgroundColor: colors.successSoft }]}>
                  <Ionicons name="checkmark" size={14} color={colors.success} />
                  <Text style={[styles.badgeText, { color: colors.success }]}>Valid</Text>
                </View>
              ) : (
                <View style={[styles.badge, { backgroundColor: colors.errorSoft }]}>
                  <Ionicons name="close" size={14} color={colors.error} />
                  <Text style={[styles.badgeText, { color: colors.error }]}>Invalid</Text>
                </View>
              )}
            </View>
          </View>

          <Button 
            title="Replace Video" 
            variant="secondary" 
            leftIcon="refresh" 
            onPress={() => {
              setVideoUri(null);
              setDuration(0);
              onVideoSelected(null, 0);
            }} 
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e5e7eb', // border
    backgroundColor: '#f9fafb', // surface-soft
    borderRadius: 16, // radius.xl
    padding: 20, // spacing.xl
    marginBottom: 24, // spacing.2xl
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
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
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
});
