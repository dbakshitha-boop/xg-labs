export default function TextContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative size-full text-center" data-name="Text Container">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#414141] text-[24px] tracking-[-0.96px] w-full">STRATEGY FIRST</p>
      <p className="font-['Cal_Sans:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#060606] text-[96px] uppercase w-full">Strategy Over Everything</p>
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#414141] text-[24px] tracking-[-0.96px] w-full">
        {`We align strategy, creative, and execution to `}
        <br aria-hidden="true" />
        drive measurable growth.
      </p>
    </div>
  );
}