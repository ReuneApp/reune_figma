import svgPaths from "./svg-h72rs90uya";
import imgEllipse3 from "figma:asset/f9c55fd50db80b07b06f16f89ea0bbeb2b558082.png";
import imgEdittProfileTemplate2 from "figma:asset/a23b140d2769773842c3f6bd79a4ad3a37cc0f1a.png";

function TitleText() {
  return (
    <div className="absolute h-[26px] left-[141px] top-[96px] w-[122px]" data-name="Title Text">
      <p className="absolute font-['SF_Pro:Bold',_sans-serif] font-bold leading-[normal] left-0 text-[#1c1c1c] text-[22px] top-0 w-[122px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edit Profile
      </p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute left-0 size-[24px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group 13">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 17" r="12" />
          <g clipPath="url(#clip0_26_1234)" id="clear">
            <g id="Vector"></g>
            <path d={svgPaths.p3b57bb00} fill="var(--fill-0, #100F0F)" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinejoin="round" strokeWidth="0.4" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_26_1234">
            <rect fill="white" height="16" transform="translate(4 4)" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CloseButton() {
  return (
    <div className="absolute left-[359px] size-[24px] top-[97px]" data-name="Close Button">
      <Group13 />
    </div>
  );
}

function Upload() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Upload">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Upload">
          <path d={svgPaths.p2fff9d80} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function MapChips() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-start left-0 px-[8px] py-[6px] rounded-[43px] shadow-[0px_1px_5px_-363px_rgba(0,0,0,0.19)] top-0" data-name="Map Chips">
      <p className="font-['SF_Pro:Semibold',_sans-serif] font-[590] leading-[normal] relative shrink-0 text-[#222222] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edit
      </p>
      <Upload />
    </div>
  );
}

function Chip() {
  return (
    <div className="absolute h-[29px] left-[78px] top-[207px] w-[66px]" data-name="Chip">
      <MapChips />
    </div>
  );
}

function ProfilePhoto() {
  return (
    <div className="absolute left-[91px] size-[222px] top-[163px]" data-name="Profile Photo">
      <div className="absolute left-0 size-[222px] top-0">
        <div className="absolute inset-[-4.505%]">
          <img alt="" className="block max-w-none size-full" height="242" src={imgEllipse3} width="242" />
        </div>
      </div>
      <Chip />
    </div>
  );
}

function TitleText1() {
  return (
    <div className="absolute h-[26px] left-[19px] top-[443px] w-[352px]" data-name="Title Text">
      <p className="absolute font-['SF_Pro:Bold',_sans-serif] font-bold leading-[normal] left-0 text-[#100f0f] text-[22px] top-0 w-[352px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        My profile
      </p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[31px] left-[19px] top-[483px] w-[352px]" data-name="Text">
      <p className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[normal] left-0 text-[#5e5e5e] text-[14px] top-0 w-[352px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Customise your profile here, this helps your friends to recognise you on the platform.
      </p>
    </div>
  );
}

function SelectionBox() {
  return (
    <div className="absolute h-[58px] left-[25px] top-[548px] w-[352px]" data-name="Selection Box">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 352 58">
        <g id="Selection Box">
          <path d={svgPaths.p27aae930} fill="var(--fill-0, #F7F7F7)" id="Rectangle 3" />
        </g>
      </svg>
    </div>
  );
}

function Type() {
  return (
    <div className="absolute left-[41px] size-[29px] top-[562px]" data-name="type">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 29">
        <g id="type">
          <path d={svgPaths.p15585a80} id="Icon" stroke="var(--stroke-0, #100F0F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[19px] left-[84px] top-[567px] w-[131px]" data-name="Text">
      <p className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[normal] left-0 text-[#100f0f] text-[16px] top-0 w-[63px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Anthony
      </p>
    </div>
  );
}

function Edit() {
  return (
    <div className="absolute left-[342px] size-[17px] top-[568px]" data-name="edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="edit">
          <path d={svgPaths.p13b07a50} fill="var(--fill-0, #1D1B20)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function SelectionBox1() {
  return (
    <div className="absolute h-[58px] left-[25px] top-[622px] w-[352px]" data-name="Selection Box">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 352 58">
        <g id="Selection Box">
          <path d={svgPaths.p27aae930} fill="var(--fill-0, #F7F7F7)" id="Rectangle 3" />
        </g>
      </svg>
    </div>
  );
}

function House() {
  return (
    <div className="absolute left-[43px] size-[24px] top-[639px]" data-name="house">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="house">
          <g id="Union">
            <path d={svgPaths.p76b0f00} fill="#212529" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[19px] left-[84px] top-[641px] w-[131px]" data-name="Text">
      <p className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[normal] left-0 text-[#100f0f] text-[16px] top-0 w-[97px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Miami, USA
      </p>
    </div>
  );
}

function Edit1() {
  return (
    <div className="absolute left-[342px] size-[17px] top-[642px]" data-name="edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="edit">
          <path d={svgPaths.p13b07a50} fill="var(--fill-0, #1D1B20)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[143px] items-center relative shrink-0">
      <p className="font-['SF_Pro:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Save
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#1abb6c] box-border content-stretch flex gap-[10px] items-center justify-center left-[24px] px-[24px] py-[16px] rounded-[12px] top-[727px] w-[355px]" data-name="Button">
      <Frame39 />
    </div>
  );
}

export default function AuthEditProfile() {
  return (
    <div className="bg-white relative size-full" data-name="Auth Edit Profile">
      <div className="absolute h-[874px] left-0 opacity-30 top-0 w-[404px]" data-name="Editt Profile.template 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgEdittProfileTemplate2} />
      </div>
      <div className="absolute bg-white h-[799px] left-0 rounded-tl-[24px] rounded-tr-[24px] top-[75px] w-[402px]">
        <div aria-hidden="true" className="absolute border border-[#dddddd] border-solid inset-0 pointer-events-none rounded-tl-[24px] rounded-tr-[24px]" />
      </div>
      <TitleText />
      <CloseButton />
      <ProfilePhoto />
      <TitleText1 />
      <Text />
      <SelectionBox />
      <Type />
      <Text1 />
      <Edit />
      <SelectionBox1 />
      <House />
      <Text2 />
      <Edit1 />
      <Button />
    </div>
  );
}