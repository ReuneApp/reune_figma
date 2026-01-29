import NotificationItem, { NotificationData } from './NotificationItem';
import svgPaths from '../imports/svg-pyrsfg4y3k';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface NotificationsProps {
  onBack: () => void;
}

// Sample demo notifications
const mockNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'friend_request',
    title: 'NEW FRIEND REQUEST',
    message: 'Sarah Johnson sent you a friend request',
    timestamp: '2 MINUTES AGO',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTcwMDAwMDAwMHww&ixlib=rb-4.1.0&q=80&w=400',
    category: 'today'
  },
  {
    id: '2',
    type: 'route_like',
    title: 'NEW LIKE',
    message: 'Alex Martinez liked your route "COFFEE & ART TOUR"',
    timestamp: '1 HOUR AGO',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MDAwMDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    relatedImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'today'
  },
  {
    id: '3',
    type: 'new_follower',
    title: 'NEW FOLLOWER',
    message: 'Emma Wilson started following you',
    timestamp: '3 HOURS AGO',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTcwMDAwMDAwMHww&ixlib=rb-4.1.0&q=80&w=400',
    category: 'today'
  },
  {
    id: '4',
    type: 'route_save',
    title: 'ROUTE SAVED',
    message: 'Michael Chen saved your route "ART & CULTURE DAY"',
    timestamp: '5 HOURS AGO',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MDAwMDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    relatedImage: 'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=400',
    category: 'today'
  },
  {
    id: '5',
    type: 'friend_request',
    title: 'NEW FRIEND REQUEST',
    message: 'David Lee sent you a friend request',
    timestamp: 'YESTERDAY',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MDAwMDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'previous'
  },
  {
    id: '6',
    type: 'route_like',
    title: 'NEW LIKE',
    message: 'Jessica Brown liked your route "URBAN EXPLORER"',
    timestamp: '2 DAYS AGO',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTcwMDAwMDAwMHww&ixlib=rb-4.1.0&q=80&w=400',
    relatedImage: 'https://images.unsplash.com/photo-1611653682161-f58ba65ead46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWxlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMjg2NzYzfDA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'previous'
  }
];

export default function Notifications({ onBack }: NotificationsProps) {
  const [notifications, setNotifications] = useState<NotificationData[]>(mockNotifications);

  const handleNotificationClick = (notification: NotificationData) => {
    // If it's a friend request, accept it and show toast
    if (notification.type === 'friend_request') {
      // Extract the name from the message (e.g., "Sarah Johnson sent you a friend request")
      const nameMatch = notification.message.match(/^(.+?)\s+sent you a friend request/i);
      const userName = nameMatch ? nameMatch[1] : 'User';
      toast.success(`YOU ARE NOW FRIENDS WITH ${userName.toUpperCase()}`);
      // In a real app, this would also update the friend status in the backend
    }
  };

  const handleDismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.success('Notification dismissed');
  };

  // Group notifications by category
  const todayNotifications = notifications.filter(n => n.category === 'today');
  const previousNotifications = notifications.filter(n => n.category === 'previous');
  const hasNotifications = notifications.length > 0;

  return (
    <div className="relative h-full w-full bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white pb-2 pt-[28px] px-[26px]">
        {/* Back Button */}
        <div className="absolute top-[28px] left-[26px]">
          <button 
            onClick={onBack}
            className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
          >
            <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="relative shrink-0 size-[23.992px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g>
                  <path d={svgPaths.p3152c100} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                  <path d="M18.9939 11.9961H4.99839" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                </g>
              </svg>
            </div>
          </button>
        </div>

        {/* Title removed */}
      </div>

      {/* Notifications List */}
      <div className="px-[26px] pb-[40px] pt-[80px]">
        {!hasNotifications ? (
          /* Empty State - Matching Profile Page Style */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            {/* Bell icon */}
            <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white flex items-center justify-center mb-4">
              <Bell 
                size={48}
                className="text-[rgba(30,30,30,0.4)]"
                strokeWidth={2}
              />
            </div>
            <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[rgba(30,30,30,0.4)] uppercase">
              NO NOTIFICATIONS
            </p>
          </div>
        ) : (
          <>
            {/* Today Section */}
            {todayNotifications.length > 0 && (
              <div className="mb-6">
                <h2 className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#666666] uppercase mb-3 text-left">
                  TODAY
                </h2>
                <div className="space-y-3">
                  {todayNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onClick={() => handleNotificationClick(notification)}
                      onDismiss={() => handleDismissNotification(notification.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Previous Days Section */}
            {previousNotifications.length > 0 && (
              <div className="mt-8">
                <h2 className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#666666] uppercase mb-3 text-left">
                  PREVIOUS DAYS
                </h2>
                <div className="space-y-3">
                  {previousNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onClick={() => handleNotificationClick(notification)}
                      onDismiss={() => handleDismissNotification(notification.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
