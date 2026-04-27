import svgPaths from "./svg-7pl6jkx476";
import imgPannel from "figma:asset/0b3ad41be149e1b5440c2bb2237420e8a42d7cd5.png";

function MdiBlogOutline() {
  return (
    <div className="absolute left-1/2 size-[32px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="mdi:blog-outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="mdi:blog-outline">
          <path d={svgPaths.pe0b1900} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BlogBuilder() {
  return (
    <div className="bg-[#116dff] overflow-clip relative rounded-[80px] size-[80px]" data-name="Blog builder">
      <MdiBlogOutline />
    </div>
  );
}

function Navigation() {
  return (
    <div className="bg-white h-full relative shrink-0" data-name="Navigation">
      <div className="content-stretch flex h-full items-start overflow-clip px-[10px] py-[40px] relative rounded-[inherit]">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <BlogBuilder />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex items-center justify-center px-[14px] py-[12px] relative shrink-0" data-name="Action">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
      <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#a7a7a7] text-[24px] text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Save Draft</p>
    </div>
  );
}

function Action1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[14px] py-[12px] relative rounded-[40px] shrink-0" data-name="Action">
      <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#a7a7a7] text-[24px] text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Preview</p>
    </div>
  );
}

function ActionGroup() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Action Group">
      <Action />
      <Action1 />
    </div>
  );
}

function Action2() {
  return (
    <div className="bg-[#116dff] content-stretch flex items-center justify-center px-[14px] py-[12px] relative rounded-[40px] shrink-0" data-name="Action">
      <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[24px] text-nowrap text-white tracking-[-0.48px] uppercase whitespace-pre">Publish</p>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <ActionGroup />
      <Action2 />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-center justify-between pb-0 pl-0 pr-[40px] pt-[24px] relative shrink-0 w-[1820px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <div className="h-[73px] pointer-events-none relative shrink-0 w-[1075px]" data-name="Pannel">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[116.62%] left-[-55.47%] max-w-none top-[-5.48%] w-[193.77%]" src={imgPannel} />
        </div>
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0" />
      </div>
      <Actions />
    </div>
  );
}

export default function CreateNewBlog() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Create new Blog">
      <Navigation />
      <Header />
    </div>
  );
}