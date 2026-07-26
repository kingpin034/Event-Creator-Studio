import { useState } from "react";
import { ScanFace, RefreshCw, ChevronUp, FileText, CircleCheckBig } from "lucide-react";
import { useEvent } from "./event-context";
import { VISITOR_COUNTER } from "./guests-data";
import type { Guest, GuestStatus, GuestGroup, TicketType } from "./guests-data";

const STATUS_STYLE: Record<GuestStatus, { label: string; className: string }> = {
  registered: { label: "Registered", className: "bg-[#fef6e7] border-[#e0a33a] text-[#b97e12]" },
  confirmed: { label: "Confirmed", className: "bg-[#eef2ff] border-[#2563eb] text-[#2563eb]" },
  checkedin: { label: "Checked In", className: "bg-[#e9f7ee] border-[#1a9c4b] text-[#1a9c4b]" },
  canceled: { label: "Canceled", className: "bg-[#f7e9e9] border-[#d8444b] text-[#d8444b]" },
};

const TICKET_STYLE: Record<TicketType, string> = {
  "Early Bird": "bg-[#f7e9e9] border-[#d8444b] text-[#d8444b]",
  "VIP Access": "bg-[#fef6e7] border-[#e0a33a] text-[#b97e12]",
  Regular: "bg-[#f7e9e9] border-[#d8444b] text-[#d8444b]",
};

function VisitorCounter() {
  const { capacity, checkedIn, confirmed, registered, canceled } = VISITOR_COUNTER;
  const total = checkedIn + confirmed + registered + canceled;
  const pct = (n: number) => `${(n / capacity) * 100}%`;
  const legend = [
    { dot: "bg-[#1a9c4b]", label: `${checkedIn} Checked In` },
    { dot: "bg-[#2563eb]", label: `${confirmed} Confirmed` },
    { dot: "bg-[#e0a33a]", label: `${registered} Registered` },
    { dot: "bg-[#d8444b]", label: `${canceled} Canceled` },
  ];
  return (
    <div className="bg-[#fbfbfb] border border-[#d9d9d9] rounded-[16px] w-full shrink-0 content-stretch flex flex-col gap-[12px] items-start p-[16px]">
      <div className="content-stretch flex gap-[12px] items-center justify-between w-full">
        <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">Visitor Counter</p>
        <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{total}/{capacity}</p>
      </div>
      {/* Segments are sized against capacity, so the bar reads as "how full". */}
      <div className="bg-[#e4e4e4] rounded-[999px] h-[8px] w-full overflow-hidden flex">
        <div className="bg-[#1a9c4b] h-full" style={{ width: pct(checkedIn) }} />
        <div className="bg-[#2563eb] h-full" style={{ width: pct(confirmed) }} />
        <div className="bg-[#e0a33a] h-full" style={{ width: pct(registered) }} />
        <div className="bg-[#d8444b] h-full" style={{ width: pct(canceled) }} />
      </div>
      <div className="content-stretch flex flex-wrap gap-x-[32px] gap-y-[8px] items-center w-full">
        {legend.map((l) => (
          <div key={l.label} className="flex gap-[8px] items-center">
            <span className={`size-[10px] rounded-full shrink-0 ${l.dot}`} />
            <p className="font-normal leading-none text-[#131313] text-[16px] whitespace-nowrap">{l.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuestRow({ guest, action }: { guest: Guest; action?: React.ReactNode }) {
  const s = STATUS_STYLE[guest.status];
  return (
    <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full shrink-0 content-stretch flex flex-wrap gap-[12px] items-center justify-between p-[12px]">
      <div className="content-stretch flex gap-[12px] items-center flex-[1_0_0] min-w-[200px]">
        <img src={guest.avatar} alt="" className="size-[40px] rounded-[999px] object-cover shrink-0 border border-[#d9d9d9]" />
        <div className="content-stretch flex flex-col gap-[2px] items-start min-w-px">
          <div className="flex flex-wrap gap-[8px] items-center">
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{guest.name}</p>
            <div className={`rounded-[999px] border px-[8px] py-[2px] ${TICKET_STYLE[guest.ticketType]}`}>
              <p className="font-medium leading-none text-[12px] whitespace-nowrap">{guest.ticketType}</p>
            </div>
          </div>
          <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">{guest.email}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-wrap gap-[8px] items-center">
        {action}
        <div className={`rounded-[16px] border flex items-center justify-center px-[16px] py-[10px] ${s.className}`}>
          <p className="font-medium leading-none text-[16px] whitespace-nowrap">{s.label}</p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title, count, children,
}: { title: string; count: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
      <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full shrink-0 content-stretch flex gap-[12px] items-center justify-between p-[16px]">
        <div className="content-stretch flex gap-[12px] items-center flex-[1_0_0] min-w-px">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={`${open ? "Collapse" : "Expand"} ${title}`}
            className="bg-[#f7e9e9] border border-[#d8444b] flex items-center justify-center rounded-[999px] shrink-0 size-[40px] cursor-pointer"
          >
            <ChevronUp
              className={`size-[20px] transition-transform ${open ? "" : "rotate-180"}`}
              strokeWidth={1.5}
              color="#D8444B"
            />
          </button>
          <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">
            {title} ({count})
          </p>
        </div>
        <button type="button" aria-label={`Refresh ${title}`} className="flex items-center justify-center shrink-0 size-[40px] cursor-pointer">
          <RefreshCw className="size-[20px]" strokeWidth={1.5} color="#131313" />
        </button>
      </div>
      {open && children}
    </div>
  );
}

export function GuestCheckIn() {
  const { guests, setGuestStatus } = useEvent();
  const inGroup = (g: GuestGroup) => guests.filter((x) => x.group === g);

  const approval = inGroup("approval");
  const payment = inGroup("payment");
  const list = inGroup("list");

  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[868px] w-full">
        <div className="content-stretch flex flex-wrap gap-[12px] items-center justify-between w-full">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[24px]">Guest Check In</p>
          <button
            type="button"
            className="bg-[#d8444b] rounded-[16px] flex gap-[8px] items-center justify-center px-[24px] py-[12px] shrink-0 cursor-pointer"
          >
            <ScanFace className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
            <span className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Check In</span>
          </button>
        </div>

        <VisitorCounter />

        <Section title="Need Approval" count={approval.length}>
          {approval.map((g) => (
            <GuestRow
              key={g.id}
              guest={g}
              action={
                <button
                  type="button"
                  className="bg-[#e4e4e4] rounded-[16px] flex gap-[8px] items-center justify-center px-[16px] py-[10px] cursor-pointer"
                >
                  <FileText className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
                  <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">View Detail</span>
                </button>
              }
            />
          ))}
        </Section>

        <Section title="Payment Confirmation" count={payment.length}>
          {payment.map((g) => (
            <GuestRow
              key={g.id}
              guest={g}
              action={
                <button
                  type="button"
                  onClick={() => setGuestStatus(g.id, "confirmed", "list")}
                  className="bg-[#e4e4e4] rounded-[16px] flex gap-[8px] items-center justify-center px-[16px] py-[10px] cursor-pointer"
                >
                  <CircleCheckBig className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
                  <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Confirm Payment</span>
                </button>
              }
            />
          ))}
        </Section>

        <Section title="Guest List" count={list.length}>
          {list.map((g) => (
            <GuestRow key={g.id} guest={g} />
          ))}
        </Section>
      </div>
    </div>
  );
}
