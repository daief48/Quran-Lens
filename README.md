# 🕌 Quran Lens

> **"Unveil the divine wisdom through a cinematic lens."**

**Quran Lens** is a high-end, spiritually immersive web application designed for the modern reader of the Noble Quran. Unlike traditional Quran apps, Quran Lens prioritizes a **cinematic aesthetic** and **sacred typography** to create a focused, meditative environment for reflection.

## 🌐 Live Experience
- **Live Project:** [https://gregarious-gumption-5095c8.netlify.app/](https://gregarious-gumption-5095c8.netlify.app/)
- **API Documentation:** [https://elaborate-jalebi-138ce7.netlify.app/api](https://elaborate-jalebi-138ce7.netlify.app/api)

---

## 🎨 The Philosophy
Quran Lens is built on the concept of **"Spiritual Immersion."** Every design choice—from the parchment-style *Mashrabiya* backgrounds to the layered cinematic overlays—is intended to reduce digital noise and increase connection with the sacred text. 

### Key Design Pillars:
- **Mashrabiya Aesthetic:** Inspired by traditional Islamic architecture, using intricate patterns and soft ambient lighting.
- **Cinematic Depth:** Utilizing glassmorphism, depth-based overlays, and smooth micro-animations to make the interface feel "alive."
- **Sacred Typography:** Featuring hand-picked fonts like *Amiri* and *Scheherazade* for an authentic Arabic reading experience.

---

## ✨ Core Features
- **Cinematic Surah Explorer:** Browse all 114 Surahs with a high-contrast, bento-style grid.
- **Dynamic search:** Instantly find Ayahs across the entire Quran with a powerful search engine.
- **Reading Personalization:** Adjust Arabic fonts and sizes to your comfort through the sacred settings panel.
- **Bookmarks & Favorites:** Save your spiritual landmarks using local and server-side synchronization.
- **Static Speed:** Optimized with Next.js SSG (Static Site Generation) for lightning-fast page transitions.

---

## 🛠️ Technical Architecture

### Frontend (Next.js 15+)
- **Architecture:** App Router with hybrid Rendering (SSG for Surahs, SSR for Search).
- **Styling:** Tailwind CSS 4.0 with custom color tokens for the "Noble Architecture" theme.
- **State Management:** React Context API for persistence of user spiritual settings.
- **Animation:** CSS transitions and `framer-motion` for smooth, cinematic flows.

### Backend (Node.js & Express)
- **Database:** MongoDB for structured storage of Surahs, Ayahs, and Bookmarks.
- **Caching:** Server-side caching (node-cache) to ensure millisecond response times.
- **Architecture:** Controller-Service pattern for clean separation of concerns.

---

## 📂 Project Structure

```text
Quran Lens/
├── frontend/                # Next.js Application
│   ├── src/app/             # Sacred Routes (Home, Search, Surah Detail)
│   ├── src/components/      # UI Elements (AyahCard, Header, SurahList)
│   ├── src/lib/             # API client & Utilities
│   └── out/                 # Static optimized deployment folder
│
├── backend/                 # API Microservice
│   ├── src/controllers/     # Request handling logic
│   ├── src/services/        # Data processing layer
│   └── src/models/          # MongoDB Mongoose Schemas
│
└── README.md                # Project Blueprint
```

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or Local Instance

### Step-by-Step Setup
1. **Clone the project:**
   ```bash
   git clone https://github.com/daief48/Quran-Lens.git
   ```

2. **Backend Configuration:**
   ```bash
   cd backend
   npm install
   # Add MONGODB_URI to your .env file
   npm run dev
   ```

3. **Frontend Configuration:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 📄 Final Notes
This project was developed with deep respect for the sacredness of the content. Every line of code was written to ensure that the beauty of the Quran is matched by the beauty of its digital presentation.

*May this lens help you see the light within the verses.*
