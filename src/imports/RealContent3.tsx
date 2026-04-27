function Header() {
  return (
    <div className="content-stretch flex font-['Sora:Regular',sans-serif] font-normal gap-[24px] items-start leading-[normal] relative shrink-0 text-[#060606] text-[24px] uppercase w-full" data-name="Header">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0">Fast, Focused Delivery</p>
      <p className="relative shrink-0 text-nowrap">03</p>
    </div>
  );
}

export default function RealContent() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative size-full" data-name="Real content 3">
      <Header />
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#6e6e6e] text-[68px] tracking-[-1.36px] w-full">We work with speed and precision, without sacrificing thinking or quality.</p>
    </div>
  );
}