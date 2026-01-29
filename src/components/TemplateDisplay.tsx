import svgPaths from '../imports/svg-a3hu8y7x01';
import { ImageWithFallback } from './figma/ImageWithFallback';

function MoodHappy() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]" data-name="mood-happy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32" opacity="0.6">
        <g id="Vector"></g>
      </svg>
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25" opacity="0.6">
            <path d={svgPaths.p253f1f80} fill="#100F0F" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PersonWalking() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]" data-name="person-walking">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30" opacity="0.6">
        <g clipPath="url(#clip0_template_walk)" id="person-walking">
          <g id="Vector">
            <path d={svgPaths.p3f1d7180} fill="#100F0F" />
            <path d={svgPaths.p269e5d00} fill="#100F0F" />
            <path d={svgPaths.p1a488b80} fill="#100F0F" />
            <path d={svgPaths.p2236380} fill="#100F0F" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_template_walk">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function GlassFull() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[32px] top-1/2 -translate-y-1/2 -mt-[14px]" data-name="glass-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32" opacity="0.6">
        <g id="glass-full">
          <g id="Vector"></g>
          <path d={svgPaths.p1b39600} fill="#100F0F" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function UtensilsCrossed() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[27px] top-1/2 -translate-y-1/2 -mt-[14px]" data-name="utensils-crossed">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27" opacity="0.6">
        <g clipPath="url(#clip0_template_food)" id="utensils-crossed">
          <path d={svgPaths.p96dfc80} id="Vector" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_template_food">
            <rect fill="white" height="27" width="27" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StyleOutlined() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[35px] top-1/2 -translate-y-1/2 -mt-[14px]" data-name="Style=Outlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35" opacity="0.6">
        <g id="Style=Outlined">
          <path d={svgPaths.p2a9dd3f0} fill="#100F0F" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

interface TemplateDisplayProps {
  items: string[];
  onItemClick?: (index: number) => void;
  selectedIndex?: number | null;
  filledItems?: Array<{ image: string; name: string } | null>;
}

const iconMap: Record<string, () => JSX.Element> = {
  'CAFE': StyleOutlined,
  'ACTIVITY': MoodHappy,
  'FOOD': UtensilsCrossed,
  'WALK': PersonWalking,
  'DRINKS': GlassFull,
};

export default function TemplateDisplay({ items, onItemClick, selectedIndex = null, filledItems = [null, null, null] }: TemplateDisplayProps) {
  return (
    <div className="absolute h-[96px] left-0 top-0 w-[304px]">
      {/* Connecting bar */}
      <div className="absolute bg-[#e9e9e9] h-[60px] left-0 rounded-[2.06422e+07px] top-[18px] w-[300px]" />
      
      {/* Template tiles */}
      {items.map((item, index) => {
        const IconComponent = iconMap[item];
        const filledItem = filledItems[index];
        const isSelected = selectedIndex === index;
        const isFilled = filledItem !== null;
        const borderColor = isSelected ? '#1abb6c' : '#e9e9e9';
        
        return (
          <button
            key={index}
            onClick={() => onItemClick?.(index)}
            className="absolute bg-white border-8 border-solid overflow-clip rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[95.998px] top-0 active:scale-95 transition-all cursor-pointer"
            style={{ 
              left: `${index * 104}px`,
              borderColor: borderColor
            }}
          >
            {isFilled ? (
              // Show the filled item image
              <ImageWithFallback 
                src={filledItem.image}
                alt={filledItem.name}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[79.998px] h-[79.998px] object-cover rounded-[12px]"
              />
            ) : (
              // Show the template icon and text
              <>
                {IconComponent && <IconComponent />}
                <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] bottom-[12px] left-0 right-0 leading-[normal] not-italic opacity-60 text-[#1e1e1e] text-[14px] text-center uppercase">{item}</p>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}