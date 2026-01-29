import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Music, Trash2, Images, Hand, Plus, MapPin, Image as ImageIcon, Camera, ArrowLeft, ChevronLeft, ChevronRight, Search, Lock, CameraOff, TriangleAlert, Aperture, Pencil, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogPortal, AlertDialogOverlay } from './ui/alert-dialog';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog@1.1.6';
import { ImageWithFallback } from './figma/ImageWithFallback';
import StepBar from './StepBar';
import StepSettingsBottomSheet from './StepSettingsBottomSheet';
import TemplatesPage from './TemplatesPage';
import CoverPhotoPicker from './CoverPhotoPicker';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import svgPaths from '../imports/svg-4y5y8njmj6';
import svgPathsHome from '../imports/svg-rauyrl11oe';
import svgPathsMap from '../imports/svg-1n7so91zsa';
import svgPathsPost from '../imports/svg-3pbes637su';
import svgPathsDialog from '../imports/svg-2k7cusq6fk';
import svgPathsTemplates from '../imports/svg-a3hu8y7x01';
import svgPathsSearch from '../imports/svg-sgz91c5j7s';
import imgProfilePicture from 'figma:asset/9844bfd977f4f5988b484778db92f0fb779ff0dc.png';
import thumbnailEating from 'figma:asset/732b2f7a2aa9bda1308eaca5dcfb58392d5bfdaa.png';
import thumbnailPark from 'figma:asset/5f90a2e28663986e3cb18ac9a95c3ad254db50d0.png';
import thumbnailCoffee from 'figma:asset/d2571acaf113ff3627d0186bfa3e736c33f97637.png';
import imgMapBackground from 'figma:asset/f35766008df8a1ef91b59bf807a486f005c0be78.png';

// Template Icon Components
function StyleOutlined() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35" opacity="0.6">
        <path d={svgPathsTemplates.p2a9dd3f0} fill="#100F0F" />
      </svg>
    </div>
  );
}

function MoodHappy() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32" opacity="0.6">
        <g></g>
      </svg>
      <div className="absolute inset-[8.33%]">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25" opacity="0.6">
            <path d={svgPathsTemplates.p253f1f80} fill="#100F0F" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PersonWalking() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30" opacity="0.6">
        <g clipPath="url(#clip0_walking)">
          <g>
            <path d={svgPathsTemplates.p3f1d7180} fill="#100F0F" />
            <path d={svgPathsTemplates.p269e5d00} fill="#100F0F" />
            <path d={svgPathsTemplates.p1a488b80} fill="#100F0F" />
            <path d={svgPathsTemplates.p2236380} fill="#100F0F" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_walking">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function UtensilsCrossed() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27" opacity="0.6">
        <g clipPath="url(#clip0_utensils)">
          <path d={svgPathsTemplates.p96dfc80} stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_utensils">
            <rect fill="white" height="27" width="27" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function GlassFull() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 size-[30px] top-1/2 -translate-y-1/2 -mt-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32" opacity="0.6">
        <g>
          <g></g>
          <path d={svgPathsTemplates.p1b39600} fill="#100F0F" />
        </g>
      </svg>
    </div>
  );
}

// Template definitions
const TEMPLATES = [
  {
    name: 'TEMPLATE 1',
    items: ['CAFE', 'WALK', 'FOOD'],
    icons: [
      { icon: <StyleOutlined key="cafe" />, label: 'CAFE' },
      { icon: <PersonWalking key="walk" />, label: 'WALK' },
      { icon: <UtensilsCrossed key="food" />, label: 'FOOD' }
    ]
  },
  {
    name: 'TEMPLATE 2',
    items: ['WALK', 'FOOD', 'ACTIVITY'],
    icons: [
      { icon: <PersonWalking key="walk" />, label: 'WALK' },
      { icon: <UtensilsCrossed key="food" />, label: 'FOOD' },
      { icon: <MoodHappy key="activity" />, label: 'ACTIVITY' }
    ]
  },
  {
    name: 'TEMPLATE 3',
    items: ['ACTIVITY', 'WALK', 'DRINKS'],
    icons: [
      { icon: <MoodHappy key="activity" />, label: 'ACTIVITY' },
      { icon: <PersonWalking key="walk" />, label: 'WALK' },
      { icon: <GlassFull key="drinks" />, label: 'DRINKS' }
    ]
  }
];

interface Step {
  id: string;
  image: string;
  caption: string;
  location: string;
  suggestion: string;
  type: 'photo' | 'video';
  thumbnail?: string; // For video thumbnails
  videoKey?: 'eating' | 'park' | 'coffee'; // For video component selection
  videoUrl?: string; // URL for actual video playback
  photos: string[]; // User-uploaded photos for this step
  coverImage: string; // What StepBar shows (first photo or google stock photo)
  hasUserPhoto: boolean; // True if photos.length > 0
  source: 'user' | 'google'; // google = selected via Find Place / search
  position?: number; // Optional position field to maintain order when converting Google places
  originalPlace?: { id: number; image: string; name: string; position: number; mode?: 'places' | 'camera-roll' }; // Store original Google Place data for potential restoration
}

interface CreateProps {
  onPreview: (steps: Step[], routeTitle: string, draftId: string | null) => void;
  shouldReset?: boolean;
  onViewProfile?: () => void;
  onBack?: () => void;
  onOpenSearch?: (currentLocation?: string) => void;
  onOpenMap?: () => void;
  onPost?: (steps: Step[], routeTitle: string) => void; // Updated to pass steps and title
  initialView?: 'camera' | 'map'; // New prop to set initial view
  onOpenTemplates?: () => void; // Navigate to templates page
  externalTemplate?: { name: string; items: string[] } | null; // Template from external source (templates page)
  authUserData?: {
    name: string;
    username: string;
    avatar: string;
    location: string;
  };
  changingLocationForStepIndex?: number | null; // Step index to change location for
  setChangingLocationForStepIndex?: (index: number | null) => void; // Callback to set step index
  updateStepLocationCallback?: ((stepIndex: number, newLocation: string) => void) | null; // Callback to update step location
  setUpdateStepLocationCallback?: (callback: ((stepIndex: number, newLocation: string) => void) | null) => void; // Setter for callback
  editingRouteData?: any; // Route data when in edit mode
  isEditMode?: boolean; // Whether we're editing an existing route
}

export default function Create({ onPreview, shouldReset, onViewProfile, onBack, onOpenSearch, onOpenMap, onPost, initialView = 'camera', onOpenTemplates, externalTemplate, authUserData, changingLocationForStepIndex, setChangingLocationForStepIndex, updateStepLocationCallback, setUpdateStepLocationCallback, editingRouteData, isEditMode }: CreateProps) {
  // State management
  const [steps, setSteps] = useState<Step[]>([]);
  const [routeTitle, setRouteTitle] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showMapCloseConfirm, setShowMapCloseConfirm] = useState(false);
  const [showMapView, setShowMapView] = useState(initialView === 'map'); // Initialize based on prop
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [friendsOnly, setFriendsOnly] = useState(true);
  const [selectedPlaces, setSelectedPlaces] = useState<Array<{ id: number; image: string; name: string; position: number; mode?: 'places' | 'camera-roll' }>>([]);
  const [previewMarker, setPreviewMarker] = useState<{ id: number; image: string; name: string; left: number; top: number } | null>(null);
  const [showTemplatesSheet, setShowTemplatesSheet] = useState(false); // Templates bottom sheet state
  const [selectedTemplate, setSelectedTemplate] = useState<{ name: string; items: string[] } | null>(externalTemplate || null); // Selected template
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number | null>(null); // Currently selected template item index (0, 1, 2, or null)
  const [filledTemplateItems, setFilledTemplateItems] = useState<Array<{ image: string; name: string; photos?: string[]; hasUserPhoto?: boolean } | null>>([null, null, null]); // Filled template items with actual places
  const [isTemplateBrowsing, setIsTemplateBrowsing] = useState<boolean>(false); // Whether user is browsing templates
  const [currentBrowsingTemplateIndex, setCurrentBrowsingTemplateIndex] = useState<number>(0); // Current template index when browsing
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(-1); // For full-screen step expansion
  const [selectedMapStepIndex, setSelectedMapStepIndex] = useState<number>(-1); // For map view full-screen step expansion
  const [isMapImageMinimized, setIsMapImageMinimized] = useState<boolean>(true); // Track if map view image is minimized (showing map)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number>(0); // For cycling through songs (0-5, where 5 = no music)
  const [showMusicPopup, setShowMusicPopup] = useState<boolean>(false); // For showing the sliding music popup
  const [showLocationChip, setShowLocationChip] = useState<boolean>(false); // For showing the sliding location chip
  const [isRecording, setIsRecording] = useState<boolean>(false); // For hold-to-record state
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false); // For map view search slide-in panel
  const [showTemplatesPanel, setShowTemplatesPanel] = useState<boolean>(false); // For map view templates slide-in panel
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null); // For category-based map filtering
  const [searchSelectedPlace, setSearchSelectedPlace] = useState<{ id: string; name: string; image: string } | null>(null); // For showing a single place from search
  const [isAddMenuExpanded, setIsAddMenuExpanded] = useState<boolean>(false); // For expandable ADD button menu
  const [showMusicSelectionPopup, setShowMusicSelectionPopup] = useState<boolean>(false); // For music selection popup
  const [selectedMapMusicIndex, setSelectedMapMusicIndex] = useState<number | null>(null); // For selected music in map view (null = no music selected)
  const [showModeNotification, setShowModeNotification] = useState<boolean>(false); // For mode switch notification
  const [currentMode, setCurrentMode] = useState<'camera' | 'map'>(initialView === 'map' ? 'map' : 'camera'); // Current create mode
  const [isTransitioningMode, setIsTransitioningMode] = useState<boolean>(false); // Track if we're transitioning between modes
  const [stepSettingsIndex, setStepSettingsIndex] = useState<number | null>(null); // For step settings popup
  const [mapPlaceSettingsId, setMapPlaceSettingsId] = useState<number | null>(null); // For map place settings popup
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1); // For tracking which step is being added to (-1 = new step)
  const [showPhotoGallery, setShowPhotoGallery] = useState<boolean>(false); // For photo gallery modal
  const [galleryStepIndex, setGalleryStepIndex] = useState<number | null>(null); // For which step's photos to show in gallery
  const [showSearchPlaceWarning, setShowSearchPlaceWarning] = useState<boolean>(false); // For showing warning when tapping search-selected place
  const [addingPhotosToStepIndex, setAddingPhotosToStepIndex] = useState<number | null>(null); // Track if we're adding photos to existing Google place step
  const [tempPhotosForStep, setTempPhotosForStep] = useState<string[]>([]); // Temporary photos captured for a Google place step
  const [searchQuery, setSearchQuery] = useState<string>(''); // For search bottom sheet
  const [isSearchSheetExpanded, setIsSearchSheetExpanded] = useState<boolean>(false); // For search sheet expansion
  const [tempCapturePhotos, setTempCapturePhotos] = useState<string[]>([]); // Temporary photos during capture session (before completing step)
  const [captureStepNumber, setCaptureStepNumber] = useState<number | null>(null); // The step number shown during capture (stays constant)
  const [changingCoverForStepIndex, setChangingCoverForStepIndex] = useState<number | null>(null); // Track which step is having its cover changed
  const [showGooglePlacesWarning, setShowGooglePlacesWarning] = useState<boolean>(false); // For showing Google Places privacy warning
  const [viewSwitcherMode, setViewSwitcherMode] = useState<'pin' | 'image'>('pin'); // For view switcher UI (places vs camera roll)
  const [showViewSwitcherNotification, setShowViewSwitcherNotification] = useState<boolean>(false); // For view switcher notification popup
  const [isDragging, setIsDragging] = useState<boolean>(false); // Track if user is dragging a step tile
  
  // Edit mode state
  const [hasChanges, setHasChanges] = useState<boolean>(false); // Track if any changes made in edit mode
  const [originalStepsData, setOriginalStepsData] = useState<string>(''); // Store original data to detect changes
  
  // Helper function to combine camera steps and map places into a unified array
  const getCombinedSteps = (): (Step & { templateIcon?: React.ReactNode; templateLabel?: string })[] => {
    const combinedSteps: (Step & { templateIcon?: React.ReactNode; templateLabel?: string; position?: number })[] = [];
    
    // If template is active, add template items as steps first
    if (selectedTemplate) {
      const templateIcons = TEMPLATES.find(t => t.name === selectedTemplate.name)?.icons || [];
      templateIcons.forEach((item, index) => {
        const filledData = filledTemplateItems[index];
        combinedSteps.push({
          id: `template-${index}`,
          image: filledData?.photos?.[0] || filledData?.image || '', // Use first photo if available, otherwise Google image
          caption: selectedTemplate.items[index] || '',
          location: filledData?.name.toUpperCase() || item.label,
          suggestion: '',
          type: 'photo' as const,
          templateIcon: !filledData ? item.icon : undefined, // Include icon only if not filled
          templateLabel: !filledData ? item.label : undefined, // Include label only if not filled
          photos: filledData?.photos || [], // Use photos if available
          coverImage: filledData?.photos?.[0] || filledData?.image || '', // Use first photo as cover if available
          hasUserPhoto: filledData?.hasUserPhoto || false, // Check if has user photos
          source: filledData ? (filledData.hasUserPhoto ? 'user' as const : 'google' as const) : 'user' as const, // Mark as user if has photos
          position: index
        });
      });
    }
    
    // Add all map places and camera steps, sorted by position (only if no template is active)
    if (!selectedTemplate) {
      // Add map places with their tracked position
      const mapSteps: (Step & { position: number })[] = selectedPlaces.map((place) => {
        // Check if this is from camera roll mode or places mode
        const isCameraRoll = place.mode === 'camera-roll';
        
        return {
          id: `map-${place.id}`,
          image: place.image,
          caption: '',
          location: place.name.toUpperCase(),
          suggestion: '',
          type: 'photo' as const,
          photos: isCameraRoll ? [place.image] : [], // Camera roll markers go directly into photos array
          coverImage: place.image, // Use the image as cover
          hasUserPhoto: isCameraRoll, // Camera roll markers are user photos
          source: isCameraRoll ? 'user' as const : 'google' as const, // Mark appropriately based on mode
          position: place.position // Use tracked position from the place object
        };
      });
      
      // Find the maximum position currently used
      const maxPosition = Math.max(
        ...selectedPlaces.map(p => p.position),
        ...steps.filter(s => s.position !== undefined).map(s => s.position!),
        -1
      );
      
      // Add camera steps with their position (if set, otherwise after max position)
      const cameraSteps: (Step & { position: number })[] = steps.map((step, index) => ({
        ...step,
        position: step.position !== undefined ? step.position : maxPosition + 1 + index
      }));
      
      // Merge and sort by position
      const allSteps = [...mapSteps, ...cameraSteps];
      allSteps.sort((a, b) => a.position - b.position);
      combinedSteps.push(...allSteps);
    }
    
    return combinedSteps;
  };
  
  // Helper function to get combined places for map view (includes camera steps as places)
  const getCombinedPlaces = (): Array<{ 
    id: string; 
    image: string; 
    name: string; 
    isFromCamera: boolean;
    source?: 'user' | 'google';
    hasUserPhoto?: boolean;
    photoCount?: number;
  }> => {
    const placesWithPosition: Array<{ 
      id: string; 
      image: string; 
      name: string; 
      isFromCamera: boolean;
      source?: 'user' | 'google';
      hasUserPhoto?: boolean;
      photoCount?: number;
      position: number;
    }> = [];
    
    // Add all map places with their tracked position
    selectedPlaces.forEach(place => {
      // Check if this is from camera roll mode or places mode
      const isCameraRoll = place.mode === 'camera-roll';
      
      placesWithPosition.push({
        id: `map-${place.id}`,
        image: place.image,
        name: place.name,
        isFromCamera: false,
        source: isCameraRoll ? 'user' : 'google',
        hasUserPhoto: isCameraRoll,
        photoCount: isCameraRoll ? 1 : 0,
        position: place.position
      });
    });
    
    // Find the maximum position currently used
    const maxPosition = Math.max(
      ...selectedPlaces.map(p => p.position),
      ...steps.filter(s => s.position !== undefined).map(s => s.position!),
      -1
    );
    
    // Add all camera steps with their position (if set, otherwise after max position)
    steps.forEach((step, index) => {
      placesWithPosition.push({
        id: step.id,
        image: step.image,
        name: step.location,
        isFromCamera: true,
        source: step.source || 'user',
        hasUserPhoto: step.hasUserPhoto !== undefined ? step.hasUserPhoto : true,
        photoCount: step.photos?.length || 0,
        position: step.position !== undefined ? step.position : maxPosition + 1 + index
      });
    });
    
    // Sort by position
    placesWithPosition.sort((a, b) => a.position - b.position);
    
    // Return without position field (to match return type)
    return placesWithPosition.map(({ position, ...place }) => place);
  };
  
  // Helper function to check if there are any Google Places without user photos
  const hasGooglePlacesWithoutPhotos = (): boolean => {
    const combinedSteps = getCombinedSteps();
    return combinedSteps.some(step => step.source === 'google' && step.hasUserPhoto === false);
  };
  
  // Helper function to get the next position for adding new steps/places (always at the end)
  const getNextPosition = (): number => {
    const maxPosition = Math.max(
      ...selectedPlaces.map(p => p.position),
      ...steps.filter(s => s.position !== undefined).map(s => s.position!),
      -1
    );
    return maxPosition + 1;
  };
  
  // Handle reordering of step tiles via drag and drop
  const handleReorderSteps = (dragIndex: number, hoverIndex: number) => {
    const combinedPlaces = getCombinedPlaces();
    
    // Create new arrays for steps and selectedPlaces
    const newSteps = [...steps];
    const newSelectedPlaces = [...selectedPlaces];
    
    // Reassign positions based on new order
    combinedPlaces.forEach((place, index) => {
      let newPosition = index;
      if (index === hoverIndex) {
        newPosition = dragIndex;
      } else if (dragIndex < hoverIndex && index > dragIndex && index <= hoverIndex) {
        newPosition = index - 1;
      } else if (dragIndex > hoverIndex && index >= hoverIndex && index < dragIndex) {
        newPosition = index + 1;
      }
      
      // Update position in steps or selectedPlaces
      if (place.isFromCamera) {
        const stepIndex = newSteps.findIndex(s => s.id === place.id);
        if (stepIndex >= 0) {
          newSteps[stepIndex] = { ...newSteps[stepIndex], position: newPosition };
        }
      } else {
        const placeId = parseInt(place.id.replace('map-', ''));
        const placeIndex = newSelectedPlaces.findIndex(p => p.id === placeId);
        if (placeIndex >= 0) {
          newSelectedPlaces[placeIndex] = { ...newSelectedPlaces[placeIndex], position: newPosition };
        }
      }
    });
    
    setSteps(newSteps);
    setSelectedPlaces(newSelectedPlaces);
  };
  
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mapWidgetScrollRef = useRef<HTMLDivElement>(null);
  const musicPopupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locationChipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recordingHoldTimerRef = useRef<NodeJS.Timeout | null>(null);
  const didEnterRecordingModeRef = useRef<boolean>(false); // Track if we entered recording mode
  const modeNotificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMountRef = useRef<boolean>(true); // Track initial mount
  const mapPlaceLongPressTimerRef = useRef<NodeJS.Timeout | null>(null); // For map place long press
  const fileInputRef = useRef<HTMLInputElement | null>(null); // For gallery file input
  const mapStepBarScrollRef = useRef<HTMLDivElement>(null); // For map view step bar scrolling
  const viewSwitcherNotificationTimeoutRef = useRef<NodeJS.Timeout | null>(null); // For view switcher notification

  // Mock images for demonstration
  const mockImages = [
    'https://images.unsplash.com/photo-1611653682161-f58ba65ead46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMjg2NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1625861886374-ad02172db792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMG5hdHVyZXxlbnwxfHx8fDE3NjAzNjUwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1684568519316-f0fb02f7826b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYwMzExNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1747918157024-a1e1c77336fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MDM1OTQ0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyOTcyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1633735672439-580d8f078b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwc3Vuc2V0fGVufDF8fHx8MTc2MDMzODIwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  // Mock location names for auto-assignment
  const mockLocationNames = [
    'BLUE BOTTLE COFFEE',
    'GOLDEN GATE PARK',
    'TARTINE BAKERY',
    'DOLORES PARK',
    'SFMOMA',
    'THE MILL'
  ];

  // Mock videos for video capture - 3 real-life experience videos with thumbnails
  const mockVideos = [
    { key: 'eating' as const, thumbnail: thumbnailEating, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    { key: 'park' as const, thumbnail: thumbnailPark, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    { key: 'coffee' as const, thumbnail: thumbnailCoffee, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
  ];

  // Mock places for map view - Places mode (venues/businesses)
  const mockPlacesMode = [
    { id: 0, left: 106, top: 400, x: 106, y: 400, image: 'https://images.unsplash.com/photo-1604552914267-90a8d81a4254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwY29mZmVlJTIwc2hvcHxlbnwxfHx8fDE3NjQ4NjI1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', name: 'THE RUSTY BICYCLE', mode: 'places' as const },
    { id: 1, left: 197, top: 494, x: 197, y: 494, image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2NDgzMTA1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', name: 'OLIVE & THYME BISTRO', mode: 'places' as const },
    { id: 2, left: 258, top: 231, x: 258, y: 231, image: 'https://images.unsplash.com/photo-1632497838089-102c30059e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwbmF0dXJlfGVufDF8fHx8MTc2NDg2Mzc1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', name: 'WILLOW CREEK GARDENS', mode: 'places' as const },
    { id: 3, left: 42, top: 314, x: 42, y: 314, image: 'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2NDg4MDcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', name: 'THE FOUNDRY GALLERY', mode: 'places' as const },
    { id: 4, left: 241, top: 362, x: 241, y: 362, image: 'https://images.unsplash.com/photo-1628977613138-dcfede720de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NDgyOTIxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', name: 'CHAPTER & VERSE BOOKS', mode: 'places' as const },
    { id: 5, left: 217, top: 172, x: 217, y: 172, image: 'https://images.unsplash.com/photo-1550520293-d34b3f2e116d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXIlMjBsb3VuZ2V8ZW58MXx8fHwxNzY0OTMwMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', name: 'VELVET LOUNGE', mode: 'places' as const },
    { id: 6, left: 43, top: 581, x: 43, y: 581, image: 'https://images.unsplash.com/photo-1666114265205-394e9d5848c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnl8ZW58MXx8fHwxNzY0OTA3MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', name: 'HONEY & RYE BAKERY', mode: 'places' as const },
    { id: 7, left: 364, top: 553, x: 364, y: 553, image: 'https://images.unsplash.com/photo-1748963222010-770cfd7213c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzaG9wJTIwYm91dGlxdWV8ZW58MXx8fHwxNzY0OTMwMTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', name: 'LUNA & CO BOUTIQUE', mode: 'places' as const }
  ];

  // Mock camera roll mode - User photos from camera roll
  const mockCameraRollMode = [
    { id: 10, left: 180, top: 290, x: 180, y: 290, image: 'https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3MzY1NzQ1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080', name: 'OXFORD STREET', mode: 'camera-roll' as const },
    { id: 11, left: 75, top: 460, x: 75, y: 460, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3MzY1NzQ1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080', name: 'HAMPSTEAD HEATH', mode: 'camera-roll' as const },
    { id: 12, left: 290, top: 380, x: 290, y: 380, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzM2NTc0NTAwfDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'BOROUGH MARKET', mode: 'camera-roll' as const },
    { id: 13, left: 135, top: 195, x: 135, y: 195, image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBza3l8ZW58MXx8fHwxNzM2NTc0NTAwfDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'PRIMROSE HILL', mode: 'camera-roll' as const },
    { id: 14, left: 320, top: 510, x: 320, y: 510, image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3MzY1NzQ1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080', name: 'CANARY WHARF', mode: 'camera-roll' as const },
    { id: 15, left: 60, top: 250, x: 60, y: 250, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtb21lbnR8ZW58MXx8fHwxNzM2NTc0NTAwfDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'COVENT GARDEN', mode: 'camera-roll' as const },
    { id: 16, left: 250, top: 560, x: 250, y: 560, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlb3BsZXxlbnwxfHx8fDE3MzY1NzQ1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080', name: 'KING\'S CROSS', mode: 'camera-roll' as const },
    { id: 17, left: 155, top: 410, x: 155, y: 410, image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMG9jZWFufGVufDF8fHx8MTczNjU3NDUwMHww&ixlib=rb-4.1.0&q=80&w=1080', name: 'SOUTHBANK', mode: 'camera-roll' as const }
  ];

  // Get the active marker set based on view switcher mode
  const mockPlaces = viewSwitcherMode === 'pin' ? mockPlacesMode : mockCameraRollMode;

  // Song options for music button
  const songOptions = [
    'CHILL VIBES',
    'CITY NIGHTS',
    'GOLDEN HOUR',
    'WEEKEND',
    'SUMMER'
  ];

  // Handle music button click
  const handleMusicClick = () => {
    const newIndex = (selectedSongIndex + 1) % 6; // 0-5, where 5 = no music
    setSelectedSongIndex(newIndex);
    
    // Show popup only if not "no music" mode
    if (newIndex < 5) {
      // Clear any existing timeout
      if (musicPopupTimeoutRef.current) {
        clearTimeout(musicPopupTimeoutRef.current);
      }
      
      // Show popup
      setShowMusicPopup(true);
      
      // Hide popup after 2.5 seconds
      musicPopupTimeoutRef.current = setTimeout(() => {
        setShowMusicPopup(false);
      }, 2500);
    }
  };

  // Handle location button click - shows the location chip
  const handleLocationClick = () => {
    // Only show chip if a step is selected
    if (selectedStepIndex >= 0 && selectedStepIndex < steps.length) {
      // Clear any existing timeout
      if (locationChipTimeoutRef.current) {
        clearTimeout(locationChipTimeoutRef.current);
      }
      
      // Show chip
      setShowLocationChip(true);
      
      // Hide chip after 2.5 seconds
      locationChipTimeoutRef.current = setTimeout(() => {
        setShowLocationChip(false);
      }, 2500);
    }
  };

  // Handle location chip click - opens search
  const handleLocationChipClick = () => {
    if (selectedStepIndex >= 0 && selectedStepIndex < steps.length) {
      // Get current step's location
      const currentStep = steps[selectedStepIndex];
      const currentLocation = currentStep.location || '';
      
      // Hide the chip
      setShowLocationChip(false);
      
      // Store which step we're changing location for
      setChangingLocationForStepIndex?.(selectedStepIndex);
      // Navigate to search overlay with current location
      onOpenSearch?.(currentLocation);
    }
  };



  // Set up callback for updating step location from Search page
  useEffect(() => {
    const callback = (stepIndex: number, newLocation: string) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        const newSteps = [...steps];
        newSteps[stepIndex] = {
          ...newSteps[stepIndex],
          location: newLocation
        };
        setSteps(newSteps);
      }
    };
    setUpdateStepLocationCallback?.(() => callback);
    
    // Cleanup
    return () => {
      setUpdateStepLocationCallback?.(null);
    };
  }, [steps, setUpdateStepLocationCallback]);

  // Reset after successful post
  useEffect(() => {
    if (shouldReset) {
      setSteps([]);
      setRouteTitle('');
      setSelectedStepIndex(-1);
      setSelectedMapStepIndex(-1);
    }
  }, [shouldReset]);

  // Apply external template when provided
  useEffect(() => {
    if (externalTemplate) {
      setSelectedTemplate(externalTemplate);
      setFilledTemplateItems([null, null, null]);
      setSelectedTemplateIndex(null);
      // Force map view when template is applied
      setShowMapView(true);
    }
  }, [externalTemplate]);

  // Load editing route data in edit mode
  useEffect(() => {
    if (isEditMode && editingRouteData) {
      // Convert route data steps to Create page Step format
      const editSteps: Step[] = editingRouteData.steps.map((step: any, index: number) => ({
        id: step.id || `step-${index}`,
        image: step.image,
        caption: step.caption || '',
        location: step.location,
        suggestion: '',
        type: 'photo' as const,
        photos: step.photos || [step.image],
        coverImage: step.image,
        hasUserPhoto: step.hasUserPhoto || false,
        source: step.source || 'user' as const,
        position: index
      }));

      // Load steps and title
      setSteps(editSteps);
      setRouteTitle(editingRouteData.title || '');
      
      // Store original data for change detection
      setOriginalStepsData(JSON.stringify({ steps: editSteps, title: editingRouteData.title }));
      
      // Start in map view for editing
      setShowMapView(true);
      setCurrentMode('map');
      
      // Don't show post button initially
      setHasChanges(false);
    }
  }, [isEditMode, editingRouteData]);

  // Detect changes in edit mode
  useEffect(() => {
    if (isEditMode && originalStepsData) {
      const currentData = JSON.stringify({ steps, title: routeTitle });
      const changed = currentData !== originalStepsData;
      setHasChanges(changed);
    }
  }, [steps, routeTitle, isEditMode, originalStepsData]);

  // Auto-scroll map widget to the right when places are selected
  useEffect(() => {
    if (mapWidgetScrollRef.current && selectedPlaces.length > 0) {
      mapWidgetScrollRef.current.scrollLeft = mapWidgetScrollRef.current.scrollWidth;
    }
  }, [selectedPlaces]);

  // Auto-center the most recently added step in the map view step bar
  useEffect(() => {
    const combinedPlaces = getCombinedPlaces();
    if (mapStepBarScrollRef.current && combinedPlaces.length > 0) {
      const container = mapStepBarScrollRef.current;
      const lastStepIndex = combinedPlaces.length - 1;
      
      // Step bar dimensions
      const tileWidth = 95.998;
      const gap = 8;
      const tileWithGap = tileWidth + gap;
      const leftPadding = 35;
      const containerWidth = 393; // Full width of the phone
      const centerPoint = containerWidth / 2;
      
      // Calculate scroll position to center the last step
      const targetTileCenter = (lastStepIndex * tileWithGap) + (tileWidth / 2) + leftPadding;
      let targetScroll = targetTileCenter - centerPoint;
      
      // Clamp to valid scroll range
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (targetScroll < 0) targetScroll = 0;
      if (targetScroll > maxScroll) targetScroll = maxScroll;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [steps.length, selectedPlaces.length]); // Trigger when either array changes

  // Show mode notification when switching between camera and map views
  useEffect(() => {
    const newMode = showMapView ? 'map' : 'camera';
    
    // Skip on initial mount
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      setCurrentMode(newMode);
      return;
    }
    
    // Only show notification if mode actually changed
    if (newMode !== currentMode) {
      // Clear any existing timeout
      if (modeNotificationTimeoutRef.current) {
        clearTimeout(modeNotificationTimeoutRef.current);
      }
      
      // Immediately hide any showing notification and update mode
      setShowModeNotification(false);
      setCurrentMode(newMode);
      
      // Force a brief reset to ensure animation restarts cleanly
      setTimeout(() => {
        setShowModeNotification(true);
        
        // Auto-hide after 2 seconds (wait at bottom position)
        modeNotificationTimeoutRef.current = setTimeout(() => {
          setShowModeNotification(false);
        }, 2000);
      }, 50); // Brief delay to ensure clean restart
    }
    
    return () => {
      if (modeNotificationTimeoutRef.current) {
        clearTimeout(modeNotificationTimeoutRef.current);
      }
    };
  }, [showMapView, currentMode]);

  // Handle capture - instantly add to step bar (photo)
  const handleCapture = () => {
    // Deselect any full-screen step in capture mode
    setSelectedStepIndex(-1);
    
    // Don't capture photo if we entered recording mode
    if (didEnterRecordingModeRef.current) {
      didEnterRecordingModeRef.current = false;
      return;
    }

    setIsCapturing(true);
    
    setTimeout(() => {
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      const autoLocation = mockLocationNames[Math.floor(Math.random() * mockLocationNames.length)];
      
      // Check if we're adding photos to an existing Google place step
      if (addingPhotosToStepIndex !== null) {
        // Add photo to temporary array
        setTempPhotosForStep([...tempPhotosForStep, randomImage]);
        setIsCapturing(false);
        return;
      }
      
      // Check if we're in capture session mode (creating new step with multiple photos)
      if (captureStepNumber !== null) {
        // Add photo to temporary capture array
        setTempCapturePhotos([...tempCapturePhotos, randomImage]);
        setIsCapturing(false);
        return;
      }
      
      // Check if template is active and has unfilled positions
      if (selectedTemplate && filledTemplateItems.some(item => item === null)) {
        // Find the next unfilled template position
        const nextUnfilledIndex = filledTemplateItems.findIndex(item => item === null);
        
        if (nextUnfilledIndex !== -1) {
          // Fill the next unfilled template position
          const newFilledItems = [...filledTemplateItems];
          newFilledItems[nextUnfilledIndex] = { image: randomImage, name: autoLocation };
          setFilledTemplateItems(newFilledItems);
          
          // Switch to map view to show the template
          setShowMapView(true);
          setIsCapturing(false);
          return;
        }
      }
      
      // Check if we're adding to an existing step
      if (activeStepIndex >= 0 && activeStepIndex < steps.length) {
        // Adding to existing step
        const existingStep = steps[activeStepIndex];
        const newCoverImage = existingStep.photos.length === 0 ? randomImage : existingStep.coverImage;
        const updatedStep: Step = {
          ...existingStep,
          photos: [...existingStep.photos, randomImage],
          hasUserPhoto: true,
          coverImage: newCoverImage, // Set as cover if first photo
          image: newCoverImage // Keep image in sync with coverImage
        };
        
        const newSteps = [...steps];
        newSteps[activeStepIndex] = updatedStep;
        setSteps(newSteps);
        setIsCapturing(false);
      } else {
        // Normal behavior: add new step
        const newStep: Step = {
          id: Date.now().toString(),
          image: randomImage,
          caption: '',
          location: autoLocation,
          suggestion: '',
          type: 'photo',
          photos: [randomImage], // First photo
          coverImage: randomImage, // Set as cover
          hasUserPhoto: true, // Has user photo
          source: 'user', // User-created step
          position: getNextPosition() // Assign position at the end
        };
        
        setSteps([...steps, newStep]);
        setActiveStepIndex(steps.length); // Set the new step as active
        setIsCapturing(false);
      }
    }, 300);
  };

  // Handle capture hold start - starts timer for recording mode
  const handleCaptureHoldStart = () => {
    // Deselect any full-screen step in capture mode
    setSelectedStepIndex(-1);
    
    // Clear any existing timer
    if (recordingHoldTimerRef.current) {
      clearTimeout(recordingHoldTimerRef.current);
    }
    
    // Set timer to trigger recording mode after 300ms
    recordingHoldTimerRef.current = setTimeout(() => {
      setIsRecording(true);
      didEnterRecordingModeRef.current = true;
    }, 300);
  };

  // Handle capture hold end - clears timer or exits recording mode and adds video
  const handleCaptureHoldEnd = () => {
    // Clear the timer if released early
    if (recordingHoldTimerRef.current) {
      clearTimeout(recordingHoldTimerRef.current);
      recordingHoldTimerRef.current = null;
    }
    
    // If we were in recording mode, add a video step
    if (isRecording) {
      const randomVideoData = mockVideos[Math.floor(Math.random() * mockVideos.length)];
      const autoLocation = mockLocationNames[Math.floor(Math.random() * mockLocationNames.length)];
      
      const newStep: Step = {
        id: Date.now().toString(),
        image: '', // Not used for video steps
        caption: '',
        location: autoLocation,
        suggestion: '',
        type: 'video',
        thumbnail: randomVideoData.thumbnail, // Thumbnail for step bar
        videoKey: randomVideoData.key, // Key to select video component
        videoUrl: randomVideoData.videoUrl, // URL for video playback
        photos: [randomVideoData.thumbnail], // Use thumbnail as photo
        coverImage: randomVideoData.thumbnail, // Use thumbnail as cover
        hasUserPhoto: true, // Video is user content
        source: 'user', // User-created video
        position: getNextPosition() // Assign position at the end
      };
      
      setSteps([...steps, newStep]);
      setActiveStepIndex(steps.length); // Set the new step as active
    }
    
    // Exit recording mode - but DON'T reset didEnterRecordingModeRef here
    // It will be reset in handleCapture after it checks the flag
    setIsRecording(false);
  };

  // Handle post button
  const handlePost = () => {
    setShowPostDialog(true);
  };

  // Handle step long press - show photo gallery or settings popup
  const handleStepLongPress = (index: number) => {
    // Check if this is a user step (not a map place or template)
    const combinedSteps = getCombinedSteps();
    const step = combinedSteps[index];
    
    if (step && !step.id.startsWith('map-') && !step.id.startsWith('template-')) {
      // Find the actual step index in the steps array
      const stepIndex = steps.findIndex(s => s.id === step.id);
      if (stepIndex >= 0 && steps[stepIndex].photos && steps[stepIndex].photos.length > 0) {
        // Show photo gallery for user steps
        setGalleryStepIndex(stepIndex);
        setShowPhotoGallery(true);
        return;
      }
    }
    
    // Otherwise, show settings popup
    setStepSettingsIndex(index);
  };

  // Handle map place long press - show settings popup
  const handleMapPlacePressStart = (placeId: number) => {
    if (mapPlaceLongPressTimerRef.current) {
      clearTimeout(mapPlaceLongPressTimerRef.current);
    }
    
    mapPlaceLongPressTimerRef.current = setTimeout(() => {
      setMapPlaceSettingsId(placeId);
    }, 500); // 500ms for long press
  };

  const handleMapPlacePressEnd = () => {
    if (mapPlaceLongPressTimerRef.current) {
      clearTimeout(mapPlaceLongPressTimerRef.current);
      mapPlaceLongPressTimerRef.current = null;
    }
  };

  // Handle final post confirmation
  const handleFinalPost = () => {
    // Merge camera steps and map places
    let finalSteps: Step[] = [];
    
    if (showMapView && selectedTemplate && filledTemplateItems.some(item => item !== null)) {
      // Map view with template: convert filledTemplateItems to steps
      finalSteps = filledTemplateItems
        .filter((item): item is { image: string; name: string } => item !== null)
        .map((item, index) => ({
          id: Date.now().toString() + index,
          image: item.image,
          caption: selectedTemplate.items[index]?.toUpperCase() || '',
          location: item.name.toUpperCase(),
          suggestion: '',
          type: 'photo' as const,
          photos: [item.image], // Include photos array with the image
          coverImage: item.image,
          hasUserPhoto: false,
          source: 'google' as const
        }));
    } else {
      // Merge camera steps and map places
      // Camera steps first
      finalSteps = [...steps];
      
      // Then add map places if any
      if (selectedPlaces.length > 0) {
        const mapSteps = selectedPlaces.map((place, index) => {
          // Check if this place is from camera-roll mode or places mode
          const isCameraRoll = place.mode === 'camera-roll';
          
          return {
            id: Date.now().toString() + index,
            image: place.image,
            caption: '',
            location: place.name.toUpperCase(),
            suggestion: '',
            type: 'photo' as const,
            photos: [place.image], // Include photos array with the image
            coverImage: place.image,
            hasUserPhoto: isCameraRoll, // Camera-roll items have user photos
            source: isCameraRoll ? 'user' as const : 'google' as const // Mark appropriately
          };
        });
        finalSteps = [...finalSteps, ...mapSteps];
      }
    }
    
    // Pass the steps to parent via onPreview to populate capturedSteps
    if (finalSteps.length > 0) {
      onPreview(finalSteps, routeTitle || (selectedTemplate?.name || 'MY ROUTE'), null);
    }
    
    // Close dialog, reset state
    setShowPostDialog(false);
    setSteps([]);
    setRouteTitle('');
    setSelectedPlaces([]);
    setFilledTemplateItems([null, null, null]);
    setSelectedTemplate(null);
    
    // Call onPost to trigger the posting flow
    onPost?.(finalSteps, routeTitle || (selectedTemplate?.name || 'MY ROUTE')); 
  };

  // Handle close button
  const handleCloseButton = () => {
    // In edit mode, check if there are changes; otherwise check if there are steps/places
    const shouldConfirm = isEditMode ? hasChanges : (steps.length > 0 || selectedPlaces.length > 0);
    
    if (shouldConfirm) {
      // Show appropriate dialog based on current view
      if (showMapView) {
        setShowMapCloseConfirm(true);
      } else {
        setShowCloseConfirm(true);
      }
    } else {
      onBack?.();
    }
  };

  // Handle map view
  const handleMapView = () => {
    // Clear capture session state when returning to map (discards temp photos)
    setTempCapturePhotos([]);
    setCaptureStepNumber(null);
    setShowMapView(true);
    onOpenMap?.();
  };

  // Handle gallery button click - opens file picker
  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection from gallery
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Convert FileList to array and process each file
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (!result) return;

        // Determine if it's a video or image
        const isVideo = file.type.startsWith('video/');
        
        // Check if we're adding to an existing step
        if (activeStepIndex >= 0 && activeStepIndex < steps.length) {
          // Adding to existing step
          const existingStep = steps[activeStepIndex];
          const updatedStep: Step = {
            ...existingStep,
            photos: [...existingStep.photos, result],
            hasUserPhoto: true,
            coverImage: existingStep.photos.length === 0 ? result : existingStep.coverImage // Set as cover if first photo
          };
          
          setSteps(prevSteps => {
            const newSteps = [...prevSteps];
            newSteps[activeStepIndex] = updatedStep;
            return newSteps;
          });
        } else {
          // Create a new step
          const newStep: Step = {
            id: Date.now().toString() + Math.random().toString(36).substring(7),
            image: isVideo ? '' : result,
            caption: '',
            location: mockLocationNames[steps.length % mockLocationNames.length],
            suggestion: '',
            type: isVideo ? 'video' : 'photo',
            thumbnail: isVideo ? result : undefined,
            videoUrl: isVideo ? result : undefined,
            photos: [result], // Add to photos array
            coverImage: result, // Set as cover
            hasUserPhoto: true, // Mark as having user photo
            source: 'user', // User-created step
            position: getNextPosition() // Assign position at the end
          };

          // Add step to the beginning of the array (like camera capture does)
          setSteps(prevSteps => [newStep, ...prevSteps]);
          setActiveStepIndex(0); // Set the new step as active
        }
      };

      reader.readAsDataURL(file);
    });

    // Reset file input so same file can be selected again
    event.target.value = '';
  };

  // Generate different random marker sets for each template position or category
  const getFilteredMarkers = () => {
    // Search selected place - show only this one marker in center
    if (searchSelectedPlace) {
      // Create a marker from the search selected place data
      return [{
        id: `search-${searchSelectedPlace.id}`, // Use unique ID to avoid conflicts
        name: searchSelectedPlace.name,
        image: searchSelectedPlace.image,
        left: 160, // Center position (roughly half of map width ~390/2)
        top: 370,  // Center position (roughly middle of map height)
        x: 160,
        y: 370
      }];
    }
    
    // Template filtering takes precedence
    if (selectedTemplateIndex !== null) {
      // Create different random subsets for each template position
      const seed = selectedTemplateIndex; // Use index as seed for deterministic randomness
      const shuffled = [...mockPlaces].sort((a, b) => {
        // Use marker id and seed to create deterministic but different sorting for each index
        return ((a.id + seed * 7) % 13) - ((b.id + seed * 7) % 13);
      });

      // Return approximately 50% of markers (4 out of 8)
      return shuffled.slice(0, 4);
    }
    
    // Category filtering - show random subset when category is selected
    if (selectedCategory) {
      // Create a random subset based on the category ID
      const categoryHash = selectedCategory.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const shuffled = [...mockPlaces].sort((a, b) => {
        return ((a.id + categoryHash * 3) % 11) - ((b.id + categoryHash * 3) % 11);
      });
      
      // Return approximately 50-60% of markers (4-5 out of 8)
      return shuffled.slice(0, Math.floor(mockPlaces.length * 0.5) + 1);
    }
    
    return mockPlaces; // Show all markers when no filter is active
  };

  const filteredMarkers = getFilteredMarkers();

  // Handle template item click
  const handleTemplateItemClick = (index: number) => {
    // Check if this template item is filled
    const isFilled = filledTemplateItems[index] !== null;
    
    if (isFilled) {
      // Filled template item - behave like a normal step (show full screen)
      // Calculate the combined step index for this template item
      const templateStepIndex = index; // Template items are first in getCombinedSteps()
      if (selectedMapStepIndex === templateStepIndex) {
        setIsMapImageMinimized(!isMapImageMinimized);
      } else {
        setSelectedMapStepIndex(templateStepIndex);
        setIsMapImageMinimized(false);
      }
      // Clear template selection to prevent filtering
      setSelectedTemplateIndex(null);
    } else {
      // Unfilled template item - filter markers
      if (selectedTemplateIndex === index) {
        // Deselect if clicking the same item
        setSelectedTemplateIndex(null);
      } else {
        // Select the template item
        setSelectedTemplateIndex(index);
      }
      // Clear full screen when filtering
      setSelectedMapStepIndex(-1);
    }
  };

  const handleMarkerClick = (marker: typeof mockPlaces[0]) => {
    // If this is a search-selected place, handle auto-fill for template or normal add
    if (searchSelectedPlace) {
      // Check if template is active and has unfilled positions
      if (selectedTemplate && filledTemplateItems.some(item => item === null)) {
        // Find the next unfilled template position
        const nextUnfilledIndex = filledTemplateItems.findIndex(item => item === null);
        
        if (nextUnfilledIndex !== -1) {
          // Fill the next unfilled template position
          const newFilledItems = [...filledTemplateItems];
          newFilledItems[nextUnfilledIndex] = { image: marker.image, name: marker.name };
          setFilledTemplateItems(newFilledItems);
          setSearchSelectedPlace(null);
          return;
        }
      }
      
      // Normal behavior: add to selectedPlaces and show warning
      const nextPosition = getNextPosition();
      // Extract numeric ID from search marker (format: "search-123")
      const numericId = typeof marker.id === 'string' && marker.id.startsWith('search-') 
        ? parseInt(marker.id.replace('search-', '')) 
        : marker.id;
      setSelectedPlaces([...selectedPlaces, { id: numericId, image: marker.image, name: marker.name, position: nextPosition, mode: 'places' }]);
      setSearchSelectedPlace(null);
      setShowSearchPlaceWarning(true);
      // Auto-hide warning after 3 seconds
      setTimeout(() => setShowSearchPlaceWarning(false), 3000);
      return;
    }
    
    if (selectedTemplateIndex !== null) {
      // Fill the selected template item with this marker
      const newFilledItems = [...filledTemplateItems];
      newFilledItems[selectedTemplateIndex] = { image: marker.image, name: marker.name };
      setFilledTemplateItems(newFilledItems);
      // Deselect the template item
      setSelectedTemplateIndex(null);
    } else if (!selectedTemplate) {
      // Normal selection behavior (only when no template is active)
      const isSelected = selectedPlaces.some(p => p.id === marker.id);
      if (isSelected) {
        // Deselect
        setSelectedPlaces(selectedPlaces.filter(p => p.id !== marker.id));
      } else {
        // Select
        const nextPosition = getNextPosition();
        setSelectedPlaces([...selectedPlaces, { id: marker.id, image: marker.image, name: marker.name, position: nextPosition, mode: marker.mode || 'places' }]);
      }
    }
    // If selectedTemplate exists but selectedTemplateIndex is null, do nothing (prevents free selection)
  };

  const handleMarkerHoldStart = (marker: typeof mockPlaces[0]) => {
    // Clear any existing timer
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    // Set a timer to show preview after 500ms
    holdTimerRef.current = setTimeout(() => {
      setPreviewMarker({ ...marker, left: marker.left, top: marker.top });
    }, 500);
  };

  const handleMarkerHoldEnd = () => {
    // Clear the timer if released early
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    // Hide the preview
    setPreviewMarker(null);
  };

  // Handle view switcher mode change
  const handleViewSwitcherModeChange = (newMode: 'pin' | 'image') => {
    if (newMode === viewSwitcherMode) return; // Don't trigger if same mode
    
    // Clear any existing timeout
    if (viewSwitcherNotificationTimeoutRef.current) {
      clearTimeout(viewSwitcherNotificationTimeoutRef.current);
    }
    
    // Update mode
    setViewSwitcherMode(newMode);
    
    // Show notification
    setShowViewSwitcherNotification(false); // Reset first
    setTimeout(() => {
      setShowViewSwitcherNotification(true);
      
      // Auto-hide after 2 seconds
      viewSwitcherNotificationTimeoutRef.current = setTimeout(() => {
        setShowViewSwitcherNotification(false);
      }, 2000);
    }, 50);
  };

  // POST CONFIRMATION DIALOG - Always rendered in both views
  const postDialog = (() => {
    const combinedSteps = getCombinedSteps();
    const hasIncompleteSteps = combinedSteps.some(s => s.source === 'google' && !s.hasUserPhoto);
    
    return (
      <AlertDialog open={showPostDialog} onOpenChange={setShowPostDialog}>
        <AlertDialogPortal>
          <AlertDialogOverlay onClick={() => setShowPostDialog(false)} className="cursor-pointer" />
          <AlertDialogPrimitive.Content
            data-slot="alert-dialog-content"
            className={`bg-white border-8 border-[#e9e9e9] border-solid rounded-[30px] max-w-[340px] p-0 shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-[340px] translate-x-[-50%] translate-y-[-50%] duration-200 ${hasIncompleteSteps ? 'h-[320px]' : 'h-[248px]'}`}
          >
            <AlertDialogHeader className="p-0 space-y-0">
              <AlertDialogTitle className="sr-only">Finish and Post Route</AlertDialogTitle>
              <AlertDialogDescription className="sr-only">
                Configure your route settings before posting
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            {/* Title - FINISH or UPDATE ROUTE */}
            <p className="absolute font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] left-[162px] not-italic text-[#1e1e1e] text-[28px] text-center top-[16px] translate-x-[-50%] w-[265px]">{isEditMode ? 'UPDATE ROUTE' : 'FINISH'}</p>
            
            {/* Conditional visibility display */}
            {hasIncompleteSteps ? (
              <>
                {/* Warning text - moved above ONLY ME button */}
                <p className="absolute font-['Baloo_Tamma',sans-serif] text-[14px] text-[#717171] text-center top-[61px] left-[12px] w-[300px] px-4 leading-tight">
                  This route includes places without your own photos. It will be saved privately and only you can see it.
                </p>
                
                {/* ONLY ME - LOCKED (non-interactive) */}
                <div className="absolute box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[12px] px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[135px] w-[300px] bg-white border-4 border-[#e9e9e9] border-solid pointer-events-none">
                  <svg className="w-[20px] h-[20px] shrink-0" fill="#e9e9e9" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic text-[22px] text-center uppercase text-[#e9e9e9]">
                    ONLY ME
                  </p>
                </div>
              </>
            ) : (
              /* FRIENDS ONLY - LOCKED (non-interactive) */
              <div className="absolute box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[12px] px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[61px] w-[300px] bg-white border-4 border-[#1abb6c] border-solid pointer-events-none">
                <svg className="w-[20px] h-[20px] shrink-0" fill="#1abb6c" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic text-[22px] text-center uppercase text-[#1abb6c]">
                  FRIENDS ONLY
                </p>
              </div>
            )}

            {/* POST/UPDATE BUTTON */}
            <button
              onClick={handleFinalPost}
              className={`absolute bg-[#1abb6c] box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-[12px] px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] w-[300px] active:scale-95 transition-transform z-50 cursor-pointer ${hasIncompleteSteps ? 'top-[217px]' : 'top-[143px]'}`}
            >
              <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic text-[22px] text-center text-white uppercase">{isEditMode ? 'UPDATE' : 'POST'}</p>
            </button>
          </AlertDialogPrimitive.Content>
        </AlertDialogPortal>
      </AlertDialog>
    );
  })();

  // CLOSE CONFIRMATION DIALOG - Always rendered in both views
  const closeDialog = (
    <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
      <AlertDialogPortal>
        <AlertDialogOverlay onClick={() => setShowCloseConfirm(false)} className="cursor-pointer" />
        <AlertDialogPrimitive.Content
          data-slot="alert-dialog-content"
          className="bg-white border-8 border-[#e9e9e9] border-solid rounded-[30px] max-w-[340px] p-0 shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-[340px] h-[295px] translate-x-[-50%] translate-y-[-50%] duration-200"
        >
          <AlertDialogHeader className="p-0 space-y-0">
            <AlertDialogTitle className="sr-only">Close Confirmation</AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Are you sure you want to close?
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {/* Title */}
          <p className="absolute font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] left-1/2 not-italic text-[#1e1e1e] text-[28px] text-center top-[20px] -translate-x-1/2 w-[265px] uppercase">
            CLOSE?
          </p>
          
          {/* Subtext */}
          <p className="absolute font-['Baloo_Tamma',sans-serif] leading-[normal] left-1/2 not-italic text-[14px] text-[rgba(30,30,30,0.4)] text-center top-[60px] -translate-x-1/2 w-[280px]">
            YOUR PROGRESS WILL BE LOST
          </p>
          
          {/* CONTINUE BUTTON */}
          <button
            onClick={() => setShowCloseConfirm(false)}
            className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-1/2 px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[115px] w-[300px] border-4 border-[#e9e9e9] border-solid active:scale-95 transition-transform -translate-x-1/2 z-50 cursor-pointer"
          >
            <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic text-[22px] text-center text-[#1e1e1e] uppercase">CONTINUE</p>
          </button>

          {/* DISCARD BUTTON */}
          <button
            onClick={() => {
              setSteps([]);
              setSelectedPlaces([]);
              setRouteTitle('');
              setSelectedTemplate(null);
              setFilledTemplateItems([null, null, null]);
              setShowCloseConfirm(false);
              // In edit mode, discard changes and go back
              if (isEditMode) {
                onBack?.();
              }
              // Don't call onBack - just reset to default create page state
            }}
            className="absolute bg-[#ff0000] box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-1/2 px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[197px] w-[300px] active:scale-95 transition-transform -translate-x-1/2 z-50 cursor-pointer"
          >
            <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic text-[22px] text-center text-white uppercase">
              {isEditMode ? 'DISCARD CHANGES' : 'DISCARD'}
            </p>
          </button>
        </AlertDialogPrimitive.Content>
      </AlertDialogPortal>
    </AlertDialog>
  );

  // MAP CLOSE CONFIRMATION DIALOG - For map view
  const mapCloseDialog = (
    <AlertDialog open={showMapCloseConfirm} onOpenChange={setShowMapCloseConfirm}>
      <AlertDialogPortal>
        <AlertDialogOverlay onClick={() => setShowMapCloseConfirm(false)} className="cursor-pointer" />
        <AlertDialogPrimitive.Content
          data-slot="alert-dialog-content"
          className="bg-white border-8 border-[#e9e9e9] border-solid rounded-[30px] max-w-[340px] p-0 shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-[340px] h-[295px] translate-x-[-50%] translate-y-[-50%] duration-200"
        >
          <AlertDialogHeader className="p-0 space-y-0">
            <AlertDialogTitle className="sr-only">Close Confirmation</AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Are you sure you want to close?
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {/* Title */}
          <p className="absolute font-['Baloo_Tamma',sans-serif] h-[30px] leading-[normal] left-1/2 not-italic text-[#1e1e1e] text-[28px] text-center top-[20px] -translate-x-1/2 w-[265px] uppercase">
            CLOSE?
          </p>
          
          {/* Subtext */}
          <p className="absolute font-['Baloo_Tamma',sans-serif] leading-[normal] left-1/2 not-italic text-[14px] text-[rgba(30,30,30,0.4)] text-center top-[60px] -translate-x-1/2 w-[280px]">
            YOUR PROGRESS WILL BE LOST
          </p>
          
          {/* CONTINUE BUTTON */}
          <button
            onClick={() => setShowMapCloseConfirm(false)}
            className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-1/2 px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[115px] w-[300px] border-4 border-[#e9e9e9] border-solid active:scale-95 transition-transform -translate-x-1/2 z-50 cursor-pointer"
          >
            <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic text-[22px] text-center text-[#1e1e1e] uppercase">CONTINUE</p>
          </button>

          {/* DISCARD BUTTON */}
          <button
            onClick={() => {
              setSteps([]);
              setSelectedPlaces([]);
              setRouteTitle('');
              setSelectedTemplate(null);
              setFilledTemplateItems([null, null, null]);
              setShowMapCloseConfirm(false);
              // In edit mode, discard changes and go back
              if (isEditMode) {
                onBack?.();
              }
              // Don't call onBack - just reset to default create page state
            }}
            className="absolute bg-[#ff0000] box-border content-stretch flex gap-[18px] h-[70px] items-center justify-center left-1/2 px-[20px] py-[10px] rounded-[20px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] top-[197px] w-[300px] active:scale-95 transition-transform -translate-x-1/2 z-50 cursor-pointer"
          >
            <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic text-[22px] text-center text-white uppercase">
              {isEditMode ? 'DISCARD CHANGES' : 'DISCARD'}
            </p>
          </button>
        </AlertDialogPrimitive.Content>
      </AlertDialogPortal>
    </AlertDialog>
  );

  // GOOGLE PLACES WARNING DIALOG - For informing about privacy restrictions
  // Draggable Step Tile Component
  const DraggableStepTile = ({ place, index, isSelected, onClick, onLongPressStart, onLongPressEnd }: any) => {
    const ref = useRef<HTMLDivElement>(null);
    
    const [{ isDragging: isThisDragging }, drag] = useDrag({
      type: 'step-tile',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        setIsDragging(false);
      },
    });

    const [, drop] = useDrop({
      accept: 'step-tile',
      hover: (draggedItem: { index: number }) => {
        if (draggedItem.index !== index) {
          handleReorderSteps(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });

    // Connect drag and drop refs
    drag(drop(ref));

    // Track when dragging starts
    useEffect(() => {
      if (isThisDragging) {
        setIsDragging(true);
      }
    }, [isThisDragging]);

    return (
      <div 
        ref={ref}
        className="relative flex-shrink-0"
        style={{ zIndex: 10, opacity: isThisDragging ? 0.5 : 1, cursor: 'grab' }}
      >
        <button
          onClick={onClick}
          onMouseDown={onLongPressStart}
          onMouseUp={onLongPressEnd}
          onMouseLeave={onLongPressEnd}
          onTouchStart={onLongPressStart}
          onTouchEnd={onLongPressEnd}
          className={`w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden flex items-center justify-center border-[8px] ${isSelected ? 'border-[#1abb6c]' : 'border-white'} shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white active:scale-95 transition-transform relative`}
        >
          <ImageWithFallback 
            src={place.image}
            alt={place.name}
            className={`w-full h-full object-cover ${
              place.source === 'google' && place.hasUserPhoto === false ? 'blur-md' : ''
            }`}
          />
          
          {/* Camera-off icon for Google places without user photos */}
          {place.source === 'google' && place.hasUserPhoto === false && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <CameraOff className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          )}
          
          {/* Two squares indicator for multiple photos */}
          {(place.photoCount || 0) > 1 && (
            <div className="absolute bottom-2 left-2 flex gap-1.5 z-10">
              {isSelected ? (
                // Selected state: White squares with drop shadows and bounce animation
                <>
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ 
                      y: [-8, 0]
                    }}
                    transition={{ 
                      y: { duration: 0.48, ease: [0.34, 1.56, 0.64, 1] }
                    }}
                    className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" 
                  />
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ 
                      y: [-8, 0]
                    }}
                    transition={{ 
                      y: { duration: 0.48, ease: [0.34, 1.56, 0.64, 1], delay: 0.08 }
                    }}
                    className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" 
                  />
                </>
              ) : (
                // Unselected state: Solid white squares with drop shadows
                <>
                  <div className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" />
                  <div className="w-[17px] h-[17px] rounded bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" />
                </>
              )}
            </div>
          )}
        </button>
      </div>
    );
  };

  const googlePlacesWarningDialog = (() => {
    // Find which steps are Google Places without user photos
    const combinedSteps = getCombinedSteps();
    const googlePlaceSteps = combinedSteps
      .map((step, index) => ({ step, index: index + 1 })) // 1-indexed for display
      .filter(({ step }) => step.source === 'google' && step.hasUserPhoto === false);
    
    const stepNumbers = googlePlaceSteps.map(({ index }) => index).join(', ');
    
    return (
      <AlertDialog open={showGooglePlacesWarning} onOpenChange={setShowGooglePlacesWarning}>
        <AlertDialogPortal>
          <AlertDialogOverlay onClick={() => setShowGooglePlacesWarning(false)} className="cursor-pointer" />
          <AlertDialogPrimitive.Content
            data-slot="alert-dialog-content"
            className="bg-white border-8 border-[#e9e9e9] border-solid rounded-[30px] max-w-[340px] p-6 shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-[340px] translate-x-[-50%] translate-y-[-50%] duration-200"
          >
            <AlertDialogHeader className="p-0 space-y-0">
              <AlertDialogTitle className="sr-only">Google Places Warning</AlertDialogTitle>
              <AlertDialogDescription className="sr-only">
                Routes with Google Places cannot be posted publicly
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            {/* Example tile showing blurred Google Place */}
            <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-[20px] overflow-hidden border-8 border-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 blur-md" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <CameraOff className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
            </div>
            
            {/* Title */}
            <h2 className="font-['Baloo_Tamma',sans-serif] text-[28px] text-[#1e1e1e] text-center uppercase mb-4 leading-tight">
              ONLY ME
            </h2>
            
            {/* Description */}
            <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#666666] text-center leading-relaxed mb-2 px-2">
                  This route includes places without your own photos. It will be saved privately and only you can see it.
            </p>
            
            {/* Step counter */}
            {googlePlaceSteps.length > 0 && (
              <p className="font-['Baloo_Tamma',sans-serif] text-[12px] text-[#999999] text-center mb-6 px-2">
                {googlePlaceSteps.length === 1 
                  ? `MISSING PHOTOS: STEP ${stepNumbers}`
                  : `MISSING PHOTOS: STEPS ${stepNumbers}`}
              </p>
            )}
            
            {/* Continue button */}
            <button
              onClick={() => setShowGooglePlacesWarning(false)}
              className="w-full bg-white border-4 border-[#e9e9e9] border-solid rounded-[20px] h-[70px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
            >
              <span className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] uppercase">
                CONTINUE
              </span>
            </button>
          </AlertDialogPrimitive.Content>
        </AlertDialogPortal>
      </AlertDialog>
    );
  })();

  // MAP VIEW - Conditional return
  if (showMapView) {
    // Detect if we're on a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const Backend = isTouchDevice ? TouchBackend : HTML5Backend;
    
    return (
      <DndProvider backend={Backend}>
        <div key="map-view" className="relative h-full w-full">
          <div className="bg-white content-stretch flex flex-col items-start relative size-full">
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.719px]">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start relative rounded-[inherit] w-[393.719px]">
              <div className="bg-white h-[852.649px] relative shrink-0 w-full pointer-events-auto">
                {/* Google Maps Background */}
                <div className="absolute inset-0 w-full h-full z-0">
                  <img 
                    src={imgMapBackground} 
                    alt="Map background" 
                    className="w-full h-full object-cover"
                  />
                  {/* Dimming overlay for better contrast */}
                  <div className="absolute inset-0 bg-black/5" />
                </div>
                
                {/* Full Screen Image - Only show when not minimized */}
                {!isMapImageMinimized && selectedMapStepIndex >= 0 && (() => {
                  // Check if we're showing template items or regular places
                  let imageData: { image: string; name: string } | null = null;
                  
                  if (selectedTemplate && selectedMapStepIndex < filledTemplateItems.length) {
                    // Template mode - use filled template items
                    imageData = filledTemplateItems[selectedMapStepIndex];
                  } else if (selectedMapStepIndex < getCombinedPlaces().length) {
                    // Regular mode - use combined places
                    const place = getCombinedPlaces()[selectedMapStepIndex];
                    imageData = { image: place.image, name: place.name };
                  }
                  
                  if (!imageData) return null;
                  
                  return (
                    <div className="absolute inset-0 z-[25] bg-black flex items-center justify-center">
                      <img 
                        src={imageData.image}
                        alt={imageData.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Close Button - Top Left */}
                      <button 
                        onClick={() => {
                          setSelectedMapStepIndex(-1);
                          setIsMapImageMinimized(true);
                        }}
                        className="absolute left-[26px] top-[28px] z-20 w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] active:scale-95 transition-transform"
                      >
                        <svg className="w-[34px] h-[34px]" fill="none" viewBox="0 0 34 34">
                          <path d="M25.5 8.5L8.5 25.5M8.5 8.5l17 17" stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                      
                      {/* Delete Button - Top Right */}
                      <button 
                        onClick={() => {
                          // Check if this is a template item or regular place
                          if (selectedTemplate && selectedMapStepIndex < filledTemplateItems.length) {
                            // Delete template item - clear it
                            const newFilledItems = [...filledTemplateItems];
                            newFilledItems[selectedMapStepIndex] = null;
                            setFilledTemplateItems(newFilledItems);
                          } else {
                            // Delete regular place
                            const combinedPlaces = getCombinedPlaces();
                            const placeToDelete = combinedPlaces[selectedMapStepIndex];
                            
                            if (placeToDelete.isFromCamera) {
                              // This is a camera step - remove from steps
                              setSteps(steps.filter(s => s.id !== placeToDelete.id));
                            } else {
                              // This is a map place - remove from selectedPlaces
                              const placeId = parseInt(placeToDelete.id.replace('map-', ''));
                              setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
                            }
                          }
                          // Close full screen
                          setSelectedMapStepIndex(-1);
                          setIsMapImageMinimized(true);
                        }}
                        className="absolute right-[26px] top-[28px] z-20 w-[47.994px] h-[47.994px] rounded-[16px] bg-[#ff4444] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                      >
                        <Trash2 className="w-6 h-6 relative" stroke="white" strokeWidth="2.5" />
                      </button>
                    </div>
                  );
                })()}

                {/* Map view */}
                <div 
                  className="relative w-full h-full"
                  onClick={() => {
                    // Collapse ADD menu when clicking on map
                    if (isAddMenuExpanded) {
                      setIsAddMenuExpanded(false);
                    }
                  }}
                >
                  {/* Map background - click to clear searchSelectedPlace */}
                  <div 
                    className="absolute inset-0"
                    onClick={() => {
                      if (searchSelectedPlace) {
                        setSearchSelectedPlace(null);
                      }
                    }}
                  >
                  </div>

                  {/* Place markers */}
                  {filteredMarkers.map((marker) => {
                    // For search-selected place, always show as unselected (grey border)
                    // For other markers, check if they're in selectedPlaces
                    const isSelected = !searchSelectedPlace && selectedPlaces.some(p => p.id === marker.id);
                    return (
                      <button
                        key={marker.id}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent map background click
                          handleMarkerClick(marker);
                        }}
                        onMouseDown={() => handleMarkerHoldStart(marker)}
                        onMouseUp={() => handleMarkerHoldEnd()}
                        onMouseLeave={() => handleMarkerHoldEnd()}
                        onTouchStart={() => handleMarkerHoldStart(marker)}
                        onTouchEnd={() => handleMarkerHoldEnd()}
                        className="absolute content-stretch flex flex-col items-start w-[48px] active:scale-95 transition-transform"
                        style={{ left: `${marker.left}px`, top: `${marker.top}px` }}
                      >
                        <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full overflow-hidden">
                          <ImageWithFallback 
                            src={marker.image}
                            alt={marker.name}
                            className="absolute inset-0 w-full h-full object-cover rounded-[12.303px] m-[3.69px] w-[40.612px] h-[40.612px]"
                          />
                          <div 
                            aria-hidden="true" 
                            className={`absolute inset-0 pointer-events-none rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25),0px_4px_12px_0px_rgba(0,0,0,0.1)] border-[3.691px] border-solid ${isSelected ? 'border-[#1abb6c]' : 'border-[#e9e9e9]'}`} 
                          />
                        </div>
                      </button>
                    );
                  })}

                  {/* Preview marker - large tile when holding */}
                  {previewMarker && (
                    <div 
                      className="absolute pointer-events-none z-50 animate-in fade-in zoom-in duration-150"
                      style={{ 
                        left: `${previewMarker.left - 24}px`, // Center over small marker (96/2 - 48/2)
                        top: `${previewMarker.top - 24}px`
                      }}
                    >
                      <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white overflow-hidden shadow-[0px_10px_25px_0px_rgba(0,0,0,0.3)]">
                        <ImageWithFallback 
                          src={previewMarker.image}
                          alt={previewMarker.name}
                          className="w-full h-full object-cover rounded-[16.303px] m-[3.691px] w-[88.616px] h-[88.616px]"
                        />
                        <div aria-hidden="true" className="absolute border-[#1abb6c] border-8 border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                      </div>
                    </div>
                  )}

                  {/* Close button */}
                  <div className="absolute left-[26px] top-[28px]">
                    <button 
                      onClick={() => {
                        if (selectedPlaces.length > 0 || steps.length > 0) {
                          setShowMapCloseConfirm(true);
                        } else {
                          onBack?.();
                        }
                      }}
                      className="bg-white box-border content-stretch flex items-center justify-center pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] active:scale-95 transition-transform"
                    >
                      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                      <div className="relative shrink-0 size-[34px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                          <path d={svgPathsMap.pc263700} fill="black" />
                        </svg>
                      </div>
                    </button>
                  </div>

                  {/* Top Right Controls */}
                  <div className="absolute right-[26px] top-[28px] z-20 flex items-center gap-[12px]">
                    {/* View Switcher - Toggles between showing places and camera roll images */}
                    <div className="bg-white rounded-[16px] px-[8px] py-[6px] flex items-center gap-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] h-[47.994px]">
                      {/* Pin View Button */}
                      <motion.button 
                        onClick={() => handleViewSwitcherModeChange('pin')}
                        initial={false}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center"
                      >
                        <motion.svg
                          initial={false}
                          animate={{ 
                            scale: viewSwitcherMode === 'pin' ? 1 : 0.9,
                            opacity: viewSwitcherMode === 'pin' ? 1 : 0.3
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="w-[24px] h-[24px]" 
                          viewBox="0 0 24 24" 
                          fill="black"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </motion.svg>
                      </motion.button>

                      {/* Image View Button */}
                      <motion.button 
                        onClick={() => handleViewSwitcherModeChange('image')}
                        initial={false}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center"
                      >
                        <motion.div
                          initial={false}
                          animate={{ 
                            scale: viewSwitcherMode === 'image' ? 1 : 0.9,
                            opacity: viewSwitcherMode === 'image' ? 1 : 0.3
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <Aperture 
                            className="w-[24px] h-[24px]" 
                            strokeWidth={viewSwitcherMode === 'image' ? 3 : 2}
                          />
                        </motion.div>
                      </motion.button>
                    </div>

                    {/* Search Button */}
                    <button 
                      onClick={() => {
                        setShowSearchPanel(true);
                        setIsAddMenuExpanded(false);
                      }}
                      className="bg-white box-border content-stretch flex items-center justify-center pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] active:scale-95 transition-transform border-[3.691px] border-[#e9e9e9] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                    >
                      <div className="relative shrink-0 size-[23.992px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                          <g>
                            <path d={svgPathsSearch.p468a980} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                            <path d={svgPathsSearch.p1cb43700} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                          </g>
                        </svg>
                      </div>
                    </button>
                  </div>

                  {/* Category filter chip - shown when a category is selected */}
                  {selectedCategory && (
                    <div className="absolute right-[86px] top-[90px] z-20">
                      <div className="bg-white border-4 border-[#e9e9e9] border-solid rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] px-[16px] h-[47.994px] flex items-center justify-center gap-[12px]">
                        <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase leading-[normal]">
                          {selectedCategory.name}
                        </span>
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="flex items-center justify-center active:scale-95 transition-transform -mr-[4px]"
                        >
                          <X size={16} className="text-[#1e1e1e]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* View Switcher Mode Notification */}
                  <AnimatePresence>
                    {showViewSwitcherNotification && (
                      <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{
                          type: "spring",
                          damping: 20,
                          stiffness: 300
                        }}
                        className="absolute left-1/2 -translate-x-1/2 top-[120px] z-30 pointer-events-none"
                      >
                        <div className="bg-white border-4 border-[#e9e9e9] border-solid rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] px-[16px] h-[47.994px] flex items-center justify-center gap-[12px]">
                          {viewSwitcherMode === 'pin' ? (
                            <>
                              {/* Filled Map Pin Icon */}
                              <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="black">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                              </svg>
                              {/* PLACES Text */}
                              <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase leading-[normal]">
                                PLACES
                              </span>
                            </>
                          ) : (
                            <>
                              {/* Aperture Icon */}
                              <Aperture className="w-[20px] h-[20px]" strokeWidth={2} />
                              {/* CAMERA ROLL Text */}
                              <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase leading-[normal]">
                                CAMERA ROLL
                              </span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gradient Overlay - matches Map.tsx route selection */}
                  <div 
                    className="absolute left-0 w-full h-[359px] z-10 pointer-events-none"
                    style={{
                      top: '494px',
                      background: 'linear-gradient(180deg, rgba(217,217,217,0) 0%, rgba(0,0,0,0.5) 41.827%, rgba(0,0,0,0.9) 100%)'
                    }}
                  />

                  {/* Bottom step tiles area */}
                  {/* Always show normal map view UI - no separate template mode */}
                  <>
                      {/* Template Cycler UI - shown when browsing templates */}
                      {isTemplateBrowsing && (
                        <>
                          {/* Template navigation and select button */}
                          <div className="absolute left-[35px] bottom-[176px] z-30 flex flex-row gap-[11.996px] items-end">
                            {/* Template cycler - matches location chip dimensions, shrinks to fit */}
                            <div
                              className="relative bg-white border-4 border-[#e9e9e9] rounded-[16px] h-[47.994px] flex items-center justify-between px-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                            >
                              <button
                                onClick={() => {
                                  setCurrentBrowsingTemplateIndex((prev) => 
                                    prev === 0 ? TEMPLATES.length - 1 : prev - 1
                                  );
                                }}
                                className="flex items-center justify-center w-[28px] h-[28px] active:scale-90 transition-transform"
                              >
                                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                              </button>
                              
                              <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase flex-1 text-center leading-[normal]">
                                {TEMPLATES[currentBrowsingTemplateIndex].name}
                              </span>
                              
                              <button
                                onClick={() => {
                                  setCurrentBrowsingTemplateIndex((prev) => 
                                    (prev + 1) % TEMPLATES.length
                                  );
                                }}
                                className="flex items-center justify-center w-[28px] h-[28px] active:scale-90 transition-transform"
                              >
                                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                              </button>
                            </div>

                            {/* Green SELECT button - matches template cycler height */}
                            <button
                              onClick={() => {
                                const selectedTemplateData = TEMPLATES[currentBrowsingTemplateIndex];
                                setSelectedTemplate({
                                  name: selectedTemplateData.name,
                                  items: selectedTemplateData.items
                                });
                                setFilledTemplateItems([null, null, null]);
                                setSelectedTemplateIndex(null);
                                setIsTemplateBrowsing(false);
                              }}
                              className="bg-[#1abb6c] rounded-[16px] h-[47.994px] px-[20px] flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
                            >
                              <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-white uppercase leading-[normal]">
                                SELECT
                              </span>
                            </button>
                          </div>
                        </>
                      )}

                      {/* Template item tiles - shown when browsing OR when template is selected */}
                      {(isTemplateBrowsing || selectedTemplate) && (
                        <div className="absolute left-0 top-[691px] z-[30] w-full h-[136px] pointer-events-auto overflow-x-auto overflow-y-visible scrollbar-hide">
                          <div className="relative flex gap-2 pl-[35px]">
                            {/* Connecting bar - only show when template is selected (not browsing) */}
                            {selectedTemplate && !isTemplateBrowsing && (
                              <div 
                                className="absolute bg-[#e9e9e9] h-[60px] rounded-[20642200px] top-[18px]" 
                                style={{ 
                                  left: '39px',
                                  width: `${(3 - 1) * 104 + 48}px`
                                }} 
                              />
                            )}

                            {(isTemplateBrowsing 
                              ? TEMPLATES[currentBrowsingTemplateIndex].icons 
                              : TEMPLATES.find(t => t.name === selectedTemplate?.name)?.icons || []
                            ).map((item, index) => {
                              const isSelected = !isTemplateBrowsing && selectedTemplateIndex === index;
                              const isFilled = !isTemplateBrowsing && filledTemplateItems[index] !== null;
                              const filledData = isFilled ? filledTemplateItems[index] : null;
                              
                              return (
                                <div
                                  key={index}
                                  className="relative flex-shrink-0"
                                  style={{ zIndex: 10 }}
                                  onClick={() => {
                                    // Only allow clicking when template is selected (not browsing)
                                    if (selectedTemplate && !isTemplateBrowsing) {
                                      handleTemplateItemClick(index);
                                    }
                                  }}
                                >
                                  <div 
                                    className={`w-[95.998px] h-[95.998px] rounded-[20px] border-8 ${
                                      selectedMapStepIndex === index && isFilled && !isMapImageMinimized
                                        ? 'border-[#1abb6c]'  // Green when filled and in full screen
                                        : isFilled 
                                          ? 'border-white'  // White when filled (like normal step tiles)
                                          : isSelected 
                                            ? 'border-[#1abb6c]'  // Green when unfilled and selected (filtering)
                                            : 'border-[#e9e9e9]'  // Light grey when unfilled and not selected
                                    } bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center ${selectedTemplate && !isTemplateBrowsing ? 'cursor-pointer active:scale-95 transition-transform' : ''} relative overflow-hidden ${isTemplateBrowsing ? 'opacity-50' : ''}`}
                                  >
                                    {isFilled && filledData ? (
                                      /* Show filled place image */
                                      <>
                                        {filledData.hasUserPhoto && filledData.photos && filledData.photos.length > 0 ? (
                                          /* Show user's photo - clear, not blurred */
                                          <img 
                                            src={filledData.photos[0]} 
                                            alt={filledData.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                          />
                                        ) : (
                                          /* Show Google Place image - blurred with camera-off icon */
                                          <>
                                            <img 
                                              src={filledData.image} 
                                              alt={filledData.name}
                                              className="absolute inset-0 w-full h-full object-cover blur-md"
                                            />
                                            {/* Camera-off icon for Google places without user photos */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                              <CameraOff className="w-8 h-8 text-white" strokeWidth={2} />
                                            </div>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {/* Show template icon */}
                                        {item.icon}
                                        <p className="absolute font-['Baloo_Tamma',sans-serif] bottom-[12px] text-[14px] text-center opacity-60 text-[#1e1e1e] uppercase">
                                          {item.label}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                            
                            {/* Green POST button - shows when all 3 template items are filled */}
                            {selectedTemplate && !isTemplateBrowsing && filledTemplateItems.every(item => item !== null) && (!isEditMode || hasChanges) && (
                              <>
                                <button
                                  onClick={handlePost}
                                  type="button"
                                  className="relative flex-shrink-0"
                                >
                                  <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-[#1abb6c] flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
                                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="12" y1="19" x2="12" y2="5"></line>
                                      <polyline points="5 12 12 5 19 12"></polyline>
                                    </svg>
                                  </div>
                                </button>
                                {/* Invisible spacer to allow POST button to scroll to center */}
                                <div className="flex-shrink-0" style={{ width: 'calc((100vw - 96px) / 2)' }} />
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ADD button menu - above step bar */}
                      {!isTemplateBrowsing && (
                      <div 
                        className="absolute left-0 bottom-[176px] z-30 w-full overflow-x-auto overflow-y-visible pointer-events-auto pl-[35px] pr-[35px]"
                        style={{
                          scrollbarWidth: 'none',
                          WebkitOverflowScrolling: 'touch'
                        }}
                      >
                        <style>{`
                          div::-webkit-scrollbar {
                            display: none;
                          }
                        `}</style>
                        <div className="flex flex-row gap-[11.996px] items-end w-max">
                        {/* ADD button container */}
                        <div className="flex flex-col-reverse items-start">
                          {/* Expanded menu buttons */}
                          <AnimatePresence>
                            {isAddMenuExpanded && (() => {
                              // Check if selected step is a Google place
                              const combinedSteps = getCombinedSteps();
                              const selectedStep = selectedMapStepIndex >= 0 && selectedMapStepIndex < combinedSteps.length 
                                ? combinedSteps[selectedMapStepIndex] 
                                : null;
                              const isGooglePlaceSelected = selectedStep?.source === 'google' && selectedStep?.hasUserPhoto === false;
                              
                              return (
                              <>
                              {/* TAKE PHOTO button */}
                              <motion.button
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "47.994px" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0 }}
                                style={{ overflow: "hidden", marginBottom: "6px" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const combinedSteps = getCombinedSteps();
                                  const selectedStep = selectedMapStepIndex >= 0 && selectedMapStepIndex < combinedSteps.length 
                                    ? combinedSteps[selectedMapStepIndex] 
                                    : null;
                                  const isGooglePlaceSelected = selectedStep?.source === 'google' && selectedStep?.hasUserPhoto === false;
                                  
                                  // If Google place is selected, enter "adding photos to step" mode with empty photos
                                  if (isGooglePlaceSelected) {
                                    setAddingPhotosToStepIndex(selectedMapStepIndex);
                                    setTempPhotosForStep([]);
                                    setCaptureStepNumber(null); // Clear capture step number
                                    setTempCapturePhotos([]); // Clear any previous capture photos
                                  } else if (selectedStep && selectedStep.photos && selectedStep.photos.length > 0) {
                                    // If step with existing photos is selected, load those photos into "adding photos to step" mode
                                    setAddingPhotosToStepIndex(selectedMapStepIndex);
                                    setTempPhotosForStep(selectedStep.photos); // Load existing photos
                                    setCaptureStepNumber(null);
                                    setTempCapturePhotos([]); // Clear capture photos
                                  } else {
                                    // Entering capture mode for new step - set step number and clear temp photos
                                    setCaptureStepNumber(combinedSteps.length + 1);
                                    setTempCapturePhotos([]);
                                    setAddingPhotosToStepIndex(null); // Clear adding photos index
                                    setTempPhotosForStep([]); // Clear any previous step photos
                                  }
                                  setShowMapView(false);
                                  setSelectedStepIndex(-1); // Reset to center capture button
                                  setIsAddMenuExpanded(false);
                                }}
                                disabled={selectedTemplate && filledTemplateItems.every(item => item !== null) && !isGooglePlaceSelected}
                                className={`relative h-[47.994px] rounded-[16px] flex items-center justify-start gap-[8px] px-[16px] transition-transform ${
                                  selectedTemplate && filledTemplateItems.every(item => item !== null) && !isGooglePlaceSelected
                                    ? 'bg-[#f5f5f5] cursor-not-allowed'
                                    : 'bg-white active:scale-95'
                                }`}
                              >
                                <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                                <Camera className="w-5 h-5 relative flex-shrink-0" strokeWidth={2.5} style={{ color: selectedTemplate && filledTemplateItems.every(item => item !== null) && !isGooglePlaceSelected ? 'rgba(30,30,30,0.3)' : undefined }} />
                                <span className={`font-['Baloo_Tamma',sans-serif] text-[14px] uppercase leading-[normal] ${
                                  selectedTemplate && filledTemplateItems.every(item => item !== null) && !isGooglePlaceSelected
                                    ? 'text-[rgba(30,30,30,0.3)]'
                                    : 'text-[#1e1e1e]'
                                }`}>
                                  TAKE PHOTO
                                </span>
                                {/* Green dot indicator */}
                                <div className="w-[6px] h-[6px] rounded-full bg-[#1abb6c] ml-auto" />
                              </motion.button>

                              {/* UPLOAD IMAGE button */}
                              <motion.button
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "47.994px" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.04 }}
                                style={{ overflow: "hidden", marginBottom: "6px" }} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGalleryClick();
                                  setIsAddMenuExpanded(false);
                                }}
                                disabled={selectedTemplate && filledTemplateItems.every(item => item !== null) && !isGooglePlaceSelected}
                                className={`relative h-[47.994px] rounded-[16px] flex items-center justify-start gap-[8px] px-[16px] transition-transform ${
                                  selectedTemplate && filledTemplateItems.every(item => item !== null) && !isGooglePlaceSelected
                                    ? 'bg-[#f5f5f5] cursor-not-allowed'
                                    : 'bg-white active:scale-95'
                                }`}
                              >
                                <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                                <ImageIcon className="w-5 h-5 relative flex-shrink-0" strokeWidth={2.5} style={{ color: selectedTemplate && filledTemplateItems.every(item => item !== null) && !isGooglePlaceSelected ? 'rgba(30,30,30,0.3)' : undefined }} />
                                <span className={`font-['Baloo_Tamma',sans-serif] text-[14px] uppercase leading-[normal] ${
                                  selectedTemplate && filledTemplateItems.every(item => item !== null) && !isGooglePlaceSelected
                                    ? 'text-[rgba(30,30,30,0.3)]'
                                    : 'text-[#1e1e1e]'
                                }`}>
                                  UPLOAD IMAGE
                                </span>
                                {/* Green dot indicator */}
                                <div className="w-[6px] h-[6px] rounded-full bg-[#1abb6c] ml-auto" />
                              </motion.button>

                              {/* FIND PLACE button */}
                              <motion.button
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "47.994px" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.08 }}
                                style={{ overflow: "hidden", marginBottom: "6px" }} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowSearchPanel(true);
                                  setIsAddMenuExpanded(false);
                                }}
                                disabled={(selectedTemplate && filledTemplateItems.every(item => item !== null)) || isGooglePlaceSelected}
                                className={`relative h-[47.994px] rounded-[16px] flex items-center justify-start gap-[8px] px-[16px] transition-transform ${
                                  (selectedTemplate && filledTemplateItems.every(item => item !== null)) || isGooglePlaceSelected
                                    ? 'bg-[#f5f5f5] cursor-not-allowed'
                                    : 'bg-white active:scale-95'
                                }`}
                              >
                                <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                                <svg
                                  width={20}
                                  height={20}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke={(selectedTemplate && filledTemplateItems.every(item => item !== null)) || isGooglePlaceSelected ? 'rgba(30,30,30,0.3)' : 'currentColor'}
                                  strokeWidth={2.5}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="relative flex-shrink-0"
                                >
                                  <circle cx="11" cy="11" r="8" />
                                  <path d="m21 21-4.35-4.35" />
                                </svg>
                                <span className={`font-['Baloo_Tamma',sans-serif] text-[14px] uppercase leading-[normal] ${
                                  (selectedTemplate && filledTemplateItems.every(item => item !== null)) || isGooglePlaceSelected
                                    ? 'text-[rgba(30,30,30,0.3)]'
                                    : 'text-[#1e1e1e]'
                                }`}>
                                  FIND PLACE
                                </span>
                              </motion.button>

                              {/* ADD MUSIC button */}
                              <motion.button
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "47.994px" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.12 }}
                                style={{ overflow: "hidden", marginBottom: "6px" }} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowMusicSelectionPopup(true);
                                  setIsAddMenuExpanded(false);
                                }}
                                disabled={isGooglePlaceSelected}
                                className={`relative h-[47.994px] rounded-[16px] flex items-center justify-start gap-[8px] px-[16px] transition-transform ${
                                  isGooglePlaceSelected
                                    ? 'bg-[#f5f5f5] cursor-not-allowed'
                                    : 'bg-white active:scale-95'
                                }`}
                              >
                                <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                                <Music className="w-5 h-5 relative flex-shrink-0" strokeWidth={2.5} style={{ color: isGooglePlaceSelected ? 'rgba(30,30,30,0.3)' : undefined }} />
                                <span className={`font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase leading-[normal] ${
                                  isGooglePlaceSelected ? 'text-[rgba(30,30,30,0.3)]' : 'text-[#1e1e1e]'
                                }`}>
                                  ADD MUSIC
                                </span>
                              </motion.button>

                              {/* USE TEMPLATE / REMOVE TEMPLATE button */}
                              <motion.button
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "47.994px" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.16 }}
                                style={{ overflow: "hidden", marginBottom: "6px" }} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (selectedTemplate) {
                                    // Remove template
                                    setSelectedTemplate(null);
                                    setFilledTemplateItems([null, null, null]);
                                    setSelectedTemplateIndex(null);
                                    setIsAddMenuExpanded(false);
                                  } else if (getCombinedPlaces().length === 0) {
                                    // Start template browsing
                                    setIsTemplateBrowsing(true);
                                    setCurrentBrowsingTemplateIndex(0);
                                    setIsAddMenuExpanded(false);
                                  }
                                }}
                                disabled={(getCombinedPlaces().length > 0 && !selectedTemplate) || isGooglePlaceSelected}
                                className={`relative h-[47.994px] rounded-[16px] flex items-center justify-start gap-[8px] px-[16px] transition-transform ${(getCombinedPlaces().length > 0 && !selectedTemplate) || isGooglePlaceSelected ? 'bg-[#f5f5f5] cursor-not-allowed' : 'bg-white active:scale-95'}`}
                              >
                                <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                                <div className="relative shrink-0 size-[20px]">
                                  <svg className="block size-full" fill={(getCombinedPlaces().length > 0 && !selectedTemplate) || isGooglePlaceSelected ? 'rgba(30,30,30,0.3)' : 'black'} viewBox="0 0 24 24">
                                    <path d="M20.5,11H19V7c0-1.1-0.9-2-2-2h-4V3.5C13,2.12,11.88,1,10.5,1S8,2.12,8,3.5V5H4C2.9,5,2,5.9,2,7v3.8h1.5 c1.49,0,2.7,1.21,2.7,2.7s-1.21,2.7-2.7,2.7H2V20c0,1.1,0.9,2,2,2h3.8v-1.5c0-1.49,1.21-2.7,2.7-2.7c1.49,0,2.7,1.21,2.7,2.7V22H17 c1.1,0,2-0.9,2-2v-4h1.5c1.38,0,2.5-1.12,2.5-2.5S21.88,11,20.5,11z"/>
                                  </svg>
                                </div>
                                <span className={`font-['Baloo_Tamma',sans-serif] text-[14px] uppercase leading-[normal] ${(getCombinedPlaces().length > 0 && !selectedTemplate) || isGooglePlaceSelected ? 'text-[rgba(30,30,30,0.3)]' : 'text-[#1e1e1e]'}`}>
                                  {selectedTemplate ? 'REMOVE TEMPLATE' : 'USE TEMPLATE'}
                                </span>
                              </motion.button>
                            </>
                            );
                            })()}
                          </AnimatePresence>

                          {/* Collapsed ADD button */}
                          <AnimatePresence mode="wait">
                            {!isAddMenuExpanded && (() => {
                              // Check if any step is selected
                              const combinedSteps = getCombinedSteps();
                              const selectedStep = selectedMapStepIndex >= 0 && selectedMapStepIndex < combinedSteps.length 
                                ? combinedSteps[selectedMapStepIndex] 
                                : null;
                              const isAnyStepSelected = selectedStep !== null;
                              
                              return (
                                <motion.button
                                  key="add-button-collapsed"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "47.994px" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsAddMenuExpanded(true);
                                  }}
                                  className="relative rounded-[16px] bg-[#1abb6c] flex items-center justify-start gap-[8px] px-[16px] overflow-hidden active:scale-95 transition-transform shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                                >
                                  {isAnyStepSelected ? (
                                    <>
                                      <Camera className="w-5 h-5 relative flex-shrink-0 text-white" strokeWidth={2.5} />
                                      <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-white uppercase leading-[normal]">
                                        ADD PHOTO
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-5 h-5 relative flex-shrink-0 text-white" strokeWidth={2.5} />
                                      <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-white uppercase leading-[normal]">
                                        ADD
                                      </span>
                                    </>
                                  )}
                                </motion.button>
                              );
                            })()}
                          </AnimatePresence>
                        </div>

                        {/* Music chip - shown to the right of ADD button when music is selected */}
                        {selectedMapMusicIndex !== null && !isAddMenuExpanded && (() => {
                          // Check if selected step is a Google place
                          const combinedSteps = getCombinedSteps();
                          const selectedStep = selectedMapStepIndex >= 0 && selectedMapStepIndex < combinedSteps.length 
                            ? combinedSteps[selectedMapStepIndex] 
                            : null;
                          const isGooglePlaceSelected = selectedStep?.source === 'google' && selectedStep?.hasUserPhoto === false;
                          
                          // Don't show music chip if Google place is selected
                          if (isGooglePlaceSelected) return null;
                          
                          return (
                            <button
                              onClick={() => setShowMusicSelectionPopup(true)}
                              className="bg-white border-4 border-[#e9e9e9] border-solid rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] px-[16px] h-[47.994px] flex items-center justify-center gap-[8px] active:scale-95 transition-transform flex-shrink-0"
                            >
                              <Music className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                              <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase leading-[normal] whitespace-nowrap">
                                {songOptions[selectedMapMusicIndex]}
                              </span>
                            </button>
                          );
                        })()}
                        
                        {/* Warning chip - shown when there are Google Places without user photos */}
                        {hasGooglePlacesWithoutPhotos() && !isAddMenuExpanded && (
                          <button
                            onClick={() => setShowGooglePlacesWarning(true)}
                            className="bg-white border-4 border-[#e9e9e9] border-solid rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] px-[16px] h-[47.994px] flex items-center justify-center gap-[8px] active:scale-95 transition-transform flex-shrink-0"
                          >
                            <TriangleAlert className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                            <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase leading-[normal]">
                              ONLY ME
                            </span>
                          </button>
                        )}
                        </div>
                      </div>
                      )}

                      {/* Step tiles scrollable container - positioned at same location as camera view */}
                      {!isTemplateBrowsing && !selectedTemplate && (
                      <div 
                        ref={mapStepBarScrollRef}
                        className="absolute left-0 top-[691px] z-[30] w-full h-[136px] overflow-x-auto overflow-y-visible pointer-events-auto"
                        style={{
                          scrollbarWidth: 'none',
                          WebkitOverflowScrolling: 'touch'
                        }}
                      >
                        <style>{`
                          div::-webkit-scrollbar {
                            display: none;
                          }
                        `}</style>
                        
                        <div className="relative flex gap-2 pl-[35px] pr-[55px]">
                          {/* Connecting bar - only show when there are 2+ items and not dragging */}
                          {!isDragging && getCombinedPlaces().length > 1 && (
                            <div 
                              className="absolute bg-[#e9e9e9] h-[60px] rounded-[20642200px] top-[18px]" 
                              style={{ 
                                left: '39px',
                                width: `${(getCombinedPlaces().length - 1) * 104 + 48}px`
                              }} 
                            />
                          )}

                          {/* Show filled tiles or empty placeholders */}
                          {getCombinedPlaces().length > 0 ? (
                            // When there are items, show only filled tiles
                            getCombinedPlaces().map((place, index) => (
                              <DraggableStepTile
                                key={place.id}
                                place={place}
                                index={index}
                                isSelected={selectedMapStepIndex === index}
                                onClick={() => {
                                  // Toggle selection: select on first tap, deselect on second tap
                                  if (selectedMapStepIndex === index) {
                                    // Already selected - deselect it
                                    setSelectedMapStepIndex(-1);
                                  } else {
                                    // Not selected - select it and expand image
                                    setSelectedMapStepIndex(index);
                                    setIsMapImageMinimized(false);
                                  }
                                }}
                                onLongPressStart={() => {
                                  // Use unified step settings for all steps (camera and map)
                                  if (mapPlaceLongPressTimerRef.current) {
                                    clearTimeout(mapPlaceLongPressTimerRef.current);
                                  }
                                  mapPlaceLongPressTimerRef.current = setTimeout(() => {
                                    setStepSettingsIndex(index);
                                  }, 500);
                                }}
                                onLongPressEnd={() => {
                                  if (mapPlaceLongPressTimerRef.current) {
                                    clearTimeout(mapPlaceLongPressTimerRef.current);
                                    mapPlaceLongPressTimerRef.current = null;
                                  }
                                }}
                              />
                            ))
                          ) : (
                            // When no items, show 3 filled placeholders with fade-out opacity
                            [0, 1, 2].map((index) => {
                              const opacities = [0.6, 0.4, 0.2];
                              return (
                                <div 
                                  key={index} 
                                  className="relative flex-shrink-0"
                                  style={{ zIndex: 10, opacity: opacities[index] }}
                                >
                                  <div className="w-[95.998px] h-[95.998px] rounded-[20px] border-[8px] border-[#e9e9e9] bg-white" />
                                </div>
                              );
                            })
                          )}

                          {/* POST/UPDATE button - shows when 2+ items (or in edit mode with changes) */}
                          {getCombinedPlaces().length >= 2 && (!isEditMode || hasChanges) && (
                            <>
                              <button
                                onClick={handlePost}
                                type="button"
                                className="relative flex-shrink-0"
                              >
                                {isEditMode && hasChanges ? (
                                  // White UPDATE button in edit mode
                                  <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform border-[8px] border-[#e9e9e9]">
                                    <ArrowUp className="w-12 h-12 text-black" strokeWidth={2.5} />
                                  </div>
                                ) : (
                                  // Green POST button in create mode
                                  <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-[#1abb6c] flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
                                    <ArrowUp className="w-12 h-12 text-white" strokeWidth={2.5} />
                                  </div>
                                )}
                              </button>
                              {/* Invisible spacer to allow POST button to scroll to center */}
                              <div className="flex-shrink-0" style={{ width: 'calc((100vw - 96px) / 2)' }} />
                            </>
                          )}
                        </div>
                      </div>
                      )}
                    </>


                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bottom Sheet */}
        <AnimatePresence>
          {showSearchPanel && (
            <>
              {/* Scrim */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-[60]"
                onClick={() => {
                  setShowSearchPanel(false);
                  setSearchQuery('');
                  setIsSearchSheetExpanded(false);
                }}
              />

              {/* Search Bottom Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ 
                  y: 0,
                  height: isSearchSheetExpanded ? '100vh' : 'auto'
                }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className={`absolute ${isSearchSheetExpanded ? 'top-0' : 'bottom-0'} left-0 right-0 bg-white ${isSearchSheetExpanded ? 'rounded-[0px]' : 'rounded-t-[30px]'} z-[70] flex flex-col`}
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
                        setShowSearchPanel(false);
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
                        {(() => {
                          const mockPlaces = [
                            {
                              id: '1',
                              name: 'THE COFFEE HOUSE',
                              type: 'CAFE',
                              distance: '0.3 KM',
                              image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                            },
                            {
                              id: '2',
                              name: 'CENTRAL PARK',
                              type: 'PARK',
                              distance: '0.8 KM',
                              image: 'https://images.unsplash.com/photo-1511207538754-e8555f2bc187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                            },
                            {
                              id: '3',
                              name: 'SAKURA RAMEN',
                              type: 'RESTAURANT',
                              distance: '1.2 KM',
                              image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                            },
                            {
                              id: '4',
                              name: 'GREEN GARDENS',
                              type: 'PARK',
                              distance: '1.5 KM',
                              image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                            },
                            {
                              id: '5',
                              name: 'URBAN BISTRO',
                              type: 'RESTAURANT',
                              distance: '2.0 KM',
                              image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                            }
                          ];
                          const filteredResults = mockPlaces.filter(place => 
                            place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            place.type.toLowerCase().includes(searchQuery.toLowerCase())
                          );
                          return filteredResults.length > 0 ? `${filteredResults.length} RESULTS` : 'NO RESULTS FOUND';
                        })()}
                      </p>
                    ) : (
                      <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[rgba(30,30,30,0.7)] uppercase">
                        NEARBY PLACES
                      </p>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex justify-center">
                  <div className="w-[300px] space-y-3">
                    {(() => {
                      const mockPlaces = [
                        {
                          id: '1',
                          name: 'THE COFFEE HOUSE',
                          type: 'CAFE',
                          distance: '0.3 KM',
                          image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                        },
                        {
                          id: '2',
                          name: 'CENTRAL PARK',
                          type: 'PARK',
                          distance: '0.8 KM',
                          image: 'https://images.unsplash.com/photo-1511207538754-e8555f2bc187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                        },
                        {
                          id: '3',
                          name: 'SAKURA RAMEN',
                          type: 'RESTAURANT',
                          distance: '1.2 KM',
                          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                        },
                        {
                          id: '4',
                          name: 'GREEN GARDENS',
                          type: 'PARK',
                          distance: '1.5 KM',
                          image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                        },
                        {
                          id: '5',
                          name: 'URBAN BISTRO',
                          type: 'RESTAURANT',
                          distance: '2.0 KM',
                          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'
                        }
                      ];

                      const filteredResults = searchQuery.trim() 
                        ? mockPlaces.filter(place => 
                            place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            place.type.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                        : mockPlaces.slice(0, 3); // Show only 3 nearby places when no search query

                      return (
                        <>
                          {filteredResults.length > 0 ? (
                            <>
                              <AnimatePresence mode="popLayout">
                                {(isSearchSheetExpanded ? filteredResults : filteredResults.slice(0, 3)).map((place, index) => (
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
                                      // Add place to selectedPlaces
                                      const nextPosition = getNextPosition();
                                      const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
                                      const newPlace = {
                                        id: uniqueId,
                                        name: place.name,
                                        image: place.image,
                                        position: nextPosition,
                                        mode: 'places' as const
                                      };
                                      setSelectedPlaces([...selectedPlaces, newPlace]);
                                      setShowSearchPanel(false);
                                      setSearchQuery('');
                                      setIsSearchSheetExpanded(false);
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
                              {!isSearchSheetExpanded && filteredResults.length > 3 && (
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
                          ) : null}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Slide-in Templates Panel */}
        <div 
          className={`absolute inset-0 z-50 transition-transform duration-300 ease-out ${
            showTemplatesPanel ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <TemplatesPage 
            onBack={() => setShowTemplatesPanel(false)}
            onSelectTemplate={(template) => {
              setSelectedTemplate(template);
              // Reset filled items and selected index when new template is selected
              setFilledTemplateItems([null, null, null]);
              setSelectedTemplateIndex(null);
              setShowTemplatesPanel(false);
            }}
          />
        </div>

        {postDialog}
        {mapCloseDialog}
        {googlePlacesWarningDialog}

        {/* Search Place Warning Popup */}
        {showSearchPlaceWarning && (
          <div className="fixed top-[120px] left-1/2 -translate-x-1/2 z-[70] px-4">
            <div className="bg-white rounded-[16px] px-6 py-3 border-4 border-[#e9e9e9] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] max-w-[340px]">
              <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#717171] text-center">
                Places added without your own photos can't be posted publicly.
              </p>
            </div>
          </div>
        )}

        {/* Music Selection Popup */}
        {showMusicSelectionPopup && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center"
            onClick={() => setShowMusicSelectionPopup(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Popup Content */}
            <div 
              className="relative bg-white rounded-[30px] w-[340px] p-6 mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Border */}
              <div className="absolute inset-0 border-8 border-[#e9e9e9] rounded-[30px] pointer-events-none" />
              
              {/* Content */}
              <div className="relative">
                {/* Title */}
                <h2 className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] uppercase text-center mb-4">
                  SELECT MUSIC
                </h2>
                
                {/* Music Options */}
                <div className="space-y-3">
                  {songOptions.map((songName, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedMapMusicIndex(index);
                        setShowMusicSelectionPopup(false);
                      }}
                      className={`w-full border-4 rounded-[20px] h-[70px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] ${
                        selectedMapMusicIndex === index
                          ? 'bg-[#1abb6c] border-[#1abb6c]'
                          : 'bg-white border-[#e9e9e9]'
                      }`}
                    >
                      <Music className={`w-6 h-6 ${selectedMapMusicIndex === index ? 'text-white' : 'text-[#1e1e1e]'}`} strokeWidth={2.5} />
                      <span className={`font-['Baloo_Tamma',sans-serif] text-[18px] uppercase ${
                        selectedMapMusicIndex === index ? 'text-white' : 'text-[#1e1e1e]'
                      }`}>
                        {songName}
                      </span>
                    </button>
                  ))}
                  
                  {/* No Music Option */}
                  <button
                    onClick={() => {
                      setSelectedMapMusicIndex(null);
                      setShowMusicSelectionPopup(false);
                    }}
                    className={`w-full border-4 rounded-[20px] h-[70px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] ${
                      selectedMapMusicIndex === null
                        ? 'bg-[#1abb6c] border-[#1abb6c]'
                        : 'bg-white border-[#e9e9e9]'
                    }`}
                  >
                    <div className="relative">
                      <Music className={`w-6 h-6 ${selectedMapMusicIndex === null ? 'text-white' : 'text-[#1e1e1e]'}`} strokeWidth={2.5} />
                      {selectedMapMusicIndex === null && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[2px] h-8 bg-white rotate-45" />
                        </div>
                      )}
                    </div>
                    <span className={`font-['Baloo_Tamma',sans-serif] text-[18px] uppercase ${
                      selectedMapMusicIndex === null ? 'text-white' : 'text-[#1e1e1e]'
                    }`}>
                      NO MUSIC
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Gallery Modal */}
        {showPhotoGallery && galleryStepIndex !== null && galleryStepIndex < steps.length && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center"
            onClick={() => {
              setShowPhotoGallery(false);
              setGalleryStepIndex(null);
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Popup Content */}
            <div 
              className="relative bg-white rounded-[30px] w-[340px] max-h-[500px] p-6 mx-auto overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Border */}
              <div className="absolute inset-0 border-8 border-[#e9e9e9] rounded-[30px] pointer-events-none" />
              
              {/* Content */}
              <div className="relative">
                {/* Title */}
                <h2 className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] uppercase text-center mb-4">
                  MANAGE PHOTOS
                </h2>
                
                {/* Photo Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {steps[galleryStepIndex].photos.map((photo, photoIndex) => (
                    <div key={photoIndex} className="relative">
                      <img 
                        src={photo} 
                        alt={`Photo ${photoIndex + 1}`}
                        className="w-full aspect-square object-cover rounded-[16px] border-4 border-[#e9e9e9]"
                      />
                      
                      {/* Cover indicator */}
                      {steps[galleryStepIndex].coverImage === photo && (
                        <div className="absolute top-2 left-2 bg-[#1abb6c] text-white rounded-[8px] px-2 py-1">
                          <span className="font-['Baloo_Tamma',sans-serif] text-[12px] uppercase">COVER</span>
                        </div>
                      )}
                      
                      {/* Action buttons */}
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        {/* Set as cover */}
                        {steps[galleryStepIndex].coverImage !== photo && (
                          <button
                            onClick={() => {
                              const updatedStep = { 
                                ...steps[galleryStepIndex], 
                                coverImage: photo,
                                image: photo // Keep image in sync with coverImage
                              };
                              const newSteps = [...steps];
                              newSteps[galleryStepIndex] = updatedStep;
                              setSteps(newSteps);
                            }}
                            className="bg-white rounded-full p-1.5 shadow-md active:scale-95 transition-transform"
                          >
                            <ImageIcon className="w-4 h-4 text-[#1abb6c]" />
                          </button>
                        )}
                        
                        {/* Delete */}
                        <button
                          onClick={() => {
                            const updatedPhotos = steps[galleryStepIndex].photos.filter((_, i) => i !== photoIndex);
                            if (updatedPhotos.length === 0) {
                              // If no photos left, remove the step
                              const newSteps = steps.filter((_, i) => i !== galleryStepIndex);
                              setSteps(newSteps);
                              setShowPhotoGallery(false);
                              setGalleryStepIndex(null);
                            } else {
                              // Update step with remaining photos
                              const updatedStep = {
                                ...steps[galleryStepIndex],
                                photos: updatedPhotos,
                                coverImage: steps[galleryStepIndex].coverImage === photo ? updatedPhotos[0] : steps[galleryStepIndex].coverImage,
                                image: steps[galleryStepIndex].coverImage === photo ? updatedPhotos[0] : steps[galleryStepIndex].image
                              };
                              const newSteps = [...steps];
                              newSteps[galleryStepIndex] = updatedStep;
                              setSteps(newSteps);
                            }
                          }}
                          className="bg-white rounded-full p-1.5 shadow-md active:scale-95 transition-transform"
                        >
                          <Trash2 className="w-4 h-4 text-[#ff232f]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => {
                    setShowPhotoGallery(false);
                    setGalleryStepIndex(null);
                  }}
                  className="w-full bg-[#1abb6c] rounded-[20px] h-[60px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-white uppercase">
                    CLOSE
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step Settings Bottom Sheet */}
        {stepSettingsIndex !== null && (() => {
          const combinedSteps = getCombinedSteps();
          const step = combinedSteps[stepSettingsIndex];
          if (!step) return null;
          
          const isMapPlace = step.id.startsWith('map-');
          const isTemplateStep = step.id.startsWith('template-');
          const cameraStepIndex = isMapPlace || isTemplateStep ? -1 : steps.findIndex(s => s.id === step.id);
          
          return (
            <StepSettingsBottomSheet
              isOpen={true}
              onClose={() => setStepSettingsIndex(null)}
              step={step}
              stepNumber={stepSettingsIndex + 1}
              onDeleteStep={() => {
                if (isMapPlace) {
                  // This is a map place - remove from selectedPlaces
                  const placeId = parseInt(step.id.replace('map-', ''));
                  setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
                } else if (isTemplateStep) {
                  // This is a template step - clear the filled item
                  const templateIndex = parseInt(step.id.replace('template-', ''));
                  const newFilledItems = [...filledTemplateItems];
                  newFilledItems[templateIndex] = null;
                  setFilledTemplateItems(newFilledItems);
                } else if (cameraStepIndex !== -1) {
                  // This is a camera step - remove from steps
                  const newSteps = steps.filter((_, i) => i !== cameraStepIndex);
                  setSteps(newSteps);
                }
                setStepSettingsIndex(null);
                setSelectedMapStepIndex(-1);
              }}
              onChangeCover={step.photos && step.photos.length > 1 ? () => {
                setChangingCoverForStepIndex(stepSettingsIndex);
              } : undefined}
              onViewLocation={() => {
                // For camera steps, use the camera step index
                if (!isMapPlace && !isTemplateStep && cameraStepIndex !== -1) {
                  setChangingLocationForStepIndex?.(cameraStepIndex);
                  setStepSettingsIndex(null);
                  onOpenSearch?.(step.location);
                } else if (isMapPlace) {
                  // For map places, we can also allow location change
                  setStepSettingsIndex(null);
                  onOpenSearch?.(step.location);
                } else if (isTemplateStep) {
                  // For template steps, also allow location change
                  setStepSettingsIndex(null);
                  onOpenSearch?.(step.location);
                }
              }}
            />
          );
        })()}

        {/* Change Cover Photo Selection UI */}
        {changingCoverForStepIndex !== null && (() => {
          const combinedSteps = getCombinedSteps();
          const step = combinedSteps[changingCoverForStepIndex];
          if (!step || !step.photos || step.photos.length <= 1) return null;
          
          const isMapPlace = step.id.startsWith('map-');
          const isTemplateStep = step.id.startsWith('template-');
          const cameraStepIndex = isMapPlace || isTemplateStep ? -1 : steps.findIndex(s => s.id === step.id);
          
          // Find the current cover index
          const currentCoverIndex = step.photos.findIndex(p => p === step.coverImage) || 0;
          
          return (
            <CoverPhotoPicker
              isOpen={true}
              onClose={() => {
                setChangingCoverForStepIndex(null);
                setStepSettingsIndex(null);
              }}
              photos={step.photos}
              selectedCoverIndex={currentCoverIndex}
              onSelectCover={(index) => {
                const newCoverPhoto = step.photos[index];
                // Update the step's cover image
                if (cameraStepIndex !== -1) {
                  const updatedStep = {
                    ...steps[cameraStepIndex],
                    coverImage: newCoverPhoto,
                    image: newCoverPhoto // Keep image in sync with coverImage
                  };
                  const newSteps = [...steps];
                  newSteps[cameraStepIndex] = updatedStep;
                  setSteps(newSteps);
                }
              }}
            />
          );
        })()}

        </div>
      </DndProvider>
    );
  }

  // IDLE STATE - No steps and no places
  if (steps.length === 0 && selectedPlaces.length === 0) {
    return (
      <div key="camera-idle" className="relative h-full w-full bg-black overflow-hidden">
        {/* Hidden file input for gallery */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Top Left Back Button */}
        <div className="absolute left-[26px] top-[28px] z-20">
          <button 
            onClick={handleMapView}
            className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform border-[3.691px] border-[#e9e9e9]"
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Step text at top center - always show in camera view */}
        <div className="absolute top-[46px] left-1/2 -translate-x-1/2 z-30">
          <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-white uppercase leading-[normal] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            STEP {(() => {
              // If in capture session mode, use the fixed step number
              if (captureStepNumber !== null) {
                return captureStepNumber;
              }
              // If adding photos to existing step, use that index
              if (addingPhotosToStepIndex !== null) {
                return addingPhotosToStepIndex + 1;
              }
              // Otherwise, calculate next step number
              const combinedSteps = getCombinedSteps();
              return combinedSteps.length + 1;
            })()}
          </span>
        </div>

        {/* STEP N Label - shown when activeStepIndex is set */}
        {activeStepIndex >= 0 && activeStepIndex < steps.length && (
          <div className="absolute left-[26px] top-[630px] z-20 pointer-events-none">
            <div className="bg-white rounded-[16px] px-4 py-2 border-4 border-[#e9e9e9] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]">
              <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase">
                STEP {activeStepIndex + 1}
              </p>
            </div>
          </div>
        )}

        {/* ONLY FOR ME Pill - shown when route has incomplete steps (not when adding photos to a step) */}
        {(() => {
          // Don't show when adding photos to a step or in capture session mode
          if (addingPhotosToStepIndex !== null || captureStepNumber !== null) {
            return null;
          }
          const combinedSteps = getCombinedSteps();
          const hasIncomplete = combinedSteps.some(s => s.source === 'google' && !s.hasUserPhoto);
          return hasIncomplete && (
            <div className="absolute left-1/2 -translate-x-1/2 top-[630px] z-20 pointer-events-none">
              <div className="bg-white rounded-[16px] px-4 py-2 border-4 border-[#e9e9e9] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#e9e9e9]" />
                <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#e9e9e9] uppercase">
                  ONLY FOR ME
                </p>
              </div>
            </div>
          );
        })()}

        {/* Bottom Step Bar with single Capture Button */}
        {/* Overlay allowance wrapper - extends upward to prevent delete button clipping */}
        <div 
          className="absolute left-0 w-full z-10 pointer-events-none overflow-visible"
          style={{ 
            top: `${691 - 80}px`, // STEP_BAR_TOP - OVERLAY_SPACE
            height: `${136 + 80}px` // Original height + OVERLAY_SPACE
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[136px] overflow-visible">
            <StepBar
            steps={(() => {
              // In capture mode for new step, only show photos from current capture session
              if (captureStepNumber !== null) {
                return tempCapturePhotos.map((photo, index) => ({
                  id: `temp-${index}`,
                  image: photo,
                  location: '',
                  type: 'photo' as const,
                  thumbnail: undefined,
                  templateIcon: undefined,
                  templateLabel: undefined,
                  photos: [photo],
                  coverImage: photo,
                  hasUserPhoto: true,
                  source: 'user' as const
                }));
              }
              // If adding photos to existing Google place, show only temp photos for that step
              if (addingPhotosToStepIndex !== null) {
                return tempPhotosForStep.map((photo, index) => ({
                  id: `temp-${index}`,
                  image: photo,
                  location: '',
                  type: 'photo' as const,
                  thumbnail: undefined,
                  templateIcon: undefined,
                  templateLabel: undefined,
                  photos: [photo],
                  coverImage: photo,
                  hasUserPhoto: true,
                  source: 'user' as const
                }));
              }
              // Otherwise show all combined steps
              return getCombinedSteps().map(step => ({
                id: step.id,
                image: step.image,
                location: step.location,
                type: step.type,
                thumbnail: step.thumbnail,
                templateIcon: step.templateIcon,
                templateLabel: step.templateLabel,
                photos: step.photos,
                coverImage: step.coverImage,
                hasUserPhoto: step.hasUserPhoto,
                source: step.source
              }));
            })()}
            selectedStepIndex={
              // In camera view with template, highlight the next unfilled step
              selectedTemplate && !showMapView
                ? filledTemplateItems.findIndex(item => item === null)
                : selectedStepIndex
            }
            showPostButton={
              // Show POST button when all template items are filled
              selectedTemplate ? filledTemplateItems.every(item => item !== null) : false
            }
            onStepClick={(index) => {
              // If template is active, clicking template steps should select them for filtering
              if (selectedTemplate) {
                const combinedSteps = getCombinedSteps();
                const clickedStep = combinedSteps[index];
                if (clickedStep.id.startsWith('template-')) {
                  const templateIndex = parseInt(clickedStep.id.replace('template-', ''));
                  // Check if this template item is filled
                  const isFilled = filledTemplateItems[templateIndex] !== null;
                  
                  if (isFilled) {
                    // Filled template item - behave like a normal step (toggle full screen)
                    setSelectedStepIndex(selectedStepIndex === index ? -1 : index);
                    // Clear template selection to prevent map filtering
                    setSelectedTemplateIndex(null);
                  } else {
                    // Unfilled template item - filter markers and switch to map view
                    if (selectedTemplateIndex === templateIndex) {
                      setSelectedTemplateIndex(null);
                    } else {
                      setSelectedTemplateIndex(templateIndex);
                    }
                    setShowMapView(true);
                    // Clear step selection when filtering
                    setSelectedStepIndex(-1);
                  }
                  return;
                }
              }
              // Normal behavior: Toggle step selection and set as active for adding photos
              const newSelectedIndex = selectedStepIndex === index ? -1 : index;
              setSelectedStepIndex(newSelectedIndex);
              
              // If selecting a step, set it as active for adding photos (map combined index to steps array index)
              if (newSelectedIndex >= 0) {
                const combinedSteps = getCombinedSteps();
                const selectedStep = combinedSteps[newSelectedIndex];
                
                // Only set activeStepIndex for user steps (not map places or templates)
                if (selectedStep && !selectedStep.id.startsWith('map-') && !selectedStep.id.startsWith('template-')) {
                  const stepIndex = steps.findIndex(s => s.id === selectedStep.id);
                  if (stepIndex >= 0) {
                    setActiveStepIndex(stepIndex);
                  } else {
                    setActiveStepIndex(-1);
                  }
                } else {
                  setActiveStepIndex(-1);
                }
              } else {
                setActiveStepIndex(-1);
              }
            }}
            onStepLongPress={handleStepLongPress}
            onCaptureClick={handleCapture}
            onCaptureHoldStart={handleCaptureHoldStart}
            onCaptureHoldEnd={handleCaptureHoldEnd}
            onPostClick={handlePost}
            onDeleteStep={(index) => {
              // Determine if this is a camera step or map place
              const combinedSteps = getCombinedSteps();
              const stepToDelete = combinedSteps[index];
              
              if (stepToDelete.id.startsWith('map-')) {
                // This is a map place - remove from selectedPlaces
                const placeId = parseInt(stepToDelete.id.replace('map-', ''));
                setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
              } else {
                // This is a camera step - remove from steps
                const cameraStepIndex = steps.findIndex(s => s.id === stepToDelete.id);
                if (cameraStepIndex !== -1) {
                  const newSteps = steps.filter((_, i) => i !== cameraStepIndex);
                  setSteps(newSteps);
                }
              }
              // Deselect the step
              setSelectedStepIndex(-1);
            }}
            mode="capture"
            isRecording={isRecording}
            showContinueArrow={captureStepNumber !== null && tempCapturePhotos.length > 0}
            onContinueClick={() => {
              // Complete the capture session and create the step
              if (tempCapturePhotos.length > 0) {
                const autoLocation = mockLocationNames[Math.floor(Math.random() * mockLocationNames.length)];
                const newStep: Step = {
                  id: Date.now().toString(),
                  image: tempCapturePhotos[0], // First photo as main image
                  caption: '',
                  location: autoLocation,
                  suggestion: '',
                  type: 'photo',
                  photos: tempCapturePhotos, // All captured photos
                  coverImage: tempCapturePhotos[0], // First photo as cover
                  hasUserPhoto: true,
                  source: 'user',
                  position: getNextPosition() // Assign position at the end
                };
                
                setSteps([...steps, newStep]);
                // Reset capture session state
                setTempCapturePhotos([]);
                setCaptureStepNumber(null);
                // Return to map view
                setShowMapView(true);
              }
            }}
          />
          </div>
        </div>
        {postDialog}
        {closeDialog}
        {googlePlacesWarningDialog}
      </div>
    );
  }

  // HAS STEPS STATE
  return (
    <div key="camera-has-steps" className="relative h-full w-full bg-black overflow-visible">
      {/* Hidden file input for gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Full-screen expanded step image/video */}
      {(() => {
        const combinedSteps = getCombinedSteps();
        if (selectedStepIndex >= 0 && selectedStepIndex < combinedSteps.length) {
          const selectedStep = combinedSteps[selectedStepIndex];
          // Only show full screen if the step has an image (filled template or regular step)
          if (selectedStep.image) {
            return (
              <div className="absolute inset-0 z-0">
                {selectedStep.type === 'video' && selectedStep.videoUrl ? (
                  <video 
                    key={selectedStep.id}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                    src={selectedStep.videoUrl}
                  />
                ) : (
                  <ImageWithFallback 
                    src={selectedStep.image}
                    alt={selectedStep.location}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            );
          }
        }
        return null;
      })()}

      {/* Top Left Back Button / Close Button */}
      <div className="absolute left-[26px] top-[28px] z-20">
        <button
          onClick={() => {
            if (selectedStepIndex >= 0) {
              setSelectedStepIndex(-1);
            } else if (addingPhotosToStepIndex !== null) {
              // Check if all photos were deleted
              if (tempPhotosForStep.length === 0) {
                // User deleted all photos - need to restore the Google Place or remove the step
                const combinedSteps = getCombinedSteps();
                const stepToUpdate = combinedSteps[addingPhotosToStepIndex];
                
                if (stepToUpdate) {
                  // If it's a user step, check if it has an originalPlace to restore
                  if (!stepToUpdate.id.startsWith('map-') && !stepToUpdate.id.startsWith('template-')) {
                    const stepIndex = steps.findIndex(s => s.id === stepToUpdate.id);
                    if (stepIndex !== -1) {
                      const step = steps[stepIndex];
                      
                      // If this step has an originalPlace, restore the Google Place
                      if (step.originalPlace) {
                        // Restore the Google Place back to selectedPlaces
                        setSelectedPlaces([...selectedPlaces, step.originalPlace]);
                      }
                      
                      // Remove the user step
                      const newSteps = steps.filter((_, i) => i !== stepIndex);
                      setSteps(newSteps);
                    }
                  }
                }
              } else {
                // User has photos in tempPhotosForStep - save them before exiting
                const combinedSteps = getCombinedSteps();
                const stepToUpdate = combinedSteps[addingPhotosToStepIndex];
                
                if (stepToUpdate) {
                  if (stepToUpdate.id.startsWith('map-')) {
                    // This is a map place - convert it to user step
                    const placeId = parseInt(stepToUpdate.id.replace('map-', ''));
                    const placeIndex = selectedPlaces.findIndex(p => p.id === placeId);
                    
                    if (placeIndex !== -1) {
                      // Store the original Google Place data for potential restoration
                      const originalPlaceData = {
                        id: selectedPlaces[placeIndex].id,
                        image: selectedPlaces[placeIndex].image,
                        name: selectedPlaces[placeIndex].name,
                        position: selectedPlaces[placeIndex].position
                      };
                      
                      const newStep: Step = {
                        id: Date.now().toString(),
                        image: tempPhotosForStep[0],
                        caption: '',
                        location: selectedPlaces[placeIndex].name.toUpperCase(),
                        suggestion: '',
                        type: 'photo',
                        photos: tempPhotosForStep,
                        coverImage: tempPhotosForStep[0],
                        hasUserPhoto: true,
                        source: 'user',
                        position: stepToUpdate.position !== undefined ? stepToUpdate.position : addingPhotosToStepIndex,
                        originalPlace: originalPlaceData // Store original Google Place for restoration
                      };
                      
                      setSelectedPlaces(selectedPlaces.filter(p => p.id !== placeId));
                      setSteps([...steps, newStep]);
                    }
                  } else {
                    // This is an existing user step - update its photos
                    const stepIndex = steps.findIndex(s => s.id === stepToUpdate.id);
                    if (stepIndex !== -1) {
                      const updatedStep = {
                        ...steps[stepIndex],
                        photos: tempPhotosForStep,
                        image: tempPhotosForStep[0],
                        coverImage: tempPhotosForStep[0]
                      };
                      const newSteps = [...steps];
                      newSteps[stepIndex] = updatedStep;
                      setSteps(newSteps);
                    }
                  }
                }
              }
              
              // Reset state and return to map
              setAddingPhotosToStepIndex(null);
              setTempPhotosForStep([]);
              setSelectedMapStepIndex(-1); // Clear any selected step
              setIsMapImageMinimized(true); // Reset to minimized state
              setShowMapView(true);
            } else {
              setShowMapView(true);
            }
          }}
          className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform border-[3.691px] border-[#e9e9e9]"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>
      
      {/* Step text at top center - always show in camera view */}
      <div className="absolute top-[46px] left-1/2 -translate-x-1/2 z-30">
        <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-white uppercase leading-[normal] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          STEP {(() => {
            // If in capture session mode, use the fixed step number
            if (captureStepNumber !== null) {
              return captureStepNumber;
            }
            // If adding photos to existing step, use that index
            if (addingPhotosToStepIndex !== null) {
              return addingPhotosToStepIndex + 1;
            }
            // Otherwise, calculate next step number
            const combinedSteps = getCombinedSteps();
            return combinedSteps.length + 1;
          })()}
        </span>
      </div>

      {/* Top Right Sidebar - Location and Delete buttons only */}
      <div className="absolute right-[26px] top-[28px] flex flex-col gap-[11.996px] z-20">
        {/* Delete Button - Only visible when a step is selected and has an image (full screen mode) */}
        {(() => {
          if (selectedStepIndex >= 0) {
            // Check if we're in "adding photos to step" mode with temp photos
            if (addingPhotosToStepIndex !== null) {
              // We're showing temp photos - check if selected index is valid
              if (selectedStepIndex < tempPhotosForStep.length) {
                return (
                  <button 
                    onClick={() => {
                      // Remove photo from tempPhotosForStep array
                      const newTempPhotos = tempPhotosForStep.filter((_, i) => i !== selectedStepIndex);
                      setTempPhotosForStep(newTempPhotos);
                      // Deselect the step
                      setSelectedStepIndex(-1);
                    }}
                    className="relative w-[47.994px] h-[47.994px] rounded-[16px] bg-[#ff4444] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  >
                    <Trash2 className="w-6 h-6 relative" stroke="white" strokeWidth="2.5" />
                  </button>
                );
              }
            } else if (captureStepNumber !== null) {
              // We're in capture session mode with temp capture photos
              if (selectedStepIndex < tempCapturePhotos.length) {
                return (
                  <button 
                    onClick={() => {
                      // Remove photo from tempCapturePhotos array
                      const newTempPhotos = tempCapturePhotos.filter((_, i) => i !== selectedStepIndex);
                      setTempCapturePhotos(newTempPhotos);
                      // Deselect the step
                      setSelectedStepIndex(-1);
                    }}
                    className="relative w-[47.994px] h-[47.994px] rounded-[16px] bg-[#ff4444] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  >
                    <Trash2 className="w-6 h-6 relative" stroke="white" strokeWidth="2.5" />
                  </button>
                );
              }
            } else {
              // Regular mode - show combined steps
              const combinedSteps = getCombinedSteps();
              const selectedStep = combinedSteps[selectedStepIndex];
              if (selectedStep && selectedStep.image) {
                return (
                  <button 
                    onClick={() => {
                      if (selectedStep.id.startsWith('map-')) {
                        // This is a map place - remove from selectedPlaces
                        const placeId = parseInt(selectedStep.id.replace('map-', ''));
                        setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
                      } else if (selectedStep.id.startsWith('template-')) {
                        // This is a template step - clear the filled item
                        const templateIndex = parseInt(selectedStep.id.replace('template-', ''));
                        const newFilledItems = [...filledTemplateItems];
                        newFilledItems[templateIndex] = null;
                        setFilledTemplateItems(newFilledItems);
                      } else {
                        // This is a camera step - remove from steps
                        const cameraStepIndex = steps.findIndex(s => s.id === selectedStep.id);
                        if (cameraStepIndex !== -1) {
                          const newSteps = steps.filter((_, i) => i !== cameraStepIndex);
                          setSteps(newSteps);
                        }
                      }
                      // Deselect the step
                      setSelectedStepIndex(-1);
                    }}
                    className="relative w-[47.994px] h-[47.994px] rounded-[16px] bg-[#ff4444] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  >
                    <Trash2 className="w-6 h-6 relative" stroke="white" strokeWidth="2.5" />
                  </button>
                );
              }
            }
          }
          return null;
        })()}

        {/* Music Popup Chip - slides from right to left, aligned with Music button (position 3) */}
        {showMusicPopup && selectedSongIndex < 5 && (
          <div 
            className="absolute right-[62px] top-[120px] z-50"
            style={{
              animation: 'slideInFromRight 0.3s ease-out'
            }}
          >
            <div className="bg-white box-border content-stretch flex h-[48px] items-center justify-center pl-[12px] pr-[20px] py-[10px] rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] relative gap-[8px]">
              <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
              <svg className="w-6 h-6 relative shrink-0" fill="black" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-nowrap whitespace-pre uppercase">
                {songOptions[selectedSongIndex]}
              </p>
            </div>
          </div>
        )}

        {/* Location Popup Chip - shows above step bar when a step is selected and has an image */}
        {(() => {
          const combinedSteps = getCombinedSteps();
          if (selectedStepIndex >= 0 && combinedSteps[selectedStepIndex]) {
            const selectedStep = combinedSteps[selectedStepIndex];
            // Only show location chip if step has an image (full screen mode)
            if (selectedStep.image) {
              return (
                <button 
                  onClick={handleLocationChipClick}
                  className="absolute left-[50%] translate-x-[-50%] bottom-[155px] z-50 active:scale-95 transition-transform"
                >
                  <div className="bg-white box-border content-stretch flex h-[48px] items-center justify-center pl-[20px] pr-[20px] py-[10px] rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] relative gap-[8px]">
                    <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
                    
                    {/* Location name or "ADD LOCATION" */}
                    <p className="font-['Baloo_Tamma',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-nowrap whitespace-pre uppercase">
                      {selectedStep.location || 'ADD LOCATION'}
                    </p>
                    
                    {/* Edit icon */}
                    <Pencil size={15} strokeWidth={2.5} className="text-black relative shrink-0" />
                  </div>
                </button>
              );
            }
          }
          return null;
        })()}
      </div>

      {/* Bottom Step Bar */} 
      <div className="absolute left-0 top-[691px] w-full z-10 pointer-events-none overflow-visible">
        <StepBar
          steps={(() => {
            // If in capture session mode, show only temp capture photos
            if (captureStepNumber !== null) {
              return tempCapturePhotos.map((photo, idx) => ({
                id: `temp-${idx}`,
                image: photo,
                location: '',
                type: 'photo' as const,
                thumbnail: undefined,
                photos: [photo],
                coverImage: photo,
                hasUserPhoto: true,
                source: 'user' as const
              }));
            }
            // If adding photos to Google place, show only temp photos (empty if none captured yet)
            if (addingPhotosToStepIndex !== null) {
              return tempPhotosForStep.map((photo, idx) => ({
                id: `temp-${idx}`,
                image: photo,
                location: '',
                type: 'photo' as const,
                thumbnail: undefined,
                photos: [photo],
                coverImage: photo,
                hasUserPhoto: true,
                source: 'user' as const
              }));
            }
            // Otherwise show normal combined steps
            return getCombinedSteps().map(step => ({
              id: step.id,
              image: step.image,
              location: step.location,
              type: step.type,
              thumbnail: step.thumbnail,
              photos: step.photos,
              coverImage: step.coverImage,
              hasUserPhoto: step.hasUserPhoto,
              source: step.source
            }));
          })()}
          selectedStepIndex={selectedStepIndex}
          onStepClick={(index) => {
            // Toggle: if clicking the same step, deselect it; otherwise select it
            setSelectedStepIndex(selectedStepIndex === index ? -1 : index);
          }}
          onStepLongPress={handleStepLongPress}
          onCaptureClick={handleCapture}
          onCaptureHoldStart={handleCaptureHoldStart}
          onCaptureHoldEnd={handleCaptureHoldEnd}
          onPostClick={handlePost}
          onDeleteStep={(index) => {
            // Determine if this is a camera step or map place
            const combinedSteps = getCombinedSteps();
            const stepToDelete = combinedSteps[index];
            
            if (stepToDelete.id.startsWith('map-')) {
              // This is a map place - remove from selectedPlaces
              const placeId = parseInt(stepToDelete.id.replace('map-', ''));
              setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
            } else {
              // This is a camera step - remove from steps
              const cameraStepIndex = steps.findIndex(s => s.id === stepToDelete.id);
              if (cameraStepIndex !== -1) {
                const newSteps = steps.filter((_, i) => i !== cameraStepIndex);
                setSteps(newSteps);
              }
            }
            // Deselect the step
            setSelectedStepIndex(-1);
          }}
          mode="capture"
          isRecording={isRecording}
          showContinueArrow={false}
          onContinueClick={() => {
            // Handle capture session mode (creating new step)
            if (captureStepNumber !== null && tempCapturePhotos.length > 0) {
              const autoLocation = mockLocationNames[Math.floor(Math.random() * mockLocationNames.length)];
              const newStep: Step = {
                id: Date.now().toString(),
                image: tempCapturePhotos[0], // First photo as main image
                caption: '',
                location: autoLocation,
                suggestion: '',
                type: 'photo',
                photos: tempCapturePhotos, // All captured photos
                coverImage: tempCapturePhotos[0], // First photo as cover
                hasUserPhoto: true,
                source: 'user',
                position: getNextPosition() // Assign position at the end
              };
              
              setSteps([...steps, newStep]);
              // Reset capture session state
              setTempCapturePhotos([]);
              setCaptureStepNumber(null);
              // Return to map view
              setShowMapView(true);
              return;
            }
            
            // Handle adding photos to existing Google place step
            // Return to map view and add photos to the step
            if (addingPhotosToStepIndex !== null && tempPhotosForStep.length > 0) {
              const combinedSteps = getCombinedSteps();
              
              if (addingPhotosToStepIndex < combinedSteps.length) {
                const stepToUpdate = combinedSteps[addingPhotosToStepIndex];
                
                // Check if this is a Google place (either from map-id or from source property)
                const isGooglePlace = stepToUpdate.id.startsWith('map-') || 
                                     (stepToUpdate.source === 'google' && stepToUpdate.hasUserPhoto === false);
                
                // Update the step with new photos
                if (stepToUpdate.id.startsWith('template-')) {
                  // This is a template item - update filledTemplateItems with user photos
                  const templateIndex = parseInt(stepToUpdate.id.replace('template-', ''));
                  const filledData = filledTemplateItems[templateIndex];
                  
                  if (filledData) {
                    // Update the filled template item to have user photos
                    const newFilledItems = [...filledTemplateItems];
                    newFilledItems[templateIndex] = {
                      ...filledData,
                      photos: tempPhotosForStep,
                      hasUserPhoto: true
                    };
                    setFilledTemplateItems(newFilledItems);
                  }
                } else if (stepToUpdate.id.startsWith('map-')) {
                  // This is a map place - update it to have user photos
                  const placeId = parseInt(stepToUpdate.id.replace('map-', ''));
                  const placeIndex = selectedPlaces.findIndex(p => p.id === placeId);
                  
                  if (placeIndex !== -1) {
                    // Store the original Google Place data for potential restoration
                    const originalPlaceData = {
                      id: selectedPlaces[placeIndex].id,
                      image: selectedPlaces[placeIndex].image,
                      name: selectedPlaces[placeIndex].name,
                      position: selectedPlaces[placeIndex].position
                    };
                    
                    // Create new step with user photos and preserve position
                    const newStep: Step = {
                      id: Date.now().toString(),
                      image: tempPhotosForStep[0],
                      caption: '',
                      location: selectedPlaces[placeIndex].name.toUpperCase(),
                      suggestion: '',
                      type: 'photo',
                      photos: tempPhotosForStep,
                      coverImage: tempPhotosForStep[0],
                      hasUserPhoto: true,
                      source: 'user',
                      position: stepToUpdate.position !== undefined ? stepToUpdate.position : addingPhotosToStepIndex, // Preserve the original position from the Google place
                      originalPlace: originalPlaceData // Store original Google Place for restoration
                    };
                    
                    // Remove the Google place and add the user step
                    const updatedPlaces = selectedPlaces.filter(p => p.id !== placeId);
                    const updatedSteps = [...steps, newStep];
                    setSelectedPlaces(updatedPlaces);
                    setSteps(updatedSteps);
                  }
                } else if (isGooglePlace) {
                  // This is a Google place step (from edit mode) - convert to user step
                  const stepIndex = steps.findIndex(s => s.id === stepToUpdate.id);
                  if (stepIndex !== -1) {
                    const updatedStep = {
                      ...steps[stepIndex],
                      photos: tempPhotosForStep,
                      image: tempPhotosForStep[0],
                      coverImage: tempPhotosForStep[0],
                      hasUserPhoto: true,
                      source: 'user' as const
                    };
                    const newSteps = [...steps];
                    newSteps[stepIndex] = updatedStep;
                    setSteps(newSteps);
                  }
                } else {
                  // This is an existing user step - update its photos array
                  const stepIndex = steps.findIndex(s => s.id === stepToUpdate.id);
                  if (stepIndex !== -1) {
                    const updatedStep = {
                      ...steps[stepIndex],
                      photos: tempPhotosForStep,
                      image: tempPhotosForStep[0], // Update main image to first photo
                      coverImage: tempPhotosForStep[0] // Update cover image to first photo
                    };
                    const newSteps = [...steps];
                    newSteps[stepIndex] = updatedStep;
                    setSteps(newSteps);
                  }
                }
              }
            }
            
            // Reset and return to map
            setAddingPhotosToStepIndex(null);
            setTempPhotosForStep([]);
            // Keep the step selected so user can see their changes immediately
            // Don't clear selectedMapStepIndex
            setIsMapImageMinimized(true); // Reset to minimized state
            
            // Use setTimeout to ensure state updates complete before showing map view
            setTimeout(() => {
              setShowMapView(true);
            }, 0);
          }}
        />
      </div>

      {/* Green Continue Button - shown in capture mode when photos have been taken */}
      {((addingPhotosToStepIndex !== null && tempPhotosForStep.length > 0) || (captureStepNumber !== null && tempCapturePhotos.length > 0)) && (
        <div className="absolute right-[26px] top-[691px] z-20">
          <button
            onClick={() => {
              // Handle capture session mode (creating new step)
              if (captureStepNumber !== null && tempCapturePhotos.length > 0) {
                const autoLocation = mockLocationNames[Math.floor(Math.random() * mockLocationNames.length)];
                const newStep: Step = {
                  id: Date.now().toString(),
                  image: tempCapturePhotos[0],
                  caption: '',
                  location: autoLocation,
                  suggestion: '',
                  type: 'photo',
                  photos: tempCapturePhotos,
                  coverImage: tempCapturePhotos[0],
                  hasUserPhoto: true,
                  source: 'user',
                  position: getNextPosition()
                };
                
                setSteps([...steps, newStep]);
                setTempCapturePhotos([]);
                setCaptureStepNumber(null);
                setShowMapView(true);
                return;
              }
              
              // Handle adding photos to existing Google place step
              if (addingPhotosToStepIndex !== null && tempPhotosForStep.length > 0) {
                const combinedSteps = getCombinedSteps();
                
                if (addingPhotosToStepIndex < combinedSteps.length) {
                  const stepToUpdate = combinedSteps[addingPhotosToStepIndex];
                  
                  // Check if this is a Google place (either from map-id or from source property)
                  const isGooglePlace = stepToUpdate.id.startsWith('map-') || 
                                       (stepToUpdate.source === 'google' && stepToUpdate.hasUserPhoto === false);
                  
                  // Update the step with new photos
                  if (stepToUpdate.id.startsWith('template-')) {
                    // This is a template item - update filledTemplateItems with user photos
                    const templateIndex = parseInt(stepToUpdate.id.replace('template-', ''));
                    const filledData = filledTemplateItems[templateIndex];
                    
                    if (filledData) {
                      const newFilledItems = [...filledTemplateItems];
                      newFilledItems[templateIndex] = {
                        ...filledData,
                        photos: tempPhotosForStep,
                        hasUserPhoto: true
                      };
                      setFilledTemplateItems(newFilledItems);
                    }
                  } else if (stepToUpdate.id.startsWith('map-')) {
                    // This is a map place - update it to have user photos
                    const placeId = parseInt(stepToUpdate.id.replace('map-', ''));
                    const placeIndex = selectedPlaces.findIndex(p => p.id === placeId);
                    
                    if (placeIndex !== -1) {
                      const originalPlaceData = {
                        id: selectedPlaces[placeIndex].id,
                        image: selectedPlaces[placeIndex].image,
                        name: selectedPlaces[placeIndex].name,
                        position: selectedPlaces[placeIndex].position
                      };
                      
                      const newStep: Step = {
                        id: Date.now().toString(),
                        image: tempPhotosForStep[0],
                        caption: '',
                        location: selectedPlaces[placeIndex].name.toUpperCase(),
                        suggestion: '',
                        type: 'photo',
                        photos: tempPhotosForStep,
                        coverImage: tempPhotosForStep[0],
                        hasUserPhoto: true,
                        source: 'user',
                        position: stepToUpdate.position !== undefined ? stepToUpdate.position : addingPhotosToStepIndex,
                        originalPlace: originalPlaceData
                      };
                      
                      const updatedPlaces = selectedPlaces.filter(p => p.id !== placeId);
                      const updatedSteps = [...steps, newStep];
                      setSelectedPlaces(updatedPlaces);
                      setSteps(updatedSteps);
                    }
                  } else if (isGooglePlace) {
                    const stepIndex = steps.findIndex(s => s.id === stepToUpdate.id);
                    if (stepIndex !== -1) {
                      const updatedStep = {
                        ...steps[stepIndex],
                        photos: tempPhotosForStep,
                        image: tempPhotosForStep[0],
                        coverImage: tempPhotosForStep[0],
                        hasUserPhoto: true,
                        source: 'user' as const
                      };
                      const newSteps = [...steps];
                      newSteps[stepIndex] = updatedStep;
                      setSteps(newSteps);
                    }
                  } else {
                    const stepIndex = steps.findIndex(s => s.id === stepToUpdate.id);
                    if (stepIndex !== -1) {
                      const updatedStep = {
                        ...steps[stepIndex],
                        photos: tempPhotosForStep,
                        image: tempPhotosForStep[0],
                        coverImage: tempPhotosForStep[0]
                      };
                      const newSteps = [...steps];
                      newSteps[stepIndex] = updatedStep;
                      setSteps(newSteps);
                    }
                  }
                }
              }
              
              // Reset and return to map
              setAddingPhotosToStepIndex(null);
              setTempPhotosForStep([]);
              setIsMapImageMinimized(true);
              
              setTimeout(() => {
                setShowMapView(true);
              }, 0);
            }}
            className="w-[95.994px] h-[95.994px] rounded-[20px] bg-[#1abb6c] flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
          >
            <ArrowUp className="w-12 h-12 text-white" strokeWidth={2.5} />
          </button>
        </div>
      )}

      {postDialog}
      {closeDialog}
      {googlePlacesWarningDialog}

      {/* Step Settings Popup */}
      {stepSettingsIndex !== null && (() => {
        const combinedSteps = getCombinedSteps();
        const step = combinedSteps[stepSettingsIndex];
        if (!step) return null;
        
        const isMapPlace = step.id.startsWith('map-');
        const isTemplateStep = step.id.startsWith('template-');
        const cameraStepIndex = isMapPlace || isTemplateStep ? -1 : steps.findIndex(s => s.id === step.id);
        
        return (
          <AnimatePresence>
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[9998]"
                onClick={() => setStepSettingsIndex(null)}
              />

              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[30px] z-[9999] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Border */}
                <div className="absolute inset-0 border-8 border-[#e9e9e9] rounded-t-[30px] pointer-events-none" />

                {/* Content */}
                <div className="flex flex-col px-6 pb-8 pt-6">
                  {/* Step Preview */}
                  <div className="w-full h-[200px] rounded-[20px] overflow-hidden mb-4 border-4 border-[#e9e9e9] bg-white mx-auto max-w-[340px] relative">
                    {!step.image && step.templateIcon ? (
                      <>
                        {step.templateIcon}
                        {step.templateLabel && (
                          <p className="absolute font-['Baloo_Tamma',sans-serif] bottom-[12px] text-[14px] text-center opacity-60 text-[#1e1e1e] uppercase">
                            {step.templateLabel}
                          </p>
                        )}
                      </>
                    ) : step.type === 'video' ? (
                      step.thumbnail ? (
                        <img
                          src={step.thumbnail}
                          alt="Step preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={step.image}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                          crossOrigin="anonymous"
                        />
                      )
                    ) : (
                      <img
                        src={step.image}
                        alt="Step preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Step Number Badge */}
                    <div className="absolute top-3 left-3 bg-white border-4 border-[#e9e9e9] rounded-[12px] px-3 py-1 shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]">
                      <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase">
                        {stepSettingsIndex + 1}
                      </span>
                    </div>
                  </div>

                  {/* Settings Options */}
                  <div className="space-y-3 max-w-[340px] mx-auto w-full">
                    {/* Location Button */}
                    <button
                      onClick={() => {
                        // Store which step we're changing location for
                        if (!isMapPlace && cameraStepIndex !== -1) {
                          setChangingLocationForStepIndex?.(cameraStepIndex);
                          setStepSettingsIndex(null);
                          // Navigate to search page with current location
                          onOpenSearch?.(step.location);
                        }
                      }}
                      className="w-full bg-white border-4 border-[#e9e9e9] rounded-[20px] min-h-[70px] flex flex-col items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] py-2 px-4"
                    >
                      <span className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[rgba(30,30,30,0.4)] uppercase text-center leading-tight">
                        LOCATION
                      </span>
                      <span className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase text-center leading-tight mt-1">
                        {step.location || 'NOT SET'}
                      </span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        if (isMapPlace) {
                          // This is a map place - remove from selectedPlaces
                          const placeId = parseInt(step.id.replace('map-', ''));
                          setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
                        } else if (isTemplateStep) {
                          // This is a template step - clear the filled item
                          const templateIndex = parseInt(step.id.replace('template-', ''));
                          const newFilledItems = [...filledTemplateItems];
                          newFilledItems[templateIndex] = null;
                          setFilledTemplateItems(newFilledItems);
                        } else if (cameraStepIndex !== -1) {
                          // This is a camera step - remove from steps
                          const newSteps = steps.filter((_, i) => i !== cameraStepIndex);
                          setSteps(newSteps);
                        }
                        setStepSettingsIndex(null);
                        setSelectedStepIndex(-1);
                      }}
                      className="w-full bg-[#ff4444] rounded-[20px] h-[70px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
                    >
                      <span className="font-['Baloo_Tamma',sans-serif] text-[22px] text-white uppercase">
                        DELETE PHOTO
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          </AnimatePresence>
        );
      })()}
    </div>
  );
}