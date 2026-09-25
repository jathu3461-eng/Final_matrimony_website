import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { useTheme, ThemeMode } from '@/theme';
import { useTranslation } from 'react-i18next';
import { radius, spacing, typography, layout } from '@/theme';
import { parsePhoneNumber } from '@/lib/countries';

const THEME_OPTIONS: { label: string; value: ThemeMode; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Light', value: 'light', icon: 'sunny' },
  { label: 'Dark', value: 'dark', icon: 'moon' },
  { label: 'System', value: 'system', icon: 'phone-portrait' },
];

export function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector((s) => s.auth.user);
  const { colors, mode, setMode } = useTheme();
  const [loggingOut, setLoggingOut] = useState(false);

  const doLogout = async () => {
    Alert.alert('Log out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          setLoggingOut(true);
          await dispatch(logout());
          setLoggingOut(false);
        },
      },
    ]);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.ink }]}>{t('settings_title', 'Settings')}</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>{t('account', 'Account')}</Text>
          <Row icon="person" label={t('username', 'Username')} value={user?.username} colors={colors} />
          <Row icon="mail" label={t('email', 'Email')} value={user?.email} colors={colors} />
          {(() => {
            if (!user?.phone_number) return <Row icon="call" label="Phone" value="—" colors={colors} />;
            const parsed = parsePhoneNumber(user.phone_number);
            return (
              <Row 
                icon="call" 
                label="Phone" 
                value={`${parsed.country.flag} ${parsed.country.dialCode} | ${parsed.localNumber}`} 
                colors={colors} 
              />
            );
          })()}
          <Row icon="shield-checkmark" label="Role" value={user?.role} colors={colors} />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>Appearance</Text>
          <View style={styles.themeRow}>
            {THEME_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                style={[
                  styles.themeBtn,
                  {
                    backgroundColor: mode === opt.value ? colors.primary : colors.surface,
                    borderColor: mode === opt.value ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setMode(opt.value)}
              >
                <Ionicons
                  name={opt.icon}
                  size={18}
                  color={mode === opt.value ? colors.white : colors.inkSoft}
                />
                <Text
                  style={[
                    styles.themeBtnText,
                    { color: mode === opt.value ? colors.white : colors.inkSoft },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>{t('app', 'App')}</Text>
          <Pressable 
            onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en')}
            style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
          >
            <Row 
              icon="globe" 
              label={t('language', 'Language')} 
              value={i18n.language === 'ta' ? 'தமிழ்' : 'English'} 
              colors={colors} 
              isAction
            />
          </Pressable>
          <Row icon="phone-portrait" label={t('platform', 'Platform')} value={Platform.OS === 'ios' ? 'iOS' : 'Android'} colors={colors} />
          <Row icon="information-circle" label={t('version', 'Version')} value="1.0.0" colors={colors} />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>{t('privacy', 'Privacy')}</Text>
          <Row icon="lock-closed" label={t('security', 'Security')} value={t('e2e_encrypted', 'End-to-end encrypted')} colors={colors} />
          <Row icon="eye-off" label={t('visibility', 'Visibility')} value={t('members_only', 'Members only')} colors={colors} />
          <Text style={[styles.privacyNote, { color: colors.inkSoft }]}>
            {t('privacy_note', 'Your data is stored securely and never shared with third parties.')}
          </Text>
        </View>

        <Button
          title={t('nav_logout', 'Log Out')}
          variant="danger"
          size="lg"
          loading={loggingOut}
          onPress={doLogout}
          style={styles.logoutBtn}
        />
      </ScrollView>
    </Screen>
  );
}

function Row({ icon, label, value, colors, isAction }: { icon: string; label: string; value?: string | null; colors: import('@/theme').ThemeColors, isAction?: boolean }) {
  return (
    <View style={[rowStyles.row, { borderBottomColor: colors.border }]}>
      <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={18} color={colors.inkSoft} />
      <Text style={[rowStyles.label, { color: colors.inkSoft }]}>{label}</Text>
      <Text style={[rowStyles.value, { color: isAction ? colors.primary : colors.ink, fontWeight: isAction ? '600' : '400' }]}>{value || '—'}</Text>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  label: {
    ...typography.body,
    minWidth: 90,
  },
  value: {
    ...typography.body,
    flex: 1,
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    paddingBottom: layout.bottomContentInset,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  themeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  themeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  themeBtnText: {
    ...typography.caption,
    fontWeight: '700',
  },
  privacyNote: {
    ...typography.caption,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  logoutBtn: {
    marginTop: spacing.lg,
  },
});
