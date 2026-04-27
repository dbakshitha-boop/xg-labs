function Header() {
  return (
    <div className="content-stretch flex font-['Sora:Regular',sans-serif] font-normal gap-[24px] items-start leading-[normal] relative shrink-0 text-[24px] text-black uppercase w-full" data-name="Header">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0">Modern, Minimal Execution</p>
      <p className="relative shrink-0 text-nowrap">01</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[760px]" data-name="Container">
      <Header />
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#6e6e6e] text-[68px] tracking-[-1.36px] w-full">Design and content crafted to cut through noise with clarity, simplicity, and impact.</p>
    </div>
  );
}

export default function RealContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Real container 3">
      <Container />
    </div>
  );
}