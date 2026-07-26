import { Compass, Ticket, CalendarCheck, Plus, Search, Bell } from "lucide-react";
import svgPaths from "../../imports/Desktop/svg-p6j7kxcoso";
import avatar from "../../imports/Desktop/70e45f1a0fc21216d81b88682bd3644cab93d013.png";
import { useEvent } from "./event-context";

function Logo() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="h-[40px] relative shrink-0 w-[40.004px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.0039 40">
          <path clipRule="evenodd" d={svgPaths.p1c3cb240} fill="#D8444B" fillRule="evenodd" />
        </svg>
      </div>
      <div className="h-[21.177px] relative shrink-0 w-[97.655px] hidden phone:block">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97.6553 21.1768">
          <path d={svgPaths.p10f644a0} fill="#131313" />
        </svg>
      </div>
    </div>
  );
}

const tabs = [
  { id: "discover", label: "Discover", Icon: Compass },
  { id: "tickets", label: "Tickets", Icon: Ticket },
  { id: "events", label: "My Events", Icon: CalendarCheck },
] as const;

function TabNav() {
  const { activeTab, setActiveTab, setPage } = useEvent();
  return (
    <div className="hidden laptop:flex bg-[#e4e4e4] items-center max-w-[456px] min-w-[456px] w-[456px] relative rounded-[999px] shrink-0">
      {tabs.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              setActiveTab(id);
              setPage(id);
            }}
            className={`flex-[1_0_0] min-w-[152px] relative rounded-[999px] cursor-pointer ${active ? "bg-[#d8444b]" : ""}`}
          >
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[10px]">
              <Icon className="size-[20px]" strokeWidth={1.5} color={active ? "#fbfbfb" : "#414141"} />
              <p className={`font-medium leading-none text-[16px] whitespace-nowrap ${active ? "text-[#fbfbfb]" : "text-[#414141]"}`}>
                {label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="bg-[#e4e4e4] border border-[#d9d9d9] flex items-center justify-center p-[10px] relative rounded-[999px] shrink-0 cursor-pointer"
    >
      {children}
    </button>
  );
}

export function NavBar() {
  const { setPage, setActiveTab } = useEvent();
  return (
    // Sticky rather than fixed: stays pinned while scrolling but keeps its slot
    // in the flow, so nothing needs padding to compensate. Below the z-50 modals.
    <div className="bg-[#f4f4f4] border-b border-[#d9d9d9] w-full sticky top-0 z-40">
      <div className="flex flex-col items-center px-[16px] phone:px-[20px] tablet:px-[32px] py-[16px]">
        <div className="content-stretch flex items-center justify-between max-w-[1440px] relative w-full">
          <Logo />
          <TabNav />
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
            <button
              type="button"
              // Create Event isn't a tab; reset the pill to its default so a
              // stale tab doesn't read as the current page.
              onClick={() => {
                setPage("create");
                setActiveTab("discover");
              }}
              className="bg-[#e4e4e4] border border-[#d9d9d9] laptop:border-0 content-stretch flex gap-[8px] items-center justify-center p-[10px] laptop:px-[16px] relative rounded-[999px] laptop:rounded-[16px] shrink-0 cursor-pointer"
            >
              <Plus className="size-[20px]" strokeWidth={1.5} color="#131313" />
              <p className="hidden laptop:block font-medium leading-none text-[#131313] text-[16px] whitespace-nowrap">Create Event</p>
            </button>
            <IconBtn>
              <Search className="size-[20px]" strokeWidth={1.5} color="#131313" />
            </IconBtn>
            <IconBtn>
              <Bell className="size-[20px]" strokeWidth={1.5} color="#131313" />
            </IconBtn>
            <div className="relative rounded-[999px] shrink-0 size-[40px] border border-[#d9d9d9] overflow-hidden">
              <img alt="profile" className="absolute inset-0 size-full object-cover" src={avatar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
