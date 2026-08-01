# SongScribe

> An AI-powered music transcription platform built to accurately transcribe songs, spoken audio, and multilingual content through a modular, extensible transcription pipeline.

---

# Overview

SongScribe is an end-to-end transcription platform designed specifically for music.

Unlike traditional speech-to-text systems, SongScribe first attempts to identify a song using audio fingerprinting. When synchronized lyrics are available, they are retrieved directly. Otherwise, the platform falls back to a fully AI-powered transcription pipeline with vocal isolation, language detection, quality evaluation, and subtitle generation.

The project is designed around a modular architecture so individual AI components can evolve independently without changing the public API.

---

# Features

## Song Identification

- Chromaprint audio fingerprinting
- AcoustID lookup
- MusicBrainz metadata retrieval
- LRCLIB synchronized lyrics

---

## AI Transcription

- FFmpeg preprocessing
- Demucs vocal separation
- Faster-Whisper transcription
- Automatic language detection
- Quality evaluation
- Modular orchestration pipeline
- Artifact-based processing

---

## Subtitle Generation

Outputs include:

- transcript.json
- transcript.txt
- subtitles.srt
- subtitles.vtt

---

## Frontend

- Interactive transcript viewer
- Audio playback
- Click-to-seek transcript
- Auto-scrolling subtitles
- Responsive React interface

---

# Architecture

Current AI pipeline:

```
Upload
   │
Fingerprint
   │
AcoustID
   │
┌───────────────┐
│ Match Found?  │
└──────┬────────┘
       │
   Yes │                    No
       │
MusicBrainz          FFmpeg
       │                │
LRCLIB Lyrics      Demucs
       │                │
Transcript      Language Detection
                      │
                 Chunk Merging
                      │
               Chunk Transcription
                      │
              Quality Evaluation
                      │
             Unified Transcript
                      │
          TXT • JSON • SRT • VTT
```

---

# AI Architecture

The AI subsystem is intentionally modular.

```
SpeechEngine
      │
      └── FasterWhisperEngine

LanguageIdentifier
      │
      └── WhisperLanguageIdentifier

LanguageDetector
      │
ChunkMerger
      │
ChunkTranscriber
      │
TranscriptionOrchestrator
      │
QualityEvaluator
      │
Serializer
```

Every component has a single responsibility and can be replaced independently.

---

# Project Structure

```
SongScribe/

backend/
frontend/
ai/

backend/jobs/

    <job-id>/

        input/

            original.mp3
            audio.wav

        separated/

            vocals.wav
            no_vocals.wav

        output/

            transcript.json
            transcript.txt
            subtitles.srt
            subtitles.vtt
```

---

# Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios

## Backend

- Node.js
- Express
- Multer
- FFmpeg
- Chromaprint
- AcoustID
- MusicBrainz
- LRCLIB

## AI

- Python
- Faster-Whisper
- CTranslate2
- Demucs
- PyTorch

---

# Current Capabilities

- Audio fingerprinting
- Song identification
- Metadata retrieval
- Lyrics retrieval
- Vocal separation
- AI transcription
- Language detection
- Chunk-based transcription architecture
- Quality evaluation
- Subtitle generation
- Artifact-based job storage

---

# Current Limitations

Current language detection uses a compatibility implementation.

The modular multilingual pipeline has already been implemented, but true per-window multilingual language detection is still under development.

Accuracy still depends on:

- vocal quality
- background instrumentation
- Whisper model limitations
- availability of synchronized lyrics

---

# Roadmap

## High Priority

- Sliding-window language detection
- True multilingual transcription
- Candidate ranking
- Improved quality scoring
- Better hallucination detection
- Job progress API

## Medium Priority

- Translation
- Romanization
- Waveform visualization
- Batch processing
- Download manager

## Future

- WhisperX support
- NVIDIA Canary support
- Parakeet support
- Speaker diarization
- Plugin system
- Desktop application
- Cloud deployment

---

# Development Principles

SongScribe follows several architectural principles:

- Modular AI components
- Stable public JSON API
- Artifact-based processing
- Dependency inversion
- Extensible engine abstractions
- Replaceable AI backends
- Reproducible transcription pipeline

---

# License

Copyright © 2026 Gairik Kairy.

Source available for learning, research, and portfolio purposes.

All rights reserved.
