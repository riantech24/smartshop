/**
 * Migration script untuk update schema database SmartShop v2 → v3
 * Jalankan: node migrate.js
 * Aman dijalankan berulang kali (idempotent)
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DATA_DIR = process.env.RAILWAY_ENVIRONMENT ? '/data' : '.';
const DB_PATH = path.join(DATA_DIR, 'smartshop.db');

if (!fs.existsSync(DB_PATH)) {
  console.log('📁 Database belum ada, akan dibuat otomatis saat server jalan.');
  process.exit(0);
}

const db = new Database(DB_PATH);
console.log('🔧 Migrasi database:', DB_PATH);

function columnExists(table, column) {
  try {
    const cols = db.prepare(`PRAGMA table_info(${table})`).all();
    return cols.some(c => c.name === column);
  } catch (e) { return false; }
}

function tableExists(table) {
  return db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
    .get(table) !== undefined;
}

/* ============ 1. Tabel users: tambah kolom ============ */
if (tableExists('users')) {
  if (!columnExists('users', 'role')) {
    db.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`);
    console.log('  ✅ Kolom users.role ditambahkan');
  }
  if (!columnExists('users', 'email')) {
    db.exec(`ALTER TABLE users ADD COLUMN email TEXT`);
    console.log('  ✅ Kolom users.email ditambahkan');
  }
  if (!columnExists('users', 'created_at')) {
    db.exec(`ALTER TABLE users ADD COLUMN created_at INTEGER`);
    db.exec(`UPDATE users SET created_at = updated_at WHERE created_at IS NULL`);
    console.log('  ✅ Kolom users.created_at ditambahkan');
  }
}

/* ============ 2. Tabel fcm_tokens ============ */
if (!tableExists('fcm_tokens')) {
  db.exec(`
    CREATE TABLE fcm_tokens (
      user_id TEXT NOT NULL,
      token TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (user_id, token)
    );
    CREATE INDEX idx_fcm_user ON fcm_tokens(user_id);
  `);
  console.log('  ✅ Tabel fcm_tokens dibuat');
}

/* ============ 3. Tabel affiliate_clicks ============ */
if (!tableExists('affiliate_clicks')) {
  db.exec(`
    CREATE TABLE affiliate_clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      platform TEXT,
      product_url TEXT,
      affiliate_url TEXT,
      item_name TEXT,
      estimated_commission INTEGER DEFAULT 0,
      actual_commission INTEGER DEFAULT 0,
      status TEXT DEFAULT 'pending',
      clicked_at INTEGER NOT NULL,
      converted_at INTEGER
    );
    CREATE INDEX idx_clicks_user ON affiliate_clicks(user_id);
    CREATE INDEX idx_clicks_platform ON affiliate_clicks(platform);
    CREATE INDEX idx_clicks_status ON affiliate_clicks(status);
  `);
  console.log('  ✅ Tabel affiliate_clicks dibuat');
}

/* ============ 4. Tabel notifications_log ============ */
if (!tableExists('notifications_log')) {
  db.exec(`
    CREATE TABLE notifications_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      title TEXT,
      body TEXT,
      item_name TEXT,
      sent_at INTEGER NOT NULL,
      success_count INTEGER DEFAULT 0,
      failure_count INTEGER DEFAULT 0
    );
    CREATE INDEX idx_notif_user ON notifications_log(user_id);
  `);
  console.log('  ✅ Tabel notifications_log dibuat');
}

/* ============ 5. Set admin pertama ============ */
const adminCount = db.prepare(`SELECT COUNT(*) as c FROM users WHERE role='admin'`).get().c;
if (adminCount === 0 && process.env.ADMIN_EMAIL) {
  const result = db.prepare(`UPDATE users SET role='admin' WHERE user_id=?`)
    .run(process.env.ADMIN_EMAIL);
  if (result.changes > 0) {
    console.log(`  ✅ ${process.env.ADMIN_EMAIL} dijadikan admin`);
  } else {
    console.log(`  ⚠️  User ${process.env.ADMIN_EMAIL} belum ada, jalankan lagi setelah login.`);
  }
}

/* ============ 6. Verifikasi ============ */
console.log('\n📊 Status tabel:');
['users', 'fcm_tokens', 'affiliate_clicks', 'notifications_log', 'price_history']
  .forEach(t => {
    if (tableExists(t)) {
      const count = db.prepare(`SELECT COUNT(*) as c FROM ${t}`).get().c;
      console.log(`  • ${t}: ${count} baris`);
    } else {
      console.log(`  ✗ ${t}: tidak ada`);
    }
  });

console.log('\n✨ Migrasi selesai!');
db.close();