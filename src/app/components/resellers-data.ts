export type ResellerTicketAccess = { ticketId: string; quota: number; price: number; allowed?: boolean };

export type Reseller = {
  id: string;
  name: string;
  email: string;
  commissionRate: number;
  capacity: number;
  sold: number;
  revenue: number;
  ticketAccess?: ResellerTicketAccess[];
  status: "active" | "pending" | "disconnected";
};

// Sample sales for the local prototype, consistent with the other dashboard sections.
export const SEED_RESELLERS: Reseller[] = [
  "Alya Putri", "Dewi Lestari", "Sari Wulandari", "Rani Pratama", "Maya Permata", "Intan Pertiwi",
].map((name, index) => ({
  id: `reseller-${index + 1}`,
  name,
  email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
  commissionRate: 5,
  capacity: 120,
  sold: 96 - index * 12,
  revenue: (96 - index * 12) * 100000,
  status: "active",
}));
