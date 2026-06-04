# CodeNinja-Project

Smart Tour — full-stack hotel & tour booking app.

- `frontend_smart_tour/` — React (Create React App) client
- `backend_smart_tour/` — Node/Express + PostgreSQL API

## Setup

### Backend
```bash
cd backend_smart_tour
npm install
cp .env.example .env        # then fill in STRIPE_SECRET_KEY
node src/index.js           # runs on http://localhost:3002
```
Requires a PostgreSQL database named `smart_tour`. Create the tables and
seed sample data with:
```bash
psql -U postgres -d smart_tour -f schema.sql
```

### Frontend
```bash
cd frontend_smart_tour
npm install
npm start                   # runs on http://localhost:3000
```

## Usage
Open http://localhost:3000 → browse hotels → Search → open a hotel →
**Reserve or Book Now!** → cart → Stripe checkout.
