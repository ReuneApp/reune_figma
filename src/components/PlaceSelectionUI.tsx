import { Heart } from 'lucide-react';

interface PlaceSelectionUIProps {
  place: {
    id: string;
    name: string;
    category: string;
    distance: string;
    image: string;
  };
  onTileClick: () => void;
}

export default function PlaceSelectionUI({ place, onTileClick }: PlaceSelectionUIProps) {
  return (
    <>
      {/* Gradient Overlay for contrast - same as route selection */}
      <div 
        className="absolute left-0 w-full h-[359px] z-10"
        style={{
          top: '494px',
          background: 'linear-gradient(180deg, rgba(217,217,217,0) 0%, rgba(0,0,0,0.5) 41.827%, rgba(0,0,0,0.9) 100%)'
        }}
      />

      {/* Place Info - positioned to match step bar layout */}
      <div className="absolute left-[35px] top-[700px] z-20 flex items-center gap-[16px] pointer-events-auto">
        {/* Place thumbnail - matches first step tile positioning in step bar */}
        <button 
          onClick={onTileClick}
          className="relative w-[95.998px] shrink-0 active:scale-95 transition-transform"
        >
          <div className="relative w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden flex items-center justify-center border-[8px] border-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white">
            <img 
              src={place.image} 
              alt={place.name}
              className="w-full h-full object-cover"
            />
            
            {/* Two white rounded squares indicator for multiple photos - bottom left inside border */}
            <div className="absolute bottom-[6px] left-[6px] flex gap-1.5 z-10">
              <div className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" />
              <div className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" />
            </div>
          </div>
        </button>
        
        {/* Place info - to the right of the tile */}
        <div className="flex flex-col gap-[8px] max-w-[210px]">
          {/* Place name - 22pt, all caps, white */}
          <h2 className="font-['Baloo_Tamma',sans-serif] text-[22px] text-white leading-[1.1] uppercase break-words">
            {place.name}
          </h2>
          {/* Category and distance - 14pt, all caps, light grey */}
          <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[rgba(255,255,255,0.7)] leading-[1.2] uppercase">
            {place.category} • {place.distance}
          </p>
        </div>
      </div>
    </>
  );
}