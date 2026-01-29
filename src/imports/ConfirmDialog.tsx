function Frame() {
  return (
    <div className="absolute h-[410px] left-0 top-0 w-[340px]">
      <div className="absolute bg-white border-8 border-[#e9e9e9] border-solid inset-0 rounded-[30px]" />
      <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] inset-[12.44%_10.88%_80.24%_10.88%] leading-[normal] not-italic text-[#1e1e1e] text-[22px] text-center">DIALOG QUESTION HERE...</p>
      <div className="absolute bg-white box-border content-stretch flex gap-[18px] inset-[76.1%_5.88%_6.83%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px]" data-name="DEFAULT (BUTTON)">
        <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
        <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[22px] text-center w-[242px]">CANCEL</p>
      </div>
      <div className="absolute bg-[#1abb6c] box-border content-stretch flex gap-[18px] inset-[56.1%_5.88%_26.83%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" data-name="YES (BUTTON)">
        <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[96px]">CONFIRM</p>
      </div>
      <p className="absolute bottom-[54.88%] font-['Baloo_Tamma:Regular',sans-serif] leading-[normal] left-[170px] not-italic text-[14px] text-[rgba(30,30,30,0.4)] text-center top-[27.56%] translate-x-[-50%] w-[218px] whitespace-pre-wrap">{`DIALOG  SUB TEXT HERE WHICH IS UNLIKELY TO  BE READ BY THE USER`}</p>
    </div>
  );
}

export default function ConfirmDialog() {
  return (
    <div className="relative size-full" data-name="CONFIRM DIALOG">
      <Frame />
    </div>
  );
}