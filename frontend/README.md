# SongScribe

AI subtitle generator for music — React + Vite + Tailwind, Axios for API calls, Context API for transcription state.

## Setup
```
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in a `.env` file to point at your backend (defaults to `/api`).

## Backend contract expected by src/api/transcriptionService.js
- `POST /transcriptions` (multipart `audio`) → `{ transcriptionId }`
- `GET /transcriptions/:id/status` → `{ status, progress, currentStepIndex }`
- `GET /transcriptions/:id` → `{ segments: [{start,end,text}], language, confidence, songInfo }`
- `GET /transcriptions/:id/download?format=srt|txt|vtt` → file blob
