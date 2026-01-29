import { useState } from 'react';
import svgPaths from '../imports/svg-4y5y8njmj6';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RouteTrackingPageProps {
  route: {
    id: string;
    title: string;
    steps: Array<{
      image: string;
      caption: string;
      location: string;
      coordinates?: { lat: number; lng: number };
    }>;
    currentStepIndex: number;
    timeOfDay?: 'morning' | 'afternoon' | 'evening';
    groupSize?: number;
  };
  onStopTracking: () => void;
  onNavigateToStep: (stepIndex: number) => void;
}

// Top-left close button matching Create page
function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute left-[26px] top-[28px] z-20">
      <button 
        onClick={onClick}
        className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform border-[3.691px] border-[#e9e9e9]"
      >
        <svg className="w-[34px] h-[34px]" fill="none" viewBox="0 0 34 34">
          <path d={svgPaths.pc263700} fill="black" />
        </svg>
      </button>
    </div>
  );
}

// Map marker with image
function PlaceMarker({ image, isSelected = false }: { image: string; isSelected?: boolean }) {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-[48px]" data-name="Button">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <ImageWithFallback
          src={image}
          alt="Location"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div aria-hidden="true" className={`absolute ${isSelected ? 'border-[#1abb6c]' : 'border-[#e9e9e9]'} border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]`} />
    </div>
  );
}

// Step bar at bottom
function StepThumbnail({ image, isSelected = false, showSmallMarker = false }: { image: string; isSelected?: boolean; showSmallMarker?: boolean }) {
  return (
    <div className={`relative bg-white rounded-[20px] size-[95.998px]`} data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3.691px] relative rounded-[inherit] size-[95.998px]">
        <div className="h-[88.616px] relative shrink-0 w-full" data-name="ImageWithFallback">
          <ImageWithFallback
            src={image}
            alt="Step"
            className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full"
          />
          {showSmallMarker && (
            // Small marker removed
            <></>
          )}
        </div>
      </div>
      <div aria-hidden="true" className={`absolute ${isSelected ? 'border-[#1abb6c]' : 'border-[#e9e9e9]'} border-8 border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]`} />
    </div>
  );
}

function TrackingStepBar({ steps, currentStepIndex }: { steps: Array<{ image: string }>; currentStepIndex: number }) {
  return (
    <div className="absolute h-[130px] left-[27px] top-[694px] w-[340px] z-10" data-name="TRACKING STEP BAR">
      <div className="absolute h-[130px] left-0 top-0 w-[340px]">
        <div className="absolute bg-white border-8 border-[#e9e9e9] border-solid inset-0 rounded-[30px]" />
        <div className="absolute inset-[13.08%_5.29%]">
          {/* Connecting bar */}
          <div className="absolute bg-[gainsboro] h-[60px] left-0 rounded-[2.06422e+07px] top-[18px] w-[300px]" />
          {/* Step thumbnails */}
          <div className="absolute h-[96px] left-0 top-0 w-[304px]">
            {steps.map((step, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${index * 104}px`,
                  top: 0
                }}
              >
                <StepThumbnail 
                  image={step.image} 
                  isSelected={index === currentStepIndex}
                  showSmallMarker={index === steps.length - 1 && steps.length === 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RouteTrackingPage({ route, onStopTracking, onNavigateToStep }: RouteTrackingPageProps) {
  // Map step indices to marker positions that match polyline paths
  // Based on the polyline design, we have:
  // - Starting point: bottom left (106, 400)
  // - Point 2: top right (253, 140) - connected by first polyline
  // - Point 3: middle right (253, 239) - connected by vertical line
  // - Point 4: bottom middle (197, 494) - connected by curved line back down
  
  const markerPositions = [
    { x: 106, y: 400 },   // Step 1: Bottom left (start)
    { x: 253, y: 140 },   // Step 2: Top right
    { x: 253, y: 239 },   // Step 3: Middle right (this becomes currentStepIndex if route is being tracked)
  ];

  // Use up to 3 steps to match the design
  const displaySteps = route.steps.slice(0, 3);

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Map (Track)">
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.719px]">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[393.719px]">
          <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-full" data-name="Search">
            {/* Map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50" />

            {/* Markers */}
            <div className="absolute h-[852.649px] left-0 top-0 w-[393.719px]" data-name="Markers">
              {/* Green path lines - positioned to connect the markers */}
              {displaySteps.length >= 2 && (
                <>
                  {/* Path from step 1 to step 2 (bottom left to top right) */}
                  <div className="absolute h-[135px] left-[156px] top-[287px] w-[120.657px]">
                    <div className="absolute inset-[-0.02%_-1.24%_-1.11%_-0.03%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 123 137">
                        <path d={svgPaths.p3d72bc00} id="Vector 1124" stroke="#1ABB6C" strokeWidth="3" />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              {displaySteps.length >= 3 && (
                <>
                  {/* Path from step 2 to step 3 (vertical line down) */}
                  <div className="absolute h-[56px] left-[277px] top-[187px] w-px">
                    <div className="absolute inset-[-0.27%_-150%_-0.18%_-149.67%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 57">
                        <path d={svgPaths.p1304b900} id="Vector 1125" stroke="#1ABB6C" strokeWidth="3" />
                      </svg>
                    </div>
                  </div>

                  {/* Path from step 3 curving back (optional continuation) */}
                  <div className="absolute flex h-[70px] items-center justify-center left-[130px] top-[448px] w-[67px]">
                    <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                      <div className="h-[70px] relative w-[67px]">
                        <div className="absolute inset-[-1.29%_-1.78%_-1.69%_-1.37%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 73">
                            <path d={svgPaths.p4808a60} id="Vector 1125" stroke="#1ABB6C" strokeWidth="3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Place markers at positions matching the polylines */}
              {markerPositions.slice(0, displaySteps.length).map((pos, index) => (
                <div
                  key={index}
                  className="absolute content-stretch flex flex-col items-start w-[48px]"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`
                  }}
                >
                  <PlaceMarker 
                    image={displaySteps[index].image} 
                    isSelected={index === route.currentStepIndex} 
                  />
                </div>
              ))}
            </div>

            {/* Top-left close button */}
            <CloseButton onClick={onStopTracking} />

            {/* Step bar at bottom */}
            <TrackingStepBar steps={displaySteps} currentStepIndex={route.currentStepIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}