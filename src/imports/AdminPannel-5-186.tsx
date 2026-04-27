import svgPaths from "./svg-4x0fsaqv6b";
import imgProductPackaging from "figma:asset/b38d05db3e088fb9946a699913465921149256a5.png";

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

function MaterialSymbolsSearch() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:search">
          <path d={svgPaths.p69a6700} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Search Bar">
      <MaterialSymbolsSearch />
      <p className="basis-0 font-['Sora:Regular',sans-serif] font-normal grow leading-[1.2] min-h-px min-w-px relative shrink-0 text-[24px] text-black tracking-[-0.48px]">Search your article title</p>
    </div>
  );
}

function SearchContainer() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[40px] shrink-0" data-name="Search Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[40px] py-[16px] relative w-full">
          <SearchBar />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#9a9a9a] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function SearchContainer1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Search Container">
      <SearchContainer />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex gap-[400px] items-start relative shrink-0 w-full" data-name="Header">
      <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[48px] text-black text-nowrap tracking-[-0.96px] uppercase whitespace-pre">BLOG BUILDER</p>
      <SearchContainer1 />
    </div>
  );
}

function IcBaselinePlus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic:baseline-plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic:baseline-plus">
          <path d={svgPaths.p89ed1c0} fill="var(--fill-0, #555555)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CreateBlogButtonContent() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Create Blog Button Content">
      <IcBaselinePlus />
      <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Create New Blog</p>
    </div>
  );
}

function CreateBlogButton() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[12px] self-stretch shrink-0" data-name="Create Blog Button">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <CreateBlogButtonContent />
      </div>
      <div aria-hidden="true" className="absolute border border-[#9a9a9a] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function MaterialSymbolsSaveOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:save-outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:save-outline">
          <path d={svgPaths.p3fadc880} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SaveDraftButtonContent() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Save Draft Button Content">
      <MaterialSymbolsSaveOutline />
      <p className="font-['Space_Grotesk:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Save Draft</p>
    </div>
  );
}

function SaveDraftButton() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[12px] self-stretch shrink-0" data-name="Save Draft Button">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[161px] py-[35px] relative size-full">
          <SaveDraftButtonContent />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#9a9a9a] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function MaterialSymbolsFolderManagedOutlineSharp() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:folder-managed-outline-sharp">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:folder-managed-outline-sharp">
          <path d={svgPaths.p23344400} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ManageButtonContent() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Manage Button Content">
      <MaterialSymbolsFolderManagedOutlineSharp />
      <p className="font-['Space_Grotesk:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Manage</p>
    </div>
  );
}

function ManageButton() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[12px] self-stretch shrink-0" data-name="Manage Button">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-0 py-[35px] relative rounded-[inherit] size-full">
        <ManageButtonContent />
      </div>
      <div aria-hidden="true" className="absolute border border-[#9a9a9a] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="content-stretch flex gap-[80px] items-start relative shrink-0 w-full" data-name="Action Buttons">
      <CreateBlogButton />
      <SaveDraftButton />
      <ManageButton />
    </div>
  );
}

function ProductPackaging() {
  return (
    <div className="h-[321.482px] relative rounded-[7.367px] shrink-0 w-full" data-name="Product packaging">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.367px] size-full" src={imgProductPackaging} />
    </div>
  );
}

function DescriptionContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Description Container">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#414141] text-[21.432px] w-full">A modern digital presence and clean identity system built for clarity.</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[16.074px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6e6e6e] text-[16.074px] tracking-[-0.3215px] uppercase w-full">Website + Visual Identity</p>
      <DescriptionContainer />
    </div>
  );
}

function LastEditDate() {
  return (
    <div className="content-stretch flex font-['Space_Grotesk:Medium',sans-serif] font-medium gap-[8px] items-start leading-[normal] relative shrink-0 text-[13.395px] text-nowrap w-full whitespace-pre" data-name="Last Edit Date">
      <p className="relative shrink-0 text-[#9a9a9a]">Latest Edited:</p>
      <p className="relative shrink-0 text-[#5f5f5f]">2 Days before</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[26.79px] items-start relative shrink-0 w-full" data-name="Container">
      <Content />
      <LastEditDate />
    </div>
  );
}

function BlogCard() {
  return (
    <div className="content-stretch flex flex-col gap-[21.432px] items-start relative shrink-0 w-[348.272px]" data-name="Blog Card">
      <ProductPackaging />
      <Container />
    </div>
  );
}

function SavedDraftsList() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Saved Drafts List">
      {[...Array(4).keys()].map((_, i) => (
        <BlogCard key={i} />
      ))}
    </div>
  );
}

function SavedDraftsSection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Saved Drafts Section">
      <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Saved Drafts</p>
      <SavedDraftsList />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[80px] items-start px-[100px] py-[40px] relative size-full">
          <Header />
          <ActionButtons />
          <SavedDraftsSection />
        </div>
      </div>
    </div>
  );
}

export default function AdminPannel() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="admin Pannel">
      <Navigation />
      <MainContent />
    </div>
  );
}