import svgPaths from "./svg-ggidirvi8d";
import imgAvatarSet from "./70e45f1a0fc21216d81b88682bd3644cab93d013.png";
import imgAvatarSet1 from "./17ceb0c55de24d1473640dd2e87358366a1df7ca.png";

function LogoContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center max-h-[83.25984191894531px] max-w-[311px] min-h-[34px] min-w-[150px] relative" data-name="Logo-Container">
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Logo">
        <div className="h-[40px] relative shrink-0 w-[40.004px]" data-name="Union">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.0039 40">
            <path clipRule="evenodd" d={svgPaths.p1c3cb240} fill="var(--fill-0, #D8444B)" fillRule="evenodd" id="Union" />
          </svg>
        </div>
        <div className="h-[21.177px] relative shrink-0 w-[97.655px]" data-name="Union">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97.6553 21.1768">
            <path d={svgPaths.p10f644a0} fill="var(--fill-0, #131313)" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Functions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Functions">
      <div className="bg-[#e4e4e4] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[10px] relative rounded-[16px] shrink-0" data-name="Tertiary-Button">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="plus">
          <div className="absolute inset-[20.83%]" data-name="Vector">
            <div className="absolute inset-[-6.43%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1667 13.1667">
                <path d={svgPaths.p3f602480} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Create Event</p>
      </div>
      <div className="bg-[#e4e4e4] content-stretch flex items-center justify-center p-[10px] relative rounded-[999px] shrink-0" data-name="Tertiary-Button">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="search">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <div className="absolute inset-[-5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4999 16.5001">
                <path d={svgPaths.pb5e5800} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#e4e4e4] content-stretch flex items-center justify-center p-[10px] relative rounded-[999px] shrink-0" data-name="Tertiary-Button">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="bell">
          <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
            <div className="absolute inset-[-4.5%_-5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4997 18.1666">
                <path d={svgPaths.p2563b2f0} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="relative rounded-[999px] shrink-0 size-[40px]" data-name="Avatar Set">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarSet} />
        </div>
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <LogoContainer />
      <Functions />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="image">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
              <path d={svgPaths.p38660d40} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Image Cover</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#9e9e9e] text-[14px] w-[min-content]">{`Just like Instagram's 3:4 ratio`}</p>
    </div>
  );
}

function ImageCover() {
  return (
    <div className="aspect-[540/675] bg-[#f4f4f4] relative rounded-[16px] shrink-0 w-full" data-name="Image Cover">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] right-[11.5px] rounded-[999px] top-[12px]" data-name="Disabled-Button">
          <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="trash-2">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-4.5%_-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 18.1667">
                  <path d={svgPaths.p5d17b80} id="Vector" stroke="var(--stroke-0, #9E9E9E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.25px)] overflow-clip size-[120px] top-[calc(50%+0.31px)]" data-name="image">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <div className="absolute inset-[-2.22%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 94">
                <path d={svgPaths.p38ac0300} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border-[#d8444b] border-[1.5px] border-dashed inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function EventDescription() {
  return (
    <div className="bg-[#fbfbfb] max-w-[868px] min-w-[288px] relative rounded-[16px] shrink-0 w-full" data-name="Event Description">
      <div className="max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[inherit] min-w-[inherit] p-[16px] relative size-full">
          <Container3 />
          <ImageCover />
          <div className="bg-[#e4e4e4] relative rounded-[16px] shrink-0 w-full" data-name="Tertiary-Button">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[18px] relative size-full">
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="upload">
                  <div className="absolute inset-[12.5%]" data-name="Vector">
                    <div className="absolute inset-[-5%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
                        <path d={svgPaths.p227b8980} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Upload Cover</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="images">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
              <path d={svgPaths.p22653000} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Gallery</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#9e9e9e] text-[14px] w-[min-content]">Add another 4 image if you want</p>
    </div>
  );
}

function ImageCover1() {
  return (
    <div className="bg-[#f4f4f4] h-[250px] relative rounded-[16px] shrink-0 w-[200px]" data-name="Image Cover">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] right-[12px] rounded-[999px] top-[12px]" data-name="Disabled-Button">
          <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="trash-2">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-4.5%_-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 18.1667">
                  <path d={svgPaths.p5d17b80} id="Vector" stroke="var(--stroke-0, #9E9E9E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[120px] top-1/2" data-name="images">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <div className="absolute inset-[-2%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 104">
                <path d={svgPaths.p1f123400} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border-[#d8444b] border-[1.5px] border-dashed inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function ImageCover2() {
  return (
    <div className="bg-[#f4f4f4] h-[250px] relative rounded-[16px] shrink-0 w-[200px]" data-name="Image Cover">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] right-[12px] rounded-[999px] top-[12px]" data-name="Disabled-Button">
          <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="trash-2">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-4.5%_-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 18.1667">
                  <path d={svgPaths.p5d17b80} id="Vector" stroke="var(--stroke-0, #9E9E9E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[120px] top-1/2" data-name="images">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <div className="absolute inset-[-2%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 104">
                <path d={svgPaths.p1f123400} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border-[#d8444b] border-[1.5px] border-dashed inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function ImageCover3() {
  return (
    <div className="bg-[#f4f4f4] h-[250px] relative rounded-[16px] shrink-0 w-[200px]" data-name="Image Cover">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] right-[12px] rounded-[999px] top-[12px]" data-name="Disabled-Button">
          <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="trash-2">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-4.5%_-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 18.1667">
                  <path d={svgPaths.p5d17b80} id="Vector" stroke="var(--stroke-0, #9E9E9E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[120px] top-1/2" data-name="images">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <div className="absolute inset-[-2%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 104">
                <path d={svgPaths.p1f123400} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border-[#d8444b] border-[1.5px] border-dashed inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function ImageCover4() {
  return (
    <div className="bg-[#f4f4f4] h-[250px] relative rounded-[16px] shrink-0 w-[200px]" data-name="Image Cover">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] right-[12px] rounded-[999px] top-[12px]" data-name="Disabled-Button">
          <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="trash-2">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-4.5%_-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 18.1667">
                  <path d={svgPaths.p5d17b80} id="Vector" stroke="var(--stroke-0, #9E9E9E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[120px] top-1/2" data-name="images">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <div className="absolute inset-[-2%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 104">
                <path d={svgPaths.p1f123400} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border-[#d8444b] border-[1.5px] border-dashed inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Gallery() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="Gallery">
      <ImageCover1 />
      <ImageCover2 />
      <ImageCover3 />
      <ImageCover4 />
    </div>
  );
}

function EventDescription1() {
  return (
    <div className="bg-[#fbfbfb] max-w-[868px] min-w-[288px] relative rounded-[16px] shrink-0 w-full" data-name="Event Description">
      <div className="max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[inherit] min-w-[inherit] p-[16px] relative size-full">
          <Container5 />
          <Gallery />
          <div className="bg-[#e4e4e4] relative rounded-[16px] shrink-0 w-full" data-name="Tertiary-Button">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[18px] relative size-full">
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="upload">
                  <div className="absolute inset-[12.5%]" data-name="Vector">
                    <div className="absolute inset-[-5%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
                        <path d={svgPaths.p227b8980} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Upload Gallery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="map-pin">
        <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
          <div className="absolute inset-[-4.5%_-5.63%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 18.1665">
              <g id="Vector">
                <path d={svgPaths.p2c85a400} stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p26599280} stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Location</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#9e9e9e] text-[14px] w-[min-content]">All the info visitors want to know</p>
    </div>
  );
}

function EventDescription2() {
  return (
    <div className="bg-[#fbfbfb] max-w-[868px] min-w-[288px] relative rounded-[16px] shrink-0 w-full" data-name="Event Description">
      <div className="max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[inherit] min-w-[inherit] p-[16px] relative size-full">
          <Container7 />
          <div className="bg-[#e4e4e4] relative rounded-[16px] shrink-0 w-full" data-name="Tertiary-Button">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[18px] relative size-full">
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="map-plus">
                  <div className="absolute inset-[13.48%_12.5%_12.5%_12.5%]" data-name="Vector">
                    <div className="absolute inset-[-5.07%_-5%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.3033">
                        <path d={svgPaths.p1279bc00} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Add Event Location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start max-w-[540px] min-w-px relative" data-name="Container">
      <EventDescription />
      <EventDescription1 />
      <EventDescription2 />
    </div>
  );
}

function Search1() {
  return (
    <div className="bg-[#f4f4f4] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Search">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[18px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="link">
            <div className="absolute inset-[8.61%_8.57%]" data-name="Vector">
              <div className="absolute inset-[-4.53%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0726 18.0559">
                  <path d={svgPaths.p2f45e400} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[#d8444b] text-[16px] whitespace-nowrap">
            <span className="leading-none">mynoosa.id/</span>
            <span className="leading-none text-[#131313]">m</span>
            <span className="leading-none text-[#131313]">y</span>
            <span className="leading-none text-[#131313]">-</span>
            <span className="leading-none text-[#131313]">e</span>
            <span className="leading-none text-[#131313]">v</span>
            <span className="leading-none text-[#131313]">e</span>
            <span className="leading-none text-[#131313]">n</span>
            <span className="leading-none text-[#131313]">t</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="content-stretch flex gap-[8px] items-center max-w-[868px] relative shrink-0 w-full" data-name="Search">
      <Search1 />
      <div className="bg-[#f7e9e9] content-stretch flex items-center justify-center p-[18px] relative rounded-[999px] shrink-0" data-name="Secondary-Button">
        <div aria-hidden className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="square-pen">
          <div className="absolute inset-[8.35%_8.35%_12.5%_12.5%]" data-name="Vector">
            <div className="absolute inset-[-4.74%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3302 17.3301">
                <path d={svgPaths.pe7fb800} id="Vector" stroke="var(--stroke-0, #D53940)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] min-w-[48px] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Start</p>
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
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] min-w-[48px] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">End</p>
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
    <div className="bg-[#fbfbfb] max-w-[783px] min-w-[288px] relative rounded-[16px] shrink-0 w-full" data-name="Date Picker">
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

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 w-[74px]">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] relative shrink-0 text-[#131313] text-[18px] w-full">Jakarta</p>
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[#9e9e9e] text-[14px] w-full">GMT +7:00</p>
    </div>
  );
}

function Container10() {
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
      <Frame2 />
    </div>
  );
}

function TimeZone() {
  return (
    <div className="bg-[#fbfbfb] max-w-[783px] min-w-[120px] relative rounded-[16px] shrink-0 w-full" data-name="Time Zone">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex items-center max-w-[inherit] min-w-[inherit] p-[16px] relative size-full">
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function EventDate() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start max-w-[868px] relative shrink-0 w-full" data-name="Event Date">
      <DatePicker />
      <TimeZone />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="newspaper">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
              <path d={svgPaths.p1b079ff0} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">About Event</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#9e9e9e] text-[14px] w-[min-content]">All the info visitors want to know</p>
    </div>
  );
}

function Bold() {
  return (
    <div className="bg-[#fbfbfb] content-stretch flex flex-col items-start p-[10px] relative rounded-[12px] shrink-0" data-name="Bold">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="bold">
        <div className="absolute bottom-[16.67%] left-1/4 right-[20.83%] top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-5.63%_-6.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3333 14.8333">
              <path d={svgPaths.p13feaf00} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Italic() {
  return (
    <div className="bg-[#fbfbfb] content-stretch flex flex-col items-start p-[10px] relative rounded-[12px] shrink-0" data-name="Italic">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="italic">
        <div className="absolute inset-[16.67%_20.83%]" data-name="Vector">
          <div className="absolute inset-[-5.63%_-6.43%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1667 14.8337">
              <path d={svgPaths.p465700} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Underline() {
  return (
    <div className="bg-[#fbfbfb] content-stretch flex flex-col items-start p-[10px] relative rounded-[12px] shrink-0" data-name="Underline">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="underline">
        <div className="absolute inset-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-5.63%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 14.8333">
              <path d={svgPaths.p12bdc470} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="bg-[#fbfbfb] content-stretch flex flex-col items-start p-[10px] relative rounded-[12px] shrink-0" data-name="List">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="list">
        <div className="absolute inset-[20.83%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-6.43%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 13.1667">
              <path d={svgPaths.p31593c00} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Number() {
  return (
    <div className="bg-[#fbfbfb] content-stretch flex flex-col items-start p-[10px] relative rounded-[12px] shrink-0" data-name="Number">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="list-ordered">
        <div className="absolute inset-[16.67%_12.5%_16.67%_14.17%]" data-name="Vector">
          <div className="absolute inset-[-5.63%_-5.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1668 14.8333">
              <path d={svgPaths.p240f8820} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#fbfbfb] content-stretch flex flex-col items-start p-[10px] relative rounded-[12px] shrink-0" data-name="Link">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="link">
        <div className="absolute inset-[8.61%_8.57%]" data-name="Vector">
          <div className="absolute inset-[-4.53%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0726 18.0559">
              <path d={svgPaths.p2f45e400} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Text Editor">
        <Bold />
        <Italic />
        <Underline />
        <List />
        <Number />
        <Link />
      </div>
      <div className="bg-[#f4f4f4] relative rounded-[16px] shrink-0 w-full" data-name="Form for Paragraph">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center p-[16px] relative size-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:Regular',sans-serif] h-[42px] leading-[1.3] min-w-px not-italic relative text-[#9e9e9e] text-[16px]">Event Description</p>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#9e9e9e] text-[14px] whitespace-nowrap">0 / 500 character</p>
    </div>
  );
}

function EventDescription3() {
  return (
    <div className="bg-[#fbfbfb] max-w-[868px] relative rounded-[16px] shrink-0 w-full" data-name="Event Description">
      <div className="max-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[inherit] p-[16px] relative size-full">
          <Container11 />
          <Container13 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="ticket-plus">
        <div className="absolute inset-[20.83%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-6.43%_-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 13.1667">
              <path d={svgPaths.p15e94cf1} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Tickets</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative" data-name="Container">
      <Frame />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#9e9e9e] text-[14px] w-[min-content]">Create and set up your ticket</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <div className="bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0" data-name="Tertiary-Button">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="plus">
          <div className="absolute inset-[20.83%]" data-name="Vector">
            <div className="absolute inset-[-6.43%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1667 13.1667">
                <path d={svgPaths.p3f602480} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="circle-check-big">
        <div className="absolute inset-[8.32%_8.32%_8.35%_8.34%]" data-name="Vector">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
              <path d={svgPaths.p2a0e5800} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Automatic payment</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#d8444b] content-stretch flex items-center justify-center max-w-[240px] px-[12px] py-[4px] relative rounded-[12px] shrink-0 w-[79px]" data-name="Container">
      <div aria-hidden className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-none min-w-px not-italic relative text-[#fbfbfb] text-[12px]">Open</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Default Ticket</p>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Tag">
        <Container21 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="users">
        <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5%_-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 16.5">
              <path d={svgPaths.p20804200} id="Vector" stroke="var(--stroke-0, #414141)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#414141] text-[16px] whitespace-nowrap">0/50</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="ticket-percent">
        <div className="absolute inset-[20.83%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-6.43%_-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 13.1667">
              <path d={svgPaths.p2017eb00} id="Vector" stroke="var(--stroke-0, #414141)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#414141] text-[16px] whitespace-nowrap">Rp50.000</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Container22 />
      <div className="relative self-stretch shrink-0 w-0" data-name="Separator">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 20">
            <path d="M0.5 0V20" id="Separator" stroke="var(--stroke-0, #414141)" />
          </svg>
        </div>
      </div>
      <Container23 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-[208px] relative" data-name="Container">
      <Container20 />
      <Frame1 />
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex gap-[8px] items-center min-w-[80px] relative shrink-0" data-name="Action">
      <div className="bg-[#f42d2d] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0" data-name="Destructive-Button">
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
      <div className="bg-[#f7e9e9] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0" data-name="Secondary-Button">
        <div aria-hidden className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="square-pen">
          <div className="absolute inset-[8.35%_8.35%_12.5%_12.5%]" data-name="Vector">
            <div className="absolute inset-[-4.74%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3302 17.3301">
                <path d={svgPaths.pe7fb800} id="Vector" stroke="var(--stroke-0, #D53940)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-center flex flex-[1_0_0] flex-wrap gap-[8px_4px] items-center min-w-px relative" data-name="Container">
      <Container19 />
      <Action />
    </div>
  );
}

function Ticket() {
  return (
    <div className="bg-[#f7e9e9] relative rounded-[16px] shrink-0 w-full" data-name="Ticket">
      <div aria-hidden className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-[0px_4px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="grip-vertical">
            <div className="absolute inset-[16.67%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-5.63%_-11.25%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 14.8333">
                  <g id="Vector">
                    <path d={svgPaths.p3a9df200} stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.pd65a300} stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p3cab3f00} stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p12128700} stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p26b86b80} stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p3673480} stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Ticket />
    </div>
  );
}

function TicketSetting() {
  return (
    <div className="bg-[#fbfbfb] max-w-[868px] relative rounded-[16px] shrink-0 w-full" data-name="Ticket Setting">
      <div className="max-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[inherit] p-[16px] relative size-full">
          <Container14 />
          <div className="bg-[#f4f4f4] relative rounded-[16px] shrink-0 w-full" data-name="Option with Dropdown">
            <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
                <Container16 />
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="chevron-down">
                  <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
                    <div className="absolute inset-[-15%_-7.5%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 6.5">
                        <path d={svgPaths.p3d2c9380} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Container17 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="settings-2">
        <div className="absolute inset-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-5.63%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 14.8333">
              <path d={svgPaths.p21219b70} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Event Setting</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#9e9e9e] text-[14px] w-[188px]">Control your event right here</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="tags">
        <div className="absolute inset-[8.33%_8.31%_8.31%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1716 18.1713">
              <g id="Vector">
                <path d={svgPaths.pce18b80} fill="var(--fill-0, #FBFBFB)" />
                <path d={svgPaths.p33f2f800} stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Event Category</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="door-closed-locked">
        <div className="absolute inset-[16.67%_8.33%_8.33%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5%_-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 16.5">
              <path d={svgPaths.p31508500} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Registration Status</p>
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="circle-alert">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
              <path d={svgPaths.p2edf7000} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container29 />
    </div>
  );
}

function Toggle1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#f4d6d8] h-[18px] left-1/2 rounded-[999px] top-1/2 w-[36px]" data-name="Toggle">
      <div aria-hidden className="absolute border-[#e68d91] border-[1.5px] border-solid inset-[-0.75px] pointer-events-none rounded-[999.75px]" />
    </div>
  );
}

function Toggle2() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#d8444b] h-[14px] left-[calc(50%+6px)] rounded-[999px] top-1/2 w-[20px]" data-name="Toggle" />;
}

function Toggle() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-[40px]" data-name="Toggle">
      <Toggle1 />
      <Toggle2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="user-check">
        <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5%_-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 16.5">
              <path d={svgPaths.p2c4c8e00} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Need Verification?</p>
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="circle-alert">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
              <path d={svgPaths.p2edf7000} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container31 />
    </div>
  );
}

function Toggle4() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#d9d9d9] h-[18px] left-1/2 rounded-[999px] top-1/2 w-[36px]" data-name="Toggle">
      <div aria-hidden className="absolute border-[#9e9e9e] border-[1.5px] border-solid inset-[-0.75px] pointer-events-none rounded-[999.75px]" />
    </div>
  );
}

function Toggle5() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#9e9e9e] h-[14px] left-[calc(50%-6px)] rounded-[999px] top-1/2 w-[20px]" data-name="Toggle" />;
}

function Toggle3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-[40px]" data-name="Toggle">
      <Toggle4 />
      <Toggle5 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="lock-keyhole">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-4.5%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 18.1667">
              <path d={svgPaths.p12648c70} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[16px] whitespace-nowrap">Make Event Private</p>
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="circle-alert">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
              <path d={svgPaths.p2edf7000} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container33 />
    </div>
  );
}

function Toggle7() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#d9d9d9] h-[18px] left-1/2 rounded-[999px] top-1/2 w-[36px]" data-name="Toggle">
      <div aria-hidden className="absolute border-[#9e9e9e] border-[1.5px] border-solid inset-[-0.75px] pointer-events-none rounded-[999.75px]" />
    </div>
  );
}

function Toggle8() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#9e9e9e] h-[14px] left-[calc(50%-6px)] rounded-[999px] top-1/2 w-[20px]" data-name="Toggle" />;
}

function Toggle6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-[40px]" data-name="Toggle">
      <Toggle7 />
      <Toggle8 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#f4f4f4] relative rounded-[16px] shrink-0 w-full" data-name="Option with Dropdown">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
            <Container27 />
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="chevron-down">
              <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
                <div className="absolute inset-[-15%_-7.5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 6.5">
                    <path d={svgPaths.p3d2c9380} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] relative rounded-[16px] shrink-0 w-full" data-name="Form with Toggle">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-center flex flex-wrap gap-y-[10px] items-center justify-between p-[16px] relative size-full">
            <Container28 />
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Toggle">
              <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[12px] whitespace-nowrap">Open</p>
              <Toggle />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] relative rounded-[16px] shrink-0 w-full" data-name="Form with Toggle">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-center flex flex-wrap gap-y-[10px] items-center justify-between p-[16px] relative size-full">
            <Container30 />
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Toggle">
              <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[12px] whitespace-nowrap">No</p>
              <Toggle3 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] relative rounded-[16px] shrink-0 w-full" data-name="Form with Toggle">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-center flex flex-wrap gap-y-[10px] items-center justify-between p-[16px] relative size-full">
            <Container32 />
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Toggle">
              <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[#131313] text-[12px] whitespace-nowrap">Public</p>
              <Toggle6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="list-plus">
        <div className="absolute inset-[20.83%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-6.43%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 13.1667">
              <path d={svgPaths.p126a2c18} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Additional Setting</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative" data-name="Container">
      <Container36 />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#9e9e9e] text-[14px] w-[min-content]">Create registration questions, welcome message to your guests</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <div className="bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0" data-name="Tertiary-Button">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="chevron-down">
          <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
            <div className="absolute inset-[-15%_-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 6.5">
                <path d={svgPaths.p3d2c9380} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventSetting() {
  return (
    <div className="bg-[#fbfbfb] max-w-[868px] relative rounded-[16px] shrink-0 w-full" data-name="Event Setting">
      <div className="max-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[inherit] p-[16px] relative size-full">
          <Container24 />
          <Container26 />
          <div className="h-0 relative shrink-0 w-full" data-name="Separator">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 439.5 1">
                <path d="M0 0.5H439.5" id="Separator" stroke="var(--stroke-0, #D9D9D9)" />
              </svg>
            </div>
          </div>
          <Container34 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="book-user">
        <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
          <div className="absolute inset-[-4.5%_-5.63%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 18.1667">
              <path d={svgPaths.p24291100} id="Vector" stroke="var(--stroke-0, #D8444B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Hosts Setting</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative" data-name="Container">
      <Container39 />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#9e9e9e] text-[14px] w-[min-content]">Add co-host for collaboration event</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <div className="bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0" data-name="Tertiary-Button">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="plus">
          <div className="absolute inset-[20.83%]" data-name="Vector">
            <div className="absolute inset-[-6.43%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1667 13.1667">
                <path d={svgPaths.p3f602480} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Container">
      <div className="relative rounded-[999px] shrink-0 size-[40px]" data-name="Avatar Set">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarSet1} />
        </div>
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Sari Wulandari</p>
    </div>
  );
}

function HostsList() {
  return (
    <div className="bg-[#f4f4f4] max-w-[1440px] min-w-[256px] relative rounded-[16px] shrink-0 w-full" data-name="Hosts List">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex items-center max-w-[inherit] min-w-[inherit] p-[12px] relative size-full">
          <Container41 />
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Container">
      <div className="relative rounded-[999px] shrink-0 size-[40px]" data-name="Avatar Set">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatarSet1} />
        </div>
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#131313] text-[18px] whitespace-nowrap">Sari Wulandari</p>
    </div>
  );
}

function HostsList1() {
  return (
    <div className="bg-[#f4f4f4] max-w-[1440px] min-w-[256px] relative rounded-[16px] shrink-0 w-full" data-name="Hosts List">
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center justify-center max-w-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] min-w-[inherit] p-[12px] relative size-full">
          <Container42 />
          <div className="bg-[#e4e4e4] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0" data-name="Tertiary-Button">
            <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[999px]" />
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="x">
              <div className="absolute inset-1/4" data-name="Vector">
                <div className="absolute inset-[-7.5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 11.5">
                    <path d={svgPaths.p14b78080} id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <HostsList />
      <HostsList1 />
    </div>
  );
}

function HostsSetting() {
  return (
    <div className="bg-[#fbfbfb] max-w-[868px] relative rounded-[16px] shrink-0 w-full" data-name="Hosts Setting">
      <div className="max-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[inherit] p-[16px] relative size-full">
          <Container37 />
          <Container40 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 rounded-[4px] size-[16px] top-1/2" data-name="Checkbox">
      <div aria-hidden className="absolute border-[#9e9e9e] border-[1.5px] border-solid inset-[-0.75px] pointer-events-none rounded-[4.75px]" />
    </div>
  );
}

function FinalAction() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start max-w-[868px] relative shrink-0 w-full" data-name="Final Action">
      <div className="bg-[#f7e9e9] flex-[1_0_0] min-w-[288px] relative rounded-[16px]" data-name="Secondary-Button">
        <div aria-hidden className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] px-[32px] py-[18px] relative size-full">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="file-text">
              <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
                <div className="absolute inset-[-4.5%_-5.62%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 18.1667">
                    <path d={svgPaths.p281f08d0} id="Vector" stroke="var(--stroke-0, #D53940)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#d53940] text-[16px] whitespace-nowrap">Save as Draft</p>
          </div>
        </div>
      </div>
      <div className="bg-[#d8444b] flex-[1_0_0] min-w-[288px] relative rounded-[16px]" data-name="Primary-Button">
        <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] px-[32px] py-[18px] relative size-full">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="globe">
              <div className="absolute inset-[8.33%]" data-name="Vector">
                <div className="absolute inset-[-4.5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
                    <path d={svgPaths.p10ac6280} id="Vector" stroke="var(--stroke-0, #FBFBFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#fbfbfb] text-[16px] whitespace-nowrap">Publish Event Now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-end max-w-[868px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[1.2] max-w-[868px] not-italic relative shrink-0 text-[#9e9e9e] text-[48px] w-full">Event Name</p>
      <Search />
      <EventDate />
      <EventDescription3 />
      <TicketSetting />
      <EventSetting />
      <HostsSetting />
      <div className="bg-[#fbfbfb] content-stretch flex gap-[8px] items-start max-w-[868px] py-[16px] relative shrink-0 w-full" data-name="TnC Check">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Checkbox">
          <Checkbox />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#131313] text-[16px]">
          <span className="leading-[1.3]">{`You agree to our `}</span>
          <span className="leading-[1.3] text-[#d8444b]">{`Terms & Conditions`}</span>
          <span className="leading-[1.3]">{` and `}</span>
          <span className="leading-[1.3] text-[#d8444b]">Privacy Policy</span>
          <span className="leading-[1.3]">, which cover your rights, responsibilities, and how we manage your data.</span>
        </p>
      </div>
      <FinalAction />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start max-w-[1440px] min-w-px relative" data-name="Container">
      <Container2 />
      <Container9 />
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#fbfbfb] relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[32px] py-[64px] relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function TwemojiFlagIndonesia() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="twemoji:flag-indonesia">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1913)" id="twemoji:flag-indonesia">
          <path d={svgPaths.p2b2e4d00} fill="var(--fill-0, #DC1F26)" id="Vector" />
          <path d={svgPaths.p3c418680} fill="var(--fill-0, #EEEEEE)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1913">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Bahasa() {
  return (
    <div className="bg-[#f7e9e9] content-stretch flex gap-[4px] items-center justify-center px-[24px] py-[10px] relative rounded-[12px] shrink-0" data-name="Bahasa">
      <div aria-hidden className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <TwemojiFlagIndonesia />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#414141] text-[14px] whitespace-nowrap">Bahasa</p>
    </div>
  );
}

function TwemojiFlagUsOutlyingIslands() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="twemoji:flag-us-outlying-islands">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_2004)" id="twemoji:flag-us-outlying-islands">
          <path d={svgPaths.pc749200} fill="var(--fill-0, #B22334)" id="Vector" />
          <path d={svgPaths.p7d0cbf2} fill="var(--fill-0, #EEEEEE)" id="Vector_2" />
          <path d={svgPaths.p19e1e680} fill="var(--fill-0, #3C3B6E)" id="Vector_3" />
          <path d={svgPaths.p10088680} fill="var(--fill-0, white)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_1_2004">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function English() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[24px] py-[10px] relative rounded-[12px] shrink-0" data-name="English">
      <TwemojiFlagUsOutlyingIslands />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#414141] text-[14px] whitespace-nowrap">English</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="[word-break:break-word] content-center flex flex-wrap font-['Plus_Jakarta_Sans:Regular',sans-serif] gap-[16px] items-center justify-center leading-[1.3] not-italic relative shrink-0 text-[#414141] text-[14px] text-center w-full whitespace-nowrap" data-name="Container">
      <p className="relative shrink-0">Discover</p>
      <p className="relative shrink-0">About</p>
      <p className="relative shrink-0">Terms of Service</p>
      <p className="relative shrink-0">Privacy Policy</p>
      <p className="relative shrink-0">Feedback</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#fbfbfb] content-stretch flex items-center relative rounded-[12px] shrink-0" data-name="Language Switcher">
        <div aria-hidden className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <Bahasa />
        <English />
      </div>
      <Container44 />
      <div className="h-0 relative shrink-0 w-full" data-name="Separator">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 959 1">
            <path d="M0 0.5H959" id="Separator" stroke="var(--stroke-0, #CCCCCC)" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#414141] text-[14px] text-center whitespace-nowrap">©2026 Noosa. All rights reserved.</p>
    </div>
  );
}

export default function Tablet() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Tablet">
      <div className="bg-[#f4f4f4] max-w-[1023px] min-w-[768px] relative shrink-0 w-full" data-name="Navigation Bar">
        <div aria-hidden className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-col items-center max-w-[inherit] min-w-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center max-w-[inherit] min-w-[inherit] px-[32px] py-[16px] relative size-full">
            <Container />
          </div>
        </div>
      </div>
      <Content />
      <div className="bg-[#f4f4f4] max-w-[1023px] min-w-[768px] relative shrink-0 w-full" data-name="Footer">
        <div aria-hidden className="absolute border-[#d9d9d9] border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-col items-center max-w-[inherit] min-w-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center max-w-[inherit] min-w-[inherit] px-[32px] py-[16px] relative size-full">
            <Container43 />
          </div>
        </div>
      </div>
    </div>
  );
}