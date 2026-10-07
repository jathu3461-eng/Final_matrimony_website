import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';
import { PhoneNumberInput } from '@/components/PhoneNumberInput';
import { Screen } from '@/components/Screen';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { authApi } from '@/api/auth';
import { extractError } from '@/api/client';
import {
  validateUsername,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateBusinessName,
  fieldError,
  HINTS,
} from '@/utils/validation';
import { useTheme } from '@/theme';
import { radius, spacing, typography, layout } from '@/theme';
import type { AuthStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

function RegisterHeader({ t }: { t: (key: string) => string }) {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <View style={[styles.headerBar, { paddingTop: insets.top + 8 }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
        hitSlop={12}
      >
        <Ionicons name="arrow-back" size={22} color={colors.ink} />
      </Pressable>
      <Text style={[styles.headerTitle, { color: colors.ink }]}>{t('mob_create_account')}</Text>
      <View style={styles.backBtn} />
    </View>
  );
}

export function RegisterScreen() {
  const navigation = useNavigation<Nav>();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState<'regular' | 'broker'>('regular');
  const [businessName, setBusinessName] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const touch = (field: string) => setTouched((t) => ({ ...t, [field]: true }));

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  }, [password]);

  const errors = useMemo(
    () => ({
      username: fieldError(username, touched.username, validateUsername),
      email: fieldError(email, touched.email, validateEmail),
      phone: fieldError(phone, touched.phone, validatePhone),
      password: fieldError(password, touched.password, validatePassword),
      confirm: fieldError(confirm, touched.confirm, (v) => validateConfirmPassword(password, v)),
      businessName:
        role === 'broker'
          ? fieldError(businessName, touched.businessName, validateBusinessName)
          : null,
      terms: !acceptedTerms && touched.terms ? 'You must accept the terms & conditions' : null,
    }),
    [username, email, phone, password, confirm, role, businessName, touched, acceptedTerms]
  );

  const hasErrors = Object.values(errors).some(Boolean);

  const handleRegisterPress = () => {
    setTouched({
      username: true,
      email: true,
      phone: true,
      password: true,
      confirm: true,
      businessName: true,
      terms: true,
    });
    if (hasErrors) return;
    submit();
  };

  const submit = async () => {

    setServerError(null);
    setLoading(true);
    try {
      const result = await authApi.signup({
        username: username.trim(),
        email: email.trim(),
        phone_number: phone.trim(),
        password,
        role,
        ...(role === 'broker' ? { business_name: businessName.trim() } : {}),
      });
      if (result.status === 'pending_approval') {
        setServerError(null);
        alert('Account created! Waiting for admin approval.');
      }
      navigation.navigate('Login');
    } catch (err) {
      setServerError(extractError(err, 'Unable to create account.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen edges={['bottom']}>
      <KeyboardAwareScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={80}
      >
          <RegisterHeader t={t} />

          <View style={styles.header}>
            <AnimatedLogo shape="hexagon" size={100} />
            <Text style={[styles.subtitle, { color: colors.inkFaint }]}>
              {t('mob_register_subtitle')}
            </Text>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                shadowColor: colors.black,
              },
            ]}
          >
            <View style={styles.roleRow}>
              <Button
                title={t('mob_regular_user')}
                variant={role === 'regular' ? 'primary' : 'outline'}
                size="sm"
                style={styles.roleBtn}
                onPress={() => setRole('regular')}
              />
              <Button
                title={t('mob_broker')}
                variant={role === 'broker' ? 'primary' : 'outline'}
                size="sm"
                style={styles.roleBtn}
                onPress={() => setRole('broker')}
              />
            </View>

            <FormField
              label={t('mob_username')}
              value={username}
              onChangeText={setUsername}
              onBlur={() => touch('username')}
              placeholder={t('mob_username_placeholder')}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={60}
              count
              error={errors.username}
              hint={HINTS.username}
            />
            <FormField
              label={t('mob_email')}
              value={email}
              onChangeText={setEmail}
              onBlur={() => touch('email')}
              placeholder={t('mob_email_placeholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              error={errors.email}
              hint={HINTS.email}
            />
            <PhoneNumberInput
              label={t('mob_phone')}
              value={phone}
              onChangeText={setPhone}
              onBlur={() => touch('phone')}
              error={errors.phone}
              hint={HINTS.phone}
            />
            <FormField
              label={t('mob_password')}
              value={password}
              onChangeText={setPassword}
              onBlur={() => touch('password')}
              placeholder={t('mob_password_placeholder')}
              secure
              autoCapitalize="none"
              error={errors.password}
              hint={HINTS.password}
            />
            <FormField
              label={t('mob_confirm_password')}
              value={confirm}
              onChangeText={setConfirm}
              onBlur={() => touch('confirm')}
              placeholder={t('mob_confirm_placeholder')}
              secure
              autoCapitalize="none"
              error={errors.confirm}
              hint={HINTS.confirm}
            />

            {/* Password strength meter */}
            {password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBars}>
                  {[0, 1, 2].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.strengthBar,
                        {
                          backgroundColor:
                            i < passwordStrength
                              ? passwordStrength === 1
                                ? colors.error
                                : passwordStrength === 2
                                  ? colors.warning
                                  : colors.success
                              : colors.border,
                        },
                      ]}
                    />
                  ))}
                </View>
                <Text style={[styles.strengthText, { color: colors.inkFaint }]}>
                  {passwordStrength === 0
                    ? ''
                    : passwordStrength === 1
                      ? t('mob_pw_weak')
                      : passwordStrength === 2
                        ? t('mob_pw_good')
                        : t('mob_pw_strong')}
                </Text>

                {/* Password checklist */}
                <View style={styles.checklist}>
                  {[
                    { label: t('mob_pw_rule_8chars'), ok: password.length >= 8 },
                    { label: t('mob_pw_rule_upper'), ok: /[A-Z]/.test(password) },
                    { label: t('mob_pw_rule_special'), ok: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
                  ].map((rule) => (
                    <View key={rule.label} style={styles.checkRow}>
                      <Ionicons
                        name={rule.ok ? 'checkmark-circle' : 'ellipse-outline'}
                        size={14}
                        color={rule.ok ? colors.success : colors.inkFaint}
                      />
                      <Text
                        style={[
                          styles.checkText,
                          { color: rule.ok ? colors.success : colors.inkFaint },
                        ]}
                      >
                        {rule.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Terms & Conditions */}
            <View style={styles.termsRow}>
              <Pressable
                onPress={() => setAcceptedTerms((a) => !a)}
                hitSlop={8}
              >
                <Ionicons
                  name={acceptedTerms ? 'checkbox' : 'square-outline'}
                  size={22}
                  color={errors.terms ? colors.error : acceptedTerms ? colors.primary : colors.inkFaint}
                />
              </Pressable>
              <Text style={[styles.termsText, { color: colors.inkSoft }]}>
                {t('mob_terms_agree')}{' '}
                <Text style={{ color: colors.primary, fontWeight: '600' }}>{t('mob_terms_conditions')}</Text>
                {' '}{t('mob_terms_and')}{' '}
                <Text style={{ color: colors.primary, fontWeight: '600' }}>{t('mob_terms_privacy')}</Text>
              </Text>
            </View>
            {errors.terms && (
              <Text style={[styles.termsError, { color: colors.error }]}>{errors.terms}</Text>
            )}

            <View style={{ backgroundColor: '#fdf2f8', padding: spacing.md, borderRadius: radius.lg, marginTop: spacing.md, marginBottom: spacing.md, borderColor: '#fbcfe8', borderWidth: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, shadowOffset: { width: 0, height: 1 }, elevation: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 14 }}>🤝 </Text>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#831843' }}>
                  {t('community_commitment_title')}
                </Text>
              </View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.inkSoft, marginBottom: spacing.sm, lineHeight: 18 }}>
                {t('community_commitment_intro')}
              </Text>
              <View style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: spacing.sm, borderRadius: radius.md, borderColor: '#fce7f3', borderWidth: 1 }}>
                <Text style={{ fontSize: 12, color: colors.inkFaint, lineHeight: 18, fontStyle: 'italic', fontWeight: '500' }}>
                  {t('community_commitment_body')}
                </Text>
              </View>
            </View>

            {role === 'broker' && (
              <FormField
                label={t('mob_business_name')}
                value={businessName}
                onChangeText={setBusinessName}
                onBlur={() => touch('businessName')}
                placeholder={t('mob_business_placeholder')}
                error={errors.businessName}
                hint={HINTS.businessName}
              />
            )}

            {serverError && (
              <View style={[styles.errorBox, { backgroundColor: colors.errorSoft }]}>
                <Ionicons name="alert-circle" size={16} color={colors.error} />
                <Text style={[styles.errorBoxText, { color: colors.error }]}>{serverError}</Text>
              </View>
            )}

            <Button title={t('mob_create_account')} onPress={handleRegisterPress} loading={loading} size="lg" />
          </View>

          <View style={styles.footer}>
            <View style={styles.loginRow}>
              <Text style={[styles.loginText, { color: colors.inkSoft }]}>
                {t('mob_already_account')}{' '}
              </Text>
              <Button
                title={t('mob_log_in')}
                variant="ghost"
                size="sm"
                titleStyle={{ fontWeight: '700' }}
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    padding: spacing.xl,
    paddingBottom: layout.bottomContentInset,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: spacing.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: spacing.lg,
  },
  roleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  roleBtn: {
    flex: 1,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: 10,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  errorBoxText: {
    ...typography.caption,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    ...typography.body,
  },
  strengthContainer: {
    marginBottom: spacing.md,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  checklist: {
    gap: 4,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkText: {
    ...typography.label,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  termsText: {
    ...typography.caption,
    flex: 1,
    lineHeight: 20,
  },
  termsError: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  agreementScreen: {
    flex: 1,
  },
  agreementHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  agreementContent: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  agreementTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  agreementText: {
    fontSize: 16,
    lineHeight: 24,
  },
  agreementFooter: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
