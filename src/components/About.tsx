import { ArrowLeft, Info, Instagram, Twitter, Mail, Globe } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
  const handleSocialLink = (platform: string) => {
    // In a real app, this would open the social media link
    console.log(`Open ${platform}`);
  };

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
          <h2 className="text-[22px] font-bold text-[#100f0f] mb-2">About</h2>
          <p className="text-sm text-[#5e5e5e] leading-[1.4]">
            Learn more about Reune and stay connected
          </p>
        </div>

        {/* App Version Section */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            App Version
          </h2>
          <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-muted">
            <Info size={20} strokeWidth={2} className="text-muted-foreground flex-shrink-0" />
            <span className="text-base">Version 1.0.0</span>
          </div>
        </div>

        {/* What is Reune Section */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            What is Reune
          </h2>
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-sm text-[#5e5e5e] leading-[1.6]">
              Reune is a social platform for sharing real-life experiences through multi-step routes. 
              Combine TikTok-style storytelling with Google Maps utility to discover and share amazing 
              places and experiences with your friends.
            </p>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            Follow Us
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => handleSocialLink('Instagram')}
              className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Instagram size={20} strokeWidth={2} className="text-muted-foreground" />
                <span className="text-base">@reune</span>
              </div>
            </button>

            <button
              onClick={() => handleSocialLink('Twitter')}
              className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Twitter size={20} strokeWidth={2} className="text-muted-foreground" />
                <span className="text-base">@reune</span>
              </div>
            </button>

            <button
              onClick={() => handleSocialLink('Website')}
              className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} strokeWidth={2} className="text-muted-foreground" />
                <span className="text-base">reune.app</span>
              </div>
            </button>

            <button
              onClick={() => handleSocialLink('Email')}
              className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Mail size={20} strokeWidth={2} className="text-muted-foreground" />
                <span className="text-base">hello@reune.app</span>
              </div>
            </button>
          </div>
        </div>

        {/* Credits Section */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            Credits
          </h2>
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-sm text-[#5e5e5e] leading-[1.6]">
              Photos and portrait images provided by Unsplash. 
              Built with React and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
