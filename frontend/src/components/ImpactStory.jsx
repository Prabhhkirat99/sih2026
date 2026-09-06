import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { impactStory } from "@/lib/engine";
import { toast } from "sonner";
import { Sparkles, ArrowRight, Share2, Quote } from "lucide-react";

export const ImpactStory = ({ challenge }) => {
  const story = impactStory(challenge);

  const share = () => {
    const text = `JSIB Impact — ${story.headline}\n${story.metrics
      .map((m) => `• ${m.label}: ${m.before} → ${m.after}`)
      .join("\n")}\n"${story.quote}"\nDelivered with ${story.university} & ${story.partner}.`;
    try {
      navigator.clipboard?.writeText(text);
    } catch (e) {
      /* ignore */
    }
    toast.success("Impact story copied", { description: "Share it to celebrate this solution." });
  };

  return (
    <Card data-testid="impact-story-card" className="overflow-hidden border-[#94D2BD] shadow-sm">
      <div className="bg-[#0A192F] px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-[#EE9B00]/20 text-[#EE9B00]">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#94D2BD] font-semibold">Impact Story</p>
            <h3 className="font-heading font-semibold text-white leading-tight">{story.headline}</h3>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          data-testid="share-impact-button"
          onClick={share}
          className="border-white/30 text-white bg-white/5 hover:bg-white/15 hover:text-white"
        >
          <Share2 className="w-4 h-4 mr-1.5" /> Share
        </Button>
      </div>

      <div className="p-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {story.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500 font-medium">{m.label}</p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-slate-400 line-through">{m.before}</span>
                <ArrowRight className="w-4 h-4 text-[#0A9396]" />
                <span className="font-heading font-bold text-lg text-[#005F73]">{m.after}</span>
              </div>
              {m.delta != null && <p className="text-[11px] font-semibold text-[#15803D] mt-1">▲ +{m.delta} pts</p>}
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-[#E6F4F1] border border-[#94D2BD] p-4 flex gap-3">
          <Quote className="w-5 h-5 text-[#0A9396] shrink-0" />
          <div>
            <p className="text-sm text-[#0A3B43] italic">"{story.quote}"</p>
            <p className="text-xs text-slate-500 mt-1.5">
              Delivered with <span className="font-semibold text-slate-700">{story.university}</span> &{" "}
              <span className="font-semibold text-slate-700">{story.partner}</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
