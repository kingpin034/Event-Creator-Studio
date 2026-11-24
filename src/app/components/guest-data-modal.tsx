import { useState, type FormEvent } from "react";
import { PanelsTopLeft, Ticket, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTitle, DialogDescription } from "./ui/dialog";
import { DashedSeparator } from "./primitives";
import { useEvent } from "./event-context";
import type { GuestRecord } from "./guests-data";

export function GuestDataModal({ guest, mode, onClose, onSaved }: {
  guest: GuestRecord;
  mode: "view" | "edit";
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const { saveGuestContact } = useEvent();
  const [error, setError] = useState("");
  const editing = mode === "edit";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const contact = { name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), phone: String(data.get("phone") ?? "") };
    const resend = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") !== "save";
    try {
      saveGuestContact(guest.id, contact, resend);
      onSaved(resend ? `Guest updated. Ticket resend to ${contact.email.trim()} (${contact.phone.trim()}) simulated; no email or SMS was sent.` : "Guest information saved without resending the ticket.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save guest information.");
    }
  }
  const details = [
    { question: "Name", value: guest.name },
    { question: "Email", value: guest.email },
    { question: "Phone Number", value: guest.phone },
    { question: "Ticket Type", value: guest.ticketType },
    ...(guest.answers ?? [{ question: "Question 1", value: guest.answer }]),
  ];
  return <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
    <DialogPortal>
      <DialogOverlay className="bg-[rgba(19,19,19,0.3)]" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-[#fbfbfb] border border-[#d9d9d9] rounded-[16px] w-[520px] max-w-[calc(100%-32px)] max-h-[90dvh] flex flex-col overflow-hidden p-[16px] text-[#131313]">
        <div className="flex gap-[12px] items-start justify-between mb-[8px] shrink-0">
          <div>
            <DialogTitle className="flex items-center gap-[4px] text-[18px] font-semibold"><PanelsTopLeft className="size-[20px]" strokeWidth={1.5} />{editing ? "Edit Data" : "Ticket Details"}</DialogTitle>
            <DialogDescription className="text-[#9e9e9e] text-[14px] mt-[4px]">Details information of your registrant</DialogDescription>
          </div>
          <DialogClose aria-label="Close" className="rounded-full bg-[#e4e4e4] border border-[#d9d9d9] p-[8px] cursor-pointer"><X className="size-[20px]" strokeWidth={1.5} /></DialogClose>
        </div>
        <DashedSeparator />
        {editing ? <form onSubmit={submit} className="flex flex-col min-h-0 pt-[16px] gap-[16px]">
          <div className="flex flex-col gap-[16px] overflow-y-auto">
            {([{ name: "name", label: "Name", type: "text", value: guest.name }, { name: "email", label: "Email", type: "email", value: guest.email }, { name: "phone", label: "Phone Number", type: "tel", value: guest.phone }] as const).map((field) => (
              <label key={field.name} className="flex flex-col gap-[4px] font-semibold text-[18px]">
                <span>{field.label} <span className="text-[#f42d2d]">*</span></span>
                <input name={field.name} type={field.type} autoComplete={field.name === "phone" ? "tel" : field.name} required defaultValue={field.value} maxLength={field.name === "name" ? 100 : field.name === "email" ? 254 : 30} className="w-full min-w-0 rounded-[16px] bg-[#f4f4f4] border border-[#d9d9d9] p-[16px] font-normal text-[16px] outline-none focus:border-[#d8444b]" />
              </label>
            ))}
          </div>
          {error && <p role="alert" className="text-[#d8444b] text-[14px]">{error}</p>}
          <div className="flex flex-col gap-[8px] mt-[32px] shrink-0">
            <button type="submit" name="action" value="resend" className="bg-[#d8444b] text-[#fbfbfb] rounded-[16px] py-[12px] px-[16px] flex items-center justify-center gap-[8px] text-[16px] cursor-pointer"><Ticket className="size-[20px]" strokeWidth={1.5} />Resend Ticket</button>
            <button type="submit" name="action" value="save" className="bg-[#e4e4e4] rounded-[16px] py-[12px] px-[16px] text-[16px] cursor-pointer">Save without Resend</button>
          </div>
        </form> : <dl className="mt-[8px] p-[16px] rounded-[12px] bg-[#f4f4f4] border border-[#d9d9d9] flex flex-col gap-[16px] overflow-y-auto">
          {details.map((detail, index) => <div key={index}>
            <dt className="text-[#9e9e9e] text-[16px] mb-[4px]">{detail.question}</dt>
            <dd className="text-[16px] break-words whitespace-pre-wrap">{Array.isArray(detail.value) ? <div className="flex flex-wrap gap-[8px]">{detail.value.map((value, i) => <span key={i} className="bg-[#f7e9e9] border border-[#d8444b] text-[#d8444b] rounded-[12px] px-[12px] py-[4px]">{value}</span>)}</div> : detail.value || "Not provided"}</dd>
          </div>)}
        </dl>}
      </DialogPrimitive.Content>
    </DialogPortal>
  </Dialog>;
}
