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

const router = express.Router();

function getOptionalUser(req) {
  const token = req.cookies?.auth_token;
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
  const allowed = ['.mp4', '.mov', '.webm', '.mkv', '.3gp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowed.includes(ext)) {
    return cb(new Error('Invalid Format. Video must be .mp4, .mov, or .webm'));
  }
  cb(null, true);
}

const uploadVideo = multer({ storage: videoStorage, fileFilter: videoFilter, limits: { fileSize: 3 * 1024 * 1024 * 1024 } }); // 3GB

const uploadVideoMiddleware = (req, res, next) => {
  uploadVideo.single('intro_video')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Video upload error: ${err.message}` });
      }
      return res.status(400).json({ error: err.message });
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

// POST /api/profiles/upload-chunk
// Chunked upload for temp video using multipart to bypass WAF limits.
const uploadChunk = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB chunk max

router.post('/upload-chunk', requireAuth, uploadChunk.single('chunk'), async (req, res) => {
  try {
    const { uploadId, chunkIndex, totalChunks, fileName } = req.query;
    if (!uploadId || !chunkIndex || !totalChunks || !fileName) {
      return res.status(400).json({ error: 'Missing chunk metadata' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No chunk file provided' });
    }

    const tempFilePath = path.join(tempVideoDir, `${uploadId}_${fileName}`);
    const chunkData = req.file.buffer; // Buffer from multer memoryStorage

    // Append chunk to file
    fs.appendFileSync(tempFilePath, chunkData);

    const cIndex = parseInt(chunkIndex, 10);
    const tChunks = parseInt(totalChunks, 10);

    if (cIndex === tChunks - 1) {
      // Final chunk received
      const ext = path.extname(fileName).toLowerCase();
      const finalFileName = `intro-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      const finalPath = path.join(privateVideoDir, finalFileName);
      
      // Move from temp to private_uploads
      fs.renameSync(tempFilePath, finalPath);
      
      return res.json({ ok: true, temp_video_key: finalFileName });
    }

    res.json({ ok: true, message: 'Chunk received' });
  } catch (err) {
    console.error('Chunk upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/profiles/:id/intro-video
router.post('/:id/intro-video', requireAuth, uploadVideoMiddleware, async (req, res) => {
  try {
    const existing = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Profile not found' });
    if (existing.owner_user_id !== req.user.id)
      return res.status(403).json({ error: 'Not authorized to upload video for this profile' });

    let finalFileName = null;
    if (req.body.temp_video_key) {
      finalFileName = req.body.temp_video_key;
    } else if (req.file) {
      finalFileName = req.file.filename;
    } else {
      return res.status(400).json({ error: 'No video file provided' });
    }
    
    // Client should send duration in seconds
    const duration = parseInt(req.body.duration_seconds, 10) || 0;

    // Delete old video if exists
    if (existing.intro_video_key && existing.intro_video_key !== finalFileName) {
      const oldPath = path.join(privateVideoDir, existing.intro_video_key);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await db.run('UPDATE profiles SET intro_video_key = ?, intro_video_status = ?, intro_video_duration = ? WHERE id = ?',
      [finalFileName, 'pending', duration, req.params.id]);

    res.json({ ok: true, message: 'Video uploaded successfully', status: 'pending' });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
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

    const videoPath = path.join(privateVideoDir, row.intro_video_key);
    if (!fs.existsSync(videoPath)) return res.status(404).json({ error: 'Video file not found' });

    res.sendFile(videoPath);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/profiles/:id/intro-video
router.delete('/:id/intro-video', requireAuth, async (req, res) => {
  try {
    const existing = await db.get('SELECT * FROM profiles WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Profile not found' });
    if (existing.owner_user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Not authorized to delete this video' });

    if (existing.intro_video_key) {
      const oldPath = path.join(privateVideoDir, existing.intro_video_key);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await db.run('UPDATE profiles SET intro_video_key = NULL, intro_video_status = ?, intro_video_duration = NULL WHERE id = ?',
      ['pending', req.params.id]);

    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
