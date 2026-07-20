import { Volume2 } from "lucide-react";
import { useTranscription } from "../context/TranscriptionContext.jsx";

function PhaseDot({ label, isActive }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`h-2 w-2 rounded-full transition-all ${
          isActive ? "bg-primary-purple shadow-btnGlow" : "bg-white/15"
        }`}
      />
      <span className={`text-[14px] font-medium ${isActive ? "text-ink-primary" : "text-ink-muted"}`}>
        {label}
      </span>
    </div>
  );
}

export default function ProcessingCard() {
  const { progress, currentStepIndex } = useTranscription();

  // Underlying 5-step model (from context) is unchanged; collapsed here into
  // the two-phase visual: step 0 = "Uploading", steps 1-4 = "Processing".
  const uploadingActive = currentStepIndex <= 0;
  const processingActive = currentStepIndex >= 1;

  return (
    <section className="glass-panel relative overflow-hidden rounded-xl3 px-7 pb-4 pt-5 shadow-premium">
      {/* Top gradient accent — the visual bridge between the hero above and the transcript below */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary-blue via-primary-indigo to-primary-purple" />

      <div className="mb-3.5 flex items-center gap-2.5">
        <Volume2 size={18} className="text-primary-purple" />
        <h3 className="text-[15.5px] font-bold text-ink-primary">Processing Your Audio</h3>
      </div>

      {/* Progress bar — track rgba(255,255,255,.08), fill 90deg blue → indigo → purple */}
      <div className="flex items-center gap-4">
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-blue via-primary-indigo to-primary-purple shadow-btnGlow transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="w-9 shrink-0 text-right text-[14px] font-semibold text-ink-primary">
          {progress}%
        </span>
      </div>

      {/* Two-phase status */}
      <div className="mt-3.5 flex items-center gap-16">
        <PhaseDot label="Uploading" isActive={uploadingActive} />
        <PhaseDot label="Processing" isActive={processingActive} />
      </div>
    </section>
  );
}
