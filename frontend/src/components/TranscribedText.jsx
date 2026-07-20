import { MessageSquareText, Copy } from "lucide-react";
import { useTranscription } from "../context/TranscriptionContext.jsx";

function formatTimestamp(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toFixed(2).padStart(5, "0");
  return `${m}:${s}`;
}

export default function TranscribedText() {
  const { segments, meta } = useTranscription();
  const hasSegments = segments.length > 0;

  const handleCopyAll = () => {
    const text = segments
      .map((seg) => `[${formatTimestamp(seg.start)} --> ${formatTimestamp(seg.end)}]\n${seg.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="glass-panel flex h-full min-h-0 min-w-0 flex-1 flex-col rounded-xl3 px-7 py-5 shadow-premium">
      <div className="mb-4 flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MessageSquareText size={18} className="text-primary-purple" />
          <h3 className="text-[15.5px] font-bold text-ink-primary">Transcribed Text</h3>
        </div>
        <button
          type="button"
          onClick={handleCopyAll}
          disabled={!hasSegments}
          className="glass-btn flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[12.5px] font-medium text-ink-body disabled:opacity-50"
        >
          <Copy size={13.5} />
          Copy All
        </button>
      </div>

      {/* The transcript body is the one region allowed to scroll — the page/card around it never does */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border bg-surface-soft p-5">
        {hasSegments ? (
          <div className="flex flex-col gap-4 font-mono text-[13.5px] leading-snug">
            {segments.map((seg, i) => (
              <div key={i}>
                <p className="text-ink-muted">
                  [{formatTimestamp(seg.start)} --&gt; {formatTimestamp(seg.end)}]
                </p>
                <p className="text-ink-primary">{seg.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-mono text-[13.5px] text-ink-muted">No transcript yet.</p>
        )}
      </div>

      <div className="mt-4 flex shrink-0 items-center gap-2.5 text-[12.5px] text-ink-muted">
        <span>
          Language :<span className="ml-1 text-ink-body">{meta.language ?? "-"}</span>
        </span>
        <span className="text-border">—</span>
        <span>
          Confidence :<span className="ml-1 text-ink-body">{meta.confidence ?? "-"}</span>
        </span>
        <span className="text-border">—</span>
        <span>
          Segments :<span className="ml-1 text-ink-body">{meta.segmentCount}</span>
        </span>
      </div>
    </section>
  );
}
