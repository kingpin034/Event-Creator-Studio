import { useEvent } from "./event-context";

function FlagID() {
  return (
    <svg className="size-[20px]" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="10" fill="#DC1F26" />
      <rect y="10" width="20" height="10" fill="#EEEEEE" />
    </svg>
  );
}

function FlagUS() {
  return (
    <svg className="size-[20px]" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" fill="#EEEEEE" />
      <g fill="#B22334">
        <rect width="20" height="1.54" y="0" />
        <rect width="20" height="1.54" y="3.08" />
        <rect width="20" height="1.54" y="6.15" />
        <rect width="20" height="1.54" y="9.23" />
        <rect width="20" height="1.54" y="12.31" />
        <rect width="20" height="1.54" y="15.38" />
        <rect width="20" height="1.54" y="18.46" />
      </g>
      <rect width="9" height="9.23" fill="#3C3B6E" />
    </svg>
  );
}

const links = ["Discover", "About", "Terms of Service", "Privacy Policy", "Feedback"];

export function Footer() {
  const { language, setLanguage } = useEvent();
  return (
    <div className="bg-[#f4f4f4] border-t border-[#d9d9d9] w-full">
      <div className="flex flex-col items-center px-[16px] phone:px-[20px] tablet:px-[32px] py-[16px]">
        <div className="flex flex-col tablet:flex-row gap-[12px] items-center justify-center tablet:justify-between max-w-[1440px] relative w-full">
          {/* Language switcher */}
          <div className="bg-[#fbfbfb] content-stretch flex items-center relative rounded-[12px] shrink-0 border border-[#d9d9d9]">
            <button
              type="button"
              onClick={() => setLanguage("id")}
              className={`flex gap-[4px] items-center justify-center px-[24px] py-[10px] rounded-[12px] cursor-pointer ${
                language === "id" ? "bg-[#f7e9e9] border border-[#d8444b]" : ""
              }`}
            >
              <FlagID />
              <span className="font-medium text-[#414141] text-[14px] whitespace-nowrap">Bahasa</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`flex gap-[4px] items-center justify-center px-[24px] py-[10px] rounded-[12px] cursor-pointer ${
                language === "en" ? "bg-[#f7e9e9] border border-[#d8444b]" : ""
              }`}
            >
              <FlagUS />
              <span className="font-medium text-[#414141] text-[14px] whitespace-nowrap">English</span>
            </button>
          </div>

          {/* Links */}
          <div className="content-center flex flex-wrap gap-[16px] items-center justify-center tablet:flex-[1_0_0] relative text-[#414141] text-[14px] text-center">
            {links.map((l) => (
              <a key={l} href="#" className="font-normal leading-[1.3] whitespace-nowrap hover:text-[#d8444b]">
                {l}
              </a>
            ))}
          </div>

          {/* Separator on stacked layouts */}
          <div className="h-px bg-[#cccccc] w-full tablet:hidden" />

          <p className="font-normal leading-[1.3] text-[#414141] text-[14px] text-center whitespace-nowrap">
            ©2026 Noosa. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
