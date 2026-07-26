import {
  GripVertical, Trash2, Plus, CaseSensitive, CircleDot, SquareCheck, SquareChevronDown, CopyCheck, CircleAlert,
} from "lucide-react";
import type { Question, QuestionType } from "./event-context";
import { Toggle } from "./primitives";

const TYPE_META: Record<QuestionType, { label: string; Icon: typeof CircleDot }> = {
  paragraph: { label: "Paragraph", Icon: CaseSensitive },
  choice: { label: "Choice", Icon: CircleDot },
  checkbox: { label: "Checkbox", Icon: SquareCheck },
  dropdown: { label: "Dropdown", Icon: SquareChevronDown },
};

const FIELD =
  "bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full p-[16px] font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none";

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <p className="font-semibold leading-[1.2] text-[#131313] text-[16px]">
      {label}
      {required && <span className="text-[#d8444b]"> *</span>}
    </p>
  );
}

export function QuestionCard({
  question, onChange, onRemove,
}: {
  question: Question;
  onChange: (patch: Partial<Question>) => void;
  onRemove: () => void;
}) {
  const { label, Icon } = TYPE_META[question.type];
  const hasOptions = question.type !== "paragraph";

  const setOption = (i: number, v: string) =>
    onChange({ options: question.options.map((o, idx) => (idx === i ? v : o)) });

  return (
    <div className="bg-[#fbfbfb] border border-[#d9d9d9] shadow-[0_4px_12px_0_rgba(19,19,19,0.06)] rounded-[16px] w-full shrink-0 content-stretch flex flex-col gap-[12px] items-start p-[16px]">
      {/* Header */}
      <div className="content-stretch flex gap-[8px] items-center w-full">
        <GripVertical className="size-[20px] shrink-0" strokeWidth={1.5} color="#9E9E9E" />
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px">
          <Icon className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
          <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{label}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label} question`}
          className="bg-[#f42d2d] border border-[#fae6e6] flex items-center justify-center p-[8px] rounded-[999px] shrink-0 cursor-pointer"
        >
          <Trash2 className="size-[20px]" strokeWidth={1.5} color="#FBFBFB" />
        </button>
      </div>

      {/* Title (+ placeholder for paragraph) */}
      <div className="content-stretch flex flex-wrap gap-[8px] items-start w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start flex-[1_0_0] min-w-[200px]">
          <FieldLabel label="Question Title" required />
          <input
            value={question.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Your title"
            className={FIELD}
          />
        </div>
        {question.type === "paragraph" && (
          <div className="content-stretch flex flex-col gap-[4px] items-start flex-[1_0_0] min-w-[200px]">
            <FieldLabel label="Placeholder Text" />
            <input
              value={question.placeholder}
              onChange={(e) => onChange({ placeholder: e.target.value })}
              placeholder="Your answer"
              className={FIELD}
            />
          </div>
        )}
      </div>

      {/* Dropdown-only: single vs multiple selection */}
      {question.type === "dropdown" && (
        <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full content-center flex flex-wrap gap-y-[10px] items-center justify-between p-[16px]">
          <div className="content-stretch flex gap-[8px] items-center">
            <CopyCheck className="size-[20px]" strokeWidth={1.5} color="#131313" />
            <p className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Selection Type</p>
            <CircleAlert className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
          </div>
          <Toggle
            on={question.multiple}
            onChange={(v) => onChange({ multiple: v })}
            labelOn="Multiple"
            labelOff="Single"
          />
        </div>
      )}

      {/* Options */}
      {hasOptions && (
        <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full overflow-hidden">
          {question.options.map((opt, i) => (
            <div
              key={i}
              className={`content-stretch flex gap-[8px] items-center px-[16px] py-[12px] ${
                i > 0 ? "border-t border-[#d9d9d9]" : ""
              }`}
            >
              <GripVertical className="size-[20px] shrink-0" strokeWidth={1.5} color="#9E9E9E" />
              <input
                value={opt}
                onChange={(e) => setOption(i, e.target.value)}
                placeholder="Option Label"
                className="bg-transparent outline-none flex-1 min-w-px font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e]"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({ options: [...question.options, ""] })}
            className="w-full border-t border-[#d9d9d9] content-stretch flex gap-[8px] items-center px-[16px] py-[12px] cursor-pointer hover:bg-[#e4e4e4]"
          >
            <Plus className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
            <span className="font-normal leading-[1.3] text-[#131313] text-[16px]">Add Option</span>
          </button>
        </div>
      )}

      {/* Required */}
      <div className="content-stretch flex gap-[8px] items-center justify-end w-full">
        <p className="font-medium leading-none text-[#131313] text-[14px]">Required</p>
        <Toggle on={question.required} onChange={(v) => onChange({ required: v })} labelOn="" labelOff="" />
      </div>
    </div>
  );
}
