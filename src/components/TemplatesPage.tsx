import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import svgPaths from '../imports/svg-a3hu8y7x01';
import svgPathsBack from '../imports/svg-8s9pq81eej';
import { motion, AnimatePresence } from 'framer-motion';

interface TemplatesPageProps {
  onBack: () => void;
  onSelectTemplate: (template: { name: string; items: string[] }) => void;
}

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
        <g clipPath="url(#clip0_436_566)" id="person-walking">
          <g id="Vector">
            <path d={svgPaths.p3f1d7180} fill="#100F0F" />
            <path d={svgPaths.p269e5d00} fill="#100F0F" />
            <path d={svgPaths.p1a488b80} fill="#100F0F" />
            <path d={svgPaths.p2236380} fill="#100F0F" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_436_566">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function GlassFull() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]" data-name="glass-full">
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
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]" data-name="utensils-crossed">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27" opacity="0.6">
        <g clipPath="url(#clip0_436_559)" id="utensils-crossed">
          <path d={svgPaths.p96dfc80} id="Vector" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_436_559">
            <rect fill="white" height="27" width="27" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StyleOutlined() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]" data-name="Style=Outlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35" opacity="0.6">
        <g id="Style=Outlined">
          <path d={svgPaths.p2a9dd3f0} fill="#100F0F" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BackIcon() {
  return (
    <div className="relative shrink-0 size-[23.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPathsBack.p3152c100} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M18.9939 11.9961H4.99839" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

interface TemplateDisplayProps {
  items: Array<{ icon: React.ReactNode; label: string }>;
  highlightedIndex: number;
  onItemClick: (index: number) => void;
}

function TemplateDisplay({ items, highlightedIndex, onItemClick }: TemplateDisplayProps) {
  return (
    <div className="relative h-[96px] w-[304px]">
      {/* Connecting bar */}
      <div className="absolute bg-[#e9e9e9] h-[60px] left-[48px] rounded-[2.06422e+07px] top-[18px] w-[208px]" />
      
      {/* Items */}
      {items.map((item, index) => {
        const isHighlighted = index === highlightedIndex;
        
        return (
          <button
            key={index}
            onClick={() => onItemClick(index)}
            className={`absolute border-8 border-solid overflow-clip rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[95.998px] top-0 transition-all duration-300 active:scale-95 ${
              isHighlighted
                ? 'bg-white border-[#1ABB6C]'
                : 'bg-white border-[#e9e9e9]'
            }`}
            style={{ left: `${index * 104}px` }}
          >
            {item.icon}
            <p className="absolute font-['Baloo_Tamma:Regular',sans-serif] bottom-[12px] left-0 right-0 leading-[normal] not-italic text-[14px] text-center opacity-60 text-[#1e1e1e]">
              {item.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

interface Template {
  name: string;
  items: string[];
  icons: Array<{ icon: React.ReactNode; label: string }>;
  images: { [key: string]: string };
}

export default function TemplatesPage({ onBack, onSelectTemplate }: TemplatesPageProps) {
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sample images for each category
  const categoryImages = {
    CAFE: 'https://images.unsplash.com/photo-1648808694138-6706c5efc80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1NzQzMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ACTIVITY: 'https://images.unsplash.com/photo-1661442976599-1de9afc3070a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBhY3Rpdml0aWVzJTIwZnVufGVufDF8fHx8MTc2NTc4MDcyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    FOOD: 'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzY1Njk1ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    WALK: 'https://images.unsplash.com/photo-1630435492646-3864eb4fe197?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwd2Fsa2luZyUyMHN0cmVldHxlbnwxfHx8fDE3NjU3ODA3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    DRINKS: 'https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbHMlMjBkcmlua3MlMjBiYXJ8ZW58MXx8fHwxNzY1NzgwNzI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  // Define 3 templates
  const templates: Template[] = [
    {
      name: 'CAFE > ACTIVITY > FOOD',
      items: ['CAFE', 'ACTIVITY', 'FOOD'],
      icons: [
        { icon: <StyleOutlined />, label: 'CAFE' },
        { icon: <MoodHappy />, label: 'ACTIVITY' },
        { icon: <UtensilsCrossed />, label: 'FOOD' }
      ],
      images: {
        CAFE: categoryImages.CAFE,
        ACTIVITY: categoryImages.ACTIVITY,
        FOOD: categoryImages.FOOD
      }
    },
    {
      name: 'WALK > FOOD > ACTIVITY',
      items: ['WALK', 'FOOD', 'ACTIVITY'],
      icons: [
        { icon: <PersonWalking />, label: 'WALK' },
        { icon: <UtensilsCrossed />, label: 'FOOD' },
        { icon: <MoodHappy />, label: 'ACTIVITY' }
      ],
      images: {
        WALK: categoryImages.WALK,
        FOOD: categoryImages.FOOD,
        ACTIVITY: categoryImages.ACTIVITY
      }
    },
    {
      name: 'ACTIVITY > WALK > DRINKS',
      items: ['ACTIVITY', 'WALK', 'DRINKS'],
      icons: [
        { icon: <MoodHappy />, label: 'ACTIVITY' },
        { icon: <PersonWalking />, label: 'WALK' },
        { icon: <GlassFull />, label: 'DRINKS' }
      ],
      images: {
        ACTIVITY: categoryImages.ACTIVITY,
        WALK: categoryImages.WALK,
        DRINKS: categoryImages.DRINKS
      }
    }
  ];

  const currentTemplate = templates[currentTemplateIndex];
  const currentStepLabel = currentTemplate.items[selectedStepIndex];
  const currentImage = currentTemplate.images[currentStepLabel];

  // Auto-advance timer - cycle through templates every 6 seconds
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
        setSelectedStepIndex(0);
      }, 6000);
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentTemplateIndex]);

  // Touch handlers for swipe between templates
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    
    // Clear timer when user interacts
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swiping left - next template
      setDirection(1);
      setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
      setSelectedStepIndex(0);
    } else if (isRightSwipe) {
      // Swiping right - previous template
      setDirection(-1);
      setCurrentTemplateIndex((prev) => (prev - 1 + templates.length) % templates.length);
      setSelectedStepIndex(0);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleStepClick = (index: number) => {
    setSelectedStepIndex(index);
  };

  const handleSelectTemplate = () => {
    onSelectTemplate({ name: currentTemplate.name, items: currentTemplate.items });
    onBack();
  };

  const goToPrevTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev - 1 + templates.length) % templates.length);
    setSelectedStepIndex(0);
  };

  const goToNextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
    setSelectedStepIndex(0);
  };

  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      {/* Back Button - Top Left */}
      <div className="absolute top-[28px] left-[26px] z-30">
        <button 
          onClick={onBack}
          className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
        >
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <BackIcon />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[140px] px-[27px] flex items-center justify-center overflow-hidden">
        <div 
          className="relative w-[340px] h-[500px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentTemplateIndex}
              custom={direction}
              initial={{ x: direction > 0 ? 400 : -400, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -400 : 400, opacity: 1 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              {/* Unified Template Card with Image and Step Bar Overlay */}
              <div className="bg-white rounded-[30px] overflow-hidden shadow-[0px_4px_15px_0px_rgba(0,0,0,0.25)] relative w-full h-full">
                <div aria-hidden="true" className="absolute border-8 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[30px] z-10" />
                
                {/* Full Image Section */}
                <div className="relative w-full h-full">
                  <ImageWithFallback 
                    src={currentImage}
                    alt={currentStepLabel}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step Bar Section - Overlapping on image at bottom */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[20px] z-20 pointer-events-auto">
                  <TemplateDisplay 
                    items={currentTemplate.icons}
                    highlightedIndex={selectedStepIndex}
                    onItemClick={handleStepClick}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Fixed Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white px-[27px] pb-[30px] pt-[20px] z-30">
        {/* Carousel Indicators */}
        <div className="flex justify-center gap-[8px] mb-[20px]">
          {templates.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTemplateIndex(index);
                setSelectedStepIndex(0);
              }}
              className={`h-[8px] rounded-full transition-all duration-300 ${
                index === currentTemplateIndex 
                  ? 'w-[32px] bg-[#1ABB6C]' 
                  : 'w-[8px] bg-[#e9e9e9]'
              }`}
            />
          ))}
        </div>

        {/* Select Button */}
        <button
          onClick={handleSelectTemplate}
          className="w-full h-[70px] bg-[#1abb6c] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] flex items-center justify-center active:scale-[0.98] transition-all"
        >
          <p className="font-['Baloo_Tamma:Regular',sans-serif] leading-[normal] not-italic text-[22px] text-white uppercase">
            SELECT TEMPLATE
          </p>
        </button>
      </div>
    </div>
  );
}