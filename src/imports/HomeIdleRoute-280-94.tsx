import svgPaths from "./svg-rauyrl11oe";
import imgImageWithFallback from "figma:asset/64c50f1b0e9d3f0bc87b205f55019d384dc33f1b.png";
import imgImageWithFallback1 from "figma:asset/81405a6094906e7727c5de1bae45c613daf5bc87.png";
import imgImageWithFallback2 from "figma:asset/d01cdd61cfac888c5435ea927930789313267c30.png";
import imgImageWithFallback3 from "figma:asset/292b22e385870227044952ad1d50b30496960012.png";
import imgImageWithFallback4 from "figma:asset/9844bfd977f4f5988b484778db92f0fb779ff0dc.png";

function StateDefault({ className }: { className?: string }) {
  return (
    <div className={className} data-name="state=default">
      <div className="relative shrink-0 size-[34px]" data-name="icon / add">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
          <g id="icon / add">
            <path d={svgPaths.p8147680} fill="var(--fill-0, white)" id="add" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function EditorComment() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Editor / Comment">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 20">
        <g id="Editor / Comment">
          <path d={svgPaths.p6dbd900} id="shape" stroke="var(--stroke-0, #1E1E1E)" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Location() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[48px] items-center justify-center left-[89px] pl-[10px] pr-[20px] py-[10px] rounded-[16px] top-[656px]" data-name="Location">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <EditorComment />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-nowrap whitespace-pre">THE MANOR HOUSE</p>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[852.649px] left-0 overflow-clip top-0 w-[393.719px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="absolute bg-gradient-to-b from-[rgba(217,217,217,0)] h-[359px] left-0 to-[rgba(0,0,0,0.9)] top-[494px] via-[41.827%] via-[rgba(0,0,0,0.5)] w-[394px]" data-name="Gradient" />
      <Location />
    </div>
  );
}

function Container() {
  return <div className="absolute h-0 left-[511.98px] top-[47.99px] w-[15.995px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[#e9e9e9] h-[60px] left-[22px] rounded-[2.06422e+07px] top-[18px] w-[490px]" data-name="Container" />;
}

function ImageWithFallback1() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white left-0 rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback1 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[#1abb6c] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white left-[104px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback2 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-white left-[207.99px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback3 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white left-[311.99px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback4 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[95.998px] left-[18px] top-0 w-[407.984px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
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

function Container7() {
  return (
    <div className="basis-0 grow h-[103.995px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container />
      <Container1 />
      <Container6 />
      <Button />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute box-border content-stretch flex h-[96px] items-start left-[16px] overflow-clip pl-0 py-0 top-[716px] w-[394px]" data-name="Container">
      <Container7 />
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
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-0 pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[60px]" data-name="Button">
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
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[-1px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[120px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[23.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p157b6400} fill="var(--fill-0, #E9E9E9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-0 pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[179.97px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon3 />
    </div>
  );
}

function LineDuotoneMapLocationMapArrowSquare() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="Line Duotone / Map & Location / Map Arrow Square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="Line Duotone / Map & Location / Map Arrow Square">
          <path d={svgPaths.p3b0600} fill="var(--fill-0, #E8F4FC)" id="Vector 1123" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex items-center justify-center left-0 pl-0 pr-[0.01px] py-0 rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.994px] top-[240px]" data-name="Button">
      <LineDuotoneMapLocationMapArrowSquare />
    </div>
  );
}

function ImageWithFallback5() {
  return (
    <div className="h-[40.612px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[16px] size-[47.994px] top-0" data-name="Button">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[47.994px]">
        <ImageWithFallback5 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[288px] left-[322px] top-[28px] w-[48px]" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Back() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex items-center justify-center left-[26px] pl-0 pr-[0.01px] py-0 rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.994px] top-[28px]" data-name="Back">
      <StateDefault className="bg-[rgba(0,0,0,0)] h-[52px] relative rounded-[99px] shrink-0 w-[48px]" />
    </div>
  );
}

function ImageWithFallback6() {
  return (
    <div className="h-[40.612px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-[34px] rounded-[16px] size-[47.994px] top-[656px]" data-name="Button">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[47.994px]">
        <ImageWithFallback6 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function HomeFeed() {
  return (
    <div className="bg-black h-[852.649px] overflow-clip relative shrink-0 w-full" data-name="HomeFeed">
      <ImageWithFallback />
      <Container8 />
      <Container9 />
      <Back />
      <Button6 />
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[393.719px]">
        <HomeFeed />
      </div>
    </div>
  );
}

export default function HomeIdleRoute() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Home Idle (Route)">
      <Container10 />
    </div>
  );
}