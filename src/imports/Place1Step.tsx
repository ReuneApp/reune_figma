function Container2() {
  return (
    <img 
      src="https://images.unsplash.com/photo-1571218371219-0a0649fb9748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwc3RvcmVmcm9udHxlbnwxfHx8fDE3NjQ3NzU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      alt="Place"
      className="absolute inset-0 size-full object-cover"
      data-name="Container"
    />
  );
}

function Button() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[10px] top-[7px] w-[48px]" data-name="Container">
      <Button />
    </div>
  );
}

function People() {
  return (
    <div className="absolute left-[253px] size-[20px] top-[21px]" data-name="people">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="people"></g>
      </svg>
    </div>
  );
}

interface Place1StepProps {
  placeName?: string;
  placeImage?: string;
  placeCategory?: string;
  placeDistance?: string;
}

export default function Place1Step({ placeName = 'PLACE NAME', placeImage, placeCategory = 'CATEGORY', placeDistance = '0.5 MI' }: Place1StepProps) {
  return (
    <div className="bg-white border-8 border-[#e9e9e9] border-solid relative rounded-[30px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.25)] size-full" data-name="PLACE (1 STEP)">
      {/* Centered container for thumbnail and text */}
      <div className="absolute inset-0 flex items-center pl-[9px] pr-[17px] gap-[18px]">
        {/* Thumbnail */}
        <div className="shrink-0 w-[95.998px]">
          <div className="bg-white h-[95.998px] relative rounded-[20px] w-full">
            <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
              <img 
                src={placeImage || "https://images.unsplash.com/photo-1571218371219-0a0649fb9748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwc3RvcmVmcm9udHxlbnwxfHx8fDE3NjQ3NzU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"}
                alt="Place"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute border-[#e9e9e9] border-8 border-solid inset-0 pointer-events-none rounded-[20px]" />
          </div>
        </div>
        
        {/* Text content */}
        <div className="flex-1 flex flex-col gap-[0px] min-w-0">
          <p className="font-['Baloo_Tamma:Regular',sans-serif] leading-[0.9] not-italic text-[#1e1e1e] text-[18px] uppercase break-words">{placeName}</p>
          <div className="flex items-center gap-[8px]">
            <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
              {placeCategory}
            </span>
            <span className="text-[#1e1e1e] opacity-40">•</span>
            <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
              {placeDistance}
            </span>
          </div>
        </div>
      </div>
      <People />
    </div>
  );
}