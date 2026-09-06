import { Link } from "react-router-dom";
import { useStore } from "@/lib/store";
import { LIFECYCLE } from "@/lib/engine";
import { ImpactStory } from "@/components/ImpactStory";
import { Sparkles } from "lucide-react";

const DEPLOYED_INDEX = LIFECYCLE.indexOf("Deployment");

export default function Impact() {
  const { challenges } = useStore();
  const deployed = challenges.filter((c) => c.stageIndex >= DEPLOYED_INDEX);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#FEF3C7] text-[#B45309] px-3 py-1 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Impact Stories
        </span>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-[#0A192F]">Solutions that changed lives</h1>
        <p className="text-slate-500 mt-2">
          Every deployed solution becomes a shareable before/after story that communities can celebrate.
        </p>
      </div>

      {deployed.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-slate-200 text-slate-400">
          No solutions have reached deployment yet. Advance a challenge to the <span className="font-semibold">Deployment</span> stage to unlock its impact story.
        </div>
      ) : (
        <div className="space-y-8" data-testid="impact-stories-list">
          {deployed.map((c) => (
            <div key={c.id}>
              <ImpactStory challenge={c} />
              <div className="mt-2 text-right">
                <Link to={`/challenge/${c.id}`} className="text-sm font-semibold text-[#005F73] hover:underline">
                  View full challenge →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
