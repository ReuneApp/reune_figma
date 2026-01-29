import svgPaths from "./svg-k869p88pho";
import imgImageStep1 from "figma:asset/33f32cdcb3dc12af21fef6337149394593409811.png";

function Container() {
  return <div className="absolute bg-[#e9e9e9] h-[59.999px] left-[39px] rounded-[20536500px] top-[18px] w-[47.997px]" data-name="Container" />;
}

function Container2() {
  return <div className="absolute h-[95.994px] left-[354.95px] top-0 w-[148.457px]" data-name="Container" />;
}

function ImageStep() {
  return (
    <div className="absolute left-0 size-[80.081px] top-0" data-name="Image (Step 1)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageStep1} />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white border-[7.956px] border-solid border-white left-0 overflow-clip rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[95.994px] top-0" data-name="Container">
      <ImageStep />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute left-[34.99px] size-[95.994px] top-0" data-name="Button">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[95.994px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[7.956px] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[138.98px] size-[95.994px] top-0" data-name="Button">
      <Container4 />
    </div>
  );
}

function Icon() {
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

function Container5() {
  return (
    <div className="bg-[#1abb6c] h-[95.994px] relative rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.01px] relative size-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[250.96px] size-[95.994px] top-0" data-name="Button">
      <Container5 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[95.994px] left-0 top-0 w-[392.927px]" data-name="Container">
      <Container2 />
      <Button />
      <Button1 />
      <Button2 />
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

function Icon1() {
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

function Button3() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[25.99px] pl-[3.672px] pr-[3.682px] py-[3.672px] rounded-[16px] size-[47.987px] top-[27.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.672px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon1 />
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
      <StepBar />
      <Button3 />
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

function App1() {
  return <div className="absolute h-[851.954px] left-0 top-0 w-[392.927px]" data-name="App" />;
}

export default function CreatePageCaptureMode1Step() {
  return (
    <div className="bg-white relative size-full" data-name="Create Page - Capture Mode - 1 Step">
      <App />
      <App1 />
    </div>
  );
}