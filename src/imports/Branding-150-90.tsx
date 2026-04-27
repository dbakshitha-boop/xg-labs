import imgFreeIPhone17Pro from "figma:asset/5b825e76949bb7e4a44591c49d22c2454be4fcbb.png";
import imgKraftPaperPostalBagAndSticker from "figma:asset/e99bbe75d12e6f0fde7bad8f2fe82a3e1af79637.png";
import imgLoadingScreen1 from "figma:asset/8cfd0d9e1f1eb6a0794e4dd6eaf7fd03d5fc8ac9.png";
import imgDuctTapeMockup from "figma:asset/60a79c2d680a8bef3af588bb3ff626d64a3d8125.png";

function Frame() {
  return (
    <div className="bg-[rgba(247,228,70,0.25)] h-[180px] overflow-clip relative rounded-[4px] shrink-0 w-full">
      <div className="absolute h-[251px] left-[calc(50%+0.5px)] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[334px]" data-name="Free iPhone 17 Pro">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFreeIPhone17Pro} />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-['Cal_Sans:Regular',sans-serif] items-start leading-[0.96] not-italic relative shrink-0 text-[24px] text-nowrap tracking-[-0.48px] w-[116px]">
      <p className="relative shrink-0 text-[rgba(255,255,255,0.4)] text-center">LEARDERS</p>
      <p className="relative shrink-0 text-[rgba(255,255,255,0.4)] text-center">CREATORS</p>
      <p className="bg-clip-text bg-gradient-to-b from-[rgba(255,255,255,0.5)] relative shrink-0 to-[#ffffff]" style={{ WebkitTextFillColor: "transparent" }}>
        BUILDERS
      </p>
      <p className="relative shrink-0 text-white">THINKERS</p>
      <p className="bg-clip-text bg-gradient-to-b from-[rgba(255,255,255,0.5)] relative shrink-0 text-center to-[rgba(255,255,255,0.25)]" style={{ WebkitTextFillColor: "transparent" }}>
        EXPLORERS
      </p>
      <p className="relative shrink-0 text-[rgba(255,255,255,0.4)]">DOERS</p>
      <p className="relative shrink-0 text-[rgba(255,255,255,0.4)]">CODERS</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex items-center left-[42px] px-0 py-[10px] top-1/2 translate-y-[-50%]">
      <Frame3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#002ae8] h-[160px] overflow-clip relative rounded-[4px] shrink-0 w-[157.5px]">
      <p className="absolute font-['Cal_Sans:Regular',sans-serif] leading-[1.2] left-[25.5px] not-italic text-[4px] text-center text-nowrap text-white top-[calc(50%-3px)] tracking-[-0.08px] translate-x-[-50%]">A TEAM OF</p>
      <Frame4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 bg-[rgba(247,228,70,0.25)] grow h-[160px] min-h-px min-w-px relative rounded-[4px] shrink-0">
      <div className="absolute h-[236px] left-[calc(50%-8.25px)] top-[calc(50%-8px)] translate-x-[-50%] translate-y-[-50%] w-[316px]" data-name="Kraft Paper Postal Bag and Sticker">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgKraftPaperPostalBagAndSticker} />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

export default function Branding() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Branding">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip p-[4px] relative size-full">
          <div className="absolute h-[615px] left-[calc(50%+0.5px)] opacity-[0.06] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[346px]" data-name="Loading screen 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLoadingScreen1} />
          </div>
          <Frame />
          <Frame5 />
          <div className="absolute flex h-[267px] items-center justify-center left-[-10px] top-[231px] w-[355px]">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="h-[267px] relative w-[355px]" data-name="Duct Tape Mockup">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDuctTapeMockup} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}