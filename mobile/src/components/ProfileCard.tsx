import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { uploadsUrl } from '@/api/client';
import { interestApi } from '@/api/interests';
import { profileApi } from '@/api/profiles';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@/theme';
import { radius, spacing, typography } from '@/theme';
import { Button } from '@/components/Button';
import type { Profile } from '@/types';
import type { RootStackParamList } from '@/navigation/types';

interface ProfileCardProps {
  profile: Profile;
  onPress?: () => void;
}

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ProfileCard({ profile, onPress }: ProfileCardProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<Nav>();
  const photoUrl = uploadsUrl(profile.main_profile_picture);

  const myProfiles = useQuery({ queryKey: ['profiles'], queryFn: profileApi.getMyProfiles });

  const [isShortlisted, setIsShortlisted] = useState(Boolean(profile.is_shortlisted));
  const [shortlistLoading, setShortlistLoading] = useState(false);
  const [interestStatus, setInterestStatus] = useState(profile.interest_status || null);
  const [interestLoading, setInterestLoading] = useState(false);

  const handleToggleShortlist = async (e?: any) => {
    // Prevent navigating to profile detail when tapping the button
    e?.stopPropagation();
    setShortlistLoading(true);
    try {
      const result = await interestApi.toggleShortlist(profile.id);
      setIsShortlisted(result);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update shortlist');
    } finally {
      setShortlistLoading(false);
    }
  };

  const handleExpressInterest = async (e?: any) => {
    e?.stopPropagation();
    
    if (interestStatus === 'accepted') {
      const actualMyProfile = (profile as any).my_profile_id || myProfiles.data?.[0]?.id;
      if (!actualMyProfile) {
        Alert.alert('Error', 'Could not determine your profile.');
        return;
      }
      navigation.navigate('ChatThread', {
        profileA: actualMyProfile,
        profileB: profile.id,
        otherName: profile.name,
      });
      return;
    }

    if (interestStatus === 'pending' || interestStatus === 'declined' || interestStatus === 'rejected') {
      return;
    }

    setInterestLoading(true);
    try {
      await interestApi.send(profile.id);
      setInterestStatus('pending');
    } catch (error: any) {
      const data = error.response?.data;
      if (data?.alreadySent) {
        setInterestStatus(data?.status || 'pending');
      } else {
        const errorMsg = data?.message || data?.error || 'Failed to send interest';
        if (errorMsg.includes('already')) {
          setInterestStatus('pending');
        } else {
          Alert.alert('Error', errorMsg);
        }
      }
    } finally {
      setInterestLoading(false);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topContent}>
        <View style={styles.photoWrap}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={[styles.photo, { backgroundColor: colors.primarySoft }]} />
          ) : (
            <View style={[styles.photo, styles.photoPlaceholder, { backgroundColor: colors.primary }]}>
              <Text style={[styles.photoInitial, { color: colors.white }]}>{(profile.name ?? '?')[0]?.toUpperCase()}</Text>
            </View>
          )}
          {profile.is_verified === 1 && (
            <View style={[styles.verifiedDot, { backgroundColor: colors.success, borderColor: colors.surface }]}>
              <Ionicons name="shield-checkmark" size={12} color={colors.white} />
            </View>
          )}
        </View>

        <View style={styles.details}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.ink }]} numberOfLines={1}>
              {profile.name}
            </Text>
            {profile.age && <Text style={[styles.age, { color: colors.inkFaint }]}>{profile.age} yrs</Text>}
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="resize-outline" size={13} color={colors.inkFaint} />
            <Text style={[styles.meta, { color: colors.inkSoft }]}>
              {profile.height_feet}'{profile.height_inches ?? 0}"
            </Text>
          </View>

          {profile.occupation ? (
            <View style={styles.metaRow}>
              <Ionicons name="briefcase-outline" size={13} color={colors.inkFaint} />
              <Text style={[styles.meta, { color: colors.inkSoft }]} numberOfLines={1}>
                {profile.occupation}
              </Text>
            </View>
          ) : null}

          {profile.city_or_state ? (
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={13} color={colors.inkFaint} />
              <Text style={[styles.meta, { color: colors.inkSoft }]} numberOfLines={1}>
                {profile.city_or_state}
              </Text>
            </View>
          ) : null}
          
          {/* Keep badges at top for immediate visual status */}
          {interestStatus === 'pending' && (
            <View style={[styles.pendingBadge, { backgroundColor: '#fef3c7' }]}>
              <Text style={[styles.pendingText, { color: '#d97706' }]}>Interest pending</Text>
            </View>
          )}
          {interestStatus === 'accepted' && (
            <View style={[styles.pendingBadge, { backgroundColor: colors.successSoft }]}>
              <Text style={[styles.pendingText, { color: colors.success }]}>Matched</Text>
            </View>
          )}
        </View>

        <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />
      </View>

      {/* Action Buttons Row */}
      <View style={[styles.actionsRow, { borderTopColor: colors.border }]}>
        <Button
          title={isShortlisted ? 'Shortlisted' : 'Shortlist'}
          leftIcon="star"
          variant={isShortlisted ? 'secondary' : 'outline'}
          size="sm"
          onPress={handleToggleShortlist}
          loading={shortlistLoading}
          style={styles.actionBtn}
        />
        
        <Button
          title={
            interestStatus === 'accepted'
              ? 'Send Message'
              : interestStatus === 'pending'
              ? 'Pending'
              : interestStatus === 'declined' || interestStatus === 'rejected'
              ? 'Declined'
              : 'Interest'
          }
          leftIcon={
            interestStatus === 'accepted'
              ? 'chatbubble-ellipses'
              : 'heart'
          }
          variant={
            interestStatus === 'accepted'
              ? 'primary'
              : interestStatus === 'pending'
              ? 'secondary'
              : (interestStatus === 'declined' || interestStatus === 'rejected')
              ? 'ghost'
              : 'primary'
          }
          size="sm"
          disabled={interestStatus === 'pending' || interestStatus === 'declined' || interestStatus === 'rejected'}
          onPress={handleExpressInterest}
          loading={interestLoading}
          style={styles.actionBtn}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderRadius: radius.lg,
    borderWidth: 1,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  topContent: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  actionBtn: {
    flex: 1,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  photoWrap: {
    position: 'relative',
  },
  photo: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoInitial: {
    fontSize: 28,
    fontWeight: '800',
  },
  verifiedDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    ...typography.body,
    fontWeight: '700',
    flex: 1,
  },
  age: {
    ...typography.caption,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  meta: {
    ...typography.caption,
  },
  pendingBadge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  pendingText: {
    ...typography.label,
    fontWeight: '700',
  },
});
