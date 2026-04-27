import svgPaths from "./svg-p0xccw4twk";
import imgImage from "figma:asset/d1e53c97c1810297d3642b6fa789643c8fe962af.png";
import imgImage1 from "figma:asset/fad7be819dbbdd4aa88e7779ed4b7c2a87bf23e6.png";
import imgGrid from "figma:asset/b002c02688ea7a2210a114325101549e34a2e548.png";

function Frame() {
  return (
    <div className="absolute left-1/2 size-[912px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 912 912">
        <g id="Frame 476">
          <circle cx="456" cy="456" fill="var(--fill-0, white)" id="Ellipse 7" r="456" />
          <circle cx="456" cy="456" fill="var(--fill-0, #E9F0FF)" id="Ellipse 9" r="66" />
        </g>
      </svg>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[269.608px] relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[250px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage} />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[337.434px] relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage1} />
    </div>
  );
}

function ImageContainer() {
  return (
    <div className="h-[1080px] overflow-clip relative shrink-0 w-[960px]" data-name="Image Container">
      <div className="absolute bg-[#02a884] h-[1080px] left-0 top-0 w-[960px]" data-name="Image Mask" />
      <div className="absolute h-[1080px] left-1/2 opacity-10 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[960px]" data-name="Grid">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.02%] left-0 max-w-none top-[-0.01%] w-[135.83%]" src={imgGrid} />
        </div>
      </div>
      <Frame />
      <div className="absolute flex h-[327.627px] items-center justify-center left-[calc(50%+0.06px)] top-[calc(50%-0.45px)] translate-x-[-50%] translate-y-[-50%] w-[314.118px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[344.154deg]">
          <Image />
        </div>
      </div>
      <div className="absolute flex h-[406.633px] items-center justify-center left-[calc(50%-0.28px)] top-[calc(50%+0.32px)] translate-x-[-50%] translate-y-[-50%] w-[389.24px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[14.924deg]">
          <Image1 />
        </div>
      </div>
    </div>
  );
}

function HeaderTextContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Header Text Container">
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#414141] text-[32px] text-nowrap tracking-[-0.64px] uppercase">What makes us Different</p>
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Header Container">
      <HeaderTextContainer />
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#5f5f5f] text-[24px] tracking-[-0.24px] w-[min-content]">We blend strategy, design, and storytelling into work that feels modern, intentional, and built to move brands forward. Every idea is crafted with clarity and purpose — no noise, no filler, just high-impact creative that works.</p>
    </div>
  );
}

function SubheaderContainer() {
  return (
    <div className="content-stretch flex font-['Sora:Regular',sans-serif] font-normal gap-[24px] items-start leading-[normal] relative shrink-0 text-[24px] text-black uppercase w-full" data-name="Subheader Container">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0">Fast, Focused Delivery</p>
      <p className="relative shrink-0 text-nowrap">01</p>
    </div>
  );
}

function ContentContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[760px]" data-name="Content Container">
      <SubheaderContainer />
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#6e6e6e] text-[68px] tracking-[-1.36px] w-full">We move with speed and precision - without compromising thinking, quality, or results.</p>
    </div>
  );
}

function PageNumberContainer() {
  return (
    <div className="bg-[#dfe7ff] content-stretch flex flex-col items-center justify-center overflow-clip px-[15px] py-0 relative shrink-0 w-[57px]" data-name="Page Number Container">
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#6e6e6e] text-[52px] text-nowrap tracking-[-1.04px]">1</p>
    </div>
  );
}

function PageNumberContainer1() {
  return (
    <div className="bg-[#f3f7ff] content-stretch flex flex-col items-center justify-center overflow-clip px-[15px] py-0 relative shrink-0 w-[57px]" data-name="Page Number Container">
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#6e6e6e] text-[52px] text-nowrap tracking-[-1.04px]">2</p>
    </div>
  );
}

function PageNumberContainer2() {
  return (
    <div className="bg-[#f3f7ff] content-stretch flex flex-col items-center justify-center overflow-clip px-[15px] py-0 relative shrink-0 w-[57px]" data-name="Page Number Container">
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#6e6e6e] text-[52px] text-nowrap tracking-[-1.04px]">3</p>
    </div>
  );
}

function PageNumberContainer3() {
  return (
    <div className="bg-[#f3f7ff] content-stretch flex flex-col items-center justify-center overflow-clip px-[15px] py-0 relative shrink-0 w-[57px]" data-name="Page Number Container">
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#6e6e6e] text-[52px] text-nowrap tracking-[-1.04px]">4</p>
    </div>
  );
}

function PageNumbersContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Page Numbers Container">
      <PageNumberContainer />
      <PageNumberContainer1 />
      <PageNumberContainer2 />
      <PageNumberContainer3 />
    </div>
  );
}

function MajesticonsArrowUp() {
  return (
    <div className="relative size-[40px]" data-name="majesticons:arrow-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Arrow Icon">
          <rect height="39" rx="19.5" stroke="var(--stroke-0, black)" width="39" x="0.5" y="0.5" />
          <path d={svgPaths.p3c0a3b80} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PixelarticonsArrowUp() {
  return (
    <div className="relative size-[40px]" data-name="pixelarticons:arrow-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="pixelarticons:arrow-up">
          <rect height="39" rx="3.5" stroke="var(--stroke-0, black)" width="39" x="0.5" y="0.5" />
          <path d={svgPaths.p47d4600} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Component 39">
      <div className="flex items-center justify-center relative shrink-0 size-[40px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <PixelarticonsArrowUp />
        </div>
      </div>
    </div>
  );
}

function ArrowContainer() {
  return (
    <div className="content-stretch flex gap-[24px] items-end justify-end relative shrink-0" data-name="Arrow Container">
      <div className="flex items-center justify-center relative shrink-0 size-[40px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <MajesticonsArrowUp />
        </div>
      </div>
      <Component />
    </div>
  );
}

function PaginationContainer() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Pagination Container">
      <PageNumbersContainer />
      <ArrowContainer />
    </div>
  );
}

function RealContent() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full" data-name="Real content">
      <ContentContainer />
      <PaginationContainer />
    </div>
  );
}

function TextContainer() {
  return (
    <div className="content-stretch flex flex-col h-[1080px] items-end justify-between overflow-clip p-[100px] relative shrink-0 w-[960px]" data-name="Text Container">
      <HeaderContainer />
      <RealContent />
    </div>
  );
}

export default function WhatMakeUsDifferent() {
  return (
    <div className="bg-white content-stretch flex items-center relative size-full" data-name="What make us different">
      <ImageContainer />
      <TextContainer />
    </div>
  );
}