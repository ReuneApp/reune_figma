import { useState, useRef } from 'react';
import { Pencil } from 'lucide-react';
import svgPaths from '../imports/svg-pmwyfzhfqs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import LocationWidget from './LocationWidget';

interface EditProfileProps {
  userData: {
    name: string;
    username: string;
    avatar: string;
    location: string;
    bio?: string;
  };
  onBack: () => void;
  onSave: (data: { name: string; username: string; avatar: string; location: string; bio?: string }) => void;
  onLocationClick?: () => void;
}

function Container() {
  return <div className="absolute bg-white h-[15.995px] left-[28.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[#90c24d] h-[29.529px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[59.09px] w-[88.616px]" data-name="Container" />;
}

function Container2({ avatar, onAvatarChange }: { avatar: string; onAvatarChange: (file: File) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample avatar options for cycling (same as CreateProfile)
  const avatarOptions = [
    'https://images.unsplash.com/photo-1613145997970-db84a7975fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzY0MjYyMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const handleClick = () => {
    // Cycle to next avatar
    const currentIndex = avatarOptions.indexOf(avatar);
    let newIndex;
    if (currentIndex === -1 || currentIndex === avatarOptions.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
    
    // Create a fake file event to pass the new avatar URL
    // Since onAvatarChange expects File, we'll use a workaround
    const newAvatar = avatarOptions[newIndex];
    // Call parent handler directly with the URL instead of File
    (onAvatarChange as any)(newAvatar);
  };

  return (
    <button onClick={handleClick} className="absolute left-[3.69px] size-[88.616px] top-[3.69px] cursor-pointer bg-transparent border-none p-0" data-name="Container" type="button">
      <ImageWithFallback 
        src={avatar}
        alt="Profile"
        className="size-full object-cover rounded-[16.309px]"
      />
    </button>
  );
}

function Button({ avatar, onAvatarChange }: { avatar: string; onAvatarChange: (file: File) => void }) {
  return (
    <div className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
        <Container2 avatar={avatar} onAvatarChange={onAvatarChange} />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container3({ avatar, onAvatarChange }: { avatar: string; onAvatarChange: (file: File) => void }) {
  return (
    <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-[149px] top-[108px] w-[95.998px]" data-name="Container">
      <Button avatar={avatar} onAvatarChange={onAvatarChange} />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[23.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p3152c100} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M18.9939 11.9961H4.99839" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-white box-border content-stretch flex items-center justify-center left-[26px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[28px]"
      data-name="Back"
    >
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon />
    </button>
  );
}

function EditButton({ avatar, onAvatarChange }: { avatar: string; onAvatarChange: (file: File) => void }) {
  // Sample avatar options for random cycling
  const avatarOptions = [
    'https://images.unsplash.com/photo-1613145997970-db84a7975fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzY0MjYyMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const handleClick = () => {
    // Select a random avatar (different from current)
    const currentIndex = avatarOptions.indexOf(avatar);
    let randomIndex;
    
    do {
      randomIndex = Math.floor(Math.random() * avatarOptions.length);
    } while (randomIndex === currentIndex && avatarOptions.length > 1);
    
    const newAvatar = avatarOptions[randomIndex];
    // Call parent handler with the new avatar URL
    (onAvatarChange as any)(newAvatar);
  };

  return (
    <button 
      onClick={handleClick}
      className="absolute bg-white box-border content-stretch flex items-center justify-center left-[174px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[171px] cursor-pointer" 
      data-name="Back"
      type="button"
    >
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Pencil size={20} strokeWidth={2.5} className="text-black" />
    </button>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g>
          <path d={svgPaths.p34385980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function IconLarge() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[62px]" data-name="_icon-large">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[62px]">
        <Check />
      </div>
    </div>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-[#1abb6c] box-border content-stretch flex items-center justify-center left-[321px] pl-0 pr-[0.01px] py-0 rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.994px] top-[28px]"
      data-name="Button"
    >
      <IconLarge />
    </button>
  );
}

function BoldDuotoneTextFormattingTextSquare() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Bold Duotone / Text Formatting / Text Square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p3d0bf80} fill="#100F0F" />
          <path d={svgPaths.p32efad00} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function NameInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[46px] pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[257px] w-[300px]" data-name="Location">
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <BoldDuotoneTextFormattingTextSquare />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[22px] w-[200px] bg-transparent border-none outline-none uppercase"
        placeholder="NAME"
      />
    </div>
  );
}

function BioIcon() {
  return (
    <svg className="w-6 h-6 relative shrink-0" fill="black" viewBox="0 0 24 24">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  );
}

function BioInput({ value, onChange, onHeightChange }: { value: string; onChange: (value: string) => void; onHeightChange?: (height: number) => void }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-resize textarea based on content
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      
      // Notify parent of height change
      if (containerRef.current && onHeightChange) {
        onHeightChange(containerRef.current.offsetHeight);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute bg-white box-border content-stretch flex gap-[18px] items-start left-[46px] pl-[28px] pr-[20px] py-[18px] rounded-[20px] top-[340px] w-[300px] min-h-[48px]" 
      data-name="Bio"
    >
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <div className="pt-[2px] flex-shrink-0">
        <BioIcon />
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#666666] text-[14px] w-[200px] bg-transparent border-none outline-none resize-none min-h-[20px] uppercase pt-[2px] overflow-hidden"
        placeholder="BIO (OPTIONAL)"
        rows={1}
      />
    </div>
  );
}

function HomeFeed({ 
  name,
  bio,
  location,
  avatar,
  onNameChange,
  onBioChange,
  onLocationClick,
  onAvatarChange,
  onBack,
  onSave
}: { 
  name: string;
  bio: string;
  location: string;
  avatar: string;
  onNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onLocationClick?: () => void;
  onAvatarChange: (file: File) => void;
  onBack: () => void;
  onSave: () => void;
}) {
  const [bioHeight, setBioHeight] = useState(48); // Default min height
  
  const handleBioHeightChange = (height: number) => {
    setBioHeight(height);
  };
  
  // Calculate location position: bio top (340) + bio height + gap (57)
  const locationTop = 340 + bioHeight + 57;
  
  return (
    <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-[393.719px]" data-name="HomeFeed">
      <Container3 avatar={avatar} onAvatarChange={onAvatarChange} />
      <Back onClick={onBack} />
      <EditButton avatar={avatar} onAvatarChange={onAvatarChange} />
      <SaveButton onClick={onSave} />
      <NameInput value={name} onChange={onNameChange} />
      <BioInput value={bio} onChange={onBioChange} onHeightChange={handleBioHeightChange} />
      <div 
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: `${locationTop}px` }}
      >
        <LocationWidget location={location} onClick={onLocationClick} />
      </div>
    </div>
  );
}

function Container5({ 
  name,
  bio,
  location,
  avatar,
  onNameChange,
  onBioChange,
  onLocationClick,
  onAvatarChange,
  onBack,
  onSave
}: { 
  name: string;
  bio: string;
  location: string;
  avatar: string;
  onNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onLocationClick?: () => void;
  onAvatarChange: (file: File) => void;
  onBack: () => void;
  onSave: () => void;
}) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <HomeFeed 
          name={name}
          bio={bio}
          location={location}
          avatar={avatar}
          onNameChange={onNameChange}
          onBioChange={onBioChange}
          onLocationClick={onLocationClick}
          onAvatarChange={onAvatarChange}
          onBack={onBack}
          onSave={onSave}
        />
      </div>
    </div>
  );
}

export default function EditProfile({ userData, onBack, onSave, onLocationClick }: EditProfileProps) {
  const [name, setName] = useState(userData.name);
  const [location, setLocation] = useState(userData.location);
  const [avatar, setAvatar] = useState(userData.avatar);
  const [bio, setBio] = useState(userData.bio || '');

  const handleAvatarChange = (fileOrUrl: File | string) => {
    // Handle both File (from file picker) and string (from cycling)
    if (typeof fileOrUrl === 'string') {
      setAvatar(fileOrUrl);
    } else {
      const url = URL.createObjectURL(fileOrUrl);
      setAvatar(url);
    }
  };

  const handleSave = () => {
    onSave({ 
      name, 
      username: userData.username, // Keep username unchanged
      avatar, 
      location,
      bio
    });
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Edit Profile">
      <Container5 
        name={name}
        bio={bio}
        location={location}
        avatar={avatar}
        onNameChange={setName}
        onBioChange={setBio}
        onLocationClick={onLocationClick}
        onAvatarChange={handleAvatarChange as any}
        onBack={onBack}
        onSave={handleSave}
      />
    </div>
  );
}