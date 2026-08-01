# SongScribe Roadmap

> Current Version: v0.3.x
>
> Focus: Accurate multilingual music transcription.

---

# Phase 1 — Core Platform ✅

## Backend

- [x] Upload pipeline
- [x] Job system
- [x] Artifact storage
- [x] Cleanup service

## Audio

- [x] FFmpeg preprocessing
- [x] Demucs vocal separation

## Identification

- [x] Chromaprint
- [x] AcoustID
- [x] MusicBrainz
- [x] LRCLIB

## AI

- [x] Faster-Whisper integration
- [x] SpeechEngine abstraction
- [x] QualityEvaluator
- [x] Serializer
- [x] ChunkTranscriber
- [x] ChunkMerger
- [x] LanguageDetector
- [x] LanguageIdentifier abstraction
- [x] Modular orchestration

## Output

- [x] transcript.json
- [x] transcript.txt
- [x] subtitles.srt
- [x] subtitles.vtt

---

# Phase 2 — Multilingual Engine 🚧

## Language Detection

- [ ] Sliding-window language detection
- [ ] Overlapping detection windows
- [ ] Confidence smoothing
- [ ] Duration-weighted dominant language
- [ ] Real multilingual language regions
- [ ] Mashup support

## Chunk Processing

- [ ] Language-aware chunk transcription
- [ ] Parallel chunk processing
- [ ] Smart chunk scheduling
- [ ] Automatic timestamp stitching

## Accuracy

- [ ] Candidate ranking
- [ ] Improved hallucination detection
- [ ] Better quality scoring
- [ ] Automatic retry strategy
- [ ] Confidence calibration

---

# Phase 3 — Subtitle Intelligence

- [ ] Translation
- [ ] Romanization
- [ ] Karaoke subtitles
- [ ] Word-level timestamps
- [ ] Speaker labels
- [ ] Metadata enrichment

---

# Phase 4 — Frontend

- [ ] Waveform viewer
- [ ] Subtitle editor
- [ ] Timeline editor
- [ ] Multi-track viewer
- [ ] Live progress updates
- [ ] Drag-and-drop uploads

---

# Phase 5 — Performance

- [ ] GPU benchmarking
- [ ] Parallel transcription
- [ ] Model caching
- [ ] Faster chunk extraction
- [ ] Pipeline profiling
- [ ] Memory optimization

---

# Phase 6 — Developer Experience

- [ ] Comprehensive unit tests
- [ ] Integration tests
- [ ] Benchmark suite
- [ ] Debug artifact viewer
- [ ] Performance dashboard
- [ ] API documentation

---

# Phase 7 — Future

## AI Engines

- [ ] WhisperX
- [ ] NVIDIA Canary
- [ ] Parakeet
- [ ] Distil-Whisper

## Language Identification

- [ ] VoxLingua107
- [ ] MMS-LID
- [ ] FastText
- [ ] Ensemble language detection

## Advanced Features

- [ ] Speaker diarization
- [ ] Emotion detection
- [ ] Instrument recognition
- [ ] Chord detection
- [ ] Beat detection
- [ ] Desktop application
- [ ] Cloud deployment
- [ ] Plugin system

---

# Known Issues

- [ ] Whisper occasionally hallucinates lyrics.
- [ ] Low-vocal songs reduce transcription quality.
- [ ] Long songs are slower than desired.
- [ ] Compatibility LanguageDetector still needs replacement with real window-based detection.

---

# Current Focus

**Next Milestone**

Implement true sliding-window language detection using:

- 5-second windows
- 2.5-second overlap
- FFmpeg window extraction
- WhisperLanguageIdentifier
- ChunkMerger integration

This milestone enables proper multilingual transcription for mashups and songs with language changes.
