import { useMemo, useState } from "react";
import { Upload, CreditCard, Search, ArrowUpDown, ListFilter, Plus } from "lucide-react";
import { useEvent } from "./event-context";
import type { Ticket } from "./event-context";
import { CreateTicketModal } from "./create-ticket-modal";

type TxStatus = "Paid" | "Ongoing" | "Canceled";

const STATUS_STYLE: Record<TxStatus, string> = {
  Paid: "bg-[#e9f7ee] border-[#1a9c4b] text-[#1a9c4b]",
  Ongoing: "bg-[#fef6e7] border-[#e0a33a] text-[#b97e12]",
  Canceled: "bg-[#f7e9e9] border-[#d8444b] text-[#d8444b]",
};

/* No sales data exists in the prototype, so "sold" stays mocked per tier and is
   clamped to whatever capacity the ticket actually has. Everything else —
   the tier list, names, capacities, prices and totals — comes from the tickets
   configured in Ticket & Registration. */
const SOLD_SEED = [100, 50, 70];

function rupiah(n: number) {
  return `Rp${n.toLocaleString("id-ID")}`;
}

const TX_NAMES = [
  "Rizky Pratama", "Nina Kartika", "Lara Whitfield", "Budi Santoso", "Ayu Lestari",
  "Dimas Prakoso", "Rina Amelia", "Sari Wulandari", "Andi Nugroho", "Maya Anggraini",
  "Fajar Ramadhan", "Citra Dewi", "Bagus Setiawan", "Putri Handayani", "Yoga Saputra",
  "Intan Permata", "Rio Firmansyah", "Dewi Lestari",
];
const CYCLE: TxStatus[] = ["Paid", "Ongoing", "Canceled"];

const TRANSACTIONS = TX_NAMES.map((name, i) => ({
  id: `tx${i + 1}`,
  status: CYCLE[i % CYCLE.length],
  date: "28 Aug 2025, 16:56",
  name,
  phone: `09836240${String(2800 + i)}`,
  ticketType: i % 2 === 0 ? "Regular" : "Early Bird",
  amount: "Rp20.000",
}));

/* Donut showing how much of a tier has sold. */
function ProgressRing({ percent }: { percent: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0 size-[56px]">
      <svg className="size-full -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#e4e4e4" strokeWidth="5" />
        <circle
          cx="28" cy="28" r={r}
          fill="none" stroke="#d8444b" strokeWidth="5" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - percent / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-semibold text-[#131313] text-[12px]">
        {percent}%
      </span>
    </div>
  );
}

function SummaryCard({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    /* 1_1_ not 1_0_: the basis sets the wrap point, but the card must still be
       able to shrink below it on narrow screens instead of overflowing. */
    <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] flex-[1_1_360px] min-w-0 content-stretch flex flex-col gap-[4px] items-start p-[16px]">
      <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px]">{label}</p>
      {/* "Rp18.000.000/Rp18.000.000" has no space to break at, so <wbr/> offers
          the one sensible break point: it stays on one line where it fits and
          drops the /total to a second line only when it has to. */}
      <p className="font-semibold leading-[1.2] text-[#131313] text-[28px] w-full">
        {value}
        <wbr />
        <span className="font-normal text-[#9e9e9e] text-[16px]">/{suffix}</span>
      </p>
    </div>
  );
}

function TierCard({
  name, sold, capacity, onEdit,
}: { name: string; sold: number; capacity: number; onEdit: () => void }) {
  const percent = capacity > 0 ? Math.round((sold / capacity) * 100) : 0;
  const left = Math.max(0, capacity - sold);
  return (
    <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] flex-[1_1_240px] min-w-0 content-stretch flex gap-[12px] items-center p-[16px]">
      <ProgressRing percent={percent} />
      <div className="content-stretch flex flex-col gap-[2px] items-start flex-[1_0_0] min-w-px">
        <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px]">{name}</p>
        <p className="font-semibold leading-[1.2] text-[#131313] text-[24px]">
          {sold}
          <span className="font-normal text-[#9e9e9e] text-[16px]">/{capacity}</span>
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-end justify-between self-stretch shrink-0">
        <p className={`font-medium leading-none text-[14px] whitespace-nowrap ${left === 0 ? "text-[#d8444b]" : "text-[#131313]"}`}>
          {left === 0 ? "Sold out" : `${left} left`}
        </p>
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${name} capacity`}
          className="bg-[#e4e4e4] border border-[#d9d9d9] flex items-center justify-center rounded-[999px] shrink-0 size-[32px] cursor-pointer"
        >
          <Plus className="size-[20px]" strokeWidth={1.5} color="#131313" />
        </button>
      </div>
    </div>
  );
}

const COLUMNS = ["Status", "Transaction Date", "Name", "Phone Number", "Ticket Type", "Amount"] as const;

export function TicketTransaction() {
  const { tickets, updateTicket, openWithdraw } = useEvent();
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);
  const [editing, setEditing] = useState<Ticket | null>(null);

  // One card per ticket configured in Ticket & Registration.
  const tiers = tickets.map((t, i) => ({
    ticket: t,
    sold: Math.min(SOLD_SEED[i] ?? 0, t.capacity),
  }));
  const totalCapacity = tickets.reduce((s, t) => s + t.capacity, 0);
  const totalSold = tiers.reduce((s, t) => s + t.sold, 0);
  const revenue = tiers.reduce((s, t) => s + (t.ticket.paid ? t.sold * t.ticket.price : 0), 0);
  const revenueTarget = tickets.reduce((s, t) => s + (t.paid ? t.capacity * t.price : 0), 0);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? TRANSACTIONS.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.phone.includes(q) ||
            t.ticketType.toLowerCase().includes(q) ||
            t.status.toLowerCase().includes(q),
        )
      : TRANSACTIONS;
    return [...filtered].sort((a, b) => (asc ? 1 : -1) * a.name.localeCompare(b.name));
  }, [query, asc]);

  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[868px] w-full">
        <div className="content-stretch flex flex-wrap gap-[12px] items-center justify-between w-full">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[24px]">Ticket Transaction</p>
          <div className="flex flex-wrap gap-[8px] items-center">
            <button
              type="button"
              className="bg-[#e4e4e4] rounded-[16px] flex gap-[8px] items-center justify-center px-[24px] py-[12px] shrink-0 cursor-pointer"
            >
              <Upload className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
              <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Export Data</span>
            </button>
            <button
              type="button"
              onClick={openWithdraw}
              className="bg-[#d8444b] rounded-[16px] flex gap-[8px] items-center justify-center px-[24px] py-[12px] shrink-0 cursor-pointer"
            >
              <CreditCard className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
              <span className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Withdraw</span>
            </button>
          </div>
        </div>

        {/* One section: totals wrap two-up (360px basis), tiers three-up (240px). */}
        <div className="content-stretch flex flex-wrap gap-[8px] items-stretch w-full">
          <SummaryCard label="Total Tickets Sold" value={String(totalSold)} suffix={String(totalCapacity)} />
          <SummaryCard label="Total Revenue" value={rupiah(revenue)} suffix={rupiah(revenueTarget)} />
          {tiers.map(({ ticket, sold }) => (
            <TierCard
              key={ticket.id}
              name={ticket.name}
              sold={sold}
              capacity={ticket.capacity}
              onEdit={() => setEditing(ticket)}
            />
          ))}
        </div>

        {/* Edit the ticket without leaving this page. */}
        <CreateTicketModal
          open={editing !== null}
          initial={editing}
          onClose={() => setEditing(null)}
          onSubmit={(draft) => {
            if (editing) updateTicket(editing.id, draft);
            setEditing(null);
          }}
        />

        {/* Search + sort + filter */}
        <div className="content-stretch flex gap-[12px] items-center w-full">
          <div className="bg-[#f4f4f4] border border-[#d9d9d9] focus-within:border-[#d8444b] rounded-[16px] flex-[1_0_0] min-w-px content-stretch flex gap-[8px] items-center px-[16px] py-[16px]">
            <Search className="size-[20px] shrink-0" strokeWidth={1.5} color="#9E9E9E" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none flex-1 min-w-px font-normal leading-none text-[#131313] text-[16px] placeholder:text-[#9e9e9e]"
            />
          </div>
          <button
            type="button"
            onClick={() => setAsc((v) => !v)}
            aria-label={`Sort by name ${asc ? "descending" : "ascending"}`}
            className="bg-[#e4e4e4] flex items-center justify-center rounded-[999px] shrink-0 size-[56px] cursor-pointer"
          >
            <ArrowUpDown className="size-[20px]" strokeWidth={1.5} color="#131313" />
          </button>
          <button
            type="button"
            aria-label="Filter"
            className="bg-[#e4e4e4] flex items-center justify-center rounded-[999px] shrink-0 size-[56px] cursor-pointer"
          >
            <ListFilter className="size-[20px]" strokeWidth={1.5} color="#131313" />
          </button>
        </div>

        {/* Table */}
        <div className="border border-[#d9d9d9] rounded-[16px] w-full overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="border-collapse w-full">
              <thead>
                <tr className="bg-[#e4e4e4]">
                  {COLUMNS.map((c) => (
                    <th
                      key={c}
                      className="font-semibold leading-none text-[#131313] text-[16px] text-left whitespace-nowrap px-[16px] py-[16px]"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={COLUMNS.length} className="px-[16px] py-[24px]">
                      <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px]">No transactions match that search.</p>
                    </td>
                  </tr>
                ) : (
                  rows.map((t) => (
                    <tr key={t.id} className="bg-[#fbfbfb] border-t border-[#d9d9d9]">
                      <td className="px-[16px] py-[12px]">
                        <div className={`rounded-[16px] border flex items-center justify-center px-[16px] py-[8px] ${STATUS_STYLE[t.status]}`}>
                          <p className="font-medium leading-none text-[16px] whitespace-nowrap">{t.status}</p>
                        </div>
                      </td>
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[12px]">{t.date}</td>
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[12px]">{t.name}</td>
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[12px]">{t.phone}</td>
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[12px]">{t.ticketType}</td>
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[12px]">{t.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
