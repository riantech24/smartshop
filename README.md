# 🛍️ SmartShop v2.0 — Asisten Belanja Cerdas

PWA + Backend API untuk lacak harga, bandingkan, dan hemat saat belanja.

## 📦 Struktur
- `frontend/` — PWA (HTML/CSS/JS)
- `backend/` — Node.js API + Scraper + Afiliasi
- push dan commit github
   #bash
   git add .
   git commit -m "Add backend health route"
   git push origin main
- melihat data cloud yang tersimpan: https://<nama-app>.up.railway.app/api/sync/<user-id-anda>

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env   # isi API key
npm start
# → http://localhost:3000

### Frontend
cd frontend
npx serve -s . -p 5000
# → http://localhost:5000