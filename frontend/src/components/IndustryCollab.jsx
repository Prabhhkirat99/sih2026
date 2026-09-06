import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Factory, Check, HandHeart } from "lucide-react";
import { SUPPORT_OPTIONS } from "@/lib/engine";
import { toast } from "sonner";

const SupportDialog = ({ open, onOpenChange, company, current, onConfirm }) => {
  const [selected, setSelected] = useState(current || []);
  const toggle = (opt) => setSelected((p) => (p.includes(opt) ? p.filter((x) => x !== opt) : [...p, opt]));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="offer-support-dialog">
        <DialogHeader>
          <DialogTitle className="font-heading">Offer Support · {company}</DialogTitle>
          <DialogDescription>Select the types of support your organization can provide.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2 py-2">
          {SUPPORT_OPTIONS.map((opt) => {
            const on = selected.includes(opt);
            return (
              <button
                key={opt}
                data-testid={`support-option-${opt.toLowerCase()}`}
                onClick={() => toggle(opt)}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  on ? "border-[#0A9396] bg-[#E6F4F1] text-[#005F73]" : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {opt}
                <span className={`grid place-items-center w-5 h-5 rounded-full border ${on ? "bg-[#0A9396] border-[#0A9396] text-white" : "border-slate-300"}`}>
                  {on && <Check className="w-3.5 h-3.5" />}
                </span>
              </button>
            );
          })}
        </div>
        <DialogFooter>
          <Button
            data-testid="confirm-offer-support-button"
            disabled={selected.length === 0}
            className="bg-[#005F73] hover:bg-[#0A9396] text-white w-full"
            onClick={() => {
              onConfirm(selected);
              onOpenChange(false);
              toast.success(`Support offered to ${company}`, { description: selected.join(", ") });
            }}
          >
            Confirm Offer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const IndustryCollab = ({ industries, onOffer }) => {
  const [dialogFor, setDialogFor] = useState(null);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Factory className="w-5 h-5 text-[#005F73]" />
        <h3 className="font-heading text-xl font-bold text-[#0A192F]">Industry, NGO & Organization Partners</h3>
      </div>
      {industries.map((c, idx) => (
        <Card
          key={c.name}
          data-testid={c.name.includes("VitalSense") ? "industry-collab-card-vitalsense" : `industry-collab-card-${idx}`}
          className="p-5 border-slate-200 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-heading font-semibold text-[#0A192F]">{c.name}</h4>
                {c.type && (
                  <span className="text-[10px] uppercase tracking-wide font-semibold text-[#005F73] bg-[#E6F4F1] border border-[#94D2BD] rounded px-1.5 py-0.5">
                    {c.type}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{c.reason}</p>
            </div>
            <Badge className="bg-[#EE9B00] text-white hover:bg-[#EE9B00]">{c.score}% Match</Badge>
          </div>

          <div className="mt-4">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Capabilities</p>
            <ul className="space-y-1">
              {c.capabilities.map((cap) => (
                <li key={cap} className="text-sm text-slate-600 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0A9396] mt-1 shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Support Offered</p>
            <div className="flex flex-wrap gap-1.5">
              {c.support.map((s) => {
                const active = c.offered?.includes(s);
                return (
                  <span
                    key={s}
                    className={`text-xs font-medium rounded-md px-2 py-0.5 border ${
                      active ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]" : "text-slate-600 bg-slate-50 border-slate-200"
                    }`}
                  >
                    {s}
                    {active && " ✓"}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <Button
              data-testid={c.name.includes("VitalSense") ? "offer-support-button" : `offer-support-button-${idx}`}
              onClick={() => setDialogFor(c)}
              className="bg-[#005F73] hover:bg-[#0A9396] text-white"
            >
              <HandHeart className="w-4 h-4 mr-1.5" /> Offer Support
            </Button>
          </div>

          {dialogFor?.name === c.name && (
            <SupportDialog
              open={!!dialogFor}
              onOpenChange={(v) => !v && setDialogFor(null)}
              company={c.name}
              current={c.offered}
              onConfirm={(sel) => onOffer(c.name, sel)}
            />
          )}
        </Card>
      ))}
    </div>
  );
};
