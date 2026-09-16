require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const db = require('./db');
const { scrapePrice } = require('./scraper');
const { generateAffiliateLink } = require('./affiliate');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: ['https://smartshop-assistant.netlify.app', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// Rate limit: 100 req / 15 menit
app.use('/api/', rateLimit({ windowMs: 15*60*1000, max: 100,
  message: { error: 'Terlalu banyak permintaan, coba lagi nanti.' } }));

/* ---------- ROUTES ---------- */

app.get('/api/health', (_, res) => res.json({
  status: 'OK', version: '2.0.0', time: new Date().toISOString()
}));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SmartShop Backend is running",
    status: "online"
  });
});

// Sync: simpan data user
app.post('/api/sync/:userId', (req, res) => {
  try {
    db.saveUser(req.params.userId, req.body);
    res.json({ ok: true, syncedAt: Date.now() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Sync: ambil data user
app.get('/api/sync/:userId', (req, res) => {
  const data = db.getUser(req.params.userId);
  if (!data) return res.status(404).json({ error: 'User tidak ditemukan' });
  res.json(data);
});

// Cek harga via scraper
app.post('/api/check-price', async (req, res) => {
  const { url, userId } = req.body;
  if (!url) return res.status(400).json({ error: 'URL wajib diisi' });

  try {
    const { price, title } = await scrapePrice(url);
    if (!price) return res.status(404).json({ error: 'Harga tidak ditemukan' });

    if (userId) db.logPrice(userId, title || '', url, price);
    res.json({ url, price, title, currency: 'IDR', checkedAt: Date.now() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Gagal scraping: ' + e.message });
  }
});

// Generate link afiliasi
app.post('/api/affiliate-link', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL wajib' });
  try {
    const link = await generateAffiliateLink(url);
    res.json({ original: url, affiliate: link });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Riwayat harga
app.get('/api/price-history', (req, res) => {
  const { url, limit = 30 } = req.query;
  if (!url) return res.status(400).json({ error: 'url diperlukan' });
  res.json(db.getPriceHistory(url, +limit));
});

/* ---------- CRON: auto-update harga tiap 6 jam ---------- */
cron.schedule('0 */6 * * *', async () => {
  console.log('[CRON] Cek harga otomatis...');
  const users = db.prepare('SELECT DISTINCT user_id FROM users').all();
  for (const { user_id } of users) {
    const data = db.getUser(user_id);
    if (!data?.wish) continue;
    for (const item of data.wish) {
      if (!item.url) continue;
      const { price } = await scrapePrice(item.url);
      if (price && price <= item.target) {
        await sendPriceAlert(user_id, item.name, price, item.target);
      }
    }
  }
});

cron.schedule('0 2 * * *', () => {
  const fs = require('fs');
  if (fs.existsSync('./smartshop.db')) {
    const data = fs.readFileSync('./smartshop.db');
    // Upload ke Google Drive / S3 / kirim ke email Anda
    console.log('[BACKUP] DB size:', data.length);
  }
});

/* ---------- ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 SmartShop Backend v2.0 running on http://localhost:${PORT}`);
});

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // dari Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Endpoint daftar token
app.post('/api/fcm/register', (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) return res.status(400).json({ error: 'userId & token wajib' });
  try {
    db.prepare(`INSERT OR REPLACE INTO fcm_tokens (user_id, token, created_at)
      VALUES (?, ?, ?)`).run(userId, token, Date.now());
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Fungsi kirim notifikasi
async function sendPriceAlert(userId, item, newPrice, targetPrice) {
  const tokens = db.prepare('SELECT token FROM fcm_tokens WHERE user_id=?').all(userId);
  if (!tokens.length) return;

  const message = {
    notification: {
      title: `🔥 ${item} turun jadi Rp ${newPrice.toLocaleString('id-ID')}!`,
      body: `Target Anda Rp ${targetPrice.toLocaleString('id-ID')} tercapai. Klik untuk beli.`
    },
    data: {
      link: `/#wishlist?item=${encodeURIComponent(item)}`
    },
    tokens: tokens.map(t => t.token)
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`Notif terkirim: ${response.successCount} sukses`);
  } catch (e) {
    console.error('FCM send error:', e);
  }
}
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const jwt = require('jsonwebtoken');

app.use(session({
  secret: process.env.SESSION_SECRET || 'ubah-ini-di-production',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  const user = {
    googleId: profile.id,
    name: profile.displayName,
    email: profile.emails?.[0]?.value,
    avatar: profile.photos?.[0]?.value
  };
  return done(null, user);
}));

// Route: mulai login
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route: callback dari Google
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user.email, name: req.user.name },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    // Redirect ke frontend dengan token di URL
    res.redirect(`${process.env.FRONTEND_URL}/#token=${token}`);
  }
);

// Endpoint verifikasi token
app.get('/api/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const { requireAdmin } = require('./adminMiddleware');

// Statistik umum
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const totalUsers = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  const totalWish = db.prepare(`SELECT COUNT(*) as c FROM users
    WHERE data LIKE '%wish%'`).get().c;
  const priceChecks = db.prepare('SELECT COUNT(*) as c FROM price_history').get().c;
  const recentUsers = db.prepare(`SELECT user_id, updated_at FROM users
    ORDER BY updated_at DESC LIMIT 10`).all();

  res.json({ totalUsers, totalWish, priceChecks, recentUsers });
});

// Daftar semua user
app.get('/api/admin/users', requireAdmin, (req, res) => {
  const users = db.prepare(`SELECT user_id, role, updated_at FROM users
    ORDER BY updated_at DESC`).all();
  res.json(users);
});

// Detail user
app.get('/api/admin/user/:id', requireAdmin, (req, res) => {
  const data = db.getUser(req.params.id);
  if (!data) return res.status(404).json({ error: 'User tidak ditemukan' });
  res.json(data);
});

// Riwayat harga per item
app.get('/api/admin/price-history', requireAdmin, (req, res) => {
  const { url, limit = 50 } = req.query;
  const history = db.getPriceHistory(url, +limit);
  res.json(history);
});

// Jadikan user sebagai admin
app.post('/api/admin/promote/:id', requireAdmin, (req, res) => {
  db.prepare('UPDATE users SET role = ? WHERE user_id = ?').run('admin', req.params.id);
  res.json({ ok: true });
});

let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = require('./firebase-service-account.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});