import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { CATEGORIES, DISTRICTS, URGENCIES } from "@/lib/engine";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/Badges";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, ClipboardList, X, ImagePlus } from "lucide-react";

export default function Submit() {
  const navigate = useNavigate();
  const { addChallenge } = useStore();
  const [submitted, setSubmitted] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    domain: "",
    district: "",
    peopleAffected: "",
    urgency: "",
    evidence: "",
    image: "",
    photo: "",
  });

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 900;
        let { width, height } = img;
        if (width > maxW) {
          height = Math.round((height * maxW) / width);
          width = maxW;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        set("photo")(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };
  const valid = form.title && form.description && form.domain && form.district && form.urgency;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const created = addChallenge(form);
    setSubmitted(created);
    toast.success("Challenge submitted", { description: "Status set to Under Ministry Review." });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-8 border-slate-200 text-center">
            <span className="grid place-items-center w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </span>
            <h1 className="mt-5 font-heading text-2xl font-bold text-[#0A192F]">Challenge submitted successfully</h1>
            <p className="mt-2 text-slate-500">Your challenge has been logged and AI-triaged. It is now awaiting government verification.</p>
            <div className="mt-5 flex justify-center" data-testid="under-ministry-review-badge">
              <StatusBadge status="Under Ministry Review" />
            </div>
            <div className="mt-6 rounded-xl border border-slate-200 p-4 text-left bg-slate-50">
              {submitted.photo && <img src={submitted.photo} alt="" className="w-full max-h-40 object-cover rounded-lg mb-3" />}
              <h3 className="font-heading font-semibold text-[#0A192F]">{submitted.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{submitted.domain} · {submitted.district}</p>
            </div>
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              <Button
                data-testid="view-submitted-challenge-button"
                onClick={() => navigate(`/challenge/${submitted.id}`)}
                className="bg-[#005F73] hover:bg-[#0A9396] text-white"
              >
                View AI Analysis <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button variant="outline" onClick={() => { setSubmitted(null); setForm({ title: "", description: "", domain: "", district: "", peopleAffected: "", urgency: "", evidence: "", image: "", photo: "" }); }}>
                Submit another
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E6F4F1] text-[#005F73] px-3 py-1 text-xs font-semibold">
          <ClipboardList className="w-3.5 h-3.5" /> Societal Challenge Submission
        </span>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-[#0A192F]">Report a societal challenge</h1>
        <p className="text-slate-500 mt-2">Any citizen or organization can submit a real-world societal problem. Our AI categorizes, prioritizes and matches the right solvers.</p>
      </div>

      <Card className="p-6 sm:p-8 border-slate-200">
        <form onSubmit={handleSubmit} data-testid="challenge-submit-form" className="space-y-6">
          <div>
            <Label className="font-medium">Problem Title <span className="text-red-500">*</span></Label>
            <Input
              data-testid="input-challenge-title"
              value={form.title}
              onChange={(e) => set("title")(e.target.value)}
              placeholder="e.g. Water logging near the school road every monsoon"
              className="mt-1.5 focus-visible:ring-[#0A9396]"
            />
          </div>

          <div>
            <Label className="font-medium">Description <span className="text-red-500">*</span></Label>
            <Textarea
              data-testid="input-challenge-description"
              value={form.description}
              onChange={(e) => set("description")(e.target.value)}
              placeholder="Describe the societal problem, who it affects, and current gaps…"
              rows={5}
              className="mt-1.5 focus-visible:ring-[#0A9396]"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label className="font-medium">Category <span className="text-red-500">*</span></Label>
              <Select value={form.domain} onValueChange={set("domain")}>
                <SelectTrigger data-testid="input-challenge-domain" className="mt-1.5">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-medium">District <span className="text-red-500">*</span></Label>
              <Select value={form.district} onValueChange={set("district")}>
                <SelectTrigger data-testid="input-challenge-district" className="mt-1.5">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label className="font-medium">People Affected</Label>
              <Input
                data-testid="input-people-affected"
                value={form.peopleAffected}
                onChange={(e) => set("peopleAffected")(e.target.value)}
                placeholder="e.g. 250,000+ pregnant women"
                className="mt-1.5 focus-visible:ring-[#0A9396]"
              />
            </div>
            <div>
              <Label className="font-medium">Urgency <span className="text-red-500">*</span></Label>
              <Select value={form.urgency} onValueChange={set("urgency")}>
                <SelectTrigger data-testid="input-urgency" className="mt-1.5">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  {URGENCIES.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="font-medium">Supporting Evidence</Label>
            <Input
              data-testid="input-supporting-evidence"
              value={form.evidence}
              onChange={(e) => set("evidence")(e.target.value)}
              placeholder="Reference links, survey names, or report citations"
              className="mt-1.5 focus-visible:ring-[#0A9396]"
            />
            <p className="text-xs text-slate-400 mt-1.5">Add report references or data source links (prototype: text reference).</p>
          </div>

          <div>
            <Label className="font-medium">Image / Document (optional)</Label>
            <Input
              data-testid="input-image-document"
              value={form.image}
              onChange={(e) => set("image")(e.target.value)}
              placeholder="Paste a photo or document URL (optional)"
              className="mt-1.5 focus-visible:ring-[#0A9396]"
            />
          </div>

          <div>
            <Label className="font-medium">Attach a Photo (optional)</Label>
            <p className="text-xs text-slate-400 mt-0.5 mb-2">Upload a real photo of the problem so verifiers and solvers see it instantly.</p>
            {form.photo ? (
              <div className="relative inline-block">
                <img src={form.photo} alt="Problem preview" data-testid="photo-preview" className="max-h-48 rounded-xl border border-slate-200" />
                <button
                  type="button"
                  data-testid="remove-photo-button"
                  onClick={() => set("photo")("")}
                  className="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full bg-white border border-slate-200 shadow text-slate-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="photo-input"
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#0A9396] transition-colors py-8 cursor-pointer text-slate-500"
              >
                <ImagePlus className="w-6 h-6" />
                <span className="text-sm font-medium">Click to upload a photo</span>
                <span className="text-xs text-slate-400">JPG or PNG · compressed automatically</span>
                <input id="photo-input" type="file" accept="image/*" className="hidden" data-testid="input-photo-upload" onChange={handlePhoto} />
              </label>
            )}
          </div>

          <Button
            type="submit"
            data-testid="submit-challenge-button"
            disabled={!valid}
            className="w-full bg-[#005F73] hover:bg-[#0A9396] text-white font-semibold py-6 text-base disabled:opacity-50"
          >
            Submit Challenge for Ministry Review
          </Button>
        </form>
      </Card>
    </div>
  );
}
