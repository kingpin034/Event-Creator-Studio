import { useMemo, useState } from "react";
import { Upload, Search, ArrowUpDown, ListFilter, ExternalLink, SquarePen } from "lucide-react";
import { useEvent } from "./event-context";
import { GuestDataModal } from "./guest-data-modal";

const COLUMNS = ["Email", "Phone Number", "Name", "Ticket Type"] as const;

export function GuestData() {
  const { guestRecords } = useEvent();
  const [selection, setSelection] = useState<{ id: string; mode: "view" | "edit" } | null>(null);
  const [notice, setNotice] = useState("");
  const selectedGuest = guestRecords.find((guest) => guest.id === selection?.id);
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? guestRecords.filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            r.phone.includes(q) ||
            r.ticketType.toLowerCase().includes(q),
        )
      : guestRecords;
    return [...filtered].sort((a, b) => (asc ? 1 : -1) * a.name.localeCompare(b.name));
  }, [query, asc, guestRecords]);

  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[868px] w-full">
        <div className="content-stretch flex flex-wrap gap-[12px] items-center justify-between w-full">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[24px]">Guest Data</p>
          <button
            type="button"
            className="bg-[#e4e4e4] rounded-[16px] flex gap-[8px] items-center justify-center px-[24px] py-[12px] shrink-0 cursor-pointer"
          >
            <Upload className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
            <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Export Data</span>
          </button>
        </div>

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

        {notice && <p role="status" className="text-[14px] text-[#414141]">{notice}</p>}

        {/* Table — wider than the column, so it scrolls sideways. */}
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
                  <th scope="col"><span className="sr-only">View details</span></th>
                  <th scope="col"><span className="sr-only">Edit data</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={COLUMNS.length + 2} className="px-[16px] py-[24px]">
                      <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px]">No guests match that search.</p>
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="odd:bg-[#fbfbfb] even:bg-[#f4f4f4] border-t border-[#d9d9d9]">
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[16px]">{r.email}</td>
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[16px]">{r.phone}</td>
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[16px]">{r.name}</td>
                      <td className="font-normal leading-[1.3] text-[#131313] text-[16px] whitespace-nowrap px-[16px] py-[16px]">{r.ticketType}</td>
                      <td className="px-[12px] py-[12px]"><button type="button" aria-label={`View ${r.name}`} onClick={() => setSelection({ id: r.id, mode: "view" })} className="bg-[#e4e4e4] rounded-[12px] px-[12px] py-[10px] flex items-center gap-[4px] whitespace-nowrap text-[14px] cursor-pointer">View<ExternalLink className="size-[18px]" strokeWidth={1.5} /></button></td>
                      <td className="px-[12px] py-[12px]"><button type="button" aria-label={`Edit data for ${r.name}`} onClick={() => setSelection({ id: r.id, mode: "edit" })} className="bg-[#e4e4e4] rounded-[12px] px-[12px] py-[10px] flex items-center gap-[4px] whitespace-nowrap text-[14px] cursor-pointer">Edit Data<SquarePen className="size-[18px]" strokeWidth={1.5} /></button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedGuest && selection && <GuestDataModal key={`${selectedGuest.id}-${selection.mode}`} guest={selectedGuest} mode={selection.mode} onClose={() => setSelection(null)} onSaved={(message) => { setNotice(message); setSelection(null); }} />}
    </div>
  );
}
