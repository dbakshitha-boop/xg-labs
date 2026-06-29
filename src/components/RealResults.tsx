import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import imgLogo from "figma:asset/e41dee190168d7591c7b7b8c43b6c0799cb1032a.png";
import imgRectangle from "figma:asset/192d853c9f27ed907c5b4d6ebe963ebe82df6c24.png";
import imgLogo1 from "../assets/trustedbrands/White Logo.png";
import imgLogo2 from "../assets/03355682553ef5be67447967b63be12b656b183b.png";
import imgLogo3 from "../assets/trustedbrands/Creen Primary Logo.png";
import imgLogoSlam from "../assets/trustedbrands/slam_logo.png";
import imgLogo5 from "../assets/03f08e77f2789523074211d0a0c7a7d862b8e2bd.png";
import { useCursor } from "./ui/CustomCursor";

export function RealResults() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1, once: true });
  const [scale, setScale] = React.useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { setVariant } = useCursor();

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
      const padding = 200; 
      const baseWidth = 1900; 
      const availableWidth = Math.max(window.innerWidth - padding, 300);
      let newScale = availableWidth / baseWidth;
      if (newScale > 1) newScale = 1;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section 
        ref={containerRef} 
        onMouseEnter={() => setVariant('default')}
        className="relative min-h-screen w-full bg-[#060606] overflow-x-hidden flex flex-col items-center justify-center py-20"
    >
        
        {/* Header Text */}
        <div className="text-center z-10 px-4 mb-10 md:mb-16 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-sm md:text-base font-space font-medium tracking-wide uppercase mb-4"
          >
            REAL BRANDS. REAL RESULTS.
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white text-3xl md:text-5xl lg:text-6xl font-space font-medium leading-tight max-w-4xl mx-auto"
          >
            Feedback that shows how our work drives clarity, growth, and measurable
          </motion.h3>
        </div>

        {/* Cards Container */}
        <div 
            className={`w-full relative flex justify-center ${isMobile ? 'h-auto mt-4' : ''}`} 
            style={{ height: isMobile ? 'auto' : 600 * scale }}
        >
             <div 
                className={isMobile ? "w-full max-w-[100vw]" : "absolute top-0 left-1/2 origin-top"}
                style={isMobile ? {} : { 
                    width: 1900, 
                    height: 600, 
                    transform: `translateX(-50%) scale(${scale})`,
                }}
             >
                <Cards isInView={isInView} isMobile={isMobile} />
             </div>
        </div>
    </section>
  );
}

function Cards({ isInView, isMobile }: { isInView: boolean, isMobile: boolean }) {
    const stackLeft = 746.5;
    const stackTop = 75;
    const { setVariant, setText } = useCursor();

    const cardsData = [
        {
            id: "blue-1",
            component: CardBlue,
            spread: { left: 127, top: 75, rotate: -5.89 },
            stack: { left: stackLeft, top: stackTop, rotate: -10.89 },
            zIndex: 1,
            delay: 0.1,
            quote: "Kalki Handicraft had a strong offline presence, but XG Labs helped us build a digital ecosystem that finally matched our ambition.",
            name: "Chetan Singh",
            role: "Founder, Kalki Handicraft",
            logo: imgLogo1,
        },
        {
            id: "purple",
            component: CardPurple,
            spread: { left: 776, top: 75, rotate: -11.78 },
            stack: { left: stackLeft, top: stackTop, rotate: -8.78 },
            zIndex: 2,
            delay: 0.2,
            quote: "XG Labs translated our vision into a brand identity that feels relatable, memorable, and ready for the Malaysian market.",
            name: "Shashidaraan Nair",
            role: "CEO, Go Wheels",
            logo: imgLogo3,
        },
        {
            id: "white",
            component: CardWhite,
            spread: { left: 1098, top: 75, rotate: -3.93 },
            stack: { left: stackLeft, top: stackTop, rotate: -5.93 },
            zIndex: 3,
            delay: 0.3,
            quote: "The consistency and quality of content from XG Labs gave our social media presence a completely new level of professionalism.",
            name: "Udhay",
            role: "Manager, SLAM Fitness & Lifestyle Studio",
            logo: imgLogoSlam,
        },
        {
            id: "blue-2",
            component: CardBlue,
            spread: { left: 1366, top: 65, rotate: -9.82 },
            stack: { left: stackLeft, top: stackTop, rotate: -5.82 },
            zIndex: 4,
            delay: 0.4,
            quote: "They don't just create videos, they understand our brand voice and turn ideas into content our audience genuinely connects with.",
            name: "Amarnadh",
            role: "Owner, Andhra Spicy House",
            logo: imgLogo5,
        },
        {
            id: "green",
            component: CardGreen,
            spread: { left: 452, top: 115, rotate: 7.85 },
            stack: { left: stackLeft, top: stackTop, rotate: -0.15 },
            zIndex: 5,
            delay: 0.5,
            quote: "XG Labs brought structure to our lead generation efforts and helped us build stronger trust with potential customers online.",
            name: "Ranjith Manimaran",
            role: "CEO, SML CARS",
            logo: imgLogo2,
        },
    ];

    if (isMobile) {
        return (
            <div 
                className="flex flex-nowrap w-full overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-12 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {cardsData.map((card, index) => (
                    <div
                        key={card.id}
                        className="snap-start shrink-0 w-[85vw] md:w-[42vw] first:ml-0 last:mr-4"
                    >
                         <card.component isMobile={true} quote={card.quote} name={card.name} role={card.role} logo={card.logo} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            {cardsData.map((card, index) => (
                <motion.div
                    key={card.id}
                    className="absolute !cursor-none"
                    initial={{
                        left: card.stack.left,
                        top: card.stack.top,
                        rotate: card.stack.rotate,
                    }}
                    animate={isInView ? {
                        left: card.spread.left,
                        top: card.spread.top,
                        rotate: card.spread.rotate,
                    } : {}}
                    transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 15,
                        delay: card.delay * 0.5 // Faster stagger
                    }}
                    style={{ zIndex: card.zIndex }}
                    whileHover={{ 
                        scale: 1.05, 
                        zIndex: 100,
                        rotate: 0,
                        transition: { duration: 0.2 }
                    }}
                    onMouseEnter={() => {
                        setVariant('button');
                        setText('READ');
                    }}
                    onMouseLeave={() => {
                        setVariant('default');
                        setText(null);
                    }}
                >
                    {/* Floating Motion Wrapper */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 4 + index, // Varied duration for organic feel
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                        }}
                    >
                        <card.component isMobile={false} quote={card.quote} name={card.name} role={card.role} logo={card.logo} />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}

// --- Card Components ---

const CardBase = ({ bg, children, shadow = "shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]" }: { bg: string, children: React.ReactNode, shadow?: string }) => (
    <div className={`relative w-full h-full rounded-[12px] overflow-hidden ${bg} ${shadow} p-[28px] flex flex-col`}>
        {children}
    </div>
);

const CardHeader = ({ name, role, logo }: { name: string; role: string; logo: string }) => (
    <div className="w-full flex justify-between items-start">
         <div style={{ width: 80, height: 80, flexShrink: 0, position: 'relative' }}>
            <img src={logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left top' }} />
         </div>
         <div className="flex flex-col items-end text-right">
             <p className="text-[#6e6e6e] text-[16px] font-sora leading-[1.2]">—{name}</p>
             <p className="text-[#9a9a9a] text-[16px] font-sora">{role}</p>
         </div>
    </div>
);

const CardBody = ({ quote }: { quote: string }) => (
    <div style={{ width: '100%', marginTop: 'auto' }}>
        <p className="font-space font-medium text-[#414141] uppercase" style={{ fontSize: 28, lineHeight: 1.25, letterSpacing: '-0.5px', margin: 0 }}>
            {quote}
        </p>
    </div>
);

const CardContent = ({ name, role, quote, logo }: { name: string; role: string; quote: string; logo: string }) => (
    <>
        <CardHeader name={name} role={role} logo={logo} />
        <CardBody quote={quote} />
    </>
);

const WithHoverLogo = ({ children, isMobile, logo }: { children: React.ReactNode; isMobile: boolean; logo: string }) => {
    if (isMobile) {
        return (
            <div className="relative w-full h-[400px] md:h-[450px]">
                {children}
            </div>
        );
    }

    return (
        <motion.div
            className="relative w-full max-w-[407px] h-[450px]"
            initial="initial"
            whileHover="hover"
        >
            {/* Logo Card - APPEARS ON HOVER */}
            <motion.div
                className="absolute bg-[#f9f9f9] rounded-[12px] shadow-2xl overflow-hidden"
                style={{
                    width: 200,
                    height: 200,
                    zIndex: 20,
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    transformOrigin: "center center"
                }}
                variants={{
                    initial: {
                        opacity: 0,
                        x: 80,
                        y: 80,
                        scale: 0.8
                    },
                    hover: {
                        opacity: 1,
                        x: -60,
                        y: -60,
                        scale: 1,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }
                    }
                }}
            >
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </motion.div>

            {/* Main Card Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
};

interface CardProps {
    isMobile?: boolean;
    name: string;
    role: string;
    quote: string;
    logo: string;
}

const CardBlue = ({ isMobile = false, name, role, quote, logo }: CardProps) => (
    <WithHoverLogo isMobile={isMobile} logo={logo}>
        <div className="w-full h-full relative">
            <div className="absolute inset-[22%] opacity-10 pointer-events-none rounded-[12px] overflow-hidden">
                <img src={imgLogo} alt="" className="w-full h-full object-cover" />
            </div>
            <CardBase bg="bg-[#b3e5fc]">
                <CardContent name={name} role={role} quote={quote} logo={logo} />
            </CardBase>
        </div>
    </WithHoverLogo>
);

const CardPurple = ({ isMobile = false, name, role, quote, logo }: CardProps) => (
    <WithHoverLogo isMobile={isMobile} logo={logo}>
        <div className="w-full h-full relative">
            <div className="absolute inset-[22%] opacity-10 pointer-events-none rounded-[12px] overflow-hidden">
                <img src={imgLogo} alt="" className="w-full h-full object-cover" />
            </div>
            <CardBase bg="bg-[#d8c0ff]">
                <CardContent name={name} role={role} quote={quote} logo={logo} />
            </CardBase>
        </div>
    </WithHoverLogo>
);

const CardWhite = ({ isMobile = false, name, role, quote, logo }: CardProps) => (
    <WithHoverLogo isMobile={isMobile} logo={logo}>
        <div className="w-full h-full relative">
            <div className="absolute inset-[22%] opacity-10 pointer-events-none rounded-[12px] overflow-hidden">
                <img src={imgLogo} alt="" className="w-full h-full object-cover" />
            </div>
            <CardBase bg="bg-white">
                <CardContent name={name} role={role} quote={quote} logo={logo} />
            </CardBase>
        </div>
    </WithHoverLogo>
);

const CardGreen = ({ isMobile = false, name, role, quote, logo }: CardProps) => (
    <WithHoverLogo isMobile={isMobile} logo={logo}>
        <div className="w-full h-full relative">
            <div className="absolute inset-[22%] opacity-10 pointer-events-none rounded-[12px] overflow-hidden">
                <img src={imgLogo} alt="" className="w-full h-full object-cover" />
            </div>
            <CardBase bg="bg-[#d9fb60]">
                <CardContent name={name} role={role} quote={quote} logo={logo} />
            </CardBase>
        </div>
    </WithHoverLogo>
);