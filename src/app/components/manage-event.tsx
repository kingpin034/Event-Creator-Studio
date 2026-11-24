import { useState } from "react";
import {
  PanelLeftClose, PanelLeftOpen, Globe, FileText, Wallet, MessageSquareText,
  ScanFace, FileSearch, TrendingUp, UserRoundCheck, PencilRuler, History, Save,
} from "lucide-react";
import { useEvent } from "./event-context";
import type { ManageSection } from "./event-context";
import type { EventStatus } from "./my-events-data";
import { ImageCoverCard, GalleryCard } from "./left-column";
import { ConfirmModal } from "./confirm-modal";
import { BlastMessage } from "./blast-message";
import { GuestCheckIn } from "./guest-check-in";
import { GuestData } from "./guest-data";
import { ResellerControl } from "./reseller-control";
import { TicketTransaction } from "./ticket-transaction";
import {
  EventNameField, SlugField, DateTimeCard, AboutCard, LocationCard, HostsCard,
  TicketsCard, EventSettingsCard,
} from "./right-column";

// Owned by the provider so Check In / Withdraw can come back to it.
type SectionId = ManageSection;

const NAV: { group: string; items: { id: SectionId; label: string; Icon: typeof FileText }[] }[] = [
  {
    group: "Event Settings",
    items: [
      { id: "information", label: "Event Information", Icon: FileText },
      { id: "tickets", label: "Ticket & Registration", Icon: Wallet },
      { id: "blast", label: "Blast Message", Icon: MessageSquareText },
    ],
  },
  {
    group: "Guest Management",
    items: [
      { id: "checkin", label: "Guest Check In", Icon: ScanFace },
      { id: "guests", label: "Guest Data", Icon: FileSearch },
      { id: "transactions", label: "Ticket Transaction", Icon: TrendingUp },
      { id: "resellers", label: "Reseller Control", Icon: UserRoundCheck },
    ],
  },
];

const STATUS: Record<EventStatus, { label: string; className: string; Icon: typeof Globe }> = {
  draft: { label: "Draft", className: "bg-[#eef2ff] border-[#2563eb] text-[#2563eb]", Icon: PencilRuler },
  published: { label: "Published", className: "bg-[#e9f7ee] border-[#1a9c4b] text-[#1a9c4b]", Icon: Globe },
  ended: { label: "Ended", className: "bg-[#f4f4f4] border-[#9e9e9e] text-[#9e9e9e]", Icon: History },
};

/* The nav bar is sticky and 75px tall, so the panel pins just below it.
   max-h (not h) keeps the panel only as tall as its own nav — a full-height
   child would fill the row and leave nothing to stick within. The divider
   lives on the content pane instead, so it still spans the full column. */
const RAIL = "sticky top-[75px] max-h-[calc(100vh-75px)] overflow-y-auto";

/* Below laptop there isn't room to sit beside the content, so the expanded
   panel takes over the screen entirely. From laptop up it goes back to being a
   sticky column alongside the content. */
const RAIL_EXPANDED =
  // Starts below the 75px nav rather than at inset-0, so the nav stays visible
  // and reachable while the panel is open. Sides reset individually at laptop —
  // `inset-auto` would fight the `top` utility for precedence.
  "fixed left-0 right-0 top-[75px] bottom-0 z-40 w-full overflow-y-auto bg-[#fbfbfb] " +
  "laptop:sticky laptop:left-auto laptop:right-auto laptop:bottom-auto laptop:z-auto " +
  "laptop:h-auto laptop:w-[290px] laptop:max-h-[calc(100vh-75px)]";

function Sidebar({
  expanded, onToggle, active, onSelect, title, status,
}: {
  expanded: boolean;
  onToggle: () => void;
  active: SectionId;
  onSelect: (id: SectionId) => void;
  title: string;
  status: EventStatus;
}) {
  const s = STATUS[status];

  if (!expanded) {
    /* Folded: icons only, in a narrow rail. */
    return (
      <div className={`${RAIL} content-stretch flex flex-col gap-[8px] items-center shrink-0 w-[64px] laptop:w-[80px] px-[12px] laptop:px-[16px] py-[16px] laptop:py-[24px]`}>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Expand sidebar"
          aria-expanded={false}
          className="bg-[#d8444b] flex items-center justify-center rounded-[999px] shrink-0 size-[40px] cursor-pointer"
        >
          <PanelLeftOpen className="size-[20px]" strokeWidth={1.5} color="#FBFBFB" />
        </button>
        <div className={`flex items-center justify-center rounded-[16px] shrink-0 size-[40px] border ${s.className}`} title={s.label}>
          <s.Icon className="size-[20px]" strokeWidth={1.5} />
        </div>
        {NAV.map((group) => (
          <div key={group.group} className="content-stretch flex flex-col gap-[8px] items-center w-full">
            <div className="h-px w-full bg-[#d9d9d9] my-[8px]" />
            {group.items.map(({ id, label, Icon }) => {
              const on = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelect(id)}
                  aria-label={label}
                  aria-current={on}
                  title={label}
                  className={`flex items-center justify-center rounded-[16px] shrink-0 size-[40px] cursor-pointer border ${
                    on ? "bg-[#f7e9e9] border-[#d8444b]" : "bg-[#f4f4f4] border-transparent"
                  }`}
                >
                  <Icon className="size-[20px]" strokeWidth={1.5} color={on ? "#D8444B" : "#131313"} />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  /* Expanded: status + event name + labelled nav. */
  return (
    <div className={`${RAIL_EXPANDED} content-stretch flex flex-col gap-[16px] laptop:gap-[24px] items-start shrink-0 px-[16px] laptop:px-[24px] py-[16px] laptop:py-[24px]`}>
      <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
        <div className="content-stretch flex gap-[12px] items-center justify-between w-full">
          <div className={`flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[16px] border ${s.className}`}>
            <s.Icon className="size-[20px] shrink-0" strokeWidth={1.5} />
            <p className="font-medium leading-none text-[16px] whitespace-nowrap">{s.label}</p>
          </div>
          <button
            type="button"
            onClick={onToggle}
            aria-label="Collapse sidebar"
            aria-expanded
            className="bg-[#e4e4e4] flex items-center justify-center rounded-[999px] shrink-0 size-[40px] cursor-pointer"
          >
            <PanelLeftClose className="size-[20px]" strokeWidth={1.5} color="#131313" />
          </button>
        </div>
        <div className="content-stretch flex flex-col gap-[2px] items-start w-full">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">Manage Event</p>
          <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] w-full truncate">{title}</p>
        </div>
      </div>

      {/* A rule sits above every group, including the first — that one separates
          the nav from the Manage Event header. */}
      {NAV.map((group) => (
        <div key={group.group} className="content-stretch flex flex-col gap-[12px] items-start w-full">
          <div className="h-px w-full bg-[#d9d9d9]" />
          <p className="font-semibold leading-[1.2] text-[#131313] text-[16px]">{group.group}</p>
          <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
            {group.items.map(({ id, label, Icon }) => {
              const on = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelect(id)}
                  aria-current={on}
                  className={`w-full rounded-[12px] flex gap-[8px] items-center px-[16px] py-[12px] cursor-pointer text-left border ${
                    on ? "bg-[#f7e9e9] border-[#d8444b]" : "bg-transparent border-transparent hover:bg-[#f4f4f4]"
                  }`}
                >
                  <Icon className="size-[20px] shrink-0" strokeWidth={1.5} color={on ? "#D8444B" : "#131313"} />
                  <span className={`font-medium leading-none text-[16px] ${on ? "text-[#d8444b]" : "text-[#131313]"}`}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Event Information reuses the Create Event cards, ending in Update rather
   than the Save/Publish pair. */
function EventInformation() {
  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="flex flex-col tablet:flex-row gap-[32px] tablet:gap-[16px] laptop:gap-[32px] items-start max-w-[1440px] w-full">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start max-w-[540px] min-w-px relative w-full order-2 tablet:order-1">
          <ImageCoverCard />
          <GalleryCard />
          <HostsCard />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative w-full order-1 tablet:order-2">
          <EventNameField />
          <SlugField />
          <DateTimeCard />
          <LocationCard />
          <AboutCard />
          {/* Tablet and up the actions close the right column; on mobile they
              move below Cover/Gallery/Hosts so they stay last on the page. */}
          <div className="hidden tablet:block w-full max-w-[868px]">
            <BottomActions />
          </div>
        </div>
        <div className="tablet:hidden order-3 w-full">
          <BottomActions />
        </div>
      </div>
    </div>
  );
}

const SIZE = (full: boolean) => (full ? "w-full px-[32px] py-[18px]" : "px-[24px] py-[12px]");

/* Draft-only: stash edits without going live. */
function SaveDraftButton({ full = false }: { full?: boolean }) {
  return (
    <button
      type="button"
      className={`bg-[#f7e9e9] border border-[#d8444b] rounded-[16px] flex gap-[8px] items-center justify-center cursor-pointer shrink-0 ${SIZE(full)}`}
    >
      <Save className="size-[20px] shrink-0" strokeWidth={1.5} color="#D53940" />
      <span className="font-medium leading-none text-[#d53940] text-[16px] whitespace-nowrap">Save Draft Changes</span>
    </button>
  );
}

/* Draft-only: takes the event live after confirming. */
function PublishButton({ full = false }: { full?: boolean }) {
  const { publishManagedEvent } = useEvent();
  const [confirming, setConfirming] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className={`bg-[#d8444b] rounded-[16px] flex gap-[8px] items-center justify-center cursor-pointer shrink-0 ${SIZE(full)}`}
      >
        <Globe className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
        <span className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Publish Event Now</span>
      </button>
      <ConfirmModal
        open={confirming}
        icon={<Globe strokeWidth={1.5} />}
        title="Publish Event Now?"
        description="Your event goes live straight away and becomes visible to everyone with the link."
        confirmLabel="Publish Event Now"
        onConfirm={() => {
          publishManagedEvent();
          setConfirming(false);
        }}
        onClose={() => setConfirming(false)}
      />
    </>
  );
}

/* Published-only: saving on a live event warns first. */
function UpdateButton({ full = false }: { full?: boolean }) {
  const [confirming, setConfirming] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className={`bg-[#d8444b] rounded-[16px] flex gap-[8px] items-center justify-center cursor-pointer shrink-0 ${SIZE(full)}`}
      >
        <Globe className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
        <span className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Update Event Information</span>
      </button>
      <ConfirmModal
        open={confirming}
        icon={<Globe strokeWidth={1.5} />}
        title="Publish New Changes?"
        description="Changing this information while the event is published may cause misinformation for attendees!"
        confirmLabel="Publish Anyway"
        onConfirm={() => setConfirming(false)}
        onClose={() => setConfirming(false)}
      />
    </>
  );
}

/* Drafts get Save + Publish stacked; published events get the single Update. */
function BottomActions() {
  const { manageEvent } = useEvent();
  if (manageEvent?.status !== "draft") return <UpdateButton full />;
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-stretch w-full">
      <SaveDraftButton full />
      <PublishButton full />
    </div>
  );
}

/* Compact header action: drafts save, published events update. */
function TopAction() {
  const { manageEvent } = useEvent();
  return manageEvent?.status === "draft" ? <SaveDraftButton /> : <UpdateButton />;
}

/* Ticket & Registration reuses the Create Event cards verbatim, so ticket
   creation, the settings toggles and the registration form behave identically. */
function TicketRegistration() {
  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[868px] w-full">
        <div className="content-stretch flex flex-wrap gap-[12px] items-center justify-between w-full">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[24px]">Ticket &amp; Registration</p>
          <TopAction />
        </div>
        <TicketsCard />
        <EventSettingsCard />
        <BottomActions />
      </div>
    </div>
  );
}

/* Placeholder for the sections still awaiting designs. Shares the 868px column
   so they line up with Ticket & Registration when they get built out. */
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[868px] w-full">
        <p className="font-semibold leading-[1.2] text-[#131313] text-[24px]">{label}</p>
        <div className="flex items-center justify-center w-full py-[64px]">
          <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px] text-center">Coming soon.</p>
        </div>
      </div>
    </div>
  );
}

/** True where the expanded panel covers the screen — i.e. below `laptop:`. */
const isOverlay = () => window.matchMedia("(max-width: 1023.98px)").matches;

export function ManageEventPage() {
  const { manageEvent, manageSection: active, setManageSection: setActive } = useEvent();
  // Start folded on small screens — an expanded panel would cover the content.
  // Mount-time only; the user can still expand it.
  const [expanded, setExpanded] = useState(() => !isOverlay());

  if (!manageEvent) return <ComingSoon label="No event selected" />;

  const label = NAV.flatMap((g) => g.items).find((i) => i.id === active)?.label ?? "";

  return (
    /* items-start, not stretch — a stretched child fills its parent and has no
       room left to stick. */
    <div className="flex w-full items-start">
      <Sidebar
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        active={active}
        onSelect={(id) => {
          setActive(id);
          // Picking a section from the full-screen panel should land you on
          // that page, not leave the panel covering it.
          if (isOverlay()) setExpanded(false);
        }}
        title={manageEvent.title}
        status={manageEvent.status}
      />
      <div className="flex-[1_0_0] min-w-px border-l border-[#d9d9d9] min-h-[calc(100vh-75px)]">
        {active === "information" && <EventInformation />}
        {active === "tickets" && <TicketRegistration />}
        {active === "blast" && <BlastMessage />}
        {active === "checkin" && <GuestCheckIn />}
        {active === "guests" && <GuestData />}
        {active === "transactions" && <TicketTransaction />}
        {active === "resellers" && <ResellerControl />}
        {!["information", "tickets", "blast", "checkin", "guests", "transactions", "resellers"].includes(active) && (
          <ComingSoon label={label} />
        )}
      </div>
    </div>
  );
}
