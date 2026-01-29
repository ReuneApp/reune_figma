import svgPaths from "./svg-hrk30pxmkt";
import imgImageWithFallback from "figma:asset/9844bfd977f4f5988b484778db92f0fb779ff0dc.png";

function Container() {
  return (
    <div className="absolute bg-white left-0 rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-8 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[95.998px] left-[18px] top-0 w-[407.984px]" data-name="Container">
      <Container />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[39.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1ba7a000} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33306" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex items-center justify-center left-[415.98px] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[95.998px] top-0" data-name="Button">
      <Icon />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow h-[103.995px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container1 />
      <Button />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute box-border content-stretch flex h-[96px] items-start left-[132px] overflow-clip pl-0 py-0 top-[691px] w-[394px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[23.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p468a980} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d={svgPaths.p1cb43700} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-0 pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[23.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p2a518500} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M14.9952 5.76215V20.7573" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M8.9971 3.23496V18.2301" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-0 pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[59.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon2 />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[40.612px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[16px] size-[47.994px] top-[119.98px]" data-name="Button">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[47.994px]">
        <ImageWithFallback />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[288px] left-[322px] top-[28px] w-[48px]" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="close">
          <path d={svgPaths.pc263700} fill="var(--fill-0, black)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[26px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Close />
    </div>
  );
}

function HomeFeed() {
  return (
    <div className="bg-black h-[852.649px] overflow-clip relative shrink-0 w-full" data-name="HomeFeed">
      <Container3 />
      <Container4 />
      <Button4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[393.719px]">
        <HomeFeed />
      </div>
    </div>
  );
}

export default function CaptureEmpty() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Capture (Empty)">
      <Container5 />
    </div>
  );
}