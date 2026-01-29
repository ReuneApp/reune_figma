import { useState, useEffect } from 'react';
import { Heart, Pencil, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-sgz91c5j7s';
import svgPathsRoute from '../imports/svg-9bkikcqlfp';
import imgProfilePicture from 'figma:asset/9844bfd977f4f5988b484778db92f0fb779ff0dc.png';
import imgStep1 from 'figma:asset/64c50f1b0e9d3f0bc87b205f55019d384dc33f1b.png';
import imgStep2 from 'figma:asset/81405a6094906e7727c5de1bae45c613daf5bc87.png';
import imgStep3 from 'figma:asset/d01cdd61cfac888c5435ea927930789313267c30.png';
import imgMapBackground from 'figma:asset/f35766008df8a1ef91b59bf807a486f005c0be78.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import StepBar from './StepBar';
import EditRoutePopup from './EditRoutePopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import ShareBottomSheet from './ShareBottomSheet';
import PlaceSelectionUI from './PlaceSelectionUI';
import PlaceGalleryPopup from './PlaceGalleryPopup';
import RouteSettingsBottomSheet from './RouteSettingsBottomSheet';
import { toast } from 'sonner@2.0.3';

interface MapProps {
  onBack?: () => void;
  onSearch?: () => void;
  onViewProfile?: (userId: string, isAuthUser: boolean, userAvatar?: string) => void;
  onCapture?: () => void;
  onNavigate?: (routeData: {
    id: string;
    title: string;
    steps: Array<{
      image: string;
      caption: string;
      location: string;
    }>;
  }) => void;
  onPostView?: (routeId: string, stepIndex: number) => void; // New prop for navigating to post view with route and step
  initialSelectedRouteId?: string | null; // New prop for initial selected route
  initialSelectedStepIndex?: number; // New prop for initial selected step index
  initialPlaceLocation?: string | null; // New prop for initial place location
  authUserData?: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    location: string;
  };
  onLikeRoute?: (route: {
    id: string;
    creator: {
      name?: string;
      avatar: string;
      city?: string;
    };
    title: string;
    mainImage: string;
    location: string;
    steps: {
      image: string;
      location: string;
      caption?: string;
    }[];
    isLiked: boolean;
  }) => void;
  savedRouteIds?: string[];
  isSoundEnabled?: boolean;
  onToggleSound?: () => void;
  onEditRoute?: (routeId: string) => void;
  onDeleteRoute?: (routeId: string) => void;
  hideTopUI?: boolean; // Hide top UI elements during view preference overlay
  hideViewSwitcher?: boolean; // Hide only the view switcher during hero animation
}

function SkyGrassAvatar({ isSelected, onClick, imageSrc }: { isSelected?: boolean; onClick?: () => void; imageSrc: string }) {
  return (
    <button onClick={onClick} className="bg-white h-[95.998px] relative rounded-[24px] shrink-0 w-full active:scale-95 transition-transform">
      <div className="h-[95.998px] overflow-clip relative rounded-[inherit] w-full">
        <img 
          src={imageSrc}
          alt="Route"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div aria-hidden="true" className={`absolute border-8 border-solid ${isSelected ? 'border-[#1abb6c]' : 'border-white'} inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]`} />
    </button>
  );
}

function SkyGrassAvatarSmall({ isSelected, onClick, imageSrc }: { isSelected?: boolean; onClick?: () => void; imageSrc: string }) {
  return (
    <button onClick={onClick} className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full active:scale-95 transition-transform">
      <div className="h-[48px] overflow-clip relative rounded-[inherit] w-full">
        <img 
          src={imageSrc}
          alt="Place"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div aria-hidden="true" className={`absolute border-[3.691px] border-solid ${isSelected ? 'border-[#1abb6c]' : 'border-[#e9e9e9]'} inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)]`} />
    </button>
  );
}

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-[23.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p468a980} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d={svgPaths.p1cb43700} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

function GridIcon() {
  return (
    <div className="relative shrink-0 size-[23.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p38e1a600} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M2.99903 8.9971H20.9932" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M2.99903 14.9952H20.9932" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M8.9971 2.99903V20.9932" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M14.9952 2.99903V20.9932" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

function AddIcon() {
  return (
    <div className="relative shrink-0 size-[34px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g>
          <path d={svgPaths.p8147680} fill="var(--fill-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[34px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g>
          <path d={svgPathsRoute.pc263700} fill="var(--fill-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function NavigateIcon() {
  return (
    <div className="relative shrink-0 size-[34px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g>
          <path d={svgPathsRoute.p3b0600} fill="var(--fill-0, #E8F4FC)" />
        </g>
      </svg>
    </div>
  );
}

export default function Map({ onBack, onSearch, onViewProfile, onCapture, onNavigate, onPostView, initialSelectedRouteId, initialSelectedStepIndex = 0, initialPlaceLocation, authUserData, onLikeRoute, savedRouteIds = [], isSoundEnabled, onToggleSound, onEditRoute, onDeleteRoute, hideTopUI, hideViewSwitcher }: MapProps) {
  const [selectedMarker, setSelectedMarker] = useState<{ index: number; type: 'route' | 'place' } | null>(null);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [likedPlaces, setLikedPlaces] = useState<string[]>([]);
  const [isEditRoutePopupOpen, setIsEditRoutePopupOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isShareBottomSheetOpen, setIsShareBottomSheetOpen] = useState(false);
  const [visibleStepCount, setVisibleStepCount] = useState<number>(0); // Track how many steps are visible
  const [isPlaceGalleryOpen, setIsPlaceGalleryOpen] = useState(false);
  const [routeSettingsStepIndex, setRouteSettingsStepIndex] = useState<number | null>(null);
  const [singleStepViewMode, setSingleStepViewMode] = useState(false); // Track if we're viewing a single step like a place
  const [isSearchActive, setIsSearchActive] = useState(false); // Track if search bar is active
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Track if search input is focused
  const [searchQuery, setSearchQuery] = useState(''); // Track search input
  const [searchHistory, setSearchHistory] = useState<string[]>([]); // Track search history
  const [isSearchSheetExpanded, setIsSearchSheetExpanded] = useState(false); // Track if search sheet is expanded

  // Load liked places from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('likedPlaces');
    if (stored) {
      setLikedPlaces(JSON.parse(stored));
    }
  }, []);

  // Load search history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('reuneMapSearchHistory');
    if (stored) {
      setSearchHistory(JSON.parse(stored));
    }
  }, []);

  // Toggle place like
  const handlePlaceLike = (placeId: string) => {
    const newLikedPlaces = likedPlaces.includes(placeId)
      ? likedPlaces.filter(id => id !== placeId)
      : [...likedPlaces, placeId];
    setLikedPlaces(newLikedPlaces);
    localStorage.setItem('likedPlaces', JSON.stringify(newLikedPlaces));
  };

  // Mock search results - London places
  const mockSearchResults = [
    {
      id: 'place-1',
      name: 'TOWER BRIDGE',
      type: 'LANDMARK',
      distance: '0.5MI',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
    },
    {
      id: 'place-2',
      name: 'THE BLUE CAFE',
      type: 'COFFEE SHOP',
      distance: '0.8MI',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400',
    },
    {
      id: 'place-3',
      name: 'HYDE PARK',
      type: 'PARK',
      distance: '1.2MI',
      image: 'https://images.unsplash.com/photo-1667757526327-dbe1edd781d2?w=400',
    },
    {
      id: 'place-4',
      name: 'COVENT GARDEN',
      type: 'DISTRICT',
      distance: '1.5MI',
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400',
    },
    {
      id: 'place-5',
      name: 'BOROUGH MARKET',
      type: 'MARKET',
      distance: '1.8MI',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    },
    {
      id: 'place-6',
      name: 'SKY GARDEN',
      type: 'VIEWPOINT',
      distance: '2.1MI',
      image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400',
    },
    {
      id: 'place-7',
      name: 'CAMDEN MARKET',
      type: 'MARKET',
      distance: '2.4MI',
      image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400',
    },
    {
      id: 'place-8',
      name: 'SHOREDITCH',
      type: 'NEIGHBORHOOD',
      distance: '2.7MI',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400',
    },
  ];

  // Filter search results based on query
  const filteredSearchResults = searchQuery.trim() 
    ? mockSearchResults.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Handle search submission
  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      const newHistory = [query.trim(), ...searchHistory.filter(h => h !== query.trim())].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('reuneMapSearchHistory', JSON.stringify(newHistory));
    }
  };

  // Define all routes with varying step counts
  const routes = [
    {
      id: '1',
      title: 'COFFEE & ART TOUR',
      creator: {
        id: 'user1',
        name: 'EMMA',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwcm9maWxlfGVufDF8fHx8MTc2MDQ0NjAyM3ww&ixlib=rb-4.1.0&q=80&w=400',
        city: 'Brooklyn'
      },
      markerImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      steps: [
        {
          image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          caption: 'MORNING COFFEE AT THIS AMAZING LOCAL SPOT ☕',
          location: 'THE MANOR HOUSE',
          photos: [
            'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNTE5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
          ]
        },
        {
          image: 'https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzYzNTM0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
          caption: 'BEAUTIFUL PARK WALK 🌳',
          location: 'CENTRAL PARK GARDENS',
          photos: ['https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzYzNTM0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080']
        },
        {
          image: 'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYzNTQ0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
          caption: 'AMAZING DINNER 🍽️',
          location: 'BELLA VISTA RESTAURANT',
          photos: [
            'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYzNTQ0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
          ]
        },
        {
          image: 'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
          caption: 'ART GALLERY EXPLORATION 🎨',
          location: 'MODERN ART GALLERY',
          photos: ['https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=1080']
        }
      ]
    },
    {
      id: '2',
      title: 'BEACH DAY',
      creator: {
        id: 'user2',
        name: 'MARCUS',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
        city: 'Downtown LA'
      },
      markerImage: 'https://images.unsplash.com/photo-1665676357091-fd11925d2cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnJpc2UlMjBvY2VhbnxlbnwxfHx8fDE3NjU0NzMxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      steps: [
        {
          image: 'https://images.unsplash.com/photo-1665676357091-fd11925d2cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnJpc2UlMjBvY2VhbnxlbnwxfHx8fDE3NjU0NzMxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'SUNRISE AT THE BEACH 🌅',
          location: 'GOLDEN SANDS BEACH'
        },
        {
          image: 'https://images.unsplash.com/photo-1613457869704-9bb9fb946015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwd2F2ZXN8ZW58MXx8fHwxNzY1NDczMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'CATCHING WAVES 🏄',
          location: 'SURF POINT'
        },
        {
          image: 'https://images.unsplash.com/photo-1758448786233-2051ecd150c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc3RhdXJhbnQlMjBzZWFmb29kfGVufDF8fHx8MTc2NTQ3MzExNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'FRESH SEAFOOD LUNCH 🦞',
          location: 'OCEAN VIEW CAFE'
        }
      ]
    },
    {
      id: '3',
      title: 'CITY ADVENTURE',
      creator: {
        id: 'user3',
        name: 'SOFIA',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=400',
        city: 'South Beach'
      },
      markerImage: 'https://images.unsplash.com/photo-1545038503-c9afe13195d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXJrZXQlMjB2ZW5kb3JzfGVufDF8fHx8MTc2NTQ3MzExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      steps: [
        {
          image: 'https://images.unsplash.com/photo-1545038503-c9afe13195d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXJrZXQlMjB2ZW5kb3JzfGVufDF8fHx8MTc2NTQ3MzExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'VIBRANT STREET MARKET 🛍️',
          location: 'OLD TOWN BAZAAR'
        },
        {
          image: 'https://images.unsplash.com/photo-1563273026-d342cef8f723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NTQ1MTE0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'HISTORIC ARCHITECTURE 🏛️',
          location: 'GRAND CATHEDRAL'
        },
        {
          image: 'https://images.unsplash.com/photo-1623630524058-622b7fa9ecd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwY2l0eXxlbnwxfHx8fDE3NjU0NzMxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'ROOFTOP DRINKS 🍹',
          location: 'SKY BAR'
        },
        {
          image: 'https://images.unsplash.com/photo-1688549450664-8189b4ac4751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbGlnaHRzJTIwbmlnaHR8ZW58MXx8fHwxNzY1NDAwODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'CITY LIGHTS AT NIGHT ✨',
          location: 'DOWNTOWN DISTRICT'
        },
        {
          image: 'https://images.unsplash.com/photo-1558014356-9665ff525506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbmlnaHR8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'LATE NIGHT STREET FOOD 🌮',
          location: 'FOOD TRUCK ALLEY'
        }
      ]
    },
    {
      id: '4',
      title: 'NATURE ESCAPE',
      creator: {
        id: 'user4',
        name: 'JAMES',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
        city: 'Pearl District'
      },
      markerImage: 'https://images.unsplash.com/photo-1563141415-2ae640ce9c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjB0cmFpbCUyMGZvcmVzdHxlbnwxfHx8fDE3NjUzNzc4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      steps: [
        {
          image: 'https://images.unsplash.com/photo-1563141415-2ae640ce9c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjB0cmFpbCUyMGZvcmVzdHxlbnwxfHx8fDE3NjUzNzc4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'FOREST TRAIL HIKE 🌲',
          location: 'PINE VALLEY TRAIL'
        },
        {
          image: 'https://images.unsplash.com/photo-1704292224507-a2f80036cf1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bW1pdCUyMHZpZXd8ZW58MXx8fHwxNjczMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          caption: 'SUMMIT VIEW 🏔️',
          location: 'EAGLE PEAK'
        }
      ]
    }
  ];

  // Get the current selected route
  const selectedRoute = selectedMarker?.type === 'route' ? routes[selectedMarker.index] : null;

  // Check if current route is saved
  const isRouteSaved = selectedRoute ? savedRouteIds.includes(selectedRoute.id) : false;

  // Helper function to check if a route is private (has incomplete Google Places)
  const isRoutePrivate = (route: typeof selectedRoute) => {
    if (!route || !route.steps) return false;
    return route.steps.some((step: any) => 
      step.source === 'google' && step.hasUserPhoto === false
    );
  };

  // Check if selected route is private
  const selectedRouteIsPrivate = selectedRoute ? isRoutePrivate(selectedRoute) : false;
  
  // Check if the current user is the creator of the current route
  const isCreator = selectedRoute && authUserData && selectedRoute.creator.id === authUserData.id;
  
  // Define place data for small markers
  const places = [
    {
      id: '1',
      name: 'SWEET DELIGHTS BAKERY',
      category: 'BAKERY',
      distance: '0.3 MI',
      image: 'https://images.unsplash.com/photo-1666114265205-394e9d5848c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnl8ZW58MXx8fHwxNzY0Nzg0NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      photos: [
        'https://images.unsplash.com/photo-1666114265205-394e9d5848c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnl8ZW58MXx8fHwxNzY0Nzg0NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1571157577110-493b325fdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjgzMDI5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1733714953921-dc38255ce866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMGRpc3BsYXl8ZW58MXx8fHwxNzY4MzAyOTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1568471382005-99e347e2aef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY4MzAyOTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1666114265205-394e9d5848c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnl8ZW58MXx8fHwxNzY0Nzg0NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1571157577110-493b325fdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjgzMDI5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1733714953921-dc38255ce866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMGRpc3BsYXl8ZW58MXx8fHwxNzY4MzAyOTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1568471382005-99e347e2aef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY4MzAyOTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1666114265205-394e9d5848c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnl8ZW58MXx8fHwxNzY0Nzg0NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ]
    },
    {
      id: '2',
      name: 'MOONLIGHT COCKTAIL BAR',
      category: 'COCKTAIL BAR',
      distance: '0.8 MI',
      image: 'https://images.unsplash.com/photo-1605270012917-bf157c5a9541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXIlMjBkcmlua3N8ZW58MXx8fHwxNzY0ODYzNzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      photos: [
        'https://images.unsplash.com/photo-1605270012917-bf157c5a9541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXIlMjBkcmlua3N8ZW58MXx8fHwxNzY0ODYzNzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1676475061702-c83659cd90ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhciUyMG5pZ2h0fGVufDF8fHx8MTc2ODI1MjQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1580775174971-149b403a7e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2ODMwMjk2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1593060190480-7823e800e645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJ0ZW5kZXIlMjBtaXhpbmclMjBkcmlua3N8ZW58MXx8fHwxNzY4MzAyOTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1605270012917-bf157c5a9541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXIlMjBkcmlua3N8ZW58MXx8fHwxNzY0ODYzNzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1676475061702-c83659cd90ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhciUyMG5pZ2h0fGVufDF8fHx8MTc2ODI1MjQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1580775174971-149b403a7e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2ODMwMjk2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ]
    }
  ];

  // Get the current selected place
  const selectedPlace = selectedMarker?.type === 'place' ? places[selectedMarker.index - 4] : null;

  // Set initial selected marker based on route ID from home feed
  useEffect(() => {
    if (initialSelectedRouteId) {
      // Find the route index based on the route ID
      const routeIndex = routes.findIndex(route => route.id === initialSelectedRouteId);
      if (routeIndex !== -1) {
        setSelectedMarker({ index: routeIndex, type: 'route' });
        // Set the initial step index from the post view
        setSelectedStepIndex(initialSelectedStepIndex);
      }
    }
  }, [initialSelectedRouteId, initialSelectedStepIndex]);

  // Set initial selected marker based on place location from bottom sheet
  useEffect(() => {
    if (initialPlaceLocation) {
      // Try to find a place that matches the location name
      const placeIndex = places.findIndex(place => 
        place.name.toUpperCase() === initialPlaceLocation.toUpperCase()
      );
      
      if (placeIndex !== -1) {
        // Places start at index 4 in the marker system (after 4 routes)
        setSelectedMarker({ index: placeIndex + 4, type: 'place' });
        setSingleStepViewMode(false);
      } else {
        // If no place found, check if it matches a route step location
        for (let i = 0; i < routes.length; i++) {
          const stepIndex = routes[i].steps.findIndex(step => 
            step.location.toUpperCase() === initialPlaceLocation.toUpperCase()
          );
          if (stepIndex !== -1) {
            // Select the route and the specific step in single step view mode
            setSelectedMarker({ index: i, type: 'route' });
            setSelectedStepIndex(stepIndex);
            setSingleStepViewMode(true); // Enable single step view mode
            break;
          }
        }
      }
    }
  }, [initialPlaceLocation]);

  // Incremental step marker animation when route is selected
  useEffect(() => {
    if (selectedMarker?.type === 'route') {
      const route = routes[selectedMarker.index];
      if (route) {
        // Reset visible step count when a new route is selected
        setVisibleStepCount(0);
        
        // Show steps incrementally with 250ms delay
        const totalSteps = route.steps.length;
        const timeouts: NodeJS.Timeout[] = [];
        
        for (let i = 0; i < totalSteps; i++) {
          const timeout = setTimeout(() => {
            setVisibleStepCount(i + 1);
          }, i * 250); // 250ms delay between each step (50% faster than 500ms)
          
          timeouts.push(timeout);
        }
        
        // Cleanup timeouts on unmount or when route changes
        return () => {
          timeouts.forEach(timeout => clearTimeout(timeout));
        };
      }
    } else {
      // Reset when no route is selected
      setVisibleStepCount(0);
    }
  }, [selectedMarker]);

  const handleMarkerClick = (index: number, type: 'route' | 'place') => {
    if (selectedMarker?.index === index && selectedMarker?.type === type) {
      // If clicking same marker, deselect it
      setSelectedMarker(null);
    } else {
      setSelectedMarker({ index, type });
    }
  };

  const handleCloseRoute = () => {
    setSelectedMarker(null);
    setSelectedStepIndex(0);
  };

  // Generate random positions for step markers (for demo purposes)
  const stepMarkerPositions = [
    { left: 106, top: 150 },
    { left: 250, top: 200 },
    { left: 80, top: 350 },
    { left: 200, top: 420 },
    { left: 290, top: 300 }
  ];

  const handleStepMarkerClick = (stepIndex: number) => {
    setSelectedStepIndex(stepIndex);
  };

  const handleLike = () => {
    if (selectedRoute) {
      onLikeRoute?.((({
        id: selectedRoute.id,
        creator: {
          name: authUserData?.name,
          avatar: authUserData?.avatar || '',
          city: authUserData?.location
        },
        title: selectedRoute.title,
        mainImage: selectedRoute.markerImage,
        location: selectedRoute.steps[0].location,
        steps: selectedRoute.steps.map((step, index) => ({
          id: `${selectedRoute.id}-step-${index}`,
          image: step.image,
          location: step.location,
          caption: step.caption
        })),
        isLiked: !isRouteSaved  // Toggle the state - if saved, unsave it; if not saved, save it
      }) as any));
      // Show toast notification
      const wasLiked = isRouteSaved;
      if (wasLiked) {
        toast.success('ROUTE REMOVED FROM SAVED');
      } else {
        toast.success('ROUTE LIKED');
      }
    }
  };

  return (
    <div className="bg-white h-full overflow-clip relative w-full">
      {/* Google Maps Background */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={imgMapBackground} 
          alt="Map background" 
          className="w-full h-full object-cover"
        />
        {/* Dimming overlay for better contrast */}
        <div className="absolute inset-0 bg-black/5" />
      </div>
      {/* Markers - Large avatars - Only show when no route is selected */}
      {!isSearchActive && !selectedRoute && (
        <>
          <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-[197px] top-[88px] w-[95.998px]">
            <SkyGrassAvatar onClick={() => handleMarkerClick(0, 'route')} isSelected={selectedMarker?.index === 0 && selectedMarker?.type === 'route'} imageSrc={routes[0].markerImage} />
          </div>
          
          <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-[81.92px] top-[291.82px] w-[95.998px]">
            <SkyGrassAvatar onClick={() => handleMarkerClick(1, 'route')} isSelected={selectedMarker?.index === 1 && selectedMarker?.type === 'route'} imageSrc={routes[1].markerImage} />
          </div>
          
          <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-[255.16px] top-[351.5px] w-[95.998px]">
            <SkyGrassAvatar onClick={() => handleMarkerClick(2, 'route')} isSelected={selectedMarker?.index === 2 && selectedMarker?.type === 'route'} imageSrc={routes[2].markerImage} />
          </div>
          
          <div className="absolute content-stretch flex flex-col h-[98.468px] items-start left-[54.36px] top-[564.66px] w-[95.998px]">
            <SkyGrassAvatar onClick={() => handleMarkerClick(3, 'route')} isSelected={selectedMarker?.index === 3 && selectedMarker?.type === 'route'} imageSrc={routes[3].markerImage} />
          </div>
        </>
      )}

      {/* Markers - Small avatars */}
      {!selectedRoute ? (
        // Show generic place markers when no route is selected
        <>
          <div className="absolute content-stretch flex flex-col items-start left-[106px] top-[400px] w-[48px]">
            <SkyGrassAvatarSmall onClick={() => handleMarkerClick(4, 'place')} isSelected={selectedMarker?.index === 4 && selectedMarker?.type === 'place'} imageSrc="https://images.unsplash.com/photo-1666114265205-394e9d5848c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnl8ZW58MXx8fHwxNzY0Nzg0NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
          </div>
          
          <div className="absolute content-stretch flex flex-col items-start left-[197px] size-[48px] top-[494px]">
            <SkyGrassAvatarSmall onClick={() => handleMarkerClick(5, 'place')} isSelected={selectedMarker?.index === 5 && selectedMarker?.type === 'place'} imageSrc="https://images.unsplash.com/photo-1605270012917-bf157c5a9541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXIlMjBkcmlua3N8ZW58MXx8fHwxNzY0ODYzNzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
          </div>
        </>
      ) : (
        // Show route step markers when a route is selected
        <>
          {selectedRoute.steps.map((step, index) => {
            // Only render markers that should be visible based on the incremental animation
            if (index >= visibleStepCount) return null;
            
            const position = stepMarkerPositions[index] || stepMarkerPositions[0];
            return (
              <motion.div 
                key={`step-marker-${index}`}
                className="absolute content-stretch flex flex-col items-start w-[48px]"
                style={{ left: `${position.left}px`, top: `${position.top}px` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut"
                }}
              >
                <SkyGrassAvatarSmall 
                  onClick={() => handleStepMarkerClick(index)} 
                  isSelected={selectedStepIndex === index} 
                  imageSrc={step.image} 
                />
              </motion.div>
            );
          })}
        </>
      )}

      {/* Popup widgets */}
      {!isSearchActive && selectedMarker?.type === 'place' && selectedPlace && (
        <>
          {/* Place Selection UI - Shared Component */}
          <PlaceSelectionUI
            place={selectedPlace}
            onTileClick={() => setIsPlaceGalleryOpen(true)}
          />

          {/* Close Button - Top Left */}
          <button 
            onClick={() => setSelectedMarker(null)}
            className="absolute left-[26px] top-[28px] z-20 w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] pointer-events-auto active:scale-95 transition-transform"
          >
            <CloseIcon />
          </button>
        </>
      )}

      {/* Single Step View Mode - Show step as a place */}
      {!isSearchActive && selectedMarker?.type === 'route' && selectedRoute && singleStepViewMode && (
        <>
          {/* Place Selection UI for the selected step */}
          <PlaceSelectionUI
            place={{
              id: `step-${selectedStepIndex}`,
              name: selectedRoute.steps[selectedStepIndex].location,
              category: 'LOCATION',
              distance: '',
              image: selectedRoute.steps[selectedStepIndex].image,
              photos: selectedRoute.steps[selectedStepIndex].photos || [selectedRoute.steps[selectedStepIndex].image]
            }}
            onTileClick={() => setIsPlaceGalleryOpen(true)}
          />

          {/* Close Button - Top Left */}
          <button 
            onClick={() => {
              setSingleStepViewMode(false);
              setSelectedMarker(null);
            }}
            className="absolute left-[26px] top-[28px] z-20 w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] pointer-events-auto active:scale-95 transition-transform"
          >
            <CloseIcon />
          </button>
        </>
      )}

      {/* Route Selection - Black Gradient Overlay and UI Elements */}
      {!isSearchActive && selectedMarker?.type === 'route' && selectedRoute && !singleStepViewMode && (
        <>
          {/* Gradient Overlay for contrast */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 w-full h-[359px] z-10"
            style={{
              top: '494px',
              background: 'linear-gradient(180deg, rgba(217,217,217,0) 0%, rgba(0,0,0,0.5) 41.827%, rgba(0,0,0,0.9) 100%)'
            }}
          />

          {/* Location Text Above Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            className="absolute left-[34px] top-[624px] z-20 flex items-center gap-[8px] pointer-events-none"
          >
            <svg className="w-[24px] h-[24px] flex-shrink-0" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-white uppercase leading-[1] tracking-[0.02em] translate-y-[1px]">
              {selectedRoute.steps[selectedStepIndex].location}
            </span>
          </motion.div>

          {/* Bottom Fixed Elements: Creator Profile Button + Like Button + Share Button */}
          {!hideTopUI && !isSearchActive && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
              className="absolute left-[34px] top-[656px] z-20 flex items-center gap-[7px] border-none pointer-events-auto"
            >
            {/* Creator Profile Picture Button */}
            <button 
              onClick={() => {
                if (onViewProfile) {
                  // Check if this is the auth user's route
                  const isAuthUser = selectedRoute.creator.id === authUserData?.id;
                  
                  // Call onViewProfile with the creator's ID, isAuthUser flag, and avatar
                  onViewProfile(selectedRoute.creator.id, isAuthUser, selectedRoute.creator.avatar);
                }
              }}
              className="w-[47.994px] h-[47.994px] rounded-[16px] overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform bg-white flex-shrink-0 border-[3.691px] border-[#e9e9e9]"
            >
              <img
                src={selectedRoute.creator.avatar}
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
              disabled={selectedRouteIsPrivate}
              className={`w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex-shrink-0 border-[3.691px] border-[#e9e9e9] ${selectedRouteIsPrivate ? 'opacity-40 cursor-not-allowed' : 'active:scale-95 transition-transform'}`}
              onClick={() => {
                if (!selectedRouteIsPrivate) {
                  setIsShareBottomSheetOpen(true);
                }
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={selectedRouteIsPrivate ? 'rgba(0,0,0,0.3)' : 'black'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>

            {/* Edit Button - Only show if user is the creator */}
            {isCreator && (
              <button 
                onClick={() => setIsEditRoutePopupOpen(true)}
                className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform flex-shrink-0 border-[3.691px] border-[#e9e9e9]"
              >
                <Pencil size={20} className="text-[#1e1e1e]" strokeWidth={2.5} />
              </button>
            )}
          </motion.div>
          )}

          {/* Bottom Step Bar */}
          {!hideTopUI && !isSearchActive && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
              className="absolute left-0 top-[716px] w-full z-10 pointer-events-auto"
            >
              <StepBar
                steps={selectedRoute.steps.map((step, index) => ({
                  id: `${selectedRoute.id}-step-${index}`,
                  image: step.image,
                  location: step.location,
                  photos: step.photos // Pass photos array to show multiple photo indicator
                }))}
                selectedStepIndex={selectedStepIndex}
                onStepClick={handleStepMarkerClick}
                onStepLongPress={(index) => {
                  setRouteSettingsStepIndex(index);
                }}
                mode="browseRoute"
              />
            </motion.div>
          )}

          {/* Close Button - Top Left */}
          <button 
            onClick={handleCloseRoute}
            className="absolute left-[26px] top-[28px] z-20 w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] pointer-events-auto active:scale-95 transition-transform"
          >
            <CloseIcon />
          </button>
        </>
      )}

      {/* Action Buttons - Only show when a marker is selected (removed old buttons) */}

      {/* Right Sidebar */}
      {!hideTopUI && !isSearchActive && (
        <div className="absolute right-[26px] top-[28px] flex flex-col gap-[11.996px] z-20">
          {/* Create Button */}
          <button 
            onClick={onCapture}
            className="relative bg-[#1abb6c] box-border content-stretch flex items-center justify-center rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[47.994px] active:scale-95 transition-transform"
          >
            <AddIcon />
          </button>

          {/* Profile Picture Button */}
          <button 
            onClick={() => onViewProfile?.(authUserData?.id || '', true, authUserData?.avatar)}
            className="relative w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center active:scale-95 transition-transform overflow-hidden p-[3.691px]"
          >
            <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="w-full h-full overflow-hidden rounded-[12.303px]">
              <ImageWithFallback 
                src={authUserData?.avatar || imgProfilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {/* Search Button */}
          <button 
            onClick={() => setIsSearchActive(true)}
            className="relative w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <SearchIcon />
          </button>
        </div>
      )}

      {/* View Switcher - Top Center */}
      {!hideTopUI && !hideViewSwitcher && !isSearchActive && (
        <div className="absolute left-[50%] translate-x-[-50%] top-[28px] z-20">
        <div className="bg-white rounded-[16px] px-[8px] py-[6px] flex items-center gap-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] h-[47.994px]">
          {/* Grid View Button - Inactive */}
          <motion.button 
            onClick={() => {
              // If a route marker is selected, go to Post View with that route
              if (selectedMarker?.type === 'route' && selectedRoute) {
                onPostView?.(selectedRoute.id, selectedStepIndex);
              } else {
                // Otherwise just go back
                onBack?.();
              }
            }}
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
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </motion.svg>
          </motion.button>

          {/* Map View Button - Active */}
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
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
              <line x1="9" y1="3" x2="9" y2="18"/>
              <line x1="15" y1="6" x2="15" y2="21"/>
            </motion.svg>
          </motion.button>
        </div>
        </div>
      )}

      {/* Edit Route Popup */}
      {isCreator && selectedRoute && (
        <>
          <EditRoutePopup
            isOpen={isEditRoutePopupOpen}
            onClose={() => setIsEditRoutePopupOpen(false)}
            onEdit={() => {
              setIsEditRoutePopupOpen(false);
              onEditRoute?.(selectedRoute.id);
            }}
            onDelete={() => {
              setIsEditRoutePopupOpen(false);
              setIsDeleteConfirmOpen(true);
            }}
            routeImage={selectedRoute.steps[0]?.image}
          />
          <DeleteConfirmationPopup
            isOpen={isDeleteConfirmOpen}
            onClose={() => setIsDeleteConfirmOpen(false)}
            onConfirm={() => {
              setIsDeleteConfirmOpen(false);
              onDeleteRoute?.(selectedRoute.id);
            }}
            routeTitle={selectedRoute.title}
          />
        </>
      )}
      
      {/* Share Bottom Sheet */}
      {selectedRoute && (
        <ShareBottomSheet
          isOpen={isShareBottomSheetOpen}
          onClose={() => setIsShareBottomSheetOpen(false)}
          routeId={selectedRoute.id}
          routeTitle={selectedRoute.title}
        />
      )}

      {/* Place Gallery Popup */}
      {(selectedPlace || (singleStepViewMode && selectedRoute)) && (
        <PlaceGalleryPopup
          isOpen={isPlaceGalleryOpen}
          onClose={() => setIsPlaceGalleryOpen(false)}
          place={selectedPlace || {
            id: `step-${selectedStepIndex}`,
            name: selectedRoute!.steps[selectedStepIndex].location,
            category: 'LOCATION',
            distance: '',
            image: selectedRoute!.steps[selectedStepIndex].image,
            photos: selectedRoute!.steps[selectedStepIndex].photos || [selectedRoute!.steps[selectedStepIndex].image]
          }}
        />
      )}

      {/* Route Settings Bottom Sheet */}
      {selectedRoute && routeSettingsStepIndex !== null && (
        <RouteSettingsBottomSheet
          isOpen={true}
          onClose={() => setRouteSettingsStepIndex(null)}
          step={selectedRoute.steps[routeSettingsStepIndex]}
          isCreator={selectedRoute.creator.id === authUserData?.id}
          onDeleteRoute={() => {
            console.log('Delete route requested');
            setRouteSettingsStepIndex(null);
            // TODO: Implement route deletion
          }}
          onViewLocation={() => {
            // Close bottom sheet and show the selected step location on map
            setRouteSettingsStepIndex(null);
            setSelectedStepIndex(routeSettingsStepIndex);
          }}
          onEditRoute={() => {
            setRouteSettingsStepIndex(null);
            setIsEditRoutePopupOpen(true);
          }}
        />
      )}

      {/* Search Bar - Floats over map when active */}
      <AnimatePresence>
        {isSearchActive && (
          <>
            {/* Search Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ 
                y: 0,
                height: isSearchSheetExpanded ? '100vh' : 'auto'
              }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`absolute ${isSearchSheetExpanded ? 'top-0' : 'bottom-0'} left-0 right-0 bg-white ${isSearchSheetExpanded ? 'rounded-[0px]' : 'rounded-t-[30px]'} z-40 flex flex-col`}
              style={{ 
                maxHeight: isSearchSheetExpanded ? '100vh' : '80vh',
                height: isSearchSheetExpanded ? '100vh' : 'auto'
              }}
            >
            {/* Border */}
            <div className={`absolute inset-0 border-8 border-[#e9e9e9] ${isSearchSheetExpanded ? 'rounded-[0px]' : 'rounded-t-[30px]'} pointer-events-none`} />

            {/* Search Bar at Top of Bottom Sheet */}
            <div className="relative px-[26px] pt-[40px] pb-4 flex justify-center">
              <div className="relative bg-white box-border content-stretch flex gap-[12px] h-[70px] items-center pl-[16px] pr-[20px] py-[10px] rounded-[20px] w-[300px]">
                <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]" />
                
                {/* Back Button */}
                <button
                  onClick={() => {
                    setIsSearchActive(false);
                    setSearchQuery('');
                    setIsSearchSheetExpanded(false);
                  }}
                  className="relative flex items-center justify-center size-[47.994px] shrink-0 active:scale-95 transition-transform z-10"
                >
                  <div className="relative shrink-0 size-[23.992px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g>
                        <path d="M18.9939 11.9961H4.99839" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                        <path d="M10.9976 5.99805L4.99902 11.9966L10.9976 17.9951" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                      </g>
                    </svg>
                  </div>
                </button>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(searchQuery);
                    }
                  }}
                  placeholder="SEARCH"
                  className="font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] not-italic relative shrink-0 text-[22px] text-[#1e1e1e] placeholder:text-[rgba(30,30,30,0.25)] w-[210px] bg-transparent outline-none uppercase"
                  autoFocus
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="flex justify-center pb-4">
              <div className="w-[300px]">
                {searchQuery.trim() ? (
                  <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[rgba(30,30,30,0.4)] uppercase text-center">
                    {filteredSearchResults.length > 0 ? `${filteredSearchResults.length} RESULTS` : 'NO RESULTS FOUND'}
                  </p>
                ) : searchHistory.length > 0 ? (
                  <div className="flex items-center justify-between">
                    <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[rgba(30,30,30,0.7)] uppercase">
                      SEARCH HISTORY
                    </p>
                    <button
                      onClick={() => setSearchHistory([])}
                      className="font-['Baloo_Tamma',sans-serif] text-[11px] text-[rgba(30,30,30,0.35)] uppercase hover:text-[rgba(30,30,30,0.6)] transition-colors px-2 py-1 rounded active:scale-95"
                    >
                      CLEAR ALL
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex justify-center">
              <div className="w-[300px] space-y-3">
                    {searchQuery.trim() ? (
                      // Show search results
                      filteredSearchResults.length > 0 ? (
                        <>
                          <AnimatePresence mode="popLayout">
                            {(isSearchSheetExpanded ? filteredSearchResults : filteredSearchResults.slice(0, 3)).map((place, index) => (
                              <motion.button
                                key={place.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ 
                                  duration: 0.3,
                                  delay: index * 0.05,
                                  ease: 'easeOut'
                                }}
                                onClick={() => {
                                  // Handle place selection
                                  handleSearchSubmit(searchQuery);
                                }}
                                className="flex items-center gap-[16px] w-full text-left cursor-pointer border-none bg-transparent p-0"
                              >
                                {/* Place Image */}
                                <div className="flex-shrink-0">
                                  <div className="w-[47.994px] h-[47.994px] rounded-[16px] overflow-hidden border-[3.691px] border-[#e9e9e9] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                                    <img 
                                      src={place.image}
                                      alt={place.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                
                                {/* Name and Type */}
                                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                                  <h3 className="font-['Baloo_Tamma',sans-serif] text-[18px] text-black leading-[1.1] uppercase break-words">
                                    {place.name}
                                  </h3>
                                  <p className="font-['Baloo_Tamma',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[1.2] uppercase">
                                    {place.type} • {place.distance}
                                  </p>
                                </div>
                              </motion.button>
                            ))}
                          </AnimatePresence>
                          
                          {/* Show More Button - only show if there are more than 3 results and not expanded */}
                          {!isSearchSheetExpanded && filteredSearchResults.length > 3 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className="flex justify-center pt-2"
                            >
                              <button
                                onClick={() => setIsSearchSheetExpanded(true)}
                                className="bg-white box-border content-stretch flex h-[48px] items-center justify-center pl-[20px] pr-[20px] py-[10px] rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] relative gap-[8px] active:scale-95 transition-transform"
                              >
                                <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
                                <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-nowrap whitespace-pre uppercase">
                                  SHOW MORE
                                </p>
                              </button>
                            </motion.div>
                          )}
                        </>
                      ) : null
                    ) : (
                      // Show search history
                      searchHistory.length > 0 ? (
                        <AnimatePresence mode="popLayout">
                          {searchHistory.map((historyItem, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ 
                                duration: 0.2,
                                delay: index * 0.03
                              }}
                              onClick={() => {
                                setSearchQuery(historyItem);
                                handleSearchSubmit(historyItem);
                              }}
                              className="flex items-center gap-[16px] w-full text-left cursor-pointer border-none bg-transparent p-0"
                            >
                              {/* Clock Icon */}
                              <div className="flex-shrink-0">
                                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="rgba(0,0,0,0.25)" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              
                              {/* History Text */}
                              <div className="flex-1 min-w-0">
                                <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[rgba(30,30,30,0.5)] leading-[1.1] uppercase break-words">
                                  {historyItem}
                                </p>
                              </div>
                            </motion.button>
                          ))}
                        </AnimatePresence>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center justify-center py-8 text-center"
                        >
                          <p className="font-['Baloo_Tamma',sans-serif] text-[16px] text-[rgba(30,30,30,0.4)] uppercase">
                            NO SEARCH HISTORY
                          </p>
                        </motion.div>
                      )
                    )}
              </div>
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </div>
  );
}