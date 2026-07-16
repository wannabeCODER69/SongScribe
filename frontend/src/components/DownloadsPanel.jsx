import { Download, FileArchive, FileJson2, FileText } from "lucide-react";
import DashboardCard from "./DashboardCard";

const exports = [
  { icon: FileText, label: "SRT", detail: "SubRip subtitles", ready: true },
  { icon: FileText, label: "VTT", detail: "Web captions", ready: true },
  { icon: FileJson2, label: "JSON", detail: "Word timestamps", ready: false },
  { icon: FileArchive, label: "ZIP", detail: "All exports", ready: false },
];

function DownloadsPanel() {
  return (
    <DashboardCard
      className="h-full overflow-hidden"
      delay={0.25}
      eyebrow="Downloads"
      title="Export formats"
    >
      <div className="grid grid-cols-2 gap-3">
        {exports.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className={`group min-h-[92px] rounded-[18px] border p-3 text-left transition ${
                item.ready
                  ? "border-white/10 bg-white/[0.055] hover:border-violet-200/28 hover:bg-violet-300/10"
                  : "border-white/6 bg-black/12 opacity-60"
              }`}
              key={item.label}
              type="button"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon className="text-violet-100/74" size={18} />
                {item.ready && (
                  <Download
                    className="text-white/34 transition group-hover:text-violet-100"
                    size={15}
                  />
                )}
              </div>
              <p className="text-[13px] font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-[11px] font-medium text-white/36">{item.detail}</p>
            </button>
          );
        })}
      </div>
    </DashboardCard>
  );
}

export default DownloadsPanel;
