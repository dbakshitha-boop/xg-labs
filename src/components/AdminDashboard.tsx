import React, { useState } from "react";
import svgPaths from "../imports/svg-4x0fsaqv6b";
import imgProductPackaging from "figma:asset/b38d05db3e088fb9946a699913465921149256a5.png";
import { toast } from "sonner@2.0.3";

interface Draft {
  id: string;
  category: string;
  title: string;
  tags: string;
  image: string;
  lastEdited: string;
}

const INITIAL_DRAFTS: Draft[] = [
  {
    id: "1",
    category: "Website + Visual Identity",
    title: "A modern digital presence and clean identity system built for clarity.",
    tags: "BRANDING / WEB",
    image: imgProductPackaging,
    lastEdited: "2 Days before",
  },
  {
    id: "2",
    category: "Website + Visual Identity",
    title: "A modern digital presence and clean identity system built for clarity.",
    tags: "BRANDING / WEB",
    image: imgProductPackaging,
    lastEdited: "2 Days before",
  },
  {
    id: "3",
    category: "Website + Visual Identity",
    title: "A modern digital presence and clean identity system built for clarity.",
    tags: "BRANDING / WEB",
    image: imgProductPackaging,
    lastEdited: "2 Days before",
  },
  {
    id: "4",
    category: "Website + Visual Identity",
    title: "A modern digital presence and clean identity system built for clarity.",
    tags: "BRANDING / WEB",
    image: imgProductPackaging,
    lastEdited: "2 Days before",
  },
];

interface AdminDashboardProps {
  onCreateBlog: () => void;
}

export function AdminDashboard({ onCreateBlog }: AdminDashboardProps) {
  const [drafts] = useState<Draft[]>(INITIAL_DRAFTS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDrafts = drafts.filter((draft) =>
    draft.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white flex min-h-screen w-full relative overflow-hidden">
      {/* Navigation Sidebar */}
      <div className="w-[100px] bg-white border-r border-black shrink-0 hidden md:flex flex-col items-center py-10 sticky top-0 h-screen z-10">
        <div className="bg-[#116dff] rounded-[80px] size-[80px] flex items-center justify-center">
          <svg className="size-[32px] text-white" viewBox="0 0 32 32">
             <path d={svgPaths.pe0b1900} fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-y-auto h-screen">
        <div className="flex flex-col p-6 md:p-12 lg:p-[100px] gap-[60px] md:gap-[80px]">
          
          {/* Header */}
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-[200px] items-start xl:items-center w-full">
            <h1 className="font-['Space_Grotesk'] font-semibold text-4xl md:text-[48px] leading-[1.2] tracking-[-0.96px] text-black uppercase whitespace-pre">
              BLOG BUILDER
            </h1>
            
            {/* Search Bar */}
            <div className="flex-1 w-full xl:max-w-4xl relative">
               <div className="relative w-full rounded-[40px] border border-[#9a9a9a] overflow-hidden">
                  <div className="flex items-center px-6 md:px-[40px] py-4 md:py-[16px] gap-4 md:gap-[24px]">
                    <svg className="size-6 shrink-0" viewBox="0 0 24 24">
                      <path d={svgPaths.p69a6700} fill="black" />
                    </svg>
                    <input 
                      type="text"
                      className="w-full bg-transparent outline-none font-['Sora'] text-lg md:text-[24px] text-black placeholder-black tracking-[-0.48px]"
                      placeholder="Search your article title"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[40px] lg:gap-[80px] w-full">
            
            {/* Create New Blog */}
            <button 
              onClick={onCreateBlog}
              className="group relative h-[100px] w-full"
            >
               <div className="absolute inset-0 rounded-[12px] border border-[#9a9a9a] group-hover:bg-gray-50 transition-colors pointer-events-none" />
               <div className="relative h-full flex items-center justify-center gap-2">
                  <svg className="size-6 shrink-0" viewBox="0 0 24 24">
                    <path d={svgPaths.p89ed1c0} fill="#555555" />
                  </svg>
                  <span className="font-['Space_Grotesk'] font-semibold text-xl md:text-[24px] text-black tracking-[-0.48px] uppercase">
                    Create New Blog
                  </span>
               </div>
            </button>

            {/* Save Draft */}
            <button 
              onClick={() => toast.success("Drafts saved")}
              className="group relative h-[100px] w-full"
            >
              <div className="absolute inset-0 rounded-[12px] border border-[#9a9a9a] group-hover:bg-gray-50 transition-colors pointer-events-none" />
              <div className="relative h-full flex items-center justify-center gap-2">
                 <svg className="size-6 shrink-0" viewBox="0 0 24 24">
                    <path d={svgPaths.p3fadc880} fill="black" />
                 </svg>
                 <span className="font-['Space_Grotesk'] font-normal text-xl md:text-[24px] text-black tracking-[-0.48px] uppercase">
                   Save Draft
                 </span>
              </div>
            </button>

             {/* Manage */}
             <button 
               onClick={() => toast.info("Coming soon")}
               className="group relative h-[100px] w-full"
             >
              <div className="absolute inset-0 rounded-[12px] border border-[#9a9a9a] group-hover:bg-gray-50 transition-colors pointer-events-none" />
              <div className="relative h-full flex items-center justify-center gap-2">
                 <svg className="size-6 shrink-0" viewBox="0 0 24 24">
                    <path d={svgPaths.p23344400} fill="black" />
                 </svg>
                 <span className="font-['Space_Grotesk'] font-normal text-xl md:text-[24px] text-black tracking-[-0.48px] uppercase">
                   Manage
                 </span>
              </div>
            </button>
          </div>

          {/* Saved Drafts */}
          <div className="flex flex-col gap-8 md:gap-[40px] w-full">
            <h2 className="font-['Space_Grotesk'] font-semibold text-2xl md:text-[24px] text-black tracking-[-0.48px] uppercase">
              Saved Drafts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-[40px]">
              {filteredDrafts.map((draft) => (
                <div key={draft.id} className="flex flex-col gap-[22px] w-full group cursor-pointer">
                  {/* Image */}
                  <div className="aspect-[348/321] w-full rounded-[12px] overflow-hidden relative">
                    <img 
                      src={draft.image} 
                      alt={draft.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col gap-[26px]">
                     <div className="flex flex-col gap-[16px]">
                        <span className="font-['Space_Grotesk'] font-semibold text-[16px] text-[#6e6e6e] tracking-[-0.32px] uppercase">
                          {draft.category}
                        </span>
                        <p className="font-['Sora'] font-normal text-[21px] text-[#414141] leading-tight line-clamp-3">
                          {draft.title}
                        </p>
                     </div>
                     <div className="flex items-center gap-2 font-['Space_Grotesk'] font-medium text-[13px]">
                        <span className="text-[#9a9a9a]">Latest Edited:</span>
                        <span className="text-[#5f5f5f]">{draft.lastEdited}</span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}