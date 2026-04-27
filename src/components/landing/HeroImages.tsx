import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

import imgImage from "figma:asset/3c2c8cefce5b34701acad992ed09e777d455d5d9.png";
import imgImage1 from "figma:asset/8f9e45e34b390cad65d224cd4228fa1ab5977543.png";
import imgImage2 from "figma:asset/57b2a045a1c474c35c83405b1c0e732165941c8c.png";
import imgImage3 from "figma:asset/06355012afb0087b8c9bfc9843e66981c1b4fc10.png";
import imgImage4 from "figma:asset/3928f5a725db8937d4474329e22213a3e4710bec.png";
import imgImage5 from "figma:asset/7fb04902ca908bbcead7b1bfd2272d87b766cc5b.png";
import imgImage6 from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import imgImage7 from "figma:asset/d1e53c97c1810297d3642b6fa789643c8fe962af.png";
import imgImage8 from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png";
import imgImage9 from "figma:asset/83d4a69b3e9c8f0a9728fcee74adb0198bf260f8.png";
import imgImage10 from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import imgImage11 from "figma:asset/fad7be819dbbdd4aa88e7779ed4b7c2a87bf23e6.png";

const col1 = [imgImage, imgImage1, imgImage2, imgImage3];
const col2 = [imgImage4, imgImage5, imgImage6, imgImage7, imgImage5]; // Repeated image5 as per Frame484
const col3 = [imgImage8, imgImage9, imgImage10, imgImage11];

function Column({ images, y, className }: { images: string[], y: MotionValue<string>, className?: string }) {
    return (
        <motion.div style={{ y }} className={`flex flex-col gap-5 w-full md:w-[408px] shrink-0 ${className}`}>
            {images.map((src, i) => (
                <div key={i} className="relative w-full aspect-[408/440] overflow-hidden rounded-[12px]">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
            ))}
        </motion.div>
    );
}

export function HeroImages() {
    // Parallax logic will be handled by parent or context? 
    // Actually, usually we pass scrollYProgress down or useScroll here.
    // Since this component might be inside a sticky container, using global scroll is fine.
    const { scrollY } = useScroll();
    
    // Parallax speeds
    const y1 = useTransform(scrollY, [0, 1000], ["0%", "-10%"]);
    const y2 = useTransform(scrollY, [0, 1000], ["-20%", "0%"]); // Starts higher, moves down (or less up)
    const y3 = useTransform(scrollY, [0, 1000], ["0%", "-15%"]);

    return (
        <div className="flex flex-row justify-center gap-5 w-full h-[120vh] overflow-hidden opacity-50 grayscale-[20%]">
             {/* Opacity/Grayscale to make text pop? Or full color? */}
             {/* User design shows full color. I'll remove filters. */}
             
            <div className="flex flex-row justify-center gap-5 absolute top-0 left-1/2 -translate-x-1/2 scale-75 md:scale-100 origin-top h-full">
                <Column images={col1} y={y1} className="mt-20" />
                <Column images={col2} y={y2} className="-mt-32" /> 
                <Column images={col3} y={y3} className="mt-10" />
            </div>
             
             {/* Overlay Gradient to fade bottom? */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
        </div>
    );
}