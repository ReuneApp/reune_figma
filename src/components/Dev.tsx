import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Aperture } from 'lucide-react';
import ShareBottomSheet from './ShareBottomSheet';
import RouteSettingsBottomSheet from './RouteSettingsBottomSheet';
import StepSettingsBottomSheet from './StepSettingsBottomSheet';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import EditRoutePopup from './EditRoutePopup';
import SavedRouteActionsPopup from './SavedRouteActionsPopup';
import GooglePlacesWarningPopup from './GooglePlacesWarningPopup';
import LoginPopup from './LoginPopup';
import RouteSelectionPreview from './RouteSelectionPreview';
import PlaceSelectionPreview from './PlaceSelectionPreview';
import PlaceGalleryPopup from './PlaceGalleryPopup';
import CoverPhotoPicker from './CoverPhotoPicker';
import ViewPreferenceOverlay from './ViewPreferenceOverlay';
import NotificationItem, { NotificationData } from './NotificationItem';
import SearchBottomSheet from './SearchBottomSheet';

interface DevProps {
  onBack: () => void;
}

export default function Dev({ onBack }: DevProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [usagePopup, setUsagePopup] = useState<{ name: string; position: { x: number; y: number } } | null>(null);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);

  // Mock photos for cover photo picker
  const mockPhotos = [
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    'https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    'https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
  ];

  // Usage information for each component
  const componentUsage: Record<string, string[]> = {
    'build': ['Create page - After building route'],
    'posted': ['Create page - After posting route'],
    'places': ['Create page - View switcher to Places'],
    'camera-roll': ['Create page - View switcher to Camera Roll'],
    'share': ['UserProfile - Share button', 'HomeFeed - Route actions'],
    'route-settings': ['UserProfile - Creator\'s own routes'],
    'step-settings': ['Create page - Step options menu'],
    'delete-confirmation': ['Create page - Discard route'],
    'edit-route': ['UserProfile - Edit creator\'s route'],
    'saved-route-actions': ['UserProfile - Saved routes menu'],
    'google-places-warning': ['Create page - Posting with Google Places'],
    'login': ['InviteCode - Onboarding flow'],
    'view-preference': ['Onboarding - View preference selection'],
    'search': ['HomeFeed - Search bar']
  };

  // Clear timer on cleanup
  useEffect(() => {
    return () => {
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
      }
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [autoHideTimer, longPressTimer]);

  const openPopup = (popupName: string, autoHideDuration?: number) => {
    // Clear any existing timer
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      setAutoHideTimer(null);
    }

    setActivePopup(popupName);

    // If auto-hide duration is specified, set a timer
    if (autoHideDuration) {
      const timer = setTimeout(() => {
        setActivePopup(null);
        setAutoHideTimer(null);
      }, autoHideDuration);
      setAutoHideTimer(timer);
    }
  };

  const closePopup = () => {
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      setAutoHideTimer(null);
    }
    setActivePopup(null);
  };

  const handleLongPressStart = (e: React.MouseEvent | React.TouchEvent, componentName: string) => {
    e.preventDefault();
    
    // Get button position
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top
    };

    const timer = setTimeout(() => {
      setUsagePopup({ name: componentName, position });
      setLongPressTimer(null);
    }, 500); // 500ms long press
    
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const closeUsagePopup = () => {
    setUsagePopup(null);
  };

  const mockRouteData = {
    id: '1',
    title: 'COFFEE & ART TOUR',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        caption: 'MORNING COFFEE AT THIS AMAZING LOCAL SPOT ☕',
        location: 'THE MANOR HOUSE'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        caption: 'BEAUTIFUL PARK WALK 🌳',
        location: 'CENTRAL PARK GARDENS'
      }
    ]
  };

  const mockStep = {
    id: '1',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    caption: 'MORNING COFFEE AT THIS AMAZING LOCAL SPOT ☕',
    location: 'THE MANOR HOUSE'
  };

  // Mock notification data for toaster
  const mockNotification: NotificationData = {
    id: '1',
    type: 'friend_request',
    title: 'NEW FRIEND REQUEST',
    message: 'Sarah Johnson sent you a friend request',
    timestamp: '2 MINUTES AGO',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTcwMDAwMDAwMHww&ixlib=rb-4.1.0&q=80&w=400'
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b-4 border-[#e9e9e9]">
        <button
          onClick={onBack}
          className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1abb6c] uppercase"
        >
          ← Back
        </button>
        <h1 className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] uppercase">
          Dev Tools
        </h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Popup List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <h2 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase mb-4">
          Notifications & Toasts
        </h2>
        <div className="space-y-3 mb-8">
          <button
            onClick={() => openPopup('build', 1500)}
            onMouseDown={(e) => handleLongPressStart(e, 'build')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'build')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Build Notification
          </button>
          <button
            onClick={() => openPopup('posted', 1500)}
            onMouseDown={(e) => handleLongPressStart(e, 'posted')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'posted')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Posted Notification
          </button>
          <button
            onClick={() => openPopup('places', 1500)}
            onMouseDown={(e) => handleLongPressStart(e, 'places')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'places')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Places Toast
          </button>
          <button
            onClick={() => openPopup('camera-roll', 1500)}
            onMouseDown={(e) => handleLongPressStart(e, 'camera-roll')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'camera-roll')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Camera Roll Toast
          </button>
          <button
            onClick={() => openPopup('notification-toaster', 3000)}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Notification Toaster
          </button>
        </div>

        <h2 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase mb-4">
          Bottom Sheets
        </h2>
        <div className="space-y-3 mb-8">
          <button
            onClick={() => openPopup('share')}
            onMouseDown={(e) => handleLongPressStart(e, 'share')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'share')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Share Route
          </button>
          <button
            onClick={() => openPopup('route-settings')}
            onMouseDown={(e) => handleLongPressStart(e, 'route-settings')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'route-settings')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Route Settings
          </button>
          <button
            onClick={() => openPopup('step-settings')}
            onMouseDown={(e) => handleLongPressStart(e, 'step-settings')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'step-settings')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Step Settings
          </button>
          <button
            onClick={() => openPopup('search')}
            onMouseDown={(e) => handleLongPressStart(e, 'search')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'search')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Search
          </button>
        </div>

        <h2 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase mb-4">
          Dialog Popups
        </h2>
        <div className="space-y-3 mb-8">
          <button
            onClick={() => openPopup('delete-confirmation')}
            onMouseDown={(e) => handleLongPressStart(e, 'delete-confirmation')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'delete-confirmation')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Delete Confirmation
          </button>
          <button
            onClick={() => openPopup('edit-route')}
            onMouseDown={(e) => handleLongPressStart(e, 'edit-route')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'edit-route')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Edit Route
          </button>
          <button
            onClick={() => openPopup('saved-route-actions')}
            onMouseDown={(e) => handleLongPressStart(e, 'saved-route-actions')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'saved-route-actions')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Saved Route Actions
          </button>
          <button
            onClick={() => openPopup('google-places-warning')}
            onMouseDown={(e) => handleLongPressStart(e, 'google-places-warning')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'google-places-warning')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Google Places Warning
          </button>
          <button
            onClick={() => openPopup('login')}
            onMouseDown={(e) => handleLongPressStart(e, 'login')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'login')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Login
          </button>
        </div>

        <h2 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase mb-4">
          Onboarding Overlays
        </h2>
        <div className="space-y-3 mb-8">
          <button
            onClick={() => openPopup('view-preference')}
            onMouseDown={(e) => handleLongPressStart(e, 'view-preference')}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={(e) => handleLongPressStart(e, 'view-preference')}
            onTouchEnd={handleLongPressEnd}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            View Preference Overlay
          </button>
        </div>

        <h2 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase mb-4">
          Selection UI Elements
        </h2>
        <div className="space-y-3 mb-8">
          <button
            onClick={() => openPopup('route-selection')}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Route Selected UI
          </button>
          <button
            onClick={() => openPopup('place-selection')}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Place Selected UI
          </button>
        </div>

        <h2 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase mb-4">
          Gallery Views
        </h2>
        <div className="space-y-3 mb-8">
          <button
            onClick={() => openPopup('place-gallery')}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Place Gallery
          </button>
          <button
            onClick={() => openPopup('cover-photo-picker')}
            className="w-full p-4 bg-white border-4 border-[#e9e9e9] rounded-[16px] text-left font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] active:scale-95 transition-transform"
          >
            Cover Photo Picker
          </button>
        </div>
      </div>

      {/* BUILD Popup */}
      <AnimatePresence>
        {activePopup === 'build' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[50]"
              onClick={closePopup}
            />
            {/* Popup */}
            <motion.div
              key="build-popup"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 300,
                duration: 0.3
              }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]"
            >
              <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white border-8 border-[#e9e9e9] border-solid shadow-[0px_10px_25px_0px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-1">
                <svg className="w-8 h-8" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase tracking-wider">BUILD</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* POSTED Popup */}
      <AnimatePresence>
        {activePopup === 'posted' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[50]"
              onClick={closePopup}
            />
            {/* Popup */}
            <motion.div
              key="posted-popup"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 300,
                duration: 0.3
              }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]"
            >
              <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white border-8 border-[#e9e9e9] border-solid shadow-[0px_10px_25px_0px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-1">
                <svg className="w-8 h-8" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase tracking-wider">POSTED</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PLACES Toast */}
      <AnimatePresence>
        {activePopup === 'places' && (
          <motion.div
            key="places-toast"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
            className="fixed left-1/2 -translate-x-1/2 top-[120px] z-30 pointer-events-none"
          >
            <div className="bg-white border-4 border-[#e9e9e9] border-solid rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] px-[16px] h-[47.994px] flex items-center justify-center gap-[12px]">
              {/* Filled Map Pin Icon */}
              <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="black">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {/* PLACES Text */}
              <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase leading-[normal]">
                PLACES
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CAMERA ROLL Toast */}
      <AnimatePresence>
        {activePopup === 'camera-roll' && (
          <motion.div
            key="camera-roll-toast"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
            className="fixed left-1/2 -translate-x-1/2 top-[120px] z-30 pointer-events-none"
          >
            <div className="bg-white border-4 border-[#e9e9e9] border-solid rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] px-[16px] h-[47.994px] flex items-center justify-center gap-[12px]">
              {/* Aperture Icon */}
              <Aperture className="w-[20px] h-[20px]" strokeWidth={2} />
              {/* CAMERA ROLL Text */}
              <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase leading-[normal]">
                CAMERA ROLL
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toaster */}
      <AnimatePresence>
        {activePopup === 'notification-toaster' && (
          <motion.div
            key="notification-toaster"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
            className="fixed left-1/2 -translate-x-1/2 top-[120px] z-30 px-6 w-full max-w-md"
          >
            <NotificationItem
              notification={mockNotification}
              onClick={() => console.log('Notification clicked')}
              onClose={() => closePopup()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Bottom Sheet */}
      <ShareBottomSheet
        isOpen={activePopup === 'share'}
        onClose={closePopup}
        routeId="1"
        routeTitle="COFFEE & ART TOUR"
      />

      {/* Route Settings Bottom Sheet */}
      <RouteSettingsBottomSheet
        isOpen={activePopup === 'route-settings'}
        onClose={closePopup}
        step={mockStep}
        isCreator={true}
        onDeleteRoute={() => console.log('Delete route clicked')}
        onViewLocation={() => console.log('View location clicked')}
        onEditRoute={() => console.log('Edit route clicked')}
      />

      {/* Step Settings Bottom Sheet */}
      <StepSettingsBottomSheet
        isOpen={activePopup === 'step-settings'}
        onClose={closePopup}
        step={mockStep}
        stepNumber={1}
        onDeleteStep={() => console.log('Delete step')}
        onChangeCover={() => console.log('Change cover')}
        onViewLocation={() => console.log('View location')}
      />

      {/* Delete Confirmation Popup */}
      <DeleteConfirmationPopup
        isOpen={activePopup === 'delete-confirmation'}
        onClose={closePopup}
        onConfirm={() => {
          console.log('Delete confirmed');
          closePopup();
        }}
        routeTitle="COFFEE & ART TOUR"
      />

      {/* Edit Route Popup */}
      <EditRoutePopup
        isOpen={activePopup === 'edit-route'}
        onClose={closePopup}
        onEdit={() => {
          console.log('Edit clicked');
          closePopup();
        }}
        onDelete={() => {
          console.log('Delete clicked');
          closePopup();
        }}
        routeImage={mockStep.image}
      />

      {/* Saved Route Actions Popup */}
      <SavedRouteActionsPopup
        isOpen={activePopup === 'saved-route-actions'}
        onClose={closePopup}
        onShare={() => {
          console.log('Share clicked');
          closePopup();
        }}
        onRemove={() => {
          console.log('Remove clicked');
          closePopup();
        }}
        routeImage={mockStep.image}
      />

      {/* Google Places Warning Popup */}
      <GooglePlacesWarningPopup
        isOpen={activePopup === 'google-places-warning'}
        onClose={closePopup}
      />

      {/* Login Popup */}
      <LoginPopup
        isOpen={activePopup === 'login'}
        onClose={closePopup}
      />

      {/* Route Selection Preview */}
      <RouteSelectionPreview
        isOpen={activePopup === 'route-selection'}
        onClose={closePopup}
      />

      {/* Place Selection Preview */}
      <PlaceSelectionPreview
        isOpen={activePopup === 'place-selection'}
        onClose={closePopup}
      />

      {/* Place Gallery Popup */}
      <PlaceGalleryPopup
        isOpen={activePopup === 'place-gallery'}
        onClose={closePopup}
      />

      {/* Cover Photo Picker */}
      <CoverPhotoPicker
        isOpen={activePopup === 'cover-photo-picker'}
        onClose={closePopup}
        photos={mockPhotos}
        selectedCoverIndex={selectedCoverIndex}
        onSelectCover={(index) => {
          setSelectedCoverIndex(index);
          console.log('Selected cover photo index:', index);
        }}
      />

      {/* View Preference Overlay */}
      <ViewPreferenceOverlay
        isOpen={activePopup === 'view-preference'}
        onClose={closePopup}
      />

      {/* Search Bottom Sheet */}
      <SearchBottomSheet
        isOpen={activePopup === 'search'}
        onClose={closePopup}
      />

      {/* Usage Information Popup */}
      <AnimatePresence>
        {usagePopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={closeUsagePopup}
            />
            {/* Popup */}
            <motion.div
              key="usage-popup"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300
              }}
              style={{
                position: 'fixed',
                left: `${usagePopup.position.x}px`,
                top: `${usagePopup.position.y - 20}px`,
                transform: 'translate(-50%, -100%)',
                zIndex: 110
              }}
              className="max-w-[280px]"
            >
              <div className="bg-white border-4 border-[#e9e9e9] border-solid rounded-[16px] shadow-[0px_10px_25px_0px_rgba(0,0,0,0.3)] p-4">
                <h3 className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase mb-2 font-bold">
                  USED IN:
                </h3>
                <ul className="space-y-1">
                  {componentUsage[usagePopup.name]?.map((usage, index) => (
                    <li
                      key={index}
                      className="font-['Baloo_Tamma',sans-serif] text-[12px] text-[#666666] leading-relaxed"
                    >
                      • {usage}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Arrow pointing down */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #e9e9e9',
                  bottom: '-8px'
                }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid white',
                  bottom: '-5px'
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}