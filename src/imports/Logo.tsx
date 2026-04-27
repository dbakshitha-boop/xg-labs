import imgLogo from "figma:asset/e41dee190168d7591c7b7b8c43b6c0799cb1032a.png";
import imgRectangle from "figma:asset/192d853c9f27ed907c5b4d6ebe963ebe82df6c24.png";

export default function Logo() {
  return (
    <div className="relative rounded-[12px] size-full" data-name="Logo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgLogo} />
      <div className="absolute left-[calc(50%-0.8px)] size-[129.156px] top-[calc(50%-0.47px)] translate-x-[-50%] translate-y-[-50%]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
    </div>
  );
}