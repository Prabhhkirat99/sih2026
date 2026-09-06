import { useState } from "react";
import { useStore } from "@/lib/store";
import { ChallengeCard } from "@/components/ChallengeCard";
import { CATEGORIES } from "@/lib/engine";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Explore() {
  const { challenges } = useStore();
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");

  const filtered = challenges.filter((c) => {
    const q = query.toLowerCase();
    const matchQ = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.district.toLowerCase().includes(q);
    const matchD = domain === "All" || c.domain === domain;
    return matchQ && matchD;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#0A192F]">Societal Challenge Repository</h1>
        <p className="text-slate-500 mt-2">Browse societal challenges submitted across Jharkhand districts — from health to infrastructure, environment and education.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            data-testid="explore-search-input"
            placeholder="Search challenges, districts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-11 bg-white border-slate-200 focus-visible:ring-[#0A9396]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {["All", ...CATEGORIES].map((d) => (
          <button
            key={d}
            data-testid={`filter-domain-${d.replace(/[^a-z]/gi, "").toLowerCase()}`}
            onClick={() => setDomain(d)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              domain === d ? "bg-[#005F73] text-white border-[#005F73]" : "bg-white text-slate-600 border-slate-200 hover:border-[#94D2BD]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">No challenges match your filters.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c, i) => (
            <ChallengeCard key={c.id} challenge={c} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
