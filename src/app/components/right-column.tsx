import {
  Link as LinkIcon, SquarePen, Globe, Newspaper, Bold, Italic, Underline, List, ListOrdered,
  TicketPlus, Plus, CircleCheckBig, ChevronDown, Users, TicketPercent, GripVertical, Trash2,
  Settings2, Tags, DoorClosed, UserCheck, LockKeyhole, ListPlus, BookUser, FileText,
  CircleAlert, MapPin, MonitorCheck, MapPlus, MapPinPlus, X,
  Footprints, Palette, PersonStanding, UtensilsCrossed, Wine, CircuitBoard, Boxes, NotebookPen,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionCard, Dropdown, Toggle, Checkbox, RoundButton } from "./primitives";
import { useEvent } from "./event-context";
import type { Place, Ticket } from "./event-context";
import { DateTimePicker } from "./date-time-picker";
import { CreateTicketModal } from "./create-ticket-modal";
import { FindCoHostModal } from "./find-co-host-modal";
import { TimeZoneModal } from "./time-zone-modal";
import { FindLocationModal } from "./find-location-modal";
import { RegistrationFormModal } from "./registration-form-modal";
import { QuestionCard } from "./question-card";
import { ConfirmModal } from "./confirm-modal";

/* ---------- Event Name ---------- */
export function EventNameField() {
  const { eventName, setEventName } = useEvent();
  return (
    <input
      value={eventName}
      onChange={(e) => setEventName(e.target.value)}
      placeholder="Event Name"
      className="font-semibold leading-[1.2] max-w-[868px] w-full bg-transparent outline-none text-[28px] tablet:text-[48px] text-[#d8444b] placeholder:text-[#9e9e9e]"
    />
  );
}

/* ---------- Slug / URL ---------- */
export function SlugField() {
  const { slug, setSlug } = useEvent();
  const slugRef = useRef<HTMLInputElement>(null);
  /* The pencil button is a shortcut for clicking into the field itself. */
  const editSlug = () => {
    const el = slugRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  };
  return (
    <div className="content-stretch flex gap-[8px] items-center max-w-[868px] relative shrink-0 w-full">
      <div className="bg-[#f4f4f4] flex-[1_0_0] min-w-px relative rounded-[16px] border border-[#d9d9d9] focus-within:border-[#d8444b]">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[18px]">
          <LinkIcon className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
          <div className="flex items-center font-medium text-[16px] min-w-px flex-1">
            <span className="text-[#d8444b] whitespace-nowrap">mynoosa.id/</span>
            <input
              ref={slugRef}
              value={slug}
              onChange={(e) => setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())}
              className="bg-transparent outline-none text-[#131313] flex-1 min-w-px"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={editSlug}
        aria-label="Edit event link"
        className="bg-[#f7e9e9] border border-[#d8444b] flex items-center justify-center p-[18px] rounded-[999px] shrink-0 cursor-pointer"
      >
        <SquarePen className="size-[20px]" strokeWidth={1.5} color="#D53940" />
      </button>
    </div>
  );
}

/* ---------- Date & Time ---------- */
/* Styled picker box matching the Figma design: shows dd/mm/yyyy / 00:00 placeholders
   in muted text. Clicking any box opens the shared date & time picker modal. */
function PickerBox({
  type, value, onOpen,
}: {
  type: "date" | "time"; value: string; onOpen: () => void;
}) {
  const display =
    type === "date"
      ? value
        ? value.split("-").reverse().join("/")
        : "dd/mm/yyyy"
      : value || "00:00";
  return (
    <button
      type="button"
      onClick={onOpen}
      className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[12px] px-[16px] py-[12px] relative shrink-0 cursor-pointer flex items-center"
    >
      <p className={`font-medium leading-none text-[16px] whitespace-nowrap ${value ? "text-[#131313]" : "text-[#9e9e9e]"}`}>
        {display}
      </p>
    </button>
  );
}

function DateRow({ label, onOpen }: { label: string; onOpen: () => void }) {
  const { startDate, startTime, endDate, endTime } = useEvent();
  const isStart = label === "Start Event";
  const date = isStart ? startDate : endDate;
  const time = isStart ? startTime : endTime;
  return (
    <div className="content-center flex flex-wrap gap-y-[8px] items-center justify-between relative shrink-0 w-full">
      <p className="font-semibold leading-[1.2] min-w-[96px] text-[#131313] text-[18px] whitespace-nowrap">{label}</p>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <PickerBox type="date" value={date} onOpen={onOpen} />
        <PickerBox type="time" value={time} onOpen={onOpen} />
      </div>
    </div>
  );
}

export function DateTimeCard() {
  const {
    startDate, setStartDate, startTime, setStartTime,
    endDate, setEndDate, endTime, setEndTime, timeZone,
  } = useEvent();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tzOpen, setTzOpen] = useState(false);
  return (
    // <laptop: stacked column, 8px gap (Tablet/LargePhone/SmallPhone frames).
    // >=laptop: date + timezone side by side, 16px gap (Laptop/Desktop frames).
    <div className="content-start flex flex-col laptop:flex-row laptop:flex-wrap gap-[8px] laptop:gap-[16px] items-start max-w-[868px] relative shrink-0 w-full">
      <DateTimePicker
        open={pickerOpen}
        value={{ startDate, startTime, endDate, endTime }}
        onClose={() => setPickerOpen(false)}
        onApply={(v) => {
          setStartDate(v.startDate);
          setStartTime(v.startTime);
          setEndDate(v.endDate);
          setEndTime(v.endTime);
        }}
      />
      <div className="bg-[#fbfbfb] w-full shrink-0 laptop:w-auto laptop:flex-[1_0_0] min-w-[288px] max-w-[783px] relative rounded-[16px] border border-[#d9d9d9]">
        <div className="content-stretch flex gap-[8px] items-stretch p-[16px]">
          {/* timeline */}
          <div className="flex flex-col items-center pt-[8px] shrink-0 w-[16px]">
            <div className="size-[12px] rounded-full bg-[#d8444b]" />
            <div className="flex-1 w-0 border-l-[1.5px] border-dashed border-[#d8444b] my-[2px]" />
            <div className="size-[12px] rounded-full bg-[#d8444b]" />
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative">
            <DateRow label="Start Event" onOpen={() => setPickerOpen(true)} />
            <DateRow label="End Event" onOpen={() => setPickerOpen(true)} />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setTzOpen(true)}
        aria-label={`Time zone: ${timeZone.city}. Change`}
        className="bg-[#fbfbfb] content-stretch flex items-center w-full laptop:w-[120px] min-w-[120px] max-w-[783px] p-[16px] relative rounded-[16px] shrink-0 border border-[#d9d9d9] text-left cursor-pointer"
      >
        {/* Wraps to icon-over-text at the 120px inline width; single row when full width. */}
        <div className="content-center flex flex-[1_0_0] flex-wrap gap-[24px_8px] items-center min-w-px relative">
          <Globe className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
          {/* Width follows the content — a fixed width wrapped longer labels
              like "Makassar" / "GMT +8:00" onto a second line. */}
          <div className="flex flex-col gap-[4px] shrink-0">
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">{timeZone.city}</p>
            <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px] whitespace-nowrap">{timeZone.offset}</p>
          </div>
        </div>
      </button>
      <TimeZoneModal open={tzOpen} onClose={() => setTzOpen(false)} />
    </div>
  );
}

/* ---------- About Event ---------- */
const formatTools = [
  { id: "bold", Icon: Bold },
  { id: "italic", Icon: Italic },
  { id: "underline", Icon: Underline },
  { id: "list", Icon: List },
  { id: "number", Icon: ListOrdered },
  { id: "link", Icon: LinkIcon },
];

/* Bold / italic / underline / lists / link row shared by the rich-text areas. */
export function FormatToolbar({
  formats, onToggle,
}: { formats: Record<string, boolean>; onToggle: (id: string) => void }) {
  return (
    <div className="content-stretch flex flex-wrap gap-[2px] items-center">
      {formatTools.map(({ id, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onToggle(id)}
          aria-pressed={!!formats[id]}
          className={`flex p-[10px] rounded-[12px] border border-[#d9d9d9] cursor-pointer ${
            formats[id] ? "bg-[#f7e9e9] border-[#d8444b]" : "bg-[#fbfbfb]"
          }`}
        >
          <Icon className="size-[20px]" strokeWidth={1.5} color={formats[id] ? "#D8444B" : "#131313"} />
        </button>
      ))}
    </div>
  );
}

export function AboutCard() {
  const { description, setDescription, formats, toggleFormat } = useEvent();
  return (
    <SectionCard icon={<Newspaper strokeWidth={1.5} />} title="About Event" subtitle="All the info visitors want to know">
      <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
        <FormatToolbar formats={formats} onToggle={toggleFormat} />
        <textarea
          value={description}
          maxLength={500}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          className="bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full p-[16px] min-h-[74px] resize-y font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none"
        />
        <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">{description.length} / 500 character</p>
      </div>
    </SectionCard>
  );
}

/* ---------- Tickets ---------- */
function formatRupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

function TicketRow({ ticket, onEdit, onRemove }: { ticket: Ticket; onEdit: () => void; onRemove: () => void }) {
  return (
    /* Open tickets read in brand red; closed ones drop back to neutral grey. */
    <div className={`rounded-[16px] w-full border ${ticket.open ? "bg-[#f7e9e9] border-[#d8444b]" : "bg-[#f4f4f4] border-[#d9d9d9]"}`}>
      <div className="content-center flex flex-wrap gap-[4px] items-center p-[12px]">
        <GripVertical className="size-[20px] shrink-0" strokeWidth={1.5} color={ticket.open ? "#D8444B" : "#9E9E9E"} />
        <div className="content-center flex flex-[1_0_0] flex-wrap gap-[8px_4px] items-center min-w-px">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-[208px]">
            <div className="content-stretch flex gap-[8px] items-center w-full">
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">{ticket.name}</p>
              <div className={`flex items-center justify-center px-[12px] py-[4px] rounded-[12px] ${ticket.open ? "bg-[#d8444b]" : "border border-[#d9d9d9]"}`}>
                <p className={`font-semibold leading-none text-[12px] ${ticket.open ? "text-[#fbfbfb]" : "text-[#9e9e9e]"}`}>
                  {ticket.open ? "Open" : "Closed"}
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-center">
              <div className="flex gap-[8px] items-center">
                <Users className="size-[20px]" strokeWidth={1.5} color="#414141" />
                <p className="font-medium leading-none text-[#414141] text-[16px]">0/{ticket.capacity}</p>
              </div>
              <div className="h-[20px] w-px bg-[#414141]" />
              <div className="flex gap-[8px] items-center">
                <TicketPercent className="size-[20px]" strokeWidth={1.5} color="#414141" />
                <p className="font-medium leading-none text-[#414141] text-[16px]">{ticket.paid ? formatRupiah(ticket.price) : "Free"}</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-center min-w-[80px]">
            <button type="button" onClick={onRemove} className="bg-[#f42d2d] border border-[#fae6e6] flex items-center justify-center p-[8px] rounded-[999px] cursor-pointer">
              <Trash2 className="size-[20px]" strokeWidth={1.5} color="#FBFBFB" />
            </button>
            <button type="button" onClick={onEdit} className="bg-[#f7e9e9] border border-[#d8444b] flex items-center justify-center p-[8px] rounded-[999px] cursor-pointer">
              <SquarePen className="size-[20px]" strokeWidth={1.5} color="#D53940" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TicketsCard() {
  const { payment, setPayment, tickets, addTicket, updateTicket, removeTicket } = useEvent();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Ticket | null>(null);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (t: Ticket) => { setEditing(t); setModalOpen(true); };

  return (
    <SectionCard
      icon={<TicketPlus strokeWidth={1.5} />}
      title="Tickets"
      subtitle="Create and set up your ticket"
      action={<RoundButton onClick={openCreate}><Plus strokeWidth={1.5} /></RoundButton>}
    >
      <OptionPicker
        value={payment}
        onChange={setPayment}
        options={PAYMENT_METHODS}
        placeholder="Payment method"
      />
      {tickets.map((t) => (
        <TicketRow
          key={t.id}
          ticket={t}
          onEdit={() => openEdit(t)}
          onRemove={() => removeTicket(t.id)}
        />
      ))}
      <CreateTicketModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSubmit={(draft) => {
          if (editing) updateTicket(editing.id, draft);
          else addTicket(draft);
        }}
      />
    </SectionCard>
  );
}

/* ---------- Event Setting ---------- */
function ToggleRow({
  icon, label, on, onChange, labelOn, labelOff,
}: {
  icon: React.ReactNode; label: string; on: boolean; onChange: (v: boolean) => void; labelOn: string; labelOff: string;
}) {
  return (
    <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full">
      <div className="content-center flex flex-wrap gap-y-[10px] items-center justify-between p-[16px]">
        <div className="content-stretch flex gap-[8px] items-center">
          <span className="[&>svg]:size-[20px] [&>svg]:text-[#131313]">{icon}</span>
          <p className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">{label}</p>
          <CircleAlert className="size-[20px]" strokeWidth={1.5} color="#D8444B" />
        </div>
        <Toggle on={on} onChange={onChange} labelOn={labelOn} labelOff={labelOff} />
      </div>
    </div>
  );
}

const EVENT_CATEGORIES = [
  { value: "sports", label: "Sports", Icon: Footprints },
  { value: "arts", label: "Arts & Craft", Icon: Palette },
  { value: "wellness", label: "Wellness", Icon: PersonStanding },
  { value: "culinary", label: "Culinary", Icon: UtensilsCrossed },
  { value: "meetup", label: "Meetup", Icon: Wine },
  { value: "technology", label: "Technology", Icon: CircuitBoard },
  { value: "others", label: "Others", Icon: Boxes },
];

const PAYMENT_METHODS = [
  { value: "automatic", label: "Automatic payment", Icon: CircleCheckBig },
  { value: "manual", label: "Manual payment", Icon: NotebookPen },
];

type PickerOption = { value: string; label: string; Icon: typeof Tags };

/* An inline expanding list rather than a native select, so the options can
   carry icons. Open state turns the trigger border primary. Pass triggerIcon to
   pin the trigger's icon; omit it to mirror the selected option's icon. */
function OptionPicker({
  value, onChange, options, placeholder, triggerIcon: TriggerIcon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: PickerOption[];
  placeholder: string;
  triggerIcon?: typeof Tags;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  const Icon = TriggerIcon ?? selected?.Icon ?? options[0].Icon;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`bg-[#f4f4f4] rounded-[16px] shrink-0 w-full border flex items-center justify-between gap-[8px] p-[16px] cursor-pointer ${
          open ? "border-[#d8444b]" : "border-[#d9d9d9]"
        }`}
      >
        <span className="content-stretch flex gap-[8px] items-center min-w-px">
          <Icon className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
          <span className={`font-medium leading-none text-[16px] truncate ${selected ? "text-[#131313]" : "text-[#9e9e9e]"}`}>
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <ChevronDown
          className={`size-[20px] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
          color="#131313"
        />
      </button>
      {open && (
        <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full shrink-0 overflow-hidden">
          {options.map(({ value: v, label, Icon: OptIcon }, i) => (
            <button
              key={v}
              type="button"
              aria-current={v === value}
              onClick={() => {
                onChange(v);
                setOpen(false);
              }}
              className={`w-full content-stretch flex gap-[8px] items-center p-[16px] cursor-pointer text-left hover:bg-[#e4e4e4] ${
                i > 0 ? "border-t border-[#d9d9d9]" : ""
              }`}
            >
              <OptIcon className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
              <span className="font-medium leading-none text-[#131313] text-[16px]">{label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export function EventSettingsCard() {
  const {
    category, setCategory, registrationOpen, setRegistrationOpen, needVerification, setNeedVerification,
    isPrivate, setIsPrivate, additionalOpen, setAdditionalOpen,
    welcomeAdded, setWelcomeAdded, welcomeTitle, setWelcomeTitle,
    welcomeBody, setWelcomeBody, welcomeFormats, toggleWelcomeFormat,
    questions, addQuestion, updateQuestion, removeQuestion,
  } = useEvent();
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [pendingReg, setPendingReg] = useState<boolean | null>(null);
  const [pendingVerify, setPendingVerify] = useState<boolean | null>(null);
  const [pendingPrivate, setPendingPrivate] = useState<boolean | null>(null);
  return (
    <SectionCard icon={<Settings2 strokeWidth={1.5} />} title="Event Setting" subtitle="Control your event right here">
      <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
        <OptionPicker
          value={category}
          onChange={setCategory}
          options={EVENT_CATEGORIES}
          placeholder="Event Category"
          triggerIcon={Tags}
        />
        {/* Registration status only flips once the prompt is confirmed. */}
        <ToggleRow icon={<DoorClosed strokeWidth={1.5} />} label="Registration Status" on={registrationOpen} onChange={setPendingReg} labelOn="Open" labelOff="Closed" />
        <ConfirmModal
          open={pendingReg !== null}
          icon={<DoorClosed strokeWidth={1.5} />}
          title={pendingReg ? "Open Registration?" : "Close Registration?"}
          description={
            pendingReg
              ? "Open the registration and welcome attendees."
              : "Close registration to stop accepting new attendees."
          }
          confirmLabel={pendingReg ? "Open Registration" : "Close Registration"}
          onConfirm={() => {
            setRegistrationOpen(pendingReg!);
            setPendingReg(null);
          }}
          onClose={() => setPendingReg(null)}
        />
        {/* Verification also confirms before flipping. */}
        <ToggleRow icon={<UserCheck strokeWidth={1.5} />} label="Need Verification?" on={needVerification} onChange={setPendingVerify} labelOn="Yes" labelOff="No" />
        <ConfirmModal
          open={pendingVerify !== null}
          icon={<UserCheck strokeWidth={1.5} />}
          title={pendingVerify ? "Add Verification Step?" : "Remove Verification Step?"}
          description={
            pendingVerify
              ? "Add a verification step to confirm attendee details before finalizing their registration."
              : "Remove the verification step to simplify attendee registration."
          }
          confirmLabel={pendingVerify ? "Add Verification" : "Remove"}
          onConfirm={() => {
            setNeedVerification(pendingVerify!);
            setPendingVerify(null);
          }}
          onClose={() => setPendingVerify(null)}
        />
        {/* Visibility also confirms before flipping. */}
        <ToggleRow icon={<LockKeyhole strokeWidth={1.5} />} label="Make Event Private" on={isPrivate} onChange={setPendingPrivate} labelOn="Private" labelOff="Public" />
        <ConfirmModal
          open={pendingPrivate !== null}
          icon={<LockKeyhole strokeWidth={1.5} />}
          title={pendingPrivate ? "Make Event Private?" : "Make Event Public?"}
          description={
            pendingPrivate
              ? "Would you like to make this event private?"
              : "Do you want to make this event public?"
          }
          confirmLabel={pendingPrivate ? "Make Private" : "Make Public"}
          onConfirm={() => {
            setIsPrivate(pendingPrivate!);
            setPendingPrivate(null);
          }}
          onClose={() => setPendingPrivate(null)}
        />
      </div>
      <div className="h-px w-full bg-[#d9d9d9]" />
      <div className="content-stretch flex flex-col gap-[12px] w-full">
        <div className="content-stretch flex gap-[12px] items-center w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
            <div className="content-stretch flex gap-[8px] items-center">
              <ListPlus className="size-[20px]" strokeWidth={1.5} color="#131313" />
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">Additional Setting</p>
            </div>
            <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">
              Create registration questions, welcome message to your guests
            </p>
          </div>
          <RoundButton onClick={() => setAdditionalOpen(!additionalOpen)}>
            <ChevronDown strokeWidth={1.5} className={`transition-transform ${additionalOpen ? "rotate-180" : ""}`} />
          </RoundButton>
        </div>
        {additionalOpen && (
          <div className="content-stretch flex flex-col gap-[12px] w-full">
            <div className="h-px w-full bg-[#d9d9d9]" />
            {/* Welcome Message — the + swaps in an editor, the trash removes it. */}
            <div className="content-stretch flex gap-[12px] items-center w-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px">
                <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">Welcome Message</p>
                <CircleAlert className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
              </div>
              {welcomeAdded ? (
                <button
                  type="button"
                  onClick={() => setWelcomeAdded(false)}
                  aria-label="Remove welcome message"
                  className="bg-[#f42d2d] border border-[#fae6e6] flex items-center justify-center p-[8px] rounded-[999px] shrink-0 cursor-pointer"
                >
                  <Trash2 className="size-[20px]" strokeWidth={1.5} color="#FBFBFB" />
                </button>
              ) : (
                <RoundButton onClick={() => setWelcomeAdded(true)}>
                  <Plus strokeWidth={1.5} />
                </RoundButton>
              )}
            </div>
            {welcomeAdded && (
              <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
                <FormatToolbar formats={welcomeFormats} onToggle={toggleWelcomeFormat} />
                <input
                  value={welcomeTitle}
                  onChange={(e) => setWelcomeTitle(e.target.value)}
                  placeholder="Message Title"
                  className="bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full p-[16px] font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none"
                />
                <textarea
                  value={welcomeBody}
                  maxLength={500}
                  onChange={(e) => setWelcomeBody(e.target.value)}
                  placeholder="Message"
                  className="bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full p-[16px] min-h-[74px] resize-y font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none"
                />
                <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[14px]">{welcomeBody.length} / 500 character</p>
              </div>
            )}
            <div className="h-px w-full bg-[#d9d9d9]" />
            {/* Registration Form */}
            <div className="content-stretch flex gap-[12px] items-center w-full">
              <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] flex-[1_0_0] min-w-px">Registration Form</p>
              <RoundButton onClick={() => setQuestionModalOpen(true)}>
                <Plus strokeWidth={1.5} />
              </RoundButton>
            </div>
            <RegistrationFormModal
              open={questionModalOpen}
              onClose={() => setQuestionModalOpen(false)}
              onSelect={addQuestion}
            />
            {/* Default fields every registration collects */}
            <div className="content-stretch flex flex-wrap gap-[8px] items-stretch w-full">
              {["Name", "Email", "Phone"].map((f) => (
                <div
                  key={f}
                  className="bg-[#fbfbfb] border border-[#d9d9d9] rounded-[16px] flex-[1_0_0] min-w-[96px] flex gap-[4px] items-center justify-center p-[16px]"
                >
                  <p className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">{f}</p>
                  <span className="font-medium leading-none text-[#d8444b] text-[16px]">*</span>
                </div>
              ))}
            </div>
            {/* Custom questions */}
            {questions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                onChange={(patch) => updateQuestion(q.id, patch)}
                onRemove={() => removeQuestion(q.id)}
              />
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}

/* ---------- Location ---------- */
/* Selected-location map.
   Prefers a static export at /maps/<place id>.png when one is present — drop a
   screenshot there for pixel-exact fidelity with the Figma design. Falls back
   to a live OpenStreetMap embed, which needs no API key but does load from
   openstreetmap.org, so it requires an internet connection. */
function LocationMap({ place }: { place: Place }) {
  const [staticFailed, setStaticFailed] = useState(false);

  // Reset when the place changes so a new static export gets a chance to load.
  useEffect(() => setStaticFailed(false), [place.id]);

  if (!staticFailed) {
    return (
      <img
        src={`/maps/${place.id}.png`}
        alt={`Map showing ${place.name}`}
        onError={() => setStaticFailed(true)}
        className="absolute inset-0 size-full object-cover"
      />
    );
  }

  const d = 0.0035;
  const bbox = [place.lon - d, place.lat - d / 2, place.lon + d, place.lat + d / 2].join(",");
  return (
    <iframe
      title={`Map showing ${place.name}`}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${place.lat},${place.lon}`}
      loading="lazy"
      className="absolute inset-0 size-full border-0"
    />
  );
}

export function LocationCard() {
  const {
    onlineEvent, setOnlineEvent, locationNotes, setLocationNotes,
    selectedLocation, setSelectedLocation,
    platform, setPlatform, eventUrl, setEventUrl,
  } = useEvent();
  const [findOpen, setFindOpen] = useState(false);
  return (
    <SectionCard icon={<MapPin strokeWidth={1.5} />} title="Location" subtitle="All the info visitors want to know">
      {/* Online Event toggle */}
      <div className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full">
        <div className="content-center flex flex-wrap gap-y-[10px] items-center justify-between p-[16px]">
          <div className="content-stretch flex gap-[8px] items-center">
            <MonitorCheck className="size-[20px]" strokeWidth={1.5} color="#131313" />
            <p className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Online Event</p>
          </div>
          <Toggle on={onlineEvent} onChange={setOnlineEvent} labelOn="On" labelOff="Off" />
        </div>
      </div>
      {/* Online events swap the map + notes for platform and link fields. */}
      {onlineEvent ? (
        <>
          <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">Platform</p>
            <input
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="Enter your event platform"
              className="bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full p-[16px] font-medium leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none"
            />
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
            <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">URL</p>
            <input
              value={eventUrl}
              onChange={(e) => setEventUrl(e.target.value)}
              placeholder="Link to your event"
              className="bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full p-[16px] font-medium leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none"
            />
          </div>
        </>
      ) : (
      <>
      <FindLocationModal open={findOpen} onClose={() => setFindOpen(false)} />
      {/* Map area: dashed "Select Location" prompt until a place is picked. */}
      {selectedLocation ? (
        <div className="bg-[#f4f4f4] border border-[#d9d9d9] h-[238px] relative rounded-[16px] w-full overflow-hidden">
          <LocationMap place={selectedLocation} />
          {/* Name chip — the embedded marker carries no label. Sits top-left so
              it clears OpenStreetMap's attribution bar along the bottom. */}
          <div className="absolute top-[12px] left-[12px] z-20 bg-[#fbfbfb]/95 border border-[#d9d9d9] rounded-[12px] max-w-[calc(100%-72px)] content-stretch flex gap-[8px] items-center px-[12px] py-[8px]">
            <MapPin className="size-[20px] shrink-0" strokeWidth={1.5} color="#D8444B" />
            <p className="font-semibold leading-[1.2] text-[#131313] text-[16px] truncate">{selectedLocation.name}</p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedLocation(null)}
            aria-label="Remove location"
            className="absolute right-[12px] top-[12px] z-20 bg-[#f42d2d] border border-[#fae6e6] flex items-center justify-center p-[8px] rounded-[999px] cursor-pointer"
          >
            <X className="size-[20px]" strokeWidth={1.5} color="#FBFBFB" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setFindOpen(true)}
          aria-label="Select location"
          className="bg-[#f4f4f4] h-[238px] relative rounded-[16px] w-full overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 border-[#d8444b] border-[1.5px] border-dashed pointer-events-none rounded-[16px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[16px] items-center w-[187px]">
            {/* stroke-[0.8] on a 24-unit viewBox at 120px renders as a 4px line. */}
            <MapPinPlus className="size-[120px] shrink-0 stroke-[0.8]" color="#D8444B" />
            <p className="font-semibold leading-[1.2] text-[#d8444b] text-[18px] text-center w-full">Select Location</p>
          </div>
        </button>
      )}
      {/* Add / change event location */}
      <button
        type="button"
        onClick={() => setFindOpen(true)}
        className="bg-[#e4e4e4] rounded-[16px] w-full flex gap-[8px] items-center justify-center px-[32px] py-[18px] cursor-pointer"
      >
        <MapPlus className="size-[20px]" strokeWidth={1.5} color="#131313" />
        <p className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">
          {selectedLocation ? "Change Event Location" : "Add Event Location"}
        </p>
      </button>
      {/* Notes */}
      <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
        <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] whitespace-nowrap">Notes</p>
        <textarea
          value={locationNotes}
          onChange={(e) => setLocationNotes(e.target.value)}
          placeholder="Additional guide for your visitors"
          className="bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full p-[16px] min-h-[74px] resize-y font-medium leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none"
        />
      </div>
      </>
      )}
    </SectionCard>
  );
}

/* ---------- Hosts ---------- */
export function HostsCard() {
  const { hosts, removeHost } = useEvent();
  const [findOpen, setFindOpen] = useState(false);
  return (
    <SectionCard
      icon={<BookUser strokeWidth={1.5} />}
      title="Hosts Setting"
      subtitle="Add co-host for collaboration"
      action={<RoundButton onClick={() => setFindOpen(true)}><Plus strokeWidth={1.5} /></RoundButton>}
    >
      <FindCoHostModal open={findOpen} onClose={() => setFindOpen(false)} />
      <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
        {hosts.map((h) => (
          <div key={h.id} className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] w-full">
            <div className="content-stretch flex gap-[8px] items-center justify-between p-[12px]">
              <div className="content-stretch flex gap-[8px] items-center flex-[1_0_0] min-w-px">
                <div className="rounded-[999px] shrink-0 size-[40px] border border-[#d9d9d9] overflow-hidden">
                  <img alt={h.name} className="size-full object-cover" src={h.avatar} />
                </div>
                <p className="font-semibold leading-[1.2] text-[#131313] text-[18px] flex-[1_0_0] min-w-px">{h.name}</p>
              </div>
              {/* Co-hosts added via Find Co-Host can be removed; the owner cannot. */}
              {h.removable && (
                <button
                  type="button"
                  onClick={() => removeHost(h.id)}
                  aria-label={`Remove ${h.name}`}
                  className="bg-[#e4e4e4] border border-[#d9d9d9] flex items-center justify-center p-[8px] rounded-[999px] shrink-0 cursor-pointer"
                >
                  <X className="size-[20px]" strokeWidth={1.5} color="#131313" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ---------- Agreement + Actions ---------- */
export function AgreementBar() {
  const { agreed, setAgreed } = useEvent();
  return (
    // Transparent so the footer gradient shows through.
    <div className="content-stretch flex gap-[8px] items-start max-w-[868px] py-[16px] relative shrink-0 w-full">
      <Checkbox checked={agreed} onChange={setAgreed} />
      <p className="flex-[1_0_0] font-normal leading-[1.3] min-w-px text-[#131313] text-[16px]">
        You agree to our <span className="text-[#d8444b]">Terms &amp; Conditions</span> and{" "}
        <span className="text-[#d8444b]">Privacy Policy</span>, which cover your rights, responsibilities, and how we
        manage your data.
      </p>
    </div>
  );
}

export function ActionButtons() {
  const { agreed, submitEvent } = useEvent();
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start max-w-[868px] relative shrink-0 w-full">
      <button
        type="button"
        onClick={() => submitEvent("draft")}
        className="bg-[#f7e9e9] border border-[#d8444b] flex-[1_0_0] min-w-[288px] rounded-[16px] flex gap-[8px] items-center justify-center px-[32px] py-[18px] cursor-pointer"
      >
        <FileText className="size-[20px]" strokeWidth={1.5} color="#D53940" />
        <p className="font-medium leading-none text-[#d53940] text-[16px] whitespace-nowrap">Save as Draft</p>
      </button>
      <button
        type="button"
        disabled={!agreed}
        onClick={() => submitEvent("published")}
        className={`bg-[#d8444b] flex-[1_0_0] min-w-[288px] rounded-[16px] flex gap-[8px] items-center justify-center px-[32px] py-[18px] ${
          agreed ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <Globe className="size-[20px]" strokeWidth={1.5} color="#FBFBFB" />
        <p className="font-medium leading-none text-[#fbfbfb] text-[16px] whitespace-nowrap">Publish Event Now</p>
      </button>
    </div>
  );
}

/* Agreement + action buttons grouped so they can be placed either at the bottom
   of the form column (tablet+) or at the very bottom of the page (phone). */
export function BottomActions({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-[32px] items-end w-full ${className}`}>
      <AgreementBar />
      <ActionButtons />
    </div>
  );
}

export function RightColumn({ className = "" }: { className?: string }) {
  return (
    <div className={`content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-end max-w-[868px] min-w-px relative w-full ${className}`}>
      <EventNameField />
      <SlugField />
      <DateTimeCard />
      <LocationCard />
      <AboutCard />
      <TicketsCard />
      <EventSettingsCard />
      {/* On phone these move to the very bottom of the page (see CreateEvent). */}
      <BottomActions className="hidden tablet:flex" />
    </div>
  );
}
