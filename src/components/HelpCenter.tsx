import { ArrowLeft, MessageCircle, BookOpen, AlertCircle, FileText, Users, ExternalLink } from 'lucide-react';

interface HelpCenterProps {
  onBack: () => void;
}

export default function HelpCenter({ onBack }: HelpCenterProps) {
  const handleContactSupport = () => {
    // In a real app, this would open a contact form or email
    console.log('Contact support');
  };

  const handleViewFAQ = () => {
    // In a real app, this would navigate to FAQ page
    console.log('View FAQ');
  };

  const handleReportProblem = () => {
    // In a real app, this would open a problem report form
    console.log('Report problem');
  };

  const handleTermsOfService = () => {
    // In a real app, this would open terms of service
    console.log('Terms of service');
  };

  const handleCommunityGuidelines = () => {
    // In a real app, this would open community guidelines
    console.log('Community guidelines');
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
          <h2 className="text-[22px] font-bold text-[#100f0f] mb-2">Help Center</h2>
          <p className="text-sm text-[#5e5e5e] leading-[1.4]">
            Get help and support for using Reune
          </p>
        </div>

        {/* Contact Support Section */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            Contact Support
          </h2>
          <button
            onClick={handleContactSupport}
            className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <MessageCircle size={20} strokeWidth={2} className="text-muted-foreground" />
              <span className="text-base">Contact Support Team</span>
            </div>
            <ExternalLink size={18} strokeWidth={2} className="text-muted-foreground" />
          </button>
        </div>

        {/* Help Resources Section */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            Help Resources
          </h2>
          <div className="space-y-2">
            <button
              onClick={handleViewFAQ}
              className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={20} strokeWidth={2} className="text-muted-foreground" />
                <span className="text-base">FAQ & Help Articles</span>
              </div>
              <ExternalLink size={18} strokeWidth={2} className="text-muted-foreground" />
            </button>

            <button
              onClick={handleReportProblem}
              className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <AlertCircle size={20} strokeWidth={2} className="text-muted-foreground" />
                <span className="text-base">Report a Problem</span>
              </div>
              <ExternalLink size={18} strokeWidth={2} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Legal Section */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            Legal
          </h2>
          <div className="space-y-2">
            <button
              onClick={handleTermsOfService}
              className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} strokeWidth={2} className="text-muted-foreground" />
                <span className="text-base">Terms of Service</span>
              </div>
              <ExternalLink size={18} strokeWidth={2} className="text-muted-foreground" />
            </button>

            <button
              onClick={handleCommunityGuidelines}
              className="w-full flex items-center justify-between h-14 px-4 rounded-2xl bg-muted hover:bg-muted/80 transition-colors active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Users size={20} strokeWidth={2} className="text-muted-foreground" />
                <span className="text-base">Community Guidelines</span>
              </div>
              <ExternalLink size={18} strokeWidth={2} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
