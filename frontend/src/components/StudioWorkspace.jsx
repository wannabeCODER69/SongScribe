import { useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  Check,
  Clipboard,
  Download,
  FileText,
  Folder,
  MessageSquareText,
  Music2,
  RefreshCcw,
  UploadCloud,
  Volume2,
} from "lucide-react";

import { useSongScribeContext } from "../context/SongScribeContext";

function formatPercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "0%";
  const pct = Math.max(0, Math.min(100, Math.round(n)));
  return `${pct}%`;
}

function pickLanguageLabel(language) {
  if (!language) return "-";
  if (typeof language === "string") return language;
  if (language.code) return language.code;
  if (language.name) return language.name;
  return "-";
}

function getSegmentText(segment) {
  if (!segment) return "";
  if (typeof segment === "string") return segment;
  return segment.text || segment.segmentText || segment.transcript || segment.content || "";
}

function getSegmentStart(segment) {
  if (!segment || typeof segment !== "object") return "";
  return segment.start ?? segment.startTime ?? segment.from ?? segment.t0 ?? "";
}

export default function StudioWorkspace() {
  const { job, upload, download, copyTranscript, reset } = useSongScribeContext();

  const fileInputRef = useRef(null);
  const [copyBusy, setCopyBusy] = useState(false);

  const segments = job?.transcript?.segments ?? [];

  const transcriptBlocks = segments.map((seg, idx) => {
    const time = getSegmentStart(seg);
    const text = getSegmentText(seg);
    return {
      key: time !== "" && time !== null && time !== undefined ? String(time) : `seg-${idx}`,
      time,
      text,
    };
  });

  const match = job?.match;

  const languageLabel = pickLanguageLabel(job?.transcript?.language);
  const confidenceValue = job?.transcript?.confidence;
  const confidenceLabel =
    confidenceValue === null ||
    confidenceValue === undefined ||
    Number.isNaN(Number(confidenceValue))
      ? "-"
      : `${Number(confidenceValue).toFixed(3)}`;

  async function handleUploadClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = ""; // clear immediately so selecting the same file again still fires onChange
    if (!file) return;

    try {
      await upload(file);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }

  async function handleCopyClick() {
    if (copyBusy) return;
    try {
      setCopyBusy(true);
      await copyTranscript();
    } finally {
      setCopyBusy(false);
    }
  }

  // Backend is currently synchronous; there is no polling/progress endpoint yet.
  // This is a temporary approximation until async jobs exist.
  const progressPercent = job?.uploading || job?.processing || job?.completed ? 100 : 0;
  const progressLabel = formatPercent(progressPercent);

  // Best-effort song fields from job.match; UI preserved.
  const songTitle = match?.title || match?.songTitle || match?.name || match?.trackName || "";

  const artistName =
    match?.artist || match?.artistName || match?.performer || match?.artist_credit || "";

  const albumName = match?.album || match?.albumName || match?.releaseGroup || match?.release || "";
  const yearLabel = match?.year || match?.releaseYear || match?.date?.slice?.(0, 4) || "";

  const acoustIdConfidence =
    match?.acoustidConfidence ??
    match?.acoustIdConfidence ??
    match?.confidence ??
    job?.transcript?.confidence;

  const acoustIdConfidenceLabel =
    acoustIdConfidence === null ||
    acoustIdConfidence === undefined ||
    Number.isNaN(Number(acoustIdConfidence))
      ? "-"
      : `${Number(acoustIdConfidence).toFixed(2)}%`;

  const artworkSrc = match?.artworkUrl || match?.artwork || match?.albumArtworkUrl || match?.image;

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full w-full min-h-0 flex-col gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-[#10101a]/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_34px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 1440x900 friendly: keep everything inside; only transcript scrolls */}
      <div className="grid min-h-0 flex-1 grid-rows-[auto_auto_1fr_auto] gap-4">
        {/* Upload Card */}
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept=".mp3,.wav,.m4a,.flac"
          onChange={handleFileChange}
        />

        <button
          className="grid h-[106px] shrink-0 place-items-center rounded-[20px] border border-dashed border-violet-400/70 bg-white/[0.018] p-3 pt-[1px] pb-[10px] text-center transition hover:border-violet-300 hover:bg-violet-400/[0.035]"
          type="button"
          onClick={handleUploadClick}
          disabled={job?.uploading || job?.processing}
        >
          <span className="-mt-[10px]">
            <UploadCloud
              className="mx-auto mb-2.5 text-violet-400 drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]"
              size={44}
            />
            <span className="block text-[clamp(16px,1.6vw,20px)] font-semibold tracking-[-0.03em] text-white">
              Drop your audio file here
            </span>
            <span className="mt-2 block text-[13px] font-medium text-white/58">
              MP3, WAV, M4A up to 100MB
            </span>
            <span className="mx-auto mt-4 flex h-10 w-fit items-center gap-2 rounded-[10px] bg-violet-500 px-5 text-[14px] font-semibold text-white shadow-[0_14px_36px_rgba(139,92,246,0.28)] transition hover:bg-violet-400">
              <Folder size={16} />
              Browse Files
            </span>
          </span>
        </button>

        {/* Processing Card */}
        <div className="rounded-[20px] border border-white/9 bg-black/14 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="mb-3 flex items-center gap-3">
            <Volume2 className="text-violet-400" size={18} />
            <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-white">
              Processing Your Audio
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div
                className="h-full w-[75%] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-500 shadow-[0_0_24px_rgba(168,85,247,0.55)]"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>
            <span className="w-10 text-right text-[14px] font-medium text-white/82">
              {progressLabel}
            </span>
          </div>

          {/* Preserve layout but remove hardcoded steps */}
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
            {/* If your backend sends steps later, wire them here; for now we keep space without hardcoded data */}
            <div className="flex min-w-[170px] flex-1 items-center gap-3 opacity-70">
              <span className="inline-flex size-[22px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-white/86">Uploading</p>
                <p className="mt-0.5 truncate text-[12px] text-white/50">
                  {job?.uploading ? "In progress" : ""}
                </p>
              </div>
            </div>

            <div className="flex min-w-[170px] flex-1 items-center gap-3 opacity-70">
              <span className="inline-flex size-[22px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-white/86">Processing</p>
                <p className="mt-0.5 truncate text-[12px] text-white/50">
                  {job?.processing ? "Working" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle area */}
        <div className="min-h-0 grid grid-cols-1 gap-5 md:grid-cols-[1.08fr_0.92fr]">
          {/* Song Info Card */}
          <div className="flex min-h-0 flex-col rounded-[20px] border border-white/9 bg-black/14 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="mb-4 flex shrink-0 items-center gap-3">
              <Music2 className="text-violet-400" size={20} />
              <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-white">
                Song Information
              </h3>
            </div>

            <div className="flex min-h-0 flex-1 items-start gap-6">
              <div className="relative size-[120px] shrink-0 overflow-hidden rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_20px_60px_rgba(14,165,233,0.105)]">
                {artworkSrc ? (
                  <img
                    alt="Album artwork"
                    className="h-full w-full object-cover"
                    src={artworkSrc}
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-500/20 via-white/[0.03] to-fuchsia-500/10">
                    <Music2 className="text-white/30" size={36} />
                  </div>
                )}
              </div>

              <div className="min-w-0 pt-0">
                <h4 className="truncate text-[18px] font-semibold tracking-[-0.04em] text-white">
                  {songTitle || "—"}
                </h4>
                <p className="mt-2 text-[14px] font-medium text-violet-400">{artistName || "—"}</p>
                <p className="mt-2 text-[13px] italic text-white/82">{albumName || "—"}</p>
                <p className="mt-2 text-[13px] text-white/62">{yearLabel || "—"}</p>

                <div className="mt-[16px]">
                  <div className="inline-flex w-full items-center justify-between gap-2 rounded-[10px] bg-emerald-500/14 px-3.5 py-2 text-[13px] font-medium text-emerald-400">
                    <span className="inline-flex items-center gap-2">
                      <Check size={15} />
                      {match?.found ? "Match Found" : "No Match"}
                    </span>
                    <span className="shrink-0 font-semibold text-white">
                      {match?.found ? acoustIdConfidenceLabel : "--"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Card */}
          <div className="flex min-h-0 flex-col rounded-[20px] border border-white/9 bg-black/14 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="mb-3 flex shrink-0 items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MessageSquareText className="text-violet-400" size={18} />
                <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-white">
                  Transcribed Text
                </h3>
              </div>

              <button
                onClick={handleCopyClick}
                disabled={segments.length === 0 || copyBusy}
                className="flex h-9 shrink-0 items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.035] px-3 text-[12px] font-semibold text-white/78 transition hover:bg-white/[0.07] disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                <Clipboard size={14} />
                Copy All
              </button>
            </div>

            <div className="transcript-scroll min-h-0 flex-1 overflow-y-auto rounded-[14px] border border-white/10 bg-[#0d0c14] p-[22px] font-mono text-[13px] leading-[1.6] text-white/86">
              <div className="space-y-3">
                {transcriptBlocks.length > 0 ? (
                  transcriptBlocks.map((block) => (
                    <div
                      className="rounded-[12px] border border-white/5 bg-white/[0.02] p-[14px] transition hover:bg-white/[0.035]"
                      key={block.key}
                    >
                      <p className="text-[12px] text-white/55">
                        {block.time !== "" && block.time !== null && block.time !== undefined
                          ? block.time
                          : "-"}
                      </p>
                      <p className="mt-2 text-[13px] leading-[1.35rem] text-white/88">
                        {block.text || ""}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-white/50">
                    {job?.processing || job?.uploading
                      ? "Transcription in progress…"
                      : "No transcript yet."}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-white/56">
              <span>
                Language{" :"}
                <strong className="font-semibold text-emerald-400">{languageLabel}</strong>
              </span>
              <span className="text-white/28">-</span>
              <span>
                Confidence{" :"}
                <strong className="font-semibold text-emerald-400">{confidenceLabel}</strong>
              </span>
              <span className="text-white/28">-</span>
              <span>
                Segments{" :"}
                <strong className="font-semibold text-violet-400">{segments.length}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Downloads Buttons */}
        <div className="grid shrink-0 grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            onClick={() => download("srt")}
            disabled={!job?.completed}
            className="flex h-12 items-center justify-center gap-2 rounded-[15px] bg-violet-500 text-[13px] font-semibold text-white shadow-[0_14px_34px_rgba(139,92,246,0.24)] transition hover:bg-violet-400 sm:text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            <Download size={16} />
            Download SRT
          </button>
          <button
            onClick={() => download("txt")}
            disabled={!job?.completed}
            className="flex h-12 items-center justify-center gap-2 rounded-[15px] border border-white/8 bg-white/[0.022] text-[13px] font-semibold text-white/84 transition hover:bg-white/[0.06] sm:text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            <FileText size={16} />
            Download TXT
          </button>
          <button
            onClick={() => download("vtt")}
            disabled={!job?.completed}
            className="flex h-12 items-center justify-center gap-2 rounded-[15px] border border-white/8 bg-white/[0.022] text-[13px] font-semibold text-white/84 transition hover:bg-white/[0.06] sm:text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            <Download size={16} />
            Download VTT
          </button>
          <button
            onClick={reset}
            className="flex h-12 items-center justify-center gap-2 rounded-[15px] border border-white/8 bg-white/[0.022] text-[13px] font-semibold text-white/84 transition hover:bg-white/[0.06] sm:text-[14px]"
            type="button"
            disabled={job?.processing || job?.uploading}
          >
            <RefreshCcw size={16} />
            New Transcription
          </button>
        </div>
      </div>
    </motion.section>
  );
}
