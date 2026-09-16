const Database = require('better-sqlite3');
const db = new Database('smartshop.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    item_name TEXT,
    url TEXT,
    price INTEGER,
    checked_at INTEGER
  );
  CREATE TABLE IF NOT EXISTS fcm_tokens (
    user_id TEXT,
    token TEXT UNIQUE,
    created_at INTEGER,
    PRIMARY KEY (user_id, token)
  );
  ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';
  ALTER TABLE users ADD COLUMN email TEXT;
  ALTER TABLE users ADD COLUMN created_at INTEGER;
`);

module.exports = {
  saveUser(userId, data) {
    const stmt = db.prepare(`
      INSERT INTO users (user_id, data, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at
    `);
    stmt.run(userId, JSON.stringify(data), Date.now());
  },
  getUser(userId) {
    const row = db.prepare('SELECT data FROM users WHERE user_id=?').get(userId);
    return row ? JSON.parse(row.data) : null;
  },
  logPrice(userId, item, url, price) {
    db.prepare(`INSERT INTO price_history (user_id,item_name,url,price,checked_at)
      VALUES (?,?,?,?,?)`).run(userId, item, url, price, Date.now());
  },
  getPriceHistory(url, limit = 30) {
    return db.prepare(`SELECT price, checked_at FROM price_history
      WHERE url=? ORDER BY checked_at DESC LIMIT ?`).all(url, limit);
  }
};