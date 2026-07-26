import { useEffect } from "react";
import { CalendarClock, X, Globe } from "lucide-react";
import { TIME_ZONES, useEvent } from "./event-context";
import { DashedSeparator } from "./primitives";

export function TimeZoneModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { timeZone, setTimeZone } = useEvent();

  // Close on Escape, matching the overlay click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(19,19,19,0.3)] flex items-center justify-center p-[16px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Time Zone"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fbfbfb] rounded-[16px] w-[520px] max-w-full max-h-full overflow-y-auto border border-[#d9d9d9] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative"
      >
        {/* Header */}
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
            <div className="content-stretch flex gap-[4px] items-center">
              <CalendarClock className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">Time Zone</p>
            </div>
            <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] w-full">
              Set up the Indonesian time zone for your event.
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

        {/* Options — same card shape as the Time Zone box in the form. */}
        <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
          {TIME_ZONES.map((tz) => (
            <button
              key={tz.id}
              type="button"
              aria-current={tz.id === timeZone.id}
              onClick={() => {
                setTimeZone(tz);
                onClose();
              }}
              className="bg-[#fbfbfb] border border-[#d9d9d9] hover:border-[#d8444b] rounded-[16px] w-full shrink-0 content-stretch flex gap-[8px] items-center p-[16px] cursor-pointer text-left"
            >
              <Globe className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
              <div className="flex flex-col gap-[4px] flex-[1_0_0] min-w-px">
                <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{tz.city}</p>
                <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">{tz.offset}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
