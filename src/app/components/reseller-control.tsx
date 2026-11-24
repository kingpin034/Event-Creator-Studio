import { useState } from "react";
import { Info, MailPlus, Scissors, Settings2 } from "lucide-react";
import { useEvent } from "./event-context";
import type { Reseller } from "./resellers-data";
import { DashedSeparator } from "./primitives";
import { InviteResellerModal } from "./invite-reseller-modal";
import { ConfirmModal } from "./confirm-modal";
import avatar from "../../imports/CreateEvent/70e45f1a0fc21216d81b88682bd3644cab93d013.png";

const rupiah = (value: number) => `Rp${value.toLocaleString("id-ID")}`;
const primary = "bg-[#d8444b] rounded-[16px] flex gap-[8px] items-center justify-center px-[16px] py-[12px] font-medium text-[#fbfbfb] text-[16px] cursor-pointer";

export function ResellerControl() {
  const { resellers, setResellers } = useEvent();
  const [editing, setEditing] = useState<Reseller | "invite" | null>(null);
  const [disconnecting, setDisconnecting] = useState<Reseller | null>(null);
  const [notice, setNotice] = useState("");
  const visible = resellers.filter((r) => r.status !== "disconnected");
  const selected = editing && editing !== "invite" ? editing : null;
  const totals = resellers.reduce((total, r) => ({ sold: total.sold + r.sold, revenue: total.revenue + r.revenue }), { sold: 0, revenue: 0 });

  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="flex flex-col gap-[32px] items-start max-w-[868px] w-full min-w-0">
        <div className="flex flex-wrap gap-[16px] items-center justify-between w-full">
          <h1 className="font-semibold leading-[1.2] text-[#131313] text-[24px]">Reseller Control</h1>
          <button type="button" className={primary} onClick={() => { setEditing("invite"); }}>
            <MailPlus className="size-[20px] shrink-0" strokeWidth={1.5} />Invite Reseller
          </button>
        </div>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-[16px] w-full">
          {[{ label: "Tickets Sold by Reseller", value: totals.sold.toLocaleString("id-ID"), hint: "All reseller sales, including disconnected resellers." }, { label: "Total Revenue", value: rupiah(totals.revenue), hint: "Reseller ticket revenue before commission, including past sales." }].map((stat) => (
            <div key={stat.label} className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] p-[16px] min-w-0">
              <div className="flex justify-between gap-[8px] items-start">
                <p className="text-[#414141] text-[16px] font-medium">{stat.label}</p>
                <span tabIndex={0} title={stat.hint} aria-label={stat.hint} className="shrink-0 text-[#9e9e9e]"><Info className="size-[20px]" strokeWidth={1.5} /></span>
              </div>
              <p className="text-[#131313] text-[24px] font-semibold break-all">{stat.value}</p>
            </div>
          ))}
        </div>
        {notice && <p role="status" className="text-[14px] text-[#414141]">{notice}</p>}
        <section className="flex flex-col gap-[12px] w-full" aria-labelledby="reseller-list-title">
          <h2 id="reseller-list-title" className="font-semibold text-[#131313] text-[18px]">Reseller List ({visible.length})</h2>
          {visible.length === 0 && <p className="rounded-[16px] border border-[#d9d9d9] p-[24px] text-[16px] text-[#414141]">No resellers yet. Invite a reseller to start selling tickets together.</p>}
          {visible.map((reseller) => (
            <article key={reseller.id} className="bg-[#f4f4f4] border border-[#d9d9d9] rounded-[16px] p-[16px] flex flex-col gap-[12px]">
              <div className="flex flex-wrap gap-[12px] items-center justify-between">
                <div className="flex gap-[8px] items-center min-w-0 flex-1 basis-[200px]">
                  <img src={avatar} alt="" className="size-[40px] rounded-full border border-[#d9d9d9] shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#131313] text-[18px] break-words">{reseller.name}</h3>
                    <p className="text-[#9e9e9e] text-[14px] break-all">{reseller.email}</p>
                    {reseller.status === "pending" && <p className="text-[#b97e12] text-[14px]">Invitation pending</p>}
                  </div>
                </div>
                <div className="flex gap-[8px]">
                  <button type="button" aria-label={`Disconnect ${reseller.name}`} title="Disconnect reseller" onClick={() => setDisconnecting(reseller)} className="bg-[#f42d2d] border border-[#fae6e6] rounded-full size-[40px] flex items-center justify-center text-[#fbfbfb] cursor-pointer"><Scissors className="size-[20px]" strokeWidth={1.5} /></button>
                  <button type="button" aria-label={`Settings for ${reseller.name}`} title="Reseller settings" onClick={() => { setEditing(reseller); }} className="bg-[#e4e4e4] border border-[#d9d9d9] rounded-full size-[40px] flex items-center justify-center text-[#131313] cursor-pointer"><Settings2 className="size-[20px]" strokeWidth={1.5} /></button>
                </div>
              </div>
              <DashedSeparator />
              <dl className="grid grid-cols-1 tablet:grid-cols-3 gap-[12px]">
                {[['Commission', rupiah(reseller.revenue * reseller.commissionRate / 100)], ['Ticket revenue', rupiah(reseller.revenue)], ['Tickets sold', `${reseller.sold} / ${reseller.capacity}`]].map(([label, value]) => (
                  <div key={label} className="min-w-0"><dt className="text-[#9e9e9e] text-[14px]">{label}</dt><dd className="text-[#131313] text-[16px] break-words">{value}</dd></div>
                ))}
              </dl>
            </article>
          ))}
        </section>
      </div>
      <InviteResellerModal open={editing === "invite"} onClose={() => setEditing(null)} onInvited={(email) => {
        setNotice(`${email} added as a pending reseller. This prototype does not send emails.`);
        setEditing(null);
      }} />
      <InviteResellerModal open={selected !== null} reseller={selected ?? undefined} onClose={() => setEditing(null)} onInvited={() => {
        setNotice(`Settings saved for ${selected?.name}.`);
        setEditing(null);
      }} />
      <ConfirmModal open={disconnecting !== null} icon={<Scissors strokeWidth={1.5} />} title="Disconnect Reseller?" description={`Remove ${disconnecting?.name ?? "this reseller"} from the reseller list? Past sales remain in your totals.`} confirmLabel="Disconnect Reseller" onClose={() => setDisconnecting(null)} onConfirm={() => {
        setResellers(resellers.map((r) => r.id === disconnecting?.id ? { ...r, status: "disconnected" } : r));
        setNotice(`${disconnecting?.name} disconnected.`);
        setDisconnecting(null);
      }} />
    </div>
  );
}
