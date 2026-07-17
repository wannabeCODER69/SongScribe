<p align="center">
  <img src="branding/songscribe-icon.png" alt="SongScribe Logo" width="180">
</p>

<h1 align="center">SongScribe</h1>

<p align="center">

![Status](https://img.shields.io/badge/status-active%20development-8A2BE2)
![Frontend](https://img.shields.io/badge/frontend-React-61DAFB)
![Backend](https://img.shields.io/badge/backend-Express-000000)
![Python](https://img.shields.io/badge/AI-Python-3776AB)
![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)
![Source](https://img.shields.io/badge/source-available-blue)

</p>

---

## 🎵 Overview

SongScribe is an AI-powered subtitle generation application designed to generate accurate subtitles for both **music** and **spoken audio**.

Rather than relying entirely on speech transcription, SongScribe intelligently identifies songs using audio fingerprinting and attempts to retrieve professionally synchronized lyrics first. When synchronized lyrics are unavailable, it automatically falls back to AI transcription using Faster-Whisper.

The resulting transcript can be explored in an interactive viewer or exported as industry-standard subtitle formats.

---

# ✨ Features

- 🎵 Audio fingerprinting using Chromaprint
- 🔍 Song identification with AcoustID
- 🎼 Metadata retrieval through MusicBrainz
- 📚 Synchronized lyrics via LRCLIB
- 🤖 AI transcription fallback using Faster-Whisper
- 📝 Unified transcript generation
- 🎧 Interactive transcript viewer
- 🖱 Click transcript to seek playback
- ✨ Active transcript highlighting
- 📜 Automatic transcript scrolling
- 🎬 Export subtitles as:
  - TXT
  - SRT
  - VTT
- 🌙 Modern React interface
- 📂 Local processing with downloadable outputs

---

# 🏗 Pipeline

```text
                 Upload Audio
                      │
                      ▼
           Generate Fingerprint
                      │
                      ▼
             AcoustID Lookup
                      │
                      ▼
          Retrieve Song Metadata
                      │
                      ▼
               Query LRCLIB
             ┌──────────────┐
             │              │
      Lyrics Found      No Lyrics
             │              │
             ▼              ▼
         Parse LRC     Faster-Whisper
             │              │
             └──────┬───────┘
                    ▼
          Unified Transcript
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
 transcript.txt  subtitles   Interactive
                 (.srt/.vtt)   Viewer
```

---

# ⚙ Tech Stack

## Frontend

- React
- React Router
- Vite
- Context API
- Axios

## Backend

- Express.js
- Multer
- FFmpeg
- Chromaprint
- AcoustID
- MusicBrainz
- LRCLIB

## AI

- Faster-Whisper
- Python

---

# 📂 Project Structure

```text
SongScribe/

├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── ViewerPage.jsx
│   │   ├── context/
│   │   ├── components/
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── providers/
│   ├── routes/
│   ├── services/
│   ├── jobs/
│   └── package.json
│
├── ai/
│
├── branding/
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/wannabeCODER69/SongScribe.git

cd SongScribe
```

## Backend

```bash
cd backend

npm install

npm start
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🗺 Roadmap

## ✅ Completed

- Modern React + Vite frontend
- Express backend
- Audio upload pipeline
- Audio extraction using FFmpeg
- Song fingerprint generation
- AcoustID integration
- MusicBrainz metadata lookup
- LRCLIB synchronized lyrics retrieval
- Faster-Whisper transcription fallback
- Unified transcript generation
- Interactive transcript viewer
- Click-to-seek playback
- Active transcript highlighting
- Automatic transcript scrolling
- TXT export
- SRT export
- VTT export

---

## 🚧 In Progress

- Viewer UI polish
- Improved responsive layout
- Minor UX refinements

---

## 💡 Future

- Batch processing
- Plugin architecture
- Desktop application
- Optional cloud deployment

---

# 🤝 Contributing

Suggestions, bug reports, and feature requests are always welcome.

If you'd like to contribute code, please open an Issue first so we can discuss the proposed change.

---

# 📜 License

Copyright © 2026 Gairik Kairy.

This repository is publicly available for learning, code review, and portfolio demonstration.

You are welcome to explore the source code, learn from the implementation, and suggest improvements.

However, copying, redistributing, modifying, or using substantial portions of this project without prior written permission from the author is **not permitted**.

If you'd like to use any part of SongScribe, please contact the author first.

---

<p align="center">

Made with ❤️ by **Gairik Kairy**

</p>
