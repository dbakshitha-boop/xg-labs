import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Quote,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  Indent,
  Outdent,
  Info,
  ChevronDown,
  Baseline,
  Highlighter,
  ArrowUpDown,
  Plus,
  Image as ImageIcon,
  Columns as ColumnsIcon,
  Layout,
  Save,
  Eye,
  Send,
  ImagePlus,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Separator } from "./ui/separator";
import { cn } from "./ui/utils";
import svgPaths from "../imports/svg-7pl6jkx476";

const BLOCK_OPTIONS = [
  { label: "Heading 2", tag: "h2", className: "text-2xl font-bold", size: "24px" },
  { label: "Heading 3", tag: "h3", className: "text-xl font-bold", size: "20px" },
  { label: "Heading 4", tag: "h4", className: "text-lg font-bold", size: "18px" },
  { label: "Heading 5", tag: "h5", className: "text-base font-bold", size: "16px" },
  { label: "Heading 6", tag: "h6", className: "text-sm font-bold", size: "14px" },
  { label: "Paragraph", tag: "p", className: "text-base font-normal", size: "16px" },
];

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96];

interface FloatingMenuProps {
  position: { top: number; left: number } | null;
  onSelect: (tag: string) => void;
  onClose: () => void;
  selectedIndex: number;
}

function FloatingMenu({ position, onSelect, onClose, selectedIndex }: FloatingMenuProps) {
  if (!position) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: 9999,
  };

  return createPortal(
    <div 
      style={style} 
      className="bg-white rounded-lg shadow-xl border border-gray-100 p-2 flex flex-col gap-1 w-[200px] animate-in fade-in zoom-in-95 duration-100"
      onMouseDown={(e) => {
        // Prevent default to keep focus in editor, but allow click to register
        e.preventDefault(); 
        e.stopPropagation();
      }}
    >
       <div className="text-xs font-medium text-gray-400 px-2 py-1 uppercase tracking-wider">Turn into</div>
       {BLOCK_OPTIONS.map((opt, index) => (
         <button
           key={opt.tag}
           onClick={(e) => {
             e.stopPropagation();
             onSelect(opt.tag);
           }}
           className={`text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 outline-none ${
             index === selectedIndex ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
           }`}
         >
           <span className={opt.className}>{opt.label}</span>
         </button>
       ))}
    </div>,
    document.body
  );
}

interface BlogEditorProps {
  onBack: () => void;
  draftTitle?: string;
}

function Sidebar({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-white h-full relative shrink-0 border-r border-black hidden md:flex w-[100px] flex-col items-center py-[40px] z-20">
      <div className="flex items-start justify-center">
        <button onClick={onBack} className="bg-[#116dff] overflow-hidden relative rounded-[80px] size-[80px] hover:opacity-90 transition-opacity">
          <div className="absolute left-1/2 size-[32px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.pe0b1900} fill="white" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

export function BlogEditor({ onBack, draftTitle }: BlogEditorProps) {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuSelectedIndex, setMenuSelectedIndex] = useState(0);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [activeBlockType, setActiveBlockType] = useState("p");
  const [activeFontSize, setActiveFontSize] = useState("16px");

  // Blog Meta State
  const [title, setTitle] = useState(draftTitle || "");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageDialogMode, setImageDialogMode] = useState<'insert' | 'cover'>('insert');
  const [imageUrlInput, setImageUrlInput] = useState("");
  
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: false,
    orderedList: false,
    alignLeft: true,
    alignCenter: false,
    alignRight: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const activeBlockIdRef = useRef<string | null>(null);

  // Sync ref with state for event listeners to avoid stale closures if needed
  useEffect(() => {
    activeBlockIdRef.current = activeBlockId;
  }, [activeBlockId]);

  const ensureBlockId = (element: HTMLElement) => {
    let id = element.getAttribute("data-block-id");
    if (!id) {
      id = Math.random().toString(36).substr(2, 9);
      element.setAttribute("data-block-id", id);
    }
    return id;
  };

  const checkSelection = React.useCallback(() => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      
      // Update Formatting State
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        list: document.queryCommandState('insertUnorderedList'),
        orderedList: document.queryCommandState('insertOrderedList'),
        alignLeft: document.queryCommandState('justifyLeft'),
        alignCenter: document.queryCommandState('justifyCenter'),
        alignRight: document.queryCommandState('justifyRight'),
      });

      const node = selection.anchorNode;
      if (!node) return;
      
      // Ensure we are inside editor
      if (!editorRef.current?.contains(node)) return;

      let element = node.nodeType === Node.ELEMENT_NODE ? node as HTMLElement : node.parentElement;
      
      // Traverse up to find direct child of editor (or the block)
      while (element && element !== editorRef.current) {
        if (element.hasAttribute("data-block-id")) break;
        if (element.parentElement === editorRef.current) break;
        element = element.parentElement;
      }
      
      if (element && element !== editorRef.current) {
         const id = ensureBlockId(element as HTMLElement);
         
         const tag = element.tagName.toLowerCase();
         setActiveBlockType(tag);

         const style = window.getComputedStyle(element);
         setActiveFontSize(style.fontSize);

         if (id !== activeBlockIdRef.current) {
            setActiveBlockId(id);
         }
      }
  }, []);

  // Track active block via selection change
  useEffect(() => {
    document.addEventListener("selectionchange", checkSelection);
    // Initial check
    checkSelection();

    return () => document.removeEventListener("selectionchange", checkSelection);
  }, [checkSelection]);

  // Auto-dismiss: attach listeners only when menu is shown
  useEffect(() => {
    if (!showFloatingMenu) return;

    const handleOutsideClick = (e: MouseEvent) => {
      setShowFloatingMenu(false);
    };

    const handleResizeOrScroll = () => {
      if (activeBlockIdRef.current) {
        const block = document.querySelector(`[data-block-id="${activeBlockIdRef.current}"]`);
        if (block) {
            const rect = block.getBoundingClientRect();
            setMenuPosition({ top: rect.bottom + 10, left: rect.left });
        }
      }
    };

    const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleOutsideClick);
    }, 0);

    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, { capture: true });

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, { capture: true });
    };
  }, [showFloatingMenu]); // Removed activeBlockId dep as we use ref

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    checkSelection();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showFloatingMenu) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMenuSelectedIndex(prev => (prev + 1) % BLOCK_OPTIONS.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setMenuSelectedIndex(prev => (prev - 1 + BLOCK_OPTIONS.length) % BLOCK_OPTIONS.length);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const selectedOption = BLOCK_OPTIONS[menuSelectedIndex];
        updateBlockStyle(activeBlockId!, selectedOption.tag);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowFloatingMenu(false);
        return;
      }
      setShowFloatingMenu(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      let node = selection.anchorNode;
      if (node?.nodeType === Node.TEXT_NODE) node = node.parentNode;
      if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
      
      const element = node as HTMLElement;
      const text = element.textContent || "";
      
      if (text.trim() === "") {
        // ID should have been generated by selectionchange already or we enforce it here
        const blockId = ensureBlockId(element);
        
        // Check if we already logged this in selectionchange? 
        // Logic says "NEW_BLOCK_CREATED" when we detect the new block specifically for overlay
        // It's okay to log it here.
        console.log(`NEW_BLOCK_CREATED: ${blockId}`);

        const rect = element.getBoundingClientRect();
        const top = rect.bottom + 10;
        const left = rect.left;

        setMenuPosition({ top, left });
        setActiveBlockId(blockId);
        setMenuSelectedIndex(0);
        setShowFloatingMenu(true);
        
        console.log(`OVERLAY_SHOWN: top=${top}, left=${left}`);
      }
    }
  };

  const updateBlockStyle = (blockId: string, tag: string) => {
    const block = document.querySelector(`[data-block-id="${blockId}"]`);
    if (!block) return;
    
    console.log(`MODEL_UPDATED: ${blockId} ${tag}`);

    const newBlock = document.createElement(tag);
    newBlock.setAttribute("data-block-id", blockId);
    
    const option = BLOCK_OPTIONS.find(o => o.tag === tag);
    if (option) {
      newBlock.className = option.className;
    }

    // Preserve content
    newBlock.innerHTML = block.innerHTML;
    // If empty and transforming, sometimes we want <br>, but block.innerHTML has that if it was valid editable

    block.parentNode?.replaceChild(newBlock, block);
    
    console.log(`DOM_STYLE_APPLIED: ${blockId} ${tag}`);

    // Restore Focus/Caret
    const selection = window.getSelection();
    const range = document.createRange();
    // Set caret at end of content or start? 
    // Usually if typing, end. If empty, start (which is same).
    // Let's set to end to be safe for non-empty blocks.
    range.selectNodeContents(newBlock);
    range.collapse(false); // false = end
    
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    console.log(`CARET_RESTORED: ${blockId}`);

    setShowFloatingMenu(false);
    // We don't clear activeBlockId here because the block is still active!
  };

  const updateFontSize = (size: string) => {
    if (!activeBlockId) return;
    const block = document.querySelector(`[data-block-id="${activeBlockId}"]`) as HTMLElement;
    if (!block) return;
    
    // Ensure size has units if it's a number
    let newSize = size;
    if (!isNaN(Number(size)) && size.trim() !== '') {
       newSize = `${size}px`;
    }
    
    block.style.fontSize = newSize;
    setActiveFontSize(newSize); 
    console.log(`FONT_SIZE_UPDATED: ${activeBlockId} ${newSize}`);
  };

  const execInsertImage = (url: string) => {
     if (!activeBlockId) return;
     const currentBlock = document.querySelector(`[data-block-id="${activeBlockId}"]`);
     if (!currentBlock) return;
     
     const img = document.createElement("img");
     img.src = url;
     img.className = "w-full h-auto rounded-lg my-4 shadow-sm";
     img.setAttribute("data-block-id", Math.random().toString(36).substr(2, 9));
     
     currentBlock.parentNode?.insertBefore(img, currentBlock.nextSibling);
     
     if (currentBlock.tagName === 'P' && currentBlock.textContent?.trim() === '') {
        currentBlock.remove();
     }
  };

  const handleImageSubmit = () => {
     if (!imageUrlInput) return;

     if (imageDialogMode === 'cover') {
        setCoverImage(imageUrlInput);
     } else {
        execInsertImage(imageUrlInput);
     }
     setIsImageDialogOpen(false);
     setImageUrlInput("");
  };

  const insertColumns = (cols: number) => {
     if (!activeBlockId) return;
     const currentBlock = document.querySelector(`[data-block-id="${activeBlockId}"]`);
     if (!currentBlock) return;
     
     const grid = document.createElement("div");
     grid.className = `grid grid-cols-1 ${cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 my-4`;
     grid.setAttribute("data-block-id", Math.random().toString(36).substr(2, 9));
     
     for (let i = 0; i < cols; i++) {
        const col = document.createElement("div");
        col.className = "border border-dashed border-gray-200 p-4 rounded-lg bg-gray-50 min-h-[100px]";
        
        const p = document.createElement("p");
        p.setAttribute("data-block-id", Math.random().toString(36).substr(2, 9));
        p.textContent = `Column ${i + 1}`;
        p.className = "text-base font-normal";
        
        col.appendChild(p);
        grid.appendChild(col);
     }
     
     currentBlock.parentNode?.insertBefore(grid, currentBlock.nextSibling);
     
     if (currentBlock.tagName === 'P' && currentBlock.textContent?.trim() === '') {
        currentBlock.remove();
     }
  };

  const handleToolbarAction = (tag: string) => {
    if (!activeBlockId) return;
    console.log(`TOOLBAR_APPLY_REQUEST: ${activeBlockId} ${tag}`);
    updateBlockStyle(activeBlockId, tag);
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-['Space_Grotesk']">
      {/* Sidebar */}
      <Sidebar onBack={onBack} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
        {/* Top Header */}
        <div id="panel" className="h-[80px] md:h-[100px] border-b border-black flex items-center justify-between px-4 md:px-[40px] shrink-0 bg-white z-10 w-full">
          
          {/* Functional Toolbar */}
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar mask-gradient flex-1 mr-4 h-full">
             {/* Insert Menu */}
             <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center justify-center size-8 hover:bg-gray-50 rounded-md text-gray-700 outline-none data-[state=open]:bg-gray-100 mr-1" aria-label="Insert">
                        <Plus className="size-5" />
                      </button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Insert</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="start" className="w-48 bg-white border border-gray-100 shadow-lg rounded-lg p-1">
                  <DropdownMenuItem onClick={() => { setImageDialogMode('insert'); setIsImageDialogOpen(true); }} className="gap-2 cursor-pointer outline-none hover:bg-gray-50 rounded px-2 py-1.5 flex items-center">
                    <ImageIcon className="size-4 text-gray-500" />
                    <span>Image</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => insertColumns(2)} className="gap-2 cursor-pointer outline-none hover:bg-gray-50 rounded px-2 py-1.5 flex items-center">
                    <ColumnsIcon className="size-4 text-gray-500" />
                    <span>2 Columns</span>
                  </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => insertColumns(3)} className="gap-2 cursor-pointer outline-none hover:bg-gray-50 rounded px-2 py-1.5 flex items-center">
                    <Layout className="size-4 text-gray-500" />
                    <span>3 Columns</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>

             <Separator orientation="vertical" className="h-5 mx-1" />

             {/* Paragraph Select */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-md text-gray-700 whitespace-nowrap data-[state=open]:bg-gray-100 outline-none" aria-label="Text Style (Heading / Paragraph)">
                      <span className="text-sm font-medium">
                        {BLOCK_OPTIONS.find(o => o.tag === activeBlockType)?.label || "Paragraph"}
                      </span>
                      <ChevronDown className="size-4 opacity-50 transition-transform duration-200" />
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Text Style (Heading / Paragraph)</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start" className="w-64 p-2 rounded-xl shadow-xl border border-gray-100 bg-white">
                {BLOCK_OPTIONS.map((item) => (
                  <DropdownMenuItem
                    key={item.tag}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleToolbarAction(item.tag)}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50 group/item outline-none"
                  >
                    <div className="size-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 font-serif shrink-0 bg-gray-50/50">
                      A
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className={`text-gray-900 leading-tight ${item.style === "text-base font-normal" ? "font-medium" : "font-bold"}`}>{item.label}</span>
                      <span className="text-xs text-gray-400 font-normal">{item.size || "16px"}</span> 
                    </div>
                    <ChevronDown className="size-4 text-gray-300 -rotate-90 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Separator orientation="vertical" className="h-5 mx-1" />

            {/* Font Size */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-md text-gray-700 whitespace-nowrap outline-none data-[state=open]:bg-gray-100" aria-label="Font Size">
                      <span className="text-sm font-medium">
                         {activeFontSize ? activeFontSize.replace("px", "") : "16"}
                      </span>
                      <ChevronDown className="size-4 opacity-50 transition-transform duration-200" />
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Font Size</TooltipContent>
              </Tooltip>
              <DropdownMenuContent className="max-h-[300px] overflow-y-auto min-w-[80px] p-1" align="start">
                 {FONT_SIZES.map(size => (
                    <DropdownMenuItem 
                      key={size}
                      onClick={() => updateFontSize(size.toString())}
                      className="cursor-pointer justify-center"
                    >
                      {size}
                    </DropdownMenuItem>
                 ))}
                 <div className="p-2 border-t border-gray-100 mt-1">
                     <Input 
                        className="h-7 text-sm px-2 w-full text-center" 
                        placeholder="px"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                updateFontSize(e.currentTarget.value);
                            }
                        }}
                        onClick={(e) => e.stopPropagation()} 
                     />
                 </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-5 mx-1" />

            {/* Formatting Group 1 */}
            <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-8 w-8 text-black", activeFormats.bold && "bg-gray-200")} 
                    onClick={() => handleFormat('bold')}
                    aria-label="Bold"
                  >
                    <Bold className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-8 w-8 text-black", activeFormats.italic && "bg-gray-200")} 
                    onClick={() => handleFormat('italic')}
                    aria-label="Italic"
                  >
                    <Italic className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-8 w-8 text-black", activeFormats.underline && "bg-gray-200")} 
                    onClick={() => handleFormat('underline')}
                    aria-label="Underline"
                  >
                    <Underline className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-black" aria-label="Text Color">
                    <Baseline className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Text Color</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-black" aria-label="Highlight Color">
                    <Highlighter className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Highlight Color</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-5 mx-1" />

            {/* Formatting Group 2 */}
            <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-black" 
                    onClick={() => {
                        const url = prompt('Enter link URL:');
                        if (url) handleFormat('createLink', url);
                    }}
                    aria-label="Link"
                  >
                    <LinkIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Link</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-black" 
                    onClick={() => handleFormat('formatBlock', 'blockquote')}
                    aria-label="Quote"
                  >
                    <Quote className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Quote</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-black" 
                    onClick={() => handleFormat('formatBlock', 'pre')}
                    aria-label="Code Snippet"
                  >
                    <Code className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Code Snippet</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-5 mx-1" />

             {/* Formatting Group 3 */}
             <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-8 w-8 text-black", activeFormats.list && "bg-gray-200")} 
                    onClick={() => handleFormat('insertUnorderedList')}
                    aria-label="Bullet List"
                  >
                    <List className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bullet List</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-8 w-8 text-black", activeFormats.orderedList && "bg-gray-200")} 
                    onClick={() => handleFormat('insertOrderedList')}
                    aria-label="Numbered List"
                  >
                    <ListOrdered className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Numbered List</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-black flex gap-0.5" 
                    onClick={() => {
                      if (activeFormats.alignLeft) handleFormat('justifyCenter');
                      else if (activeFormats.alignCenter) handleFormat('justifyRight');
                      else handleFormat('justifyLeft');
                    }}
                    aria-label="Alignment"
                  >
                     <AlignLeft className="size-4" />
                     <ChevronDown className="size-3 opacity-50" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Alignment (Click to Cycle)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-black flex gap-0.5" aria-label="Line Spacing">
                     <ArrowUpDown className="size-4" />
                     <ChevronDown className="size-3 opacity-50" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Line Spacing</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-5 mx-1" />

            {/* Formatting Group 4 */}
            <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-black" 
                    onClick={() => handleFormat('indent')}
                    aria-label="Increase Indent"
                  >
                    <Indent className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Increase Indent</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-black" 
                    onClick={() => handleFormat('outdent')}
                    aria-label="Decrease Indent"
                  >
                    <Outdent className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Decrease Indent</TooltipContent>
              </Tooltip>
            </div>

             <Separator orientation="vertical" className="h-5 mx-1" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-black" aria-label="Post Info">
                  <Info className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Post Info</TooltipContent>
            </Tooltip>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 pl-4 border-l border-gray-100 ml-2">
             <Button variant="ghost" size="sm" className="gap-2 text-gray-500 font-medium">
               <Save className="size-4" /> Save
             </Button>
             <Button variant="ghost" size="sm" className="gap-2 text-gray-500 font-medium">
               <Eye className="size-4" /> Preview
             </Button>
             <Button size="sm" className="gap-2 bg-black text-white hover:bg-gray-800 rounded-full px-6 font-medium">
               <Send className="size-4" /> Publish
             </Button>
          </div>
        </div>

        {/* Editor Content Area */}
        <div id="canvas" className="flex-1 overflow-y-auto bg-gray-50/30 relative">
           <div className="max-w-[900px] mx-auto min-h-full bg-white shadow-sm my-8 p-8 md:p-16 lg:px-[100px] lg:py-16 rounded-xl border border-gray-100">
             
             {/* Cover Image */}
             <div className="group relative mb-8">
                {coverImage ? (
                  <div className="relative h-[300px] w-full rounded-xl overflow-hidden group-hover:shadow-md transition-shadow">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setCoverImage(null)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="outline" size="sm" className="gap-2 text-gray-500 hover:text-black" onClick={() => { setImageDialogMode('cover'); setIsImageDialogOpen(true); }}>
                      <ImagePlus className="size-4" /> Add Cover
                    </Button>
                  </div>
                )}
             </div>

             {/* Title */}
             <div className="mb-8">
               <input
                 type="text"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 placeholder="Post Title"
                 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold w-full outline-none placeholder:text-gray-300 tracking-tight text-black bg-transparent"
               />
             </div>
             
             {/* Editor */}
             <div 
               className="w-full min-h-[500px] outline-none text-lg md:text-xl text-gray-800 leading-relaxed font-['Sora'] empty:before:content-[attr(placeholder)] empty:before:text-gray-300 cursor-text" 
               contentEditable 
               suppressContentEditableWarning
               placeholder="Start writing your story..." 
               ref={editorRef}
               onKeyDown={handleKeyDown}
               onKeyUp={handleKeyUp}
             />
           </div>
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{imageDialogMode === 'cover' ? 'Set Cover Image' : 'Insert Image'}</DialogTitle>
            <DialogDescription>
               {imageDialogMode === 'cover' ? 'Enter the URL for the post cover image.' : 'Enter the URL for the image to insert.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Input 
              value={imageUrlInput} 
              onChange={(e) => setImageUrlInput(e.target.value)} 
              placeholder="https://example.com/image.jpg"
              onKeyDown={(e) => e.key === 'Enter' && handleImageSubmit()}
            />
          </div>
          <DialogFooter>
             <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>Cancel</Button>
             <Button onClick={handleImageSubmit}>{imageDialogMode === 'cover' ? 'Set Cover' : 'Insert Image'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <FloatingMenu 
        position={showFloatingMenu ? menuPosition : null} 
        onSelect={(tag) => updateBlockStyle(activeBlockId!, tag)} 
        onClose={() => setShowFloatingMenu(false)}
        selectedIndex={menuSelectedIndex} 
      />
    </div>
  );
}
