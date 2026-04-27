function Header() {
  return (
    <div className="content-stretch flex font-['Sora:Regular',sans-serif] font-normal gap-[24px] items-start leading-[normal] relative shrink-0 text-[24px] text-black uppercase w-full" data-name="Header">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0">Strategic Creativity</p>
      <p className="relative shrink-0 text-nowrap">01</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[760px]" data-name="Container">
      <Header />
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#6e6e6e] text-[68px] tracking-[-1.36px] w-full">Ideas shaped by insight and built with purpose - never random, always intentional.</p>
    </div>
  );
}

export default function RealContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Real container 1">
      <Container />
    </div>
  );
}