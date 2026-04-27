import imgLogo from "figma:asset/e41dee190168d7591c7b7b8c43b6c0799cb1032a.png";
import imgRectangle from "figma:asset/192d853c9f27ed907c5b4d6ebe963ebe82df6c24.png";

function Logo() {
  return (
    <div className="absolute inset-[22.44%_18.51%_22%_19%] overflow-clip rounded-[12px]" data-name="Logo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgLogo} />
      <div className="absolute left-1/2 size-[48px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
    </div>
  );
}

function AuthorInfo() {
  return (
    <div className="content-stretch flex flex-col font-['Sora:Regular',sans-serif] font-normal gap-[8px] items-end relative shrink-0 text-[16px] text-nowrap" data-name="Author Info">
      <p className="leading-[1.2] relative shrink-0 text-[#6e6e6e]">{` -Arun Kumar`}</p>
      <p className="leading-[normal] relative shrink-0 text-[#9a9a9a]">CMO, BrightCart</p>
    </div>
  );
}

function TestimonialFooter() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Testimonial Footer">
      <div className="relative shrink-0 size-[48px]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
      <AuthorInfo />
    </div>
  );
}

function TestimonialContent() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Testimonial Content">
      <p className="font-['Space_Grotesk:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#414141] text-[28px] tracking-[-1.12px] uppercase w-full">XG Labs brought clarity to our marketing we didn’t know we were missing.</p>
    </div>
  );
}

function TestimonialCards() {
  return (
    <div className="absolute bg-[#b3e5fc] content-stretch flex flex-col inset-0 items-center justify-between overflow-clip p-[28px] rounded-[12px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]" data-name="Testimonial Cards">
      <TestimonialFooter />
      <TestimonialContent />
    </div>
  );
}

function Testi() {
  return (
    <div className="h-[450px] relative rounded-[12px] w-[400.061px]" data-name="Testi 01">
      <Logo />
      <TestimonialCards />
    </div>
  );
}

function Logo1() {
  return (
    <div className="absolute inset-[22.44%_18.51%_22%_19%] overflow-clip rounded-[12px]" data-name="Logo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgLogo} />
      <div className="absolute left-[calc(50%-0.26px)] size-[48px] top-[calc(50%-0.1px)] translate-x-[-50%] translate-y-[-50%]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
    </div>
  );
}

function AuthorInfo1() {
  return (
    <div className="content-stretch flex flex-col font-['Sora:Regular',sans-serif] font-normal gap-[8px] items-end relative shrink-0 text-[16px] text-nowrap" data-name="Author Info">
      <p className="leading-[1.2] relative shrink-0 text-[#6e6e6e]">{` -Arun Kumar`}</p>
      <p className="leading-[normal] relative shrink-0 text-[#9a9a9a]">CMO, BrightCart</p>
    </div>
  );
}

function TestimonialFooter1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Testimonial Footer">
      <div className="relative shrink-0 size-[48px]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
      <AuthorInfo1 />
    </div>
  );
}

function TestimonialContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Testimonial Content">
      <p className="font-['Space_Grotesk:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#414141] text-[28px] tracking-[-1.12px] uppercase w-full">XG Labs brought clarity to our marketing we didn’t know we were missing.</p>
    </div>
  );
}

function Purple1() {
  return (
    <div className="absolute bg-[#d8c0ff] content-stretch flex flex-col inset-0 items-center justify-between overflow-clip p-[28px] rounded-[12px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]" data-name="Purple 03">
      <TestimonialFooter1 />
      <TestimonialContent1 />
    </div>
  );
}

function Purple() {
  return (
    <div className="h-[450.371px] relative rounded-[12px] w-[407.291px]" data-name="Purple 03">
      <Logo1 />
      <Purple1 />
    </div>
  );
}

function Logo2() {
  return (
    <div className="absolute inset-[22.44%_18.51%_22%_19%] overflow-clip rounded-[12px]" data-name="Logo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgLogo} />
      <div className="absolute left-[calc(50%-0.35px)] size-[48px] top-[calc(50%-0.01px)] translate-x-[-50%] translate-y-[-50%]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
    </div>
  );
}

function AuthorInfo2() {
  return (
    <div className="content-stretch flex flex-col font-['Sora:Regular',sans-serif] font-normal gap-[8px] items-end relative shrink-0 text-[16px] text-nowrap" data-name="Author Info">
      <p className="leading-[1.2] relative shrink-0 text-[#6e6e6e]">{` -Arun Kumar`}</p>
      <p className="leading-[normal] relative shrink-0 text-[#9a9a9a]">CMO, BrightCart</p>
    </div>
  );
}

function TestimonialFooter2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Testimonial Footer">
      <div className="relative shrink-0 size-[48px]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
      <AuthorInfo2 />
    </div>
  );
}

function TestimonialContent2() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Testimonial Content">
      <p className="font-['Space_Grotesk:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#414141] text-[28px] tracking-[-1.12px] uppercase w-full">XG Labs brought clarity to our marketing we didn’t know we were missing.</p>
    </div>
  );
}

function Grey1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col inset-0 items-center justify-between overflow-clip p-[28px] rounded-[12px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]" data-name="grey 04">
      <TestimonialFooter2 />
      <TestimonialContent2 />
    </div>
  );
}

function Grey() {
  return (
    <div className="bg-white h-[450.042px] relative rounded-[12px] w-[407.578px]" data-name="grey 04">
      <Logo2 />
      <Grey1 />
    </div>
  );
}

function Logo3() {
  return (
    <div className="absolute inset-[22.44%_18.51%_22%_19%] overflow-clip rounded-[12px]" data-name="Logo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgLogo} />
      <div className="absolute left-[calc(50%-0.29px)] size-[48px] top-[calc(50%-0.07px)] translate-x-[-50%] translate-y-[-50%]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
    </div>
  );
}

function AuthorInfo3() {
  return (
    <div className="content-stretch flex flex-col font-['Sora:Regular',sans-serif] font-normal gap-[8px] items-end relative shrink-0 text-[16px] text-nowrap" data-name="Author Info">
      <p className="leading-[1.2] relative shrink-0 text-[#6e6e6e]">{` -Arun Kumar`}</p>
      <p className="leading-[normal] relative shrink-0 text-[#9a9a9a]">CMO, BrightCart</p>
    </div>
  );
}

function TestimonialFooter3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Testimonial Footer">
      <div className="relative shrink-0 size-[48px]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
      <AuthorInfo3 />
    </div>
  );
}

function TestimonialContent3() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Testimonial Content">
      <p className="font-['Space_Grotesk:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#414141] text-[28px] tracking-[-1.12px] uppercase w-full">XG Labs brought clarity to our marketing we didn’t know we were missing.</p>
    </div>
  );
}

function Blue() {
  return (
    <div className="absolute bg-[#b3e5fc] content-stretch flex flex-col inset-0 items-center justify-between overflow-clip p-[28px] rounded-[12px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]" data-name="Blue 05">
      <TestimonialFooter3 />
      <TestimonialContent3 />
    </div>
  );
}

function Testi1() {
  return (
    <div className="bg-[#b3e5fc] h-[450.259px] relative rounded-[12px] w-[407.389px]" data-name="Testi 05">
      <Logo3 />
      <Blue />
    </div>
  );
}

function Logo4() {
  return (
    <div className="absolute inset-[22.44%_18.51%_22%_19%] overflow-clip rounded-[12px]" data-name="Logo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgLogo} />
      <div className="absolute left-[calc(50%-0.31px)] size-[48px] top-[calc(50%-0.05px)] translate-x-[-50%] translate-y-[-50%]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
    </div>
  );
}

function AuthorInfo4() {
  return (
    <div className="content-stretch flex flex-col font-['Sora:Regular',sans-serif] font-normal gap-[8px] items-end relative shrink-0 text-[16px] text-nowrap" data-name="Author Info">
      <p className="leading-[1.2] relative shrink-0 text-[#6e6e6e]">{` -Arun Kumar`}</p>
      <p className="leading-[normal] relative shrink-0 text-[#9a9a9a]">CMO, BrightCart</p>
    </div>
  );
}

function TestimonialFooter4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Testimonial Footer">
      <div className="relative shrink-0 size-[48px]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
      <AuthorInfo4 />
    </div>
  );
}

function TestimonialContent4() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Testimonial Content">
      <p className="font-['Space_Grotesk:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#414141] text-[28px] tracking-[-1.12px] uppercase w-full">XG Labs brought clarity to our marketing we didn’t know we were missing.</p>
    </div>
  );
}

function NeonGreen() {
  return (
    <div className="absolute bg-[#d9fb60] content-stretch flex flex-col inset-0 items-center justify-between overflow-clip p-[28px] rounded-[12px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]" data-name="neon green 02">
      <TestimonialFooter4 />
      <TestimonialContent4 />
    </div>
  );
}

function Testimontials() {
  return (
    <div className="h-[450.166px] relative rounded-[12px] w-[407.47px]" data-name="Testimontials">
      <Logo4 />
      <NeonGreen />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[100px] top-[100.77px]">
      <div className="absolute flex h-[488.678px] items-center justify-center left-[100px] top-[111.41px] w-[444.127px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[354.11deg]">
          <Testi />
        </div>
      </div>
      <div className="absolute flex h-[523.344px] items-center justify-center left-[748.99px] top-[111.06px] w-[494.034px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[348.216deg] skew-x-[0.436deg]">
          <Purple />
        </div>
      </div>
      <div className="absolute flex h-[476.811px] items-center justify-center left-[1071.2px] top-[111.33px] w-[438.605px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[356.074deg] skew-x-[0.149deg]">
          <Grey />
        </div>
      </div>
      <div className="absolute flex h-[512.633px] items-center justify-center left-[1338.96px] top-[100.77px] w-[481.04px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[350.182deg] skew-x-[0.367deg]">
          <Testi1 />
        </div>
      </div>
      <div className="absolute flex h-[501.298px] items-center justify-center left-[425.08px] top-[151.23px] w-[467.458px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[7.854deg] skew-x-[359.705deg]">
          <Testimontials />
        </div>
      </div>
    </div>
  );
}

export default function ForTestimonails() {
  return (
    <div className="relative size-full" data-name="For Testimonails">
      <Group />
    </div>
  );
}