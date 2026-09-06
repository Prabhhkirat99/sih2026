import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { ROLES } from "@/lib/engine";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

const ROLE_LABEL = Object.fromEntries(ROLES.map((r) => [r.id, r.label]));
const ROLE_COLOR = {
  citizen: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  government: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
  university: "bg-[#E6F4F1] text-[#005F73] border-[#94D2BD]",
  industry: "bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]",
  ngo: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
};

export const CollaborationRoom = ({ challenge }) => {
  const { role, addMessage } = useStore();
  const [text, setText] = useState("");
  const thread = challenge.thread || [];
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [thread.length]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    addMessage(challenge.id, { role, text: t });
    setText("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Card data-testid="collaboration-room" className="border-slate-200 overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100">
        <span className="grid place-items-center w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#005F73]">
          <MessageSquare className="w-5 h-5" />
        </span>
        <div>
          <h3 className="font-heading font-semibold text-[#0A192F]">Collaboration Room</h3>
          <p className="text-[11px] text-slate-500">Citizen, government, university & partners coordinate here</p>
        </div>
      </div>

      <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto" data-testid="thread-messages" ref={scrollRef}>
        {thread.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">
            No messages yet. Start the conversation as <span className="font-semibold">{ROLE_LABEL[role]}</span>.
          </p>
        ) : (
          thread.map((m) => (
            <div key={m.id} className="flex gap-3" data-testid="thread-message">
              <span className={`shrink-0 h-fit text-[10px] uppercase tracking-wide font-semibold rounded-md border px-2 py-0.5 ${ROLE_COLOR[m.role] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                {ROLE_LABEL[m.role] || m.role}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">{m.text}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{new Date(m.at).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-start gap-2">
          <Textarea
            data-testid="message-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            placeholder={`Message as ${ROLE_LABEL[role]}…`}
            className="focus-visible:ring-[#0A9396] resize-none"
          />
          <Button
            data-testid="send-message-button"
            onClick={send}
            disabled={!text.trim()}
            className="bg-[#005F73] hover:bg-[#0A9396] text-white h-auto py-2.5 px-4 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
