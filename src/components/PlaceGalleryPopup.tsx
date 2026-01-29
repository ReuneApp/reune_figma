import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface PlaceGalleryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  place?: {
    name: string;
    category: string;
    distance: string;
    photos: string[];
  };
}

export default function PlaceGalleryPopup({ isOpen, onClose, place }: PlaceGalleryPopupProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Default mock place for DevTools
  const defaultPlace = {
    name: 'COFFEE SHOP DEMO',
    category: 'CAFE',
    distance: '0.5 KM',
    photos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      // Repeat for demo scroll
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      // Repeat again
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ]
  };

  const displayPlace = place || defaultPlace;

  const handleClose = () => {
    setSelectedImageIndex(null);
    onClose();
  };

  const handleBackToGrid = () => {
    setSelectedImageIndex(null);
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
            onClick={handleClose}
          />

          {/* Popup container - stays consistent */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="absolute left-[27px] right-[27px] top-[120px] bottom-[120px] bg-white rounded-[30px] border-[8px] border-[#e9e9e9] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {/* Grid mode */}
              {selectedImageIndex === null && (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {/* Title */}
                  <div className="shrink-0 px-[40px] pt-[20px] pb-[16px]">
                    <h1 className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] leading-tight uppercase text-center">
                      {displayPlace.name}
                    </h1>
                  </div>

                  {/* 3-column photo grid */}
                  <div className="px-[20px] pb-[40px] grid grid-cols-3 gap-x-[20px] gap-y-[8px] justify-items-center">
                    {displayPlace.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className="w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden border-[8px] border-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white active:scale-95 transition-transform"
                      >
                        <img 
                          src={photo} 
                          alt={`${displayPlace.name} photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Full screen mode */}
              {selectedImageIndex !== null && (
                <motion.div
                  key="fullscreen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Full image */}
                  <img 
                    src={displayPlace.photos[selectedImageIndex]} 
                    alt={`${displayPlace.name} photo ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover rounded-[22px]"
                  />

                  {/* Back button - Top Left */}
                  <button
                    onClick={handleBackToGrid}
                    className="absolute left-[20px] top-[20px] z-20 w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] active:scale-95 transition-transform"
                  >
                    <ArrowLeft className="w-5 h-5 text-black" strokeWidth={3} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Close Button - Always visible, bottom half */}
            <button
              onClick={handleClose}
              className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-30 bg-white rounded-[20px] px-[40px] py-[12px] h-[70px] w-[300px] flex items-center justify-center active:scale-95 transition-transform"
            >
              <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
              <p className="font-['Baloo_Tamma',sans-serif] text-[22px] text-black leading-none">
                CLOSE
              </p>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}