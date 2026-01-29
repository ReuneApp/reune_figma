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

export default function Step() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="STEP">
      <Button />
    </div>
  );
}