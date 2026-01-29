import { useState, useEffect } from 'react';
import { Camera, MapPin, Users, Settings, Bell, Pencil, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-gnxehau1d2';
import svgPathsFriend from '../imports/svg-wpjefub7bx';
import svgPathsOther from '../imports/svg-p9y5ma0sa9';
import svgPathsMe from '../imports/svg-iqnhk782gf';
import svgPathsMap from '../imports/svg-sgz91c5j7s';
import svgPathsBack from '../imports/svg-pyrsfg4y3k';
import { ImageWithFallback } from './figma/ImageWithFallback';
import LocationWidget from './LocationWidget';
import { getUserById } from '../data/mockUsers';
import EditRoutePopup from './EditRoutePopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import ShareBottomSheet from './ShareBottomSheet';
import SavedRouteActionsPopup from './SavedRouteActionsPopup';
import { toast } from 'sonner';

interface UserProfileProps {
  userId: string;
  isAuthUser?: boolean;
  authUserData?: {
    name: string;
    username: string;
    avatar: string;
    location: string;
    bio?: string;
  };
  userData?: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    location: string;
    bio?: string;
  };
  onBack: () => void;
  onViewRoute?: (routeId: string, routeData?: RouteData) => void;
  onViewFriends?: (isAuthUser: boolean) => void;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onViewNotifications?: () => void;
  userPostedRoutes?: RouteData[];
  userSavedRoutes?: RouteData[];
  onEditRoute?: (routeId: string) => void;
  onDeleteRoute?: (routeId: string) => void;
  onRemoveSaved?: (routeId: string) => void;
  friendStatus?: 'friend' | 'not-friend' | 'requested';
  onAddFriend?: (userId: string) => void;
}

interface RouteData {
  id: string;
  images: string[];
  title: string;
  steps: {
    id: string;
    image: string;
    location: string;
    caption: string;
    photos?: string[]; // Multiple photos per step
    source?: 'user' | 'google'; // Source of the step (google = from Google Places)
    hasUserPhoto?: boolean; // True if user has added their own photos
  }[];
  creator?: {
    id: string;
    name: string;
    avatar: string;
  };
}

// Mock route data for user's created posts
const mockPostsRoutes: RouteData[] = [
  {
    id: 'profile-1',
    title: 'COFFEE & ART TOUR',
    images: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzYzNTM0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYzNTQ0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'THE MANOR HOUSE',
        caption: 'Morning coffee at this cozy spot ☕',
        source: 'google', // This is a Google Place
        hasUserPhoto: false // User hasn't added their own photo yet - PRIVATE ROUTE
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzYzNTM0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'CENTRAL PARK GARDENS',
        caption: 'Beautiful park walk 🌳',
        source: 'google', // This is a Google Place
        hasUserPhoto: false // User hasn't added their own photo yet - PRIVATE ROUTE
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYzNTQ0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'BELLA VISTA RESTAURANT',
        caption: 'Amazing dinner 🍽️',
        source: 'google', // This is a Google Place
        hasUserPhoto: false // User hasn't added their own photo yet - PRIVATE ROUTE
      }
    ]
  },
  {
    id: 'profile-2',
    title: 'ART & CULTURE DAY',
    images: [
      'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyOTcyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1633735672439-580d8f078b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwc3Vuc2V0fGVufDF8fHx8MTc2MDMzODIwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'MODERN ART GALLERY',
        caption: 'Amazing art exhibition 🎨'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyOTcyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'HISTORIC BOOKSHOP',
        caption: 'Found some great reads 📚'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1633735672439-580d8f078b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwc3Vuc2V0fGVufDF8fHx8MTc2MDMzODIwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'SKY TERRACE BAR',
        caption: 'Rooftop sunset drinks 🍹'
      }
    ]
  },
  {
    id: 'profile-3',
    title: 'URBAN EXPLORER',
    images: [
      'https://images.unsplash.com/photo-1611653682161-f58ba65ead46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMjg2NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1625861886374-ad02172db792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMG5hdHVyZXxlbnwxfHx8fDE3NjAzNjUwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1684568519316-f0fb02f7826b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYwMzExNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1611653682161-f58ba65ead46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMjg2NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'DOWNTOWN COFFEE HOUSE',
        caption: 'Modern cafe vibes ☕'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1625861886374-ad02172db792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMG5hdHVyZXxlbnwxfHx8fDE3NjAzNjUwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'URBAN PARK',
        caption: 'City park relaxation 🌳'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1684568519316-f0fb02f7826b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYwMzExNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'GOURMET BISTRO',
        caption: 'Delicious dinner 🍽️'
      }
    ]
  }
];

// Mock route data for user's saved posts
const mockSavedRoutes: RouteData[] = [
  {
    id: '4',
    images: [
      'https://images.unsplash.com/photo-1647962431451-d0fdaf1cf21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjQyNDQxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjQyNzkwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1513061379709-ef0cd1695189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbmlnaHR8ZW58MXx8fHwxNzY0Mjg4MTkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: '5',
    images: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjBmb29kfGVufDF8fHx8MTc2NDMyODE2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1559150182-a7144f7628f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBmbG93ZXJzfGVufDF8fHx8MTc2NDMyODE2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1530406831759-15c5c0cbce8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnR8ZW58MXx8fHwxNzY0Mjk3OTkwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: '6',
    images: [
      'https://images.unsplash.com/photo-1693307458881-ab948b3c82a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwbmF0dXJlfGVufDF8fHx8MTc2NDI2MTY2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2hvcHxlbnwxfHx8fDE3NjQzMjgxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1610044847457-f6aabcbb67d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBuYXR1cmV8ZW58MXx8fHwxNzY0Mjk2ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  }
];

type FriendState = 'add' | 'pending' | 'added';

export default function UserProfile({ userId, isAuthUser = false, authUserData, userData, onBack, onViewRoute, onViewFriends, onEditProfile, onSettings, onViewNotifications, userPostedRoutes, userSavedRoutes, onEditRoute, onDeleteRoute, onRemoveSaved, friendStatus, onAddFriend }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'liked'>('posts');
  const [friendState, setFriendState] = useState<FriendState>('add');
  const [bioHeight, setBioHeight] = useState(0);
  
  // Long press and popup state
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [longPressedRoute, setLongPressedRoute] = useState<RouteData | null>(null);
  const [isEditRoutePopupOpen, setIsEditRoutePopupOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSavedRouteActionsOpen, setIsSavedRouteActionsOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  
  const user = getUserById(userId);
  
  console.log('🔴 UserProfile Debug:');
  console.log('  userId:', userId);
  console.log('  isAuthUser:', isAuthUser);
  console.log('  userData:', userData);
  console.log('  authUserData:', authUserData);
  
  // Extract first names only for display
  const getFirstName = (fullName: string) => fullName.split(' ')[0];
  
  // Simplified logic: For auth user, use authUserData. For others, use userData (which comes from App.tsx and is already correct)
  const displayName = isAuthUser 
    ? (authUserData?.name ? getFirstName(authUserData.name) : 'USER')
    : (userData?.name ? getFirstName(userData.name) : 'USER');
  const displayAvatar = isAuthUser 
    ? (authUserData?.avatar)
    : (userData?.avatar);
  const displayLocation = isAuthUser 
    ? (authUserData?.location || 'LOS ANGELES')
    : (userData?.location || 'LOS ANGELES');
  const displayBio = isAuthUser 
    ? (authUserData?.bio || '')
    : (userData?.bio || '');
  
  console.log('  Calculated displayName:', displayName);
  console.log('  Calculated displayAvatar:', displayAvatar);
  console.log('  Calculated displayLocation:', displayLocation);

  // Calculate dynamic positioning based on bio
  const hasBio = displayBio && displayBio.trim().length > 0;
  const locationTop = hasBio ? 275 + bioHeight : 255;
  const editButtonTop = locationTop + 57; // Position below location chip with proper spacing
  const addFriendButtonTop = locationTop + 57; // Same position as edit button for consistency
  const tabsTop = hasBio ? 391 + bioHeight : 391;
  const gridTop = hasBio ? 449 + bioHeight : 449;

  const handleFriendButton = () => {
    if (!onAddFriend || !userId) return;
    
    // Only allow clicking if status is 'not-friend'
    if (friendStatus === 'not-friend') {
      onAddFriend(userId);
      // Show toast confirmation
      const userName = userData?.name ? getFirstName(userData.name) : 'User';
      toast.success(`FRIEND REQUEST SENT TO ${userName.toUpperCase()}`);
    }
  };

  const renderFriendButton = () => {
    if (isAuthUser) return null;

    // Use centralized friendStatus from App.tsx
    const status = friendStatus || 'not-friend';

    if (status === 'not-friend') {
      return (
        <button 
          onClick={handleFriendButton}
          className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
        >
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="relative shrink-0 size-[34px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
              <path d={svgPathsFriend.p8147680} fill="black" />
            </svg>
          </div>
        </button>
      );
    } else if (status === 'requested') {
      return (
        <button 
          disabled
          className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] cursor-default"
        >
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="relative shrink-0 size-[23.992px]">
            <svg className="block size-full" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" fill="none"/>
              <path d="M12 7v5l3 3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      );
    } else {
      // status === 'friend'
      return (
        <button 
          disabled
          className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] cursor-default"
        >
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="relative shrink-0 size-[23.992px]">
            <svg className="block size-full" fill="none" viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="black" strokeWidth="2" fill="none"/>
              <polyline points="17 11 19 13 23 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      );
    }
  };

  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      {/* Back Button - Top Left */}
      <div className="absolute top-[28px] left-[26px] z-30">
        <button 
          onClick={onBack}
          className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
        >
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="relative shrink-0 size-[23.992px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path d={svgPathsBack.p3152c100} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                <path d="M18.9939 11.9961H4.99839" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
              </g>
            </svg>
          </div>
        </button>
      </div>

      {/* Profile Avatar - Center */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[108px] z-20">
        <div className="w-[95.998px] h-[95.998px] rounded-[24px] bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full overflow-clip rounded-[inherit] relative">
              {/* Sky gradient background */}
              <div className="absolute inset-[3.69px] bg-gradient-to-b from-[#a8d5f5] to-[#e8f4fc]">
                {/* White cloud */}
                <div className="absolute bg-white h-[15.995px] left-[28.3px] rounded-[2.06422e+07px] top-[8px] w-[31.999px]" />
                {/* Green grass */}
                <div className="absolute bg-[#90c24d] h-[29.529px] left-0 rounded-bl-[24px] rounded-br-[24px] top-[59.09px] w-[88.616px]" />
              </div>
            </div>
          )}
          <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]" />
        </div>
      </div>

      {/* Name */}
      <p className="absolute left-1/2 -translate-x-1/2 top-[217px] font-['Baloo_Tamma',sans-serif] text-[#1e1e1e] text-[22px] text-center whitespace-nowrap uppercase">
        {displayName}
      </p>

      {/* Bio - only show if exists */}
      {displayBio && (
        <p 
          className="absolute left-1/2 -translate-x-1/2 top-[255px] font-['Baloo_Tamma',sans-serif] text-[#666666] text-[14px] text-center px-6 max-w-full uppercase"
          style={{ height: 'auto', width: 'calc(100% - 48px)' }}
          ref={(ref) => ref && setBioHeight(ref.scrollHeight)}
        >
          {displayBio}
        </p>
      )}

      {/* Location Badge */}
      <div 
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: `${locationTop}px` }}
      >
        <LocationWidget location={displayLocation} />
      </div>

      {/* Top Right Button - Friends or Settings */}
      {!isAuthUser ? (
        <div className="absolute right-[26px] top-[28px] z-30">
          <button 
            onClick={() => onViewFriends?.(false)}
            className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
          >
            <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <Users size={22} strokeWidth={2.5} className="relative text-[#222222]" />
          </button>
        </div>
      ) : (
        <>
          <div className="absolute right-[26px] top-[28px] z-30">
            <button 
              onClick={onSettings}
              className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
            >
              <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
              <Settings size={22} strokeWidth={2.5} className="relative text-[#222222]" />
            </button>
          </div>
          <div className="absolute right-[82px] top-[28px] z-30">
            <button 
              onClick={() => onViewFriends?.(true)}
              className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
            >
              <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
              <Users size={22} strokeWidth={2.5} className="relative text-[#222222]" />
            </button>
          </div>
          <div className="absolute right-[138px] top-[28px] z-30">
            <button 
              onClick={onViewNotifications}
              className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
            >
              <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
              <Bell size={22} strokeWidth={2.5} className="relative text-[#222222]" />
            </button>
          </div>
        </>
      )}

      {/* Friend Management Button (Add Friend - for other users only) */}
      {!isAuthUser && (
        <div className="absolute left-[173px]" style={{ top: `${addFriendButtonTop}px` }}>
          {renderFriendButton()}
        </div>
      )}

      {/* Edit Profile Button (for auth user only) */}
      {isAuthUser && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: `${editButtonTop}px` }}>
          <button 
            onClick={onEditProfile}
            className="bg-white box-border flex items-center justify-center rounded-[16px] size-[47.994px] relative"
          >
            <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <Pencil size={20} strokeWidth={2.5} className="text-black" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div 
        className="absolute left-[118px] flex gap-[32px] items-center justify-center p-[10px]"
        style={{ top: `${tabsTop}px` }}
      >
        <button 
          onClick={() => setActiveTab('posts')}
          className={`font-['Baloo_Tamma',sans-serif] text-[18px] text-center whitespace-nowrap uppercase ${
            activeTab === 'posts' ? 'text-[#1e1e1e]' : 'text-[rgba(30,30,30,0.4)]'
          }`}
        >
          POSTS
        </button>
        <button 
          onClick={() => setActiveTab('liked')}
          className={`font-['Baloo_Tamma',sans-serif] text-[18px] text-center whitespace-nowrap uppercase ${
            activeTab === 'liked' ? 'text-[#1e1e1e]' : 'text-[rgba(30,30,30,0.4)]'
          }`}
        >
          LIKED
        </button>
      </div>

      {/* Routes Grid */}
      <div 
        className="absolute left-0 right-0"
        style={{ top: `${gridTop}px` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'posts' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'posts' ? 20 : -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-0 pb-56"
          >
            {/* Show locked state for non-friends */}
            {!isAuthUser && friendStatus !== 'friend' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-[45px]">
                {/* Lock icon */}
                <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white flex items-center justify-center mb-4">
                  <svg className="w-[48px] h-[48px]" fill="none" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="rgba(30,30,30,0.4)" strokeWidth="2" fill="none"/>
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="rgba(30,30,30,0.4)" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1.5" fill="rgba(30,30,30,0.4)"/>
                  </svg>
                </div>
                <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[rgba(30,30,30,0.4)] uppercase mb-2">
                  {friendStatus === 'requested' ? 'FRIEND REQUEST PENDING' : 'ADD FRIEND TO VIEW ROUTES'}
                </p>
                {friendStatus === 'not-friend' && (
                  <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[rgba(30,30,30,0.3)] uppercase">
                    THIS USER'S {activeTab === 'posts' ? 'POSTS' : 'LIKED ROUTES'} ARE PRIVATE
                  </p>
                )}
              </div>
            ) : (
              /* Use real data when it's auth user, otherwise use mock data */
              (() => {
                const routes = activeTab === 'posts' 
                  ? (userPostedRoutes !== undefined ? userPostedRoutes : mockPostsRoutes)
                  : (userSavedRoutes !== undefined ? userSavedRoutes : mockSavedRoutes);
                
                // Helper function to check if a route is private (has incomplete Google Places)
                const isRoutePrivate = (route: RouteData) => {
                  if (!route.steps) return false;
                  return route.steps.some(step => 
                    step.source === 'google' && step.hasUserPhoto === false
                  );
                };
                
                // Filter out private routes for non-auth users
                const visibleRoutes = isAuthUser 
                  ? routes 
                  : routes.filter(route => !isRoutePrivate(route));
                
                // Show empty state if no routes
                if (!visibleRoutes || visibleRoutes.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-12 text-center px-[45px]">
                      {/* Square tile with icon */}
                      <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white flex items-center justify-center mb-2">
                        {activeTab === 'posts' ? (
                          // Grid icon for posts
                          <svg className="w-[48px] h-[48px]" fill="none" viewBox="0 0 24 24">
                            <path d={svgPathsMap.p38e1a600} stroke="rgba(30,30,30,0.4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                            <path d="M2.99903 8.9971H20.9932" stroke="rgba(30,30,30,0.4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                            <path d="M2.99903 14.9952H20.9932" stroke="rgba(30,30,30,0.4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                            <path d="M8.9971 2.99903V20.9932" stroke="rgba(30,30,30,0.4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                            <path d="M14.9952 2.99903V20.9932" stroke="rgba(30,30,30,0.4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                          </svg>
                        ) : (
                          // Filled heart icon for saved
                          <Heart 
                            size={48}
                            className="text-[rgba(30,30,30,0.4)]"
                            fill="rgba(30,30,30,0.4)"
                            strokeWidth={0}
                          />
                        )}
                      </div>
                      <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[rgba(30,30,30,0.4)] uppercase">
                        {activeTab === 'posts' ? 'NO ROUTES YET' : 'NO LIKED ROUTES'}
                      </p>
                    </div>
                  );
                }
                
                return visibleRoutes.map((route, idx) => {
                  // Check if this route is private
                  // In liked tab, also check if the route creator is the auth user
                  const isPrivate = activeTab === 'liked' 
                    ? (route.creator?.id === authUserData?.id && isRoutePrivate(route))
                    : isRoutePrivate(route);
                  
                  // Long press handlers
                  const handleTouchStart = () => {
                    const timer = setTimeout(() => {
                      setLongPressedRoute(route);
                      if (activeTab === 'posts' && isAuthUser) {
                        setIsEditRoutePopupOpen(true);
                      } else if (activeTab === 'liked') {
                        setIsSavedRouteActionsOpen(true);
                      }
                    }, 500); // 500ms threshold
                    setLongPressTimer(timer);
                  };

                  const handleTouchEnd = () => {
                    if (longPressTimer) {
                      clearTimeout(longPressTimer);
                      setLongPressTimer(null);
                    }
                  };

                  // Create handler with explicit route binding to avoid closure issues
                  const handleClickForRoute = (routeId: string, routeData: RouteData) => (e: React.MouseEvent) => {
                    // If a long press popup is open, don't navigate
                    if (isEditRoutePopupOpen || isSavedRouteActionsOpen) {
                      e.stopPropagation();
                      return;
                    }
                    onViewRoute?.(routeId, routeData);
                  };
                  
                  return (
                  <div 
                    key={route.id} 
                    className="relative h-[108px] mb-0 cursor-pointer overflow-x-auto overflow-y-visible"
                    style={{ 
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                    onClick={handleClickForRoute(route.id, route)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                    onMouseLeave={handleTouchEnd}
                  >
                    {/* Hide scrollbar */}
                    <style>{`
                      div::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>

                    {/* Inner container with padding for proper positioning */}
                    <div className="relative h-full pl-[45px] pr-[45px]" style={{ 
                      width: route.images.length <= 3 
                        ? '100%' 
                        : `calc(${route.images.length * 95.998 + (route.images.length - 1) * 8 + 90}px)` 
                    }}>
                      {/* Gray connecting bar - width based on number of steps */}
                      <div 
                        className="absolute left-[45px] top-[18px] h-[60px] bg-[#e9e9e9] rounded-[2.06422e+07px]" 
                        style={{ 
                          width: route.images.length === 1 ? '0px' : 
                                 route.images.length === 2 ? '152px' : 
                                 route.images.length === 3 ? '256px' : 
                                 `${(route.images.length - 1) * 104 + 48}px` 
                        }}
                      />

                      {/* Step thumbnails */}
                      <div className="absolute left-[45px] top-0 h-[96px]">
                        {route.images.map((image, stepIndex) => (
                          <div 
                            key={stepIndex}
                            className="absolute top-0 bg-white rounded-[20px] w-[95.998px] h-[95.998px]"
                            style={{ left: `${stepIndex * 104}px` }}
                          >
                            <div className="box-border overflow-clip p-[3.691px] relative rounded-[inherit] w-[95.998px] h-[95.998px]">
                              <ImageWithFallback 
                                src={image}
                                alt={`Step ${stepIndex + 1}`}
                                className={`w-[88.616px] h-[88.616px] object-cover ${isPrivate ? 'opacity-30' : ''}`}
                              />
                            </div>
                            {/* Private routes have light grey borders, public routes have white borders */}
                            <div 
                              aria-hidden="true" 
                              className="absolute border-8 border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]" 
                              style={{ borderColor: isPrivate ? '#d3d3d3' : 'white' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  );
                });
              })()
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Route Popup - For Posts Tab */}
      {longPressedRoute && (
        <EditRoutePopup
          isOpen={isEditRoutePopupOpen}
          onClose={() => {
            setIsEditRoutePopupOpen(false);
            setLongPressedRoute(null);
          }}
          onEdit={() => {
            setIsEditRoutePopupOpen(false);
            onEditRoute?.(longPressedRoute.id);
            setLongPressedRoute(null);
          }}
          onDelete={() => {
            setIsEditRoutePopupOpen(false);
            setIsDeleteConfirmOpen(true);
          }}
          routeImage={longPressedRoute.images[0]}
        />
      )}

      {/* Delete Confirmation Popup */}
      {longPressedRoute && (
        <DeleteConfirmationPopup
          isOpen={isDeleteConfirmOpen}
          onClose={() => {
            setIsDeleteConfirmOpen(false);
            setLongPressedRoute(null);
          }}
          onConfirm={() => {
            setIsDeleteConfirmOpen(false);
            onDeleteRoute?.(longPressedRoute.id);
            setLongPressedRoute(null);
          }}
          routeTitle={longPressedRoute.title || 'this route'}
        />
      )}

      {/* Saved Route Actions Popup - For Saved Tab */}
      {longPressedRoute && (
        <SavedRouteActionsPopup
          isOpen={isSavedRouteActionsOpen}
          onClose={() => {
            setIsSavedRouteActionsOpen(false);
            setLongPressedRoute(null);
          }}
          onShare={() => {
            setIsSavedRouteActionsOpen(false);
            setIsShareSheetOpen(true);
          }}
          onRemove={() => {
            setIsSavedRouteActionsOpen(false);
            onRemoveSaved?.(longPressedRoute.id);
            setLongPressedRoute(null);
          }}
          routeImage={longPressedRoute.images[0]}
        />
      )}

      {/* Share Bottom Sheet */}
      {longPressedRoute && (
        <ShareBottomSheet
          isOpen={isShareSheetOpen}
          onClose={() => {
            setIsShareSheetOpen(false);
            setLongPressedRoute(null);
          }}
          routeId={longPressedRoute.id}
          routeTitle={longPressedRoute.title || ''}
        />
      )}
    </div>
  );
}