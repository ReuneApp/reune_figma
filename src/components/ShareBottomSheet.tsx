import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface ShareBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  routeId: string;
  routeTitle?: string;
}

export default function ShareBottomSheet({ isOpen, onClose, routeId, routeTitle }: ShareBottomSheetProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [sharedFriends, setSharedFriends] = useState<string[]>([]);
  const [friends] = useState<Friend[]>([
    { 
      id: '1', 
      name: 'ALEX', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyMjY1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: '2', 
      name: 'MAYA', 
      avatar: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDMxMDU1MHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: '3', 
      name: 'JORDAN', 
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNDYxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: '4', 
      name: 'SOFIA', 
      avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGljdHVyZXxlbnwxfHx8fDE3NjQyNTQ1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: '5', 
      name: 'EMMA', 
      avatar: 'https://images.unsplash.com/photo-1545479620-9fa10b267ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyMzQ4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      id: '6', 
      name: 'NOAH', 
      avatar: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwcGVyc29ufGVufDF8fHx8MTc2NDI3Mzg5OXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ]);

  // Generate shareable link
  const shareLink = `https://reune.app/route/${routeId}`;

  const handleCopyLink = async () => {
    try {
      // Try modern Clipboard API first
      await navigator.clipboard.writeText(shareLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback to older method if Clipboard API is blocked
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
        }
      } catch {
      }
    }
  };

  const toggleShareFriend = (friendId: string) => {
    setSharedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[30px] z-[9999] max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Border */}
            <div className="absolute inset-0 border-8 border-[#e9e9e9] rounded-t-[30px] pointer-events-none" />

            {/* Content */}
            <div className="flex flex-col px-6 pb-8 overflow-y-auto">
              {/* Title */}
              <h2 className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] uppercase text-center mb-4 mt-6">
                SHARE ROUTE
              </h2>

              {/* Copyable Link Section */}
              <button
                onClick={handleCopyLink}
                className="w-full bg-white border-4 border-[#e9e9e9] rounded-[20px] min-h-[70px] flex items-center justify-between px-5 py-3 mb-6 active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
              >
                <div className="flex flex-col items-start flex-1 min-w-0 mr-3">
                  <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[rgba(30,30,30,0.4)] uppercase">
                    LINK
                  </span>
                  <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] truncate w-full text-left">
                    {shareLink}
                  </span>
                </div>
                {copiedLink ? (
                  <div className="flex items-center gap-1">
                    <Check size={18} className="text-[#1abb6c]" />
                    <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1abb6c] uppercase">
                      COPIED
                    </span>
                  </div>
                ) : (
                  <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1abb6c] uppercase whitespace-nowrap">
                    COPY
                  </span>
                )}
              </button>

              {/* Friends List Title */}
              <h3 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase mb-3">
                SHARE WITH FRIENDS
              </h3>

              {/* Friends Grid */}
              <div className="grid grid-cols-3 gap-x-[11px] gap-y-[16px]">
                {friends.map((friend) => {
                  const isShared = sharedFriends.includes(friend.id);
                  
                  return (
                    <div key={friend.id} className="relative h-[124px] w-full">
                      {/* Avatar */}
                      <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-0 top-0 w-[95.998px]">
                        <div className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full">
                          <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
                            <img 
                              src={friend.avatar}
                              alt={friend.name}
                              className="absolute inset-0 size-full object-cover"
                            />
                          </div>
                          <div aria-hidden="true" className="absolute border-8 border-white border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
                        </div>
                      </div>

                      {/* Name */}
                      <p className="absolute h-[13.98px] left-0 text-center top-[105.49px] w-[95.998px] font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic text-[#1e1e1e] text-[14px] uppercase">
                        {friend.name}
                      </p>

                      {/* Share Button - Bottom Right */}
                      <button 
                        onClick={() => toggleShareFriend(friend.id)}
                        className={`absolute box-border content-stretch flex items-center justify-center left-[52px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[52px] active:scale-95 transition-transform ${isShared ? 'bg-[#1abb6c]' : 'bg-white'}`}
                      >
                        {isShared ? (
                          <>
                            <div aria-hidden="true" className="absolute border-4 border-[#1abb6c] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                            <div className="relative shrink-0 size-[21.993px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                                <path d="M20.2441 5.5L8.24414 17.5L2.74414 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </>
                        ) : (
                          <>
                            <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                            <div className="relative shrink-0 size-[24px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
