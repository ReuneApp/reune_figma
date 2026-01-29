import svgPaths from "./svg-o390q75i38";
import imgImageMapBackground from "figma:asset/f35766008df8a1ef91b59bf807a486f005c0be78.png";
import imgImagePrimroseHill from "figma:asset/22b2cc5459502ab13c772a06508a432b8e7456e2.png";
import imgImageWithFallback from "figma:asset/a5c81971907ca9c42a431df2ba336f0471f4c4f4.png";
import imgImageWithFallback1 from "figma:asset/99437a5e4ec6fef8f340641d8468e0d6e255915b.png";

function ImageMapBackground() {
  return (
    <div className="absolute h-[852.642px] left-0 top-0 w-[393.711px]" data-name="Image (Map background)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageMapBackground} />
    </div>
  );
}

function Container3() {
  return <div className="absolute bg-[rgba(0,0,0,0.05)] h-[852.642px] left-0 top-0 w-[393.711px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute h-[852.642px] left-0 top-0 w-[393.711px]" data-name="Container">
      <ImageMapBackground />
      <Container3 />
    </div>
  );
}

function ImagePrimroseHill() {
  return (
    <div className="absolute h-[852.642px] left-0 top-0 w-[393.711px]" data-name="Image (PRIMROSE HILL)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePrimroseHill} />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[33.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.9967 33.9967">
        <g id="Icon">
          <path d={svgPaths.p327c1a80} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.49976" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[25.99px] pl-[3.672px] pr-[3.682px] py-[3.672px] rounded-[16px] size-[47.987px] top-[27.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.672px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon />
    </div>
  );
}

function Icon1() {
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

function Button1() {
  return (
    <div className="absolute bg-[#f44] left-[319.73px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.987px] top-[27.99px]" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-black h-[852.642px] left-0 top-0 w-[393.711px]" data-name="Container">
      <ImagePrimroseHill />
      <Button />
      <Button1 />
    </div>
  );
}

function Button2() {
  return <div className="absolute left-[60px] size-[47.997px] top-[250px]" data-name="Button" />;
}

function Icon2() {
  return (
    <div className="h-[33.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.83%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.8314 19.8314">
          <path d={svgPaths.p1ec11d00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[6.98px] size-[33.997px] top-[6.99px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white left-0 rounded-[16px] size-[47.987px] top-0" data-name="Button">
      <Container7 />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[rgba(255,255,255,0)] border-[#e9e9e9] border-[3.672px] border-solid left-0 rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.987px] top-0" data-name="Container" />;
}

function Container6() {
  return (
    <div className="absolute left-[25.99px] size-[47.987px] top-[27.99px]" data-name="Container">
      <Button3 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-gradient-to-b from-[rgba(217,217,217,0)] h-[358.997px] left-0 to-[rgba(0,0,0,0.9)] top-[494px] via-[41.827%] via-[rgba(0,0,0,0.5)] w-[393.711px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[23.869px] items-start left-[43.99px] top-[12.06px] w-[74.611px]" data-name="Text">
      <p className="css-ew64yg font-['Baloo_Tamma:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-center text-white uppercase">ADD PHOTO</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[16px] size-[19.996px] top-[13.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9964 19.9964">
        <g clipPath="url(#clip0_1318_11934)" id="Icon">
          <path d={svgPaths.pa0b2b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.08295" />
          <path d={svgPaths.p1d943e20} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.08295" />
        </g>
        <defs>
          <clipPath id="clip0_1318_11934">
            <rect fill="white" height="19.9964" width="19.9964" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#1abb6c] h-[47.987px] overflow-clip relative rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <Text />
      <Icon3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col h-[47.987px] items-start left-0 overflow-clip pl-[34.991px] pr-[224.12px] top-[628.66px] w-[393.711px]" data-name="Container">
      <Button4 />
    </div>
  );
}

function Container13() {
  return <div className="absolute h-[95.994px] left-[450.95px] top-0 w-[148.457px]" data-name="Container" />;
}

function Container14() {
  return <div className="absolute bg-[#e9e9e9] h-[59.999px] left-[39px] rounded-[20536500px] top-[18px] w-[255.994px]" data-name="Container" />;
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[47.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.997 47.997">
        <g id="Icon">
          <path d="M23.9985 37.9976V9.99938" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.99969" />
          <path d={svgPaths.p3b34100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.99969" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#1abb6c] h-[95.994px] relative rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.01px] relative size-full">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[346.96px] size-[95.994px] top-0" data-name="Button">
      <Container15 />
    </div>
  );
}

function Container17() {
  return <div className="bg-white rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] shrink-0 size-[16.994px]" data-name="Container" />;
}

function Container18() {
  return <div className="bg-white rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] shrink-0 size-[16.994px]" data-name="Container" />;
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[5.996px] h-[16.994px] items-start left-[8.05px] top-[55.27px] w-[39.983px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="relative shrink-0 size-[80.081px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePrimroseHill} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container16 />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white left-[34.99px] rounded-[20px] size-[95.994px] top-0" data-name="Button">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[7.956px] relative rounded-[inherit] size-full">
        <ImageWithFallback />
      </div>
      <div aria-hidden="true" className="absolute border-[#1abb6c] border-[7.956px] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="relative shrink-0 size-[80.081px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white left-[138.98px] rounded-[20px] size-[95.994px] top-0" data-name="Button">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[7.956px] relative rounded-[inherit] size-full">
        <ImageWithFallback1 />
      </div>
      <div aria-hidden="true" className="absolute border-[7.956px] border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="relative shrink-0 size-[80.081px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white left-[242.97px] rounded-[20px] size-[95.994px] top-0" data-name="Button">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[7.956px] relative rounded-[inherit] size-full">
        <ImageWithFallback2 />
      </div>
      <div aria-hidden="true" className="absolute border-[7.956px] border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[95.994px] relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container14 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[135.996px] items-start left-0 overflow-clip top-[691px] w-[393.711px]" data-name="Container">
      <Container12 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[852.642px] left-0 top-0 w-[393.711px]" data-name="Container">
      <Button2 />
      <Container6 />
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white h-[852.642px] left-0 top-0 w-[393.711px]" data-name="Container">
      <Container2 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Create() {
  return (
    <div className="h-[851.954px] relative shrink-0 w-full" data-name="Create">
      <Container1 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[851.954px] items-start left-0 overflow-clip pt-[-1.224px] top-0 w-[392.927px]" data-name="Container">
      <Create />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white h-[851.954px] left-0 overflow-clip top-0 w-[392.927px]" data-name="App">
      <Container />
    </div>
  );
}

export default function CreatePageCr3MapMarkerTappedAddedStep1SelectedMultiplePhotosState() {
  return (
    <div className="bg-white relative size-full" data-name="Create Page (CR) - 3 Map Marker Tapped/Added - Step 1 Selected & Multiple Photos State">
      <App />
    </div>
  );
}