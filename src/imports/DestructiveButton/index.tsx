import svgPaths from "./svg-46fn52bezo";

export default function DestructiveButton() {
  return (
    <div className="bg-[#f42d2d] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] size-full" data-name="Destructive-Button">
      <div aria-hidden className="absolute border border-[#fae6e6] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="trash-2">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-4.5%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 18.1667">
              <path d={svgPaths.p5d17b80} id="Vector" stroke="var(--stroke-0, #FBFBFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}