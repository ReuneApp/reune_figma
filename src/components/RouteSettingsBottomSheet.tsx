import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import PlaceGalleryPopup from './PlaceGalleryPopup';

interface Step {
  id: string;
  image: string;
  location: string;
  caption?: string;
  photos?: string[]; // Multiple photos per step
}

interface RouteSettingsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  step: Step;
  isCreator: boolean;
  onDeleteRoute?: () => void;
  onViewLocation?: () => void;
  onEditRoute?: () => void;
  onNavigateToMapWithPlace?: (location: string) => void;
}

export default function RouteSettingsBottomSheet({ 
  isOpen, 
  onClose, 
  step, 
  isCreator,
  onDeleteRoute,
  onViewLocation,
  onEditRoute,
  onNavigateToMapWithPlace
}: RouteSettingsBottomSheetProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[30px] z-[9999] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Border */}
            <div className="absolute inset-0 border-8 border-[#e9e9e9] rounded-t-[30px] pointer-events-none" />

            {/* Content */}
            <div className="flex flex-col px-6 pb-8 pt-6">
              {/* Step Preview */}
              <div className="w-full h-[200px] rounded-[20px] overflow-hidden mb-4 border-4 border-[#e9e9e9] bg-white mx-auto max-w-[340px]">
                <img
                  src={step.image}
                  alt="Step preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Settings Options */}
              <div className="space-y-3 max-w-[340px] mx-auto w-full">
                {/* Location Button */}
                <button
                  onClick={() => {
                    if (onNavigateToMapWithPlace) {
                      onNavigateToMapWithPlace(step.location);
                    } else {
                      onViewLocation?.();
                    }
                    onClose();
                  }}
                  className="w-full bg-white border-4 border-[#e9e9e9] rounded-[20px] min-h-[70px] flex flex-col items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] py-2 px-4"
                >
                  <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[rgba(30,30,30,0.4)] uppercase text-center leading-tight">
                    LOCATION
                  </span>
                  <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase text-center leading-tight mt-1">
                    {step.location || 'NOT SET'}
                  </span>
                </button>

                {/* Photos Button - Normal size with single line */}
                <button
                  onClick={() => {
                    setIsGalleryOpen(true);
                  }}
                  className="w-full bg-white border-4 border-[#e9e9e9] rounded-[20px] h-[70px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-['Baloo_Tamma',sans-serif] text-[22px] font-bold text-[#1e1e1e] leading-none">
                    PHOTOS
                  </span>
                </button>

                {/* Edit Route Button - Only show if creator */}
                {isCreator && onEditRoute && (
                  <button
                    onClick={() => {
                      onEditRoute?.();
                      onClose();
                    }}
                    className="w-full bg-white border-4 border-[#e9e9e9] rounded-[20px] h-[70px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
                  >
                    <span className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] uppercase">
                      EDIT
                    </span>
                  </button>
                )}

                {/* Delete Route Button - Only show if creator */}
                {isCreator && (
                  <button
                    onClick={() => {
                      onDeleteRoute?.();
                      onClose();
                    }}
                    className="w-full bg-[#ff4444] rounded-[20px] h-[70px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
                  >
                    <span className="font-['Baloo_Tamma',sans-serif] text-[22px] text-white uppercase">
                      DELETE ROUTE
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Place Gallery Popup */}
          <PlaceGalleryPopup
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            place={{
              name: step.location || 'UNKNOWN LOCATION',
              category: 'LOCATION',
              distance: '',
              photos: step.photos || [step.image]
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}