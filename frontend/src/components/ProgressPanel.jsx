import { Check, Cpu, Disc3, Mic2, Music2 } from "lucide-react";
import DashboardCard from "./DashboardCard";

const steps = [
    { icon: Music2, label: "Audio parsed", value: "Complete", done: true },
    { icon: Disc3, label: "Fingerprint", value: "AcoustID", done: true },
    { icon: Mic2, label: "Transcription", value: "Whisper", done: false },
    { icon: Cpu, label: "Alignment", value: "Queued", done: false },
];

function ProgressPanel() {
    return (
        <DashboardCard className="h-full" delay={0.1} eyebrow="Progress" title="Processing pipeline">
            <div className="mb-4 flex items-end justify-between">
                <div>
                    <p className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-white">
                        64%
                    </p>
                    <p className="mt-2 text-[12px] font-medium text-white/42">
                        Estimated finish in 1m 18s
                    </p>
                </div>
                <span className="rounded-full border border-violet-200/18 bg-violet-300/10 px-3 py-1.5 text-[12px] font-semibold text-violet-100">
                    Live preview
                </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-200 shadow-[0_0_24px_rgba(196,181,253,0.44)]" />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2.5">
                {steps.map((step) => {
                    const Icon = step.icon;

                    return (
                        <div
                            className="rounded-[17px] border border-white/8 bg-black/12 p-2.5"
                            key={step.label}
                        >
                            <div className="mb-2.5 flex items-center justify-between">
                                <Icon className="text-white/54" size={17} />
                                {step.done && (
                                    <span className="grid size-5 place-items-center rounded-full bg-violet-300 text-[#160d24]">
                                        <Check size={13} strokeWidth={3} />
                                    </span>
                                )}
                            </div>
                            <p className="truncate text-[12px] font-semibold text-white/82">
                                {step.label}
                            </p>
                            <p className="mt-1 truncate text-[11px] font-medium text-white/36">
                                {step.value}
                            </p>
                        </div>
                    );
                })}
            </div>
        </DashboardCard>
    );
}

export default ProgressPanel;
