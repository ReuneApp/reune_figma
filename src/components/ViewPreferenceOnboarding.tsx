import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import mapScreenshot from 'figma:asset/ba95abc4aad2a7fb1f8b6b9e09bb01a721101d13.png';
import postImage from 'figma:asset/5fa8408a79182ebe76e4358103a28c16d17d1484.png';

interface ViewPreferenceOnboardingProps {
  onComplete: (preference: 'posts' | 'map') => void;
  onBack: () => void;
}

export default function ViewPreferenceOnboarding({ onComplete, onBack }: ViewPreferenceOnboardingProps) {
  const [selectedView, setSelectedView] = useState<'posts' | 'map'>('posts');

  const handleContinue = () => {
    onComplete(selectedView);
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="View Preference Onboarding">
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
          <div className="bg-white h-full overflow-clip relative w-full">
            
            {/* Back Button - Standard Design */}
            <div className="absolute top-[28px] left-[26px] z-30">
              <button 
                onClick={onBack}
                className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
              >
                <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <ArrowLeft className="w-5 h-5 text-black" strokeWidth={3} />
              </button>
            </div>

            {/* Header Text - Lowered */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[150px] w-[340px]">
              <h1 className="font-['Baloo_Tamma',sans-serif] text-[24px] font-bold text-center text-[#1e1e1e] leading-tight">
                HOW DO YOU WANT TO VIEW ROUTES?
              </h1>
            </div>

            {/* View Switcher - Matching Home Page Design */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[230px] z-20">
              <div className="bg-white rounded-[16px] px-[8px] py-[6px] flex items-center gap-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] h-[47.994px]">
                {/* Grid View Button */}
                <button 
                  onClick={() => setSelectedView('posts')}
                  className="flex items-center justify-center active:scale-95 transition-transform"
                >
                  <svg 
                    className="w-[24px] h-[24px]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="black" 
                    strokeWidth={selectedView === 'posts' ? '3' : '2'}
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      opacity: selectedView === 'posts' ? 1 : 0.3,
                      transform: selectedView === 'posts' ? 'scale(1)' : 'scale(0.9)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </button>

                {/* Map View Button */}
                <button 
                  onClick={() => setSelectedView('map')}
                  className="flex items-center justify-center active:scale-95 transition-transform"
                >
                  <svg 
                    className="w-[24px] h-[24px]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="black" 
                    strokeWidth={selectedView === 'map' ? '3' : '2'}
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      opacity: selectedView === 'map' ? 1 : 0.3,
                      transform: selectedView === 'map' ? 'scale(1)' : 'scale(0.9)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                    <line x1="9" y1="3" x2="9" y2="18"/>
                    <line x1="15" y1="6" x2="15" y2="21"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Selection Cards Container */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[320px] flex gap-[20px]">
              
              {/* POST Card with Label */}
              <div className="flex flex-col items-center gap-[12px]">
                <button
                  onClick={() => setSelectedView('posts')}
                  className={`relative w-[160px] h-[303px] rounded-[20px] bg-white transition-all active:scale-95 overflow-hidden shadow-[0px_3px_10px_0px_rgba(0,0,0,0.15)] ${
                    selectedView === 'posts' ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  {/* Border - changes color based on selection */}
                  <div 
                    className={`absolute inset-0 rounded-[20px] border-8 border-solid pointer-events-none z-10 transition-colors ${
                      selectedView === 'posts' ? 'border-[#1abb6c]' : 'border-[#e9e9e9]'
                    }`}
                  />
                  
                  {/* Image */}
                  <img 
                    src={postImage}
                    alt="Post view"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
                
                {/* Label - Outside container */}
                <span className={`font-['Baloo_Tamma',sans-serif] text-[18px] font-bold text-[#1e1e1e] transition-opacity ${
                  selectedView === 'posts' ? 'opacity-100' : 'opacity-50'
                }`}>
                  POST
                </span>
              </div>

              {/* MAP Card with Label */}
              <div className="flex flex-col items-center gap-[12px]">
                <button
                  onClick={() => setSelectedView('map')}
                  className={`relative w-[160px] h-[303px] rounded-[20px] bg-white transition-all active:scale-95 overflow-hidden shadow-[0px_3px_10px_0px_rgba(0,0,0,0.15)] ${
                    selectedView === 'map' ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  {/* Border - changes color based on selection */}
                  <div 
                    className={`absolute inset-0 rounded-[20px] border-8 border-solid pointer-events-none z-10 transition-colors ${
                      selectedView === 'map' ? 'border-[#1abb6c]' : 'border-[#e9e9e9]'
                    }`}
                  />
                  
                  {/* Image */}
                  <img 
                    src={mapScreenshot}
                    alt="Map view"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
                
                {/* Label - Outside container */}
                <span className={`font-['Baloo_Tamma',sans-serif] text-[18px] font-bold text-[#1e1e1e] transition-opacity ${
                  selectedView === 'map' ? 'opacity-100' : 'opacity-50'
                }`}>
                  MAP
                </span>
              </div>
            </div>

            {/* Continue Button */}
            <button 
              onClick={handleContinue}
              className="absolute box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-1/2 -translate-x-1/2 px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[713px] w-[300px] transition-all bg-[#1abb6c] active:scale-95"
              data-name="CONTINUE BUTTON"
            >
              <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-center text-white w-[274px]">
                CONTINUE
              </p>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}