import {
  AudioWaveform,
  CircleHelp,
  Clock3,
  FileAudio,
  FolderDown,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileAudio, label: "Projects" },
  { icon: Clock3, label: "History" },
  { icon: FolderDown, label: "Exports" },
  { icon: Settings, label: "Settings" },
];

function Sidebar() {
  return (
    <aside className="flex h-full w-[76px] shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-black/20 px-3 py-5 backdrop-blur-2xl lg:w-[236px] lg:px-4">
      <div className="flex items-center gap-3 px-0 lg:px-2">
        <div className="grid size-11 shrink-0 place-items-center rounded-[18px] border border-violet-300/25 bg-violet-500/15 shadow-[0_0_40px_rgba(139,92,246,0.22)]">
          <AudioWaveform className="text-violet-200" size={23} />
        </div>

        <div className="hidden min-w-0 lg:block">
          <h1 className="truncate text-[18px] font-semibold tracking-[-0.03em] text-white">
            SongScribe
          </h1>
          <p className="truncate text-[12px] font-medium text-white/42">AI subtitle studio</p>
        </div>
      </div>

      <nav className="mt-8 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className={`group relative flex h-11 w-full items-center justify-center gap-3 rounded-2xl px-0 text-[14px] font-medium transition lg:justify-start lg:px-3 ${
                item.active
                  ? "text-white"
                  : "text-white/48 hover:bg-white/[0.05] hover:text-white/78"
              }`}
              key={item.label}
              title={item.label}
              type="button"
            >
              {item.active && (
                <motion.span
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  layoutId="active-nav"
                  transition={{
                    type: "spring",
                    bounce: 0.18,
                    duration: 0.55,
                  }}
                />
              )}
              <Icon
                className="relative z-10 shrink-0"
                size={18}
                strokeWidth={item.active ? 2.3 : 2}
              />
              <span className="relative z-10 hidden truncate lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto hidden rounded-[22px] border border-violet-300/16 bg-violet-400/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:block">
        <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-violet-100">
          <Sparkles size={16} />
          Studio ready
        </div>
        <p className="text-[12px] leading-5 text-white/46">
          Upload clean audio for sharper lyric timing and stronger AcoustID matches.
        </p>
        <button
          className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-[14px] bg-white/[0.08] text-[12px] font-semibold text-white/78 transition hover:bg-white/[0.12]"
          type="button"
        >
          <CircleHelp size={14} />
          Quick guide
        </button>
      </div>

      <p className="mt-4 hidden px-2 text-[11px] font-medium text-white/28 lg:block">
        SongScribe 2026
      </p>
    </aside>
  );
}

export default Sidebar;
