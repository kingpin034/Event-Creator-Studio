import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, X, CalendarClock } from "lucide-react";

/* ---------- helpers ---------- */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** yyyy-mm-dd <-> Date (local, date-only) */
function toKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function fromKey(s: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function stripTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** All 15-minute time slots of a day, e.g. "00:00" ... "23:45". */
const TIME_SLOTS: string[] = (() => {
  const out: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return out;
})();

const ITEM_H = 26; // height of a single time row (matches the 3-line design)

/* ---------- iOS-style scrolling time wheel ---------- */
function TimeWheel({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() => Math.max(0, TIME_SLOTS.indexOf(value)));
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll to the current value on mount / when value changes externally.
  useEffect(() => {
    const idx = TIME_SLOTS.indexOf(value);
    if (idx < 0 || !ref.current) return;
    setActive(idx);
    ref.current.scrollTop = idx * ITEM_H;
  }, [value]);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.min(TIME_SLOTS.length - 1, Math.max(0, idx));
    if (clamped !== active) setActive(clamped);
    // Snap + commit once scrolling settles.
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      el.scrollTo({ top: clamped * ITEM_H, behavior: "smooth" });
      onChange(TIME_SLOTS[clamped]);
    }, 120);
  };

  return (
    <div className="bg-[#f4f4f4] relative rounded-[12px] shrink-0 w-full border border-[#d9d9d9]">
      <div
        ref={ref}
        onScroll={handleScroll}
        className="relative z-10 overflow-y-scroll no-scrollbar snap-y snap-mandatory px-[16px]"
        style={{ height: ITEM_H * 3, scrollbarWidth: "none" }}
      >
        {/* top/bottom spacers so first & last rows can center */}
        <div style={{ height: ITEM_H }} aria-hidden />
        {TIME_SLOTS.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              ref.current?.scrollTo({ top: i * ITEM_H, behavior: "smooth" });
              setActive(i);
              onChange(t);
            }}
            className={`snap-center flex items-center justify-center w-full font-medium text-[16px] leading-none text-center ${
              i === active ? "text-[#131313]" : "text-[#d9d9d9]"
            }`}
            style={{ height: ITEM_H }}
          >
            {t}
          </button>
        ))}
        <div style={{ height: ITEM_H }} aria-hidden />
      </div>
    </div>
  );
}

/* ---------- Calendar month grid ---------- */
function MonthGrid({
  view,
  rangeStart,
  rangeEnd,
  onPick,
}: {
  view: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onPick: (d: Date) => void;
}) {
  const weeks = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay()); // back up to the Sunday of the first week
    const cells: Date[] = [];
    const cursor = new Date(start);
    // Render whole weeks until we've passed the last day of the month.
    while (true) {
      for (let i = 0; i < 7; i++) {
        cells.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
      const last = cells[cells.length - 1];
      if (last.getMonth() !== month && last > new Date(year, month + 1, 0)) break;
    }
    const out: Date[][] = [];
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
    return out;
  }, [view]);

  const s = rangeStart ? stripTime(rangeStart) : null;
  const e = rangeEnd ? stripTime(rangeEnd) : null;

  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      {/* weekday header */}
      <div className="flex items-center justify-between w-full">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="flex items-center justify-center px-[8px] py-[12px]">
            <p className="font-medium leading-none text-[#131313] text-[16px] text-center w-[28px]">{w}</p>
          </div>
        ))}
      </div>
      {/* weeks */}
      {weeks.map((week, wi) => (
        <div key={wi} className="flex items-center justify-between w-full">
          {week.map((day) => {
            const cur = stripTime(day);
            const inMonth = day.getMonth() === view.getMonth();
            const hasRange = !!(s && e && !sameDay(s, e));
            const isStart = !!(s && sameDay(cur, s));
            const isEnd = !!(e && sameDay(cur, e));
            const isEndpoint = isStart || isEnd;
            const inRange = !!(s && e && cur > s && cur < e);
            // Continuous pink bar: full for middle days, right-half for start, left-half for end.
            let pinkStyle: CSSProperties | null = null;
            if (inRange) pinkStyle = { left: 0, right: 0 };
            else if (hasRange && isStart) pinkStyle = { left: "50%", right: 0 };
            else if (hasRange && isEnd) pinkStyle = { left: 0, right: "50%" };
            return (
              <div key={toKey(day)} className="relative flex-1 flex items-center justify-center py-[6px]">
                {pinkStyle && (
                  <div className="absolute inset-y-[6px] bg-[#f4d6d8] pointer-events-none" style={pinkStyle} />
                )}
                <button
                  type="button"
                  onClick={() => onPick(day)}
                  className={`relative z-10 flex items-center justify-center rounded-[8px] size-[40px] cursor-pointer ${
                    isEndpoint ? "bg-[#d8444b]" : ""
                  }`}
                >
                  <p
                    className={`font-medium leading-none text-[16px] text-center w-[24px] ${
                      isEndpoint ? "text-[#fbfbfb]" : inMonth ? "text-[#131313]" : "text-[#bebebe]"
                    }`}
                  >
                    {day.getDate()}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function DashedSeparator() {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 456 1">
          <path d="M0 0.5H456" stroke="#9E9E9E" strokeDasharray="5 3" />
        </svg>
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */
export type DateTimeValue = {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
};

export function DateTimePicker({
  open,
  value,
  onClose,
  onApply,
}: {
  open: boolean;
  value: DateTimeValue;
  onClose: () => void;
  onApply: (v: DateTimeValue) => void;
}) {
  const [view, setView] = useState<Date>(() => fromKey(value.startDate) ?? new Date());
  const [rangeStart, setRangeStart] = useState<Date | null>(() => fromKey(value.startDate));
  const [rangeEnd, setRangeEnd] = useState<Date | null>(() => fromKey(value.endDate));
  const [startTime, setStartTime] = useState(value.startTime || "09:00");
  const [finishTime, setFinishTime] = useState(value.endTime || "12:00");

  // Re-seed the modal from the incoming value each time it opens.
  useEffect(() => {
    if (!open) return;
    setView(fromKey(value.startDate) ?? new Date());
    setRangeStart(fromKey(value.startDate));
    setRangeEnd(fromKey(value.endDate));
    setStartTime(value.startTime || "09:00");
    setFinishTime(value.endTime || "12:00");
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const pick = (d: Date) => {
    const day = stripTime(d);
    // No start yet, or a full range already chosen → start a fresh selection.
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(day);
      setRangeEnd(null);
      return;
    }
    // Have a start, choosing the second endpoint.
    if (day < stripTime(rangeStart)) {
      setRangeStart(day); // clicked earlier → becomes the new start
    } else {
      setRangeEnd(day); // range (or same-day if equal handled by caller)
    }
  };

  const apply = () => {
    if (!rangeStart) {
      onClose();
      return;
    }
    const start = toKey(rangeStart);
    const end = rangeEnd ? toKey(rangeEnd) : start;
    onApply({ startDate: start, startTime, endDate: end, endTime: finishTime });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(19,19,19,0.3)] flex items-center justify-center p-[16px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fbfbfb] content-stretch flex flex-col gap-[12px] items-start max-w-[488px] w-full p-[16px] rounded-[16px] relative border border-[#d9d9d9]"
      >
        {/* header: month nav + close */}
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <div className="content-stretch flex gap-[8px] items-center py-[4px]">
            <button
              type="button"
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
              className="cursor-pointer flex items-center justify-center size-[20px]"
            >
              <ChevronLeft className="size-[20px]" strokeWidth={1.5} color="#131313" />
            </button>
            <p className="font-bold leading-[1.2] text-[#131313] text-[20px] text-center whitespace-nowrap min-w-[132px]">
              {MONTHS[view.getMonth()]} {view.getFullYear()}
            </p>
            <button
              type="button"
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
              className="cursor-pointer flex items-center justify-center size-[20px]"
            >
              <ChevronRight className="size-[20px]" strokeWidth={1.5} color="#131313" />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#e4e4e4] border border-[#d9d9d9] flex items-center justify-center p-[8px] rounded-[999px] cursor-pointer"
          >
            <X className="size-[20px]" strokeWidth={1.5} color="#131313" />
          </button>
        </div>

        <DashedSeparator />

        <MonthGrid view={view} rangeStart={rangeStart} rangeEnd={rangeEnd} onPick={pick} />

        <DashedSeparator />

        {/* time wheels */}
        <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-w-px">
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] text-center whitespace-nowrap">Start at</p>
            <TimeWheel value={startTime} onChange={setStartTime} />
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-w-px">
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] text-center whitespace-nowrap">Finish at</p>
            <TimeWheel value={finishTime} onChange={setFinishTime} />
          </div>
        </div>

        <DashedSeparator />

        {/* confirm */}
        <button
          type="button"
          onClick={apply}
          className="bg-[#d8444b] rounded-[16px] w-full flex gap-[8px] items-center justify-center px-[16px] py-[10px] cursor-pointer"
        >
          <CalendarClock className="size-[20px]" strokeWidth={1.5} color="#FBFBFB" />
          <p className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Set Date &amp; Time</p>
        </button>
      </div>
    </div>
  );
}
