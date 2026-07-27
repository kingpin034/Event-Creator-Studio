import { createContext, useContext, useState, ReactNode } from "react";
import { buildMyEvent } from "./my-events-data";
import type { MyEvent } from "./my-events-data";
import { SEED_GUESTS } from "./guests-data";
import type { Guest, GuestGroup, GuestStatus } from "./guests-data";
import avatarNina from "../../imports/CreateEvent/e27b6eadc42f49044311dda5785cb9888870d2aa.png";
import avatarSari from "../../imports/CreateEvent/70e45f1a0fc21216d81b88682bd3644cab93d013.png";
import avatarBudi from "../../imports/Desktop/17ceb0c55de24d1473640dd2e87358366a1df7ca.png";
import avatarAyu from "../../imports/EventDate-1/038759c015021f7320dfd77008c9e5ab38c322fb.png";

export type Host = { id: string; name: string; avatar: string; removable: boolean };

/* Mock people directory searched by the Find Co-Host modal. Placeholder data —
   swap for a real endpoint when one exists. */
export type Person = { id: string; name: string; avatar: string };
export const HOST_DIRECTORY: Person[] = [
  { id: "p1", name: "Sari Wulandari", avatar: avatarSari },
  { id: "p2", name: "Sari Handayani", avatar: avatarAyu },
  { id: "p3", name: "Budi Santoso", avatar: avatarBudi },
  { id: "p4", name: "Ayu Lestari", avatar: avatarAyu },
  { id: "p5", name: "Dimas Prakoso", avatar: avatarBudi },
  { id: "p6", name: "Rina Amelia", avatar: avatarSari },
];

/* Mock place directory searched by the Find Location modal. Placeholder data —
   swap for a real geocoding endpoint when one exists. Coordinates are
   approximate — enough to drop a pin on the right block, not survey-grade. */
export type Place = { id: string; name: string; address: string; lat: number; lon: number };
export const LOCATION_DIRECTORY: Place[] = [
  { id: "l1", name: "23 Paskal Shopping Center", address: "23 Paskal Shopping Center, Jalan Pasir Kaliki, Kebon Jeruk, Bandung City, West Java", lat: -6.9139, lon: 107.5946 },
  { id: "l2", name: "Hero Supermarket 23 Paskal", address: "Hero Supermarket 23 Paskal, Jalan Pasir Kaliki, Ciroyom, Bandung City, West Java", lat: -6.9142, lon: 107.5949 },
  { id: "l3", name: "CGV 23 Paskal Shopping Center", address: "CGV 23 Paskal Shopping Center, Jalan Pasir Kaliki, Kebon Jeruk, Bandung City, West Java", lat: -6.9138, lon: 107.5944 },
  { id: "l4", name: "Watsons 23 Paskal", address: "Watsons 23 Paskal, Jalan Pasir Kaliki, Ciroyom, Bandung City, West Java", lat: -6.9140, lon: 107.5947 },
  { id: "l5", name: "M Bloc Space", address: "M Bloc Space, Jalan Panglima Polim Raya No.37, Melawai, South Jakarta", lat: -6.2436, lon: 106.7985 },
  { id: "l6", name: "Senayan City", address: "Senayan City, Jalan Asia Afrika No.19, Gelora, Central Jakarta", lat: -6.2270, lon: 106.7993 },
];

/* The three Indonesian time zones (WIB / WITA / WIT). */
export type TimeZoneOption = { id: string; city: string; offset: string };
export const TIME_ZONES: TimeZoneOption[] = [
  { id: "wib", city: "Jakarta", offset: "GMT +7:00" },
  { id: "wita", city: "Makassar", offset: "GMT +8:00" },
  { id: "wit", city: "Jayapura", offset: "GMT +9:00" },
];

/* Announcements sent to attendees from Manage Event › Blast Message. */
export type Blast = { id: string; sentAt: string; subject: string; body: string };

const SEED_BLASTS: Blast[] = [
  { id: "b1", sentAt: "14/09/2025 | 10.30", subject: "D-2 Launch of New Product Line", body: "Join us for an exclusive preview of our latest innovations! Doors open early for ticket holders." },
  { id: "b2", sentAt: "15/09/2025 | 14.00", subject: "D-1 Final Countdown to Event 2026", body: "Get ready, the big day is almost here! Here's what you need to know before you arrive." },
  { id: "b3", sentAt: "16/09/2025 | 09.00", subject: "Event Day - Opening Remarks", body: "Welcome to Event 2026! We're thrilled to have you here. Opening remarks start at 09.30." },
  { id: "b4", sentAt: "16/09/2025 | 12.00", subject: "Event Day - Keynote Speaker", body: "Don't miss our keynote address by industry leader Jane Doe, starting shortly in the main hall." },
  { id: "b5", sentAt: "17/09/2025 | 15.00", subject: "Post-Event Survey", body: "We value your feedback! Please take a moment to share your thoughts on this year's event." },
];

/* Custom registration questions built in Additional Setting. */
export type QuestionType = "paragraph" | "choice" | "checkbox" | "dropdown";
export type Question = {
  id: string;
  type: QuestionType;
  title: string;
  placeholder: string;
  options: string[];
  multiple: boolean;
  required: boolean;
};

export type Ticket = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  paid: boolean;
  price: number;
  open: boolean;
};

/* Which screen the shell is showing. State-based rather than routed — keeps the
   whole in-memory form intact when you navigate away and back. */
export type Page = "create" | "discover" | "tickets" | "events" | "manage" | "checkin" | "withdraw";

type EventState = {
  page: Page;
  setPage: (p: Page) => void;
  /** Event currently open in the Manage Event dashboard. */
  manageEvent: MyEvent | null;
  openManage: (e: MyEvent) => void;
  /** Take the event open in Manage from draft to published. */
  publishManagedEvent: () => void;
  /** Full-screen scanner; remembers where it was opened from. */
  openCheckIn: () => void;
  closeCheckIn: () => void;
  /** Withdraw form; also returns to wherever it was opened from. */
  openWithdraw: () => void;
  closeWithdraw: () => void;
  activeTab: "discover" | "tickets" | "events";
  setActiveTab: (t: EventState["activeTab"]) => void;
  language: "id" | "en";
  setLanguage: (l: "id" | "en") => void;

  eventName: string;
  setEventName: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;

  startDate: string;
  setStartDate: (v: string) => void;
  startTime: string;
  setStartTime: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  endTime: string;
  setEndTime: (v: string) => void;
  timeZone: TimeZoneOption;
  setTimeZone: (t: TimeZoneOption) => void;

  description: string;
  setDescription: (v: string) => void;
  formats: Record<string, boolean>;
  toggleFormat: (k: string) => void;

  payment: string;
  setPayment: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;

  registrationOpen: boolean;
  setRegistrationOpen: (v: boolean) => void;
  needVerification: boolean;
  setNeedVerification: (v: boolean) => void;
  isPrivate: boolean;
  setIsPrivate: (v: boolean) => void;
  additionalOpen: boolean;
  setAdditionalOpen: (v: boolean) => void;
  welcomeAdded: boolean;
  setWelcomeAdded: (v: boolean) => void;
  welcomeTitle: string;
  setWelcomeTitle: (v: string) => void;
  welcomeBody: string;
  setWelcomeBody: (v: string) => void;
  welcomeFormats: Record<string, boolean>;
  toggleWelcomeFormat: (k: string) => void;
  blasts: Blast[];
  addBlast: (subject: string, body: string) => void;
  guests: Guest[];
  setGuestStatus: (id: string, status: GuestStatus, group?: GuestGroup) => void;
  myEvents: MyEvent[];
  /** Snapshot the form into My Events and jump there. */
  submitEvent: (status: "draft" | "published") => void;
  questions: Question[];
  addQuestion: (t: QuestionType) => void;
  updateQuestion: (id: string, patch: Partial<Question>) => void;
  removeQuestion: (id: string) => void;

  onlineEvent: boolean;
  setOnlineEvent: (v: boolean) => void;
  selectedLocation: Place | null;
  setSelectedLocation: (p: Place | null) => void;
  platform: string;
  setPlatform: (v: string) => void;
  eventUrl: string;
  setEventUrl: (v: string) => void;
  locationNotes: string;
  setLocationNotes: (v: string) => void;

  agreed: boolean;
  setAgreed: (v: boolean) => void;

  hosts: Host[];
  addHost: (p: Person) => void;
  removeHost: (id: string) => void;

  tickets: Ticket[];
  addTicket: (t: Omit<Ticket, "id">) => void;
  updateTicket: (id: string, t: Omit<Ticket, "id">) => void;
  removeTicket: (id: string) => void;

  coverUrl: string | null;
  setCoverUrl: (v: string | null) => void;
  gallery: (string | null)[];
  setGalleryAt: (i: number, v: string | null) => void;
};

const Ctx = createContext<EventState | null>(null);

export function useEvent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEvent must be used within EventProvider");
  return ctx;
}

export function EventProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("create");
  const [activeTab, setActiveTab] = useState<EventState["activeTab"]>("discover");
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [eventName, setEventName] = useState("");
  const [slug, setSlug] = useState("my-event");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeZone, setTimeZone] = useState<TimeZoneOption>(TIME_ZONES[0]);
  const [description, setDescription] = useState("");
  const [formats, setFormats] = useState<Record<string, boolean>>({});
  const [payment, setPayment] = useState("automatic");
  const [category, setCategory] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [needVerification, setNeedVerification] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const [welcomeAdded, setWelcomeAdded] = useState(false);
  const [welcomeTitle, setWelcomeTitle] = useState("");
  const [welcomeBody, setWelcomeBody] = useState("");
  const [welcomeFormats, setWelcomeFormats] = useState<Record<string, boolean>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  // Starts empty — the list fills up as events are saved or published.
  const [myEvents, setMyEvents] = useState<MyEvent[]>([]);
  const [manageEvent, setManageEvent] = useState<MyEvent | null>(null);
  const [blasts, setBlasts] = useState<Blast[]>(SEED_BLASTS);
  const [guests, setGuests] = useState<Guest[]>(SEED_GUESTS);

  // Confirming or approving a guest moves them into the main guest list.
  const setGuestStatus = (id: string, status: GuestStatus, group?: GuestGroup) =>
    setGuests((gs) => gs.map((g) => (g.id === id ? { ...g, status, group: group ?? g.group } : g)));

  const addBlast = (subject: string, body: string) => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    const sentAt = `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} | ${p(d.getHours())}.${p(d.getMinutes())}`;
    setBlasts((list) => [...list, { id: `b${Date.now()}`, sentAt, subject, body }]);
  };
  const [onlineEvent, setOnlineEvent] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [platform, setPlatform] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [locationNotes, setLocationNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [hosts, setHosts] = useState<Host[]>([
    { id: "h1", name: "Nina Kartika", avatar: avatarNina, removable: false },
  ]);
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "t1", name: "Default Ticket", description: "", capacity: 50, paid: true, price: 50000, open: true },
  ]);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<(string | null)[]>([null, null, null, null]);

  const toggleFormat = (k: string) => setFormats((f) => ({ ...f, [k]: !f[k] }));
  const toggleWelcomeFormat = (k: string) => setWelcomeFormats((f) => ({ ...f, [k]: !f[k] }));
  // Choice-style questions start with two filled options plus one empty row,
  // matching the design's "Option Label" placeholder.
  const addQuestion = (type: QuestionType) =>
    setQuestions((qs) => [
      ...qs,
      {
        id: `q${Date.now()}`,
        type,
        title: "",
        placeholder: "",
        options: type === "paragraph" ? [] : ["Option 1", "Option 2", ""],
        multiple: false,
        required: false,
      },
    ]);
  const updateQuestion = (id: string, patch: Partial<Question>) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  const removeQuestion = (id: string) => setQuestions((qs) => qs.filter((q) => q.id !== id));

  const submitEvent = (status: "draft" | "published") => {
    const entry = buildMyEvent(
      {
        eventName, slug, startDate, startTime, endDate, endTime,
        description, welcomeTitle, welcomeBody,
        coverUrl, gallery, selectedLocation, tickets, hosts,
      },
      status,
    );
    setMyEvents((list) => [entry, ...list]);
    setPage("events");
    setActiveTab("events");
  };

  const openManage = (e: MyEvent) => {
    setManageEvent(e);
    setPage("manage");
  };

  // Shared by the full-page sub-flows: remember what to go back to.
  const [returnTo, setReturnTo] = useState<Page>("manage");
  const openCheckIn = () => {
    setReturnTo(page);
    setPage("checkin");
  };
  const closeCheckIn = () => setPage(returnTo);
  const openWithdraw = () => {
    setReturnTo(page);
    setPage("withdraw");
  };
  const closeWithdraw = () => setPage(returnTo);

  const publishManagedEvent = () => {
    setManageEvent((e) => (e ? { ...e, status: "published" } : e));
    setMyEvents((list) =>
      list.map((e) => (e.id === manageEvent?.id ? { ...e, status: "published" } : e)),
    );
  };
  const addHost = (p: Person) =>
    setHosts((h) => (h.some((x) => x.id === p.id) ? h : [...h, { ...p, removable: true }]));
  const removeHost = (id: string) => setHosts((h) => h.filter((x) => x.id !== id));
  const addTicket = (t: Omit<Ticket, "id">) =>
    setTickets((ts) => [...ts, { ...t, id: `t${Date.now()}` }]);
  const updateTicket = (id: string, t: Omit<Ticket, "id">) =>
    setTickets((ts) => ts.map((x) => (x.id === id ? { ...t, id } : x)));
  const removeTicket = (id: string) => setTickets((ts) => ts.filter((x) => x.id !== id));
  const setGalleryAt = (i: number, v: string | null) =>
    setGallery((g) => g.map((x, idx) => (idx === i ? v : x)));

  const value: EventState = {
    page, setPage, manageEvent, openManage, publishManagedEvent,
    openCheckIn, closeCheckIn, openWithdraw, closeWithdraw,
    activeTab, setActiveTab, language, setLanguage,
    eventName, setEventName, slug, setSlug,
    startDate, setStartDate, startTime, setStartTime, endDate, setEndDate, endTime, setEndTime,
    timeZone, setTimeZone,
    description, setDescription, formats, toggleFormat,
    payment, setPayment, category, setCategory,
    registrationOpen, setRegistrationOpen, needVerification, setNeedVerification,
    isPrivate, setIsPrivate, additionalOpen, setAdditionalOpen,
    welcomeAdded, setWelcomeAdded, welcomeTitle, setWelcomeTitle,
    welcomeBody, setWelcomeBody, welcomeFormats, toggleWelcomeFormat,
    questions, addQuestion, updateQuestion, removeQuestion,
    myEvents, submitEvent, blasts, addBlast, guests, setGuestStatus,
    onlineEvent, setOnlineEvent, selectedLocation, setSelectedLocation,
    platform, setPlatform, eventUrl, setEventUrl,
    locationNotes, setLocationNotes,
    agreed, setAgreed, hosts, addHost, removeHost,
    tickets, addTicket, updateTicket, removeTicket,
    coverUrl, setCoverUrl, gallery, setGalleryAt,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
