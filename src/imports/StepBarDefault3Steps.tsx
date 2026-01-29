import imgImageWithFallback from "figma:asset/64c50f1b0e9d3f0bc87b205f55019d384dc33f1b.png";
import imgImageWithFallback1 from "figma:asset/81405a6094906e7727c5de1bae45c613daf5bc87.png";
import imgImageWithFallback2 from "figma:asset/d01cdd61cfac888c5435ea927930789313267c30.png";

function Container() {
  return <div className="absolute h-0 left-[511.98px] top-[47.99px] w-[15.995px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[#e9e9e9] h-[60px] left-0 rounded-[2.06422e+07px] top-[18px] w-[300px]" data-name="Container" />;
}

function ImageWithFallback() {
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

function Container3() {
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

function Container4() {
  return (
    <div className="absolute bg-white left-[207.99px] rounded-[20px] size-[95.998px] top-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback2 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[96px] left-0 top-0 w-[304px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

export default function StepBarDefault3Steps() {
  return (
    <div className="relative size-full" data-name="STEP BAR (DEFAULT) - 3 STEPS">
      <Container />
      <Container1 />
      <Container5 />
    </div>
  );
}