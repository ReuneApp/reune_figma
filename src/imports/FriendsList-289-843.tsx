import svgPaths from "./svg-pyrsfg4y3k";

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

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#e9e9e9] text-[22px] w-[82px]">SEARCH</p>
    </div>
  );
}

function SearchTextBar() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[43px] pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[107px] w-[300px]" data-name="SEARCH TEXT BAR">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <Icon1 />
      <Frame />
    </div>
  );
}

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

function Step() {
  return (
    <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-0 top-0 w-[95.998px]" data-name="STEP">
      <Button />
    </div>
  );
}

function IconAdd() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="icon / add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="icon / add">
          <path d={svgPaths.p8147680} fill="var(--fill-0, black)" id="add" />
        </g>
      </svg>
    </div>
  );
}

function StateDefault() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[52px] relative rounded-[99px] shrink-0 w-[48px]" data-name="state=default">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[52px] items-center justify-center p-[4px] relative w-[48px]">
        <IconAdd />
      </div>
    </div>
  );
}

function AddFriend() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[54px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[52px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault />
    </div>
  );
}

function User() {
  return (
    <div className="absolute h-[124px] left-[35px] top-[208px] w-[102px]" data-name="USER">
      <Step />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[51px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[102px]">NAME</p>
      <AddFriend />
    </div>
  );
}

function Container3() {
  return <div className="absolute bg-white h-[15.995px] left-[28.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container4() {
  return <div className="absolute bg-[#90c24d] h-[29.529px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[59.09px] w-[88.616px]" data-name="Container" />;
}

function Container5() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[88.616px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
        <Container5 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Step1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-0 top-0 w-[95.998px]" data-name="STEP">
      <Button1 />
    </div>
  );
}

function IconAdd1() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="icon / add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="icon / add">
          <path d={svgPaths.p8147680} fill="var(--fill-0, black)" id="add" />
        </g>
      </svg>
    </div>
  );
}

function StateDefault1() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[52px] relative rounded-[99px] shrink-0 w-[48px]" data-name="state=default">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[52px] items-center justify-center p-[4px] relative w-[48px]">
        <IconAdd1 />
      </div>
    </div>
  );
}

function AddFriend1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[54px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[52px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault1 />
    </div>
  );
}

function User1() {
  return (
    <div className="absolute h-[124px] left-[35px] top-[348px] w-[102px]" data-name="USER">
      <Step1 />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[51px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[102px]">NAME</p>
      <AddFriend1 />
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-white h-[15.995px] left-[28.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container7() {
  return <div className="absolute bg-[#90c24d] h-[29.529px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[59.09px] w-[88.616px]" data-name="Container" />;
}

function Container8() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[88.616px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
        <Container8 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Step2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-0 top-0 w-[95.998px]" data-name="STEP">
      <Button2 />
    </div>
  );
}

function IconAdd2() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="icon / add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="icon / add">
          <path d={svgPaths.p8147680} fill="var(--fill-0, black)" id="add" />
        </g>
      </svg>
    </div>
  );
}

function StateDefault2() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[52px] relative rounded-[99px] shrink-0 w-[48px]" data-name="state=default">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[52px] items-center justify-center p-[4px] relative w-[48px]">
        <IconAdd2 />
      </div>
    </div>
  );
}

function AddFriend2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[54px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[52px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault2 />
    </div>
  );
}

function User2() {
  return (
    <div className="absolute h-[124px] left-[146px] top-[208px] w-[102px]" data-name="USER">
      <Step2 />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[51px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[102px]">NAME</p>
      <AddFriend2 />
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-white h-[15.995px] left-[28.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container10() {
  return <div className="absolute bg-[#90c24d] h-[29.529px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[59.09px] w-[88.616px]" data-name="Container" />;
}

function Container11() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[88.616px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Step3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-0 top-0 w-[95.998px]" data-name="STEP">
      <Button3 />
    </div>
  );
}

function IconAdd3() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="icon / add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="icon / add">
          <path d={svgPaths.p8147680} fill="var(--fill-0, black)" id="add" />
        </g>
      </svg>
    </div>
  );
}

function StateDefault3() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[52px] relative rounded-[99px] shrink-0 w-[48px]" data-name="state=default">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[52px] items-center justify-center p-[4px] relative w-[48px]">
        <IconAdd3 />
      </div>
    </div>
  );
}

function AddFriend3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[54px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[52px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault3 />
    </div>
  );
}

function User3() {
  return (
    <div className="absolute h-[124px] left-[146px] top-[348px] w-[102px]" data-name="USER">
      <Step3 />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[51px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[102px]">NAME</p>
      <AddFriend3 />
    </div>
  );
}

function Container12() {
  return <div className="absolute bg-white h-[15.995px] left-[28.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container13() {
  return <div className="absolute bg-[#90c24d] h-[29.529px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[59.09px] w-[88.616px]" data-name="Container" />;
}

function Container14() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[88.616px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
        <Container14 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Step4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-0 top-0 w-[95.998px]" data-name="STEP">
      <Button4 />
    </div>
  );
}

function IconAdd4() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="icon / add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="icon / add">
          <path d={svgPaths.p8147680} fill="var(--fill-0, black)" id="add" />
        </g>
      </svg>
    </div>
  );
}

function StateDefault4() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[52px] relative rounded-[99px] shrink-0 w-[48px]" data-name="state=default">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[52px] items-center justify-center p-[4px] relative w-[48px]">
        <IconAdd4 />
      </div>
    </div>
  );
}

function AddFriend4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[54px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[52px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault4 />
    </div>
  );
}

function User4() {
  return (
    <div className="absolute h-[124px] left-[257px] top-[208px] w-[102px]" data-name="USER">
      <Step4 />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[51px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[102px]">NAME</p>
      <AddFriend4 />
    </div>
  );
}

function Container15() {
  return <div className="absolute bg-white h-[15.995px] left-[28.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container16() {
  return <div className="absolute bg-[#90c24d] h-[29.529px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[59.09px] w-[88.616px]" data-name="Container" />;
}

function Container17() {
  return (
    <div className="absolute bg-gradient-to-b from-[#a8d5f5] left-[3.69px] size-[88.616px] to-[#e8f4fc] top-[3.69px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
        <Container17 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Step5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-0 top-0 w-[95.998px]" data-name="STEP">
      <Button5 />
    </div>
  );
}

function IconAdd5() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="icon / add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="icon / add">
          <path d={svgPaths.p8147680} fill="var(--fill-0, black)" id="add" />
        </g>
      </svg>
    </div>
  );
}

function StateDefault5() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[52px] relative rounded-[99px] shrink-0 w-[48px]" data-name="state=default">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[52px] items-center justify-center p-[4px] relative w-[48px]">
        <IconAdd5 />
      </div>
    </div>
  );
}

function AddFriend5() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[54px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[52px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault5 />
    </div>
  );
}

function User5() {
  return (
    <div className="absolute h-[124px] left-[257px] top-[348px] w-[102px]" data-name="USER">
      <Step5 />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[51px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[102px]">NAME</p>
      <AddFriend5 />
    </div>
  );
}

function HomeFeed() {
  return (
    <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-[393.719px]" data-name="HomeFeed">
      <Back />
      <SearchTextBar />
      <User />
      <User1 />
      <User2 />
      <User3 />
      <User4 />
      <User5 />
    </div>
  );
}

function Container18() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <HomeFeed />
      </div>
    </div>
  );
}

export default function FriendsList() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Friends List">
      <Container18 />
    </div>
  );
}