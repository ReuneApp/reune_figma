function SwitchButtonOff({ className }: { className?: string }) {
  return (
    <div className={className} data-name="SWITCH BUTTON (OFF)">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma:Regular',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#e9e9e9] text-[22px] text-center w-[242px]">SWITCH OFF</p>
    </div>
  );
}

export default function SwitchButtonOff1() {
  return <SwitchButtonOff className="bg-white relative rounded-[20px] size-full" />;
}