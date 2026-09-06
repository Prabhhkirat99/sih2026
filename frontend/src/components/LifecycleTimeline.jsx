import { motion } from "framer-motion";
import { LIFECYCLE } from "@/lib/engine";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const LifecycleTimeline = ({ stageIndex, onAdvance }) => {
  const pct = LIFECYCLE.length > 1 ? (stageIndex / (LIFECYCLE.length - 1)) * 100 : 0;
  const complete = stageIndex >= LIFECYCLE.length - 1;

  return (
    <div data-testid="lifecycle-timeline-container">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="font-heading text-xl font-bold text-[#0A192F]">Project Lifecycle</h3>
          <p className="text-sm text-slate-500">
            Stage {stageIndex + 1} of {LIFECYCLE.length} · <span className="font-semibold text-[#005F73]">{LIFECYCLE[stageIndex]}</span>
          </p>
        </div>
        {onAdvance && (
          <Button
            onClick={onAdvance}
            disabled={complete}
            data-testid="advance-stage-button"
            className="bg-[#EE9B00] hover:bg-[#D97706] text-white font-semibold disabled:opacity-50"
          >
            <Zap className="w-4 h-4 mr-1.5" />
            {complete ? "Fully Deployed" : "Advance Stage"}
          </Button>
        )}
      </div>

      <div className="hidden md:block relative">
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 rounded-full" />
        <motion.div
          className="absolute top-4 left-4 h-0.5 bg-[#0A9396] rounded-full"
          initial={false}
          animate={{ width: `calc(${pct}% - ${(pct / 100) * 32}px)` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ maxWidth: "calc(100% - 32px)" }}
        />
        <div className="relative flex justify-between">
          {LIFECYCLE.map((stage, i) => {
            const done = i < stageIndex;
            const current = i === stageIndex;
            return (
              <div key={stage} className="flex flex-col items-center" style={{ width: `${100 / LIFECYCLE.length}%` }}>
                <div
                  className={`grid place-items-center w-8 h-8 rounded-full border-2 text-xs font-bold transition-all ${
                    done
                      ? "bg-[#0A9396] border-[#0A9396] text-white"
                      : current
                        ? "bg-white border-[#EE9B00] text-[#EE9B00] animate-soft-pulse"
                        : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {done ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`mt-2 text-[11px] text-center leading-tight font-medium ${current ? "text-[#0A192F]" : "text-slate-500"}`}>
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="md:hidden space-y-0">
        {LIFECYCLE.map((stage, i) => {
          const done = i < stageIndex;
          const current = i === stageIndex;
          return (
            <div key={stage} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`grid place-items-center w-7 h-7 rounded-full border-2 text-[11px] font-bold ${
                    done ? "bg-[#0A9396] border-[#0A9396] text-white" : current ? "bg-white border-[#EE9B00] text-[#EE9B00]" : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                {i < LIFECYCLE.length - 1 && <div className={`w-0.5 h-6 ${done ? "bg-[#0A9396]" : "bg-slate-200"}`} />}
              </div>
              <span className={`text-sm pt-0.5 font-medium ${current ? "text-[#0A192F]" : "text-slate-500"}`}>{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
