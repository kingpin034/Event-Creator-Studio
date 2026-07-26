import svgPaths from "./svg-4e5a5wgmvr";

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 w-[74px]">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] relative shrink-0 text-[#131313] text-[18px] w-full">Jakarta</p>
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[#9e9e9e] text-[14px] w-full">GMT +7:00</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-center flex flex-[1_0_0] flex-wrap gap-[24px_8px] items-center min-w-px relative" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="globe">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
              <path d={svgPaths.p10ac6280} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame />
    </div>
  );
}

export default function TimeZone() {
  return (
    <div className="bg-[#fbfbfb] content-stretch flex items-center p-[16px] relative rounded-[16px] size-full" data-name="Time Zone">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container />
    </div>
  );
}