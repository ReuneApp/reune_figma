import svgPaths from "./svg-0vmhkamfno";
import imgImageWithFallback from "figma:asset/a99827ec2be2248989bae61fa94de1f3e30353f7.png";
import imgImageStep1 from "figma:asset/33f32cdcb3dc12af21fef6337149394593409811.png";
import imgImageStep2 from "figma:asset/fe8b85b10b516aa28f483709d8c767b59277d914.png";

function ImageWithFallback() {
  return (
    <div className="absolute h-[851.954px] left-0 top-0 w-[392.927px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container() {
  return <div className="absolute bg-[#e9e9e9] h-[59.999px] left-[39px] rounded-[20536500px] top-[18px] w-[255.994px]" data-name="Container" />;
}

function Container2() {
  return <div className="absolute h-[95.994px] left-[562.93px] top-0 w-[148.457px]" data-name="Container" />;
}

function ImageStep() {
  return (
    <div className="absolute left-0 size-[80.081px] top-0" data-name="Image (Step 1)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageStep1} />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-white border-[#1abb6c] border-[7.956px] border-solid left-0 overflow-clip rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[95.994px] top-0" data-name="Container">
      <ImageStep />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute left-0 size-[95.994px] top-0" data-name="Button">
      <Container4 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9964 19.9964">
        <g clipPath="url(#clip0_1318_11834)" id="Icon">
          <path d="M8.33182 9.16502V14.165" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.08295" />
          <path d="M11.6645 9.16502V14.165" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.08295" />
          <path d={svgPaths.p1b1aa280} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.08295" />
          <path d="M2.49954 4.99909H17.4968" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.08295" />
          <path d={svgPaths.p1f2e1180} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.08295" />
        </g>
        <defs>
          <clipPath id="clip0_1318_11834">
            <rect fill="white" height="19.9964" width="19.9964" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#f44] content-stretch flex items-center justify-center left-[24px] pr-[0.01px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.987px] top-[-60px]" data-name="Button">
      <Icon />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute left-[34.99px] size-[95.994px] top-0" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function ImageStep1() {
  return (
    <div className="absolute left-0 size-[80.081px] top-0" data-name="Image (Step 2)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageStep2} />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white border-[7.956px] border-solid border-white left-0 overflow-clip rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[95.994px] top-0" data-name="Container">
      <ImageStep1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute left-[138.98px] size-[95.994px] top-0" data-name="Button">
      <Container5 />
    </div>
  );
}

function ImageStep2() {
  return (
    <div className="absolute left-0 size-[80.081px] top-0" data-name="Image (Step 3)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageStep2} />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white border-[7.956px] border-solid border-white left-0 overflow-clip rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[95.994px] top-0" data-name="Container">
      <ImageStep2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute left-[242.97px] size-[95.994px] top-0" data-name="Button">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[95.994px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[7.956px] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[346.96px] size-[95.994px] top-0" data-name="Button">
      <Container7 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[47.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.997 47.997">
        <g id="Icon">
          <path d="M9.99938 23.9985H37.9976" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.99969" />
          <path d={svgPaths.pb511400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.99969" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#1abb6c] h-[95.994px] relative rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.01px] relative size-full">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[458.94px] size-[95.994px] top-0" data-name="Button">
      <Container8 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[95.994px] left-0 top-0 w-[392.927px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function StepBar() {
  return (
    <div className="absolute h-[135.996px] left-0 overflow-clip top-[691px] w-[392.927px]" data-name="StepBar">
      <Container />
      <Container1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[23.994px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9937 23.9937">
        <g id="Icon">
          <path d={svgPaths.p83fa900} id="Vector" stroke="var(--stroke-0, #222222)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49935" />
          <path d="M18.995 11.9969H4.99869" id="Vector_2" stroke="var(--stroke-0, #222222)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49935" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[25.99px] pl-[3.672px] pr-[3.682px] py-[3.672px] rounded-[16px] size-[47.987px] top-[27.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.672px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[11.99px] size-[23.994px] top-[11.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9937 23.9937">
        <g clipPath="url(#clip0_1318_11845)" id="Icon">
          <path d="M9.99738 10.9971V16.9956" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49935" />
          <path d="M13.9963 10.9971V16.9956" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49935" />
          <path d={svgPaths.p2ddc5a80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49935" />
          <path d="M2.99921 5.99843H20.9945" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49935" />
          <path d={svgPaths.p1aacd860} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49935" />
        </g>
        <defs>
          <clipPath id="clip0_1318_11845">
            <rect fill="white" height="23.9937" width="23.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[#f44] left-0 rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.987px] top-0" data-name="Button">
      <Icon3 />
    </div>
  );
}

function Container11() {
  return <div className="absolute border-[#e9e9e9] border-[3.672px] border-solid h-[47.997px] left-0 rounded-[16px] top-0 w-[165.498px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[23.869px] items-start left-[20px] top-[12.06px] w-[102.516px]" data-name="Paragraph">
      <p className="css-ew64yg font-['Baloo_Tamma:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-center uppercase">VELVET LOUNGE</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[130.51px] size-[14.995px] top-[16.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9949 14.9949">
        <g clipPath="url(#clip0_1318_11841)" id="Icon">
          <path d={svgPaths.p11d8880} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.56197" />
          <path d={svgPaths.p2e708b80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.56197" />
        </g>
        <defs>
          <clipPath id="clip0_1318_11841">
            <rect fill="white" height="14.9949" width="14.9949" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white h-[47.997px] relative rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Container">
      <Container11 />
      <Paragraph />
      <Icon4 />
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[47.997px] items-start left-[-58.76px] top-[-155.01px] w-[165.498px]" data-name="Button">
      <Container10 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute left-[318.95px] size-[47.987px] top-[27.99px]" data-name="Container">
      <Button7 />
      <Button8 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[31.214px] left-[171.12px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.8)] top-[46px] w-[50.694px]" data-name="Text">
      <p className="absolute css-4hzbpn font-['Baloo_Tamma:Regular',sans-serif] leading-[normal] left-0 not-italic text-[18px] text-white top-0 uppercase w-[51px]">STEP 1</p>
    </div>
  );
}

function Create() {
  return (
    <div className="absolute bg-black h-[851.954px] left-0 overflow-clip top-0 w-[392.927px]" data-name="Create">
      <ImageWithFallback />
      <StepBar />
      <Button6 />
      <Container9 />
      <Text />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white h-[851.954px] left-0 overflow-clip top-0 w-[392.927px]" data-name="App">
      <Create />
    </div>
  );
}

function Container12() {
  return <div className="absolute bg-[rgba(0,0,0,0.5)] h-[851.954px] left-0 top-0 w-[392.927px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[64.493px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Baloo_Tamma:Regular',sans-serif] leading-[17.5px] left-[32.5px] not-italic text-[14px] text-[rgba(30,30,30,0.4)] text-center top-[0.33px] translate-x-[-50%] uppercase">LOCATION</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[22.492px] relative shrink-0 w-[124.167px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Baloo_Tamma:Regular',sans-serif] leading-[22.5px] left-[62.5px] not-italic text-[#1e1e1e] text-[18px] text-center top-[-0.9px] translate-x-[-50%] uppercase">PRIMROSE HILL</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[3.997px] h-[69.992px] items-center justify-center pb-[3.682px] pt-[3.672px] px-[3.672px] relative rounded-[20px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.672px] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <Text1 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[33.002px] relative shrink-0 w-[127.629px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Baloo_Tamma:Regular',sans-serif] leading-[33px] left-[64.5px] not-italic text-[22px] text-center text-white top-[-1.06px] translate-x-[-50%] uppercase">DELETE PHOTO</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#f44] h-[69.992px] relative rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.01px] relative size-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.992px] h-[233.96px] items-start left-[26.46px] top-[239.99px] w-[339.995px]" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute h-[196px] left-[-0.13px] top-[0.32px] w-[336px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex h-[31.214px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="css-ew64yg font-['Baloo_Tamma:Regular',sans-serif] leading-[27px] not-italic relative shrink-0 text-[#1e1e1e] text-[18px] uppercase">1</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[42.336px] items-start left-[11.99px] pb-[3.672px] pt-[5.221px] px-[15.664px] rounded-[12px] top-[11.99px] w-[38.405px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.672px] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <Text4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-white border-[#e9e9e9] border-[3.672px] border-solid h-[199.992px] left-[26.46px] overflow-clip rounded-[20px] top-[23.99px] w-[339.995px]" data-name="Container">
      <ImageWithFallback1 />
      <Container16 />
    </div>
  );
}

function StepSettingsBottomSheet() {
  return (
    <div className="absolute h-[505.943px] left-0 top-0 w-[392.927px]" data-name="StepSettingsBottomSheet">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-white h-[424px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-[428px] w-[393px]" data-name="Container">
      <StepSettingsBottomSheet />
    </div>
  );
}

export default function CreatePageCaptureModePhotoSettings() {
  return (
    <div className="bg-white relative size-full" data-name="Create Page - Capture Mode - Photo Settings">
      <App />
      <Container12 />
      <Container13 />
    </div>
  );
}