import { useState } from 'react';
import svgPaths from '../imports/svg-rauyrl11oe';

interface LocationWidgetProps {
  location: string;
  onClick?: () => void;
  className?: string;
  minimizable?: boolean; // New prop to enable minimizable behavior
}

export default function LocationWidget({ location, onClick, className = '', minimizable = false }: LocationWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const Component = onClick || minimizable ? 'button' : 'div';
  
  const handleClick = () => {
    if (minimizable) {
      setIsExpanded(!isExpanded);
    } else if (onClick) {
      onClick();
    }
  };
  
  return (
    <Component 
      onClick={handleClick}
      className={`bg-white box-border content-stretch flex h-[48px] items-center justify-center ${isExpanded || !minimizable ? 'pl-[12px] pr-[20px]' : 'px-[12px]'} py-[10px] rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] relative gap-[8px] ${onClick || minimizable ? 'active:scale-95 transition-all duration-200' : ''} ${className}`}
    >
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      {/* Filled location pin icon - matching Create page button */}
      <svg className="w-6 h-6 relative shrink-0" fill="black" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      {(isExpanded || !minimizable) && (
        <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-nowrap whitespace-pre uppercase">
          {location}
        </p>
      )}
    </Component>
  );
}