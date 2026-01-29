import imgReuneLogoMk2Circle1 from "figma:asset/c53d2646a712e492739f88d399c265e63483107c.png";

function Text() {
  return (
    <div className="absolute h-[31px] left-[26px] top-[167px] w-[352px]" data-name="Text">
      <p className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[normal] left-0 text-[#5e5e5e] text-[14px] top-0 w-[352px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Share your plans or ideas, or get inspiration from others! Go and socialise!
      </p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[143px] items-center relative shrink-0">
      <p className="font-['SF_Pro:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Continue with Google
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex gap-[10px] items-center justify-center left-[22px] px-[24px] py-[16px] rounded-[12px] top-[286px] w-[355px]" data-name="Button">
      <Frame39 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[143px] items-center relative shrink-0">
      <p className="font-['SF_Pro:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[#5e5e5e] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Continue with Email
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] items-center justify-center left-[24px] px-[24px] py-[16px] rounded-[12px] top-[222px] w-[355px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#b0b0b0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame40 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[143px] items-center relative shrink-0">
      <p className="font-['SF_Pro:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Continue with Apple
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#100f0f] box-border content-stretch flex gap-[10px] items-center justify-center left-[23px] px-[24px] py-[16px] rounded-[12px] top-[350px] w-[355px]" data-name="Button">
      <Frame41 />
    </div>
  );
}

function HintAlternateText() {
  return (
    <div className="absolute h-[24px] left-[104px] top-[439px] w-[195px]" data-name="Hint/Alternate Text">
      <p className="absolute font-['SF_Pro:Semibold',_sans-serif] font-[590] leading-[normal] left-[97.5px] text-[#b0b0b0] text-[8px] text-center top-0 translate-x-[-50%] w-[195px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        BY CONTINUING, YOU AGREE TO REUNE’S TERMS OF SERVICE
      </p>
    </div>
  );
}

export default function BottomSheet() {
  return (
    <div className="relative shadow-[0px_6px_16px_0px_rgba(0,0,0,0.12)] size-full" data-name="Bottom Sheet">
      <div className="absolute bg-white h-[523px] left-0 rounded-tl-[24px] rounded-tr-[24px] top-0 w-[402px]">
        <div aria-hidden="true" className="absolute border border-[#dddddd] border-solid inset-0 pointer-events-none rounded-tl-[24px] rounded-tr-[24px]" />
      </div>
      <Text />
      <Button />
      <Button1 />
      <Button2 />
      <p className="absolute font-['SF_Pro:Bold',_sans-serif] font-bold leading-[normal] left-[25px] text-[#222222] text-[22px] top-[128px] w-[352px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Get Started
      </p>
      <div className="absolute left-[26px] size-[54px] top-[50px]" data-name="Reune Logo mk2 Circle 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgReuneLogoMk2Circle1} />
      </div>
      <HintAlternateText />
    </div>
  );
}