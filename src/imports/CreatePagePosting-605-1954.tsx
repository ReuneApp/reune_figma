import svgPaths from "./svg-h4pi4c8j4n";
import imgImageWithFallback from "figma:asset/64c50f1b0e9d3f0bc87b205f55019d384dc33f1b.png";
import imgImageWithFallback1 from "figma:asset/81405a6094906e7727c5de1bae45c613daf5bc87.png";
import imgImageWithFallback2 from "figma:asset/d01cdd61cfac888c5435ea927930789313267c30.png";
import imgImageWithFallback3 from "figma:asset/9844bfd977f4f5988b484778db92f0fb779ff0dc.png";

function Container() {
  return <div className="absolute bg-white h-[15.995px] left-[4.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[#90c24d] h-[13.534px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[27.08px] w-[40.612px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[40.612px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#1abb6c] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[106px] top-[400px] w-[48px]" data-name="Container">
      <Button />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-white h-[15.995px] left-[4.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container5() {
  return <div className="absolute bg-[#90c24d] h-[13.534px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[27.08px] w-[40.612px]" data-name="Container" />;
}

function Container6() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[40.612px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[197px] size-[48px] top-[494px]" data-name="Container">
      <Button1 />
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g>
          <path d={svgPaths.pc263700} fill="var(--fill-0, black)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[26px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Close />
    </div>
  );
}

function Container8() {
  return <div className="absolute h-0 left-[511.98px] top-[47.99px] w-[15.995px]" data-name="Container" />;
}

function Container9() {
  return <div className="absolute bg-[gainsboro] h-[60px] left-0 rounded-[2.06422e+07px] top-[18px] w-[300px]" data-name="Container" />;
}

function ImageWithFallback() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white left-0 rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
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

function Container11() {
  return (
    <div className="absolute bg-white left-[104px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback1 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
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

function Container12() {
  return (
    <div className="absolute bg-white left-[207.99px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback2 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[96px] left-0 top-0 w-[304px]" data-name="Container">
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function StepBarDefault3Steps() {
  return (
    <div className="absolute inset-[13.08%_5.29%]" data-name="STEP BAR (DEFAULT) - 3 STEPS">
      <Container8 />
      <Container9 />
      <Container13 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[130px] left-0 top-0 w-[340px]">
      <div className="absolute bg-white border-8 border-[#e9e9e9] border-solid inset-0 rounded-[30px]" />
      <StepBarDefault3Steps />
    </div>
  );
}

function MapStepBar3Steps() {
  return (
    <div className="absolute h-[130px] left-[27px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.25)] top-[694px] w-[340px]" data-name="MAP STEP BAR - 3 STEPS">
      <Frame />
    </div>
  );
}

function Container14() {
  return <div className="absolute bg-white h-[15.995px] left-[4.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container15() {
  return <div className="absolute bg-[#90c24d] h-[13.534px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[27.08px] w-[40.612px]" data-name="Container" />;
}

function Container16() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[40.612px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container16 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[258px] top-[231px] w-[48px]" data-name="Container">
      <Button3 />
    </div>
  );
}

function Container18() {
  return <div className="absolute bg-white h-[15.995px] left-[4.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container19() {
  return <div className="absolute bg-[#90c24d] h-[13.534px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[27.08px] w-[40.612px]" data-name="Container" />;
}

function Container20() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[40.612px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container20 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42px] top-[314px] w-[48px]" data-name="Container">
      <Button4 />
    </div>
  );
}

function Container22() {
  return <div className="absolute bg-white h-[15.995px] left-[4.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container23() {
  return <div className="absolute bg-[#90c24d] h-[13.534px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[27.08px] w-[40.612px]" data-name="Container" />;
}

function Container24() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[40.612px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container24 />
      </div>
      <div aria-hidden="true" className="absolute border-[#1abb6c] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[241px] top-[362px] w-[48px]" data-name="Container">
      <Button5 />
    </div>
  );
}

function Container26() {
  return <div className="absolute bg-white h-[15.995px] left-[4.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container27() {
  return <div className="absolute bg-[#90c24d] h-[13.534px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[27.08px] w-[40.612px]" data-name="Container" />;
}

function Container28() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[40.612px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container28 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[217px] top-[172px] w-[48px]" data-name="Container">
      <Button6 />
    </div>
  );
}

function Container30() {
  return <div className="absolute bg-white h-[15.995px] left-[4.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container31() {
  return <div className="absolute bg-[#90c24d] h-[13.534px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[27.08px] w-[40.612px]" data-name="Container" />;
}

function Container32() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[40.612px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container32 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[43px] top-[581px] w-[48px]" data-name="Container">
      <Button7 />
    </div>
  );
}

function Container34() {
  return <div className="absolute bg-white h-[15.995px] left-[4.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container35() {
  return <div className="absolute bg-[#90c24d] h-[13.534px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[27.08px] w-[40.612px]" data-name="Container" />;
}

function Container36() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[40.612px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container36 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[364px] top-[553px] w-[48px]" data-name="Container">
      <Button8 />
    </div>
  );
}

function Icon() {
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

function Button9() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-0 pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon />
    </div>
  );
}

function Camera() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="camera">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="camera">
          <g id="Vector">
            <path d={svgPaths.p27f53c00} stroke="var(--stroke-0, #100F0F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            <path d={svgPaths.p16b88f0} stroke="var(--stroke-0, #100F0F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-0 pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[59.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Camera />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="h-[40.612px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[16px] size-[47.994px] top-[-60px]" data-name="Button">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[47.994px]">
        <ImageWithFallback3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function RefreshCcw() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Refresh ccw">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_411_129)" id="Refresh ccw">
          <path d={svgPaths.pd72f780} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
        <defs>
          <clipPath id="clip0_411_129">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-0 pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[120px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <RefreshCcw />
    </div>
  );
}

function SideBar() {
  return (
    <div className="absolute h-[168px] left-[322px] top-[88px] w-[48px]" data-name="Side Bar">
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Markers() {
  return (
    <div className="absolute h-[852.649px] left-0 top-0 w-[393.719px]" data-name="Markers">
      <Container3 />
      <Container7 />
      <Button2 />
      <MapStepBar3Steps />
      <Container17 />
      <Container21 />
      <Container25 />
      <Container29 />
      <Container33 />
      <Container37 />
      <div className="absolute h-[58.005px] left-[155px] top-[410px] w-[111.16px]">
        <div className="absolute inset-[-0.11%_-1.35%_-2.59%_-0.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 113 60">
            <path d={svgPaths.p19105d00} id="Vector 1124" stroke="var(--stroke-0, #1ABB6C)" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <SideBar />
    </div>
  );
}

function SwitchButtonOn() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] inset-[45.85%_5.88%_37.07%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px]" data-name="SWITCH BUTTON (ON)">
      <div aria-hidden="true" className="absolute border-4 border-[#1abb6c] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1abb6c] text-[22px] text-center w-[242px]">FRIENDS ONLY</p>
    </div>
  );
}

function Music() {
  return (
    <div className="absolute left-[84px] size-[28px] top-[18px]" data-name="Music">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Music">
          <path d={svgPaths.p323d5830} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function MusicBox() {
  return (
    <div className="absolute bg-white border-4 border-[#e9e9e9] border-solid inset-[25.61%_5.88%_57.32%_4.71%] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" data-name="MUSIC BOX">
      <Music />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[159.5px] not-italic text-[#1e1e1e] text-[22px] text-center top-[16px] translate-x-[-50%] w-[171px]">MUSIC</p>
    </div>
  );
}

function YesButton() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex gap-[18px] inset-[66.1%_5.88%_16.83%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" data-name="YES (BUTTON)">
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[274px]">POST</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[410px] left-0 top-0 w-[340px]">
      <div className="absolute bg-white border-8 border-[#e9e9e9] border-solid bottom-[10.98%] left-0 right-0 rounded-[30px] top-0" />
      <SwitchButtonOn />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] inset-[10.73%_11.18%_81.95%_10.88%] leading-[normal] not-italic text-[#1e1e1e] text-[28px] text-center">FINISH</p>
      <MusicBox />
      <YesButton />
    </div>
  );
}

function DialogTemplate() {
  return (
    <div className="absolute h-[365px] left-[27px] top-[244px] w-[340px]" data-name="DIALOG TEMPLATE">
      <Frame1 />
    </div>
  );
}

function Search() {
  return (
    <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-full" data-name="Search">
      <Markers />
      <div className="absolute bg-[rgba(0,0,0,0.4)] h-[852px] left-0 top-0 w-[394px]" />
      <DialogTemplate />
    </div>
  );
}

function Container38() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[393.719px]">
        <Search />
      </div>
    </div>
  );
}

export default function CreatePagePosting() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Create Page (Posting)">
      <Container38 />
    </div>
  );
}