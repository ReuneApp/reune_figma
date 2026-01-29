import { useState, useEffect, useRef } from 'react';
import svgPaths from '../imports/svg-pyrsfg4y3k';
import svgPathsFriend from '../imports/svg-o5ll254qsh';
import { mockUsers } from '../data/mockUsers';
import { toast } from 'sonner@2.0.3';
import NotificationItem, { NotificationData } from './NotificationItem';
import { motion } from 'framer-motion';

type FriendState = 'add' | 'added';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  friendState: FriendState;
}

// Use the actual mockUsers data - ALL users from the friend system
// Friends (user1-user6) appear first, then non-friends (user7-user12)
const allUsers: Friend[] = [
  // FRIENDS (user1-user6) - already added
  { 
    id: 'user1', 
    name: mockUsers['user1'].name,
    avatar: mockUsers['user1'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user2', 
    name: mockUsers['user2'].name,
    avatar: mockUsers['user2'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user3', 
    name: mockUsers['user3'].name,
    avatar: mockUsers['user3'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user4', 
    name: mockUsers['user4'].name,
    avatar: mockUsers['user4'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user5', 
    name: mockUsers['user5'].name,
    avatar: mockUsers['user5'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user6', 
    name: mockUsers['user6'].name,
    avatar: mockUsers['user6'].avatar,
    friendState: 'add'
  },
  // NON-FRIENDS (user7-user12) - not added yet
  { 
    id: 'user7', 
    name: mockUsers['user7'].name,
    avatar: mockUsers['user7'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user8', 
    name: mockUsers['user8'].name,
    avatar: mockUsers['user8'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user9', 
    name: mockUsers['user9'].name,
    avatar: mockUsers['user9'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user10', 
    name: mockUsers['user10'].name,
    avatar: mockUsers['user10'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user11', 
    name: mockUsers['user11'].name,
    avatar: mockUsers['user11'].avatar,
    friendState: 'add'
  },
  { 
    id: 'user12', 
    name: mockUsers['user12'].name,
    avatar: mockUsers['user12'].avatar,
    friendState: 'add'
  },
];

interface FriendsListProps {
  onBack: () => void;
  onAddFriend: (userId: string) => void;
  getFriendStatus: (userId: string) => 'friend' | 'not-friend' | 'requested' | 'incoming-request';
  onAcceptFriendRequest: (userId: string) => void;
  onRejectFriendRequest: (userId: string) => void;
  onViewUserProfile: (userId: string) => void;
}

export default function FriendsList({ onBack, onAddFriend, getFriendStatus, onAcceptFriendRequest, onRejectFriendRequest, onViewUserProfile }: FriendsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>(allUsers);
  const [addedFriends, setAddedFriends] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'friends' | 'suggested' | 'requested'>('friends');
  
  // Track previous friend statuses to detect changes
  const previousStatusesRef = useRef<Record<string, 'friend' | 'not-friend' | 'requested' | 'incoming-request'>>({});
  
  // Force component to re-check statuses periodically
  const [, forceUpdate] = useState(0);

  // Load added friends from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('addedFriends');
    if (stored) {
      const friendIds = JSON.parse(stored);
      setAddedFriends(friendIds);
      // Update friend states based on stored data
      setFriends(prevFriends =>
        prevFriends.map(friend => ({
          ...friend,
          friendState: friendIds.includes(friend.id) ? 'added' : 'add'
        }))
      );
    }
  }, []);

  // Poll for status changes every 500ms
  useEffect(() => {
    console.log('FriendsList: Polling effect started');
    
    // Initialize previousStatuses on mount
    friends.forEach(friend => {
      const currentStatus = getFriendStatus(friend.id);
      if (!previousStatusesRef.current[friend.id]) {
        previousStatusesRef.current[friend.id] = currentStatus;
        console.log('FriendsList: Initialized status for', friend.name, '=', currentStatus);
      }
    });

    const interval = setInterval(() => {
      // Check each friend's status
      friends.forEach(friend => {
        const currentStatus = getFriendStatus(friend.id);
        const previousStatus = previousStatusesRef.current[friend.id];
        
        // Debug logging
        if (currentStatus !== 'not-friend') {
          console.log('FriendsList: Checking', friend.name, '| Previous:', previousStatus, '| Current:', currentStatus);
        }
        
        // If status changed from 'requested' to 'friend', show toast with avatar
        if (previousStatus === 'requested' && currentStatus === 'friend') {
          console.log('🎉 FriendsList: Status changed for', friend.name, 'from requested to friend - SHOWING TOAST');
          
          // Create notification data
          const notificationData: NotificationData = {
            id: `friend-accepted-${friend.id}`,
            type: 'friend_request',
            title: 'FRIEND REQUEST ACCEPTED',
            message: `${friend.name} ACCEPTED YOUR FRIEND REQUEST`,
            timestamp: 'JUST NOW',
            read: false,
            avatar: friend.avatar
          };
          
          // Show toast with NotificationItem component
          toast.custom(
            (t) => (
              <motion.div
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -200, opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 300
                }}
                className="w-full max-w-md px-6"
              >
                <NotificationItem
                  notification={notificationData}
                  onClick={() => toast.dismiss(t)}
                  onClose={() => toast.dismiss(t)}
                />
              </motion.div>
            ),
            {
              duration: 3000,
            }
          );
        }
        
        // Update the previous status
        previousStatusesRef.current[friend.id] = currentStatus;
      });
      
      // Force re-render to update UI
      forceUpdate(prev => prev + 1);
    }, 500);
    
    return () => {
      console.log('FriendsList: Polling effect cleaned up');
      clearInterval(interval);
    };
  }, [friends, getFriendStatus]);

  // Filter friends based on search query
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate into friends and suggestions based on getFriendStatus
  const currentFriends = filteredFriends.filter(friend => getFriendStatus(friend.id) === 'friend');
  // Suggested includes both 'not-friend' AND 'requested' - they stay until accepted
  const friendSuggestions = filteredFriends.filter(friend => {
    const status = getFriendStatus(friend.id);
    return status === 'not-friend' || status === 'requested';
  });
  // Requests tab is for INCOMING friend requests from other users
  const requestedFriends = filteredFriends.filter(friend => getFriendStatus(friend.id) === 'incoming-request');

  // Determine which list to show based on active filter
  let displayedUsers: Friend[] = [];
  if (activeFilter === 'friends') {
    displayedUsers = currentFriends;
  } else if (activeFilter === 'suggested') {
    displayedUsers = friendSuggestions;
  } else if (activeFilter === 'requested') {
    displayedUsers = requestedFriends;
  }

  // Check if there are any requested friends to enable/disable the button
  const hasRequested = requestedFriends.length > 0;

  // Toggle friend add state
  const toggleFriendAdd = (friendId: string) => {
    setFriends(prevFriends =>
      prevFriends.map(friend => {
        if (friend.id === friendId) {
          const newState: FriendState = friend.friendState === 'add' ? 'added' : 'add';
          
          // Update localStorage
          if (newState === 'added') {
            const updated = [...addedFriends, friendId];
            setAddedFriends(updated);
            localStorage.setItem('addedFriends', JSON.stringify(updated));
          } else {
            const updated = addedFriends.filter(id => id !== friendId);
            setAddedFriends(updated);
            localStorage.setItem('addedFriends', JSON.stringify(updated));
          }
          
          return { ...friend, friendState: newState };
        }
        return friend;
      })
    );
  };

  // Render friend state button
  const renderFriendButton = (friend: Friend) => {
    if (friend.friendState === 'add') {
      return (
        <>
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="bg-[rgba(0,0,0,0)] h-[52px] relative rounded-[99px] shrink-0 w-[48px]">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[52px] items-center justify-center p-[4px] relative w-[48px]">
              <div className="relative shrink-0 size-[34px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <g>
                    <path d={svgPathsFriend.p8147680} fill="black" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div aria-hidden="true" className="absolute border-4 border-[#1abb6c] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="relative shrink-0 size-[21.993px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
              <path d="M20.2441 5.5L8.24414 17.5L2.74414 12" stroke="#1abb6c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </>
      );
    }
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full overflow-hidden">
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative rounded-[inherit]">
          <div className="bg-white h-full overflow-clip relative shrink-0 w-full">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="absolute bg-white box-border content-stretch flex items-center justify-center left-[26px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[28px]"
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

            {/* Search Bar */}
            <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[43px] pl-[28px] pr-[20px] py-[10px] rounded-[20px] top-[107px] right-[43px]">
              <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
              <div className="relative shrink-0 size-[23.992px] z-10">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g>
                    <path d={svgPaths.p468a980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                    <path d={svgPaths.p1cb43700} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                  </g>
                </svg>
              </div>
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 z-10">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH"
                  className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-black text-[22px] w-[82px] bg-transparent border-none outline-none placeholder:text-[#e9e9e9] uppercase"
                />
              </div>
            </div>

            {/* Filter Pills - Below search bar, matching location chip style from Profile */}
            <div className="absolute top-[198px] left-0 right-0 overflow-x-auto overflow-y-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-20">
              <div className="flex gap-2 pl-[43px] pr-[43px] py-4">
                <button
                  onClick={() => setActiveFilter('friends')}
                  className="box-border content-stretch flex h-[48px] items-center justify-center px-[20px] py-[10px] rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] relative gap-[8px] active:scale-95 transition-all duration-200 bg-white flex-shrink-0"
                >
                  <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre uppercase text-center" style={{ color: activeFilter === 'friends' ? '#1e1e1e' : 'rgba(30,30,30,0.4)' }}>
                    FRIENDS
                  </p>
                </button>
                <button
                  onClick={() => setActiveFilter('suggested')}
                  className="box-border content-stretch flex h-[48px] items-center justify-center px-[20px] py-[10px] rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] relative gap-[8px] active:scale-95 transition-all duration-200 bg-white flex-shrink-0"
                >
                  <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre uppercase text-center" style={{ color: activeFilter === 'suggested' ? '#1e1e1e' : 'rgba(30,30,30,0.4)' }}>
                    SUGGESTED
                  </p>
                </button>
                <button
                  onClick={() => hasRequested && setActiveFilter('requested')}
                  disabled={!hasRequested}
                  className={`box-border content-stretch flex h-[48px] items-center justify-center px-[20px] py-[10px] rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] relative gap-[8px] transition-all duration-200 bg-white flex-shrink-0 ${
                    hasRequested ? 'active:scale-95' : 'cursor-not-allowed'
                  }`}
                >
                  <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre uppercase text-center" style={{ color: hasRequested ? (activeFilter === 'requested' ? '#1e1e1e' : 'rgba(30,30,30,0.4)') : 'rgba(30,30,30,0.2)' }}>
                    REQUESTS
                  </p>
                </button>
              </div>
            </div>

            {/* User List - Scrollable */}
            <div className="absolute top-[290px] left-0 w-full pb-[40px] overflow-y-auto h-[calc(100vh-290px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-10">
              <div className="flex flex-col pl-[27px] pr-[43px]">
                {displayedUsers.map((friend) => {
                  const friendStatus = getFriendStatus(friend.id);
                  const userData = mockUsers[friend.id];
                  const showAddButton = activeFilter === 'suggested';
                  const showRequestButtons = activeFilter === 'requested';
                  
                  return (
                    <button
                      key={friend.id}
                      onClick={() => onViewUserProfile(friend.id)}
                      className="bg-white rounded-[24px] px-4 pt-2 pb-3 flex items-center gap-[16px] relative w-full text-left cursor-pointer border-none"
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-[47.994px] h-[47.994px] rounded-[16px] overflow-hidden border-[3.691px] border-[#e9e9e9] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                          <img 
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Name and Location */}
                      <div className={`flex flex-col gap-[2px] flex-1 min-w-0 ${showAddButton || showRequestButtons ? 'pr-[60px]' : ''}`}>
                        <h3 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-black leading-[1.1] uppercase break-words">
                          {friend.name}
                        </h3>
                        <p className="font-['Baloo_Tamma',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[1.2] uppercase">
                          {userData?.location || 'LOCATION'}
                        </p>
                      </div>

                      {/* Add/Status Button - Only show for suggested friends */}
                      {showAddButton && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (friendStatus === 'not-friend') {
                              onAddFriend(friend.id);
                              // No immediate toast - acceptance toast will appear after 5 seconds
                            }
                          }}
                          className={`absolute top-[8px] right-0 bg-white rounded-[16px] w-[47.994px] h-[47.994px] flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform ${
                            friendStatus === 'requested' ? 'opacity-50 cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                          {friendStatus === 'not-friend' ? (
                            <svg className="w-[23.992px] h-[23.992px] relative z-10" fill="none" viewBox="0 0 24 24">
                              <path d="M12 5v14M5 12h14" stroke="black" strokeWidth="2.4992" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg className="w-[23.992px] h-[23.992px] relative z-10" fill="none" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" fill="none"/>
                              <path d="M12 7v5l3 3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      )}

                      {/* Accept/Reject Buttons - Only show for incoming requests */}
                      {showRequestButtons && (
                        <div className="absolute top-[8px] right-0 flex gap-2">
                          {/* Reject Button (X) */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onRejectFriendRequest(friend.id);
                            }}
                            className="bg-white rounded-[16px] w-[47.994px] h-[47.994px] flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform cursor-pointer relative"
                          >
                            <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                            <svg className="w-[23.992px] h-[23.992px] relative z-10" fill="none" viewBox="0 0 24 24">
                              <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2.4992" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          
                          {/* Accept Button (Check) */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onAcceptFriendRequest(friend.id);
                            }}
                            className="bg-[#1abb6c] rounded-[16px] w-[47.994px] h-[47.994px] flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform cursor-pointer relative"
                          >
                            <div aria-hidden="true" className="absolute border-[#1abb6c] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                            <svg className="w-[23.992px] h-[23.992px] relative z-10" fill="none" viewBox="0 0 24 24">
                              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.4992" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}