import { useState } from "react";
import * as SongScribeAPI from "../api/songscribe";

export default function useSongScribe() {
  const [job, setJob] = useState({
    jobId: null,

    status: "idle",

    uploading: false,

    processing: false,

    completed: false,

    failed: false,

    fingerprint: null,

    match: null,

    transcript: null,

    language: null,

    confidence: null,

    audioPath: null,

    error: null,
  });

  async function upload(file) {
    try {
      setJob((prev) => ({
        ...prev,

        status: "uploading",

        uploading: true,

        processing: true,

        completed: false,

        failed: false,

        error: null,
      }));

      const response = await SongScribeAPI.uploadAudio(file);

      setJob({
        jobId: response.jobId,

        status: response.status,

        uploading: false,

        processing: false,

        completed: response.success,

        failed: !response.success,

        fingerprint: response.fingerprint,

        match: response.match,

        transcript: response.transcript,

        language: response.transcript?.language ?? null,

        confidence: response.transcript?.confidence ?? null,

        audioPath: response.audioPath,

        error: null,
      });

      return response;
    } catch (err) {
      setJob((prev) => ({
        ...prev,

        status: "failed",

        uploading: false,

        processing: false,

        completed: false,

        failed: true,

        error: err.message,
      }));

      throw err;
    }
  }

  function reset() {
    setJob({
      jobId: null,

      status: "idle",

      uploading: false,

      processing: false,

      completed: false,

      failed: false,

      fingerprint: null,

      match: null,

      transcript: null,

      language: null,

      confidence: null,

      audioPath: null,

      error: null,
    });
  }

  async function download(type) {
    if (!job.jobId) return;

    return SongScribeAPI.downloadFile(job.jobId, type);
  }

  async function copyTranscript() {
    if (!job.transcript?.segments) return;

    const text = job.transcript.segments.map((segment) => segment.text).join("\n");

    await navigator.clipboard.writeText(text);
  }

  return {
    job,

    upload,

    reset,

    download,

    copyTranscript,

    setJob,

    isIdle: job.status === "idle",

    isUploading: job.uploading,

    isProcessing: job.processing,

    isCompleted: job.completed,

    hasFailed: job.failed,
  };
}
