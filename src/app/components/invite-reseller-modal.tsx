import { useState, type FormEvent } from "react";
import { MailPlus, Save, X, UserRoundCheck } from "lucide-react";
import { useEvent } from "./event-context";
import type { Reseller, ResellerTicketAccess } from "./resellers-data";
import { DashedSeparator, Toggle } from "./primitives";
import { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTitle, DialogDescription } from "./ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const field = "w-full min-w-0 bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] p-[16px] text-[16px] font-normal text-[#131313] placeholder:text-[#9e9e9e] outline-none focus:border-[#d8444b] disabled:opacity-50";

export function InviteResellerModal({ open, onClose, onInvited, reseller }: {
  reseller?: Reseller;
  open: boolean;
  onClose: () => void;
  onInvited: (email: string) => void;
}) {
  return <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
    <DialogPortal>
      <DialogOverlay className="bg-[rgba(19,19,19,0.3)]" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-[#fbfbfb] border border-[#d9d9d9] rounded-[16px] w-[520px] max-w-[calc(100%-32px)] max-h-[90dvh] flex flex-col overflow-hidden p-[16px] text-[#131313]">
        <div className="flex items-start justify-between gap-[12px] mb-[8px] shrink-0">
          <div className="min-w-0">
            <DialogTitle className="flex gap-[4px] items-center text-[18px] font-semibold leading-[1.2]">{reseller ? <UserRoundCheck className="size-[20px] shrink-0" strokeWidth={1.5} /> : <MailPlus className="size-[20px] shrink-0" strokeWidth={1.5} />}{reseller ? "Reseller Settings" : "Invite Reseller"}</DialogTitle>
            <DialogDescription className="text-[14px] text-[#9e9e9e] mt-[4px] break-words">{reseller ? `${reseller.name} | ${reseller.email}` : "Invite a reseller and set ticket access"}</DialogDescription>
          </div>
          <DialogClose aria-label="Close" className="bg-[#e4e4e4] border border-[#d9d9d9] rounded-full p-[8px] shrink-0 cursor-pointer"><X className="size-[20px]" strokeWidth={1.5} /></DialogClose>
        </div>
        <DashedSeparator />
        <InviteForm key={reseller?.id ?? "invite"} reseller={reseller} onInvited={onInvited} />
      </DialogPrimitive.Content>
    </DialogPortal>
  </Dialog>;
}

function InviteForm({ onInvited, reseller }: { onInvited: (email: string) => void; reseller?: Reseller }) {
  // Use the same live ticket collection as Create Event and Ticket & Registration.
  // IDs keep entered values attached to the right type when names or ordering change.
  const { tickets, resellers, setResellers } = useEvent();
  const [disabled, setDisabled] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const savedAccess = (id: string) => reseller?.ticketAccess?.find((access) => access.ticketId === id);
  const isAllowed = (id: string) => !(disabled[id] ?? (reseller ? !savedAccess(id) || savedAccess(id)?.allowed === false : false));
  const allowed = tickets.filter((ticket) => isAllowed(ticket.id));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = reseller?.email ?? String(data.get("email") ?? "").trim().toLowerCase();
    if (!email) return setError("Enter a reseller email address.");
    if (resellers.some((r) => r.id !== reseller?.id && r.status !== "disconnected" && r.email.toLowerCase() === email)) {
      return setError("This email already belongs to a reseller for this event.");
    }
    if (!reseller && !allowed.length) return setError("Allow at least one ticket type.");
    const ticketAccess: ResellerTicketAccess[] = [];
    for (const ticket of tickets) {
      if (!isAllowed(ticket.id)) {
        const quotaInput = event.currentTarget.elements.namedItem(`quota-${ticket.id}`) as HTMLInputElement | null;
        const priceInput = event.currentTarget.elements.namedItem(`price-${ticket.id}`) as HTMLInputElement | null;
        ticketAccess.push({ ticketId: ticket.id, allowed: false, quota: Number(quotaInput?.value) || 0, price: Number(priceInput?.value) || 0 });
        continue;
      }
      const quotaText = String(data.get(`quota-${ticket.id}`) ?? "");
      const priceText = String(data.get(`price-${ticket.id}`) ?? "");
      const quota = Number(quotaText);
      const price = Number(priceText);
      if (!quotaText || !Number.isSafeInteger(quota) || quota < 1 || quota > ticket.capacity) {
        return setError(`Enter a quota between 1 and ${ticket.capacity} for ${ticket.name}.`);
      }
      if (!priceText || !Number.isSafeInteger(price) || price < 0) {
        return setError(`Enter a valid reseller price for ${ticket.name}.`);
      }
      ticketAccess.push({ ticketId: ticket.id, quota, price, allowed: true });
    }
    const capacity = ticketAccess.reduce((total, access) => total + (access.allowed === false ? 0 : access.quota), 0);
    if (reseller) {
      // Preserve historical sales and identity; ticket permissions only affect future sales.
      setResellers(resellers.map((current) => current.id === reseller.id ? { ...current, ticketAccess, capacity: Math.max(current.sold, capacity) } : current));
      onInvited(email);
      return;
    }
    setResellers([...resellers, {
      id: crypto.randomUUID(), name: email.split("@")[0], email,
      ticketAccess, capacity,
      commissionRate: 0, sold: 0, revenue: 0, status: "pending",
    }]);
    onInvited(email);
  }

  return <form onSubmit={submit} className="flex flex-col min-h-0 pt-[16px]">
    <div className="flex flex-col gap-[16px] overflow-y-auto min-h-0 pb-[16px]">
    {!reseller && <label className="flex flex-col gap-[4px] font-semibold text-[18px]">
      <span>Reseller Email <span className="text-[#f42d2d]">*</span></span>
      <input name="email" type="email" autoComplete="email" required placeholder="Enter reseller email" className={field} />
    </label>}
    {tickets.length === 0 && <p className="text-[14px] text-[#414141]">Create a ticket type in Ticket &amp; Registration before configuring reseller access.</p>}
    {tickets.map((ticket, index) => {
      const enabled = isAllowed(ticket.id);
      const saved = savedAccess(ticket.id);
      return <fieldset key={ticket.id} className={`min-w-0 flex flex-col gap-[16px] ${index ? "border-t border-[#d9d9d9] pt-[16px]" : ""}`}>
        <legend className="sr-only">{ticket.name}</legend>
        <div className="flex items-center justify-between gap-[12px]">
          <h3 className="text-[#d8444b] font-semibold text-[18px] break-words min-w-0">{ticket.name}</h3>
          <div role="group" aria-label={`Allow ${ticket.name}`} className="shrink-0">
            <Toggle ariaLabel={`Allow ${ticket.name}`} on={enabled} onChange={(on) => { setDisabled((current) => ({ ...current, [ticket.id]: !on })); setError(""); }} labelOn="Allow" labelOff="Restricted" />
          </div>
        </div>
        <div className="grid grid-cols-1 phone:grid-cols-2 gap-[12px]">
          <label className="flex flex-col gap-[4px] font-semibold text-[18px] min-w-0">
            <span>Quota <span className="text-[#f42d2d]">*</span></span>
            <input aria-label={`${ticket.name} quota`} name={`quota-${ticket.id}`} type="number" min={1} max={ticket.capacity} step={1} required={enabled} disabled={!enabled} defaultValue={saved?.quota || ""} placeholder="Enter quota" className={field} />
          </label>
          <label className="flex flex-col gap-[4px] font-semibold text-[18px] min-w-0">
            <span>Reseller Price <span className="text-[#f42d2d]">*</span></span>
            <div className={`flex gap-[8px] items-center bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] p-[16px] focus-within:border-[#d8444b] ${!enabled ? "opacity-50" : ""}`}>
              <span className="font-normal text-[16px]">Rp</span>
              <input aria-label={`${ticket.name} reseller price`} name={`price-${ticket.id}`} type="number" min={0} step={1} required={enabled} disabled={!enabled} defaultValue={saved?.price ?? ""} placeholder="000.000" className="w-full min-w-0 bg-transparent outline-none font-normal text-[16px] placeholder:text-[#9e9e9e]" />
            </div>
          </label>
        </div>
      </fieldset>;
    })}
    </div>
    {error && <p role="alert" className="text-[14px] text-[#d8444b]">{error}</p>}
    <button type="submit" disabled={!reseller && !allowed.length} className="bg-[#d8444b] rounded-[16px] w-full shrink-0 flex gap-[8px] items-center justify-center px-[16px] py-[12px] font-medium text-[#fbfbfb] text-[16px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"><Save className="size-[20px]" strokeWidth={1.5} />{reseller ? "Save Changes" : "Send Invitation"}</button>
  </form>;
}
