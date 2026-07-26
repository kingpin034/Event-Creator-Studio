import svgPaths from "./svg-ak5eqjzv86";

function Dot() {
  return <div className="aspect-[12/12] bg-[#d8444b] relative rounded-[999px] shrink-0 w-full" data-name="Dot" />;
}

function Timeline1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Timeline">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pt-[8px] relative size-full">
          <Dot />
          <div className="flex-[1_0_0] min-h-px relative w-0" data-name="Line">
            <div className="absolute inset-[0_-0.75px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5 20">
                <path d="M0.75 0V20" id="Line" stroke="var(--stroke-0, #D8444B)" strokeDasharray="3 3" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dot1() {
  return <div className="aspect-[12/12] bg-[#d8444b] relative rounded-[999px] shrink-0 w-full" data-name="Dot" />;
}

function Timeline2() {
  return (
    <div className="relative size-full" data-name="Timeline">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pt-[8px] relative size-full">
          <Dot1 />
          <div className="flex-[1_0_0] min-h-px relative w-0" data-name="Line">
            <div className="absolute inset-[0_-0.75px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5 20">
                <path d="M0.75 0V20" id="Line" stroke="var(--stroke-0, #D8444B)" strokeDasharray="3 3" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[16px]" data-name="Timeline">
      <Timeline1 />
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative w-full">
        <div className="-scale-y-100 flex-none size-full">
          <Timeline2 />
        </div>
      </div>
    </div>
  );
}

function DatePicker1() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex items-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Date Picker">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#9e9e9e] text-[16px] whitespace-nowrap">dd/mm/yyyy</p>
    </div>
  );
}

function TimePicker() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex items-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Time Picker">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#9e9e9e] text-[16px] whitespace-nowrap">00:00</p>
    </div>
  );
}

function Start1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Start">
      <DatePicker1 />
      <TimePicker />
    </div>
  );
}

function Start() {
  return (
    <div className="content-center flex flex-wrap gap-y-[8px] items-center justify-between relative shrink-0 w-full" data-name="Start">
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] min-w-[96px] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Start Event</p>
      <Start1 />
    </div>
  );
}

function DatePicker2() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex items-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Date Picker">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#9e9e9e] text-[16px] whitespace-nowrap">dd/mm/yyyy</p>
    </div>
  );
}

function TimePicker1() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex items-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Time Picker">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#9e9e9e] text-[16px] whitespace-nowrap">00:00</p>
    </div>
  );
}

function End1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="End">
      <DatePicker2 />
      <TimePicker1 />
    </div>
  );
}

function End() {
  return (
    <div className="content-center flex flex-wrap gap-y-[8px] items-center justify-between relative shrink-0 w-full" data-name="End">
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] min-w-[96px] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">End Event</p>
      <End1 />
    </div>
  );
}

function Date() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Date">
      <Start />
      <End />
    </div>
  );
}

function DatePicker() {
  return (
    <div className="bg-[#fbfbfb] flex-[1_0_0] max-w-[783px] min-w-[288px] relative rounded-[16px]" data-name="Date Picker">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[16px] relative size-full">
          <div className="flex flex-row items-center self-stretch">
            <Timeline />
          </div>
          <Date />
        </div>
      </div>
    </div>
  );
}

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

function TimeZone() {
  return (
    <div className="bg-[#fbfbfb] content-stretch flex items-center max-w-[783px] min-w-[120px] p-[16px] relative rounded-[16px] shrink-0 w-[120px]" data-name="Time Zone">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container />
    </div>
  );
}

export default function EventDate() {
  return (
    <div className="content-center flex flex-wrap gap-[16px] items-center relative size-full" data-name="Event Date">
      <DatePicker />
      <TimeZone />
    </div>
  );
}