import svgPaths from "./svg-k2dl7joxgv";

function Frame() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow h-full items-start justify-center leading-[1.2] min-h-px min-w-px relative shrink-0">
      <p className="font-['Sora:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#060606] text-[32px] text-nowrap tracking-[-0.64px] uppercase">A SYSTEM BUILT FOR SERIOUS BRAND GROWTH</p>
      <p className="font-['Cal_Sans:Regular',sans-serif] min-w-full not-italic relative shrink-0 text-[#5f5f5f] text-[64px] tracking-[-1.28px] w-[min-content]">Every service works together as one system, built for clarity, scale, and real growth.</p>
    </div>
  );
}

function CtaTextViewWork() {
  return (
    <div className="h-[26px] relative shrink-0 w-[101px]" data-name="CTA Text/View Work">
      <p className="absolute font-['Space_Grotesk:Medium',sans-serif] font-medium inset-0 leading-[normal] text-[#414141] text-[20px] tracking-[-0.8px] uppercase">See more</p>
    </div>
  );
}

function CtaTextViewWork1() {
  return (
    <div className="absolute h-[18.02px] left-[calc(50%+0.5px)] opacity-0 top-[62px] translate-x-[-50%] w-[70px]" data-name="CTA Text/View Work">
      <p className="absolute font-['Space_Grotesk:Medium',sans-serif] font-medium inset-[0_0_0.11%_0] leading-[normal] text-[#414141] text-[13.861px] tracking-[-0.5545px] uppercase">View Work</p>
    </div>
  );
}

function CtaPrimaryAndSec() {
  return (
    <div className="mr-[-25px] relative rounded-[42px] shrink-0" data-name="CTA PRIMARY AND SEC">
      <div className="content-stretch flex gap-[4px] items-start overflow-clip pl-[12px] pr-[28px] py-[12px] relative rounded-[inherit]">
        <div className="absolute bg-[#02a884] h-[100px] left-[-200px] top-[-38px] w-[200px]" data-name="Background" />
        <div className="absolute bg-[#060606] h-[100px] left-[calc(50%-299.51px)] top-[calc(50%+0.6px)] translate-x-[-50%] translate-y-[-50%] w-[200px]" data-name="Background" />
        <CtaTextViewWork />
        <CtaTextViewWork1 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[42px]" />
    </div>
  );
}

function PixelArrowUp() {
  return (
    <div className="relative size-[24px]" data-name="pixel:arrow-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pixel:arrow-up">
          <path d={svgPaths.p882ff00} fill="var(--fill-0, #F7F8FA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#060606] mr-[-25px] overflow-clip relative rounded-[50px] shrink-0 size-[50px]">
      <div className="absolute flex items-center justify-center left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <PixelArrowUp />
        </div>
      </div>
    </div>
  );
}

function CtaPrimaryAndSec1() {
  return (
    <div className="content-stretch flex items-center overflow-clip pl-0 pr-[25px] py-0 relative shrink-0" data-name="CTA PRIMARY AND SEC">
      <CtaPrimaryAndSec />
      <Frame3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start justify-end relative shrink-0">
      <div className="font-['Sora:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#6e6e6e] text-[20px] tracking-[-0.4px] w-[300px]">
        <p className="mb-0">No noise. No guesswork.</p>
        <p>Just structured creative and strategic execution.</p>
      </div>
      <CtaPrimaryAndSec1 />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="content-stretch flex gap-[200px] items-end justify-center relative size-full">
      <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
        <Frame />
      </div>
      <Frame1 />
    </div>
  );
}