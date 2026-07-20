import { Download, FileText, RotateCcw } from "lucide-react";
import { useTranscription } from "../context/TranscriptionContext.jsx";

export default function DownloadBar() {
  const { download, reset } = useTranscription();

  return (
    <div className="mt-4 grid shrink-0 grid-cols-4 gap-5">
      <button
        type="button"
        onClick={() => download("srt")}
        className="btn-primary-gradient flex items-center justify-center gap-2 rounded-2xl py-3 text-[14px] font-semibold text-white"
      >
        <Download size={16} />
        Download SRT
      </button>
      <button
        type="button"
        onClick={() => download("txt")}
        className="glass-btn flex items-center justify-center gap-2 rounded-2xl py-3 text-[14px] font-semibold text-ink-body"
      >
        <FileText size={16} />
        Download TXT
      </button>
      <button
        type="button"
        onClick={() => download("vtt")}
        className="glass-btn flex items-center justify-center gap-2 rounded-2xl py-3 text-[14px] font-semibold text-ink-body"
      >
        <Download size={16} />
        Download VTT
      </button>
      <button
        type="button"
        onClick={reset}
        className="glass-btn flex items-center justify-center gap-2 rounded-2xl py-3 text-[14px] font-semibold text-ink-body"
      >
        <RotateCcw size={16} />
        New Transcription
      </button>
    </div>
  );
}
