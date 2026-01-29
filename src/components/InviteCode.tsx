import { useState, useEffect } from 'react';
import imgImageWithFallback from "figma:asset/469da6f70343e806230c6e12f62c4d8f3ae5e8c7.png";

interface InviteCodeProps {
  onSuccess: (loginMethod?: 'email' | 'google' | 'apple') => void;
  onOpenDev?: () => void;
}

export default function InviteCode({ onSuccess, onOpenDev }: InviteCodeProps) {
  const [code, setCode] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  // Auto-detect valid invite code
  useEffect(() => {
    if (code.toLowerCase() === 'reune') {
      setShowDialog(true);
    }
  }, [code]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleEmailAuth = () => {
    // EMAIL button goes directly to home
    onSuccess('email');
  };

  const handleGoogleAuth = () => {
    // GOOGLE button goes to profile creation with random name
    onSuccess('google');
  };

  const handleAppleAuth = () => {
    // APPLE button goes to profile creation with random name
    onSuccess('apple');
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Onboarding Invite Code">
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-full">
          {/* TEXT FIELD */}
          <div 
            className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-1/2 -translate-x-1/2 pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[400px] w-[300px]"
            data-name="TEXT FIELD"
          >
            <div 
              aria-hidden="true" 
              className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" 
            />
            <input
              type="text"
              value={code}
              onChange={handleInputChange}
              placeholder="YOUR CODE"
              className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-[#1e1e1e] placeholder:text-[rgba(30,30,30,0.4)] w-[210px] bg-transparent outline-none uppercase"
              autoFocus
            />
          </div>

          {/* STEP (FILLED) */}
          <div 
            onClick={onOpenDev}
            className="absolute bg-white left-1/2 -translate-x-1/2 rounded-[20px] size-[95.998px] top-[161px] cursor-pointer active:scale-95 transition-transform" 
            data-name="STEP (FILLED)"
          >
            <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
              <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          </div>

          {/* INVITE CODE Title */}
          <p className="absolute font-['Baloo_Tamma',sans-serif] left-1/2 -translate-x-1/2 top-[32.28%] leading-[normal] not-italic text-[#1e1e1e] text-[28px] text-center">INVITE CODE</p>

          {/* Subtitle */}
          <p className="absolute font-['Baloo_Tamma',sans-serif] leading-[normal] left-1/2 -translate-x-1/2 not-italic text-[14px] text-[rgba(30,30,30,0.4)] text-center top-[37.91%] w-[218px]">REUNE IS AN INVITE ONLY PLATFORM CURRENTLY.</p>

          {/* Dark Overlay - Shows when dialog is visible */}
          {showDialog && (
            <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 z-10" />
          )}

          {/* Login Dialog - Shows when valid code is entered */}
          {showDialog && (
            <div className="absolute h-[410px] left-[27px] top-[221px] w-[340px] z-20" data-name="DIALOG TEMPLATE">
              <div className="absolute h-[410px] left-0 top-0 w-[340px]">
                <div className="absolute bg-white border-8 border-[#e9e9e9] border-solid inset-0 rounded-[30px]" />
                
                {/* Terms and Conditions */}
                <p className="absolute font-['Baloo_Tamma',sans-serif] inset-[16.34%_14.41%_71.95%_17.65%] leading-[normal] not-italic text-[14px] text-[rgba(30,30,30,0.4)] text-center">{`BY CONTINUING, YOU ACCEPT REUNE'S T&Cs AND PRIVACY POLICY`}</p>
                
                {/* LOGIN Title */}
                <p className="absolute font-['Baloo_Tamma',sans-serif] inset-[5.61%_16.47%_85.37%_16.76%] leading-[normal] not-italic text-[#1e1e1e] text-[28px] text-center">LOGIN</p>
                
                {/* GOOGLE Button */}
                <button 
                  onClick={handleGoogleAuth}
                  className="absolute bg-[#1abb6c] box-border content-stretch flex gap-[18px] inset-[35.61%_5.88%_47.32%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] active:scale-95 transition-transform"
                  data-name="YES (BUTTON)"
                >
                  <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[274px]">GOOGLE</p>
                </button>
                
                {/* APPLE Button */}
                <button 
                  onClick={handleAppleAuth}
                  className="absolute bg-black box-border content-stretch flex gap-[18px] inset-[55.61%_5.88%_27.32%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] active:scale-95 transition-transform"
                  data-name="YES (BUTTON)"
                >
                  <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[274px]">APPLE</p>
                </button>
                
                {/* EMAIL Button */}
                <button 
                  onClick={handleEmailAuth}
                  className="absolute bg-white box-border content-stretch flex gap-[18px] inset-[75.60%_5.88%_7.33%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px] active:scale-95 transition-transform"
                  data-name="DEFAULT (BUTTON)"
                >
                  <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
                  <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[22px] text-center w-[242px]">EMAIL</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}