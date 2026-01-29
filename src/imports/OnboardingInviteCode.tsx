import imgImageWithFallback from "figma:asset/469da6f70343e806230c6e12f62c4d8f3ae5e8c7.png";

function TextField() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[47px] pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[400px] w-[300px]" data-name="TEXT FIELD">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-[rgba(30,30,30,0.4)] w-[210px]">YOUR CODE</p>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function StepFilled() {
  return (
    <div className="absolute bg-white left-[149px] rounded-[20px] size-[95.998px] top-[161px]" data-name="STEP (FILLED)">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <ImageWithFallback />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[393.719px]">
        <TextField />
        <StepFilled />
        <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] inset-[32.28%_16.18%_64.2%_16.26%] leading-[normal] not-italic text-[#1e1e1e] text-[28px] text-center">INVITE CODE</p>
        <p className="absolute bottom-[56.46%] font-['Baloo_Tamma:Regular',sans-serif] leading-[normal] left-[197px] not-italic text-[14px] text-[rgba(30,30,30,0.4)] text-center top-[37.91%] translate-x-[-50%] w-[218px]">REUNE IS AN INVITE ONLY PLATFORM CURRENTLY.</p>
      </div>
    </div>
  );
}

export default function OnboardingInviteCode() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Onboarding Invite Code">
      <Container />
    </div>
  );
}