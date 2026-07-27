import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ScanLine, CircleAlert, Camera, CameraOff, Settings, Search, ListFilter, FileText, CircleCheckBig } from "lucide-react";
import svgPaths from "../../imports/Desktop/svg-p6j7kxcoso";
import { useEvent } from "./event-context";
import type { Guest } from "./guests-data";
import { Toggle } from "./primitives";
import { VisitorCounter, STATUS_STYLE, TICKET_STYLE } from "./guest-check-in";

/* Live camera preview. The stream is only requested when the operator presses
   the button, and every track is stopped on release so the camera light goes
   out — including when navigating away from the page. */
function ScannerViewport() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Mirrored in a ref: React skips state updaters once a component has
  // unmounted, so unmount cleanup must reach the tracks without setState.
  const streamRef = useRef<MediaStream | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStream(null);
  }, []);

  const start = async () => {
    setError(null);
    setStarting(true);
    try {
      // Rear camera where there is one — this is a scanner.
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = s;
      setStream(s);
    } catch (e) {
      const name = e instanceof DOMException ? e.name : "";
      setError(
        name === "NotAllowedError"
          ? "Camera access was blocked. Allow it in your browser to scan tickets."
          : name === "NotFoundError"
            ? "No camera found on this device."
            : "Couldn't start the camera.",
      );
    } finally {
      setStarting(false);
    }
  };

  // Attach the stream once the <video> is mounted.
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  // Release the camera when this screen goes away. Reads the ref directly so it
  // still runs after unmount.
  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    },
    [],
  );

  const on = stream !== null;

  return (
    <div className="bg-[#fbfbfb] border border-[#d9d9d9] rounded-[16px] w-full shrink-0 content-stretch flex flex-col gap-[12px] items-start p-[12px]">
      <div
        className={`rounded-[12px] w-full aspect-[3/4] tablet:aspect-[16/9] shrink-0 relative overflow-hidden flex items-center justify-center ${
          on ? "bg-[#131313]" : "bg-[#f7e9e9] border border-[#d8444b]"
        }`}
      >
        {on ? (
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 size-full object-cover" />
        ) : (
          /* stroke-[0.8] on lucide's 24-unit viewBox renders as a 4px line at 120px. */
          <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[16px]">
            <CameraOff className="size-[120px] shrink-0 stroke-[0.8]" color="#D8444B" />
            {error && (
              <p className="font-medium leading-[1.3] text-[#d8444b] text-[16px] text-center max-w-[320px]">{error}</p>
            )}
          </div>
        )}
      </div>
      <div className="content-stretch flex flex-wrap gap-[8px] items-center justify-between w-full">
        <div className="flex gap-[8px] items-center">
          <button
            type="button"
            onClick={on ? stop : start}
            disabled={starting}
            aria-pressed={on}
            aria-label={on ? "Turn camera off" : "Turn camera on"}
            className={`flex items-center justify-center rounded-[999px] shrink-0 size-[40px] cursor-pointer ${
              on ? "bg-[#e4e4e4]" : "bg-[#d8444b]"
            } ${starting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {on ? (
              <Camera className="size-[20px]" strokeWidth={1.5} color="#131313" />
            ) : (
              <CameraOff className="size-[20px]" strokeWidth={1.5} color="#FBFBFB" />
            )}
          </button>
          <button
            type="button"
            aria-label="Scanner settings"
            className="bg-[#e4e4e4] flex items-center justify-center rounded-[999px] shrink-0 size-[40px] cursor-pointer"
          >
            <Settings className="size-[20px]" strokeWidth={1.5} color="#131313" />
          </button>
        </div>
        <div className="flex gap-[8px] items-center shrink-0">
          <p className="font-normal leading-none text-[#9e9e9e] text-[14px] whitespace-nowrap">Scanner by</p>
          <div className="flex gap-[4px] items-center">
            <div className="h-[20px] relative shrink-0 w-[20.002px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.0039 40">
                <path clipRule="evenodd" d={svgPaths.p1c3cb240} fill="#D8444B" fillRule="evenodd" />
              </svg>
            </div>
            <div className="h-[13px] relative shrink-0 w-[60px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97.6553 21.1768">
                <path d={svgPaths.p10f644a0} fill="#131313" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuestRow({ guest, onConfirm }: { guest: Guest; onConfirm: () => void }) {
  const s = STATUS_STYLE[guest.status];
  const action =
    guest.group === "approval" ? (
      <button
        type="button"
        className="bg-[#e4e4e4] rounded-[16px] w-full tablet:w-auto flex gap-[8px] items-center justify-center px-[16px] py-[10px] cursor-pointer"
      >
        <FileText className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
        <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">View Detail</span>
      </button>
    ) : guest.group === "payment" ? (
      <button
        type="button"
        onClick={onConfirm}
        className="bg-[#e4e4e4] rounded-[16px] w-full tablet:w-auto flex gap-[8px] items-center justify-center px-[16px] py-[10px] cursor-pointer"
      >
        <CircleCheckBig className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
        <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Confirm Payment</span>
      </button>
    ) : null;

  return (
    <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full shrink-0 content-stretch flex flex-col tablet:flex-row gap-[8px] tablet:gap-[12px] tablet:items-center p-[12px]">
      <div className="content-stretch flex gap-[12px] items-center flex-[1_0_0] min-w-px">
        <img src={guest.avatar} alt="" className="size-[40px] rounded-[999px] object-cover shrink-0 border border-[#d9d9d9]" />
        <div className="content-stretch flex flex-col gap-[2px] items-start min-w-px">
          <div className="flex flex-wrap gap-[8px] items-center">
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{guest.name}</p>
            <div className={`rounded-[999px] border px-[8px] py-[2px] ${TICKET_STYLE[guest.ticketType]}`}>
              <p className="font-medium leading-none text-[12px] whitespace-nowrap">{guest.ticketType}</p>
            </div>
          </div>
          <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] truncate">{guest.email}</p>
        </div>
      </div>
      {/* Actions sit inline from tablet up; full width beneath on phones. */}
      <div className="content-stretch flex flex-col tablet:flex-row gap-[8px] tablet:items-center w-full tablet:w-auto shrink-0">
        {action}
        <div className={`rounded-[16px] border flex items-center justify-center px-[16px] py-[10px] w-full tablet:w-auto ${s.className}`}>
          <p className="font-medium leading-none text-[16px] whitespace-nowrap">{s.label}</p>
        </div>
      </div>
    </div>
  );
}

export function GuestCheckScan() {
  const { guests, setGuestStatus, closeCheckIn } = useEvent();
  const [query, setQuery] = useState("");
  const [autoCheckIn, setAutoCheckIn] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return guests;
    return guests.filter((g) => g.name.toLowerCase().includes(q) || g.email.toLowerCase().includes(q));
  }, [guests, query]);

  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[24px]">
      <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[1440px] w-full">
        {/* Header */}
        <div className="content-stretch flex flex-col tablet:flex-row gap-[12px] tablet:items-center tablet:justify-between w-full">
          <div className="content-stretch flex gap-[12px] items-center">
            <button
              type="button"
              onClick={closeCheckIn}
              aria-label="Back"
              className="bg-[#e4e4e4] flex items-center justify-center rounded-[999px] shrink-0 size-[40px] cursor-pointer"
            >
              <ChevronLeft className="size-[20px]" strokeWidth={1.5} color="#131313" />
            </button>
            <p className="font-semibold leading-[1.2] text-[#131313] text-[28px]">Guest Check</p>
          </div>
          <div className="bg-[#fbfbfb] border border-[#d9d9d9] rounded-[16px] shrink-0 content-stretch flex gap-[12px] items-center justify-between px-[16px] py-[12px]">
            <div className="flex gap-[8px] items-center">
              <ScanLine className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
              <p className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Auto Check In</p>
              <CircleAlert className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
            </div>
            <Toggle on={autoCheckIn} onChange={setAutoCheckIn} labelOn="On" labelOff="Off" />
          </div>
        </div>

        <ScannerViewport />
        <VisitorCounter />

        {/* Search + filter */}
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
            aria-label="Filter"
            className="bg-[#e4e4e4] flex items-center justify-center rounded-[999px] shrink-0 size-[56px] cursor-pointer"
          >
            <ListFilter className="size-[20px]" strokeWidth={1.5} color="#131313" />
          </button>
        </div>

        {/* Guests */}
        {rows.length === 0 ? (
          <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px]">No guests match that search.</p>
        ) : (
          <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
            {rows.map((g) => (
              <GuestRow key={g.id} guest={g} onConfirm={() => setGuestStatus(g.id, "confirmed", "list")} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
