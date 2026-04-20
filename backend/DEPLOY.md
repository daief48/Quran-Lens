# Quran Lens Backend — Netlify Deployment Guide

## Folder Structure

```
backend/
├── netlify/
│   └── functions/
│       └── api.js          ← Netlify serverless entry point
├── src/
│   ├── app.js              ← Express app (exported as module)
│   ├── config/
│   │   └── db.js           ← MongoDB connection (cached for serverless)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
├── .env.example            ← Copy this and fill in your values
├── netlify.toml            ← Netlify config (auto-detected)
└── package.json
```

## Step-by-Step Netlify Deployment

### 1. Push to GitHub
Push the **entire `backend/` folder** to a GitHub repository (can be a separate repo from frontend).

```bash
cd "d:\Quran Lens\backend"
git init
git add .
git commit -m "Initial backend deployment"
git remote add origin https://github.com/YOUR_USERNAME/quran-lens-backend.git
git push -u origin main
```

### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**
2. Choose **GitHub** and select your backend repository
3. Netlify will **auto-detect** `netlify.toml` — no build settings needed

### 3. Set Environment Variables
In Netlify Dashboard → **Site settings** → **Environment variables**, add:

| Variable | Value |
|---|---|
| `MONGODB_URI` | Your full MongoDB Atlas connection string |
| `NODE_ENV` | `production` |

### 4. Deploy
Click **Deploy site**. Netlify will:
1. Run `npm install`
2. Package `netlify/functions/api.js` as a serverless function
3. Route `/api/*` requests to your Express app automatically

### 5. Your API URL
After deploy, your API will be live at:
```
https://YOUR-SITE-NAME.netlify.app/api/quran/surahs
```

## Update Frontend API URL
In `frontend/src/lib/api.js`, set:
```js
const API_BASE_URL = 'https://YOUR-SITE-NAME.netlify.app';
```

---

> **Note:** `node_modules/` and `.env` are excluded via `.gitignore` — never commit them.
