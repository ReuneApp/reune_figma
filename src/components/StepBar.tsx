import { useRef, useEffect, useState } from 'react';
import { X, CameraOff, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-x7toy1cpt6';
import { Fragment } from 'react';

interface Step {
  id: string;
  image: string;
  location?: string;
  type?: 'photo' | 'video';
  thumbnail?: string; // For video thumbnails
  templateIcon?: React.ReactNode; // Template icon for unfilled template steps
  templateLabel?: string; // Template label for unfilled template steps
  photos?: string[]; // User-uploaded photos
  coverImage?: string; // Cover image for step
  hasUserPhoto?: boolean; // True if has user photos
  source?: 'user' | 'google'; // Source of step
}

interface StepBarProps {
  steps: Step[];
  selectedStepIndex: number;
  onStepClick?: (index: number) => void;
  onNavigateClick?: () => void;
  onPostClick?: () => void;
  onCaptureClick?: () => void;
  onDeleteStep?: (index: number) => void;
  onCaptureHoldStart?: () => void; // New prop for hold start
  onCaptureHoldEnd?: () => void; // New prop for hold end
  onStepLongPress?: (index: number) => void; // New prop for step long press
  mode: 'capture' | 'browseRoute' | 'browsePlace' | 'tracking' | 'profile';
  maxVisibleInProfile?: number;
  className?: string;
  isRecording?: boolean; // New prop to track recording state
  showPostButton?: boolean; // New prop to show POST button in capture mode
  showContinueArrow?: boolean; // New prop to show green continue arrow
  onContinueClick?: () => void; // New prop for continue arrow click
}

export default function StepBar({
  steps,
  selectedStepIndex,
  onStepClick,
  onNavigateClick,
  onPostClick,
  onCaptureClick,
  onDeleteStep,
  onCaptureHoldStart,
  onCaptureHoldEnd,
  onStepLongPress,
  mode,
  maxVisibleInProfile = 3,
  className = '',
  isRecording = false, // Default to false if not provided
  showPostButton = false, // Default to false if not provided
  showContinueArrow = false, // Default to false if not provided
  onContinueClick // Default to undefined if not provided
}: StepBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [longPressingIndex, setLongPressingIndex] = useState<number | null>(null);

  // Handle long press start
  const handleStepPressStart = (index: number) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    
    setLongPressingIndex(index);
    
    longPressTimerRef.current = setTimeout(() => {
      onStepLongPress?.(index);
      setLongPressingIndex(null);
    }, 500); // 500ms for long press
  };

  // Handle long press end/cancel
  const handleStepPressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setLongPressingIndex(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  // Calculate tiles based on mode
  const getTiles = () => {
    const tiles: Array<{
      type: 'step' | 'capture' | 'post' | 'navigate' | 'overflow' | 'invisible';
      index?: number;
      step?: Step;
      count?: number;
    }> = [];

    if (mode === 'capture') {
      // Capture mode: [steps...] [capture placeholder] [post tile]
      if (steps.length === 0) {
        tiles.push({ type: 'capture' });
      } else {
        steps.forEach((step, idx) => {
          tiles.push({ type: 'step', index: idx, step });
        });
        tiles.push({ type: 'capture' });
        // Add POST button if showPostButton is true
        if (showPostButton) {
          tiles.push({ type: 'post' });
        }
      }
    } else if (mode === 'browseRoute') {
      // Browse route: [steps...] [invisible spacer]
      steps.forEach((step, idx) => {
        tiles.push({ type: 'step', index: idx, step });
      });
      tiles.push({ type: 'invisible' });
    } else if (mode === 'browsePlace') {
      // Browse place: [steps only]
      steps.forEach((step, idx) => {
        tiles.push({ type: 'step', index: idx, step });
      });
    } else if (mode === 'tracking') {
      // Tracking mode: show 3 visible steps with invisible placeholders
      const prevIndex = selectedStepIndex - 1;
      const nextIndex = selectedStepIndex + 1;
      
      if (prevIndex >= 0) {
        tiles.push({ type: 'step', index: prevIndex, step: steps[prevIndex] });
      } else {
        tiles.push({ type: 'invisible' });
      }
      
      tiles.push({ type: 'step', index: selectedStepIndex, step: steps[selectedStepIndex] });
      
      if (nextIndex < steps.length) {
        tiles.push({ type: 'step', index: nextIndex, step: steps[nextIndex] });
      } else {
        tiles.push({ type: 'invisible' });
      }
    } else if (mode === 'profile') {
      // Profile mode: show up to maxVisibleInProfile steps, +N for overflow
      if (steps.length <= maxVisibleInProfile) {
        steps.forEach((step, idx) => {
          tiles.push({ type: 'step', index: idx, step });
        });
      } else {
        for (let i = 0; i < maxVisibleInProfile - 1; i++) {
          tiles.push({ type: 'step', index: i, step: steps[i] });
        }
        tiles.push({ type: 'overflow', count: steps.length - (maxVisibleInProfile - 1) });
      }
    }

    return tiles;
  };

  const tiles = getTiles();

  // Auto-scroll to center selected step with boundary constraints
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    
    // Use requestAnimationFrame to ensure layout is complete before scrolling
    requestAnimationFrame(() => {
      const containerWidth = container.clientWidth;
      const centerPoint = containerWidth / 2;

      // Calculate tile position (each tile is 96px + 8px gap)
      const tileWidth = 96;
      const gap = 8;
      const tileWithGap = tileWidth + gap;
      const leftPadding = 35;

      // Find the index of the selected tile
      let selectedTileIndex = -1;
      
      if (mode === 'capture') {
        // Always center the capture button in capture mode
        selectedTileIndex = steps.length;
      } else if (mode === 'tracking') {
        // In tracking mode, selected is always in the middle
        selectedTileIndex = 1; // Middle tile
      } else {
        selectedTileIndex = selectedStepIndex;
      }

      if (selectedTileIndex === -1) return;
      
      // Position of the selected tile's center
      const tileCenterPosition = (selectedTileIndex * tileWithGap) + (tileWidth / 2) + leftPadding;

      // Calculate scroll position to center the tile
      let targetScroll = tileCenterPosition - centerPoint;

      // Apply boundary constraints
      const maxScroll = container.scrollWidth - containerWidth;
      
      // In capture mode, limit right scroll to capture button position
      if (mode === 'capture') {
        // Calculate the position where capture button is centered
        const captureTileIndex = steps.length;
        const captureCenterPosition = (captureTileIndex * tileWithGap) + (tileWidth / 2) + leftPadding;
        const maxCaptureScroll = captureCenterPosition - centerPoint;
        
        // Don't allow scrolling beyond the capture button centered position
        if (targetScroll > maxCaptureScroll) {
          targetScroll = maxCaptureScroll;
        }
      }
      
      // Clamp scroll position to valid scroll range
      if (targetScroll < 0) {
        targetScroll = 0;
      }
      if (targetScroll > maxScroll) {
        targetScroll = maxScroll;
      }
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    });
  }, [selectedStepIndex, steps.length, mode, tiles.length]);

  // Show connecting bar in: capture, browseRoute, browsePlace, tracking
  const showConnectingBar = mode === 'capture' || mode === 'browseRoute' || mode === 'browsePlace' || mode === 'tracking';

  // Calculate connecting bar width based on number of steps
  const getConnectingBarWidth = () => {
    if (mode === 'tracking') {
      // In tracking mode, show bar between visible steps only
      return (2 * 104) + 48; // 2 gaps + center tile
    } else if (mode === 'capture' && steps.length === 0) {
      return 0; // No bar when no steps
    } else {
      const stepCount = steps.length;
      if (stepCount === 0) return 0;
      return (stepCount - 1) * 104 + 48;
    }
  };

  // Get connecting bar left position
  const getConnectingBarLeft = () => {
    if (mode === 'tracking') {
      return 39; // Fixed position for tracking
    }
    return 39; // Standard left position
  };

  return (
    <div className={`relative w-full h-[136px] overflow-visible ${className}`}>
      
      <div 
        ref={scrollContainerRef}
        className={`relative w-full h-full overflow-x-auto overflow-y-visible pointer-events-auto`}
        style={{ 
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Gray connecting bar */}
        {showConnectingBar && steps.length > 0 && !isRecording && (
          <div 
            className={`absolute top-[18px] h-[60px] rounded-[20642200px] ${
              mode === 'tracking' ? 'bg-[rgba(0,0,0,0.2)]' : 'bg-[#e9e9e9]'
            }`}
            style={{ 
              left: `${getConnectingBarLeft()}px`,
              width: `${getConnectingBarWidth()}px`,
              transition: 'opacity 0.2s ease'
            }}
          />
        )}

        {/* Tiles */}
        <div 
          className="relative h-[95.998px] flex gap-2 z-10"
          style={{ 
            paddingLeft: mode === 'capture' && steps.length === 0 ? 'calc((100vw - 96px) / 2)' : '35px',
            paddingRight: 'calc((100vw - 96px) / 2)'
          }}
        >
          {tiles.map((tile, idx) => {
            if (tile.type === 'step' && tile.step) {
              const isSelected = tile.index === selectedStepIndex;
              const isInvisible = false; // Will be handled by invisible type

              return (
                <div 
                  key={tile.index}
                  className="relative flex-shrink-0 overflow-visible"
                  style={{ opacity: isRecording ? 0.3 : 1, transition: 'opacity 0.2s ease' }}
                >
                  {/* Delete button - appears above selected tile in capture mode */}
                  {isSelected && mode === 'capture' && onDeleteStep && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteStep(tile.index!);
                      }}
                      className="absolute -top-[60px] left-1/2 -translate-x-1/2 z-50 w-[47.994px] h-[47.994px] rounded-[16px] bg-[#ff4444] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] pointer-events-auto"
                    >
                      <Trash2 size={20} strokeWidth={2.5} className="text-white" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => onStepClick?.(tile.index!)}
                    onMouseDown={() => {
                      // Only allow long press if this is NOT an unfilled template item
                      if (tile.step.image || !tile.step.templateIcon) {
                        handleStepPressStart(tile.index!);
                      }
                    }}
                    onMouseUp={handleStepPressEnd}
                    onMouseLeave={handleStepPressEnd}
                    onTouchStart={() => {
                      // Only allow long press if this is NOT an unfilled template item
                      if (tile.step.image || !tile.step.templateIcon) {
                        handleStepPressStart(tile.index!);
                      }
                    }}
                    onTouchEnd={handleStepPressEnd}
                    className="relative pointer-events-auto"
                  >
                  <div 
                    className={`w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] ${
                      isSelected ? 'border-[8px] border-[#1abb6c]' : 'border-[8px] border-white'
                    } flex flex-col items-center justify-center relative`}
                  >
                    {/* Check if this is an unfilled template step (empty image) */}
                    {!tile.step.image && tile.step.templateIcon ? (
                      <>
                        {tile.step.templateIcon}
                        {tile.step.templateLabel && (
                          <p className="absolute font-['Baloo_Tamma',sans-serif] bottom-[12px] text-[14px] text-center opacity-60 text-[#1e1e1e] uppercase">
                            {tile.step.templateLabel}
                          </p>
                        )}
                      </>
                    ) : tile.step.type === 'video' ? (
                      tile.step.thumbnail ? (
                        <img
                          src={tile.step.thumbnail}
                          alt={`Video ${tile.index! + 1}`}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      ) : (
                        <video
                          src={tile.step.image}
                          className="w-full h-full object-cover absolute inset-0"
                          muted
                          playsInline
                          preload="metadata"
                          crossOrigin="anonymous"
                        />
                      )
                    ) : (
                      (tile.step.coverImage || tile.step.image) && (
                        <img
                          src={tile.step.coverImage || tile.step.image}
                          alt={`Step ${tile.index! + 1}`}
                          className={`w-full h-full object-cover absolute inset-0 ${
                            tile.step.source === 'google' && tile.step.hasUserPhoto === false ? 'blur-md' : ''
                          }`}
                        />
                      )
                    )}
                    
                    {/* Camera-off icon for incomplete google steps - centered, white, no background */}
                    {tile.step.source === 'google' && tile.step.hasUserPhoto === false && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <CameraOff className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                    )}
                    
                    {/* Two squares indicator for multiple photos - show in browseRoute and capture modes */}
                    {(mode === 'browseRoute' || mode === 'capture') && tile.step.photos && tile.step.photos.length > 1 && (
                      <div className="absolute bottom-2 left-2 flex gap-1.5 z-10">
                        {isSelected ? (
                          // Selected state: Solid white squares with drop shadows and bounce animation
                          <>
                            <motion.div 
                              initial={{ y: 0 }}
                              animate={{ 
                                y: [-8, 0]
                              }}
                              transition={{ 
                                y: { duration: 0.48, ease: [0.34, 1.56, 0.64, 1] }
                              }}
                              className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" 
                            />
                            <motion.div 
                              initial={{ y: 0 }}
                              animate={{ 
                                y: [-8, 0]
                              }}
                              transition={{ 
                                y: { duration: 0.48, ease: [0.34, 1.56, 0.64, 1], delay: 0.08 }
                              }}
                              className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" 
                            />
                          </>
                        ) : (
                          // Unselected state: Solid white squares with drop shadows
                          <>
                            <div className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" />
                            <div className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </button>
                </div>
              );
            } else if (tile.type === 'invisible') {
              // Invisible placeholder for tracking mode or end spacer
              return (
                <div
                  key={`invisible-${idx}`}
                  className="relative flex-shrink-0"
                >
                  {mode === 'tracking' ? (
                    <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-[#4a4a4a] opacity-30 flex items-center justify-center">
                      <span className="uppercase text-white text-[10px] opacity-70" style={{ fontSize: '10px' }}>
                        INVISIBLE
                      </span>
                    </div>
                  ) : (
                    // End spacer - completely invisible
                    <div className="w-[95.998px] h-[95.998px]" />
                  )}
                </div>
              );
            } else if (tile.type === 'capture') {
              // Capture placeholder - white with e9e9e9 border (green when recording)
              return (
                <Fragment key="capture-group">
                  <button
                    onClick={onCaptureClick}
                    onMouseDown={onCaptureHoldStart}
                    onMouseUp={onCaptureHoldEnd}
                    onMouseLeave={onCaptureHoldEnd}
                    onTouchStart={onCaptureHoldStart}
                    onTouchEnd={onCaptureHoldEnd}
                    className="relative flex-shrink-0"
                  >
                    <div 
                      className={`w-[95.998px] h-[95.998px] rounded-[20px] bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[8px] border-solid flex items-center justify-center ${
                        isRecording ? 'border-[#1abb6c]' : 'border-[#e9e9e9]'
                      }`}
                      style={{ transition: 'border-color 0.2s ease' }}
                    />
                  </button>
                  
                  {/* Continue arrow - shown when adding photos to Google place */}
                  {showContinueArrow && (
                    <button
                      onClick={onContinueClick}
                      className="relative flex-shrink-0 ml-2"
                    >
                      <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-[#1abb6c] flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
                        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </button>
                  )}
                  
                  {/* Invisible spacer to allow capture button to scroll to center */}
                  <div className="flex-shrink-0" style={{ width: 'calc((100vw - 96px) / 2)' }} />
                </Fragment>
              );
            } else if (tile.type === 'post') {
              // Post tile (green with up arrow) - dimmed when recording
              return (
                <button
                  key="post"
                  onClick={onPostClick}
                  className="relative flex-shrink-0"
                  style={{ opacity: isRecording ? 0.3 : 1, transition: 'opacity 0.2s ease' }}
                >
                  <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-[#1abb6c] flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform mr-[48px]">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                  </div>
                </button>
              );
            } else if (tile.type === 'overflow') {
              // Overflow tile (+N)
              return (
                <div
                  key="overflow"
                  className="relative flex-shrink-0"
                >
                  <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-[#f7f7f7] border-[8px] border-[#e9e9e9] flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                    <span className="text-[#717171]" style={{ fontSize: '24px' }}>
                      +{tile.count}
                    </span>
                  </div>
                </div>
              );
            }

            return null;
          })}
          

        </div>
      </div>
    </div>
  );
}