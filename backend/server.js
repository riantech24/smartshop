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
app.use(cors());
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
  console.log('[CRON] Memulai pengecekan harga otomatis...');
  // Di produksi, ambil daftar wishlist dari DB dan loop
  // Contoh: iterate users, ambil url, scrape, update, kirim notifikasi
});

/* ---------- ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 SmartShop Backend v2.0 running on http://localhost:${PORT}`);
});