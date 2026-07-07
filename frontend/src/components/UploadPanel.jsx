import { FileMusic, UploadCloud, WandSparkles } from "lucide-react";
import DashboardCard from "./DashboardCard";

function UploadPanel() {
    return (
        <DashboardCard className="h-full" delay={0.05}>
            <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-5">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-200/54">
                            Upload
                        </p>
                        <h3 className="mt-2 max-w-[360px] text-[25px] font-semibold leading-[1.08] tracking-[-0.045em] text-white">
                            Drop a song and generate synced subtitles.
                        </h3>
                        <p className="mt-3 max-w-[430px] text-[13px] leading-5 text-white/48">
                            MP3, WAV, M4A, FLAC, and AAC files are ready for
                            fingerprinting, recognition, and transcription.
                        </p>
                    </div>

                    <div className="rounded-[20px] border border-violet-200/18 bg-violet-400/[0.08] p-3 text-violet-100">
                        <WandSparkles size={22} />
                    </div>
                </div>

                <button
                    className="group mt-5 flex h-[96px] items-center justify-between rounded-[22px] border border-dashed border-violet-200/24 bg-black/16 px-5 text-left transition hover:border-violet-200/42 hover:bg-violet-400/[0.07]"
                    type="button"
                >
                    <span className="flex items-center gap-4">
                        <span className="grid size-12 place-items-center rounded-[18px] bg-violet-400/16 text-violet-100 shadow-[0_0_34px_rgba(139,92,246,0.26)] transition group-hover:scale-105">
                            <UploadCloud size={23} />
                        </span>
                        <span>
                            <span className="block text-[15px] font-semibold text-white">
                                Choose audio file
                            </span>
                            <span className="mt-1 block text-[12px] font-medium text-white/42">
                                or drag it into this panel
                            </span>
                        </span>
                    </span>

                    <span className="flex items-center gap-2 rounded-2xl bg-white/[0.075] px-3 py-2 text-[12px] font-semibold text-white/64">
                        <FileMusic size={14} />
                        Max 200 MB
                    </span>
                </button>
            </div>
        </DashboardCard>
    );
}

export default UploadPanel;
