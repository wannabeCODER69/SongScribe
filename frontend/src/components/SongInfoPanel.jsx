import { AudioLines, BadgeCheck, Clock, Gauge } from "lucide-react";
import DashboardCard from "./DashboardCard";

const metadata = [
  { icon: Clock, label: "Duration", value: "03:42" },
  { icon: Gauge, label: "Confidence", value: "97.8%" },
  { icon: AudioLines, label: "Format", value: "44.1 kHz" },
];

function SongInfoPanel() {
  return (
    <DashboardCard delay={0.15} eyebrow="Song info" title="Matched recording">
      <div className="flex gap-4">
        <div className="relative grid size-[92px] shrink-0 place-items-center overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-violet-400/32 via-fuchsia-500/20 to-white/8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_68%_74%,rgba(139,92,246,0.45),transparent_36%)]" />
          <AudioLines className="relative text-white" size={34} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-[20px] font-semibold tracking-[-0.04em] text-white">
              Midnight Signal
            </h4>
            <BadgeCheck className="shrink-0 text-violet-200" size={18} />
          </div>
          <p className="mt-1 truncate text-[13px] font-medium text-white/48">
            Nova Vale - Static Hearts
          </p>
          <p className="mt-3 text-[12px] leading-5 text-white/42">
            Metadata will populate from AcoustID before transcript export.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {metadata.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="rounded-[17px] border border-white/8 bg-black/12 p-2.5"
              key={item.label}
            >
              <Icon className="mb-2.5 text-violet-100/70" size={15} />
              <p className="text-[11px] font-medium text-white/36">{item.label}</p>
              <p className="mt-1 text-[13px] font-semibold text-white">{item.value}</p>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}

export default SongInfoPanel;
