import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface CoverPhotoPickerProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  selectedCoverIndex: number;
  onSelectCover: (index: number) => void;
}

export default function CoverPhotoPicker({ 
  isOpen, 
  onClose, 
  photos, 
  selectedCoverIndex,
  onSelectCover
}: CoverPhotoPickerProps) {
  const [tempSelectedIndex, setTempSelectedIndex] = useState(selectedCoverIndex);

  // Check if selection has changed
  const hasChanged = tempSelectedIndex !== selectedCoverIndex;

  const handleSelect = () => {
    if (!hasChanged) return; // Don't proceed if no change
    onSelectCover(tempSelectedIndex);
    onClose();
  };

  const handleCancel = () => {
    setTempSelectedIndex(selectedCoverIndex); // Reset to original
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999]"
        >
          {/* Scrim background */}
          <div 
            className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"
            onClick={handleCancel}
          />

          {/* Popup container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="absolute left-[27px] right-[27px] top-[120px] bottom-[120px] bg-white rounded-[30px] border-[8px] border-[#e9e9e9] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Title */}
              <div className="shrink-0 px-[40px] pt-[20px] pb-[16px]">
                <h1 className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] leading-tight uppercase text-center">
                  SELECT COVER PHOTO
                </h1>
              </div>

              {/* 3-column photo grid */}
              <div className="px-[20px] pb-[40px] grid grid-cols-3 gap-x-[20px] gap-y-[8px] justify-items-center">
                {photos.map((photo, index) => {
                  const isSelected = index === tempSelectedIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => setTempSelectedIndex(index)}
                      className={`relative w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden border-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-all ${
                        isSelected 
                          ? 'border-[#1abb6c]' 
                          : 'border-white'
                      }`}
                    >
                      <img 
                        src={photo} 
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Floating Select Button */}
            <button
              onClick={handleSelect}
              disabled={!hasChanged}
              className={`absolute bottom-[30px] left-1/2 -translate-x-1/2 z-30 rounded-[20px] px-[40px] py-[12px] h-[70px] w-[300px] flex items-center justify-center transition-all ${
                hasChanged 
                  ? 'bg-[#1abb6c] active:scale-95' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <div aria-hidden="true" className={`absolute border-4 border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] ${
                hasChanged ? 'border-[#1abb6c]' : 'border-gray-300'
              }`} />
              <p className="font-['Baloo_Tamma',sans-serif] text-[22px] text-white leading-none">
                SELECT
              </p>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}