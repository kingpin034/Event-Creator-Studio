import avatarNina from "../../imports/CreateEvent/e27b6eadc42f49044311dda5785cb9888870d2aa.png";
import avatarLara from "../../imports/CreateEvent/70e45f1a0fc21216d81b88682bd3644cab93d013.png";

export type GuestStatus = "registered" | "confirmed" | "checkedin" | "canceled";
/** Which queue a guest sits in on the check-in screen. */
export type GuestGroup = "approval" | "payment" | "list";
export type TicketType = "Early Bird" | "VIP Access" | "Regular";

export type Guest = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  ticketType: TicketType;
  status: GuestStatus;
  group: GuestGroup;
};

export const SEED_GUESTS: Guest[] = [
  { id: "g1", name: "Nina Kartika", email: "nina.kartika@example.com", avatar: avatarNina, ticketType: "Regular", status: "checkedin", group: "list" },
  { id: "g2", name: "Lara Whitman", email: "lara.whitman@example.com", avatar: avatarLara, ticketType: "Regular", status: "confirmed", group: "list" },
  { id: "g3", name: "Felix Grant", email: "felix.grant@example.com", avatar: avatarLara, ticketType: "Regular", status: "registered", group: "approval" },
  { id: "g4", name: "Milo Jensen", email: "milo.jensen@example.com", avatar: avatarNina, ticketType: "VIP Access", status: "confirmed", group: "list" },
  { id: "g5", name: "Zara Kim", email: "zara.kim@example.com", avatar: avatarLara, ticketType: "VIP Access", status: "checkedin", group: "list" },
  { id: "g6", name: "Evan Brooks", email: "evan.brooks@example.com", avatar: avatarNina, ticketType: "Early Bird", status: "registered", group: "payment" },
  { id: "g7", name: "Nina Patel", email: "nina.patel@example.com", avatar: avatarLara, ticketType: "Early Bird", status: "checkedin", group: "list" },
  { id: "g8", name: "Jasper Lee", email: "jasper.lee@example.com", avatar: avatarNina, ticketType: "Early Bird", status: "canceled", group: "list" },
  { id: "g9", name: "Sofia Ramirez", email: "sofia.ramirez@example.com", avatar: avatarLara, ticketType: "Regular", status: "checkedin", group: "list" },
  { id: "g10", name: "Theo Morgan", email: "theo.morgan@example.com", avatar: avatarNina, ticketType: "Regular", status: "checkedin", group: "list" },
  { id: "g11", name: "Maya Chen", email: "maya.chen@example.com", avatar: avatarLara, ticketType: "Regular", status: "canceled", group: "list" },
];

/* Registration records behind the Guest Data table. */
export type GuestRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: TicketType;
  answer: string;
  answers?: { question: string; value: string | string[] }[];
  lastTicketResend?: { name: string; email: string; phone: string; requestedAt: string; status: "simulated" };
};

const RECORD_NAMES = [
  "Rizky Pratama", "Nina Kartika", "Lara Whitfield", "Budi Santoso", "Ayu Lestari",
  "Dimas Prakoso", "Rina Amelia", "Sari Wulandari", "Andi Nugroho", "Maya Anggraini",
  "Fajar Ramadhan", "Citra Dewi", "Bagus Setiawan", "Putri Handayani", "Yoga Saputra",
  "Intan Permata", "Rio Firmansyah", "Dewi Lestari", "Hendra Wijaya", "Tari Melati",
];
const RECORD_TICKETS: TicketType[] = ["Regular", "Early Bird", "VIP Access"];

export const GUEST_RECORDS: GuestRecord[] = RECORD_NAMES.map((name, i) => ({
  id: `r${i + 1}`,
  name,
  email: `${name.toLowerCase().replace(/\s+/g, ".")}@email.com`,
  phone: `0917358488${String(9700 + i)}`,
  ticketType: RECORD_TICKETS[i % RECORD_TICKETS.length],
  answer: "Sample answer question text from the registration form",
}));

export const EVENT_CAPACITY = 80;

/** Visitor Counter figures, derived so the bar tracks live status changes. */
export function countGuests(guests: Guest[]) {
  const by = (s: GuestStatus) => guests.filter((g) => g.status === s).length;
  return {
    capacity: EVENT_CAPACITY,
    checkedIn: by("checkedin"),
    confirmed: by("confirmed"),
    registered: by("registered"),
    canceled: by("canceled"),
  };
}

export type GuestContact = Pick<GuestRecord, "name" | "email" | "phone">;

/** Explicit allowlist: contact edits cannot change the ticket or registration answers. */
export function updateGuestContact(record: GuestRecord, contact: GuestContact, resend: boolean): GuestRecord {
  const name = contact.name.trim();
  const email = contact.email.trim().toLowerCase();
  const phone = contact.phone.trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+?[\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15) {
    throw new Error("Enter a name, valid email address, and phone number with 7–15 digits.");
  }
  return {
    ...record, name, email, phone,
    ...(resend ? { lastTicketResend: { name, email, phone, requestedAt: new Date().toISOString(), status: "simulated" as const } } : {}),
  };
}
