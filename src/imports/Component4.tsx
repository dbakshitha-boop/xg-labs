import imgC4 from "figma:asset/85d6b6f33c8667ab02410e898c803bdf8b2f8acf.png";
import imgC3 from "figma:asset/cf73ccd40dc24f9d1feec565d29fe7d28fd3690b.png";
import imgC2 from "figma:asset/308a1ec46f49ee27f236c5b52a0022c154701558.png";
import imgC1 from "figma:asset/c6f75c6d8668e22eaf393503de064b054afa1040.png";

function C3() {
  return (
    <div className="absolute aspect-[480/640] left-[4.79%] right-[4.58%] rounded-[12px] top-[85px]" data-name="C4">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgC4} />
    </div>
  );
}

function C2() {
  return (
    <div className="absolute aspect-[480/640] left-[3.33%] right-[2.92%] rounded-[12px] top-[55px]" data-name="C3">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgC3} />
    </div>
  );
}

function C1() {
  return (
    <div className="absolute aspect-[480/640] bottom-[20px] left-[1.67%] right-[1.46%] rounded-[12px]" data-name="C2">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgC2} />
    </div>
  );
}

function C() {
  return (
    <div className="absolute h-[640px] left-0 right-0 rounded-[12px] top-[calc(50%-12.5px)] translate-y-[-50%]" data-name="C1">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgC1} />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="Component 4">
      <C3 />
      <C2 />
      <C1 />
      <C />
    </div>
  );
}