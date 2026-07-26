import { useEffect, useRef, useState } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import { useEvent } from "./event-context";
import { DashedSeparator } from "./primitives";
import { FormatToolbar } from "./right-column";

const SUBJECT_MAX = 100;
const BODY_MAX = 500;

function ComposeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addBlast } = useEvent();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [formats, setFormats] = useState<Record<string, boolean>>({});
  const subjectRef = useRef<HTMLInputElement>(null);

  // Reset and focus each time it opens.
  useEffect(() => {
    if (!open) return;
    setSubject("");
    setBody("");
    setFormats({});
    const t = setTimeout(() => subjectRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const canSend = subject.trim().length > 0 && body.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(19,19,19,0.3)] flex items-center justify-center p-[16px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Blast Message"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fbfbfb] rounded-[16px] w-[520px] max-w-full max-h-full overflow-y-auto border border-[#d9d9d9] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative"
      >
        {/* Header */}
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
            <div className="content-stretch flex gap-[4px] items-center">
              <MessageSquarePlus className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">Blast Message</p>
            </div>
            <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] w-full">
              Send a blast message to your attendees
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="bg-[#e4e4e4] border border-[#d9d9d9] flex items-center justify-center p-[8px] rounded-[999px] shrink-0 cursor-pointer"
          >
            <X className="size-[20px]" strokeWidth={1.5} color="#131313" />
          </button>
        </div>

        <DashedSeparator />

        {/* Subject */}
        <input
          ref={subjectRef}
          value={subject}
          maxLength={SUBJECT_MAX}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full shrink-0 p-[16px] font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none"
        />
        <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">
          {subject.length} / {SUBJECT_MAX} character
        </p>

        <FormatToolbar formats={formats} onToggle={(id) => setFormats((f) => ({ ...f, [id]: !f[id] }))} />

        {/* Message */}
        <textarea
          value={body}
          maxLength={BODY_MAX}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Message"
          className="bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full shrink-0 p-[16px] min-h-[180px] resize-y font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none"
        />
        <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">
          {body.length} / {BODY_MAX} character
        </p>

        <button
          type="button"
          disabled={!canSend}
          onClick={() => {
            addBlast(subject.trim(), body.trim());
            onClose();
          }}
          className={`bg-[#d8444b] rounded-[16px] w-full shrink-0 flex items-center justify-center px-[32px] py-[16px] ${
            canSend ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <span className="font-medium leading-none text-[#fbfbfb] text-[16px]">Send Blast</span>
        </button>
      </div>
    </div>
  );
}

export function BlastMessage() {
  const { blasts } = useEvent();
  const [composing, setComposing] = useState(false);

  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[868px] w-full">
        <div className="content-stretch flex flex-wrap gap-[12px] items-center justify-between w-full">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[24px]">Blast Message</p>
          <button
            type="button"
            onClick={() => setComposing(true)}
            className="bg-[#d8444b] rounded-[16px] flex gap-[8px] items-center justify-center px-[24px] py-[12px] shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
            <span className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Create Blast Message</span>
          </button>
        </div>

        {blasts.length === 0 ? (
          <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px]">No blast messages sent yet.</p>
        ) : (
          <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
            {blasts.map((b) => (
              <div
                key={b.id}
                className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full shrink-0 content-stretch flex flex-col gap-[4px] items-start p-[16px]"
              >
                <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">Blast - {b.sentAt}</p>
                <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{b.subject}</p>
                <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px] w-full truncate">{b.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ComposeModal open={composing} onClose={() => setComposing(false)} />
    </div>
  );
}
