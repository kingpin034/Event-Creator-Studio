import { Image as ImageIcon, Images, Upload } from "lucide-react";
import { useRef } from "react";
import { SectionCard, UploadZone } from "./primitives";
import { useEvent } from "./event-context";
import { HostsCard } from "./right-column";

function TertiaryButton({
  icon, label, onClick, disabled,
}: { icon: React.ReactNode; label: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-[#e4e4e4] rounded-[16px] w-full content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[18px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="[&>svg]:size-[20px] [&>svg]:text-[#131313]">{icon}</span>
      <p className="font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">{label}</p>
    </button>
  );
}

export function ImageCoverCard() {
  const { coverUrl, setCoverUrl } = useEvent();
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <SectionCard icon={<ImageIcon strokeWidth={1.5} />} title="Image Cover" subtitle="Just like Instagram's 3:4 ratio">
      <UploadZone
        preview={coverUrl}
        onSelect={setCoverUrl}
        onRemove={() => setCoverUrl(null)}
        className="aspect-[540/675] w-full shrink-0"
      />
      {/* Same action as tapping the drop zone; replaces the cover when one is already set. */}
      <TertiaryButton
        icon={<Upload strokeWidth={1.5} />}
        label="Upload Cover"
        onClick={() => fileRef.current?.click()}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setCoverUrl(URL.createObjectURL(file));
          e.target.value = ""; // allow re-picking the same file
        }}
      />
    </SectionCard>
  );
}

export function GalleryCard() {
  const { gallery, setGalleryAt } = useEvent();
  const fileRef = useRef<HTMLInputElement>(null);
  const nextEmpty = gallery.findIndex((g) => g === null);
  return (
    <SectionCard icon={<Images strokeWidth={1.5} />} title="Gallery" subtitle="Add another 4 image if you want">
      <div className="flex gap-[8px] items-center overflow-x-auto w-full">
        {gallery.map((g, i) => (
          <UploadZone
            key={i}
            preview={g}
            onSelect={(url) => setGalleryAt(i, url)}
            onRemove={() => setGalleryAt(i, null)}
            className="h-[250px] w-[200px] shrink-0"
          />
        ))}
      </div>
      {/* Fills the next empty slot — same action as tapping that slot directly. */}
      <TertiaryButton
        icon={<Upload strokeWidth={1.5} />}
        label="Upload Gallery"
        onClick={() => fileRef.current?.click()}
        disabled={nextEmpty === -1}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && nextEmpty !== -1) setGalleryAt(nextEmpty, URL.createObjectURL(file));
          e.target.value = ""; // allow re-picking the same file
        }}
      />
    </SectionCard>
  );
}

export function LeftColumn({ className = "" }: { className?: string }) {
  return (
    <div className={`content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start max-w-[540px] min-w-px relative w-full ${className}`}>
      <ImageCoverCard />
      <GalleryCard />
      <HostsCard />
    </div>
  );
}
