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
  { id: "g1", name: "Nina Kartika", email: "nina.kartika@example.com", avatar: avatarNina, ticketType: "Early Bird", status: "registered", group: "approval" },
  { id: "g2", name: "Lara Whitfield", email: "lara.whitfield@domainmail.com", avatar: avatarLara, ticketType: "VIP Access", status: "registered", group: "payment" },
  { id: "g3", name: "Lara Whitfield", email: "lara.whitfield@domainmail.com", avatar: avatarLara, ticketType: "VIP Access", status: "registered", group: "payment" },
  { id: "g4", name: "Lara Whitfield", email: "lara.whitfield@domainmail.com", avatar: avatarLara, ticketType: "Regular", status: "confirmed", group: "list" },
  { id: "g5", name: "Lara Whitfield", email: "lara.whitfield@domainmail.com", avatar: avatarLara, ticketType: "Early Bird", status: "checkedin", group: "list" },
];

/* Registration records behind the Guest Data table. */
export type GuestRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: TicketType;
  answer: string;
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

/** Headline numbers on the Visitor Counter — event-wide, not just the rows shown. */
export const VISITOR_COUNTER = {
  capacity: 80,
  checkedIn: 5,
  confirmed: 2,
  registered: 2,
  canceled: 2,
};
