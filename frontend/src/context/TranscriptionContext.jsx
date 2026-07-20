import { createContext, useCallback, useContext, useRef, useState } from "react";
import {
  uploadAudioFile,
  getTranscriptionStatus,
  getTranscriptionResult,
  downloadTranscript,
} from "../api/transcriptionService";

const TranscriptionContext = createContext(null);

export const PROCESSING_STEPS = [
  { key: "upload", label: "Audio Uploaded" },
  { key: "fingerprint", label: "Fingerprint" },
  { key: "identify", label: "Song Identification" },
  { key: "whisper", label: "Whisper AI" },
  { key: "align", label: "Alignment" },
];

export function TranscriptionProvider({ children }) {
  const [status, setStatus] = useState("idle"); // idle | uploading | processing | complete | error
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [transcriptionId, setTranscriptionId] = useState(null);
  const [segments, setSegments] = useState([]);
  const [meta, setMeta] = useState({ language: null, confidence: null, segmentCount: 0 });
  const [songInfo, setSongInfo] = useState(null);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  const reset = useCallback(() => {
    clearInterval(pollRef.current);
    setStatus("idle");
    setProgress(0);
    setCurrentStepIndex(-1);
    setTranscriptionId(null);
    setSegments([]);
    setMeta({ language: null, confidence: null, segmentCount: 0 });
    setSongInfo(null);
    setError(null);
  }, []);

  const pollStatus = useCallback((id) => {
    pollRef.current = setInterval(async () => {
      try {
        const { data } = await getTranscriptionStatus(id);
        setProgress(data.progress ?? 0);
        setCurrentStepIndex(data.currentStepIndex ?? -1);

        if (data.status === "complete") {
          clearInterval(pollRef.current);
          const { data: result } = await getTranscriptionResult(id);
          setSegments(result.segments || []);
          setMeta({
            language: result.language,
            confidence: result.confidence,
            segmentCount: result.segments?.length || 0,
          });
          setSongInfo(result.songInfo || null);
          setStatus("complete");
        }
      } catch (err) {
        clearInterval(pollRef.current);
        setError(err.message);
        setStatus("error");
      }
    }, 1500);
  }, []);

  const uploadFile = useCallback(
    async (file) => {
      reset();
      setStatus("uploading");
      try {
        const { data } = await uploadAudioFile(file, (evt) => {
          setProgress(Math.round((evt.loaded * 100) / evt.total));
        });
        setTranscriptionId(data.transcriptionId);
        setStatus("processing");
        pollStatus(data.transcriptionId);
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    },
    [reset, pollStatus]
  );

  const download = useCallback(
    async (format) => {
      if (!transcriptionId) return;
      const { data } = await downloadTranscript(transcriptionId, format);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `songscribe-${transcriptionId}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    [transcriptionId]
  );

  const value = {
    status,
    progress,
    currentStepIndex,
    transcriptionId,
    segments,
    meta,
    songInfo,
    error,
    uploadFile,
    download,
    reset,
  };

  return <TranscriptionContext.Provider value={value}>{children}</TranscriptionContext.Provider>;
}

export function useTranscription() {
  const ctx = useContext(TranscriptionContext);
  if (!ctx) throw new Error("useTranscription must be used within a TranscriptionProvider");
  return ctx;
}
