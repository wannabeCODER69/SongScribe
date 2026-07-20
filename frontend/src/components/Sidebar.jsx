import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  FolderKanban,
  History,
  DownloadCloud,
  Settings,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/history", label: "History", icon: History },
  { to: "/saved", label: "Exports", icon: DownloadCloud },
  { to: "/settings", label: "Settings", icon: Settings },
];

function WaveLogo() {
  const heights = [7, 13, 18, 11, 15];
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {heights.map((h, i) => (
        <rect key={i} x={1 + i * 3.7} y={10 - h / 2} width="2.2" height={h} rx="1.1" fill="#fff" />
      ))}
    </svg>
  );
}

export default function Sidebar() {
  return (
    <aside className="relative flex h-full w-[272px] shrink-0 flex-col overflow-hidden border-r border-border bg-surface-soft">
      {/* Localized ambient lighting for panel depth — distinct from, and additional to,
          the two global radial lights baked into the app-wide atmosphere background. */}
      <div className="ambient-glow -left-20 -top-16 h-72 w-72 bg-primary-blue/[0.14]" />
      <div className="ambient-glow -left-14 top-1/3 h-80 w-80 bg-primary-indigo/[0.12]" />
      <div className="ambient-glow bottom-0 -left-24 h-72 w-72 bg-primary-purple/[0.10]" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3 px-6 pb-6 pt-7">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-blue via-primary-indigo to-primary-purple shadow-btnGlow">
          <WaveLogo />
        </div>
        <div>
          <p className="text-[16px] font-bold leading-tight text-ink-primary">SongScribe</p>
          <p className="text-[11.5px] leading-tight text-ink-muted">AI subtitle studio</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex flex-col gap-1.5 px-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-colors ${
                isActive
                  ? "glass-panel bg-gradient-to-r from-primary-blue/15 via-primary-indigo/15 to-primary-purple/15 text-ink-primary shadow-btnGlow"
                  : "text-ink-muted hover:bg-surface-hover hover:text-ink-body"
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="pointer-events-none flex-1" aria-hidden="true" />

      {/* Studio ready panel */}
      <div className="relative z-10 mx-4 mb-5 rounded-xl3 glass-panel px-4 py-4 shadow-premium">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={15} className="text-primary-purple" />
          <span className="text-[13.5px] font-semibold text-ink-primary">Studio ready</span>
        </div>
        <p className="mb-4 text-[12.5px] leading-relaxed text-ink-body">
          Upload clean audio for sharper lyric timing and stronger AcoustID matches.
        </p>
        <button
          type="button"
          className="glass-btn flex w-full items-center justify-center gap-2 rounded-2xl py-2 text-[12.5px] font-semibold text-ink-primary"
        >
          <HelpCircle size={14} />
          Quick guide
        </button>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-6 pb-6 text-[11.5px] text-ink-muted">
        <p>SongScribe 2026</p>
      </div>
    </aside>
  );
}
