import { Router } from 'express';
import multer from 'multer';
import {
  createProfile,
  getProfile,
  getMyProfiles,
  updateProfile,
  uploadProfilePhotos,
  uploadHoroscope,
  getPreferences,
  savePreferences,
} from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { apiRateLimiter } from '../middleware/rateLimit.middleware';
import { z } from 'zod';

const router = Router();

// Configure Multer in-memory storage (file buffer passed to Cloudinary stream)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});

const normalizeProfileBody = (body: Record<string, any>) => {
  const out = { ...body };
  const fieldMap: Record<string, string> = {
    profileRegisteredFor: 'profileRegisteredFor',
    profile_registered_for: 'profileRegisteredFor',
    dateOfBirth: 'dateOfBirth',
    date_of_birth: 'dateOfBirth',
    heightFeet: 'heightFeet',
    height_feet: 'heightFeet',
    heightInches: 'heightInches',
    height_inches: 'heightInches',
    heightCm: 'heightCm',
    height_cm: 'heightCm',
    religionId: 'religionId',
    religion_id: 'religionId',
    casteId: 'casteId',
    caste_id: 'casteId',
    raasiId: 'raasiId',
    raasi_id: 'raasiId',
    starId: 'starId',
    star_id: 'starId',
    bornCountryId: 'bornCountryId',
    born_country_id: 'bornCountryId',
    currentCountryId: 'currentCountryId',
    current_country_id: 'currentCountryId',
    cityOrState: 'cityOrState',
    city_or_state: 'cityOrState',
    mainProfilePicture: 'mainProfilePicture',
    main_profile_picture: 'mainProfilePicture',
    aboutMe: 'aboutMe',
    about_me: 'aboutMe',
  };

  for (const [key, canonical] of Object.entries(fieldMap)) {
    if (out[key] !== undefined && out[canonical] === undefined) {
      out[canonical] = out[key];
    }
  }

  return out;
};

const validateProfileBody = (schema: z.ZodTypeAny) => {
  return (req: any, res: any, next: any) => {
    try {
      const parsed = schema.parse(req.body ?? {});
      req.body = normalizeProfileBody(parsed);
      next();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed. Please check your profile details.',
            code: 'VALIDATION_ERROR',
            fields: error.errors.map((err: any) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        });
        return;
      }
      next(error);
    }
  };
};

// Inline Zod schemas for quick validations
const profileInputSchema = z.object({
  profileRegisteredFor: z.enum(['self', 'son', 'daughter', 'brother', 'sister', 'relative', 'friend', 'client']).optional(),
  profile_registered_for: z.enum(['self', 'son', 'daughter', 'brother', 'sister', 'relative', 'friend', 'client']).optional(),
  name: z.string().min(2).max(100).optional(),
  gender: z.enum(['M', 'F']).optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  heightCm: z.number().int().min(100).max(250).optional(),
  height_cm: z.number().int().min(100).max(250).optional(),
  heightFeet: z.number().int().min(3).max(7).optional(),
  height_feet: z.number().int().min(3).max(7).optional(),
  heightInches: z.number().int().min(0).max(11).optional(),
  height_inches: z.number().int().min(0).max(11).optional(),
  education: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
  religionId: z.number().int().positive().optional(),
  religion_id: z.number().int().positive().optional(),
  casteId: z.number().int().positive().optional(),
  caste_id: z.number().int().positive().optional(),
  subReligion: z.string().max(100).optional().nullable(),
  sub_religion: z.string().max(100).optional().nullable(),
  raasiId: z.number().int().min(1).max(12).optional(),
  raasi_id: z.number().int().min(1).max(12).optional(),
  starId: z.number().int().min(1).max(27).optional(),
  star_id: z.number().int().min(1).max(27).optional(),
  bornCountryId: z.number().int().positive().optional(),
  born_country_id: z.number().int().positive().optional(),
  currentCountryId: z.number().int().positive().optional(),
  current_country_id: z.number().int().positive().optional(),
  cityOrState: z.string().min(2).max(100).optional(),
  city_or_state: z.string().min(2).max(100).optional(),
  mainProfilePicture: z.string().optional().nullable(),
  main_profile_picture: z.string().optional().nullable(),
  aboutMe: z.string().min(10).optional(),
  about_me: z.string().min(10).optional(),
}).passthrough();

const profileInputPartialSchema = profileInputSchema.partial();

/**
 * @route   POST /api/v1/profiles
 * @desc    Create a new matrimony profile
 * @access  Protected
 */
router.post(
  '/',
  authenticate,
  upload.fields([
    { name: 'main_profile_picture', maxCount: 1 },
    { name: 'horoscope_chart', maxCount: 1 },
  ]),
  apiRateLimiter,
  validateProfileBody(profileInputSchema),
  createProfile
);

/**
 * @route   GET /api/v1/profiles/me
 * @desc    Retrieve profiles managed by logged-in user
 * @access  Protected
 */
router.get('/me', authenticate, apiRateLimiter, getMyProfiles);

/**
 * @route   GET /api/v1/profiles/:id
 * @desc    Retrieve profile details
 * @access  Public (rate-limited)
 */
router.get('/:id', apiRateLimiter, getProfile);

/**
 * @route   PUT /api/v1/profiles/:id
 * @desc    Modify profile details
 * @access  Protected
 */
router.put(
  '/:id',
  authenticate,
  upload.fields([
    { name: 'main_profile_picture', maxCount: 1 },
    { name: 'horoscope_chart', maxCount: 1 },
  ]),
  apiRateLimiter,
  validateProfileBody(profileInputPartialSchema),
  updateProfile
);

/**
 * @route   POST /api/v1/profiles/:id/photos
 * @desc    Upload profile photo
 * @access  Protected
 */
router.post(
  '/:id/photos',
  authenticate,
  upload.single('photo'),
  uploadProfilePhotos
);

/**
 * @route   POST /api/v1/profiles/:id/horoscope
 * @desc    Upload horoscope file
 * @access  Protected
 */
router.post(
  '/:id/horoscope',
  authenticate,
  upload.single('horoscope'),
  uploadHoroscope
);

/**
 * @route   GET /api/v1/profiles/:id/preferences
 * @desc    Get partner preferences for a profile
 * @access  Public
 */
router.get('/:id/preferences', apiRateLimiter, getPreferences);

/**
 * @route   PUT /api/v1/profiles/:id/preferences
 * @desc    Save partner preferences for a profile
 * @access  Protected
 */
router.put('/:id/preferences', authenticate, apiRateLimiter, savePreferences);

export default router;
