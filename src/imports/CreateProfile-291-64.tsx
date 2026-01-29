import svgPaths from "./svg-kg1iza6lfy";

function Container() {
  return <div className="absolute bg-white h-[15.995px] left-[28.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[#90c24d] h-[29.529px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[59.09px] w-[88.616px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[88.616px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-[149px] top-[108px] w-[95.998px]" data-name="Container">
      <Button />
    </div>
  );
}

function Container4() {
  return <div className="absolute h-[98.468px] left-[26px] top-[107px] w-[95.998px]" data-name="Container" />;
}

function HeroiconsMiniPencilSquare() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="heroicons-mini/pencil-square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="heroicons-mini/pencil-square">
          <g id="Union">
            <path d={svgPaths.p10f8ad80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1841f300} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Back() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[174px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[171px]" data-name="Back">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <HeroiconsMiniPencilSquare />
    </div>
  );
}

function BoldDuotoneTextFormattingTextSquare() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Bold Duotone / Text Formatting / Text Square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Bold Duotone / Text Formatting / Text Square">
          <path d={svgPaths.p3d0bf80} fill="var(--fill-0, #100F0F)" id="Subtract" />
          <path d={svgPaths.p32efad00} fill="var(--fill-0, white)" id="Subtract_2" />
        </g>
      </svg>
    </div>
  );
}

function Location() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[46px] pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[257px] w-[300px]" data-name="Location">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <BoldDuotoneTextFormattingTextSquare />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[22px] w-[82px]">GEORGE</p>
    </div>
  );
}

function LocationIcon() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Location Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 20">
        <g id="Location Icon">
          <path d={svgPaths.p6dbd900} id="shape" stroke="var(--stroke-0, #1E1E1E)" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Location1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[48px] items-center justify-center left-[109px] pl-[10px] pr-[20px] py-[10px] rounded-[16px] top-[355px]" data-name="LOCATION">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <LocationIcon />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-nowrap whitespace-pre">NEIGHBOURHOOD</p>
    </div>
  );
}

function YesButton() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[58px] px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[713px] w-[300px]" data-name="YES (BUTTON)">
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[274px]">CONTINUE</p>
    </div>
  );
}

function HomeFeed() {
  return (
    <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-[393.719px]" data-name="HomeFeed">
      <Container3 />
      <Container4 />
      <Back />
      <Location />
      <Location1 />
      <YesButton />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <HomeFeed />
      </div>
    </div>
  );
}

export default function CreateProfile() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Create Profile">
      <Container5 />
    </div>
  );
}