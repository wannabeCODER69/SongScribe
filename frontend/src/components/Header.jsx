import { Bell, Menu, Sun } from "lucide-react";

function Header() {
    return (
        <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-white/8 px-3 sm:px-5 backdrop-blur-[6px]">
            <button
                aria-label="Menu"
                className="grid size-10 place-items-center rounded-[10px] border border-white/8 bg-white/[0.035] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.07] hover:text-white"
                type="button"
            >
                <Menu size={20} />
            </button>

            <div className="flex items-center gap-3">
                <button
                    aria-label="Theme"
                    className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.07] hover:text-white"
                    type="button"
                >
                    <Sun size={19} />
                </button>

                <button
                    aria-label="Notifications"
                    className="relative grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.07] hover:text-white"
                    type="button"
                >
                    <Bell size={18} />
                    <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,0.9)]" />
                </button>

                <button
                    className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-violet-300 to-fuchsia-500 text-[13px] font-bold text-white shadow-[0_0_22px_rgba(168,85,247,0.28)]"
                    type="button"
                >
                    G
                </button>
            </div>
        </header>
    );
}

export default Header;