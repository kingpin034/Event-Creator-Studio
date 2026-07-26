import { useEffect, useState } from "react";
import {
  TicketPlus, X, ChevronRight, Users, TicketSlash, CircleDollarSign, TicketCheck, CircleAlert,
} from "lucide-react";
import { DashedSeparator, Toggle } from "./primitives";
import type { Ticket } from "./event-context";

type Draft = Omit<Ticket, "id">;

const EMPTY: Draft = {
  name: "", description: "", capacity: 0, paid: true, price: 0, open: true,
};

/* Breadcrumb "1. Information > 2. Details" — step drives the active colours. */
function Breadcrumb({ step, onStep }: { step: 1 | 2; onStep: (s: 1 | 2) => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative shrink-0">
      <button
        type="button"
        onClick={() => onStep(1)}
        className={`font-medium leading-none text-[16px] whitespace-nowrap cursor-pointer ${
          step === 1 ? "text-[#131313]" : "text-[#d8444b]"
        }`}
      >
        1. Information
      </button>
      <ChevronRight className="size-[20px] shrink-0" strokeWidth={1.5} color={step === 2 ? "#D8444B" : "#9E9E9E"} />
      <button
        type="button"
        onClick={() => step === 2 && onStep(2)}
        className={`font-medium leading-none text-[16px] whitespace-nowrap ${
          step === 2 ? "text-[#131313] cursor-pointer" : "text-[#9e9e9e] cursor-default"
        }`}
      >
        2. Details
      </button>
    </div>
  );
}

function FieldTitle({ label, required }: { label: string; required?: boolean }) {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">{label}</p>
      {required && <p className="font-semibold leading-[1.2] text-[#f42d2d] text-[18px]">*</p>}
    </div>
  );
}

export function CreateTicketModal({
  open, initial, onClose, onSubmit,
}: {
  open: boolean;
  initial?: Ticket | null;
  onClose: () => void;
  onSubmit: (t: Draft) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [draft, setDraft] = useState<Draft>(EMPTY);

  useEffect(() => {
    if (open) {
      setStep(1);
      setDraft(initial ? { ...initial } : EMPTY);
    }
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const infoValid = draft.name.trim().length > 0 && draft.capacity > 0;

  const submit = () => {
    if (!infoValid) return;
    onSubmit(draft);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(19,19,19,0.3)] flex items-center justify-center p-[16px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fbfbfb] rounded-[16px] w-[520px] max-w-full max-h-full overflow-y-auto border border-[#d9d9d9] content-stretch flex flex-col gap-[8px] items-end p-[16px] relative"
      >
        {/* Header */}
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
            <div className="content-stretch flex gap-[4px] items-center">
              <TicketPlus className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">Create Ticket</p>
            </div>
            <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] w-full">Setup ticket type for your event.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#e4e4e4] border border-[#d9d9d9] flex items-center justify-center p-[8px] rounded-[999px] shrink-0 cursor-pointer"
          >
            <X className="size-[20px]" strokeWidth={1.5} color="#131313" />
          </button>
        </div>

        <DashedSeparator />

        {/* Body */}
        <div className="content-stretch flex flex-col gap-[12px] items-end justify-center relative shrink-0 w-full">
          <Breadcrumb step={step} onStep={setStep} />

          {step === 1 ? (
            <>
              {/* Ticket Name */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                <FieldTitle label="Ticket Name" required />
                <div className="bg-[#f4f4f4] rounded-[16px] w-full border border-[#d9d9d9] focus-within:border-[#d8444b]">
                  <input
                    value={draft.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Early Bird"
                    className="w-full bg-transparent outline-none px-[16px] py-[18px] font-medium leading-none text-[16px] text-[#131313] placeholder:text-[#9e9e9e]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                <FieldTitle label="Description" />
                <div className="bg-[#f4f4f4] rounded-[16px] w-full border border-[#d9d9d9] focus-within:border-[#d8444b]">
                  <textarea
                    value={draft.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="This ticket will be used to enter the event"
                    className="w-full bg-transparent outline-none p-[16px] min-h-[74px] resize-y font-medium leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e]"
                  />
                </div>
              </div>

              {/* Capacity */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                <FieldTitle label="Capacity" required />
                <div className="bg-[#f4f4f4] rounded-[16px] w-full border border-[#d9d9d9] focus-within:border-[#d8444b]">
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={draft.capacity || ""}
                    onChange={(e) => set("capacity", Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="Number"
                    className="w-full bg-transparent outline-none px-[16px] py-[18px] font-medium leading-none text-[16px] text-[#131313] placeholder:text-[#9e9e9e]"
                  />
                </div>
                <div className="content-stretch flex items-start justify-end relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[4px] items-center">
                    <Users className="size-[20px]" strokeWidth={1.5} color="#9E9E9E" />
                    <p className="font-semibold leading-none text-[#9e9e9e] text-[12px] whitespace-nowrap">From 1 to 500</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Free / Paid switcher */}
              <div className="bg-[#fbfbfb] content-stretch flex items-center rounded-[12px] w-full border border-[#d9d9d9]">
                <button
                  type="button"
                  onClick={() => set("paid", false)}
                  className={`flex-[1_0_0] min-w-px rounded-[12px] flex gap-[4px] items-center justify-center px-[24px] py-[10px] cursor-pointer ${
                    !draft.paid ? "bg-[#f7e9e9] border border-[#d8444b]" : ""
                  }`}
                >
                  <TicketSlash className="size-[20px]" strokeWidth={1.5} color={!draft.paid ? "#D53940" : "#131313"} />
                  <p className={`font-medium leading-normal text-[14px] whitespace-nowrap ${!draft.paid ? "text-[#d53940]" : "text-[#131313]"}`}>Free</p>
                </button>
                <button
                  type="button"
                  onClick={() => set("paid", true)}
                  className={`flex-[1_0_0] min-w-px rounded-[12px] flex gap-[4px] items-center justify-center px-[24px] py-[10px] cursor-pointer ${
                    draft.paid ? "bg-[#f7e9e9] border border-[#d8444b]" : ""
                  }`}
                >
                  <CircleDollarSign className="size-[20px]" strokeWidth={1.5} color={draft.paid ? "#D53940" : "#131313"} />
                  <p className={`font-medium leading-normal text-[14px] whitespace-nowrap ${draft.paid ? "text-[#d53940]" : "text-[#131313]"}`}>Paid</p>
                </button>
              </div>

              {draft.paid && (
                <>
                  {/* Ticket Price */}
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <FieldTitle label="Ticket Price" required />
                    <div className="bg-[#f4f4f4] rounded-[16px] w-full border border-[#d9d9d9] focus-within:border-[#d8444b]">
                      <div className="flex items-center gap-[8px] px-[16px] py-[18px]">
                        <span className="font-medium leading-none text-[16px] text-[#131313] shrink-0">Rp</span>
                        <input
                          type="number"
                          min={0}
                          value={draft.price || ""}
                          onChange={(e) => set("price", Math.max(0, parseInt(e.target.value) || 0))}
                          placeholder="000.000"
                          className="flex-1 min-w-px bg-transparent outline-none font-medium leading-none text-[16px] text-[#131313] placeholder:text-[#9e9e9e]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fees */}
                  <div className="flex items-center justify-between w-full font-medium leading-none text-[16px] text-black">
                    <p>Platform Fee</p>
                    <p>Rp0</p>
                  </div>
                  <div className="flex items-center justify-between w-full font-medium leading-none text-[16px] text-[#d8444b]">
                    <p>Paid by visitor</p>
                    <p>Rp0</p>
                  </div>
                  <div className="h-px w-full bg-[#d9d9d9]" />
                </>
              )}

              {/* Status */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                <FieldTitle label="Status" required />
                <div className="bg-[#f4f4f4] rounded-[16px] w-full border border-[#d9d9d9] focus-within:border-[#d8444b]">
                  <div className="content-center flex flex-wrap gap-y-[10px] items-center justify-between p-[16px]">
                    <div className="content-stretch flex gap-[8px] items-center">
                      <TicketCheck className="size-[20px]" strokeWidth={1.5} color="#131313" />
                      <p className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Ticket Action</p>
                      <CircleAlert className="size-[20px]" strokeWidth={1.5} color="#D8444B" />
                    </div>
                    <Toggle on={draft.open} onChange={(v) => set("open", v)} labelOn="Open" labelOff="Closed" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          {step === 1 ? (
            <>
              <button
                type="button"
                disabled={!infoValid}
                onClick={() => setStep(2)}
                className={`bg-[#d8444b] rounded-[16px] w-full flex items-center justify-center px-[16px] py-[12px] ${
                  infoValid ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <p className="font-medium leading-none text-[#fbfbfb] text-[16px]">Add Details</p>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#e4e4e4] rounded-[16px] w-full flex items-center justify-center px-[16px] py-[12px] cursor-pointer"
              >
                <p className="font-medium leading-none text-[#131313] text-[16px]">Cancel</p>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={submit}
                className="bg-[#d8444b] rounded-[16px] w-full flex items-center justify-center px-[16px] py-[12px] cursor-pointer"
              >
                <p className="font-medium leading-none text-[#fbfbfb] text-[16px]">Create Ticket</p>
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-[#e4e4e4] rounded-[16px] w-full flex items-center justify-center px-[16px] py-[12px] cursor-pointer"
              >
                <p className="font-medium leading-none text-[#131313] text-[16px]">Back</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
