import { useCallback, useRef, useState } from "react";
import { UploadCloud, FolderOpen } from "lucide-react";
import { useTranscription } from "../context/TranscriptionContext.jsx";

export default function UploadDropzone() {
  const { uploadFile } = useTranscription();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files) => {
      const file = files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`dropzone-dashed glass-panel relative flex flex-col items-center justify-center rounded-xl3 px-6 py-8 text-center shadow-premium transition-colors ${
        isDragging ? "bg-primary-indigo/10" : ""
      }`}
    >
      {/* Upload Icon */}
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-purple/70 text-primary-purple shadow-btnGlow">
        <UploadCloud size={20} strokeWidth={1.75} />
      </div>

      {/* Drop your audio file here */}
      <h2 className="text-[20px] font-bold tracking-tight text-ink-primary">
        Drop your audio file here
      </h2>

      {/* MP3, WAV, M4A up to 100MB */}
      <p className="mt-1.5 text-[13px] text-ink-muted">MP3, WAV, M4A up to 100MB</p>

      <input
        ref={inputRef}
        type="file"
        accept=".mp3,.wav,.m4a,audio/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Browse Files button — lives inside the card, centered, no positioning hacks */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="btn-primary-gradient mt-5 flex items-center gap-2 rounded-2xl px-6 py-2.5 text-[13.5px] font-semibold text-white"
      >
        <FolderOpen size={15} />
        Browse Files
      </button>
    </div>
  );
}
