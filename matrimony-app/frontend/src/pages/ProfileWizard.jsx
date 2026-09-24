import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Camera, Check, FileText, GraduationCap, Heart, Landmark,
  MapPin, Ruler, Star, User, Users, UserRound, Wallet, X, Save, ImagePlus,
} from 'lucide-react';
import api, { uploadsUrl } from '../api';
import { useAuth } from '../context/AuthContext';
import { Button, Stepper, ProgressBar, Badge, ErrorCard, TextField, SelectField, SearchableSelect, TextareaField, useToast, HeightSelector } from '../components/ui';
import IntroVideoStep from '../components/ui/IntroVideoStep';
import { profileSteps, validateStep, POSTED_BY } from '../lib/validation';

const STEP_ICONS = { User, GraduationCap, Ruler, Heart, Wallet, Landmark, Star, MapPin, Camera, FileText };

const DIET_OPTIONS = [
  { value: 'any', label: 'Any / Flexible' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'non_vegetarian', label: 'Non-Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'jain', label: 'Jain' },
];
const FAMILY_VALUES = [
  { value: 'traditional', label: 'Traditional' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'liberal', label: 'Liberal' },
];
const CAREER_GOALS = [
  { value: 'working', label: 'Career Oriented / Working' },
  { value: 'home_maker', label: 'Home Maker' },
  { value: 'open', label: 'Flexible / Open' },
];
const RELOCATE = [
  { value: 'open', label: 'Open to Relocate' },
  { value: 'local_only', label: 'Local Only' },
  { value: 'overseas_only', label: 'Overseas Only' },
];
const INCOME_RANGE = [
  { value: 'Under $50k', label: 'Under $50k' },
  { value: '$50k - $100k', label: '$50k - $100k' },
  { value: '$100k - $150k', label: '$100k - $150k' },
  { value: '$150k+', label: '$150k+' },
];
const MANGLIK = [
  { value: 'no', label: 'No Dosham / Non-Manglik' },
  { value: 'yes', label: 'Chevvai Dosham / Manglik' },
  { value: 'dont_know', label: "Don't Know" },
];

const EMPTY_FORM = {
  profile_registered_for: 'Self', name: '', gender: '', date_of_birth: '',
  height_feet: '5', height_inches: '6', education: '', occupation: '',
  religion_id: '', caste_id: '', sub_religion: '', raasi_id: '', star_id: '',
  born_country_id: '', current_country_id: '', city_or_state: '', about_me: '',
  blur_photo: 0, blur_horoscope: 0,
  diet: 'any', family_values: 'moderate', career_goals: 'working',
  willing_to_relocate: 'open', income_range: '$50k - $100k', manglik_status: 'no',
  intro_video_status: '',
};

const DRAFT_KEY_PREFIX = 'mukurtham_draft_';

function OptionSelect({ label, options, value, onChange, name, required, error, help }) {
  return (
    <SelectField
      label={label}
      options={options}
      value={value}
      name={name}
      onChange={onChange}
      required={required}
      error={error}
      help={help}
    />
  );
}

function ToggleRow({ label, hint, checked, onChange }) {
  return (
    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] cursor-pointer hover:border-[var(--primary-strong)] transition-colors">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked ? 1 : 0)} className="mt-0.5 w-4 h-4 accent-[var(--primary)]" />
      <span>
        <span className="block text-sm font-bold text-[var(--ink)]">{label}</span>
        <span className="block text-xs text-[var(--ink-faint)] mt-0.5">{hint}</span>
      </span>
    </label>
  );
}

function PhotoField({ label, accept, file, onFile, existing }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  const displayUrl = preview || (existing ? uploadsUrl(existing) : null);

  return (
    <div>
      <label className="block text-xs font-bold text-[var(--ink-soft)] mb-1.5">{label}</label>
      {displayUrl && (
        <div className="mb-2 relative w-24 h-24 rounded-xl overflow-hidden border-2 border-[var(--border)] shadow-sm bg-[var(--surface-soft)] flex items-center justify-center">
          {existing?.endsWith('.pdf') && !preview ? (
            <div className="text-center p-2">
              <FileText className="w-8 h-8 mx-auto text-[var(--primary)]" />
              <span className="text-[10px] font-bold block text-[var(--ink-soft)]">PDF</span>
            </div>
          ) : (
            <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="file"
          accept={accept}
          onChange={(e) => onFile(e.target.files?.[0] || null)}
          className="input-base file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--primary-soft)] file:text-[var(--primary-strong)] file:font-bold file:text-xs file:px-3 file:py-1.5 file:cursor-pointer cursor-pointer"
        />
      </div>
      {file && (
        <p className="text-[11px] font-semibold text-[var(--success)] mt-1 flex items-center gap-1">
          <Check className="w-3.5 h-3.5" aria-hidden="true" /> {file.name} ({(file.size / (1024 * 1024)).toFixed(1)} MB)
        </p>
      )}
      {!file && existing && (
        <p className="text-[11px] text-[var(--ink-faint)] mt-1 truncate">
          Current: <span className="font-semibold">{existing}</span>
        </p>
      )}
    </div>
  );
}

export default function ProfileWizard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const toast = useToast();

  const [meta, setMeta] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(isEdit);
  const [checkingExisting, setCheckingExisting] = useState(!isEdit);
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [horoscopeFile, setHoroscopeFile] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState(null);
  const [existingHoroscope, setExistingHoroscope] = useState(null);
  const [introVideoFile, setIntroVideoFile] = useState(null);
  const [introVideoDuration, setIntroVideoDuration] = useState(0);
  const [tempVideoKey, setTempVideoKey] = useState(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [videoUploading, setVideoUploading] = useState(false);
  const [draftStatus, setDraftStatus] = useState('');
  const contentRef = useRef(null);
  const [userId, setUserId] = useState('anon');

  const draftKey = `${DRAFT_KEY_PREFIX}${userId}`;

  const stepErrors = useMemo(() => validateStep(step, form), [step, form]);
  const completion = useMemo(() => {
    let done = 0;
    profileSteps.forEach((_, i) => { if (Object.keys(validateStep(i, form)).length === 0) done += 1; });
    return Math.round((done / profileSteps.length) * 100);
  }, [form]);
  const validSteps = useMemo(
    () => profileSteps.map((_, i) => Object.keys(validateStep(i, form)).length === 0),
    [form]
  );
  const maxReachable = useMemo(() => {
    let m = 0;
    while (m < profileSteps.length && validSteps[m]) m += 1;
    return m;
  }, [validSteps]);

  useEffect(() => {
    api.get('/profiles/meta').then((res) => setMeta(res.data)).catch(() => setMeta({ religions: [], castes: [], raasis: [], stars: [], countries: [] }));
  }, []);

  useEffect(() => {
    if (isEdit) { setCheckingExisting(false); return; }
    if (!user) return;
    if (user.role !== 'regular') { setCheckingExisting(false); return; }
    api.get('/profiles/mine')
      .then((res) => {
        const list = res.data.profiles || res.data || [];
        if (list.length > 0) {
          navigate(`/profile/${list[0].id}/edit`, { replace: true });
        } else {
          setCheckingExisting(false);
        }
      })
      .catch(() => setCheckingExisting(false));
  }, [id, isEdit, user]);

  useEffect(() => {
    if (!isEdit) return;
    setLoadingProfile(true);
    api.get(`/profiles/${id}`).then((res) => {
      const p = res.data.profile;
      setForm({
        ...EMPTY_FORM,
        profile_registered_for: p.profile_registered_for || 'Self',
        name: p.name || '', gender: p.gender || '', date_of_birth: p.date_of_birth || '',
        height_feet: String(p.height_feet ?? '5'), height_inches: String(p.height_inches ?? '6'),
        education: p.education || '', occupation: p.occupation || '',
        religion_id: p.religion_id ?? '', caste_id: p.caste_id ?? '', sub_religion: p.sub_religion || '',
        raasi_id: p.raasi_id ?? '', star_id: p.star_id ?? '',
        born_country_id: p.born_country_id || '', current_country_id: p.current_country_id || '',
        city_or_state: p.city_or_state || '', about_me: p.about_me || '',
        blur_photo: p.blur_photo ?? 0, blur_horoscope: p.blur_horoscope ?? 0,
        diet: p.diet || 'any', family_values: p.family_values || 'moderate',
        career_goals: p.career_goals || 'working', willing_to_relocate: p.willing_to_relocate || 'open',
        income_range: p.income_range || '$50k - $100k', manglik_status: p.manglik_status || 'no',
        intro_video_status: p.has_intro_video ? 'uploaded' : 'skipped',
      });
      setExistingPhoto(p.main_profile_picture);
      setExistingHoroscope(p.horoscope_chart);
      setLoadingProfile(false);
    }).catch(() => { setLoadingProfile(false); toast.error('Could not load profile'); });
  }, [id, isEdit, toast]);

  // Restore draft (create mode only)
  useEffect(() => {
    if (isEdit) return;
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const draft = JSON.parse(raw);
        setForm((f) => ({ ...f, ...draft.form }));
        setStep(Math.min(draft.step || 0, profileSteps.length - 1));
        setDraftStatus(draft.savedAt ? `Draft restored · ${draft.savedAt}` : 'Draft restored');
        toast.info('Draft restored', { duration: 4000 });
      }
    } catch { /* ignore corrupt draft */ }
  }, [draftKey, isEdit, toast]);

  // Autosave draft (create mode), debounced
  useEffect(() => {
    if (isEdit) return;
    const tId = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ form, step, savedAt: new Date().toLocaleTimeString() }));
        setDraftStatus(`Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      } catch { /* storage full */ }
    }, 900);
    return () => clearTimeout(tId);
  }, [form, step, draftKey, isEdit]);

  const clearDraft = useCallback(() => {
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
    setDraftStatus('');
    setForm(EMPTY_FORM);
    setStep(0);
    setTouched({});
    toast.info('Draft cleared');
  }, [draftKey, toast]);

  const set = (field) => (ev) => setForm((f) => ({ ...f, [field]: ev.target.value }));
  const blur = (field) => () => setTouched((tt) => ({ ...tt, [field]: true }));

  const focusFirstInvalid = useCallback((errs) => {
    requestAnimationFrame(() => {
      for (const f of profileSteps[step].fields) {
        if (errs[f]) {
          const el = contentRef.current?.querySelector(`[name="${f}"]`);
          if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
        }
      }
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [step]);

  const markStepTouched = useCallback(() => {
    setTouched((tt) => ({ ...tt, ...Object.fromEntries(profileSteps[step].fields.map((f) => [f, true])) }));
  }, [step]);

  const goNext = () => {
    markStepTouched();
    const errs = validateStep(step, form);
    if (Object.keys(errs).length) {
      focusFirstInvalid(errs);
      toast.error(`Please fix the highlighted fields in "${profileSteps[step].title}"`);
      return;
    }
    setStep((s) => Math.min(s + 1, profileSteps.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const goToStep = (i) => {
    if (i < step) { setStep(i); return; }
    if (i === step || (i <= maxReachable)) setStep(i);
    else toast.error(`Complete the previous steps first`);
  };

  const handleSubmit = async () => {
    const allErrors = profileSteps.map((_, i) => validateStep(i, form));
    const firstBad = allErrors.findIndex((e) => Object.keys(e).length > 0);
    if (firstBad !== -1) {
      setStep(firstBad);
      setTouched((tt) => ({ ...tt, ...Object.fromEntries(profileSteps[firstBad].fields.map((f) => [f, true])) }));
      requestAnimationFrame(() => {
        for (const f of profileSteps[firstBad].fields) {
          const el = contentRef.current?.querySelector(`[name="${f}"]`);
          if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus({ preventScroll: true }); break; }
        }
      });
      toast.error(`Complete "${profileSteps[firstBad].title}" first`);
      return;
    }

    setSubmitting(true);
    setServerError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photoFile) fd.append('main_profile_picture', photoFile);
      if (horoscopeFile) fd.append('horoscope_chart', horoscopeFile);
      
      let profileId = id;
      if (isEdit) {
        await api.put(`/profiles/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Profile updated successfully');
      } else {
        const res = await api.post('/profiles', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        profileId = res.data.profile.id;
        clearDraft();
        toast.success('Profile created — uploading video...');
      }

      if (tempVideoKey) {
        // Video was already uploaded via chunks, just associate it with the profile
        const videoFd = new FormData();
        videoFd.append('temp_video_key', tempVideoKey);
        videoFd.append('duration_seconds', String(introVideoDuration));
        try {
          await api.post(`/profiles/${profileId}/intro-video`, videoFd, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          toast.success('Introduction video saved successfully!');
        } catch (videoErr) {
          console.error('Video link failed:', videoErr.response?.data || videoErr.message);
          const vMsg = videoErr.response?.data?.error || 'Failed to link video to profile.';
          toast.error(vMsg);
          setServerError(vMsg);
          setSubmitting(false);
          return;
        }
      }

      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || Object.values(err.response?.data?.errors || {})[0] || `Could not ${isEdit ? 'update' : 'create'} profile`;
      setServerError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const loading = !meta || loadingProfile || checkingExisting;

  const StepIcon = STEP_ICONS[profileSteps[step].icon] || User;
  const stepperSteps = profileSteps.map((s) => ({ label: s.title, hint: s.hint }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center grad-hero">
        <div className="flex flex-col items-center gap-3 text-[var(--ink-soft)]">
          <div className="w-10 h-10 rounded-full border-4 border-[var(--border-strong)] border-t-[var(--primary)] animate-spin" />
          <p className="text-sm font-semibold">Loading form…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 grad-hero">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-widest">
              {isEdit ? 'Edit Profile' : 'New Profile'} · Step {step + 1} of {profileSteps.length}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-1">
              {isEdit ? 'Update your profile' : 'Tell us about yourself'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full px-4 py-2 border border-[var(--border)] bg-[var(--surface)] shadow-sm">
              <Save className="w-3.5 h-3.5 text-[var(--ink-faint)]" aria-hidden="true" />
              <span className="text-[11px] font-bold text-[var(--ink-soft)]">
                {draftStatus || (isEdit ? 'Save to apply changes' : 'Autosave on')}
              </span>
              {!isEdit && draftStatus && (
                <button type="button" onClick={clearDraft} className="text-[var(--ink-faint)] hover:text-[var(--error)]" aria-label="Clear draft">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* ── Sidebar ── */}
          <div className="hidden lg:block">
            <div className="glass-card p-7 sticky top-8">
              <div className="mb-6">
                <p className="text-[10px] font-bold text-[var(--ink-faint)] uppercase tracking-widest mb-3">Profile completion</p>
                <ProgressBar value={completion} />
              </div>
              <Stepper vertical steps={stepperSteps} current={step} onStepClick={goToStep} />
            </div>
          </div>

          {/* ── Content ── */}
          <div className="glass-card p-7 sm:p-10" ref={contentRef}>
            {/* Mobile progress */}
            <div className="lg:hidden mb-8">
              <p className="text-[10px] font-bold text-[var(--ink-faint)] uppercase tracking-widest mb-2">Profile completion</p>
              <ProgressBar value={completion} className="mb-5" />
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {stepperSteps.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => goToStep(i)}
                    aria-current={i === step ? 'step' : undefined}
                    className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold border transition-all ${
                      i === step
                        ? 'grad-primary text-white border-transparent shadow-md'
                        : i < maxReachable
                          ? 'border-[var(--border-strong)] text-[var(--ink-soft)] bg-[var(--surface)]'
                          : 'border-[var(--border)] text-[var(--ink-faint)] bg-[var(--surface-soft)]'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${i < step ? 'bg-white/25' : ''}`}>
                      {i < step ? <Check className="w-3 h-3" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {/* Step heading */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[var(--border)]">
                  <div className="w-13 h-13 min-w-[3.25rem] min-h-[3.25rem] rounded-2xl grad-primary flex items-center justify-center text-white shadow-lg shrink-0">
                    <StepIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-widest">
                      {isEdit ? 'Edit' : 'Step'} {step + 1} of {profileSteps.length}
                    </p>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--ink)] leading-tight mt-0.5">
                      {profileSteps[step].title}
                    </h2>
                    {profileSteps[step].hint && (
                      <p className="text-[13px] text-[var(--ink-faint)] mt-1">{profileSteps[step].hint}</p>
                    )}
                  </div>
                  {validSteps[step] && <Badge variant="success" className="ml-auto">Complete</Badge>}
                </div>

                {serverError && (
                  <div className="mb-6">
                    <ErrorCard message={serverError} onDismiss={() => setServerError('')} />
                  </div>
                )}

                <div className="wizard-fields">
                  {step === 0 && (
                    <>
                      <SelectField
                        label="Profile Posted By"
                        options={POSTED_BY.map((p) => ({ value: p, label: p }))}
                        value={form.profile_registered_for}
                        onChange={set('profile_registered_for')}
                        name="profile_registered_for"
                      />
                      <TextField
                        label="Full Name"
                        placeholder="Priya Sutharsan"
                        value={form.name}
                        onChange={set('name')}
                        onBlur={blur('name')}
                        name="name"
                        error={touched.name && stepErrors.name}
                        help="Min 2 characters, letters and spaces only"
                        required
                      />
                      <div>
                        <p className="block text-xs font-bold text-[var(--ink-soft)] mb-1.5">
                          Gender<span className="text-[var(--error)]"> *</span>
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {[['M', 'Male', User], ['F', 'Female', Users]].map(([v, label, Icon]) => (
                            <button
                              type="button"
                              key={v}
                              name="gender"
                              onClick={() => setForm((f) => ({ ...f, gender: v }))}
                              onBlur={blur('gender')}
                              aria-pressed={form.gender === v}
                              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                                form.gender === v
                                  ? 'grad-primary text-white border-transparent shadow-lg'
                                  : 'border-[var(--border-strong)] text-[var(--ink-soft)] bg-[var(--surface)] hover:border-[var(--primary)]'
                              }`}
                            >
                              <Icon className="w-4 h-4" aria-hidden="true" />
                              {label}
                            </button>
                          ))}
                        </div>
                        {touched.gender && stepErrors.gender && (
                          <p className="text-[13px] font-semibold text-[var(--error)] mt-2" role="alert">{stepErrors.gender}</p>
                        )}
                      </div>
                      <TextField
                        label="Date of Birth"
                        type="date"
                        value={form.date_of_birth}
                        onChange={set('date_of_birth')}
                        onBlur={blur('date_of_birth')}
                        name="date_of_birth"
                        error={touched.date_of_birth && stepErrors.date_of_birth}
                        floating={false}
                        help="Must be 18 years or older"
                        required
                      />
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <TextField
                        label="Education Level"
                        placeholder="B.Eng in Software Engineering"
                        value={form.education}
                        onChange={set('education')}
                        onBlur={blur('education')}
                        name="education"
                        error={touched.education && stepErrors.education}
                        floating={false}
                        required
                      />
                      <TextField
                        label="Current Occupation"
                        placeholder="Senior Data Scientist"
                        value={form.occupation}
                        onChange={set('occupation')}
                        onBlur={blur('occupation')}
                        name="occupation"
                        error={touched.occupation && stepErrors.occupation}
                        floating={false}
                        required
                      />
                    </>
                  )}

                  {step === 2 && (
                    <div className="w-full">
                      <HeightSelector
                        feetValue={form.height_feet}
                        inchesValue={form.height_inches}
                        onChange={(vals) => setForm((f) => ({ ...f, height_feet: vals.feet, height_inches: vals.inches }))}
                        errorFeet={touched.height_feet && stepErrors.height_feet}
                        errorInches={touched.height_inches && stepErrors.height_inches}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <>
                      <OptionSelect label="Dietary Preference" options={DIET_OPTIONS} value={form.diet} onChange={set('diet')} name="diet" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <OptionSelect label="Family Values" options={FAMILY_VALUES} value={form.family_values} onChange={set('family_values')} name="family_values" />
                        <OptionSelect label="Career Goals" options={CAREER_GOALS} value={form.career_goals} onChange={set('career_goals')} name="career_goals" />
                      </div>
                      <OptionSelect label="Relocation Willingness" options={RELOCATE} value={form.willing_to_relocate} onChange={set('willing_to_relocate')} name="willing_to_relocate" />
                    </>
                  )}

                  {step === 4 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <OptionSelect label="Annual Income Range" options={INCOME_RANGE} value={form.income_range} onChange={set('income_range')} name="income_range" />
                      <OptionSelect label="Manglik / Chevvai Dosham" options={MANGLIK} value={form.manglik_status} onChange={set('manglik_status')} name="manglik_status" />
                    </div>
                  )}

                  {step === 5 && (
                    <>
                      <SearchableSelect
                        label="Religion"
                        options={(meta.religions || []).map((r) => ({ value: String(r.id), label: `${r.name_en} / ${r.name_ta}` }))}
                        value={form.religion_id}
                        onChange={set('religion_id')}
                        onBlur={blur('religion_id')}
                        name="religion_id"
                        error={touched.religion_id && stepErrors.religion_id}
                        required
                      />
                      <SearchableSelect
                        label="Caste / Saathi"
                        options={(meta.castes || []).map((c) => ({ value: String(c.id), label: `${c.name_en} / ${c.name_ta}` }))}
                        value={form.caste_id}
                        onChange={set('caste_id')}
                        onBlur={blur('caste_id')}
                        name="caste_id"
                        error={touched.caste_id && stepErrors.caste_id}
                        required
                      />
                      <TextField
                        label="Sub-Religion / Sect"
                        placeholder="Saiva Siddhantam"
                        value={form.sub_religion}
                        onChange={set('sub_religion')}
                        name="sub_religion"
                        floating={false}
                      />
                    </>
                  )}

                  {step === 6 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <SearchableSelect
                        label="Zodiac / Raasi"
                        options={(meta.raasis || []).map((r) => ({ value: String(r.id), label: `${r.name_en} / ${r.name_ta}` }))}
                        value={form.raasi_id}
                        onChange={set('raasi_id')}
                        onBlur={blur('raasi_id')}
                        name="raasi_id"
                        error={touched.raasi_id && stepErrors.raasi_id}
                        required
                      />
                      <SearchableSelect
                        label="Star / Nakshatram"
                        options={(meta.stars || []).map((s) => ({ value: String(s.id), label: `${s.name_en} / ${s.name_ta}` }))}
                        value={form.star_id}
                        onChange={set('star_id')}
                        onBlur={blur('star_id')}
                        name="star_id"
                        error={touched.star_id && stepErrors.star_id}
                        required
                      />
                    </div>
                  )}

                  {step === 7 && (
                    <>
                      <SearchableSelect
                        label="Country of Birth"
                        options={(meta.countries || []).map((c) => ({ value: c.code, label: c.name_ta ? `${c.name_en} / ${c.name_ta}` : c.name_en }))}
                        value={form.born_country_id}
                        onChange={set('born_country_id')}
                        onBlur={blur('born_country_id')}
                        name="born_country_id"
                        error={touched.born_country_id && stepErrors.born_country_id}
                        required
                      />
                      <SearchableSelect
                        label="Current Country of Residence"
                        options={(meta.countries || []).map((c) => ({ value: c.code, label: c.name_ta ? `${c.name_en} / ${c.name_ta}` : c.name_en }))}
                        value={form.current_country_id}
                        onChange={set('current_country_id')}
                        onBlur={blur('current_country_id')}
                        name="current_country_id"
                        error={touched.current_country_id && stepErrors.current_country_id}
                        required
                      />
                      <TextField
                        label="Current City or State"
                        placeholder="Toronto"
                        value={form.city_or_state}
                        onChange={set('city_or_state')}
                        onBlur={blur('city_or_state')}
                        name="city_or_state"
                        error={touched.city_or_state && stepErrors.city_or_state}
                        floating={false}
                        required
                      />
                    </>
                  )}

                  {step === 8 && (
                    <div className="wizard-fields">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <PhotoField
                          label="Main Profile Photo (Images up to 50MB)"
                          accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.jfif,.avif"
                          file={photoFile}
                          onFile={setPhotoFile}
                          existing={existingPhoto}
                        />
                        <PhotoField
                          label="Horoscope Chart (Image or PDF up to 50MB)"
                          accept=".jpg,.jpeg,.png,.pdf,.webp,.heic,.heif"
                          file={horoscopeFile}
                          onFile={setHoroscopeFile}
                          existing={existingHoroscope}
                        />
                      </div>
                      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 space-y-4">
                        <p className="text-sm font-bold text-[var(--ink)]">Privacy & Photo Settings</p>
                        <ToggleRow
                          label="Blur my photo"
                          hint="Your photo stays hidden until you accept an interest"
                          checked={form.blur_photo === 1}
                          onChange={(v) => setForm((f) => ({ ...f, blur_photo: v }))}
                        />
                        <ToggleRow
                          label="Blur my horoscope"
                          hint="Keep your horoscope private until mutual interest"
                          checked={form.blur_horoscope === 1}
                          onChange={(v) => setForm((f) => ({ ...f, blur_horoscope: v }))}
                        />
                      </div>
                    </div>
                  )}

                  {step === 9 && (
                    <>
                      <TextareaField
                        label="About Me"
                        placeholder="Hello, looking for an understanding partner who values family traditions…"
                        value={form.about_me}
                        onChange={set('about_me')}
                        onBlur={blur('about_me')}
                        name="about_me"
                        rows={6}
                        counter={2000}
                        error={touched.about_me && stepErrors.about_me}
                        help="Minimum 50 characters — tell your story, interests and what you value in a partner"
                        required
                      />
                    </>
                  )}

                  {step === 10 && (
                    <>
                      <IntroVideoStep 
                        hasExisting={form.intro_video_status === 'uploaded'}
                        onVideoSelected={(file, duration, tempKey) => {
                          setIntroVideoFile(file);
                          setIntroVideoDuration(duration);
                          setTempVideoKey(tempKey);
                          setForm(f => ({ ...f, intro_video_status: file ? 'selected' : (f.intro_video_status === 'uploaded' ? 'uploaded' : '') }));
                          if (file) setTouched(t => ({ ...t, intro_video_status: true }));
                        }}
                        error={touched.intro_video_status && stepErrors.intro_video_status}
                      />
                      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 flex items-start gap-3 mt-4">
                        <Check className="w-5 h-5 text-[var(--success)] shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-[13px] text-[var(--ink-soft)] leading-relaxed">
                          Your profile is <strong className="text-[var(--ink)]">{completion}% complete</strong>. Review the
                          summary below before publishing.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Video Upload Progress */}
            {videoUploading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-sm flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center">
                    <Camera className="w-7 h-7 text-[var(--primary)]" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-800 text-base">Uploading Video…</p>
                    <p className="text-xs text-slate-400 mt-1">Please wait, do not close this page</p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-300"
                      style={{ width: `${videoUploadProgress}%` }}
                    />
                  </div>
                  <p className="font-bold text-[var(--primary)] text-lg">{videoUploadProgress}%</p>
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="wizard-footer">
              <Button variant="secondary" onClick={goBack} disabled={step === 0 || submitting}>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back
              </Button>
              {step < profileSteps.length - 1 ? (
                <Button onClick={goNext} disabled={submitting}>
                  Continue
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} loading={submitting} success={completion === 100 && !submitting}>
                  {isEdit ? 'Update Profile' : 'Publish Profile'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
