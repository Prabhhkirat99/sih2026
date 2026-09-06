import { useParams, useNavigate, Link } from "react-router-dom";
import { useStore, useChallenge } from "@/lib/store";
import { AIAnalysisPanel } from "@/components/AIAnalysisPanel";
import { UniversityMatch } from "@/components/UniversityMatch";
import { IndustryCollab } from "@/components/IndustryCollab";
import { CollaborationRoom } from "@/components/CollaborationRoom";
import { LifecycleTimeline } from "@/components/LifecycleTimeline";
import { StatusBadge, PriorityBadge } from "@/components/Badges";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Users, FileCheck, AlertTriangle } from "lucide-react";
import { ImpactStory } from "@/components/ImpactStory";
import { LIFECYCLE } from "@/lib/engine";

const DEPLOYED_INDEX = LIFECYCLE.indexOf("Deployment");

export default function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateChallenge, advanceStage } = useStore();
  const challenge = useChallenge(id);

  if (!challenge) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <AlertTriangle className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="mt-4 text-slate-500">Challenge not found.</p>
        <Button className="mt-4" onClick={() => navigate("/explore")}>Back to Explore</Button>
      </div>
    );
  }

  const expressInterest = (uniName) =>
    updateChallenge(challenge.id, (c) => ({
      universities: c.universities.map((u) => (u.name === uniName ? { ...u, interested: true } : u)),
    }));

  const offerSupport = (companyName, selected) =>
    updateChallenge(challenge.id, (c) => ({
      industries: c.industries.map((x) => (x.name === companyName ? { ...x, offered: selected } : x)),
    }));

  const handleAdvance = () => {
    const stage = advanceStage(challenge.id);
    if (stage) toast.success(`Advanced to: ${stage}`, { description: "Project lifecycle updated." });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        data-testid="back-button"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#005F73] mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={challenge.status} data-testid="challenge-status-badge" />
            {challenge.ai && <PriorityBadge priority={challenge.ai.priority} />}
            <span className="text-xs font-medium text-slate-500">{challenge.domain}</span>
          </div>
          <h1 className="mt-3 font-heading text-2xl sm:text-3xl font-bold text-[#0A192F] leading-tight">{challenge.title}</h1>
          <p className="mt-3 text-slate-600 leading-relaxed max-w-3xl">{challenge.description}</p>
          <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {challenge.district}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4" /> {challenge.peopleAffected || "—"}</span>
            {challenge.evidence && <span className="inline-flex items-center gap-1.5"><FileCheck className="w-4 h-4" /> {challenge.evidence}</span>}
          </div>
        </div>
      </div>

      {challenge.photo && (
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 max-w-3xl">
          <img src={challenge.photo} alt={challenge.title} data-testid="challenge-photo" className="w-full max-h-[380px] object-cover" />
        </div>
      )}
      {challenge.image && (
        <a href={challenge.image} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm font-semibold text-[#005F73] hover:underline">
          View attached reference →
        </a>
      )}

      {/* Lifecycle */}
      <Card className="p-6 sm:p-8 border-slate-200 mt-8">
        <LifecycleTimeline stageIndex={challenge.stageIndex} onAdvance={handleAdvance} />
      </Card>

      {challenge.stageIndex >= DEPLOYED_INDEX && (
        <div className="mt-8">
          <ImpactStory challenge={challenge} />
        </div>
      )}

      {/* Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8 items-start">
        <AIAnalysisPanel ai={challenge.ai} />
        <div className="space-y-8">
          <UniversityMatch challengeId={challenge.id} universities={challenge.universities || []} onExpressInterest={expressInterest} />
        </div>
      </div>

      <div className="mt-8">
        <IndustryCollab industries={challenge.industries || []} onOffer={offerSupport} />
      </div>

      <div className="mt-8">
        <CollaborationRoom challenge={challenge} />
      </div>

      <div className="mt-10 text-center text-sm text-slate-400">
        <Link to="/explore" className="text-[#005F73] font-semibold hover:underline">Explore more challenges</Link>
      </div>
    </div>
  );
}
