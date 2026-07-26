import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";
import { DashedSeparator } from "./primitives";

/* Confirmation prompt for a setting that shouldn't flip on a single tap. */
export function ConfirmModal({
  open, icon, title, description, confirmLabel, onConfirm, onClose,
}: {
  open: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
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
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fbfbfb] rounded-[16px] w-[520px] max-w-full max-h-full overflow-y-auto border border-[#d9d9d9] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative"
      >
        {/* Header */}
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
            <div className="content-stretch flex gap-[4px] items-center">
              <span className="shrink-0 [&>svg]:size-[20px] [&>svg]:text-[#131313]">{icon}</span>
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{title}</p>
            </div>
            <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] w-full">{description}</p>
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

        {/* Actions */}
        <button
          type="button"
          onClick={onConfirm}
          className="bg-[#d8444b] rounded-[16px] w-full shrink-0 flex items-center justify-center px-[32px] py-[18px] cursor-pointer"
        >
          <p className="font-medium leading-none text-[#fbfbfb] text-[16px]">{confirmLabel}</p>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-[#e4e4e4] rounded-[16px] w-full shrink-0 flex items-center justify-center px-[32px] py-[18px] cursor-pointer"
        >
          <p className="font-medium leading-none text-[#131313] text-[16px]">Cancel</p>
        </button>
      </div>
    </div>
  );
}
