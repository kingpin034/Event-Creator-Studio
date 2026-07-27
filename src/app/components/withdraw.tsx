import { useState } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useEvent } from "./event-context";

const FIELD =
  "bg-[#f4f4f4] border border-[#d9d9d9] focus:border-[#d8444b] rounded-[16px] w-full p-[16px] font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e] outline-none";

function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
      <p className="font-semibold leading-[1.2] text-[#131313] text-[18px]">
        {label}
        <span className="text-[#d8444b]"> *</span>
      </p>
      {children}
    </div>
  );
}

function rupiah(n: number) {
  return n ? n.toLocaleString("id-ID") : "";
}

export function Withdraw() {
  const { manageEvent, closeWithdraw } = useEvent();
  const [recipient, setRecipient] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);

  const ready = recipient.trim() && bank.trim() && account.trim() && amount > 0;

  return (
    <div className="flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] py-[32px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[868px] w-full">
        {/* Labelled pill back, matching the one on the My Events detail. */}
        <button
          type="button"
          onClick={closeWithdraw}
          aria-label="Back"
          className="bg-[#e4e4e4] border border-[#d9d9d9] flex gap-[8px] items-center px-[16px] py-[10px] rounded-[999px] shrink-0 cursor-pointer"
        >
          <ArrowLeft className="size-[20px] shrink-0" strokeWidth={1.5} color="#131313" />
          <span className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Ticket Transaction</span>
        </button>

        {/* Header: the event being withdrawn from. */}
        <div className="content-stretch flex flex-col gap-[2px] items-start w-full">
          <p className="font-semibold leading-[1.2] text-[#131313] text-[28px]">
            {manageEvent?.title ?? "Untitled Event"}
          </p>
          <p className="font-normal leading-[1.3] text-[#9e9e9e] text-[16px] break-words">
            {manageEvent?.slug ?? "mynoosa.id/my-event"}
          </p>
        </div>

        <div className="h-px w-full bg-[#d9d9d9]" />

        <div className="content-stretch flex flex-col gap-[16px] items-start w-full">
          <Field label="Nama penerima">
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Nama sesuai buku rekening"
              autoComplete="off"
              className={FIELD}
            />
          </Field>

          <Field label="Nama bank">
            <input
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              placeholder="Contoh: BCA, Mandiri, BNI"
              autoComplete="off"
              className={FIELD}
            />
          </Field>

          <Field label="Nomor rekening">
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="Masukkan nomor rekening"
              inputMode="numeric"
              autoComplete="off"
              className={FIELD}
            />
          </Field>

          <Field label="Nominal yang ingin ditarik">
            <div className="bg-[#f4f4f4] border border-[#d9d9d9] focus-within:border-[#d8444b] rounded-[16px] w-full content-stretch flex gap-[8px] items-center px-[16px] py-[16px]">
              <span className="font-medium leading-none text-[#131313] text-[16px] shrink-0">Rp</span>
              <input
                value={rupiah(amount)}
                onChange={(e) => setAmount(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
                placeholder="0"
                inputMode="numeric"
                autoComplete="off"
                className="bg-transparent outline-none flex-1 min-w-px font-normal leading-[1.3] text-[16px] text-[#131313] placeholder:text-[#9e9e9e]"
              />
            </div>
          </Field>
        </div>

        <button
          type="button"
          disabled={!ready}
          onClick={closeWithdraw}
          className={`bg-[#d8444b] rounded-[16px] w-full flex gap-[8px] items-center justify-center px-[32px] py-[18px] ${
            ready ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <CreditCard className="size-[20px] shrink-0" strokeWidth={1.5} color="#FBFBFB" />
          <span className="font-medium leading-none text-[#fbfbfb] text-[16px]">Withdraw</span>
        </button>
      </div>
    </div>
  );
}
