import { useNavigate, Link } from "react-router-dom";
import { useStore } from "@/lib/store";
import { LIFECYCLE } from "@/lib/engine";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, PriorityBadge } from "@/components/Badges";
import { toast } from "sonner";
import {
  Users,
  Landmark,
  GraduationCap,
  Factory,
  HeartHandshake,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Plus,
  ShieldCheck,
} from "lucide-react";

const VERIFIED = LIFECYCLE.indexOf("Verified");

const ROLE_META = {
  citizen: { title: "Citizen Workspace", subtitle: "Report societal problems and track them from submission to real-world impact.", icon: Users },
  government: { title: "Government Verification Console", subtitle: "Review, verify and route incoming societal challenges to the right solvers.", icon: Landmark },
  university: { title: "University / Researcher Workspace", subtitle: "Verified challenges matched to your disciplines — express interest to collaborate.", icon: GraduationCap },
  industry: { title: "Industry / Startup Workspace", subtitle: "Relevant challenges where you can offer funding, technology or deployment support.", icon: Factory },
  ngo: { title: "NGO / Organization Workspace", subtitle: "Back community challenges and mobilise on-ground support.", icon: HeartHandshake },
};

const Stat = ({ label, value, accent }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <p className={`font-heading text-2xl font-extrabold ${accent || "text-[#005F73]"}`}>{value}</p>
    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
  </div>
);

function ActionCard({ challenge: c, role, onVerify, onExpress, onOffer, onBack }) {
  const relevance = role === "university" ? c.universities?.[0] : role === "industry" || role === "ngo" ? c.industries?.[0] : null;

  let action = null;
  if (role === "government") {
    action =
      c.stageIndex < VERIFIED ? (
        <Button size="sm" data-testid={`verify-button-${c.id}`} onClick={() => onVerify(c)} className="bg-[#005F73] hover:bg-[#0A9396] text-white">
          <ShieldCheck className="w-4 h-4 mr-1.5" /> Verify & Approve
        </Button>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D]"><CheckCircle2 className="w-4 h-4" /> Verified</span>
      );
  } else if (role === "university") {
    action = c.uniInterest ? (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D]"><CheckCircle2 className="w-4 h-4" /> Interest expressed</span>
    ) : (
      <Button size="sm" variant="outline" data-testid={`express-interest-${c.id}`} onClick={() => onExpress(c)} className="border-[#005F73] text-[#005F73] hover:bg-[#005F73] hover:text-white">Express Interest</Button>
    );
  } else if (role === "industry") {
    action = c.industryEngaged ? (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D]"><CheckCircle2 className="w-4 h-4" /> Support offered</span>
    ) : (
      <Button size="sm" data-testid={`offer-support-${c.id}`} onClick={() => onOffer(c)} className="bg-[#005F73] hover:bg-[#0A9396] text-white">Offer Support</Button>
    );
  } else if (role === "ngo") {
    action = c.ngoBacked ? (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D]"><CheckCircle2 className="w-4 h-4" /> Backed</span>
    ) : (
      <Button size="sm" data-testid={`back-challenge-${c.id}`} onClick={() => onBack(c)} className="bg-[#EE9B00] hover:bg-[#D97706] text-white">Back this challenge</Button>
    );
  }

  return (
    <Card className="p-5 border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-2 mb-3">
        <StatusBadge status={c.status} />
        {c.ai && <PriorityBadge priority={c.ai.priority} />}
      </div>
      <Link to={`/challenge/${c.id}`} className="font-heading font-semibold text-[#0A192F] leading-snug hover:text-[#005F73] transition-colors line-clamp-2 block">
        {c.title}
      </Link>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
        <span>{c.ai?.category || c.domain}</span>
        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {c.district}</span>
      </div>

      {relevance && (
        <p className="text-xs text-slate-600 mt-3 bg-[#E6F4F1] border border-[#94D2BD] rounded-lg px-3 py-2">
          Matched to your sector: <span className="font-semibold">{relevance.name}</span>
          {relevance.score ? ` · ${relevance.score}%` : ""}
          {relevance.type ? ` · ${relevance.type}` : ""}
        </p>
      )}

      {role === "citizen" && (
        <p className="text-xs text-slate-500 mt-3">Stage {c.stageIndex + 1}/{LIFECYCLE.length} · <span className="font-semibold text-[#005F73]">{LIFECYCLE[c.stageIndex]}</span></p>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        {action || <span />}
        <Link to={`/challenge/${c.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[#005F73]">
          View <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
}

export default function Workspace() {
  const { role, challenges, updateChallenge } = useStore();
  const navigate = useNavigate();
  const meta = ROLE_META[role] || ROLE_META.citizen;
  const Icon = meta.icon;

  const verifiedPlus = challenges.filter((c) => c.stageIndex >= VERIFIED);
  const awaiting = challenges.filter((c) => c.stageIndex < VERIFIED);
  const deployed = challenges.filter((c) => c.stageIndex >= LIFECYCLE.indexOf("Deployment"));

  const onVerify = (c) =>
    updateChallenge(c.id, (x) => {
      const ni = Math.max(x.stageIndex, VERIFIED);
      toast.success("Challenge verified", { description: "Now routed to matched universities and partners." });
      return { stageIndex: ni, status: LIFECYCLE[ni] };
    });
  const onExpress = (c) =>
    updateChallenge(c.id, (x) => {
      toast.success("Interest expressed", { description: `${c.title.slice(0, 40)}…` });
      return { uniInterest: true, universities: x.universities?.map((u, i) => (i === 0 ? { ...u, interested: true } : u)) };
    });
  const onOffer = (c) =>
    updateChallenge(c.id, (x) => {
      toast.success("Support offered", { description: "Your organization has been logged as a partner." });
      return { industryEngaged: true, industries: x.industries?.map((p, i) => (i === 0 ? { ...p, offered: p.offered?.length ? p.offered : ["Funding", "Mentorship"] } : p)) };
    });
  const onBack = (c) => {
    updateChallenge(c.id, { ngoBacked: true });
    toast.success("Challenge backed", { description: "Thank you for supporting this cause." });
  };

  // Role-specific list
  let list = verifiedPlus;
  if (role === "citizen") list = challenges;
  if (role === "government") list = [...awaiting, ...verifiedPlus];

  const stats = {
    citizen: [
      { label: "Challenges on platform", value: challenges.length },
      { label: "Under review", value: challenges.filter((c) => c.status === "Under Ministry Review").length, accent: "text-[#B45309]" },
      { label: "Solutions deployed", value: deployed.length, accent: "text-[#15803D]" },
    ],
    government: [
      { label: "Awaiting verification", value: awaiting.length, accent: "text-[#B45309]" },
      { label: "Verified & in progress", value: verifiedPlus.length },
      { label: "Deployed", value: deployed.length, accent: "text-[#15803D]" },
    ],
    university: [
      { label: "Matched challenges", value: verifiedPlus.length },
      { label: "Interest expressed", value: challenges.filter((c) => c.uniInterest).length, accent: "text-[#15803D]" },
    ],
    industry: [
      { label: "Relevant challenges", value: verifiedPlus.length },
      { label: "Support offered", value: challenges.filter((c) => c.industryEngaged).length, accent: "text-[#15803D]" },
    ],
    ngo: [
      { label: "Community challenges", value: verifiedPlus.length },
      { label: "Backed by you", value: challenges.filter((c) => c.ngoBacked).length, accent: "text-[#15803D]" },
    ],
  }[role] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div className="flex items-start gap-4">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-[#E6F4F1] text-[#005F73] shrink-0">
            <Icon className="w-7 h-7" />
          </span>
          <div>
            <h1 className="font-heading text-3xl font-bold text-[#0A192F]" data-testid="workspace-title">{meta.title}</h1>
            <p className="text-slate-500 mt-1 max-w-2xl">{meta.subtitle}</p>
          </div>
        </div>
        {role === "citizen" && (
          <Button data-testid="workspace-report-cta" onClick={() => navigate("/submit")} className="bg-[#005F73] hover:bg-[#0A9396] text-white font-semibold">
            <Plus className="w-4 h-4 mr-1.5" /> Report a Challenge
          </Button>
        )}
      </div>

      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, minmax(0,1fr))` }}>
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      )}

      {role === "government" && awaiting.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#B45309]">
          <ShieldCheck className="w-4 h-4" /> {awaiting.length} challenge(s) awaiting your verification
        </div>
      )}

      {list.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-slate-200 text-slate-400" data-testid="workspace-empty">
          Nothing here yet.
          {role !== "citizen" && role !== "government" && " Verified challenges relevant to you will appear here."}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="workspace-list">
          {list.map((c) => (
            <ActionCard key={c.id} challenge={c} role={role} onVerify={onVerify} onExpress={onExpress} onOffer={onOffer} onBack={onBack} />
          ))}
        </div>
      )}
    </div>
  );
}
