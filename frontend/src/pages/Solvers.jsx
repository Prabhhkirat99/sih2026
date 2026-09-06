import { useState } from "react";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/engine";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChallengeCard } from "@/components/ChallengeCard";
import { toast } from "sonner";
import { Users, CheckCircle2, Sparkles } from "lucide-react";

const TYPES = ["University", "Research Institute", "Industry / Company", "Startup", "NGO", "CSR Organization", "Government Department"];

export default function Solvers() {
  const { challenges, addSolver } = useStore();
  const [form, setForm] = useState({ name: "", type: "", expertise: "", categories: [] });
  const [profile, setProfile] = useState(null);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleCat = (c) =>
    setForm((f) => ({ ...f, categories: f.categories.includes(c) ? f.categories.filter((x) => x !== c) : [...f.categories, c] }));
  const valid = form.name && form.type && form.categories.length > 0;

  const matchesFor = (cats) => challenges.filter((c) => cats.includes(c.ai?.category || c.domain));
  const matched = profile ? matchesFor(profile.categories) : [];

  const submit = (e) => {
    e.preventDefault();
    if (!valid) {
      toast.error("Add a name, type and at least one field of interest.");
      return;
    }
    const s = addSolver(form);
    setProfile(s);
    toast.success("Solver profile created", { description: `Auto-matched to ${matchesFor(form.categories).length} open challenges.` });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (profile) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="p-6 sm:p-8 border-slate-200">
          <div className="flex items-start gap-4 flex-wrap">
            <span className="grid place-items-center w-14 h-14 rounded-2xl bg-[#E6F4F1] text-[#005F73]">
              <Users className="w-7 h-7" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading text-2xl font-bold text-[#0A192F]">{profile.name}</h1>
                <span className="text-[11px] uppercase tracking-wide font-semibold text-[#005F73] bg-[#E6F4F1] border border-[#94D2BD] rounded px-2 py-0.5">
                  {profile.type}
                </span>
              </div>
              <p className="text-sm text-[#15803D] font-medium mt-1 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Profile active · auto-matching enabled
              </p>
              {profile.expertise && <p className="text-sm text-slate-500 mt-1">Expertise: {profile.expertise}</p>}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {profile.categories.map((c) => (
                  <span key={c} className="text-xs font-medium text-[#005F73] bg-[#E6F4F1] rounded-md px-2 py-0.5">{c}</span>
                ))}
              </div>
            </div>
            <Button variant="outline" data-testid="register-another-solver" onClick={() => { setProfile(null); setForm({ name: "", type: "", expertise: "", categories: [] }); }}>
              Register another
            </Button>
          </div>
        </Card>

        <div className="mt-10 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#EE9B00]" />
          <h2 className="font-heading text-xl font-bold text-[#0A192F]">Challenges matched to you ({matched.length})</h2>
        </div>
        {matched.length === 0 ? (
          <p className="mt-4 text-slate-400">No open challenges in your fields yet — we'll match you as new ones arrive.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6" data-testid="solver-matched-list">
            {matched.map((c, i) => (
              <ChallengeCard key={c.id} challenge={c} index={i} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E6F4F1] text-[#005F73] px-3 py-1 text-xs font-semibold">
          <Users className="w-3.5 h-3.5" /> Join as a Solver
        </span>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-[#0A192F]">Register your institution or organization</h1>
        <p className="text-slate-500 mt-2">
          Universities, research institutes, industries, startups, NGOs and CSR bodies can create a profile and get auto-matched to challenges in their field.
        </p>
      </div>

      <Card className="p-6 sm:p-8 border-slate-200">
        <form onSubmit={submit} data-testid="solver-signup-form" className="space-y-6">
          <div>
            <Label className="font-medium">Organization Name <span className="text-red-500">*</span></Label>
            <Input
              data-testid="input-solver-name"
              value={form.name}
              onChange={(e) => set("name")(e.target.value)}
              placeholder="e.g. NIT Jamshedpur — Civil Engineering Dept."
              className="mt-1.5 focus-visible:ring-[#0A9396]"
            />
          </div>

          <div>
            <Label className="font-medium">Type <span className="text-red-500">*</span></Label>
            <Select value={form.type} onValueChange={set("type")}>
              <SelectTrigger data-testid="input-solver-type" className="mt-1.5">
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-medium">Expertise / Capabilities</Label>
            <Input
              data-testid="input-solver-expertise"
              value={form.expertise}
              onChange={(e) => set("expertise")(e.target.value)}
              placeholder="e.g. Hydrology, GIS, storm-water systems"
              className="mt-1.5 focus-visible:ring-[#0A9396]"
            />
          </div>

          <div>
            <Label className="font-medium">Fields of Interest <span className="text-red-500">*</span></Label>
            <p className="text-xs text-slate-400 mt-0.5 mb-2">Pick the categories you can help solve — we'll match you automatically.</p>
            <div className="flex flex-wrap gap-2" data-testid="solver-category-picker">
              {CATEGORIES.map((c) => {
                const on = form.categories.includes(c);
                return (
                  <button
                    type="button"
                    key={c}
                    data-testid={`solver-cat-${c.replace(/[^a-z]/gi, "").toLowerCase()}`}
                    onClick={() => toggleCat(c)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      on ? "bg-[#005F73] text-white border-[#005F73]" : "bg-white text-slate-600 border-slate-200 hover:border-[#94D2BD]"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            type="submit"
            data-testid="create-solver-button"
            disabled={!valid}
            className="w-full bg-[#005F73] hover:bg-[#0A9396] text-white font-semibold py-6 text-base disabled:opacity-50"
          >
            Create Profile & See Matched Challenges
          </Button>
        </form>
      </Card>
    </div>
  );
}
