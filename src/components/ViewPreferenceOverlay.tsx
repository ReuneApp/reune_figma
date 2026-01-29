import { useState } from 'react';
import { motion } from 'motion/react';

interface ViewPreferenceOverlayProps {
  previewView?: 'posts' | 'map';
  onPreviewChange?: (view: 'posts' | 'map') => void;
  onComplete?: (view: 'posts' | 'map') => void;
  // For Dev Tools
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ViewPreferenceOverlay({ 
  previewView: externalPreviewView, 
  onPreviewChange,
  onComplete,
  // Dev Tools props
  isOpen,
  onClose
}: ViewPreferenceOverlayProps) {
  // Local state for Dev Tools mode
  const [localPreviewView, setLocalPreviewView] = useState<'posts' | 'map'>('posts');
  
  // Use external or local preview view
  const previewView = externalPreviewView !== undefined ? externalPreviewView : localPreviewView;
  
  // Don't render if in Dev Tools mode and not open
  if (isOpen !== undefined && !isOpen) {
    return null;
  }
  
  const handlePreviewChange = (view: 'posts' | 'map') => {
    if (onPreviewChange) {
      onPreviewChange(view);
    } else {
      setLocalPreviewView(view);
    }
  };
  
  const handleComplete = (view: 'posts' | 'map') => {
    if (onComplete) {
      onComplete(view);
    } else if (onClose) {
      // Dev Tools mode
      onClose();
    }
  };
  
  return (
    <motion.div 
      className="absolute inset-0 z-[70] flex flex-col items-center justify-between pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 pointer-events-auto" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full px-6 py-12 pointer-events-none">
        {/* Question text - centered vertically */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-white text-2xl font-medium text-center px-8 font-['Baloo_Tamma',sans-serif]">
            HOW DO YOU PREFER TO VIEW ROUTES?
          </h1>
        </div>

        {/* View Switcher and Continue Button at bottom */}
        <div className="w-full max-w-md space-y-10 pb-8 pointer-events-auto">
          {/* View Switcher - matching the homepage design */}
          <div className="flex justify-center items-center gap-[16px]">
            {/* POSTS Text - outside container */}
            <motion.span
              initial={false}
              animate={{
                scale: previewView === 'posts' ? 1 : 0.9,
                opacity: previewView === 'posts' ? 1 : 0.5,
                fontWeight: previewView === 'posts' ? 700 : 400
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="font-['Baloo_Tamma',sans-serif] text-[20px] whitespace-nowrap"
              style={{
                color: previewView === 'posts' ? '#ffffff' : '#9ca3af'
              }}
            >
              POSTS
            </motion.span>

            {/* White Container with Icons */}
            <div className="bg-white rounded-[16px] px-[12px] py-[8px] flex items-center gap-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] h-[60px]">
              {/* Grid View Button */}
              <motion.button 
                onClick={() => handlePreviewChange('posts')}
                initial={false}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center"
              >
                <motion.svg 
                  initial={false}
                  animate={{ 
                    scale: previewView === 'posts' ? 1 : 0.9,
                    opacity: previewView === 'posts' ? 1 : 0.3
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-[32px] h-[32px]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </motion.svg>
              </motion.button>

              {/* Map View Button */}
              <motion.button 
                onClick={() => handlePreviewChange('map')}
                initial={false}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center"
              >
                <motion.svg 
                  initial={false}
                  animate={{ 
                    scale: previewView === 'map' ? 1 : 0.9,
                    opacity: previewView === 'map' ? 1 : 0.3
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-[32px] h-[32px]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  <line x1="9" y1="3" x2="9" y2="18"/>
                  <line x1="15" y1="6" x2="15" y2="21"/>
                </motion.svg>
              </motion.button>
            </div>

            {/* MAPS Text - outside container */}
            <motion.span
              initial={false}
              animate={{
                scale: previewView === 'map' ? 1 : 0.9,
                opacity: previewView === 'map' ? 1 : 0.5,
                fontWeight: previewView === 'map' ? 700 : 400
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="font-['Baloo_Tamma',sans-serif] text-[20px] whitespace-nowrap"
              style={{
                color: previewView === 'map' ? '#ffffff' : '#9ca3af'
              }}
            >
              MAPS
            </motion.span>
          </div>

          {/* CONTINUE Button */}
          <button
            onClick={() => handleComplete(previewView)}
            className="w-full h-[70px] rounded-[20px] flex items-center justify-center transition-all shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] bg-[#1abb6c] active:scale-95"
          >
            <span className="font-['Baloo_Tamma',sans-serif] text-[22px] text-white font-medium">
              CONTINUE
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}