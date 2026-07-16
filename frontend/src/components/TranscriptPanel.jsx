import { Captions, Play } from "lucide-react";
import DashboardCard from "./DashboardCard";

const lines = [
  ["00:00.00", "Instrumental intro with soft synth pulse"],
  ["00:08.42", "I left a light on in the window"],
  ["00:13.06", "Counting echoes from the street"],
  ["00:17.72", "Every shadow knows the rhythm"],
  ["00:22.14", "Every heartbeat finds the beat"],
  ["00:27.88", "Midnight signal, carry me over"],
  ["00:33.20", "Through the static, through the rain"],
  ["00:38.64", "If the morning breaks the silence"],
  ["00:44.02", "I will find your voice again"],
  ["00:50.86", "Hold the line until it opens"],
  ["00:56.28", "Let the chorus pull us through"],
  ["01:01.74", "Every frequency is golden"],
  ["01:07.18", "When it leads me back to you"],
];

function TranscriptPanel() {
  return (
    <DashboardCard
      className="flex min-h-0 flex-1 flex-col"
      delay={0.2}
      eyebrow="Transcript"
      title="Timed lyric preview"
      action={
        <button
          className="flex h-9 items-center gap-2 rounded-[14px] bg-violet-300 px-3 text-[12px] font-bold text-[#160d24] transition hover:bg-violet-200"
          type="button"
        >
          <Play size={14} fill="currentColor" />
          Preview
        </button>
      }
    >
      <div className="mb-4 flex items-center justify-between rounded-[18px] border border-white/8 bg-black/14 px-4 py-3">
        <div className="flex items-center gap-3">
          <Captions className="text-violet-100/70" size={18} />
          <span className="text-[13px] font-semibold text-white/76">English - SRT-ready</span>
        </div>
        <span className="text-[12px] font-medium text-white/36">13 segments</span>
      </div>

      <div className="transcript-scroll min-h-0 flex-1 overflow-y-auto pr-2">
        <div className="space-y-2.5">
          {lines.map(([time, text], index) => (
            <div
              className={`grid grid-cols-[74px_1fr] gap-4 rounded-[18px] border p-3.5 transition ${
                index === 5
                  ? "border-violet-200/26 bg-violet-300/10"
                  : "border-white/7 bg-black/10 hover:bg-white/[0.045]"
              }`}
              key={`${time}-${text}`}
            >
              <span className="pt-0.5 font-mono text-[11px] font-semibold text-violet-100/58">
                {time}
              </span>
              <p className="text-[13px] leading-5 text-white/76">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}

export default TranscriptPanel;
