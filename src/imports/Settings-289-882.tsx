import svgPaths from "./svg-8s9pq81eej";

function Icon() {
  return (
    <div className="relative shrink-0 size-[23.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3152c100} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M18.9939 11.9961H4.99839" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

function Back() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[26px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[28px]" data-name="Back">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon />
    </div>
  );
}

function DefaultButton() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[47px] px-[20px] py-[10px] rounded-[20px] top-[597.02px] w-[300px]" data-name="DEFAULT (BUTTON)">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#ff232f] text-[22px] text-center w-[242px]">LOG OUT</p>
    </div>
  );
}

function DefaultButton1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[47px] px-[20px] py-[10px] rounded-[20px] top-[0.02px] w-[300px]" data-name="DEFAULT (BUTTON)">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[22px] w-[242px]">ACCOUNT</p>
    </div>
  );
}

function SwitchButtonOn() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[47px] px-[20px] py-[10px] rounded-[20px] top-[85.02px] w-[300px]" data-name="SWITCH BUTTON (ON)">
      <div aria-hidden="true" className="absolute border-4 border-[#1abb6c] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1abb6c] text-[22px] w-[242px]">NOTIFICATIONS</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[755.891px] left-0 top-[111.98px] w-[393.719px]" data-name="Container">
      <DefaultButton />
      <DefaultButton1 />
      <SwitchButtonOn />
    </div>
  );
}

function HomeFeed() {
  return (
    <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-[393.719px]" data-name="HomeFeed">
      <Back />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <HomeFeed />
      </div>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Settings">
      <Container1 />
    </div>
  );
}