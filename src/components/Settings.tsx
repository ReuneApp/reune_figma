import { useState } from 'react';
import svgPaths from '../imports/svg-8s9pq81eej';
import { RefreshCw, User, Power } from 'lucide-react';
import { motion } from 'framer-motion';

interface SettingsProps {
  onBack: () => void;
  onNavigateToAccountInfo: () => void;
  onLogout: () => void;
  defaultView: 'posts' | 'map';
  onToggleDefaultView: (view: 'posts' | 'map') => void;
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

function DefaultButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[47px] px-[20px] py-[10px] rounded-[20px] top-[597.02px] w-[300px]" 
      data-name="DEFAULT (BUTTON)"
    >
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <p className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[#ff232f] text-[22px] text-center w-[242px]">LOG OUT</p>
    </button>
  );
}

function DefaultButton1({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="absolute bg-white box-border content-stretch flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[0.02px] w-[300px]" 
      data-name="DEFAULT (BUTTON)"
    >
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <div className="flex items-center gap-[12px]">
        <User className="w-[24px] h-[24px] text-[#1e1e1e] shrink-0" />
        <p className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#1e1e1e] text-[22px]">ACCOUNT</p>
      </div>
    </button>
  );
}

function SwitchButtonOn({ onClick }: { onClick: () => void }) {
  return (
    <motion.button 
      onClick={onClick}
      initial={{ scale: 1 }}
      animate={{ 
        scale: 1,
        backgroundColor: '#ffffff'
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      className="absolute box-border content-stretch flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[170.02px] w-[300px]" 
      data-name="SWITCH BUTTON (ON)"
    >
      <motion.div 
        aria-hidden="true" 
        className="absolute border-4 border-solid inset-0 pointer-events-none rounded-[20px]"
        initial={{ borderColor: '#1abb6c' }}
        animate={{ 
          borderColor: '#1abb6c',
          boxShadow: '0px 3px 15px 0px rgba(26, 187, 108, 0.4)'
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
      <div className="flex items-center gap-[12px]">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 0 }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <Power className="w-[24px] h-[24px] text-[#1abb6c] shrink-0" />
        </motion.div>
        <motion.p 
          className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#1abb6c] text-[22px]"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          NOTIFICATIONS
        </motion.p>
      </div>
    </motion.button>
  );
}

function SwitchButtonOff({ onClick }: { onClick: () => void }) {
  return (
    <motion.button 
      onClick={onClick}
      initial={{ scale: 1 }}
      animate={{ 
        scale: 1,
        backgroundColor: '#ffffff'
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      className="absolute box-border content-stretch flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[170.02px] w-[300px]" 
      data-name="SWITCH BUTTON (OFF)"
    >
      <motion.div 
        aria-hidden="true" 
        className="absolute border-4 border-solid inset-0 pointer-events-none rounded-[20px]"
        initial={{ borderColor: '#e9e9e9' }}
        animate={{ 
          borderColor: '#e9e9e9',
          boxShadow: '0px 3px 15px 0px rgba(0, 0, 0, 0.15)'
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
      <div className="flex items-center gap-[12px]">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: -15 }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <Power className="w-[24px] h-[24px] text-[#e9e9e9] shrink-0" />
        </motion.div>
        <motion.p 
          className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#e9e9e9] text-[22px]"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          NOTIFICATIONS
        </motion.p>
      </div>
    </motion.button>
  );
}

function LocationSwitchButtonOn({ onClick }: { onClick: () => void }) {
  return (
    <motion.button 
      onClick={onClick}
      initial={{ scale: 1 }}
      animate={{ 
        scale: 1,
        backgroundColor: '#ffffff'
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      className="absolute box-border content-stretch flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[255.02px] w-[300px]" 
      data-name="LOCATION SWITCH BUTTON (ON)"
    >
      <motion.div 
        aria-hidden="true" 
        className="absolute border-4 border-solid inset-0 pointer-events-none rounded-[20px]"
        initial={{ borderColor: '#1abb6c' }}
        animate={{ 
          borderColor: '#1abb6c',
          boxShadow: '0px 3px 15px 0px rgba(26, 187, 108, 0.4)'
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
      <div className="flex items-center gap-[12px]">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 0 }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <Power className="w-[24px] h-[24px] text-[#1abb6c] shrink-0" />
        </motion.div>
        <motion.p 
          className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#1abb6c] text-[22px]"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          LOCATION
        </motion.p>
      </div>
    </motion.button>
  );
}

function LocationSwitchButtonOff({ onClick }: { onClick: () => void }) {
  return (
    <motion.button 
      onClick={onClick}
      initial={{ scale: 1 }}
      animate={{ 
        scale: 1,
        backgroundColor: '#ffffff'
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      className="absolute box-border content-stretch flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[255.02px] w-[300px]" 
      data-name="LOCATION SWITCH BUTTON (OFF)"
    >
      <motion.div 
        aria-hidden="true" 
        className="absolute border-4 border-solid inset-0 pointer-events-none rounded-[20px]"
        initial={{ borderColor: '#e9e9e9' }}
        animate={{ 
          borderColor: '#e9e9e9',
          boxShadow: '0px 3px 15px 0px rgba(0, 0, 0, 0.15)'
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
      <div className="flex items-center gap-[12px]">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: -15 }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <Power className="w-[24px] h-[24px] text-[#e9e9e9] shrink-0" />
        </motion.div>
        <motion.p 
          className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#e9e9e9] text-[22px]"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          LOCATION
        </motion.p>
      </div>
    </motion.button>
  );
}

function DefaultViewButton({ onSelectView, currentView }: { onSelectView: (view: 'posts' | 'map') => void; currentView: 'posts' | 'map' }) {
  const handleToggle = () => {
    const newView = currentView === 'posts' ? 'map' : 'posts';
    onSelectView(newView);
  };

  return (
    <button 
      onClick={handleToggle}
      className="absolute bg-white box-border flex h-[70px] items-center justify-start left-[47px] px-[20px] py-[10px] rounded-[20px] top-[85.02px] w-[300px]" 
      data-name="DEFAULT VIEW BUTTON"
    >
      <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
      <div className="flex items-center gap-[12px]">
        <RefreshCw className="w-[24px] h-[24px] text-[#1e1e1e] shrink-0" />
        <p className="font-['Baloo_Tamma',sans-serif] leading-[22px] not-italic text-[#1e1e1e] text-[22px]">
          {currentView === 'posts' ? 'VIEW ON MAP' : 'VIEW AS POSTS'}
        </p>
      </div>
    </button>
  );
}

function Container({ 
  onNavigateToAccountInfo, 
  notificationsEnabled,
  onToggleNotifications,
  locationEnabled,
  onToggleLocation,
  onLogout,
  defaultView,
  onToggleDefaultView
}: { 
  onNavigateToAccountInfo: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  locationEnabled: boolean;
  onToggleLocation: () => void;
  onLogout: () => void;
  defaultView: 'posts' | 'map';
  onToggleDefaultView: (view: 'posts' | 'map') => void;
}) {
  return (
    <div className="absolute h-[755.891px] left-0 top-[111.98px] w-[393.719px]" data-name="Container">
      <DefaultButton onClick={onLogout} />
      <DefaultButton1 onClick={onNavigateToAccountInfo} />
      <DefaultViewButton 
        onSelectView={onToggleDefaultView} 
        currentView={defaultView}
      />
      {notificationsEnabled ? (
        <SwitchButtonOn onClick={onToggleNotifications} />
      ) : (
        <SwitchButtonOff onClick={onToggleNotifications} />
      )}
      {locationEnabled ? (
        <LocationSwitchButtonOn onClick={onToggleLocation} />
      ) : (
        <LocationSwitchButtonOff onClick={onToggleLocation} />
      )}
    </div>
  );
}

function HomeFeed({ 
  onBack, 
  onNavigateToAccountInfo,
  notificationsEnabled,
  onToggleNotifications,
  locationEnabled,
  onToggleLocation,
  onLogout,
  defaultView,
  onToggleDefaultView
}: { 
  onBack: () => void;
  onNavigateToAccountInfo: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  locationEnabled: boolean;
  onToggleLocation: () => void;
  onLogout: () => void;
  defaultView: 'posts' | 'map';
  onToggleDefaultView: (view: 'posts' | 'map') => void;
}) {
  return (
    <div className="bg-white h-[852.649px] overflow-clip relative shrink-0 w-[393.719px]" data-name="HomeFeed">
      <Back onClick={onBack} />
      <Container 
        onNavigateToAccountInfo={onNavigateToAccountInfo}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={onToggleNotifications}
        locationEnabled={locationEnabled}
        onToggleLocation={onToggleLocation}
        onLogout={onLogout}
        defaultView={defaultView}
        onToggleDefaultView={onToggleDefaultView}
      />
    </div>
  );
}

function Container1({ 
  onBack, 
  onNavigateToAccountInfo,
  notificationsEnabled,
  onToggleNotifications,
  locationEnabled,
  onToggleLocation,
  onLogout,
  defaultView,
  onToggleDefaultView
}: { 
  onBack: () => void;
  onNavigateToAccountInfo: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  locationEnabled: boolean;
  onToggleLocation: () => void;
  onLogout: () => void;
  defaultView: 'posts' | 'map';
  onToggleDefaultView: (view: 'posts' | 'map') => void;
}) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <HomeFeed 
          onBack={onBack}
          onNavigateToAccountInfo={onNavigateToAccountInfo}
          notificationsEnabled={notificationsEnabled}
          onToggleNotifications={onToggleNotifications}
          locationEnabled={locationEnabled}
          onToggleLocation={onToggleLocation}
          onLogout={onLogout}
          defaultView={defaultView}
          onToggleDefaultView={onToggleDefaultView}
        />
      </div>
    </div>
  );
}

export default function Settings({ 
  onBack, 
  onNavigateToAccountInfo,
  onLogout,
  defaultView,
  onToggleDefaultView
}: SettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleToggleLocation = () => {
    setLocationEnabled(!locationEnabled);
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Settings">
      <Container1 
        onBack={onBack}
        onNavigateToAccountInfo={onNavigateToAccountInfo}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={handleToggleNotifications}
        locationEnabled={locationEnabled}
        onToggleLocation={handleToggleLocation}
        onLogout={onLogout}
        defaultView={defaultView}
        onToggleDefaultView={onToggleDefaultView}
      />
    </div>
  );
}