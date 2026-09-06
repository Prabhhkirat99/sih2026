import { Badge } from "@/components/ui/badge";

const STATUS_STYLES = {
  "Under Ministry Review": "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
  Submitted: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
  "AI Analysis": "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  Verified: "bg-[#E6F4F1] text-[#005F73] border-[#94D2BD]",
  "University Matched": "bg-[#E6F4F1] text-[#005F73] border-[#94D2BD]",
  "Industry Partnered": "bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]",
  Prototype: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  Validation: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  Pilot: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
  Deployment: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
  Impact: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
};

const PRIORITY_STYLES = {
  CRITICAL: "bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]",
  HIGH: "bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]",
  MODERATE: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
  LOW: "bg-[#E6F4F1] text-[#005F73] border-[#94D2BD]",
};

export const StatusBadge = ({ status, ...props }) => (
  <Badge
    variant="outline"
    className={`border ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600 border-slate-200"}`}
    {...props}
  >
    {status}
  </Badge>
);

export const PriorityBadge = ({ priority, ...props }) => (
  <Badge
    variant="outline"
    className={`border ${PRIORITY_STYLES[priority] || "bg-slate-100 text-slate-600 border-slate-200"}`}
    {...props}
  >
    {priority}
  </Badge>
);

export const DemoDataBadge = () => (
  <span
    data-testid="demo-data-badge"
    className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-[#EE9B00]" />
    Demo Data
  </span>
);
