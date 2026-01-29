import { Users, Heart, MapPin, User, X } from 'lucide-react';

export interface NotificationData {
  id: string;
  type: 'friend_request' | 'route_like' | 'new_follower' | 'route_save';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  relatedImage?: string;
  category?: 'today' | 'previous';
}

interface NotificationItemProps {
  notification: NotificationData;
  onClick?: () => void;
  onClose?: () => void;
  onDismiss?: () => void;
}

export default function NotificationItem({ notification, onClick, onClose, onDismiss }: NotificationItemProps) {
  const renderIcon = () => {
    const iconProps = { size: 20, strokeWidth: 2.5, className: "text-[#1ABB6C]" };
    
    switch (notification.type) {
      case 'friend_request':
        return <Users {...iconProps} />;
      case 'route_like':
        return <Heart {...iconProps} fill="#1ABB6C" />;
      case 'new_follower':
        return <User {...iconProps} />;
      case 'route_save':
        return <MapPin {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="relative bg-white rounded-[24px] p-4 cursor-pointer transition-all active:scale-98 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
    >
      {/* Border - changed to thicker and light grey */}
      <div 
        aria-hidden="true" 
        className="absolute border-[3.691px] border-solid border-[#e9e9e9] inset-0 pointer-events-none rounded-[24px]" 
      />

      <div className="relative flex items-start gap-3">
        {/* Avatar or Icon - matching the profile button from home feed */}
        <div className="flex-shrink-0 w-[47.994px] h-[47.994px] rounded-[16px] bg-white overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] flex items-center justify-center">
          {notification.avatar ? (
            <img 
              src={notification.avatar} 
              alt="Avatar" 
              className="w-full h-full object-cover rounded-[12.303px]"
            />
          ) : (
            <div className="relative">
              {renderIcon()}
            </div>
          )}
        </div>

        {/* Content - Added pr-8 to ensure text doesn't overlap with X button */}
        <div className="flex-1 min-w-0 pr-8">
          <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#666666] leading-snug uppercase">
            {notification.message}
          </p>
          <p className="font-['Baloo_Tamma',sans-serif] text-[12px] text-[#999999] mt-1 uppercase">
            {notification.timestamp}
          </p>
        </div>
      </div>

      {/* Close button */}
      {onDismiss && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="absolute top-2 right-2 text-[#999999] hover:text-[#666666] transition-colors active:scale-90 p-1"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

function Bell({ size, strokeWidth, className }: { size: number; strokeWidth: number; className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}