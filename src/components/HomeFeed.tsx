import { useState, useRef, useEffect } from 'react';
import { Heart, Pencil } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import svgPaths from '../imports/svg-x7toy1cpt6';
import svgPathsHome from '../imports/svg-rauyrl11oe';
import svgPathsSearch from '../imports/svg-sgz91c5j7s';
import StepBar from './StepBar';
import imgProfilePicture from 'figma:asset/9844bfd977f4f5988b484778db92f0fb779ff0dc.png';
import ShareBottomSheet from './ShareBottomSheet';
import RouteSettingsBottomSheet from './RouteSettingsBottomSheet';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Step {
  id: string;
  image: string;
  location: string;
  caption?: string;
  photos?: string[]; // Multiple photos per step
  source?: 'user' | 'google'; // Source of the step
  hasUserPhoto?: boolean; // True if user has added their own photos
}

interface Route {
  id: string;
  creator: {
    id: string;
    name?: string;
    avatar: string;
    city?: string;
  };
  mainImage: string;
  location: string;
  steps: Step[];
  isLiked: boolean;
  title?: string;
}

// Mock routes for the feed (will show multiple routes when swiping)
const mockRoutes: Route[] = [
  {
    id: '1',
    creator: {
      id: 'user1',
      name: 'MAYA',
      avatar: 'https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Nzc4ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Brooklyn'
    },
    title: 'COFFEE & ART TOUR',
    mainImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'THE MANOR HOUSE',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'THE MANOR HOUSE',
        caption: 'MORNING COFFEE ☕',
        photos: [
          'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
        ]
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzYzNTM0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'CENTRAL PARK GARDENS',
        caption: 'PARK WALK 🌳'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYzNTQ0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'BELLA VISTA RESTAURANT',
        caption: 'DINNER 🍽️',
        photos: [
          'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYzNTQ0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
        ]
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'MODERN ART GALLERY',
        caption: 'ART GALLERY 🎨'
      }
    ],
    isLiked: false
  },
  {
    id: '2',
    creator: {
      id: 'user2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      city: 'Los Angeles'
    },
    title: 'BEACH DAY',
    mainImage: 'https://images.unsplash.com/photo-1665676357091-fd11925d2cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnJpc2UlMjBvY2VhbnxlbnwxfHx8fDE3NjU0NzMxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'GOLDEN SANDS BEACH',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1665676357091-fd11925d2cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnJpc2UlMjBvY2VhbnxlbnwxfHx8fDE3NjU0NzMxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'GOLDEN SANDS BEACH',
        caption: 'SUNRISE 🌅'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1613457869704-9bb9fb946015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwd2F2ZXN8ZW58MXx8fHwxNzY1NDczMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'SURF POINT',
        caption: 'CATCHING WAVES 🏄'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1758448786233-2051ecd150c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc3RhdXJhbnQlMjBzZWFmb29kfGVufDF8fHx8MTc2NTQ3MzExNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'OCEAN VIEW CAFE',
        caption: 'SEAFOOD LUNCH 🦞'
      }
    ],
    isLiked: false
  },
  {
    id: '3',
    creator: {
      id: 'user3',
      name: 'Sofia Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=400',
      city: 'Miami'
    },
    title: 'CITY ADVENTURE',
    mainImage: 'https://images.unsplash.com/photo-1545038503-c9afe13195d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXJrZXQlMjB2ZW5kb3JzfGVufDF8fHx8MTc2NTQ3MzExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'OLD TOWN BAZAAR',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1545038503-c9afe13195d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXJrZXQlMjB2ZW5kb3JzfGVufDF8fHx8MTc2NTQ3MzExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'OLD TOWN BAZAAR',
        caption: 'STREET MARKET 🛍️'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1563273026-d342cef8f723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NTQ1MTE0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'GRAND CATHEDRAL',
        caption: 'ARCHITECTURE 🏛️'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1623630524058-622b7fa9ecd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwY2l0eXxlbnwxfHx8fDE3NjU0NzMxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'SKY BAR',
        caption: 'ROOFTOP DRINKS 🍹'
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1688549450664-8189b4ac4751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbGlnaHRzJTIwbmlnaHR8ZW58MXx8fHwxNzY1NDAwODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'DOWNTOWN DISTRICT',
        caption: 'CITY LIGHTS ✨'
      },
      {
        id: '5',
        image: 'https://images.unsplash.com/photo-1558014356-9665ff525506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbmlnaHR8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'FOOD TRUCK ALLEY',
        caption: 'STREET FOOD 🌮'
      }
    ],
    isLiked: false
  },
  {
    id: '4',
    creator: {
      id: 'user4',
      name: 'James Thompson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      city: 'Portland'
    },
    title: 'NATURE ESCAPE',
    mainImage: 'https://images.unsplash.com/photo-1563141415-2ae640ce9c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjB0cmFpbCUyMGZvcmVzdHxlbnwxfHx8fDE3NjUzNzc4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'PINE VALLEY TRAIL',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1563141415-2ae640ce9c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjB0cmFpbCUyMGZvcmVzdHxlbnwxfHx8fDE3NjUzNzc4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'PINE VALLEY TRAIL',
        caption: 'FOREST HIKE 🌲'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1704292224507-a2f80036cf1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bW1pdCUyMHZpZXd8ZW58MXx8fHwxNjczMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        location: 'EAGLE PEAK',
        caption: 'SUMMIT VIEW 🏔️'
      }
    ],
    isLiked: false
  }
];

interface HomeFeedProps {
  onStartTracking?: (routeId: string) => void;
  onOpenMap?: (routeId: string, stepIndex: number) => void;
  onOpenSearch?: () => void;
  onViewProfile?: (userId: string, isAuthUser: boolean, userAvatar?: string) => void;
  onCapture?: () => void;
  initialRouteId?: string;
  initialStepIndex?: number;
  selectedRouteData?: {
    id: string;
    creator: {
      id: string;
      name?: string;
      avatar: string;
      city?: string;
    };
    mainImage?: string;
    location: string;
    steps: {
      id: string;
      image: string;
      location: string;
      caption?: string;
    }[];
    title?: string;
  };
  authUserData?: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    location: string;
  };
  isSoundEnabled?: boolean;
  onToggleSound?: () => void;
  onLikeRoute?: (route: {
    id: string;
    creator: {
      name?: string;
      avatar: string;
      city?: string;
    };
    title?: string;
    mainImage?: string;
    location: string;
    steps: {
      id: string;
      image: string;
      location: string;
      caption?: string;
    }[];
    isLiked: boolean;
  }) => void;
  savedRouteIds?: string[];
  profileRouteViewMode?: {
    creatorId: string;
    creatorRoutes: Array<{
      id: string;
      creator: {
        id: string;
        name: string;
        avatar: string;
        city: string;
      };
      title: string;
      steps: Array<{
        id: string;
        image: string;
        location: string;
        caption: string;
      }>;
      likes?: number;
      comments?: number;
      isLiked?: boolean;
      isSaved?: boolean;
    }>;
  } | null;
  onBackFromProfileRoutes?: () => void;
  onOpenCreate?: () => void;
  onEditRoute?: (routeId: string) => void;
  onDeleteRoute?: (routeId: string) => void;
  onNavigateToMapWithPlace?: (placeLocation: string) => void;
  hideTopUI?: boolean; // Hide top UI elements during view preference overlay
  hideViewSwitcher?: boolean; // Hide only the view switcher during hero animation
}

function AddIcon() {
  return (
    <div className="relative shrink-0 size-[34px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g>
          <path d={svgPathsHome.p8147680} fill="var(--fill-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-[23.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPathsSearch.p468a980} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d={svgPathsSearch.p1cb43700} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

export default function HomeFeed({ onStartTracking, onOpenMap, onOpenSearch, onViewProfile, onCapture, initialRouteId, initialStepIndex, selectedRouteData, authUserData, isSoundEnabled = true, onToggleSound, onLikeRoute, savedRouteIds = [], profileRouteViewMode, onBackFromProfileRoutes, onOpenCreate, onEditRoute, onDeleteRoute, onNavigateToMapWithPlace, hideTopUI, hideViewSwitcher }: HomeFeedProps = {}) {
  // Get friend IDs from auth user data
  const authUserFriends = ['user1', '2', '3']; // Hardcoded based on mock data

  // If in profile route view mode, use only creator's routes
  // Otherwise, if selectedRouteData is provided, prepend it to filtered routes
  const initialRoutes = profileRouteViewMode 
    ? profileRouteViewMode.creatorRoutes.map(r => ({
        id: r.id,
        creator: r.creator,
        mainImage: r.steps[0]?.image || '',
        location: r.steps[0]?.location || '',
        steps: r.steps,
        isLiked: r.isLiked || false,
        title: r.title
      }))
    : selectedRouteData ? [{
        id: selectedRouteData.id,
        creator: selectedRouteData.creator,
        mainImage: selectedRouteData.steps[0]?.image || selectedRouteData.mainImage || '',
        location: selectedRouteData.location,
        steps: selectedRouteData.steps,
        isLiked: false,
        title: selectedRouteData.title
      }, ...mockRoutes] : mockRoutes;
  
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [selectedStepIndex, setSelectedStepIndex] = useState(initialStepIndex || 0);
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | null>(null);
  const previousRouteIndex = useRef(currentRouteIndex);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [routeSettingsStepIndex, setRouteSettingsStepIndex] = useState<number | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Index within the currently selected step's photos array
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isEditRoutePopupOpen, setIsEditRoutePopupOpen] = useState(false);

  // When selectedRouteData changes, find its index in the routes array and set currentRouteIndex
  useEffect(() => {
    if (selectedRouteData && selectedRouteData.id) {
      const routeIndex = routes.findIndex(r => r.id === selectedRouteData.id);
      if (routeIndex !== -1) {
        setCurrentRouteIndex(routeIndex);
      }
    }
  }, [selectedRouteData?.id, routes]);

  // Sync step index when initialStepIndex prop changes (coming back from map view)
  useEffect(() => {
    if (initialStepIndex !== undefined) {
      setSelectedStepIndex(initialStepIndex);
      setCurrentPhotoIndex(0); // Reset to first photo when changing steps
    }
  }, [initialStepIndex]);

  // Reset step index and photo index when route changes (but not on initial mount or when coming back from map)
  useEffect(() => {
    if (currentRouteIndex !== previousRouteIndex.current) {
      setSelectedStepIndex(0);
      setCurrentPhotoIndex(0);
      previousRouteIndex.current = currentRouteIndex;
    }
  }, [currentRouteIndex]);

  const currentRoute = routes[currentRouteIndex];
  
  // Check if the current user is the creator of the current route
  const isCreator = currentRoute && authUserData && currentRoute.creator.id === authUserData.id;

  // Build a flat array of all photos with their step indices for navigation
  const allPhotos: Array<{ stepIndex: number; photoIndex: number; imageUrl: string; location: string }> = [];
  currentRoute?.steps.forEach((step, stepIdx) => {
    if (step.photos && step.photos.length > 0) {
      step.photos.forEach((photo, photoIdx) => {
        allPhotos.push({
          stepIndex: stepIdx,
          photoIndex: photoIdx,
          imageUrl: photo,
          location: step.location
        });
      });
    } else {
      // Step has only a single image
      allPhotos.push({
        stepIndex: stepIdx,
        photoIndex: 0,
        imageUrl: step.image,
        location: step.location
      });
    }
  });

  // Calculate the current global photo index
  let currentGlobalPhotoIndex = 0;
  for (let i = 0; i < selectedStepIndex; i++) {
    const step = currentRoute?.steps[i];
    if (step) {
      currentGlobalPhotoIndex += step.photos && step.photos.length > 0 ? step.photos.length : 1;
    }
  }
  currentGlobalPhotoIndex += currentPhotoIndex;

  // Get current image and location based on photo navigation
  const currentPhotoData = allPhotos[currentGlobalPhotoIndex];
  const currentImage = currentPhotoData?.imageUrl || currentRoute?.mainImage;
  const currentLocation = currentPhotoData?.location || currentRoute?.location;

  // Check if current route is saved
  const isRouteSaved = currentRoute ? savedRouteIds.includes(currentRoute.id) : false;

  // Helper function to check if a route is private (has incomplete Google Places)
  const isRoutePrivate = (route: Route) => {
    if (!route.steps) return false;
    return route.steps.some(step => 
      step.source === 'google' && step.hasUserPhoto === false
    );
  };

  // Check if current route is private
  const currentRouteIsPrivate = currentRoute ? isRoutePrivate(currentRoute) : false;

  const handleLike = () => {
    const wasLiked = isRouteSaved;
    setRoutes(routes.map(route => 
      route.id === currentRoute.id 
        ? { ...route, isLiked: !route.isLiked }
        : route
    ));
    if (onLikeRoute) {
      onLikeRoute({
        id: currentRoute.id,
        creator: currentRoute.creator,
        title: currentRoute.title,
        mainImage: currentRoute.mainImage,
        location: currentRoute.location,
        steps: currentRoute.steps,
        isLiked: !isRouteSaved // Toggle based on saved state
      });
    }
    // Show toast notification
    if (wasLiked) {
      toast.success('ROUTE REMOVED FROM SAVED');
    } else {
      toast.success('ROUTE LIKED');
    }
  };

  const handleNavigate = () => {
    if (onStartTracking) {
      onStartTracking(currentRoute.id);
    }
  };

  const handleViewProfile = () => {
    if (onViewProfile) {
      // Check if this is the auth user's route
      const isAuthUser = currentRoute.creator.id === authUserData?.id;
      
      // Pass creator ID, whether it's auth user, and avatar
      onViewProfile(currentRoute.creator.id, isAuthUser, currentRoute.creator.avatar);
    }
  };

  const handleStepClick = (index: number) => {
    setSelectedStepIndex(index);
    setCurrentPhotoIndex(0); // Always jump to first photo of the selected step
  };

  const handleMapView = () => {
    onOpenMap?.(currentRoute.id, selectedStepIndex);
  };

  // Handle left/right tap navigation through photos
  const handlePhotoNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      // Navigate to next photo
      if (currentGlobalPhotoIndex < allPhotos.length - 1) {
        const nextPhoto = allPhotos[currentGlobalPhotoIndex + 1];
        setSelectedStepIndex(nextPhoto.stepIndex);
        setCurrentPhotoIndex(nextPhoto.photoIndex);
      }
    } else {
      // Navigate to previous photo
      if (currentGlobalPhotoIndex > 0) {
        const prevPhoto = allPhotos[currentGlobalPhotoIndex - 1];
        setSelectedStepIndex(prevPhoto.stepIndex);
        setCurrentPhotoIndex(prevPhoto.photoIndex);
      }
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocityThreshold = 500;

    // Vertical swipe detection
    if (Math.abs(info.offset.y) > swipeThreshold || Math.abs(info.velocity.y) > swipeVelocityThreshold) {
      if (info.offset.y < 0) {
        // Swiped up - go to next route
        if (currentRouteIndex < routes.length - 1) {
          setSwipeDirection('up');
          setTimeout(() => {
            setCurrentRouteIndex(prev => prev + 1);
            setSwipeDirection(null);
          }, 100);
        }
      } else {
        // Swiped down - go to previous route
        if (currentRouteIndex > 0) {
          setSwipeDirection('down');
          setTimeout(() => {
            setCurrentRouteIndex(prev => prev - 1);
            setSwipeDirection(null);
          }, 100);
        }
      }
    }
  };

  if (!currentRoute) {
    return <div className="relative h-full w-full overflow-hidden bg-black flex items-center justify-center text-white">No routes available</div>;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Back Button - Only show in profile route view mode */}
      {profileRouteViewMode && onBackFromProfileRoutes && (
        <button
          onClick={onBackFromProfileRoutes}
          className="absolute bg-white box-border content-stretch flex items-center justify-center left-[26px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[28px] z-30 active:scale-95 transition-transform"
        >
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="relative shrink-0 size-[23.992px]">
            <svg className="block size-full" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </div>
        </button>
      )}

      {/* Right Sidebar */}
      {!hideTopUI && (
        <div className="absolute right-[26px] top-[28px] flex flex-col gap-[11.996px] z-20">
          {/* Create Button */}
          <button 
            onClick={onOpenCreate}
            className="relative bg-[#1abb6c] box-border content-stretch flex items-center justify-center rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.994px] active:scale-95 transition-transform"
          >
            <AddIcon />
          </button>

          {/* Profile Picture Button */}
          <button 
            onClick={() => onViewProfile?.('auth', true)}
            className="w-[47.994px] h-[47.994px] rounded-[16px] overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform border-[3.691px] border-[#e9e9e9] bg-white"
          >
            <div className="w-full h-full overflow-hidden rounded-[12.303px]">
              <ImageWithFallback 
                src={authUserData?.avatar || imgProfilePicture}
                alt="My Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      )}

      {/* View Switcher - Top Center */}
      {!hideTopUI && !hideViewSwitcher && (
        <div className="absolute left-[50%] translate-x-[-50%] top-[28px] z-20">
          <div className="bg-white rounded-[16px] px-[8px] py-[6px] flex items-center gap-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] h-[47.994px]">
            {/* Grid View Button - Active */}
            <motion.button 
              initial={false}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center"
            >
              <motion.svg 
                initial={false}
                animate={{ 
                  scale: 1,
                  opacity: 1
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-[24px] h-[24px]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="black" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </motion.svg>
            </motion.button>

            {/* Map View Button - Inactive */}
            <motion.button 
              onClick={handleMapView}
              initial={false}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center"
            >
              <motion.svg 
                initial={false}
                animate={{ 
                  scale: 0.9,
                  opacity: 0.3
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-[24px] h-[24px]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="black" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" y1="3" x2="9" y2="18"/>
                <line x1="15" y1="6" x2="15" y2="21"/>
              </motion.svg>
            </motion.button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoute.id}
          initial={{ 
            opacity: 0, 
            y: swipeDirection === 'up' ? 50 : swipeDirection === 'down' ? -50 : 0
          }}
          animate={{ 
            opacity: 1, 
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            y: swipeDirection === 'up' ? -50 : swipeDirection === 'down' ? 50 : 0
          }}
          transition={{ 
            duration: 0.35, 
            ease: [0.4, 0.0, 0.2, 1]
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 select-none"
          style={{ touchAction: 'none' }}
        >
          {/* Main Image with Gradient */}
          <div className="absolute inset-0">
            <ImageWithFallback 
              src={currentImage} 
              alt="Route"
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute left-0 w-full pointer-events-none bottom-0"
              style={{
                height: '350px',
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.95) 100%)'
              }}
            />
            
            {/* Left Tap Zone - Navigate to previous photo - Only on the image area, not covering bottom UI */}
            <button
              onClick={() => handlePhotoNavigation('prev')}
              className="absolute left-0 top-0 w-1/2 z-[15]"
              style={{ height: '600px', background: 'transparent' }}
              aria-label="Previous photo"
            />
            
            {/* Right Tap Zone - Navigate to next photo - Only on the image area, not covering bottom UI */}
            <button
              onClick={() => handlePhotoNavigation('next')}
              className="absolute right-0 top-0 w-1/2 z-[15]"
              style={{ height: '600px', background: 'transparent' }}
              aria-label="Next photo"
            />
          </div>

          {/* Location Text Above Action Buttons */}
          {!hideTopUI && (
            <div className="absolute left-[34px] top-[624px] z-20 flex items-center gap-[8px] pointer-events-none">
              <svg className="w-[24px] h-[24px] flex-shrink-0" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-white uppercase leading-[1] tracking-[0.02em] translate-y-[1px]">
                {currentLocation}
              </span>
            </div>
          )}

          {/* Bottom Fixed Elements: Creator Profile Button + Like Button + Share Button */}
          {!hideTopUI && (
            <div className="absolute left-[34px] top-[656px] z-20 flex items-center gap-[7px] border-none pointer-events-auto">
              {/* Creator Profile Picture Button */}
              <button 
                onClick={handleViewProfile}
                className="w-[47.994px] h-[47.994px] rounded-[16px] overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform bg-white flex-shrink-0 border-[3.691px] border-[#e9e9e9]"
              >
                <img
                  src={currentRoute.creator.avatar}
                  alt="Creator"
                  className="w-full h-full object-cover rounded-[12.303px]"
                />
              </button>

              {/* Like Button */}
              <button 
                onClick={handleLike}
                className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform flex-shrink-0 border-[3.691px] border-[#e9e9e9]"
              >
                <Heart 
                  size={22}
                  className={isRouteSaved ? 'fill-red-500 text-red-500' : 'fill-[#e9e9e9] text-[#e9e9e9]'}
                  strokeWidth={0}
                />
              </button>

              {/* Share Button */}
              <button 
                disabled={currentRouteIsPrivate}
                className={`w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex-shrink-0 border-[3.691px] border-[#e9e9e9] ${currentRouteIsPrivate ? 'opacity-40 cursor-not-allowed' : 'active:scale-95 transition-transform'}`}
                onClick={() => {
                  if (!currentRouteIsPrivate) {
                    setIsShareSheetOpen(true);
                  }
                }}
              >
                <svg className={`w-5 h-5`} viewBox="0 0 24 24" fill="none" stroke={currentRouteIsPrivate ? 'rgba(0,0,0,0.3)' : 'black'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>

              {/* Edit Button - Only show if current user is the creator */}
              {isCreator && (
                <button 
                  className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform flex-shrink-0 border-[3.691px] border-[#e9e9e9]"
                  onClick={() => {
                    // Open route settings with first step to show edit button
                    setRouteSettingsStepIndex(0);
                  }}
                >
                  <Pencil size={20} strokeWidth={2.5} className="text-black" />
                </button>
              )}
            </div>
          )}

          {/* Bottom Step Bar */}
          {!hideTopUI && (
            <div className="absolute left-0 top-[716px] w-full z-10 pointer-events-auto">
              <StepBar
                steps={currentRoute.steps}
                selectedStepIndex={selectedStepIndex}
                onStepClick={handleStepClick}
                onNavigateClick={handleNavigate}
                onStepLongPress={(index) => {
                  setRouteSettingsStepIndex(index);
                }}
                mode="browseRoute"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Share Bottom Sheet */}
      <ShareBottomSheet
        isOpen={isShareSheetOpen}
        onClose={() => setIsShareSheetOpen(false)}
        routeId={currentRoute.id}
        routeTitle={currentRoute.title || ''}
      />

      {/* Route Settings Bottom Sheet */}
      {routeSettingsStepIndex !== null && (
        <RouteSettingsBottomSheet
          isOpen={true}
          onClose={() => setRouteSettingsStepIndex(null)}
          step={currentRoute.steps[routeSettingsStepIndex]}
          isCreator={currentRoute.creator.id === authUserData?.id}
          onEditRoute={() => {
            setRouteSettingsStepIndex(null);
            onEditRoute?.(currentRoute.id);
          }}
          onDeleteRoute={() => {
            setRouteSettingsStepIndex(null);
            setIsDeleteConfirmOpen(true);
          }}
          onViewLocation={() => {
            // Navigate to map view and show this location
            handleMapView();
          }}
          onNavigateToMapWithPlace={(location) => {
            onNavigateToMapWithPlace?.(location);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {isCreator && (
        <DeleteConfirmationPopup
          isOpen={isDeleteConfirmOpen}
          onClose={() => setIsDeleteConfirmOpen(false)}
          onConfirm={() => {
            setIsDeleteConfirmOpen(false);
            onDeleteRoute?.(currentRoute.id);
            toast.success('Route deleted successfully!');
          }}
          routeTitle={currentRoute.title}
        />
      )}
    </div>
  );
}
