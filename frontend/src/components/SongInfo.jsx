import { Music2, CheckCircle2, Music } from "lucide-react";
import { useTranscription } from "../context/TranscriptionContext.jsx";

function EmptyState() {
  const dashWidths = ["w-6", "w-10", "w-9", "w-7"];
  return (
    <>
      <div className="flex gap-6">
        <div className="flex h-[150px] w-[150px] shrink-0 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-white/[0.04] to-transparent">
          <Music size={30} className="text-white/15" />
        </div>
        <div className="flex flex-col justify-center gap-4">
          {dashWidths.map((w, i) => (
            <span key={i} className={`skel-dash ${w}`} />
          ))}
        </div>
      </div>

      <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-surface-soft px-3.5 py-2 text-[13px] font-semibold">
        <CheckCircle2 size={14} className="text-success" />
        <span className="text-ink-muted">No Match</span>
        <span className="text-ink-muted">--</span>
      </div>
    </>
  );
}

function PopulatedState({ songInfo }) {
  const { title, artist, album, year, matchFound, acoustIdConfidence, albumArtUrl } = songInfo;
  return (
    <>
      <div className="flex gap-6">
        <img
          src={albumArtUrl}
          alt={`${title} album art`}
          className="h-[150px] w-[150px] shrink-0 rounded-2xl bg-bg-input object-cover"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
        <div className="flex min-w-0 flex-col justify-center gap-1">
          <p className="truncate text-[19px] font-bold text-ink-primary">{title}</p>
          <p className="truncate text-[14.5px] font-medium text-primary-purple">{artist}</p>
          <p className="truncate text-[13px] italic text-ink-body">{album}</p>
          <p className="text-[13px] text-ink-muted">{year}</p>
        </div>
      </div>

      {matchFound && (
        <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl border border-success/30 bg-success-bg px-3.5 py-2 text-[13px] font-semibold text-success">
          <CheckCircle2 size={14} />
          Match Found
          <span className="text-ink-body">— {acoustIdConfidence}%</span>
        </div>
      )}
    </>
  );
}

export default function SongInfo() {
  const { songInfo } = useTranscription();

  return (
    <section className="glass-panel flex h-full min-h-0 min-w-0 flex-1 flex-col rounded-xl3 px-7 py-5 shadow-premium">
      <div className="mb-4 flex shrink-0 items-center gap-2.5">
        <Music2 size={18} className="text-primary-purple" />
        <h3 className="text-[15.5px] font-bold text-ink-primary">Song Information</h3>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {songInfo ? <PopulatedState songInfo={songInfo} /> : <EmptyState />}
      </div>
    </section>
  );
}
