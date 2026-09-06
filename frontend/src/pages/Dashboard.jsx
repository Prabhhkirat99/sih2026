import { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { DemoDataBadge } from "@/components/Badges";
import { JharkhandMap } from "@/components/JharkhandMap";
import { useStore } from "@/lib/store";
import { CATEGORIES, LIFECYCLE } from "@/lib/engine";
import {
  LayoutDashboard,
  ClipboardList,
  Cpu,
  GraduationCap,
  Factory,
  Activity,
  ChevronLeft,
  ChevronRight,
  FileStack,
  Rocket,
  Building2,
  HeartPulse,
  TrendingUp,
} from "lucide-react";

const TEAL = "#005F73";
const TEAL2 = "#0A9396";
const MINTG = "#94D2BD";
const AMBER = "#EE9B00";
const NAVY = "#0A192F";
const PIE_COLORS = [TEAL, TEAL2, MINTG, AMBER, NAVY, "#3B82F6", "#8B5CF6"];

const STATS = [
  { key: "total-challenges", label: "Total Challenges", value: "214", trend: "+22% this month", icon: ClipboardList },
  { key: "verified-challenges", label: "Verified Challenges", value: "142", trend: "Govt. verified", icon: FileStack },
  { key: "active-projects", label: "Active Projects", value: "63", trend: "18 in prototyping", icon: Rocket },
  { key: "universities", label: "Universities Participating", value: "24", trend: "IIT ISM · NIT · BIT · BAU", icon: GraduationCap },
  { key: "industry-partners", label: "Industry Partners", value: "38", trend: "Multi-sector", icon: Building2 },
  { key: "ngos", label: "NGOs / Organizations", value: "17", trend: "CSR & civil society", icon: HeartPulse },
  { key: "solutions-deployed", label: "Solutions Deployed", value: "19", trend: "Across 21 districts", icon: Rocket },
  { key: "people-impacted", label: "People Impacted", value: "2.4M+", trend: "Across Jharkhand", icon: Activity },
];

const SIDEBAR = [
  { label: "Overview / Metrics", icon: LayoutDashboard },
  { label: "Societal Challenges", icon: ClipboardList },
  { label: "AI Analysis Center", icon: Cpu },
  { label: "University Match Hub", icon: GraduationCap },
  { label: "Partner Network", icon: Factory },
  { label: "Lifecycle Tracker", icon: Activity },
];

const LIFECYCLE_DATA = [
  { stage: "Submitted", count: 214 },
  { stage: "AI Analyzed", count: 190 },
  { stage: "Verified", count: 142 },
  { stage: "Categorized", count: 138 },
  { stage: "Uni Matched", count: 96 },
  { stage: "Partner", count: 74 },
  { stage: "Proposal", count: 52 },
  { stage: "Prototype", count: 34 },
  { stage: "Pilot", count: 21 },
  { stage: "Deployed", count: 12 },
];

const PARTNER_DATA = [
  { name: "Universities", value: 24 },
  { name: "Industry", value: 38 },
  { name: "NGOs", value: 17 },
  { name: "Startups", value: 15 },
  { name: "Govt / CSR", value: 9 },
];

const DISTRICT_DATA = [
  { district: "Ranchi", challenges: 34, deployed: 4 },
  { district: "Dhanbad", challenges: 21, deployed: 2 },
  { district: "E. Singhbhum", challenges: 18, deployed: 2 },
  { district: "Hazaribagh", challenges: 15, deployed: 1 },
  { district: "Palamu", challenges: 12, deployed: 1 },
  { district: "Giridih", challenges: 10, deployed: 1 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-md px-3 py-2 text-xs">
      <p className="font-semibold text-[#0A192F] mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color || p.fill }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { challenges } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Overview / Metrics");

  const domainData = CATEGORIES.map((d, i) => ({
    name: d.split(" ")[0].replace("&", ""),
    full: d,
    value: challenges.filter((c) => c.domain === d).length + [22, 18, 16, 14, 12, 15, 13, 9, 11, 10, 7, 8, 10, 9, 6, 12, 3][i],
  }));

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-slate-100">
          {!collapsed && <span className="font-heading font-bold text-[#0A192F] text-sm">Ministry Console</span>}
          <button
            data-testid="sidebar-toggle"
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="p-2 space-y-1">
          {SIDEBAR.map((item) => {
            const on = active === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                data-testid={`sidebar-item-${item.label.split(" ")[0].toLowerCase()}`}
                title={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  on ? "bg-[#E6F4F1] text-[#005F73]" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <item.icon className="w-4.5 h-4.5 w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[#0A192F]">Societal Innovation Command Center</h1>
            <p className="text-slate-500 mt-1">Innovation pipeline health across Jharkhand.</p>
          </div>
          <DemoDataBadge />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((s) => (
            <Card
              key={s.key}
              data-testid={`ministry-stat-card-${s.key}`}
              className="p-5 border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#005F73]">
                  <s.icon className="w-5 h-5" />
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#15803D]">
                  <TrendingUp className="w-3 h-3" />
                </span>
              </div>
              <p className="mt-4 font-heading text-3xl font-extrabold text-[#0A192F]">{s.value}</p>
              <p className="text-sm font-medium text-slate-600 mt-0.5">{s.label}</p>
              <p className="text-xs text-slate-400 mt-1">{s.trend}</p>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-[#0A192F]">Challenges by Category</h3>
              <DemoDataBadge />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={domainData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} interval={0} angle={-30} textAnchor="end" height={64} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F1F5F9" }} />
                <Bar dataKey="value" name="Challenges" fill={TEAL2} radius={[6, 6, 0, 0]} maxBarSize={40} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-[#0A192F]">Innovation Lifecycle Funnel</h3>
              <DemoDataBadge />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={LIFECYCLE_DATA} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="funnelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={TEAL2} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={TEAL2} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" vertical={false} />
                <XAxis dataKey="stage" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" name="Projects" stroke={TEAL} strokeWidth={2.5} fill="url(#funnelGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-[#0A192F]">Partner Participation</h3>
              <DemoDataBadge />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={PARTNER_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={2} isAnimationActive={false}>
                  {PARTNER_DATA.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-[#0A192F]">District Impact</h3>
              <DemoDataBadge />
            </div>
            <div className="space-y-3">
              {DISTRICT_DATA.map((d) => {
                const pct = (d.challenges / 34) * 100;
                return (
                  <div key={d.district}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{d.district}</span>
                      <span className="text-slate-500">{d.challenges} challenges · {d.deployed} deployed</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#0A9396]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <JharkhandMap challenges={challenges} />
        </div>
      </main>
    </div>
  );
}
