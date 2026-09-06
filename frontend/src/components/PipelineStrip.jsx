import { motion } from "framer-motion";
import { PIPELINE } from "@/lib/engine";
import { FileText, Cpu, Users, GraduationCap, Building2, Lightbulb, TrendingUp, ChevronRight } from "lucide-react";

const ICONS = {
  Problem: FileText,
  AI: Cpu,
  "Right Experts": Users,
  University: GraduationCap,
  "Industry / NGO": Building2,
  Solution: Lightbulb,
  Impact: TrendingUp,
};

export const PipelineStrip = () => (
  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" data-testid="home-pipeline-strip">
    {PIPELINE.map((step, i) => {
      const Icon = ICONS[step];
      return (
        <div key={step} className="flex items-center gap-2 sm:gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 shadow-sm"
          >
            <span className="grid place-items-center w-7 h-7 rounded-full bg-[#E6F4F1] text-[#005F73]">
              <Icon className="w-4 h-4" />
            </span>
            <span className="text-sm font-semibold text-[#0A192F]">{step}</span>
          </motion.div>
          {i < PIPELINE.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />}
        </div>
      );
    })}
  </div>
);
