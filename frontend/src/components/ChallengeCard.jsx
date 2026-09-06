import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StatusBadge, PriorityBadge } from "@/components/Badges";
import { MapPin, Users, ArrowRight } from "lucide-react";

export const ChallengeCard = ({ challenge, index = 0 }) => (
  <Link to={`/challenge/${challenge.id}`} data-testid={`challenge-card-${challenge.id}`}>
    <Card
      className="group p-5 h-full border-slate-200 hover:shadow-lg hover:border-[#94D2BD] transition-all animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {challenge.photo && (
        <div className="-m-5 mb-3 h-32 overflow-hidden rounded-t-xl border-b border-slate-100">
          <img src={challenge.photo} alt={challenge.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center justify-between gap-2 mb-3">
        <StatusBadge status={challenge.status} />
        {challenge.ai && <PriorityBadge priority={challenge.ai.priority} />}
      </div>
      <h3 className="font-heading font-semibold text-[#0A192F] leading-snug group-hover:text-[#005F73] transition-colors line-clamp-2">
        {challenge.title}
      </h3>
      <p className="text-sm text-slate-500 mt-2 line-clamp-2">{challenge.description}</p>

      <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" /> {challenge.district}
        </span>
        <span className="inline-flex items-center gap-1">
          <Users className="w-3.5 h-3.5" /> {challenge.peopleAffected}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <span className="text-xs font-medium text-slate-500">{challenge.domain}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#005F73] group-hover:gap-2 transition-all">
          View <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Card>
  </Link>
);
