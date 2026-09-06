import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Check } from "lucide-react";
import { toast } from "sonner";

const MatchRing = ({ score }) => (
  <div className="relative w-14 h-14 shrink-0">
    <svg viewBox="0 0 40 40" className="w-14 h-14 -rotate-90">
      <circle cx="20" cy="20" r="16" fill="none" stroke="#E2E8F0" strokeWidth="4" />
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke="#0A9396"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * 100.5} 100.5`}
      />
    </svg>
    <span className="absolute inset-0 grid place-items-center font-mono font-bold text-xs text-[#005F73]">{score}%</span>
  </div>
);

export const UniversityMatch = ({ challengeId, universities, onExpressInterest }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <GraduationCap className="w-5 h-5 text-[#005F73]" />
      <h3 className="font-heading text-xl font-bold text-[#0A192F]">University Matching</h3>
    </div>
    {universities.map((u, idx) => (
      <Card
        key={u.name}
        data-testid={u.name === "RIMS Ranchi" ? "university-match-card-rims" : `university-match-card-${idx}`}
        className="p-5 border-slate-200 hover:shadow-lg transition-shadow"
      >
        <div className="flex items-start gap-4">
          <MatchRing score={u.score} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-heading font-semibold text-[#0A192F]">{u.name}</h4>
              <Badge className="bg-[#005F73] text-white hover:bg-[#005F73]">{u.score}% Match</Badge>
            </div>
            {u.full && <p className="text-xs text-slate-500">{u.full}</p>}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {u.expertise.map((e) => (
                <span key={e} className="text-xs font-medium text-[#005F73] bg-[#E6F4F1] rounded-md px-2 py-0.5">
                  {e}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              <span className="font-semibold text-slate-700">Why matched: </span>
              {u.reason}
            </p>
            <div className="mt-4">
              {u.interested ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D]">
                  <Check className="w-4 h-4" /> Interest expressed
                </span>
              ) : (
                <Button
                  variant="outline"
                  data-testid={u.name === "RIMS Ranchi" ? "express-interest-button" : `express-interest-button-${idx}`}
                  onClick={() => {
                    onExpressInterest(u.name);
                    toast.success(`${u.name} — interest recorded`, { description: "The institution has been notified for collaboration." });
                  }}
                  className="border-[#005F73] text-[#005F73] hover:bg-[#005F73] hover:text-white"
                >
                  Express Interest
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
);
