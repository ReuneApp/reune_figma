import svgPaths from "./svg-2fhl348vl3";

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
    <div className="absolute bg-white border-4 border-[#e9e9e9] border-solid h-[70px] left-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[61px] w-[304px]" data-name="MUSIC BOX">
      <Music />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[159.5px] not-italic text-[#1e1e1e] text-[22px] text-center top-[16px] translate-x-[-50%] w-[171px]">MUSIC</p>
    </div>
  );
}

function SwitchButtonOn() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[12px] px-[20px] py-[10px] rounded-[20px] top-[146px] w-[300px]" data-name="SWITCH BUTTON (ON)">
      <div aria-hidden="true" className="absolute border-4 border-[#1abb6c] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1abb6c] text-[22px] text-center w-[242px]">FRIENDS ONLY</p>
    </div>
  );
}

function YesButton() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[12px] px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[231px] w-[300px]" data-name="YES (BUTTON)">
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[274px]">POST</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-white border-8 border-[#e9e9e9] border-solid h-[333px] left-0 rounded-[30px] top-0 w-[340px]">
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[162px] not-italic text-[#1e1e1e] text-[28px] text-center top-[16px] translate-x-[-50%] w-[265px]">FINISH</p>
      <MusicBox />
      <SwitchButtonOn />
      <YesButton />
    </div>
  );
}

export default function DialogTemplate() {
  return (
    <div className="relative size-full" data-name="DIALOG TEMPLATE">
      <Frame />
    </div>
  );
}