import { NavBar } from "./nav-bar";
import { Footer } from "./footer";
import { LeftColumn } from "./left-column";
import { RightColumn, BottomActions } from "./right-column";
import { useEvent } from "./event-context";
import type { Page } from "./event-context";
import { MyEventsPage } from "./my-events";
import { ManageEventPage } from "./manage-event";

const PAGE_NAMES: Record<Exclude<Page, "create">, string> = {
  discover: "Discover",
  tickets: "Tickets",
  events: "My Events",
};

/* Blank canvas for the screens that haven't been designed yet. */
function PlaceholderPage({ name }: { name: string }) {
  return (
    <div className="flex flex-1 items-center justify-center w-full px-[16px] py-[64px]">
      <p className="font-semibold leading-[1.2] text-[#9e9e9e] text-[28px] tablet:text-[48px] text-center">{name}</p>
    </div>
  );
}

function CreateEventPage() {
  return (
    <>
      {/* Soft brand-tinted washes bleeding in from the nav bar and the footer.
          Placed before the content so they paint behind it; the modals are
          fixed/z-50 and sit above both. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-[#d8444b]/[0.07] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px] bg-gradient-to-t from-[#d8444b]/[0.07] to-transparent"
      />
      <div className="relative flex justify-center w-full px-[16px] phone:px-[20px] tablet:px-[32px] pt-[32px] tablet:pt-[64px] pb-[64px]">
        <div className="flex flex-col tablet:flex-row gap-[32px] tablet:gap-[16px] laptop:gap-[32px] items-start max-w-[1440px] w-full">
          <LeftColumn className="order-2 tablet:order-1" />
          <RightColumn className="order-1 tablet:order-2" />
          {/* Phone-only: agreement + actions at the very bottom, below Cover/Gallery/Location. */}
          <BottomActions className="flex tablet:hidden order-3" />
        </div>
      </div>
    </>
  );
}

/* App shell: nav + footer stay put, the middle swaps per page. */
export function CreateEvent() {
  const { page } = useEvent();
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfb]">
      <NavBar />
      <main className="bg-[#fbfbfb] flex justify-center w-full flex-1 relative">
        {page === "create" && <CreateEventPage />}
        {page === "events" && <MyEventsPage />}
        {page === "manage" && <ManageEventPage />}
        {(page === "discover" || page === "tickets") && <PlaceholderPage name={PAGE_NAMES[page]} />}
      </main>
      <Footer />
    </div>
  );
}
