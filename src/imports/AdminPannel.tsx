import svgPaths from "./svg-ufa2s7zact";
import imgProductPackaging from "figma:asset/b38d05db3e088fb9946a699913465921149256a5.png";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[100px] min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#9a9a9a] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

export default function AdminPannel() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="admin Pannel">
      <div className="bg-white h-full relative shrink-0" data-name="Navigation">
        <div className="content-stretch flex h-full items-start overflow-clip px-[10px] py-[40px] relative rounded-[inherit]">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="bg-[#116dff] overflow-clip relative rounded-[80px] size-[80px]" data-name="Blog builder">
                <div className="absolute left-1/2 size-[32px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="mdi:blog-outline">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="mdi:blog-outline">
                      <path d={svgPaths.pe0b1900} fill="var(--fill-0, white)" id="Vector" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[80px] items-start px-[100px] py-[40px] relative size-full">
            <div className="content-stretch flex gap-[400px] items-start relative shrink-0 w-full">
              <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[48px] text-black text-nowrap tracking-[-0.96px] uppercase whitespace-pre">BLOG BUILDER</p>
              <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
                <div className="basis-0 grow min-h-px min-w-px relative rounded-[40px] shrink-0">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex gap-[24px] items-center px-[40px] py-[16px] relative w-full">
                      <Wrapper>
                        <g id="material-symbols:search">
                          <path d={svgPaths.p69a6700} fill="var(--fill-0, black)" id="Vector" />
                        </g>
                      </Wrapper>
                      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] whitespace-pre">Search your article title</p>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-[#9a9a9a] border-solid inset-0 pointer-events-none rounded-[40px]" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[80px] items-start relative shrink-0 w-full">
              <Wrapper1>
                <div className="absolute content-stretch flex gap-[8px] items-center left-[calc(50%-0.33px)] top-[36px] translate-x-[-50%]">
                  <Wrapper>
                    <g id="ic:baseline-plus">
                      <path d={svgPaths.p89ed1c0} fill="var(--fill-0, #555555)" id="Vector" />
                    </g>
                  </Wrapper>
                  <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Create New Blog</p>
                </div>
              </Wrapper1>
              <Wrapper1>
                <div className="absolute content-stretch flex gap-[8px] items-center left-1/2 top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%]">
                  <Wrapper>
                    <g id="material-symbols:save-outline">
                      <path d={svgPaths.p3fadc880} fill="var(--fill-0, black)" id="Vector" />
                    </g>
                  </Wrapper>
                  <p className="font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Save Draft</p>
                </div>
              </Wrapper1>
              <Wrapper1>
                <div className="absolute content-stretch flex gap-[8px] items-center left-[195.67px] top-[36px]">
                  <Wrapper>
                    <g id="material-symbols:folder-managed-outline-sharp">
                      <path d={svgPaths.p23344400} fill="var(--fill-0, black)" id="Vector" />
                    </g>
                  </Wrapper>
                  <p className="font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Manage</p>
                </div>
              </Wrapper1>
            </div>
            <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
              <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px] uppercase whitespace-pre">Saved Drafts</p>
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                {[...Array(2).keys()].map((_, i) => (
                  <div className="content-stretch flex flex-col gap-[21.432px] items-start relative shrink-0 w-[348.272px]" data-name="Product Card">
                    <div className="h-[321.482px] relative rounded-[7.367px] shrink-0 w-full" data-name="Product packaging">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.367px] size-full" src={imgProductPackaging} />
                    </div>
                    <div className="content-stretch flex flex-col gap-[26.79px] items-start relative shrink-0 w-full" data-name="Container">
                      <div className="content-stretch flex flex-col gap-[16.074px] items-start relative shrink-0 w-full" data-name="Content">
                        <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6e6e6e] text-[16.074px] tracking-[-0.3215px] uppercase w-full">Website + Visual Identity</p>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Description Container">
                          <p className="font-['Sora:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#414141] text-[21.432px] w-full">A modern digital presence and clean identity system built for clarity.</p>
                        </div>
                      </div>
                      <p className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#5f5f5f] text-[13.395px] w-full">BRANDING / WEB</p>
                    </div>
                  </div>
                ))}
                {[...Array(2).keys()].map((_, i) => (
                  <div className="content-stretch flex flex-col gap-[20.939px] items-start relative shrink-0 w-[340.259px]" data-name="Product Card">
                    <div className="h-[314.085px] relative rounded-[7.198px] shrink-0 w-full" data-name="Product packaging">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.198px] size-full" src={imgProductPackaging} />
                    </div>
                    <div className="content-stretch flex flex-col gap-[26.174px] items-start relative shrink-0 w-full" data-name="Container">
                      <div className="content-stretch flex flex-col gap-[15.704px] items-start relative shrink-0 w-full" data-name="Content">
                        <p className="font-['Space_Grotesk:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6e6e6e] text-[15.704px] tracking-[-0.3141px] uppercase w-full">Website + Visual Identity</p>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Description Container">
                          <p className="font-['Sora:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#414141] text-[20.939px] w-full">A modern digital presence and clean identity system built for clarity.</p>
                        </div>
                      </div>
                      <p className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#5f5f5f] text-[13.087px] w-full">BRANDING / WEB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}