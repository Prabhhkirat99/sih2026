import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Menu, X, Bell, Users } from "lucide-react";
import { useStore } from "@/lib/store";
import { ROLES } from "@/lib/engine";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const navForRole = (role) => {
  const base = [
    { label: "Home", to: "/", tid: "header-nav-home" },
    { label: "Explore", to: "/explore", tid: "header-nav-explore" },
  ];
  const ws = {
    label: role === "citizen" ? "My Reports" : role === "government" ? "Verify Queue" : "My Challenges",
    to: "/workspace",
    tid: "header-nav-workspace",
  };
  const impact = { label: "Impact", to: "/impact", tid: "header-nav-impact" };
  if (role === "citizen") return [...base, { label: "Submit", to: "/submit", tid: "header-nav-submit" }, ws];
  if (role === "government") return [...base, ws, { label: "Command Center", to: "/dashboard", tid: "header-nav-dashboard" }, impact];
  return [...base, ws, impact];
};

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { role, setRole } = useStore();
  const nav = navForRole(role);
  const changeRole = (v) => {
    setRole(v);
    setOpen(false);
    navigate("/workspace");
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" data-testid="header-logo" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-[#005F73] text-white shadow-sm group-hover:bg-[#0A9396] transition-colors">
              <Activity className="w-5 h-5" strokeWidth={2.4} />
            </span>
            <span className="leading-tight">
              <span className="block font-heading font-extrabold text-[#0A192F] text-lg tracking-tight">JMIB</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold -mt-0.5">
                Societal Innovation Bridge
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => {
              const active = location.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  data-testid={n.tid}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? "text-[#005F73] bg-[#E6F4F1]" : "text-slate-600 hover:text-[#0A192F] hover:bg-slate-100"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Select value={role} onValueChange={changeRole}>
              <SelectTrigger data-testid="role-selector" className="h-9 w-[210px] border-slate-200 bg-white text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <Users className="w-4 h-4 text-[#005F73] shrink-0" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r.id} value={r.id} data-testid={`role-option-${r.id}`}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors relative" data-testid="header-bell">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EE9B00]" />
            </button>
            <button
              onClick={() => navigate("/submit")}
              data-testid="header-report-cta"
              className="ml-1 px-4 py-2 rounded-lg bg-[#005F73] hover:bg-[#0A9396] text-white text-sm font-semibold shadow-sm transition-colors"
            >
              Report Challenge
            </button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            onClick={() => setOpen((v) => !v)}
            data-testid="header-mobile-toggle"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          <div className="pb-2">
            <Select value={role} onValueChange={changeRole}>
              <SelectTrigger data-testid="role-selector-mobile" className="h-10 w-full border-slate-200 bg-white text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#005F73]" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-[#E6F4F1] hover:text-[#005F73]"
            >
              {n.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/submit");
            }}
            className="w-full mt-2 px-4 py-2.5 rounded-lg bg-[#005F73] text-white text-sm font-semibold"
          >
            Report Challenge
          </button>
        </div>
      )}
    </header>
  );
};
