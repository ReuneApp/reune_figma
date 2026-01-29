import { useState } from 'react';
import { Pencil } from 'lucide-react';
import svgPaths from "../imports/svg-tvcsb2v2n6";
import LocationWidget from './LocationWidget';

interface CreateProfileProps {
  onComplete: (userData: {
    name: string;
    username: string;
    avatar: string;
    location: string;
  }) => void;
  prefilledName?: string;
}

export default function CreateProfile({ onComplete, prefilledName }: CreateProfileProps) {
  const [name, setName] = useState(prefilledName || '');
  
  // Demo locations for random prefill (no placeholder)
  const demoLocations = [
    'CHELSEA', 'SOHO', 'SHOREDITCH', 'NOTTING HILL', 'CAMDEN', 
    'ISLINGTON', 'BRIXTON', 'KENSINGTON', 'MARYLEBONE', 'HACKNEY'
  ];
  
  // Initialize location with random demo value on mount (function initializer runs once)
  const [location, setLocation] = useState(() => {
    return demoLocations[Math.floor(Math.random() * demoLocations.length)];
  });
  
  // Sample profile pictures for randomization
  const avatarOptions = [
    'https://images.unsplash.com/photo-1613145997970-db84a7975fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzY0MjYyMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];
  
  const [avatar, setAvatar] = useState(avatarOptions[0]);

  const handleContinue = () => {
    if (name.trim()) {
      onComplete({
        name: name.trim(),
        username: name.trim().toLowerCase().replace(/\s+/g, '_'),
        avatar,
        location
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toUpperCase());
  };

  const handleLocationClick = () => {
    // Randomize location
    const currentIndex = demoLocations.indexOf(location);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * demoLocations.length);
    } while (newIndex === currentIndex && demoLocations.length > 1);
    setLocation(demoLocations[newIndex]);
  };

  const handleAvatarClick = () => {
    // Randomize avatar
    const currentIndex = avatarOptions.indexOf(avatar);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * avatarOptions.length);
    } while (newIndex === currentIndex && avatarOptions.length > 1);
    setAvatar(avatarOptions[newIndex]);
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Create Profile">
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
          <div className="bg-white h-full overflow-clip relative w-full" data-name="HomeFeed">
            
            {/* Profile Picture - Centered */}
            <div className="absolute h-[98.468px] left-[149px] top-[108px] w-[95.998px]" data-name="Container">
              <div className="bg-white h-[95.998px] relative rounded-[24px] w-full">
                <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
                  <img 
                    src={avatar}
                    alt="Profile"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
              </div>
            </div>

            {/* Edit Button */}
            <button 
              className="absolute bg-white box-border content-stretch flex items-center justify-center left-[174px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[171px] active:scale-95 transition-transform"
              data-name="Back"
              onClick={handleAvatarClick}
            >
              <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
              <Pencil size={20} strokeWidth={2.5} className="text-black" />
            </button>

            {/* Name Field - Editable */}
            <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[46px] pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[257px] w-[300px]" data-name="Location">
              <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
              <div className="relative shrink-0 size-[24px]" data-name="Bold Duotone / Text Formatting / Text Square">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g id="Bold Duotone / Text Formatting / Text Square">
                    <path d={svgPaths.p3d0bf80} fill="#100F0F" id="Subtract" />
                    <path d={svgPaths.p32efad00} fill="white" id="Subtract_2" />
                  </g>
                </svg>
              </div>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="YOUR NAME"
                className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-[#1e1e1e] placeholder:text-[rgba(30,30,30,0.4)] flex-1 bg-transparent outline-none uppercase"
                autoFocus
              />
            </div>

            {/* Location Field */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[355px]">
              <LocationWidget 
                location={location}
                onClick={handleLocationClick}
              />
            </div>

            {/* Continue Button */}
            <button 
              onClick={handleContinue}
              disabled={!name.trim()}
              className={`absolute box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-1/2 -translate-x-1/2 px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[713px] w-[300px] transition-all ${
                name.trim() 
                  ? 'bg-[#1abb6c] active:scale-95' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              data-name="YES (BUTTON)"
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