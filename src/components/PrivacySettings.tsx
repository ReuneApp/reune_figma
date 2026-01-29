import { ArrowLeft, Lock, Eye, EyeOff, UserCheck, MapPin } from 'lucide-react';
import { Switch } from './ui/switch';
import { useState } from 'react';

interface PrivacySettingsProps {
  onBack: () => void;
}

export default function PrivacySettings({ onBack }: PrivacySettingsProps) {
  const [privateAccount, setPrivateAccount] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [shareLocation, setShareLocation] = useState(true);
  const [allowTagging, setAllowTagging] = useState(true);

  const privacyItems = [
    { 
      icon: privateAccount ? EyeOff : Eye, 
      label: 'Private Account', 
      description: 'Only approved followers can see your routes',
      value: privateAccount,
      onToggle: setPrivateAccount 
    },
    { 
      icon: MapPin, 
      label: 'Share Location', 
      description: 'Allow others to see locations in your routes',
      value: shareLocation,
      onToggle: setShareLocation 
    },
    { 
      icon: UserCheck, 
      label: 'Allow Tagging', 
      description: 'Let friends tag you in their routes',
      value: allowTagging,
      onToggle: setAllowTagging 
    },
    { 
      icon: Eye, 
      label: 'Show Activity Status', 
      description: 'Let friends see when you\'re active',
      value: showActivity,
      onToggle: setShowActivity 
    },
  ];

  return (
    <div className="h-full w-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/98 backdrop-blur-md pt-14">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-all active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-6 pb-32">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-[22px] font-bold text-[#100f0f] mb-2">Privacy</h2>
          <p className="text-sm text-[#5e5e5e] leading-[1.4]">
            Control who can see your content and activity
          </p>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-8">
          {privacyItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div key={index}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
                  {item.label}
                </h2>
                <div className="rounded-2xl bg-muted p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <Icon size={20} strokeWidth={2} className="text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch
                      checked={item.value}
                      onCheckedChange={item.onToggle}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Blocked Accounts Section */}
        <div className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            Blocked Accounts
          </h2>
          <button
            onClick={() => {}}
            className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <Lock size={20} strokeWidth={2} className="text-muted-foreground" />
              <span className="text-base">Manage Blocked Accounts</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
