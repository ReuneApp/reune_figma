import { motion, AnimatePresence } from 'motion/react';
import { X, Heart } from 'lucide-react';
import StepBar from './StepBar';

interface RouteSelectionPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RouteSelectionPreview({ isOpen, onClose }: RouteSelectionPreviewProps) {
  // Mock route data with placeholder images
  const mockRoute = {
    id: '1',
    title: 'SAMPLE ROUTE',
    creator: {
      id: 'user1',
      name: 'DEMO USER',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2MzUxOTgxNnww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'THE MANOR HOUSE',
        caption: 'MORNING COFFEE ☕'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrfGVufDF8fHx8MTc2MzUzNDMyMnww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'CENTRAL PARK',
        caption: 'PARK WALK 🌳'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjM1NDQzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'BELLA VISTA',
        caption: 'DINNER 🍽️'
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01d5bda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'ART GALLERY',
        caption: 'ART GALLERY 🎨'
      },
      {
        id: '5',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        location: 'SKYLINE VIEW',
        caption: 'CITY VIEWS 🌆'
      },
      {
        id: '6',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        location: 'ROOFTOP BAR',
        caption: 'ROOFTOP DRINKS 🍹'
      }
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[9999]"
        >
          {/* Close Button - Top Left */}
          <button
            onClick={onClose}
            className="absolute left-[26px] top-[28px] z-20 w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] active:scale-95 transition-transform"
          >
            <X className="w-5 h-5 text-black" strokeWidth={3} />
          </button>

          {/* Gradient Overlay - Same as route selection */}
          <div 
            className="absolute left-0 w-full h-[359px] pointer-events-none"
            style={{
              top: '494px',
              background: 'linear-gradient(180deg, rgba(217,217,217,0) 0%, rgba(0,0,0,0.5) 41.827%, rgba(0,0,0,0.9) 100%)'
            }}
          />

          {/* Location Text Above Action Buttons */}
          <div className="absolute left-[34px] top-[624px] z-20 flex items-center gap-[8px] pointer-events-none">
            <svg className="w-[24px] h-[24px] flex-shrink-0" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-white uppercase leading-[1] tracking-[0.02em] translate-y-[1px]">
              {mockRoute.steps[0].location}
            </span>
          </div>

          {/* Bottom Fixed Elements: Creator Profile Button + Like Button + Share Button */}
          <div className="absolute left-[34px] top-[656px] z-20 flex items-center gap-[7px] border-none pointer-events-none">
            {/* Creator Profile Picture Button */}
            <div className="w-[47.994px] h-[47.994px] rounded-[16px] overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white flex-shrink-0 border-[3.691px] border-[#e9e9e9]">
              <img
                src={mockRoute.creator.avatar}
                alt="Creator"
                className="w-full h-full object-cover rounded-[12.303px]"
              />
            </div>

            {/* Like Button */}
            <div className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex-shrink-0 border-[3.691px] border-[#e9e9e9]">
              <Heart 
                size={22}
                className="fill-[#e9e9e9] text-[#e9e9e9]"
                strokeWidth={0}
              />
            </div>

            {/* Share Button */}
            <div className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex-shrink-0 border-[3.691px] border-[#e9e9e9]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </div>
          </div>

          {/* Bottom Step Bar */}
          <div className="absolute left-0 top-[716px] w-full z-10 pointer-events-auto">
            <StepBar
              steps={mockRoute.steps}
              selectedStepIndex={0}
              onStepClick={() => {}}
              onNavigateClick={() => {}}
              mode="browseRoute"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}