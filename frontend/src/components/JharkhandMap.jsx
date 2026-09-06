import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DemoDataBadge } from "@/components/Badges";
import { MapPin } from "lucide-react";

const NODES = [
  { d: "Palamu", x: 12, y: 40 },
  { d: "Gumla", x: 20, y: 66 },
  { d: "Ranchi", x: 38, y: 54 },
  { d: "Ramgarh", x: 44, y: 42 },
  { d: "Hazaribagh", x: 48, y: 26 },
  { d: "Giridih", x: 62, y: 22 },
  { d: "Bokaro", x: 58, y: 42 },
  { d: "Dhanbad", x: 72, y: 36 },
  { d: "Deoghar", x: 80, y: 20 },
  { d: "Dumka", x: 86, y: 32 },
  { d: "West Singhbhum", x: 38, y: 80 },
  { d: "East Singhbhum", x: 62, y: 76 },
  { d: "Jamshedpur", x: 68, y: 64 },
];

const BASE = { Ranchi: 34, Dhanbad: 21, "East Singhbhum": 18, Jamshedpur: 16, Hazaribagh: 15, Palamu: 12, Giridih: 10, Gumla: 9, "West Singhbhum": 11, Dumka: 8, Bokaro: 13, Deoghar: 7, Ramgarh: 9 };
const BASE_DEP = { Ranchi: 4, Dhanbad: 2, "East Singhbhum": 2, Jamshedpur: 2, Hazaribagh: 1, Palamu: 1, Giridih: 1, Gumla: 1, "West Singhbhum": 1, Dumka: 0, Bokaro: 1, Deoghar: 0, Ramgarh: 1 };

export const JharkhandMap = ({ challenges = [] }) => {
  const [sel, setSel] = useState("Ranchi");

  const counts = {};
  NODES.forEach((n) => {
    const live = challenges.filter((c) => (c.district || "").includes(n.d)).length;
    const dep = challenges.filter((c) => (c.district || "").includes(n.d) && c.stageIndex >= 9).length;
    counts[n.d] = { challenges: (BASE[n.d] || 6) + live, deployed: (BASE_DEP[n.d] || 0) + dep };
  });
  const max = Math.max(...Object.values(counts).map((c) => c.challenges));
  const selected = counts[sel];

  return (
    <Card className="p-6 border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#005F73]" />
          <h3 className="font-heading font-semibold text-[#0A192F]">Jharkhand District Activity Map</h3>
        </div>
        <DemoDataBadge />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div
            className="relative w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] dot-grid overflow-hidden"
            style={{ paddingBottom: "64%" }}
            data-testid="jharkhand-map"
          >
            {NODES.map((n) => {
              const c = counts[n.d];
              const t = c.challenges / max;
              const size = 26 + t * 30;
              const on = sel === n.d;
              return (
                <button
                  key={n.d}
                  data-testid={`map-district-${n.d.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => setSel(n.d)}
                  title={`${n.d}: ${c.challenges} challenges · ${c.deployed} deployed`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full grid place-items-center transition-transform hover:scale-110"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    width: size,
                    height: size,
                    background: `rgba(10,147,150,${0.25 + t * 0.6})`,
                    boxShadow: on ? "0 0 0 4px rgba(238,155,0,0.55)" : "0 0 0 2px rgba(255,255,255,0.85)",
                  }}
                >
                  {c.deployed > 0 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
            {NODES.map((n) => (
              <span
                key={n.d + "-l"}
                className="absolute -translate-x-1/2 text-[9px] font-medium text-slate-500 whitespace-nowrap pointer-events-none"
                style={{ left: `${n.x}%`, top: `calc(${n.y}% + 20px)` }}
              >
                {n.d}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: "rgba(10,147,150,0.3)" }} /> Fewer</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: "rgba(10,147,150,0.9)" }} /> More challenges</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white ring-1 ring-slate-300" /> has deployments</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5" data-testid="map-selected-panel">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Selected District</p>
          <h4 className="font-heading text-2xl font-bold text-[#0A192F] mt-1">{sel}</h4>
          <div className="mt-5 space-y-5">
            <div>
              <p className="font-heading text-3xl font-extrabold text-[#005F73]">{selected.challenges}</p>
              <p className="text-sm text-slate-500">Challenges reported</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-extrabold text-[#EE9B00]">{selected.deployed}</p>
              <p className="text-sm text-slate-500">Solutions deployed</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
