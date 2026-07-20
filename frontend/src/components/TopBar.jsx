import { Menu, Sun, Bell } from "lucide-react";

export default function TopBar() {
  return (
    <header className="relative z-10 flex h-[64px] shrink-0 items-center justify-between px-8">
      <button
        type="button"
        aria-label="Toggle menu"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-body hover:bg-surface-hover"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Toggle theme"
          className="glass-btn flex h-10 w-10 items-center justify-center rounded-full text-ink-body"
        >
          <Sun size={16} />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="glass-btn relative flex h-10 w-10 items-center justify-center rounded-full text-ink-body"
        >
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent shadow-btnGlow" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-blue via-primary-indigo to-primary-purple text-[13px] font-semibold text-ink-primary shadow-btnGlow">
          G
        </div>
      </div>
    </header>
  );
}
