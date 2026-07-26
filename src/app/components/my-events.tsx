import { useState } from "react";
import {
  CalendarCheck, History, PencilRuler, ArrowUpRight, ArrowLeft, Copy, CalendarPlus, Share2,
  CalendarDays, MapPin, BookUser, ChevronRight, Trash2, Ticket, Globe, MonitorCheck, Users,
} from "lucide-react";
import { isPast, daysUntil } from "./my-events-data";
import type { MyEvent, EventStatus } from "./my-events-data";
import { useEvent } from "./event-context";

/* Cover art falls back to a neutral block when the export is missing, so the
   layout still reads correctly before the assets land. */
function Cover({ src, alt, className = "" }: { src: string | null; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={`bg-[#f4f4f4] border border-[#d9d9d9] ${className}`} />;
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

const STATUS_STYLE: Record<EventStatus, { label: string; className: string; Icon: typeof PencilRuler }> = {
  draft: { label: "Draft", className: "bg-[#eef2ff] border-[#2563eb] text-[#2563eb]", Icon: PencilRuler },
  published: { label: "Published", className: "bg-[#e9f7ee] border-[#1a9c4b] text-[#1a9c4b]", Icon: Globe },
  ended: { label: "Ended", className: "bg-[#f4f4f4] border-[#9e9e9e] text-[#9e9e9e]", Icon: History },
};

function StatusBadge({ status }: { status: EventStatus }) {
  const { label, className, Icon } = STATUS_STYLE[status];
  return (
    <div className={`flex gap-[8px] items-center justify-center px-[16px] py-[10px] rounded-[16px] border ${className}`}>
      <Icon className="size-[20px] shrink-0" strokeWidth={1.5} />
      <p className="font-medium leading-none text-[16px] whitespace-nowrap">{label}</p>
    </div>
  );
}

/* ---------- List ---------- */

function FilterPills({ value, onChange }: { value: "upcoming" | "past"; onChange: (v: "upcoming" | "past") => void }) {
  const pill = (active: boolean) =>
    `flex gap-[8px] items-center justify-center px-[24px] py-[10px] rounded-[16px] cursor-pointer ${
      active ? "bg-[#f7e9e9] border border-[#d8444b]" : ""
    }`;
  return (
    <div className="bg-[#fbfbfb] flex items-center rounded-[16px] shrink-0 border border-[#d9d9d9]">
      <button type="button" onClick={() => onChange("upcoming")} className={pill(value === "upcoming")}>
        <CalendarCheck className="size-[20px]" strokeWidth={1.5} color={value === "upcoming" ? "#D8444B" : "#131313"} />
        <span className={`font-medium leading-none text-[16px] whitespace-nowrap ${value === "upcoming" ? "text-[#d8444b]" : "text-[#131313]"}`}>
          Upcoming
        </span>
      </button>
      <button type="button" onClick={() => onChange("past")} className={pill(value === "past")}>
        <History className="size-[20px]" strokeWidth={1.5} color={value === "past" ? "#D8444B" : "#131313"} />
        <span className={`font-medium leading-none text-[16px] whitespace-nowrap ${value === "past" ? "text-[#d8444b]" : "text-[#131313]"}`}>
          Past
        </span>
      </button>
    </div>
  );
}

function EventListCard({
  event, selected, onOpen, onManage,
}: { event: MyEvent; selected: boolean; onOpen: () => void; onManage: () => void }) {
  return (
    <div className={`bg-[#fbfbfb] rounded-[16px] w-full border ${selected ? "border-[#d8444b]" : "border-[#d9d9d9]"}`}>
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] w-full">
        {/* Card body opens the detail view; the arrow buttons go to Manage Event. */}
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
          className="content-stretch flex flex-col laptop:flex-row gap-[12px] items-start w-full cursor-pointer text-left"
        >
          {/* Fixed thumbnail — 126×158 keeps the 4:5 ratio of the Image Cover. */}
          <Cover
            src={event.cover}
            alt={event.title}
            className="rounded-[12px] w-[126px] h-[158px] laptop:w-[124px] laptop:h-[160px] shrink-0"
          />
          <div className="content-stretch flex flex-col gap-[8px] items-start flex-[1_0_0] min-w-px">
            <p className="font-normal leading-[1.3] text-[#414141] text-[14px]">{event.cardDate}</p>
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{event.title}</p>
            <div className="content-stretch flex flex-col gap-[6px] items-start">
              <div className="flex gap-[8px] items-center">
                <MapPin className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
                <p className="font-normal leading-none text-[#414141] text-[16px]">{event.venue}</p>
              </div>
              <div className="flex gap-[8px] items-center">
                <Ticket className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
                <p className="font-normal leading-none text-[#414141] text-[16px]">{event.price}</p>
              </div>
              <div className="flex gap-[8px] items-center">
                <img src={event.hosts[0].avatar} alt="" className="size-[20px] rounded-[999px] object-cover shrink-0" />
                <p className="font-normal leading-none text-[#414141] text-[16px]">{event.organizer}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Dashed rule above the actions */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-0.5px_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 488 1">
              <path d="M0 0.5H488" stroke="#9E9E9E" strokeDasharray="5 3" />
            </svg>
          </div>
        </div>
        {/* Published events swap Event Settings for Check In + Manage. */}
        <div className="content-stretch flex flex-wrap gap-[8px] items-center justify-between w-full">
          <StatusBadge status={event.status} />
          <div className="flex flex-wrap gap-[8px] items-center">
            {event.status === "published" && (
              <button
                type="button"
                className="bg-[#d8444b] flex gap-[8px] items-center justify-center px-[24px] py-[10px] rounded-[16px] cursor-pointer"
              >
                <MonitorCheck className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
                <span className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Check In</span>
              </button>
            )}
            <button
              type="button"
              onClick={onManage}
              className="bg-[#e4e4e4] flex gap-[8px] items-center justify-center px-[24px] py-[10px] rounded-[16px] cursor-pointer"
            >
              <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">
                {event.status === "published" ? "Manage" : "Event Settings"}
              </span>
              <ArrowUpRight className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventList({
  filter, onFilter, events, selectedId, onOpen, onManage,
}: {
  filter: "upcoming" | "past";
  onFilter: (v: "upcoming" | "past") => void;
  events: MyEvent[];
  selectedId: string | null;
  onOpen: (e: MyEvent) => void;
  onManage: (e: MyEvent) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
      <div className="content-stretch flex flex-wrap gap-[12px] items-center justify-between w-full">
        <p className="font-semibold leading-[1.2] text-[#131313] text-[28px]">My Events</p>
        <FilterPills value={filter} onChange={onFilter} />
      </div>

      {events.length === 0 ? (
        <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px]">
          {filter === "past" ? "No past events yet." : "No upcoming events yet."}
        </p>
      ) : (
        <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
          {events.map((e) => (
            <div key={e.id} className="content-stretch flex gap-[12px] items-stretch w-full">
              {/* Timeline rail */}
              <div className="flex flex-col items-center shrink-0 w-[16px] pt-[4px]">
                <div className="size-[12px] rounded-full bg-[#d8444b] shrink-0" />
                <div className="flex-1 w-0 border-l-[1.5px] border-dashed border-[#d8444b] my-[4px]" />
              </div>
              <div className="content-stretch flex flex-col gap-[12px] items-start flex-[1_0_0] min-w-px">
                <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{e.dayLabel}</p>
                <EventListCard
                  event={e}
                  selected={e.id === selectedId}
                  onOpen={() => onOpen(e)}
                  onManage={() => onManage(e)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Detail ---------- */

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f7e9e9] rounded-[12px] shrink-0 flex items-center justify-center size-[40px] [&>svg]:size-[20px]">
      {children}
    </div>
  );
}

function EventDetail({ event, onBack }: { event: MyEvent; onBack: () => void }) {
  const d = 0.0035;
  const bbox = [event.lon - d, event.lat - d / 2, event.lon + d, event.lat + d / 2].join(",");
  return (
    <div
      className={`content-stretch flex flex-col gap-[16px] items-start w-full ${
        // Clear the pinned check-in bar in the separated view.
        event.status !== "draft" ? "pb-[200px] laptop:pb-0" : ""
      }`}
    >
      {/* Mobile-only way back to the list */}
      <button
        type="button"
        onClick={onBack}
        className="laptop:hidden bg-[#e4e4e4] border border-[#d9d9d9] flex gap-[8px] items-center px-[16px] py-[10px] rounded-[999px] shrink-0 cursor-pointer"
      >
        <ArrowLeft className="size-[20px]" strokeWidth={1.5} color="#131313" />
        <span className="font-medium leading-none text-[#131313] text-[16px]">My Events</span>
      </button>

      {/* Gallery */}
      <div className="flex gap-[8px] items-center overflow-x-auto w-full">
        {event.gallery.map((src, i) => (
          <Cover key={i} src={src} alt="" className="rounded-[16px] h-[280px] w-[220px] shrink-0" />
        ))}
      </div>

      <p className="font-semibold leading-[1.2] text-[#131313] text-[28px] laptop:text-[36px]">{event.title}</p>

      <button
        type="button"
        className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[12px] flex gap-[8px] items-center px-[12px] py-[8px] shrink-0 cursor-pointer max-w-full"
      >
        <span className="font-normal leading-none text-[#131313] text-[16px] truncate">{event.slug}</span>
        <Copy className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
      </button>

      {/* Side-by-side: the check-in bar sits inline here. Separated view pins it
          to the bottom of the screen instead (rendered at the end). */}
      {event.status !== "draft" && (
        <div className="hidden laptop:block w-full">
          <CheckInBar event={event} />
        </div>
      )}

      {/* Welcome message */}
      <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
        <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{event.welcomeTitle}</p>
        {event.welcomeBody.map((p, i) => (
          <p key={i} className="font-normal leading-[1.5] text-[#414141] text-[16px]">{p}</p>
        ))}
      </div>

      {/* Published events show the attendee count above the share actions. */}
      {event.status !== "draft" && (
        <button type="button" className="bg-[#e4e4e4] rounded-[16px] w-full flex gap-[8px] items-center justify-center px-[24px] py-[16px] cursor-pointer">
          <Users className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
          <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">{event.going} Going</span>
        </button>
      )}

      <div className="content-stretch flex flex-col phone:flex-row gap-[8px] items-stretch w-full">
        <button type="button" className="bg-[#e4e4e4] rounded-[16px] flex-[1_0_0] flex gap-[8px] items-center justify-center px-[24px] py-[16px] cursor-pointer">
          <CalendarPlus className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
          <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Add to Calendar</span>
        </button>
        <button type="button" className="bg-[#e4e4e4] rounded-[16px] flex-[1_0_0] flex gap-[8px] items-center justify-center px-[24px] py-[16px] cursor-pointer">
          <Share2 className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
          <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Share Event</span>
        </button>
      </div>

      <div className="h-px w-full bg-[#d9d9d9]" />

      <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
        <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">About Event</p>
        <p className="font-normal leading-[1.5] text-[#414141] text-[16px]">{event.about}</p>
      </div>

      <div className="h-px w-full bg-[#d9d9d9]" />

      {/* When */}
      <div className="content-stretch flex gap-[12px] items-start w-full">
        <IconTile><CalendarDays strokeWidth={1.5} color="#D8444B" /></IconTile>
        <div className="content-stretch flex flex-col gap-[2px] items-start flex-[1_0_0] min-w-px">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{event.detailDate}</p>
          <p className="font-normal leading-[1.3] text-[#414141] text-[16px]">{event.timeRange}</p>
        </div>
      </div>

      {/* Where */}
      <div className="content-stretch flex gap-[12px] items-start w-full">
        <IconTile><MapPin strokeWidth={1.5} color="#D8444B" /></IconTile>
        <div className="content-stretch flex flex-col gap-[8px] items-start flex-[1_0_0] min-w-px">
          <div className="flex flex-wrap gap-[8px] items-center">
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{event.venue}</p>
            <div className="bg-[#f7e9e9] rounded-[999px] px-[12px] py-[4px]">
              <p className="font-medium leading-none text-[#d8444b] text-[12px] whitespace-nowrap">{event.venueTag}</p>
            </div>
          </div>
          <p className="font-normal leading-[1.3] text-[#414141] text-[16px]">{event.address}</p>
          <div className="bg-[#f4f4f4] border border-[#d9d9d9] h-[238px] relative rounded-[16px] w-full overflow-hidden">
            <iframe
              title={`Map showing ${event.venue}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${event.lat},${event.lon}`}
              loading="lazy"
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>
      </div>

      {/* Organiser */}
      <div className="content-stretch flex gap-[12px] items-start w-full">
        <IconTile><BookUser strokeWidth={1.5} color="#D8444B" /></IconTile>
        <div className="content-stretch flex flex-col gap-[8px] items-start flex-[1_0_0] min-w-px">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">Organized by</p>
          {event.hosts.map((h) => (
            <button
              key={h.name}
              type="button"
              className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full flex gap-[8px] items-center p-[12px] cursor-pointer"
            >
              <img src={h.avatar} alt="" className="size-[40px] rounded-[999px] object-cover shrink-0 border border-[#d9d9d9]" />
              <p className="font-medium leading-none text-[#131313] text-[16px] flex-[1_0_0] min-w-px text-left">{h.name}</p>
              <ChevronRight className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
            </button>
          ))}
        </div>
      </div>

      {event.status === "draft" && (
        <>
          <div className="h-px w-full bg-[#d9d9d9]" />
          <button
            type="button"
            className="bg-[#f42d2d] rounded-[16px] w-full flex gap-[8px] items-center justify-center px-[32px] py-[18px] cursor-pointer"
          >
            <Trash2 className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
            <span className="font-medium leading-none text-[#fbfbfb] text-[16px]">Delete Draft</span>
          </button>
        </>
      )}

      {/* Separated view only: pinned to the bottom of the viewport. */}
      {event.status !== "draft" && (
        <div className="laptop:hidden fixed inset-x-0 bottom-0 z-40 px-[16px] phone:px-[20px] tablet:px-[32px] pb-[16px]">
          <CheckInBar event={event} />
        </div>
      )}
    </div>
  );
}

/* Countdown + check-in entry point shown on published events. */
function CheckInBar({ event }: { event: MyEvent }) {
  const days = daysUntil(event.startKey);
  const countdown =
    days === null ? "Event date not set"
      : days > 1 ? `Your Event Start in ${days} days`
      : days === 1 ? "Your Event Start tomorrow"
      : days === 0 ? "Your Event Starts today"
      : "Your Event has started";
  return (
    <div className="bg-[#f7e9e9] border border-[#d8444b] rounded-[16px] w-full relative overflow-hidden">
      {/* Oversized calendar outline bleeding off the right edge. */}
      <CalendarCheck
        aria-hidden
        className="absolute -right-[24px] top-[16px] size-[180px] stroke-[0.5] pointer-events-none"
        color="#D8444B"
      />
      <div className="relative content-stretch flex flex-col gap-[8px] items-start p-[16px]">
        <div className="flex gap-[8px] items-center">
          <CalendarCheck className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
          <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">My Event</p>
        </div>
        <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">{countdown}</p>
        <button
          type="button"
          className="bg-[#d8444b] rounded-[16px] flex gap-[8px] items-center justify-center px-[24px] py-[12px] shrink-0 cursor-pointer"
        >
          <MonitorCheck className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
          <span className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Event Check In</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export function MyEventsPage() {
  const { myEvents, openManage } = useEvent();
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const events = myEvents.filter((e) => (filter === "past" ? isPast(e) : !isPast(e)));
  const [selectedId, setSelectedId] = useState<string | null>(events[0]?.id ?? null);
  // Below laptop the two views are separate screens rather than panes.
  const [detailOpen, setDetailOpen] = useState(false);

  const selected = events.find((e) => e.id === selectedId) ?? events[0] ?? null;

  return (
    <div className="flex justify-center w-full">
      <div className="flex w-full max-w-[1440px] items-stretch">
        {/* List pane */}
        <div
          className={`${detailOpen ? "hidden laptop:flex" : "flex"} flex-col flex-[1_0_0] min-w-px px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]`}
        >
          <EventList
            filter={filter}
            onFilter={(v) => {
              setFilter(v);
              setDetailOpen(false);
            }}
            events={events}
            selectedId={selected?.id ?? null}
            onOpen={(e) => {
              setSelectedId(e.id);
              setDetailOpen(true);
            }}
            onManage={openManage}
          />
        </div>

        <div className="hidden laptop:block w-px bg-[#d9d9d9] shrink-0" />

        {/* Detail pane */}
        <div
          className={`${detailOpen ? "flex" : "hidden laptop:flex"} flex-col flex-[1_0_0] min-w-px px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]`}
        >
          {selected ? (
            <EventDetail event={selected} onBack={() => setDetailOpen(false)} />
          ) : (
            <div className="flex items-center justify-center flex-1 w-full">
              <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px]">Select an event to see its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
