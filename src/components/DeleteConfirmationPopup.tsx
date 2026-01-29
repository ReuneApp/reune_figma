import { motion, AnimatePresence } from 'motion/react';

interface DeleteConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  routeTitle?: string;
}

export default function DeleteConfirmationPopup({ isOpen, onClose, onConfirm, routeTitle }: DeleteConfirmationPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[340px]"
          >
            <div className="bg-white border-8 border-[#e9e9e9] border-solid rounded-[30px] px-6 py-6">
              {/* Title */}
              <h2 className="font-['Baloo_Tamma',sans-serif] text-[28px] text-[#1e1e1e] text-center uppercase mb-6">
                DELETE?
              </h2>

              <div className="space-y-3 w-full">
                {/* Continue Button (Cancel) */}
                <button
                  onClick={onClose}
                  className="w-full bg-white border-4 border-[#e9e9e9] rounded-[20px] h-[70px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] uppercase">
                    CONTINUE
                  </span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={onConfirm}
                  className="w-full bg-[#ff4444] rounded-[20px] h-[70px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-['Baloo_Tamma',sans-serif] text-[22px] text-white uppercase">
                    DELETE
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
