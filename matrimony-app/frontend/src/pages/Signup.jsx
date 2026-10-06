import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Check, CheckCircle2, Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import AuthLayout from '../components/auth/AuthLayout';
import { Button, TextField, ErrorCard, PhoneNumberField } from '../components/ui';
import { createSignupSchema, normalizeApiErrors, passwordRules } from '../lib/validation';

const VAL_MSG_KEYS = {
  Required: 'err_required',
  'Enter at least 2 characters': 'err_name_min',
  'Too long (maximum 60 characters)': 'err_name_max',
  "Letters, spaces, and ' . - only": 'err_name_chars',
  'Invalid email format (e.g. name@example.com)': 'err_email_format',
  'Minimum 8 characters': 'err_pw_min',
  'Needs at least 1 uppercase letter and 1 special character': 'err_pw_rules',
  'Enter a valid phone number (e.g. +14165550198)': 'err_phone',
  'Required. Minimum 2 characters': 'err_business_min',
  'Too long (maximum 80 characters)': 'err_business_max',
  'Confirm your password': 'err_confirm_required',
  'Passwords do not match': 'err_confirm_match',
};

const RULES = [
  { key: 'min8', labelKey: 'auth_rule_min8' },
  { key: 'upper', labelKey: 'auth_rule_upper' },
  { key: 'special', labelKey: 'auth_rule_special' },
];

function PasswordChecklist({ value, t }) {
  const rules = passwordRules(value);
  return (
    <div className="mt-2.5 grid grid-cols-1 gap-1.5 sm:grid-cols-3 animate-[fade-in-up_0.2s_ease-out_both]">
      {RULES.map(({ key, labelKey }) => {
        const ok = rules[key];
        return (
          <motion.span
            key={key}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={`pw-rule ${ok ? 'pw-rule-ok' : ''}`}
          >
            <span className="pw-rule-icon">{ok && <Check className="w-3 h-3" aria-hidden="true" />}</span>
            {t(labelKey)}
          </motion.span>
        );
      })}
    </div>
  );
}

function StrengthMeter({ score, label }) {
  const cols = [
    { min: 1, color: 'bg-[var(--error)]' },
    { min: 2, color: 'bg-amber-400' },
    { min: 3, color: 'bg-[var(--success)]' },
  ];
  return (
    <div className="mt-1.5 flex items-center gap-2 animate-[fade-in-up_0.2s_ease-out_both]">
      <div className="flex gap-1 flex-1">
        {cols.map((c, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: score >= c.min ? 1 : 0.6 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className={`h-1.5 flex-1 rounded-full transition-colors origin-left ${score >= c.min ? c.color : 'bg-[var(--border)]'}`}
          />
        ))}
      </div>
      {label && <span className="text-[10px] font-bold text-[var(--ink-faint)] whitespace-nowrap">{label}</span>}
    </div>
  );
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function Signup() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, user, loading: authLoading } = useAuth();
  const { t } = useI18n();
  const [isBroker, setIsBroker] = useState(params.get('role') === 'broker');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showAgreement, setShowAgreement] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);

  const schema = useMemo(() => createSignupSchema(isBroker), [isBroker]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    clearErrors,
    resetField,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      username: '', email: '', password: '', confirm_password: '', phone_number: '',
      business_name: '', terms: false,
    },
  });

  const passwordValue = watch('password');
  const pwOk = passwordRules(passwordValue).all;
  const pwScore = passwordRules(passwordValue).all
    ? 3
    : Object.values(passwordRules(passwordValue)).filter(Boolean).length - 1;

  const strengthLabel = pwScore === 3 ? t('auth_strength_strong') : pwScore === 2 ? t('auth_strength_good') : pwScore === 1 ? t('auth_strength_weak') : null;

  const localize = (msg) => (msg && VAL_MSG_KEYS[msg] ? t(VAL_MSG_KEYS[msg]) : msg);

  const showErr = (f) => localize(touchedFields[f] ? errors[f]?.message : undefined);
  const showSuccess = (f, value) => (touchedFields[f] && !errors[f] && value ? true : false);

  const toggleRole = (broker) => {
    if (broker === isBroker) return;
    setIsBroker(broker);
    clearErrors(['business_name', 'terms', 'confirm_password']);
    resetField('business_name');
    setServerError('');
  };

  const onSubmit = handleSubmit((values) => {
    setServerError('');
    if (!getValues('terms')) {
      setError('terms', { type: 'manual', message: t('err_terms') });
      return;
    }

    let formattedPhone = values.phone_number.trim();
    if (formattedPhone && !formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone.replace(/\D/g, '');
    }

    setPendingValues({
      ...values,
      formattedPhone,
    });
    setShowAgreement(true);
  });

  const handleConfirmAgreement = async () => {
    const payload = {
      username: pendingValues.username.trim().replace(/\s+/g, '_'),
      email: pendingValues.email.trim(),
      password: pendingValues.password,
      phone_number: pendingValues.formattedPhone,
      business_name: isBroker ? pendingValues.business_name.trim() : undefined,
      role: isBroker ? 'broker' : 'regular',
    };

    try {
      const res = await api.post('/auth/signup', payload);
      if (res.data.status === 'pending_approval') {
        navigate('/broker-pending');
      } else {
        setUser(res.data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      const fieldErrors = normalizeApiErrors(err.response?.data);
      if (Object.keys(fieldErrors).length) {
        for (const [k, msg] of Object.entries(fieldErrors)) setError(k, { message: msg });
      } else {
        setServerError(err.response?.data?.error || 'Something went wrong. Please try again.');
      }
      setShowAgreement(false);
    }
  };

  if (authLoading) return null;
  if (user) return <Navigate to="/dashboard" replace />;



  return (
    <AuthLayout
      title="auth_signup_title"
      subtitle="auth_signup_subtitle"
      brand={{ prefixKey: 'auth_already_have', labelKey: 'auth_login_here', to: '/login' }}
    >
      <motion.div variants={stagger} initial="hidden" animate="show">
        {/* Role switcher */}
        <motion.div variants={fadeUp} className="mb-5">
          <div className="flex gap-1.5 p-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-soft)]" role="tablist" aria-label="Account type">
            {[
              { v: false, labelKey: 'auth_individual', icon: User },
              { v: true, labelKey: 'auth_broker', icon: Building2 },
            ].map(({ v, labelKey, icon: Icon }) => (
              <motion.button
                key={labelKey}
                type="button"
                role="tab"
                aria-selected={isBroker === v}
                onClick={() => toggleRole(v)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-extrabold transition-all ${
                  isBroker === v ? 'text-white' : 'text-[var(--ink-soft)] hover:text-[var(--primary)]'
                }`}
              >
                {isBroker === v && (
                  <motion.div
                    layoutId="role-pill"
                    className="absolute inset-0 grad-primary rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {t(labelKey)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {serverError && (
          <motion.div variants={fadeUp} className="mb-5">
            <ErrorCard message={serverError} onDismiss={() => setServerError('')} />
          </motion.div>
        )}

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <motion.div variants={fadeUp}>
            <TextField
              label={t('auth_full_name')}
              placeholder={t('auth_full_name_placeholder')}
              icon={<User className="w-4 h-4" />}
              error={showErr('username')}
              success={showSuccess('username', touchedFields.username) ? t('auth_valid') : undefined}
              autoComplete="name"
              {...register('username')}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <TextField
              label={t('auth_email_label')}
              placeholder={t('auth_email_placeholder')}
              icon={<Mail className="w-4 h-4" />}
              error={showErr('email')}
              success={showSuccess('email', touchedFields.email) ? t('auth_valid') : undefined}
              autoComplete="email"
              inputMode="email"
              {...register('email')}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <PhoneNumberField
              label={t('auth_mobile_label')}
              error={showErr('phone_number')}
              success={showSuccess('phone_number', touchedFields.phone_number) ? t('auth_valid') : undefined}
              {...register('phone_number')}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <TextField
              label={t('auth_create_password')}
              type={showPw ? 'text' : 'password'}
              icon={<Lock className="w-4 h-4" />}
              error={showErr('password')}
              success={showSuccess('password', passwordValue) ? t('auth_looks_strong') : undefined}
              autoComplete="new-password"
              right={
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? t('auth_hide_password') : t('auth_show_password')}
                  className="absolute right-3 top-[0.8rem] text-[var(--ink-faint)] hover:text-[var(--primary)] transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              {...register('password')}
            />
          </motion.div>

          <AnimatePresence>
            {touchedFields.password && passwordValue && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <PasswordChecklist value={passwordValue} t={t} />
                <StrengthMeter score={pwScore} label={strengthLabel} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={fadeUp}>
            <TextField
              label={t('auth_confirm_password')}
              placeholder={t('auth_confirm_placeholder')}
              type={showConfirm ? 'text' : 'password'}
              icon={<Lock className="w-4 h-4" />}
              error={showErr('confirm_password')}
              success={showSuccess('confirm_password', touchedFields.confirm_password) ? t('auth_valid') : undefined}
              autoComplete="new-password"
              right={
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? t('auth_hide_password') : t('auth_show_password')}
                  className="absolute right-3 top-[0.8rem] text-[var(--ink-faint)] hover:text-[var(--primary)] transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              {...register('confirm_password')}
            />
          </motion.div>

          <AnimatePresence>
            {isBroker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <TextField
                  label={t('auth_business_name')}
                  placeholder={t('auth_business_placeholder')}
                  icon={<Building2 className="w-4 h-4" />}
                  error={showErr('business_name')}
                  success={showSuccess('business_name', touchedFields.business_name) ? t('auth_valid') : undefined}
                  {...register('business_name')}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={fadeUp}>
            <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register('terms')}
                className="mt-0.5 w-4 h-4 accent-[var(--primary)]"
              />
              <span className={`text-[11px] font-semibold leading-tight ${errors.terms ? 'text-[var(--error)]' : 'text-[var(--ink-soft)]'}`}>
                {t('auth_terms_i_agree')}{' '}
                <span className="text-[var(--primary)] hover:underline cursor-pointer">{t('auth_terms_conditions')}</span>{' '}
                <span className="text-[var(--ink-faint)]">{t('auth_and')}</span>{' '}
                <span className="text-[var(--primary)] hover:underline cursor-pointer">{t('auth_privacy_policy')}</span>
              </span>
            </label>
            {errors.terms && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-[var(--error)] mt-1"
                role="alert"
              >
                {errors.terms.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              success={pwOk && !isSubmitting}
              className="mt-2"
            >
              {isBroker ? t('auth_register_broker') : t('auth_register_individual')}
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--ink-faint)] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--success)]" aria-hidden="true" />
            {t('auth_encrypted_note')}
          </motion.div>
        </form>
      </motion.div>

      {/* Agreement Modal Overlay */}
      <AnimatePresence>
        {showAgreement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowAgreement(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="absolute top-4 left-4 z-10">
                <button onClick={() => setShowAgreement(false)} className="p-2 bg-white/80 hover:bg-gray-100 rounded-full transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
              </div>
              
              <div className="p-8 sm:p-10 flex flex-col items-center space-y-8">
                <div className="flex justify-center mt-2">
                  <svg viewBox="0 0 1000 1000" className="w-12 h-12 text-[#E31C5F] fill-current" aria-hidden="true" role="presentation" focusable="false"><path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-55 0-98 21-128.1 64-51 75.1-29 191.1 90 340.2-72 80-156.1 139-241.1 102-44-19-76-58-83-105-9-61 110-252.1 350.2-538.1 23-28 59-42 97-42s74 14 97 42c240.1 286.1 359.2 477.1 350.2 538.1zm-288.1-434.2c-21-25-46-34-74-34s-53 9-74 34c-47 54-72 114.1-72 174.1s25 120.1 72 174.1c21 25 46 34 74 34s53-9 74-34c47-54 72-114.1 72-174.1s-25-120.1-72-174.1zm-404.2 344.2c-56 36-111 65-163.1 83-44 15-88.1 16-128.1-1-66-28-111-89-122-162-13-88 111-285.1 346.2-566.2 31-38 80-57 131.1-57s100 19 131.1 57c235.1 281.1 359.2 478.1 346.2 566.2-11 73-56 134-122 162-40 17-84.1 16-128.1 1-52-18-107-47-163.1-83 75.1 95 167.1 156.1 253.1 119 56-24 95-75 104-138 10-64-114.1-255.1-348.2-534.2-18-22-44-32-72-32s-54 10-72 32c-234.1 279.1-358.2 470.1-348.2 534.2 9 63 48 114.1 104 138 86 37 178.1-24 253.1-119z"></path></svg>
                </div>
                
                <h1 className="text-3xl font-bold text-center text-gray-900 tracking-tight">Everyone belongs here</h1>
                
                <div className="space-y-6 text-center">
                  <p className="text-[17px] text-gray-800 leading-relaxed">
                    When you join Airbnb, we ask you to agree to our <span className="font-semibold underline underline-offset-2">Community Commitment</span>:
                  </p>
                  <p className="text-[17px] text-gray-800 leading-relaxed">
                    I will treat everyone in the community—regardless of their race, religion, national origin, ethnicity, skin colour, disability, sex, gender identity, sexual orientation, or age—with respect, and without judgment or bias.
                  </p>
                </div>

                <div className="pt-6 w-full space-y-4">
                  <button
                    onClick={handleConfirmAgreement}
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#E31C5F] hover:bg-[#c1144e] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                  >
                    Agree and continue
                  </button>
                  <button
                    onClick={() => setShowAgreement(false)}
                    className="w-full py-4 px-6 text-gray-900 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
