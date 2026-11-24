import { ReactNode, useRef, useState } from "react";
import { ChevronDown, ImageUp, Trash2 } from "lucide-react";

/* Empty-state artwork + caption used by the search modals. The image hides
   itself if the asset is missing so the caption still reads cleanly rather
   than showing a broken image. */
export function EmptyState({ src, caption }: { src: string; caption: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center py-[24px] w-full">
      {!failed && (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          className="h-[200px] w-auto max-w-full object-contain shrink-0"
        />
      )}
      <p className="font-semibold leading-[1.2] text-[#131313] text-[16px] text-center">{caption}</p>
    </div>
  );
}

/* Pill toggle matching the Figma design (40x20 frame, 36x18 track, 20x14 knob). */
export function Toggle({
  on,
  onChange,
  labelOn,
  labelOff,
  ariaLabel,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  labelOn: string;
  labelOff: string;
  ariaLabel?: string;
}) {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-semibold leading-none text-[#131313] text-[12px] whitespace-nowrap">
        {on ? labelOn : labelOff}
      </p>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-pressed={on}
        onClick={() => onChange(!on)}
        className="h-[20px] overflow-clip relative shrink-0 w-[40px] cursor-pointer"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 absolute h-[18px] left-1/2 rounded-[999px] top-1/2 w-[36px] border-[1.5px] border-solid ${
            on ? "bg-[#f4d6d8] border-[#e68d91]" : "bg-[#d9d9d9] border-[#9e9e9e]"
          }`}
        />
        <div
          className={`-translate-y-1/2 absolute h-[14px] rounded-[999px] top-1/2 w-[20px] transition-all ${
            on ? "bg-[#d8444b] left-[calc(50%+6px)] -translate-x-1/2" : "bg-[#9e9e9e] left-[calc(50%-6px)] -translate-x-1/2"
          }`}
        />
      </button>
    </div>
  );
}

export function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="overflow-clip relative shrink-0 size-[20px] cursor-pointer"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 rounded-[4px] size-[16px] top-1/2 border-[1.5px] border-solid flex items-center justify-center ${
          checked ? "bg-[#d8444b] border-[#d8444b]" : "border-[#9e9e9e]"
        }`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#fbfbfb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  );
}

/* Styled select that looks like the "Option with Dropdown" rows. */
export function Dropdown({
  icon,
  value,
  placeholder,
  options,
  onChange,
}: {
  icon: ReactNode;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-[#f4f4f4] relative rounded-[16px] shrink-0 w-full border border-[#d9d9d9]">
      <div className="flex items-center justify-between p-[16px] relative gap-[8px]">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 min-w-px">
          <span className="shrink-0 [&>svg]:size-[20px] [&>svg]:text-[#131313]">{icon}</span>
          <span className={`font-medium leading-none text-[16px] truncate ${value ? "text-[#131313]" : "text-[#9e9e9e]"}`}>
            {value ? (options.find((o) => o.value === value)?.label ?? value) : placeholder}
          </span>
        </div>
        <ChevronDown className="size-[20px] text-[#131313] shrink-0" strokeWidth={1.5} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* Round tertiary icon button (e.g. + / chevron). */
export function RoundButton({
  children,
  onClick,
  bordered = true,
}: {
  children: ReactNode;
  onClick?: () => void;
  bordered?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0 cursor-pointer ${
        bordered ? "border border-[#d9d9d9]" : ""
      }`}
    >
      <span className="[&>svg]:size-[20px] [&>svg]:text-[#131313]">{children}</span>
    </button>
  );
}

/* Dashed separator matching the modal design. */
export function DashedSeparator() {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 488 1">
          <path d="M0 0.5H488" stroke="#9E9E9E" strokeDasharray="5 3" />
        </svg>
      </div>
    </div>
  );
}

/* Section card with icon + title + subtitle header and optional right action. */
export function SectionCard({
  icon,
  title,
  subtitle,
  action,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#fbfbfb] relative rounded-[16px] shrink-0 w-full border border-[#d9d9d9]">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <span className="shrink-0 [&>svg]:size-[20px] [&>svg]:text-[#d8444b]">{icon}</span>
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">{title}</p>
            </div>
            {subtitle && (
              <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
        {children}
      </div>
    </div>
  );
}

/* Dashed upload drop zone with optional image preview. Accepts a dropped image
   as well as a click — the placeholder copy invites both. */
export function UploadZone({
  preview,
  onSelect,
  onRemove,
  className = "",
}: {
  preview: string | null;
  onSelect: (url: string) => void;
  onRemove: () => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const take = (file?: File) => {
    if (file && file.type.startsWith("image/")) onSelect(URL.createObjectURL(file));
  };
  return (
    <div
      className={`bg-[#f4f4f4] relative rounded-[16px] overflow-hidden ${className}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        take(e.dataTransfer.files?.[0]);
      }}
    >
      <div
        className={`absolute inset-0 border-[#d8444b] border-[1.5px] border-dashed pointer-events-none rounded-[16px] z-10 ${
          dragging ? "bg-[#f7e9e9]" : ""
        }`}
      />
      {preview ? (
        <>
          <img src={preview} alt="upload preview" className="absolute inset-0 size-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove image"
            className="absolute right-[12px] top-[12px] z-20 bg-[#f42d2d] border border-[#fae6e6] flex items-center justify-center p-[8px] rounded-[999px] [&>svg]:size-[20px] [&>svg]:text-[#fbfbfb] cursor-pointer"
          >
            <Trash2 strokeWidth={1.5} />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 flex flex-col gap-[16px] items-center justify-center cursor-pointer p-[16px]"
        >
          {/* Lucide's viewBox is 24 units, so at 120px the scale is 5x —
              stroke-[0.8] renders as a 4px line. */}
          <ImageUp className="size-[120px] shrink-0 stroke-[0.8]" color="#D8444B" />
          {/* The whole zone is the button, so the red words open the picker too. */}
          {/* 176px forces the break after "or", matching the design in both the
              wide cover and the 200px gallery slot. */}
          <p className="font-medium leading-[1.3] text-[#131313] text-[16px] text-center max-w-[176px]">
            Drag images here or click to <span className="text-[#d8444b]">select images</span>
          </p>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          take(e.target.files?.[0]);
          e.target.value = ""; // allow re-picking the same file
        }}
      />
    </div>
  );
}
