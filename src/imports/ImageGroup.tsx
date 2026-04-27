import imgImage04 from "figma:asset/e65084b764b6b3a23611cf721764131dce2753ec.png";
import imgImage03 from "figma:asset/b178cfc933d6e839b8ae373df90d9a43d32a3ba3.png";
import imgImage02 from "figma:asset/e90f2a5c8227a9547e792870f22472272f9fc188.png";
import imgImage01 from "figma:asset/5ec29e10b8bc313af65bffb9348975a88addfd32.png";

function Image3() {
  return (
    <div className="h-[286.815px] relative rounded-[3.4px] shadow-[0px_3.4px_8.5px_0px_rgba(0,0,0,0.1)] w-[265.955px]" data-name="Image 04">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[3.4px] size-full" src={imgImage04} />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[286.818px] overflow-clip relative rounded-[3.4px] shadow-[0px_3.4px_8.5px_0px_rgba(0,0,0,0.1)] w-[265.958px]" data-name="Image 03">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[3.4px] size-full" src={imgImage03} />
      <div className="absolute h-[332.448px] left-0 top-0 w-[265.958px]" data-name="Rounded Rectangle" />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[286.818px] relative rounded-[3.4px] shadow-[0px_3.4px_8.5px_0px_rgba(0,0,0,0.1)] w-[265.958px]" data-name="Image 02">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[3.4px] size-full" src={imgImage02} />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[337.434px] relative rounded-[4px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] w-[312.893px]" data-name="Image 01">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
        <img alt="" className="absolute h-[99.92%] left-[-0.01%] max-w-none top-0 w-[100.03%]" src={imgImage01} />
      </div>
    </div>
  );
}

export default function ImageGroup() {
  return (
    <div className="relative size-full" data-name="Image group">
      <div className="absolute flex h-[349.874px] items-center justify-center left-[27.52px] top-[31.15px] w-[335.699px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[343.719deg]">
          <Image3 />
        </div>
      </div>
      <div className="absolute flex h-[315.903px] items-center justify-center left-[46.22px] top-[31.32px] w-[297.621px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[353.296deg]">
          <Image2 />
        </div>
      </div>
      <div className="absolute flex h-[325.333px] items-center justify-center left-[41.12px] top-[31.28px] w-[308.042px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[350.884deg]">
          <Image1 />
        </div>
      </div>
      <div className="absolute flex h-[406.633px] items-center justify-center left-0 top-0 w-[389.24px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[14.924deg]">
          <Image />
        </div>
      </div>
    </div>
  );
}