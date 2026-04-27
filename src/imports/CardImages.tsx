import { motion } from "motion/react";
import imgImage from "figma:asset/8f9e45e34b390cad65d224cd4228fa1ab5977543.png";
import imgImage1 from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png";
import imgImage2 from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import imgImage3 from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import imgImage4 from "figma:asset/fad7be819dbbdd4aa88e7779ed4b7c2a87bf23e6.png";
import imgImage5 from "figma:asset/d1e53c97c1810297d3642b6fa789643c8fe962af.png";

function Image() {
  return (
    <div className="h-[337.434px] relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage} />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[337.43px] relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.89px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage1} />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[337.434px] overflow-clip relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage2} />
      <div className="absolute h-[391.117px] left-0 top-0 w-[312.893px]" data-name="Rounded Rectangle" />
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[337.434px] relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage3} />
    </div>
  );
}

function Image4() {
  return (
    <div className="h-[337.434px] relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage4} />
    </div>
  );
}

function Image5() {
  return (
    <div className="h-[337.434px] relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage5} />
    </div>
  );
}

export default function CardImages({ isVisible }: { isVisible?: boolean }) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, // Start from bottom
    },
    visible: (index: number) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2 + (index * 0.1),
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div className="absolute left-[121px] top-[800.06px] contents" data-name="Card images">
      
      {/* Image 12 - Rot: 351.544deg */}
      <motion.div 
        custom={0}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        className="absolute flex h-[379.776px] items-center justify-center left-[720.98px] top-[854.66px] w-[359.11px]"
      >
        <div className="flex-none rotate-[351.544deg]">
          <Image />
        </div>
      </motion.div>

      {/* Image 13 - Rot: 343.719deg */}
      <motion.div 
        custom={1}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        className="absolute flex h-[411.618px] items-center justify-center left-[121px] top-[849px] w-[394.942px]"
      >
        <div className="flex-none rotate-[343.719deg]">
          <Image1 />
        </div>
      </motion.div>

      {/* Image 14 - Rot: 353.296deg */}
      <motion.div 
        custom={2}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        className="absolute flex h-[371.652px] items-center justify-center left-[597px] top-[811px] w-[350.144px]"
      >
        <div className="flex-none rotate-[353.296deg]">
          <Image2 />
        </div>
      </motion.div>

      {/* Image 15 - Rot: 350.884deg */}
      <motion.div 
        custom={3}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        className="absolute flex h-[382.746px] items-center justify-center left-[455.17px] top-[800.06px] w-[362.404px]"
      >
        <div className="flex-none rotate-[350.884deg]">
          <Image3 />
        </div>
      </motion.div>

      {/* Image 16 - Rot: 14.924deg */}
      <motion.div 
        custom={4}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        className="absolute flex h-[406.633px] items-center justify-center left-[278.29px] top-[812.08px] w-[389.24px]"
      >
        <div className="flex-none rotate-[14.924deg]">
          <Image4 />
        </div>
      </motion.div>

      {/* Image 17 - Rot: 15.438deg */}
      <motion.div 
        custom={5}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={cardVariants}
        className="absolute flex h-[408.548px] items-center justify-center left-[790.74px] top-[867.66px] w-[391.425px]"
      >
        <div className="flex-none rotate-[15.438deg]">
          <Image5 />
        </div>
      </motion.div>

    </div>
  );
}