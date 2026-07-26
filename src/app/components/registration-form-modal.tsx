import { useEffect } from "react";
import { ClipboardList, X, AlignLeft, CircleDot, SquareCheck, SquareChevronDown } from "lucide-react";
import type { QuestionType } from "./event-context";
import { DashedSeparator } from "./primitives";

export const QUESTION_TYPES: {
  type: QuestionType;
  label: string;
  hint: string;
  Icon: typeof AlignLeft;
}[] = [
  { type: "paragraph", label: "Paragraph", hint: "Briefly describe the paragraph question type.", Icon: AlignLeft },
  { type: "choice", label: "Choice", hint: "Explain how choice questions work for registrations.", Icon: CircleDot },
  { type: "checkbox", label: "Checkbox", hint: "Describe the checkbox question format.", Icon: SquareCheck },
  { type: "dropdown", label: "Dropdown", hint: "Provide details about dropdown question options.", Icon: SquareChevronDown },
];

export function RegistrationFormModal({
  open, onClose, onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (t: QuestionType) => void;
}) {
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
        aria-label="Registration Form"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fbfbfb] rounded-[16px] w-[520px] max-w-full max-h-full overflow-y-auto border border-[#d9d9d9] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative"
      >
        {/* Header */}
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
            <div className="content-stretch flex gap-[4px] items-center">
              <ClipboardList className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">Registration Form</p>
            </div>
            <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] w-full">
              Ask guests custom questions when they register.
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

        {/* Question types */}
        <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
          {QUESTION_TYPES.map(({ type, label, hint, Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                onSelect(type);
                onClose();
              }}
              className="bg-[#fbfbfb] border border-[#d9d9d9] hover:border-[#d8444b] rounded-[16px] w-full shrink-0 content-stretch flex flex-col gap-[4px] items-start p-[16px] cursor-pointer text-left"
            >
              <div className="content-stretch flex gap-[8px] items-center">
                <Icon className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
                <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{label}</p>
              </div>
              <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] w-full">{hint}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
