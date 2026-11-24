import type { Host, Place, Ticket } from "./event-context";

/* Draft and Published are "upcoming"; Ended is "past". */
export type EventStatus = "draft" | "published" | "ended";

export type MyEvent = {
  id: string;
  title: string;
  slug: string;
  status: EventStatus;
  /** Group heading in the list timeline, e.g. "Mon 12 July 2025". */
  dayLabel: string;
  /** Card line, e.g. "Mon, 12 July 2025 | 15.30". */
  cardDate: string;
  /** Detail heading, e.g. "Mon, 12 July 2025". */
  detailDate: string;
  timeRange: string;
  /** Raw yyyy-mm-dd start, for the countdown. Empty when no date was set. */
  startKey: string;
  endsAt?: string;
  venue: string;
  venueTag: string;
  address: string;
  price: string;
  organizer: string;
  cover: string | null;
  gallery: (string | null)[];
  welcomeTitle: string;
  welcomeBody: string[];
  about: string;
  hosts: { name: string; avatar: string }[];
  /** Attendees so far — only surfaced on published events. */
  going: number;
  /** Approximate — enough to pin the right block on the embedded map. */
  lat: number;
  lon: number;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseKey(key: string): Date | null {
  const [y, m, d] = (key || "").split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

/** "Mon 12 July 2025" */
function dayLabelOf(key: string) {
  const d = parseKey(key);
  if (!d) return "Date not set";
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "Mon, 12 July 2025" */
function longDateOf(key: string) {
  const d = parseKey(key);
  if (!d) return "Date not set";
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function rupiah(n: number) {
  return `Rp${n.toLocaleString("id-ID")}`;
}

/** Whole days from today until the event starts; null when there's no date. */
export function daysUntil(startKey: string, now = new Date()): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startKey)) return null;
  const target = Date.parse(`${startKey}T00:00:00Z`);
  if (!Number.isFinite(target)) return null;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return Math.round((target - Date.parse(`${today}T00:00:00Z`)) / 86400000);
}

export type OrganizerCardState = "soon" | "upcoming" | "draft" | "ended";
export function organizerCardState(event: MyEvent, now = new Date()): OrganizerCardState {
  if (event.status === "draft") return "draft";
  if (event.status === "ended") return "ended";
  const days = daysUntil(event.startKey, now);
  if (event.endsAt ? Date.parse(event.endsAt) <= now.getTime() : days !== null && days < 0) return "ended";
  return days !== null && days <= 7 ? "soon" : "upcoming";
}

export type EventDraftInput = {
  eventName: string;
  slug: string;
  startDate: string;
  startTime: string;
  timeZoneOffset?: string;
  endDate: string;
  endTime: string;
  description: string;
  welcomeTitle: string;
  welcomeBody: string;
  coverUrl: string | null;
  gallery: (string | null)[];
  selectedLocation: Place | null;
  tickets: Ticket[];
  hosts: Host[];
};

/** Snapshot the Create Event form into a My Events entry. */
export function buildMyEvent(input: EventDraftInput, status: EventStatus): MyEvent {
  const ticket = input.tickets[0];
  const shots = input.gallery.filter(Boolean) as string[];
  const times = [input.startTime, input.endTime].filter(Boolean);
  return {
    id: `ev${Date.now()}`,
    title: input.eventName.trim() || "Untitled Event",
    slug: `mynoosa.id/${input.slug || "my-event"}`,
    status,
    dayLabel: dayLabelOf(input.startDate),
    cardDate: input.startTime
      ? `${longDateOf(input.startDate)} | ${input.startTime.replace(":", ".")}`
      : longDateOf(input.startDate),
    detailDate: longDateOf(input.startDate),
    timeRange: times.length === 2 ? `${times[0]} - ${times[1]}` : times[0] || "Time not set",
    startKey: input.startDate,
    endsAt: (input.endDate || input.startDate) ? `${input.endDate || input.startDate}T${input.endTime || "23:59:59"}${input.timeZoneOffset || "+07:00"}` : undefined,
    venue: input.selectedLocation?.name ?? "Location not set",
    venueTag: input.selectedLocation ? "Indoor Area" : "",
    address: input.selectedLocation?.address ?? "",
    price: ticket ? (ticket.paid ? rupiah(ticket.price) : "Free") : "Free",
    organizer: input.hosts[0]?.name ?? "You",
    cover: input.coverUrl,
    gallery: shots.length ? shots : input.coverUrl ? [input.coverUrl] : [null],
    welcomeTitle: input.welcomeTitle.trim() || `Welcome to ${input.hosts[0]?.name ?? "our event"}`,
    welcomeBody: input.welcomeBody.trim() ? input.welcomeBody.split(/\n{2,}/) : [],
    about: input.description,
    hosts: input.hosts.map((h) => ({ name: h.name, avatar: h.avatar })),
    going: 0,
    lat: input.selectedLocation?.lat ?? -6.9139,
    lon: input.selectedLocation?.lon ?? 107.5946,
  };
}

export const isPast = (e: MyEvent) => organizerCardState(e) === "ended";
