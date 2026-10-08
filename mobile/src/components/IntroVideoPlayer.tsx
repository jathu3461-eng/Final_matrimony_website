import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '@/api/client';
import { tokenStorage } from '@/services/tokenStorage';
import { useTheme, radius, spacing, typography } from '@/theme';

type Status = 'pending' | 'approved' | 'rejected' | null | undefined;

interface Props {
  profileId: number;
  status?: Status;
  durationSeconds?: number | null;
}

const STATUS_META: Record<'pending' | 'approved' | 'rejected', { label: string; icon: string; tone: 'warning' | 'success' | 'danger'; hint: string }> = {
  pending: { label: 'Pending Review', icon: 'time-outline', tone: 'warning', hint: 'Only you and the admin team can see this video while it is reviewed.' },
  approved: { label: 'Approved', icon: 'checkmark-circle', tone: 'success', hint: 'Your introduction video has been approved by the admin team.' },
  rejected: { label: 'Rejected', icon: 'close-circle', tone: 'danger', hint: 'This video was rejected. Use "Edit Profile" to upload a new one.' },
};

function formatDuration(total?: number | null) {
  if (!total || total <= 0) return null;
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Private intro video player — mirrors the website's ProfileDetail "Introduction Video"
 * block. Streams from /profiles/:id/intro-video-stream with the user's Bearer token,
 * so only the owner (and admins) can play it.
 */
export function IntroVideoPlayer({ profileId, status, durationSeconds }: Props) {
  const { colors } = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const loadToken = useCallback(async () => {
    setTokenLoaded(false);
    setToken(await tokenStorage.getAccessToken());
    setTokenLoaded(true);
  }, []);

  useEffect(() => { loadToken(); }, [loadToken]);

  const retry = async () => {
    setError(false);
    setLoading(true);
    await loadToken(); // access tokens are short-lived; grab the latest one
    setReloadKey((k) => k + 1);
  };

  const uri = `${API_BASE_URL.replace(/\/$/, '')}/profiles/${profileId}/intro-video-stream`;
  const meta = status ? STATUS_META[status] : null;
  const toneColor = meta
    ? { warning: colors.warning ?? '#B7791F', success: colors.success, danger: colors.danger ?? '#E53E3E' }[meta.tone]
    : colors.inkSoft;
  const duration = formatDuration(durationSeconds);

  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.inkFaint }]}>Introduction Video</Text>
        {meta && (
          <View style={[styles.badge, { borderColor: toneColor }]}>
            <Ionicons name={meta.icon as keyof typeof Ionicons.glyphMap} size={12} color={toneColor} />
            <Text style={[styles.badgeText, { color: toneColor }]}>{meta.label}</Text>
          </View>
        )}
        {duration && <Text style={[styles.duration, { color: colors.inkFaint }]}>{duration}</Text>}
      </View>

      <View style={styles.player}>
        {tokenLoaded && !error && (
          <Video
            key={reloadKey}
            source={{ uri, headers: token ? { Authorization: `Bearer ${token}` } : undefined }}
            style={StyleSheet.absoluteFill}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={false}
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
          />
        )}
        {loading && !error && (
          <View style={styles.overlay} pointerEvents="none">
            <ActivityIndicator color="#fff" />
            <Text style={styles.overlayText}>Loading video…</Text>
          </View>
        )}
        {error && (
          <View style={styles.overlay}>
            <Ionicons name="alert-circle-outline" size={28} color="#fff" />
            <Text style={styles.overlayText}>Couldn't load the video.</Text>
            <Pressable onPress={retry} style={[styles.retryBtn, { backgroundColor: colors.primary }]}>
              <Ionicons name="refresh" size={14} color="#fff" />
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        )}
      </View>

      {meta && <Text style={[styles.hint, { color: colors.inkSoft }]}>{meta.hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm, flexWrap: 'wrap' },
  title: { ...typography.caption, fontWeight: '700', textTransform: 'uppercase' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { ...typography.label, fontWeight: '700' },
  duration: { ...typography.caption, marginLeft: 'auto' },
  player: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000', borderRadius: radius.lg, overflow: 'hidden' },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  overlayText: { color: '#fff', ...typography.caption },
  retryBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 6, borderRadius: radius.pill },
  retryText: { color: '#fff', fontWeight: '700' },
  hint: { ...typography.caption, marginTop: spacing.sm },
});

