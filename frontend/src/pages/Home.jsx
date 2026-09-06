import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PipelineStrip } from "@/components/PipelineStrip";
import { ChallengeCard } from "@/components/ChallengeCard";
import { useStore } from "@/lib/store";
import { ArrowRight, ShieldCheck, Building2, Users, Cpu, Sparkles } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1779981140213-8ba54c2c7a5a?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80";

export default function Home() {
  const navigate = useNavigate();
  const { challenges } = useStore();
  const featured = challenges.find((c) => c.featured) || challenges[0];

  return (
    <div>
      {/* Hero */}
      <section className="jmib-grid-bg border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#94D2BD] bg-[#E6F4F1] px-3 py-1 text-xs font-semibold text-[#005F73]"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Government of Jharkhand · SIH26043
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#0A192F]"
            >
              Turning Societal Challenges Into <span className="text-[#005F73]">Real-World Solutions.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              JSIB connects citizens, governments, universities, researchers, industries and organizations to
              collaboratively solve the problems that matter most.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                data-testid="report-challenge-hero-button"
                onClick={() => navigate("/submit")}
                className="bg-[#005F73] hover:bg-[#0A9396] text-white font-semibold px-6 py-6 text-base shadow-md"
              >
                Report a Challenge <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                data-testid="explore-challenges-hero-button"
                onClick={() => navigate("/explore")}
                variant="outline"
                className="border-slate-300 text-[#005F73] hover:bg-white font-semibold px-6 py-6 text-base bg-white"
              >
                Explore Challenges
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <img src={HERO_IMG} alt="Smart city civic innovation" className="w-full h-[340px] lg:h-[420px] object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-3 sm:left-6 glass rounded-xl border border-slate-200 shadow-lg px-4 py-3 flex items-center gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#0A192F] text-[#94D2BD]">
                <Sparkles className="w-4.5 h-4.5 w-5 h-5" />
              </span>
              <div>
                <p className="text-xs text-slate-500">AI-triaged challenges</p>
                <p className="font-heading font-bold text-[#0A192F] leading-tight">{challenges.length} live on platform</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0A192F]">One transparent innovation pipeline</h2>
          <p className="text-slate-500 mt-2">From a community's problem to a deployed, validated solution.</p>
        </div>
        <PipelineStrip />
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Citizens & organizations", body: "Report real societal problems — health, water, roads, education, environment and more — from any district." },
            { icon: Cpu, title: "AI + universities & partners", body: "AI categorizes and prioritizes each problem, then matches the right universities, industries and NGOs." },
            { icon: ShieldCheck, title: "Government oversight", body: "Track verification, collaboration and pilots through one accountable pipeline to measurable impact." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#E6F4F1] text-[#005F73]">
                <f.icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-heading font-semibold text-[#0A192F]">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured demo challenge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#EE9B00]">Featured Demo Case</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0A192F] mt-1">Follow one challenge end-to-end</h2>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-[#005F73] inline-flex items-center gap-1 hover:gap-2 transition-all">
            View all challenges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {featured && (
          <Link to={`/challenge/${featured.id}`} data-testid="home-featured-challenge">
            <div className="rounded-2xl border border-slate-200 bg-[#0A192F] text-white overflow-hidden hover:shadow-xl transition-shadow grid md:grid-cols-3">
              <div className="p-8 md:col-span-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#94D2BD]">
                  {featured.ai?.category}
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold leading-snug">{featured.title}</h3>
                <p className="mt-3 text-slate-300 text-sm max-w-2xl leading-relaxed">{featured.description}</p>
                <div className="mt-6 flex flex-wrap gap-6 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs">Priority</p>
                    <p className="font-semibold text-[#EE9B00]">{featured.ai?.priority}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Impact Score</p>
                    <p className="font-semibold font-mono">{featured.ai?.impactScore}/100</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Top University</p>
                    <p className="font-semibold">{featured.universities?.[0]?.name} · {featured.universities?.[0]?.score}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Industry Partner</p>
                    <p className="font-semibold">{featured.industries?.[0]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0A9396]/10 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
                <p className="text-xs text-slate-400">Required Expertise</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {featured.ai?.requiredExpertise.map((e) => (
                    <span key={e} className="text-xs bg-white/10 rounded-md px-2 py-0.5 text-[#94D2BD]">{e}</span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Open full case <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* Recent challenges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-heading text-2xl font-bold text-[#0A192F] mb-6">Recent challenges</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {challenges.slice(0, 3).map((c, i) => (
            <ChallengeCard key={c.id} challenge={c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
