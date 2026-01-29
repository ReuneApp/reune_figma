import svgPaths from "./svg-c080jszf65";
import imgImageWithFallback from "figma:asset/64c50f1b0e9d3f0bc87b205f55019d384dc33f1b.png";
import imgImageWithFallback1 from "figma:asset/81405a6094906e7727c5de1bae45c613daf5bc87.png";
import imgImageWithFallback2 from "figma:asset/d01cdd61cfac888c5435ea927930789313267c30.png";

function Container() {
  return <div className="absolute h-0 left-[511.98px] top-[47.99px] w-[15.995px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[#e9e9e9] h-[60px] left-[2px] rounded-[2.06422e+07px] top-[18px] w-[300px]" data-name="Container" />;
}

function ImageWithFallback() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white left-0 rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-full">
        <ImageWithFallback />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white left-[104px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-full">
        <ImageWithFallback1 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[#1abb6c] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-white left-[207.99px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-full">
        <ImageWithFallback2 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function CaptureButtonDefault() {
  return (
    <div className="absolute bg-white left-[312px] rounded-[20px] size-[95.998px] top-0" data-name="CAPTURE BUTTON (DEFAULT)">
      <div aria-hidden="true" className="absolute border-8 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function MonochromeArrowUpRight() {
  return (
    <div className="h-[55.157px] relative w-[55.154px]" data-name="Monochrome / arrow up right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Monochrome / arrow up right">
          <path d={svgPaths.p2f8bc872} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p1abddb80} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Post() {
  return (
    <div className="absolute bg-[#1abb6c] content-stretch flex items-center justify-center left-[416px] rounded-[20px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[95.998px] top-0" data-name="POST">
      <div className="flex items-center justify-center relative shrink-0 size-[78.002px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[315deg]">
          <MonochromeArrowUpRight />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[96px] left-0 top-[56px] w-[304px]" data-name="Container">
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <CaptureButtonDefault />
      <Post />
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute inset-[20.83%_29.17%]" data-name="vector">
      <div className="absolute inset-[-7.56%_-10.59%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 23">
          <g id="vector">
            <path clipRule="evenodd" d={svgPaths.p362eab70} fillRule="evenodd" id="Vector-10" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path d={svgPaths.p181c8200} fill="var(--stroke-0, black)" id="Vector-11" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[128px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-0" data-name="CLOSE">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="relative shrink-0 size-[34px]" data-name="Xnix/Line/Trash 3">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
          <Vector />
        </div>
      </div>
    </div>
  );
}

export default function StepBarCapturePage3Steps() {
  return (
    <div className="relative size-full" data-name="STEP BAR (CAPTURE PAGE) - 3 STEPS">
      <Container />
      <Container5 />
      <Close />
    </div>
  );
}