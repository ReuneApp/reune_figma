import svgPaths from "./svg-gvo9gc09er";
import imgImageWithFallback from "figma:asset/64c50f1b0e9d3f0bc87b205f55019d384dc33f1b.png";
import imgImageWithFallback1 from "figma:asset/81405a6094906e7727c5de1bae45c613daf5bc87.png";
import imgImageWithFallback2 from "figma:asset/d01cdd61cfac888c5435ea927930789313267c30.png";

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
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[40px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[41px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault />
    </div>
  );
}

function User() {
  return (
    <div className="absolute h-[125px] left-[43px] top-[552px] w-[96px]" data-name="USER">
      <Step />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[48px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[96px]">NAME</p>
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
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[40px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[41px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault1 />
    </div>
  );
}

function User1() {
  return (
    <div className="absolute h-[125px] left-[147px] top-[552px] w-[96px]" data-name="USER">
      <Step1 />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[48px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[96px]">NAME</p>
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
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[40px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[41px]" data-name="ADD FRIEND">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <StateDefault2 />
    </div>
  );
}

function User2() {
  return (
    <div className="absolute h-[125px] left-[251px] top-[552px] w-[96px]" data-name="USER">
      <Step2 />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] left-[48px] not-italic text-[18px] text-black text-center top-[98px] translate-x-[-50%] w-[96px]">NAME</p>
      <AddFriend2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[43px] top-[552px]">
      <User />
      <User1 />
      <User2 />
    </div>
  );
}

function Users() {
  return (
    <div className="absolute contents left-[43px] top-[518px]" data-name="USERS">
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] inset-[60.75%_34.22%_36.43%_10.92%] leading-[normal] not-italic text-[14px] text-[rgba(30,30,30,0.4)]">USERS</p>
      <Group />
    </div>
  );
}

function Container9() {
  return <div className="absolute h-0 left-[511.98px] top-[47.99px] w-[15.995px]" data-name="Container" />;
}

function Container10() {
  return <div className="absolute bg-[#e9e9e9] h-[60px] left-0 rounded-[2.06422e+07px] top-[18px] w-[300px]" data-name="Container" />;
}

function ImageWithFallback() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-white left-0 rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
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

function Container12() {
  return (
    <div className="absolute bg-white left-[104px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback1 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
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

function Container13() {
  return (
    <div className="absolute bg-white left-[207.99px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback2 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[96px] left-0 top-0 w-[304px]" data-name="Container">
      <Container11 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Icon2() {
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

function Button3() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex items-center justify-center left-[415.98px] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[95.998px] top-0" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[104px] left-[43px] top-[241px] w-[304px]" data-name="Container">
      <Container9 />
      <Container10 />
      <Container14 />
      <Button3 />
    </div>
  );
}

function Routes() {
  return (
    <div className="absolute contents left-[43px] top-[207px]" data-name="ROUTES">
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] inset-[24.28%_34.22%_72.91%_10.92%] leading-[normal] not-italic text-[14px] text-[rgba(30,30,30,0.4)]">ROUTES</p>
      <Container15 />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-white left-0 rounded-[20px] size-[95.998px] top-0" data-name="Container">
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
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-white left-[104px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback4 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ImageWithFallback5() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-white left-[207.99px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback5 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[96px] left-0 top-0 w-[304px]" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Icon3() {
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

function Button4() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex items-center justify-center left-[415.98px] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[95.998px] top-0" data-name="Button">
      <Icon3 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[104px] left-[43px] top-[397px] w-[304px]" data-name="Container">
      <Container19 />
      <Button4 />
    </div>
  );
}

function Routes1() {
  return (
    <div className="absolute contents left-[43px] top-[363px]" data-name="ROUTES">
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] inset-[42.57%_34.22%_54.61%_10.92%] leading-[normal] not-italic text-[14px] text-[rgba(30,30,30,0.4)]">PLACES</p>
      <Container20 />
    </div>
  );
}

function HomeFeed() {
  return (
    <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-[393.719px]" data-name="HomeFeed">
      <Back />
      <SearchTextBar />
      <Users />
      <Routes />
      <Routes1 />
    </div>
  );
}

function Container21() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <HomeFeed />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Search Page">
      <Container21 />
    </div>
  );
}