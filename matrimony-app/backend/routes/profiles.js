const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { db } = require('../db');
const { requireAuth } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');
const { calculate10Porutham } = require('../utils/astrology');
const { calculateLifestyleCompatibility } = require('../utils/compatibility');
const {
  MIN_INTRO_VIDEO_SIZE,
  MAX_INTRO_VIDEO_SIZE,
  VIDEO_CHUNK_SIZE,
  VIDEO_MIME_BY_EXTENSION,
  createUploadError,
  getSafeVideoName,
  validateIntroVideoDuration,
  validateVideoMetadata,
  createUploadId,
  assembleVideoChunks,
  readVideoSignature,
  cleanupExpiredVideoUploads,
} = require('../utils/introVideoStorage');

const router = express.Router();

function getOptionalUser(req) {
  // Website sends an auth cookie; the mobile app sends "Authorization: Bearer <token>".
  const header = req.headers?.authorization;
  const token = header && header.startsWith('Bearer ')
    ? header.slice(7).trim()
    : req.cookies?.auth_token;
  if (!token) return null;
  try { return jwt.verify(token, JWT_SECRET); } catch (e) { return null; }
}

// async version of shouldBlurMedia
async function shouldBlurMedia(viewer, profileRow) {
  if (!viewer) {
    return { photo: profileRow.blur_photo === 1, horoscope: profileRow.blur_horoscope === 1,
      interestStatus: null, interestId: null, interestDirection: null, isShortlisted: false };
  }
  if (viewer.id === profileRow.owner_user_id || viewer.role === 'admin') {
    return { photo: false, horoscope: false, interestStatus: null, interestId: null, interestDirection: null, isShortlisted: false };
  }

  const viewerProfiles = await db.all('SELECT id FROM profiles WHERE owner_user_id = ?', [viewer.id]);
  const viewerProfileIds = viewerProfiles.map(p => p.id);

  let interestStatus = null, interestId = null, interestDirection = null, hasMutualAccepted = false;

  if (viewerProfileIds.length > 0) {
    const placeholders = viewerProfileIds.map(() => '?').join(',');
    const interaction = await db.get(`
      SELECT id, sender_profile_id, receiver_profile_id, status FROM interests
      WHERE (sender_profile_id IN (${placeholders}) AND receiver_profile_id = ?)
         OR (receiver_profile_id IN (${placeholders}) AND sender_profile_id = ?)
    `, [...viewerProfileIds, profileRow.id, ...viewerProfileIds, profileRow.id]);

    if (interaction) {
      interestStatus = interaction.status;
      interestId = interaction.id;
      interestDirection = viewerProfileIds.includes(interaction.sender_profile_id) ? 'sent' : 'received';
      if (interaction.status === 'accepted') hasMutualAccepted = true;
    }
  }

  const shortlistRow = await db.get('SELECT id FROM shortlists WHERE user_id = ? AND profile_id = ?', [viewer.id, profileRow.id]);
  const isShortlisted = !!shortlistRow;

  return {
    photo: !hasMutualAccepted && profileRow.blur_photo === 1,
    horoscope: !hasMutualAccepted && profileRow.blur_horoscope === 1,
    interestStatus, interestId, interestDirection, isShortlisted
  };
}

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const privateVideoDir = path.join(__dirname, '..', 'private_uploads', 'intro_videos');
const tempVideoDir = path.join(__dirname, '..', 'private_uploads', 'temp_videos');
if (!fs.existsSync(privateVideoDir)) fs.mkdirSync(privateVideoDir, { recursive: true });
if (!fs.existsSync(tempVideoDir)) fs.mkdirSync(tempVideoDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  const photoTypes = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.jfif', '.avif'];
  const horoscopeTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.webp', '.heic', '.heif'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.fieldname === 'main_profile_picture' && !photoTypes.includes(ext))
    return cb(new Error('Invalid Format. Photo must be .jpg, .jpeg, .png, .webp, or .heic'));
  if (file.fieldname === 'horoscope_chart' && !horoscopeTypes.includes(ext))
    return cb(new Error('Invalid Format. Horoscope must be .jpg, .png, .pdf, or .webp'));
  cb(null, true);
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB for photos/horoscope

const uploadFieldsMiddleware = (req, res, next) => {
  upload.fields([
    { name: 'main_profile_picture', maxCount: 1 },
    { name: 'horoscope_chart', maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `File upload error: ${err.message}` });
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, privateVideoDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `intro-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

function videoFilter(req, file, cb) {
  try {
    getSafeVideoName(file.originalname);
    cb(null, true);
  } catch (error) {
    cb(error);
  }
}

const uploadVideo = multer({ storage: videoStorage, fileFilter: videoFilter, limits: { fileSize: MAX_INTRO_VIDEO_SIZE } });

const uploadVideoMiddleware = (req, res, next) => {
  uploadVideo.single('intro_video')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        const tooLarge = err.code === 'LIMIT_FILE_SIZE';
        return res.status(tooLarge ? 413 : 400).json({
          error: tooLarge ? 'Video size must not exceed 3 GB.' : err.message,
          code: tooLarge ? 'VIDEO_TOO_LARGE' : 'VIDEO_UPLOAD_ERROR',
        });
      }
      return res.status(400).json({ error: err.message, code: 'VIDEO_FORMAT_UNSUPPORTED' });
    }
    next();
  });
};

function calcAge(dob) {
  const birth = new Date(dob);
  if (isNaN(birth)) return null;
  return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
}

function validateProfile(body) {
  const errors = {};
  const validPostedBy = ['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative', 'Friend', 'Client'];
  if (!validPostedBy.includes(body.profile_registered_for)) errors.profile_registered_for = 'Please select who this profile is for';
  if (!body.name || body.name.trim().length < 2) errors.name = 'Invalid Format. Full name must be at least 2 characters';
  const appNamePattern = /mukurtham\s*matrimony/i;
  if (body.name && appNamePattern.test(body.name.trim())) {
    errors.name = 'Please enter your real name, not the app name';
  }
  if (!['M', 'F'].includes(body.gender)) errors.gender = 'Please select a gender';
  if (!body.date_of_birth || isNaN(new Date(body.date_of_birth))) {
    errors.date_of_birth = 'Invalid Format. Expected format: YYYY-MM-DD';
  } else {
    const age = calcAge(body.date_of_birth);
    if (age < 18) errors.date_of_birth = 'Profile must be for a person 18 years or older';
  }
  const hf = Number(body.height_feet), hi = Number(body.height_inches);
  if (isNaN(hf) || hf < 3 || hf > 7) errors.height_feet = 'Invalid. Expected a value between 3 and 7';
  if (isNaN(hi) || hi < 0 || hi > 11) errors.height_inches = 'Invalid. Expected a value between 0 and 11';
  if (!body.education || body.education.trim().length < 2) errors.education = 'Invalid Format. Please enter an education level';
  if (!body.occupation || body.occupation.trim().length < 2) errors.occupation = 'Invalid Format. Please enter an occupation';
  if (!body.about_me || body.about_me.trim().length < 50) {
    errors.about_me = `Too short. Required: minimum 50 characters (currently ${(body.about_me || '').trim().length})`;
  }
  return errors;
}

// GET /api/profiles/meta
router.get('/meta', async (req, res) => {
  try {
    res.json({
      religions: await db.all('SELECT * FROM religions'),
      castes: await db.all('SELECT * FROM castes'),
      raasis: await db.all('SELECT * FROM raasis ORDER BY id'),
      stars: await db.all('SELECT * FROM stars ORDER BY id'),
      countries: await db.all('SELECT * FROM countries ORDER BY (priority IS NULL), priority, name_en'),
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/profiles/search
router.get('/search', async (req, res) => {
  try {
    const { gender, religion_id, caste_id, current_country_id, min_age, max_age,
            raasi_id, star_id, income_range, manglik_status, q } = req.query;
    let sql = `SELECT p.*, u.role as owner_role FROM profiles p JOIN users u ON u.id = p.owner_user_id WHERE p.status = 'active'`;
    const params = [];

    if (gender) { sql += ' AND p.gender = ?'; params.push(gender); }
    if (religion_id) { sql += ' AND p.religion_id = ?'; params.push(religion_id); }
    if (caste_id) { sql += ' AND p.caste_id = ?'; params.push(caste_id); }
    if (current_country_id) { sql += ' AND p.current_country_id = ?'; params.push(current_country_id); }
    if (raasi_id) { sql += ' AND p.raasi_id = ?'; params.push(raasi_id); }
    if (star_id) { sql += ' AND p.star_id = ?'; params.push(star_id); }
    if (income_range) { sql += ' AND p.income_range = ?'; params.push(income_range); }
    if (manglik_status) { sql += ' AND p.manglik_status = ?'; params.push(manglik_status); }
    if (q) { sql += ' AND p.name LIKE ?'; params.push(`%${q}%`); }
    sql += ' ORDER BY p.created_at DESC LIMIT 100';

    let rows = await db.all(sql, params);
    const viewer = getOptionalUser(req);

    const rowsWithMeta = await Promise.all(rows.map(async r => {
      const age = calcAge(r.date_of_birth);
      const blurState = await shouldBlurMedia(viewer, r);
      const { intro_video_key, ...safeProfile } = r;
      return {
        ...safeProfile, age,
        photo_blurred: blurState.photo,
        horoscope_blurred: blurState.horoscope,
        is_shortlisted: blurState.isShortlisted,
        interest_status: blurState.interestStatus,
        interest_id: blurState.interestId,
        interest_direction: blurState.interestDirection
      };
    }));

    let results = rowsWithMeta;
    if (min_age) results = results.filter(r => r.age >= Number(min_age));
    if (max_age) results = results.filter(r => r.age <= Number(max_age));
    res.json({ results });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// GET /api/profiles/mine
router.get('/mine', requireAuth, async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM profiles WHERE owner_user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json({ profiles: rows.map(r => ({ ...r, age: calcAge(r.date_of_birth) })) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/profiles/match
router.post('/match', requireAuth, async (req, res) => {
  try {
    const { profile_id_1, profile_id_2 } = req.body;
    if (!profile_id_1 || !profile_id_2)
      return res.status(400).json({ error: 'Both profile IDs are required for matching' });

    const p1 = await db.get('SELECT * FROM profiles WHERE id = ?', [profile_id_1]);
    const p2 = await db.get('SELECT * FROM profiles WHERE id = ?', [profile_id_2]);
    if (!p1 || !p2) return res.status(404).json({ error: 'One or both profiles not found' });

    if (p1.owner_user_id !== req.user.id && p2.owner_user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Not authorized to request matches for these profiles' });

    const minId = Math.min(p1.id, p2.id);
    const maxId = Math.max(p1.id, p2.id);
    const cached = await db.get('SELECT * FROM horoscope_match WHERE profile_id_1 = ? AND profile_id_2 = ?', [minId, maxId]);
    if (cached) return res.json({ score: cached.score, details: JSON.parse(cached.details) });

    let bride = p1.gender === 'F' ? p1 : p2;
    let groom = p1.gender === 'F' ? p2 : p1;

    if (!bride.raasi_id || !bride.star_id || !groom.raasi_id || !groom.star_id)
      return res.status(400).json({ error: 'Both profiles must have a completed Zodiac and Star for matching calculations' });

    const matchData = calculate10Porutham(bride.star_id, bride.raasi_id, groom.star_id, groom.raasi_id);
    if (matchData.error) return res.status(400).json({ error: matchData.error });

    try {
      await db.run('INSERT INTO horoscope_match (profile_id_1, profile_id_2, score, details) VALUES (?, ?, ?, ?)',
        [minId, maxId, matchData.score, JSON.stringify(matchData.results)]);
    } catch (_) {}

    res.json({ score: matchData.score, details: matchData.results });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// POST /api/profiles/lifestyle-match
router.post('/lifestyle-match', requireAuth, async (req, res) => {
  try {
    const { profile_id_1, profile_id_2 } = req.body;
    if (!profile_id_1 || !profile_id_2) return res.status(400).json({ error: 'Both profile IDs are required' });
    const p1 = await db.get('SELECT * FROM profiles WHERE id = ?', [profile_id_1]);
    const p2 = await db.get('SELECT * FROM profiles WHERE id = ?', [profile_id_2]);
    if (!p1 || !p2) return res.status(404).json({ error: 'One or both profiles not found' });
    res.json(calculateLifestyleCompatibility(p1, p2));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/profiles/:id
router.get('/:id', async (req, res) => {
  try {
    const row = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Profile not found' });
    const viewer = getOptionalUser(req);
    const blurState = await shouldBlurMedia(viewer, row);
    const { intro_video_key, ...safeProfile } = row;
    
    // Admin and owner can see intro video info (but not the key itself directly for security)
    const canViewVideo = viewer && (viewer.role === 'admin' || viewer.id === row.owner_user_id);
    
    res.json({
      profile: {
        ...safeProfile, age: calcAge(row.date_of_birth),
        photo_blurred: blurState.photo, horoscope_blurred: blurState.horoscope,
        is_shortlisted: blurState.isShortlisted, interest_status: blurState.interestStatus,
        interest_id: blurState.interestId, interest_direction: blurState.interestDirection,
        has_intro_video: !!intro_video_key,
        intro_video_status: canViewVideo ? row.intro_video_status : undefined,
        intro_video_duration: canViewVideo ? row.intro_video_duration : undefined
      }
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/profiles
router.post('/', requireAuth, uploadFieldsMiddleware, async (req, res) => {
  try {
    const errors = validateProfile(req.body);
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const countRow = await db.get('SELECT COUNT(*) c FROM profiles WHERE owner_user_id = ?', [req.user.id]);
    if (req.user.role === 'broker') {
      if (!req.user.is_approved) return res.status(403).json({ error: 'Broker account pending admin approval' });
      const dbUser = await db.get('SELECT broker_profile_limit FROM users WHERE id = ?', [req.user.id]);
      if (countRow.c >= dbUser.broker_profile_limit)
        return res.status(403).json({ error: `Broker profile limit reached (${dbUser.broker_profile_limit}). Contact admin to increase your quota.` });
    } else if (req.user.role === 'regular' && countRow.c >= 1) {
      return res.status(403).json({ error: 'You can only create one profile per account. Edit your existing profile instead.' });
    }

    const b = req.body;
    const photo = req.files?.main_profile_picture?.[0]?.filename || null;
    const horoscope = req.files?.horoscope_chart?.[0]?.filename || null;

    const info = await db.run(`
      INSERT INTO profiles (owner_user_id, profile_registered_for, name, gender, date_of_birth, height_feet, height_inches,
        education, occupation, religion_id, caste_id, sub_religion, raasi_id, star_id, born_country_id, current_country_id,
        city_or_state, main_profile_picture, horoscope_chart, about_me, blur_photo, blur_horoscope)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `, [
      req.user.id, b.profile_registered_for, b.name.trim(), b.gender, b.date_of_birth,
      Number(b.height_feet), Number(b.height_inches), b.education.trim(), b.occupation.trim(),
      b.religion_id || null, b.caste_id || null, b.sub_religion || null, b.raasi_id || null, b.star_id || null,
      b.born_country_id || null, b.current_country_id || null, b.city_or_state || null,
      photo, horoscope, b.about_me.trim(),
      Number(b.blur_photo) || 0, Number(b.blur_horoscope) || 0
    ]);

    const profile = await db.get('SELECT * FROM profiles WHERE id = ?', [info.lastInsertRowid]);
    const { intro_video_key, ...safeProfile } = profile;
    res.status(201).json({ profile: { ...safeProfile, age: calcAge(profile.date_of_birth), has_intro_video: !!intro_video_key } });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// PUT /api/profiles/:id
router.put('/:id', requireAuth, uploadFieldsMiddleware, async (req, res) => {
  try {
    const existing = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Profile not found' });
    if (existing.owner_user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Not authorized to edit this profile' });

    const errors = validateProfile(req.body);
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const b = req.body;
    const photo = req.files?.main_profile_picture?.[0]?.filename || existing.main_profile_picture;
    const horoscope = req.files?.horoscope_chart?.[0]?.filename || existing.horoscope_chart;

    await db.run(`
      UPDATE profiles SET profile_registered_for=?, name=?, gender=?, date_of_birth=?, height_feet=?, height_inches=?,
        education=?, occupation=?, religion_id=?, caste_id=?, sub_religion=?, raasi_id=?, star_id=?, born_country_id=?,
        current_country_id=?, city_or_state=?, main_profile_picture=?, horoscope_chart=?, about_me=?,
        blur_photo=?, blur_horoscope=?
      WHERE id = ?
    `, [
      b.profile_registered_for, b.name.trim(), b.gender, b.date_of_birth, Number(b.height_feet), Number(b.height_inches),
      b.education.trim(), b.occupation.trim(), b.religion_id || null, b.caste_id || null, b.sub_religion || null,
      b.raasi_id || null, b.star_id || null, b.born_country_id || null, b.current_country_id || null,
      b.city_or_state || null, photo, horoscope, b.about_me.trim(),
      Number(b.blur_photo) || 0, Number(b.blur_horoscope) || 0,
      req.params.id
    ]);

    const updated = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    const { intro_video_key, ...safeProfile } = updated;
    res.json({ profile: { ...safeProfile, age: calcAge(updated.date_of_birth), has_intro_video: !!intro_video_key } });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// DELETE /api/profiles/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const existing = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Profile not found' });
    if (existing.owner_user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Not authorized to delete this profile' });
    await db.run('DELETE FROM profiles WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

function videoUploadError(res, error, context) {
  console.error(`[VideoUpload] ${context}:`, error);
  const status = Number.isInteger(error.status) ? error.status : 500;
  const message = status >= 500
    ? 'Video storage failed. Please try again.'
    : error.message;
  return res.status(status).json({
    error: message,
    code: error.code || (status >= 500 ? 'VIDEO_STORAGE_FAILED' : 'VIDEO_UPLOAD_INVALID'),
  });
}

function getVideoUploadMetadata(source) {
  const uploadId = String(source.uploadId || '');
  if (!/^[\w-]{16,80}$/.test(uploadId)) throw createUploadError('Invalid video upload ID.');
  const { name: fileName, extension } = getSafeVideoName(source.fileName);
  const fileSize = Number(source.fileSize);
  if (!Number.isSafeInteger(fileSize) || fileSize < MIN_INTRO_VIDEO_SIZE) {
    throw createUploadError('Video must be at least 1 MB.', 400, 'VIDEO_TOO_SMALL');
  }
  if (fileSize > MAX_INTRO_VIDEO_SIZE) {
    throw createUploadError('Video size must not exceed 3 GB.', 413, 'VIDEO_TOO_LARGE');
  }
  const totalChunks = Number(source.totalChunks);
  if (!Number.isInteger(totalChunks) || totalChunks !== Math.ceil(fileSize / VIDEO_CHUNK_SIZE)) {
    throw createUploadError('Invalid video chunk metadata.');
  }
  return {
    uploadId,
    fileName,
    extension,
    fileSize,
    mimeType: String(source.mimeType || '').split(';', 1)[0].trim().toLowerCase(),
    totalChunks,
  };
}

function getUserVideoUploadDirectory(userId, uploadId) {
  return path.join(tempVideoDir, `${userId}-${uploadId}`);
}

async function writeVideoUploadManifest(uploadDirectory, metadata, userId) {
  const manifest = { ...metadata, ownerUserId: userId };
  const manifestPath = path.join(uploadDirectory, 'manifest.json');
  try {
    await fs.promises.writeFile(manifestPath, JSON.stringify(manifest), { flag: 'wx' });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    const existing = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
    if (JSON.stringify(existing) !== JSON.stringify(manifest)) {
      throw createUploadError('Video upload metadata changed during upload.', 409, 'VIDEO_METADATA_MISMATCH');
    }
  }
}

const uploadChunk = multer({ storage: multer.memoryStorage(), limits: { fileSize: VIDEO_CHUNK_SIZE + 64 * 1024 } });
const uploadChunkMiddleware = (req, res, next) => {
  uploadChunk.single('chunk')(req, res, (err) => {
    if (err) {
      const tooLarge = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE';
      return res.status(tooLarge ? 413 : 400).json({
        error: tooLarge ? 'Video chunk exceeds the allowed chunk size.' : err.message,
        code: tooLarge ? 'VIDEO_CHUNK_TOO_LARGE' : 'VIDEO_UPLOAD_ERROR',
      });
    }
    next();
  });
};

router.get('/upload-status/:uploadId', requireAuth, async (req, res) => {
  try {
    const metadata = getVideoUploadMetadata({ ...req.query, uploadId: req.params.uploadId });
    const completedKey = `intro-${req.user.id}-${metadata.uploadId}${metadata.extension}`;
    const completedPath = path.join(privateVideoDir, completedKey);
    const completedMetadataPath = `${completedPath}.json`;
    if (fs.existsSync(completedPath) && fs.existsSync(completedMetadataPath)) {
      const completed = JSON.parse(await fs.promises.readFile(completedMetadataPath, 'utf8'));
      if (completed.ownerUserId === req.user.id && completed.fileSize === metadata.fileSize) {
        return res.json({
          receivedChunks: Array.from({ length: metadata.totalChunks }, (_, index) => index),
          completedKey,
        });
      }
    }
    const uploadDirectory = getUserVideoUploadDirectory(req.user.id, metadata.uploadId);
    await fs.promises.mkdir(uploadDirectory, { recursive: true });
    await writeVideoUploadManifest(uploadDirectory, metadata, req.user.id);
    const manifest = JSON.parse(await fs.promises.readFile(path.join(uploadDirectory, 'manifest.json'), 'utf8'));
    if (manifest.ownerUserId !== req.user.id || JSON.stringify(manifest) !== JSON.stringify({ ...metadata, ownerUserId: req.user.id })) {
      throw createUploadError('Video upload metadata does not match.', 409, 'VIDEO_METADATA_MISMATCH');
    }

    const receivedChunks = [];
    for (let index = 0; index < metadata.totalChunks; index += 1) {
      const chunkPath = path.join(uploadDirectory, `${index}.part`);
      const stats = await fs.promises.stat(chunkPath).catch(() => null);
      const expectedSize = Math.min(VIDEO_CHUNK_SIZE, metadata.fileSize - index * VIDEO_CHUNK_SIZE);
      if (stats?.size === expectedSize) receivedChunks.push(index);
    }
    res.json({ receivedChunks });
  } catch (error) {
    if (error.code === 'ENOENT') return res.status(404).json({ error: 'No saved upload chunks.', code: 'UPLOAD_NOT_FOUND' });
    videoUploadError(res, error, 'Video upload status failed');
  }
});

router.post('/upload-chunk', requireAuth, uploadChunkMiddleware, async (req, res) => {
  try {
    if (!req.file) throw createUploadError('No video chunk was provided.');
    const metadata = getVideoUploadMetadata(req.query);
    const chunkIndex = Number(req.query.chunkIndex);
    if (!Number.isInteger(chunkIndex) || chunkIndex < 0 || chunkIndex >= metadata.totalChunks) {
      throw createUploadError('Invalid video chunk metadata.');
    }
    const expectedChunkSize = Math.min(VIDEO_CHUNK_SIZE, metadata.fileSize - chunkIndex * VIDEO_CHUNK_SIZE);
    if (req.file.size !== expectedChunkSize) {
      throw createUploadError('Video upload chunk size does not match the file.', 400, 'VIDEO_CHUNK_SIZE_MISMATCH');
    }

    const uploadDirectory = getUserVideoUploadDirectory(req.user.id, metadata.uploadId);
    await fs.promises.mkdir(uploadDirectory, { recursive: true });
    await writeVideoUploadManifest(uploadDirectory, metadata, req.user.id);

    const chunkPath = path.join(uploadDirectory, `${chunkIndex}.part`);
    const temporaryChunkPath = `${chunkPath}.${createUploadId()}.tmp`;
    try {
      await fs.promises.writeFile(temporaryChunkPath, req.file.buffer, { flag: 'wx' });
      await fs.promises.rename(temporaryChunkPath, chunkPath);
    } finally {
      await fs.promises.rm(temporaryChunkPath, { force: true }).catch(() => {});
    }

    res.json({ ok: true, chunkIndex, chunkBytes: req.file.size });
  } catch (error) {
    videoUploadError(res, error, 'Chunk upload failed');
  }
});

router.post('/upload-complete', requireAuth, async (req, res) => {
  let assembledPath;
  let finalPath;
  try {
    const metadata = getVideoUploadMetadata(req.body || {});
    const uploadDirectory = getUserVideoUploadDirectory(req.user.id, metadata.uploadId);
    const storageKey = `intro-${req.user.id}-${metadata.uploadId}${metadata.extension}`;
    finalPath = path.join(privateVideoDir, storageKey);
    const metadataPath = `${finalPath}.json`;

    if (fs.existsSync(metadataPath) && fs.existsSync(finalPath)) {
      const savedMetadata = JSON.parse(await fs.promises.readFile(metadataPath, 'utf8'));
      if (savedMetadata.ownerUserId === req.user.id && savedMetadata.fileSize === metadata.fileSize) {
        return res.json({ ok: true, temp_video_key: storageKey, metadata: savedMetadata });
      }
      throw createUploadError('Video upload metadata does not match.', 409, 'VIDEO_METADATA_MISMATCH');
    }

    const manifest = JSON.parse(await fs.promises.readFile(path.join(uploadDirectory, 'manifest.json'), 'utf8'));
    if (manifest.ownerUserId !== req.user.id || JSON.stringify(manifest) !== JSON.stringify({ ...metadata, ownerUserId: req.user.id })) {
      throw createUploadError('Video upload metadata does not match.', 409, 'VIDEO_METADATA_MISMATCH');
    }

    assembledPath = path.join(uploadDirectory, 'assembled.tmp');
    await assembleVideoChunks({
      uploadDirectory,
      totalChunks: metadata.totalChunks,
      expectedSize: metadata.fileSize,
      destinationPath: assembledPath,
    });
    const verified = validateVideoMetadata({
      ...metadata,
      signature: await readVideoSignature(assembledPath),
    });
    await fs.promises.rename(assembledPath, finalPath);
    const savedMetadata = {
      storageKey,
      originalName: verified.fileName,
      fileSize: verified.fileSize,
      mimeType: verified.mimeType,
      format: verified.format,
      ownerUserId: req.user.id,
      uploadId: metadata.uploadId,
      uploadedAt: new Date().toISOString(),
      linked: false,
    };
    await fs.promises.writeFile(metadataPath, JSON.stringify(savedMetadata), { flag: 'wx' });
    await fs.promises.rm(uploadDirectory, { recursive: true, force: true });
    res.json({ ok: true, temp_video_key: storageKey, metadata: savedMetadata });
  } catch (error) {
    if (assembledPath) await fs.promises.rm(assembledPath, { force: true }).catch(() => {});
    if (finalPath && fs.existsSync(finalPath) && !fs.existsSync(`${finalPath}.json`)) {
      await fs.promises.rm(finalPath, { force: true }).catch(() => {});
    }
    if (error.code === 'ENOENT') {
      error.status = 409;
      error.code = 'VIDEO_CHUNK_MISSING';
      error.message = 'Video upload is incomplete. Please retry the missing chunk.';
    }
    videoUploadError(res, error, 'Video finalization failed');
  }
});

router.delete('/upload-chunks/:uploadId', requireAuth, async (req, res) => {
  try {
    const uploadId = String(req.params.uploadId || '');
    if (!/^[\w-]{16,80}$/.test(uploadId)) throw createUploadError('Invalid video upload ID.');
    await fs.promises.rm(getUserVideoUploadDirectory(req.user.id, uploadId), { recursive: true, force: true });
    res.json({ ok: true });
  } catch (error) {
    videoUploadError(res, error, 'Video cleanup failed');
  }
});

router.post('/upload-chunk-base64', requireAuth, (req, res) => {
  res.status(410).json({ error: 'This app version uses an outdated video upload method. Please update the app.', code: 'UPLOAD_METHOD_RETIRED' });
});

// POST /api/profiles/:id/intro-video
router.post('/:id/intro-video', requireAuth, uploadVideoMiddleware, async (req, res) => {
  let directUploadPath = null;
  let linked = false;
  try {
    const existing = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Profile not found' });
    if (existing.owner_user_id !== req.user.id)
      return res.status(403).json({ error: 'Not authorized to upload video for this profile' });

    let storageKey;
    let metadata;
    let videoPath;
    let metadataPath;
    if (req.body.temp_video_key) {
      storageKey = String(req.body.temp_video_key);
      if (path.basename(storageKey) !== storageKey || !/^intro-\d+-[\w-]+\.[a-z0-9]+$/i.test(storageKey)) {
        throw createUploadError('Invalid video upload reference.');
      }
      videoPath = path.join(privateVideoDir, storageKey);
      metadataPath = `${videoPath}.json`;
      if (existing.intro_video_key === storageKey && fs.existsSync(videoPath)) {
        return res.json({ ok: true, message: 'Video is already linked.', status: existing.intro_video_status });
      }
      metadata = JSON.parse(await fs.promises.readFile(metadataPath, 'utf8'));
      if (metadata.ownerUserId !== req.user.id || metadata.storageKey !== storageKey) {
        throw createUploadError('Not authorized to link this video.', 403, 'VIDEO_NOT_OWNED');
      }
    } else if (req.file) {
      storageKey = req.file.filename;
      videoPath = req.file.path;
      metadataPath = `${videoPath}.json`;
      directUploadPath = videoPath;
      metadata = {
        storageKey,
        originalName: getSafeVideoName(req.file.originalname).name,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        ownerUserId: req.user.id,
        uploadedAt: new Date().toISOString(),
        linked: false,
      };
    } else {
      throw createUploadError('No video file was provided.');
    }

    const stats = await fs.promises.stat(videoPath);
    metadata = validateVideoMetadata({
      fileName: metadata.originalName,
      mimeType: metadata.mimeType,
      fileSize: stats.size,
      signature: await readVideoSignature(videoPath),
    });
    const savedMetadata = {
      ...metadata,
      storageKey,
      originalName: metadata.fileName,
      ownerUserId: req.user.id,
      uploadedAt: new Date().toISOString(),
      linked: true,
      profileId: existing.id,
      durationSeconds: validateIntroVideoDuration(req.body.duration_seconds),
    };
    const duration = Math.floor(savedMetadata.durationSeconds);

    if (!fs.existsSync(metadataPath)) {
      await fs.promises.writeFile(metadataPath, JSON.stringify({ ...savedMetadata, linked: false }), { flag: 'wx' });
    }

    await db.run(`UPDATE profiles SET
      intro_video_key = ?, intro_video_status = ?, intro_video_duration = ?,
      intro_video_original_name = ?, intro_video_size_bytes = ?, intro_video_mime_type = ?,
      intro_video_uploaded_at = CURRENT_TIMESTAMP
      WHERE id = ?`, [
      storageKey,
      'pending',
      duration,
      savedMetadata.originalName,
      savedMetadata.fileSize,
      savedMetadata.mimeType,
      req.params.id,
    ]);
    linked = true;
    await fs.promises.writeFile(metadataPath, JSON.stringify(savedMetadata));

    if (existing.intro_video_key && existing.intro_video_key !== storageKey) {
      const oldPath = path.join(privateVideoDir, path.basename(existing.intro_video_key));
      await fs.promises.rm(oldPath, { force: true });
      await fs.promises.rm(`${oldPath}.json`, { force: true });
    }

    res.json({ ok: true, message: 'Video uploaded successfully', status: 'pending' });
  } catch (error) {
    if (directUploadPath && !linked) await fs.promises.rm(directUploadPath, { force: true }).catch(() => {});
    videoUploadError(res, error, 'Profile video linking failed');
  }
});

// GET /api/profiles/:id/intro-video-stream
router.get('/:id/intro-video-stream', async (req, res) => {
  try {
    const row = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Profile not found' });

    const viewer = getOptionalUser(req);
    if (!viewer) return res.status(401).json({ error: 'Unauthorized' });

    if (viewer.id !== row.owner_user_id && viewer.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (!row.intro_video_key) return res.status(404).json({ error: 'Video not found' });

    if (path.basename(row.intro_video_key) !== row.intro_video_key) return res.status(404).json({ error: 'Video file not found' });
    const videoPath = path.join(privateVideoDir, row.intro_video_key);
    if (!fs.existsSync(videoPath)) return res.status(404).json({ error: 'Video file not found' });

    const mimeType = row.intro_video_mime_type
      || VIDEO_MIME_BY_EXTENSION[path.extname(row.intro_video_key).toLowerCase()]
      || 'application/octet-stream';
    res.setHeader('Cache-Control', 'private, no-store');
    res.sendFile(videoPath, {
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Type': mimeType,
        'Content-Disposition': `inline; filename*=UTF-8''${encodeURIComponent(row.intro_video_original_name || 'intro-video')}`,
      },
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/profiles/:id/intro-video
router.delete('/:id/intro-video', requireAuth, async (req, res) => {
  try {
    const existing = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Profile not found' });
    if (existing.owner_user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Not authorized to delete this video' });

    await db.run(`UPDATE profiles SET intro_video_key = NULL, intro_video_status = ?, intro_video_duration = NULL,
      intro_video_original_name = NULL, intro_video_size_bytes = NULL, intro_video_mime_type = NULL,
      intro_video_uploaded_at = NULL WHERE id = ?`,
      ['pending', req.params.id]);

    if (existing.intro_video_key) {
      const oldPath = path.join(privateVideoDir, path.basename(existing.intro_video_key));
      await fs.promises.rm(oldPath, { force: true });
      await fs.promises.rm(`${oldPath}.json`, { force: true });
    }

    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
