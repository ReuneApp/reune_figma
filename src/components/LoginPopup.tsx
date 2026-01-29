import { motion, AnimatePresence } from 'motion/react';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleAuth?: () => void;
  onAppleAuth?: () => void;
  onEmailAuth?: () => void;
}

export default function LoginPopup({ 
  isOpen, 
  onClose,
  onGoogleAuth,
  onAppleAuth,
  onEmailAuth
}: LoginPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-[9998]"
            onClick={onClose}
          />

          {/* Login Dialog - Exact match to onboarding */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] h-[410px] w-[340px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[410px] w-[340px]">
              <div className="absolute bg-white border-8 border-[#e9e9e9] border-solid inset-0 rounded-[30px]" />
              
              {/* Terms and Conditions */}
              <p className="absolute font-['Baloo_Tamma',sans-serif] inset-[16.34%_14.41%_71.95%_17.65%] leading-[normal] not-italic text-[14px] text-[rgba(30,30,30,0.4)] text-center">{`BY CONTINUING, YOU ACCEPT REUNE'S T&Cs AND PRIVACY POLICY`}</p>
              
              {/* LOGIN Title */}
              <p className="absolute font-['Baloo_Tamma',sans-serif] inset-[5.61%_16.47%_85.37%_16.76%] leading-[normal] not-italic text-[#1e1e1e] text-[28px] text-center">LOGIN</p>
              
              {/* GOOGLE Button */}
              <button 
                onClick={() => {
                  onGoogleAuth?.();
                  onClose();
                }}
                className="absolute bg-[#1abb6c] box-border content-stretch flex gap-[18px] inset-[35.61%_5.88%_47.32%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] active:scale-95 transition-transform"
                data-name="YES (BUTTON)"
              >
                <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[274px]">GOOGLE</p>
              </button>
              
              {/* APPLE Button */}
              <button 
                onClick={() => {
                  onAppleAuth?.();
                  onClose();
                }}
                className="absolute bg-black box-border content-stretch flex gap-[18px] inset-[55.61%_5.88%_27.32%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] active:scale-95 transition-transform"
                data-name="YES (BUTTON)"
              >
                <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[274px]">APPLE</p>
              </button>
              
              {/* EMAIL Button */}
              <button 
                onClick={() => {
                  onEmailAuth?.();
                  onClose();
                }}
                className="absolute bg-white box-border content-stretch flex gap-[18px] inset-[75.60%_5.88%_7.33%_5.88%] items-center justify-center px-[20px] py-[10px] rounded-[20px] active:scale-95 transition-transform"
                data-name="DEFAULT (BUTTON)"
              >
                <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
                <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[22px] text-center w-[242px]">EMAIL</p>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
