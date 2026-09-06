import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "@/components/Badges";
import { Cpu, Sparkles, Target, Layers, GitBranch, ShieldAlert, Lightbulb, Landmark, GraduationCap, Building2 } from "lucide-react";

export const AIAnalysisPanel = ({ ai }) => {
  if (!ai) return null;
  return (
    <Card
      data-testid="ai-analysis-panel"
      className="overflow-hidden border-slate-200 shadow-sm"
    >
      <div className="flex items-center justify-between bg-[#0A192F] px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-[#0A9396]/20 text-[#94D2BD]">
            <Cpu className="w-4.5 h-4.5 w-5 h-5" />
          </span>
          <div>
            <h3 className="font-heading font-semibold text-white text-base leading-tight">AI Problem Analysis</h3>
            <p className="text-[11px] text-slate-400">Automated triage & matching</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#94D2BD]">
          <Sparkles className="w-3.5 h-3.5" /> {ai.confidence}% AI confidence
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Category
            </p>
            <p className="mt-1.5 font-heading font-semibold text-[#0A192F]">{ai.category}</p>
            {ai.subCategory && <p className="text-xs text-slate-500 mt-0.5">{ai.subCategory}</p>}
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Priority
            </p>
            <div className="mt-1.5">
              <PriorityBadge priority={ai.priority} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Impact Score
            </p>
            <span data-testid="ai-impact-score" className="font-mono font-bold text-lg text-[#005F73]">
              {ai.impactScore}
              <span className="text-sm text-slate-400">/100</span>
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#0A9396] to-[#005F73]"
              initial={{ width: 0 }}
              animate={{ width: `${ai.impactScore}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Required Expertise</p>
          <div className="flex flex-wrap gap-2">
            {ai.requiredExpertise.map((e) => (
              <Badge key={e} variant="outline" className="border-[#94D2BD] bg-[#E6F4F1] text-[#005F73]">
                {e}
              </Badge>
            ))}
          </div>
        </div>

        {ai.suggestedSolution && (
          <div className="rounded-xl border border-[#94D2BD] bg-[#E6F4F1] p-4">
            <p className="text-[11px] uppercase tracking-wider text-[#005F73] font-semibold mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> Suggested Solution
            </p>
            <p className="text-sm text-[#0A3B43] font-medium">{ai.suggestedSolution}</p>
          </div>
        )}

        {ai.governmentDepartment && (
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" /> Relevant Govt. Department
            </p>
            <p className="text-sm font-medium text-[#0A192F]">{ai.governmentDepartment}</p>
          </div>
        )}

        {ai.universityDisciplines?.length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Recommended University Disciplines
            </p>
            <div className="flex flex-wrap gap-2">
              {ai.universityDisciplines.map((d) => (
                <Badge key={d} variant="outline" className="border-slate-300 text-slate-600">{d}</Badge>
              ))}
            </div>
          </div>
        )}

        {ai.industryTypes?.length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Recommended Industry / Org Types
            </p>
            <div className="flex flex-wrap gap-2">
              {ai.industryTypes.map((d) => (
                <Badge key={d} variant="outline" className="border-slate-300 text-slate-600">{d}</Badge>
              ))}
            </div>
          </div>
        )}

        {ai.similarChallenges?.length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5" /> Similar Challenges
            </p>
            <ul className="space-y-1.5">
              {ai.similarChallenges.map((s) => (
                <li key={s} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#94D2BD] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p
          data-testid="ai-disclaimer-label"
          className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          AI-assisted analysis for decision-support only — not an official verdict or medical diagnosis. Figures are deterministic estimates for the prototype.
        </p>
      </div>
    </Card>
  );
};
