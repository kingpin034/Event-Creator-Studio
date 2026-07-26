import { useEffect, useMemo, useRef, useState } from "react";
import { BookUser, X, Search } from "lucide-react";
import { HOST_DIRECTORY, useEvent } from "./event-context";
import type { Person } from "./event-context";
import { DashedSeparator, EmptyState } from "./primitives";

export function FindCoHostModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { hosts, addHost } = useEvent();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset the search and focus the field each time the modal opens.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  // Close on Escape, matching the overlay click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return HOST_DIRECTORY.filter(
      (p) => p.name.toLowerCase().includes(q) && !hosts.some((h) => h.id === p.id),
    );
  }, [query, hosts]);

  if (!open) return null;

  const searching = query.trim().length > 0;

  const select = (p: Person) => {
    addHost(p);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(19,19,19,0.3)] flex items-center justify-center p-[16px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Find Co-Host"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fbfbfb] rounded-[16px] w-[520px] max-w-full max-h-full overflow-hidden border border-[#d9d9d9] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative"
      >
        {/* Header */}
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
            <div className="content-stretch flex gap-[4px] items-center">
              <BookUser className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">Find Co-Host</p>
            </div>
            <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] w-full">Search your event collaborator</p>
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

        {/* Search field */}
        <div className="bg-[#f4f4f4] border border-[#d9d9d9] focus-within:border-[#d8444b] rounded-[16px] w-full shrink-0 content-stretch flex gap-[8px] items-center px-[16px] py-[18px]">
          <Search className="size-[20px] shrink-0" strokeWidth={1.5} color="#9E9E9E" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search host"
            className="bg-transparent outline-none font-medium text-[#131313] text-[16px] placeholder:text-[#9e9e9e] flex-1 min-w-px"
          />
        </div>

        {/* Body: idle / results / not found */}
        {!searching ? (
          <EmptyState
            src="/illustrations/co-host-idle.png"
            caption="Search your event co-host"
          />
        ) : results.length > 0 ? (
          <div className="content-stretch flex flex-col gap-[8px] items-start w-full overflow-y-auto max-h-[320px]">
            {results.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => select(p)}
                className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full shrink-0 content-stretch flex gap-[8px] items-center p-[12px] cursor-pointer text-left hover:border-[#d8444b]"
              >
                <div className="rounded-[999px] shrink-0 size-[40px] border border-[#d9d9d9] overflow-hidden">
                  <img alt="" className="size-full object-cover" src={p.avatar} />
                </div>
                <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] flex-[1_0_0] min-w-px">{p.name}</p>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState
            src="/illustrations/co-host-not-found.png"
            caption="Host not found"
          />
        )}
      </div>
    </div>
  );
}
