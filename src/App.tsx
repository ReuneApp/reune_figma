import { useState, useEffect } from 'react';
import { Home, Map as MapIcon, Camera, Navigation, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import InviteCode from './components/InviteCode';
import CreateProfile from './components/CreateProfile';
import ViewPreferenceOverlay from './components/ViewPreferenceOverlay';
import ViewPreferenceOnboarding from './components/ViewPreferenceOnboarding';
import HomeFeed from './components/HomeFeed';
import Search from './components/Search';
import Create from './components/Create';
import UserProfile from './components/UserProfile';
import FriendsList from './components/FriendsList';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import AccountInformation from './components/AccountInformation';
import PrivacySettings from './components/PrivacySettings';
import HelpCenter from './components/HelpCenter';
import About from './components/About';
import RouteTrackingPage from './components/RouteTrackingPage';
import MapView from './components/Map';
import TemplatesPage from './components/TemplatesPage';
import Dev from './components/Dev';
import Notifications from './components/Notifications';
import { mockUsers } from './data/mockUsers';

type Screen = 'home' | 'search' | 'map' | 'capture' | 'profile' | 'friends' | 'editProfile' | 'settings' | 'accountInfo' | 'privacySettings' | 'helpCenter' | 'about' | 'routeTracking' | 'templates' | 'dev' | 'notifications';

interface FriendStatus {
  userId: string;
  status: 'friend' | 'not-friend' | 'requested' | 'incoming-request';
  requestTimestamp?: number; // Unix timestamp when request was sent
}

interface NavigationState {
  screen: Screen;
  profileUserId?: string;
  isAuthUserProfile?: boolean;
  isAuthUserFriendsList?: boolean;
  profileLocationMode?: boolean;
  currentProfileLocation?: string;
  navigatedFromProfile?: boolean;
}

interface Step {
  id: string;
  image: string;
  caption: string;
  location: string;
  suggestion: string;
  photos?: string[]; // Multiple photos per step
  source?: 'user' | 'google'; // Source of the step
  hasUserPhoto?: boolean; // True if user has added their own photos
}

interface RouteData {
  id: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    city: string;
  };
  title: string;
  steps: {
    id: string;
    image: string;
    caption: string;
    location: string;
    photos?: string[]; // Multiple photos per step
    source?: 'user' | 'google'; // Source of the step
    hasUserPhoto?: boolean; // True if user has added their own photos
  }[];
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
}

// Mock route data - mapping from routeId to full route data
const mockRouteData: Record<string, RouteData> = {
  '1': {
    id: '1',
    creator: {
      id: 'user1',
      name: 'MAYA',
      avatar: 'https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Nzc4ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Brooklyn'
    },
    title: 'COFFEE & ART TOUR',
    steps: [
      {
        id: '1',
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
        id: '2',
        image: 'https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzYzNTM0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'BEAUTIFUL PARK WALK 🌳',
        location: 'CENTRAL PARK GARDENS',
        photos: ['https://images.unsplash.com/photo-1690711405440-647ec48868d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzYzNTM0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080']
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYzNTQ0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'AMAZING DINNER 🍽️',
        location: 'BELLA VISTA RESTAURANT',
        photos: [
          'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYzNTQ0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
        ]
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'ART GALLERY EXPLORATION 🎨',
        location: 'MODERN ART GALLERY',
        photos: ['https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MzU0NjIzMXww&ixlib=rb-4.1.0&q=80&w=1080']
      }
    ],
    likes: 156,
    comments: 23,
    isLiked: false,
    isSaved: false
  },
  '2': {
    id: '2',
    creator: {
      id: 'user2',
      name: 'LUCAS',
      avatar: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NzgzNjc4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Downtown LA'
    },
    title: 'BEACH DAY',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1665676357091-fd11925d2cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnJpc2UlMjBvY2VhbnxlbnwxfHx8fDE3NjU0NzMxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'SUNRISE AT THE BEACH 🌅',
        location: 'GOLDEN SANDS BEACH'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1613457869704-9bb9fb946015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwd2F2ZXN8ZW58MXx8fHwxNzY1NDczMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'CATCHING WAVES 🏄',
        location: 'SURF POINT'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1758448786233-2051ecd150c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc3RhdXJhbnQlMjBzZWFmb29kfGVufDF8fHx8MTc2NTQ3MzExNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'FRESH SEAFOOD LUNCH 🦞',
        location: 'OCEAN VIEW CAFE'
      }
    ],
    likes: 342,
    comments: 45,
    isLiked: false,
    isSaved: false
  },
  '3': {
    id: '3',
    creator: {
      id: 'user3',
      name: 'SOPHIE',
      avatar: 'https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhlYWRzaG90JTIwY2FzdWFsfGVufDF8fHx8MTc2Nzg3OTExNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'South Beach'
    },
    title: 'CITY ADVENTURE',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1545038503-c9afe13195d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXJrZXQlMjB2ZW5kb3JzfGVufDF8fHx8MTc2NTQ3MzExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'VIBRANT STREET MARKET 🛍️',
        location: 'OLD TOWN BAZAAR'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1563273026-d342cef8f723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NTQ1MTE0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'HISTORIC ARCHITECTURE 🏛️',
        location: 'GRAND CATHEDRAL'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1623630524058-622b7fa9ecd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwY2l0eXxlbnwxfHx8fDE3NjU0NzMxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'ROOFTOP DRINKS 🍹',
        location: 'SKY BAR'
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1688549450664-8189b4ac4751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbGlnaHRzJTIwbmlnaHR8ZW58MXx8fHwxNzY1NDAwODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'CITY LIGHTS AT NIGHT ✨',
        location: 'DOWNTOWN DISTRICT'
      },
      {
        id: '5',
        image: 'https://images.unsplash.com/photo-1558014356-9665ff525506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbmlnaHR8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'LATE NIGHT STREET FOOD 🌮',
        location: 'FOOD TRUCK ALLEY'
      }
    ],
    likes: 289,
    comments: 31,
    isLiked: false,
    isSaved: false
  },
  '4': {
    id: '4',
    creator: {
      id: 'user4',
      name: 'ETHAN',
      avatar: 'https://images.unsplash.com/photo-1764084051711-45a3b7c84c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBoZWFkc2hvdCUyMGZyaWVuZGx5fGVufDF8fHx8MTc2Nzg3OTExNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Pearl District'
    },
    title: 'NATURE ESCAPE',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1563141415-2ae640ce9c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjB0cmFpbCUyMGZvcmVzdHxlbnwxfHx8fDE3NjUzNzc4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'FOREST TRAIL HIKE 🌲',
        location: 'PINE VALLEY TRAIL'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1704292224507-a2f80036cf1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bW1pdCUyMHZpZXd8ZW58MXx8fHwxNjczMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'SUMMIT VIEW 🏔️',
        location: 'EAGLE PEAK'
      }
    ],
    likes: 412,
    comments: 56,
    isLiked: false,
    isSaved: false
  },
  '5': {
    id: '5',
    creator: {
      id: 'user1',
      name: 'MAYA',
      avatar: 'https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Nzc4ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Brooklyn'
    },
    title: 'BROOKLYN FOOD TOUR',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2NTQ3MzExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'BEST BURGER IN TOWN 🍔',
        location: 'SMASH BURGER JOINT'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'WOOD FIRED PIZZA 🍕',
        location: 'LUIGI\'S PIZZERIA'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FmZXxlbnwxfHx8fDE3NjU0NzMxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'SWEET TREATS 🍰',
        location: 'DESSERT BAR'
      }
    ],
    likes: 245,
    comments: 32,
    isLiked: false,
    isSaved: false
  },
  '6': {
    id: '6',
    creator: {
      id: 'user1',
      name: 'MAYA',
      avatar: 'https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Nzc4ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Brooklyn'
    },
    title: 'MORNING YOGA SPOTS',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcGFya3xlbnwxfHx8fDE3NjU0NzMxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'SUNRISE YOGA 🧘',
        location: 'RIVERSIDE PARK'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBib3dsfGVufDF8fHx8MTc2NTQ3MzExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'HEALTHY BREAKFAST 🥗',
        location: 'GREEN BOWL CAFE'
      }
    ],
    likes: 189,
    comments: 21,
    isLiked: false,
    isSaved: false
  },
  '7': {
    id: '7',
    creator: {
      id: 'user2',
      name: 'LUCAS',
      avatar: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NzgzNjc4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Downtown LA'
    },
    title: 'LA NIGHTLIFE',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGNsdWIlMjBiYXJ8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'COCKTAIL HOUR 🍸',
        location: 'THE VELVET ROOM'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwdmVudWV8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'LIVE MUSIC 🎵',
        location: 'ECHO PARK VENUE'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGlubmVyfGVufDF8fHx8MTc2NTQ3MzExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'LATE NIGHT DINING 🌙',
        location: 'MIDNIGHT KITCHEN'
      }
    ],
    likes: 378,
    comments: 48,
    isLiked: false,
    isSaved: false
  },
  '8': {
    id: '8',
    creator: {
      id: 'user2',
      name: 'LUCAS',
      avatar: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NzgzNjc4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Downtown LA'
    },
    title: 'SKATEBOARD SESSION',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZSUyMHBhcmt8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'SKATE PARK VIBES 🛹',
        location: 'VENICE SKATE PARK'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvJTIwdHJ1Y2t8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'TACO TRUCK STOP 🌮',
        location: 'WEST SIDE TACOS'
      }
    ],
    likes: 421,
    comments: 39,
    isLiked: false,
    isSaved: false
  },
  '9': {
    id: '9',
    creator: {
      id: 'user3',
      name: 'SOPHIE',
      avatar: 'https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhlYWRzaG90JTIwY2FzdWFsfGVufDF8fHx8MTc2Nzg3OTExNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'South Beach'
    },
    title: 'WYNWOOD WALLS',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjB3YWxsfGVufDF8fHx8MTc2NTQ3MzExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'STREET ART 🎨',
        location: 'WYNWOOD ARTS DISTRICT'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'ARTISAN COFFEE ☕',
        location: 'BREW LAB'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGxhdGluZ3xlbnwxfHx8fDE3NjU0NzMxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'FUSION LUNCH 🍱',
        location: 'EAST ASIAN KITCHEN'
      }
    ],
    likes: 298,
    comments: 41,
    isLiked: false,
    isSaved: false
  },
  '10': {
    id: '10',
    creator: {
      id: 'user4',
      name: 'ETHAN',
      avatar: 'https://images.unsplash.com/photo-1764084051711-45a3b7c84c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBoZWFkc2hvdCUyMGZyaWVuZGx5fGVufDF8fHx8MTc2Nzg3OTExNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'Pearl District'
    },
    title: 'BREWERY HOPPING',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmV3ZXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'CRAFT BEER TASTING 🍺',
        location: 'HOPWORKS BREWERY'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2t8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'FOOD TRUCK EATS 🌭',
        location: 'BREWERY FOOD PODS'
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1569437061238-3cf61084f487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjU0NzMxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'EVENING PUB 🍻',
        location: 'THE COPPER DOOR'
      }
    ],
    likes: 356,
    comments: 52,
    isLiked: false,
    isSaved: false
  },
  '11': {
    id: '11',
    creator: {
      id: 'user3',
      name: 'SOPHIE',
      avatar: 'https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhlYWRzaG90JTIwY2FzdWFsfGVufDF8fHx8MTc2Nzg3OTExNnww&ixlib=rb-4.1.0&q=80&w=1080',
      city: 'South Beach'
    },
    title: 'BEACH SUNSET',
    steps: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjU0NzMxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'GOLDEN HOUR 🌅',
        location: 'SOUTH BEACH'
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMHNob3B8ZW58MXx8fHwxNzY1NDczMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        caption: 'ICE CREAM STOP 🍦',
        location: 'OCEAN DRIVE CREAMERY'
      }
    ],
    likes: 512,
    comments: 67,
    isLiked: false,
    isSaved: false
  }
};

// Mock users database - stores user profile information and their routes
const mockUsers: Record<string, {
  id: string;
  name: string;
  username: string;
  avatar: string;
  location: string;
  postedRoutes: string[]; // Array of route IDs
  savedRoutes: string[]; // Array of route IDs
}> = {
  'auth': {
    id: 'auth',
    name: 'Alex Morgan',
    username: 'alexmorgan',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    location: 'San Francisco, CA',
    postedRoutes: [],
    savedRoutes: []
  },
  'user1': {
    id: 'user1',
    name: 'EMMA',
    username: 'emmawilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwcm9maWxlfGVufDF8fHx8MTc2MDQ0NjAyM3ww&ixlib=rb-4.1.0&q=80&w=400',
    location: 'BROOKLYN',
    postedRoutes: ['1', '5', '6'], // Emma has 3 posted routes
    savedRoutes: ['2', '3', '7'] // Emma has saved 3 routes
  },
  'user2': {
    id: 'user2',
    name: 'MARCUS',
    username: 'marcuschen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    location: 'DOWNTOWN LA',
    postedRoutes: ['2', '7', '8'], // Marcus has 3 posted routes
    savedRoutes: ['4', '10'] // Marcus has saved 2 routes
  },
  'user3': {
    id: 'user3',
    name: 'SOFIA',
    username: 'sofiar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=400',
    location: 'SOUTH BEACH',
    postedRoutes: ['3', '9', '11'], // Sofia has 3 posted routes
    savedRoutes: ['1', '5', '8', '10'] // Sofia has saved 4 routes
  },
  'user4': {
    id: 'user4',
    name: 'JAMES',
    username: 'jamest',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    location: 'PEARL DISTRICT',
    postedRoutes: ['4', '10'], // James has 2 posted routes
    savedRoutes: ['1', '6', '9'] // James has saved 3 routes
  }
};

export default function App() {
  const [hasEnteredInviteCode, setHasEnteredInviteCode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [hasCompletedViewPreference, setHasCompletedViewPreference] = useState(false);
  const [viewPreferencePreview, setViewPreferencePreview] = useState<'posts' | 'map'>('posts');
  const [playViewSwitcherHeroAnimation, setPlayViewSwitcherHeroAnimation] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'google' | 'apple' | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [capturedSteps, setCapturedSteps] = useState<Step[]>([]);
  const [selectedRouteData, setSelectedRouteData] = useState<RouteData | null>(null);
  const [shouldResetCapture, setShouldResetCapture] = useState(false);
  const [profileUserId, setProfileUserId] = useState<string>('auth');
  const [isAuthUserProfile, setIsAuthUserProfile] = useState(false);
  const [isAuthUserFriendsList, setIsAuthUserFriendsList] = useState(false);
  const [profileLocationMode, setProfileLocationMode] = useState(false);
  const [currentProfileLocation, setCurrentProfileLocation] = useState<string>('');
  const [navigatedFromProfile, setNavigatedFromProfile] = useState(false);
  const [navigationStack, setNavigationStack] = useState<NavigationState[]>([]);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [showBuildPopup, setShowBuildPopup] = useState(false);
  const [showPostedPopup, setShowPostedPopup] = useState(false);
  const [createInitialView, setCreateInitialView] = useState<'camera' | 'map'>('camera');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // Global sound toggle
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null); // Shared between home and map
  const [selectedRouteStepIndex, setSelectedRouteStepIndex] = useState<number>(0); // Shared step index between home and map
  const [selectedPlaceLocation, setSelectedPlaceLocation] = useState<string | null>(null); // Place location to show on map
  const [selectedTemplate, setSelectedTemplate] = useState<{ name: string; items: string[] } | null>(null); // Shared template state
  const [authUserData, setAuthUserData] = useState({
    id: 'auth',
    name: 'ALEX',
    username: 'alexmorgan',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwcm9maWxlfGVufDF8fHx8MTc2MDQ0NjAyM3ww&ixlib=rb-4.1.0&q=80&w=400',
    location: 'PACIFIC HEIGHTS'
  });

  // User's posted and saved routes
  const [userPostedRoutes, setUserPostedRoutes] = useState<RouteData[]>([]);
  const [userSavedRoutes, setUserSavedRoutes] = useState<RouteData[]>([]);

  // Friend statuses - central source of truth for all friend relationships
  const [friendStatuses, setFriendStatuses] = useState<Map<string, FriendStatus>>(() => {
    const initialStatuses = new Map<string, FriendStatus>();
    initialStatuses.set('user1', { userId: 'user1', status: 'friend' });
    initialStatuses.set('user2', { userId: 'user2', status: 'friend' });
    initialStatuses.set('user3', { userId: 'user3', status: 'friend' });
    initialStatuses.set('user4', { userId: 'user4', status: 'friend' });
    initialStatuses.set('user5', { userId: 'user5', status: 'friend' });
    initialStatuses.set('user6', { userId: 'user6', status: 'friend' });
    initialStatuses.set('user7', { userId: 'user7', status: 'incoming-request' }); // Incoming friend request
    initialStatuses.set('user8', { userId: 'user8', status: 'incoming-request' }); // Incoming friend request
    initialStatuses.set('user9', { userId: 'user9', status: 'not-friend' });
    initialStatuses.set('user10', { userId: 'user10', status: 'not-friend' });
    initialStatuses.set('user11', { userId: 'user11', status: 'not-friend' });
    initialStatuses.set('user12', { userId: 'user12', status: 'not-friend' });
    return initialStatuses;
  });

  // Edit route state
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);
  const [editingRouteData, setEditingRouteData] = useState<RouteData | null>(null);

  const [routeTitle, setRouteTitle] = useState('');
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  
  // State to track when changing a step's location from Create page
  const [changingLocationForStepIndex, setChangingLocationForStepIndex] = useState<number | null>(null);
  const [updateStepLocationCallback, setUpdateStepLocationCallback] = useState<((stepIndex: number, newLocation: string) => void) | null>(null);
  const [showSearchOverlayForLocationChange, setShowSearchOverlayForLocationChange] = useState(false); // Show search overlay without unmounting Create
  const [currentStepLocation, setCurrentStepLocation] = useState<string>(''); // Current location of step being edited
  const [searchOpenedFrom, setSearchOpenedFrom] = useState<'home' | 'map' | null>(null); // Track where search was opened from
  
  // Route tracking state
  const [trackedRoute, setTrackedRoute] = useState<{
    id: string;
    title: string;
    steps: Array<{
      image: string;
      caption: string;
      location: string;
      coordinates?: { lat: number; lng: number };
    }>;
    currentStepIndex: number;
    timeOfDay?: 'morning' | 'afternoon' | 'evening';
    groupSize?: number;
  } | null>(null);
  const [routeToTrack, setRouteToTrack] = useState<{ routeId: string; routeData: RouteData } | null>(null);

  // Profile route view mode - limits feed to creator's routes only
  const [profileRouteViewMode, setProfileRouteViewMode] = useState<{ 
    creatorId: string; 
    creatorRoutes: RouteData[];
  } | null>(null);

  // Global timer to auto-accept friend requests after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFriendStatuses(prev => {
        const updated = new Map(prev);
        let hasChanges = false;
        
        prev.forEach((friendStatus, userId) => {
          if (
            friendStatus.status === 'requested' && 
            friendStatus.requestTimestamp &&
            now - friendStatus.requestTimestamp >= 5000 // 5 seconds
          ) {
            updated.set(userId, {
              userId,
              status: 'friend'
              // Clear timestamp
            });
            hasChanges = true;
          }
        });
        
        return hasChanges ? updated : prev;
      });
    }, 500); // Check every 500ms
    
    return () => clearInterval(interval);
  }, []);

  // Handler to add a friend (sets status to 'requested' with timestamp)
  const handleAddFriend = (userId: string) => {
    setFriendStatuses(prev => {
      const updated = new Map(prev);
      updated.set(userId, {
        userId,
        status: 'requested',
        requestTimestamp: Date.now()
      });
      return updated;
    });
  };

  // Handler to accept incoming friend request
  const handleAcceptFriendRequest = (userId: string) => {
    setFriendStatuses(prev => {
      const updated = new Map(prev);
      updated.set(userId, {
        userId,
        status: 'friend'
      });
      return updated;
    });
  };

  // Handler to reject incoming friend request
  const handleRejectFriendRequest = (userId: string) => {
    setFriendStatuses(prev => {
      const updated = new Map(prev);
      updated.set(userId, {
        userId,
        status: 'not-friend'
      });
      return updated;
    });
  };

  // Helper to get current friend status
  const getFriendStatus = (userId: string): FriendStatus['status'] => {
    return friendStatuses.get(userId)?.status || 'not-friend';
  };

  const handlePreview = (steps: Step[], title: string, draftId: string | null = null) => {
    // Directly post without preview screen
    handlePost(steps, title);
  };

  const handlePost = (steps: Step[], title: string) => {
    // Check if we're editing an existing route
    if (editingRouteId) {
      // UPDATE existing route
      const updatedRoute: RouteData = {
        id: editingRouteId, // Preserve original ID
        creator: {
          id: 'auth',
          name: authUserData.name,
          avatar: authUserData.avatar,
          city: authUserData.location.split(',')[0]
        },
        title: title.toUpperCase() || 'MY ROUTE',
        steps: steps.map(step => ({
          id: step.id,
          image: step.image,
          caption: step.caption.toUpperCase(),
          location: step.location.toUpperCase(),
          photos: step.photos,
          source: step.source,
          hasUserPhoto: step.hasUserPhoto
        })),
        likes: editingRouteData?.likes || 0,
        comments: editingRouteData?.comments || 0,
        isLiked: editingRouteData?.isLiked || false,
        isSaved: editingRouteData?.isSaved || false
      };

      // Update route in userPostedRoutes (find and replace)
      setUserPostedRoutes(prevRoutes => 
        prevRoutes.map(route => route.id === editingRouteId ? updatedRoute : route)
      );

      // Update route in mockRouteData if it exists
      if (mockRouteData[editingRouteId]) {
        mockRouteData[editingRouteId] = updatedRoute;
      }

      // Update selectedRouteData immediately if it's the same route
      if (selectedRouteData?.id === editingRouteId) {
        setSelectedRouteData({
          ...updatedRoute,
          location: updatedRoute.steps[0]?.location || '' // Add first step's location
        });
      }

      // Update profileRouteViewMode if we're in that mode
      if (profileRouteViewMode) {
        setProfileRouteViewMode({
          ...profileRouteViewMode,
          creatorRoutes: profileRouteViewMode.creatorRoutes.map(route => 
            route.id === editingRouteId ? updatedRoute : route
          )
        });
      }

      // Clear edit mode state
      setEditingRouteId(null);
      setEditingRouteData(null);
      
      // Clear captured steps and reset
      setCapturedSteps([]);
      setRouteTitle('');
      setCurrentDraftId(null);
      setShouldResetCapture(true);
      
      // Navigate back
      navigateBack();
      
      // Show updated popup
      setShowPostedPopup(true);
      setTimeout(() => {
        setShowPostedPopup(false);
      }, 1500);
    } else {
      // CREATE new route
      const newRoute: RouteData = {
        id: `route-${Date.now()}`, // Unique ID based on timestamp
        creator: {
          id: 'auth',
          name: authUserData.name,
          avatar: authUserData.avatar,
          city: authUserData.location.split(',')[0] // Extract city from location
        },
        title: title.toUpperCase() || 'MY ROUTE',
        steps: steps.map(step => ({
          id: step.id,
          image: step.image,
          caption: step.caption.toUpperCase(),
          location: step.location.toUpperCase(),
          photos: step.photos, // Preserve the photos array
          source: step.source, // Preserve the source field
          hasUserPhoto: step.hasUserPhoto // Preserve the hasUserPhoto field
        })),
        likes: 0,
        comments: 0,
        isLiked: false,
        isSaved: false
      };

      // Add the new route to userPostedRoutes (at the beginning)
      setUserPostedRoutes([newRoute, ...userPostedRoutes]);

      // Set the newly posted route as the selected route
      // Include location field for HomeFeed compatibility
      setSelectedRouteData({
        ...newRoute,
        location: steps[0]?.location || '' // Add first step's location as route location
      });
      
      // Clear captured steps and reset
      setCapturedSteps([]);
      setRouteTitle('');
      setCurrentDraftId(null);
      setShouldResetCapture(true);
      
      // Navigate to home
      setCurrentScreen('home');
      // Show posted popup
      setShowPostedPopup(true);
      // Hide popup after 1500ms
      setTimeout(() => {
        setShowPostedPopup(false);
      }, 1500);
    }
  };

  const handleEditRoute = (routeId: string) => {
    // Find the route to edit
    let routeToEdit = userPostedRoutes.find(r => r.id === routeId);
    
    // If not found in userPostedRoutes, check mockRouteData
    if (!routeToEdit && mockRouteData[routeId]) {
      routeToEdit = mockRouteData[routeId];
    }

    if (!routeToEdit) {
      return;
    }

    // Convert RouteData to Steps format for Create page
    const stepsForEdit: Step[] = routeToEdit.steps.map(step => ({
      id: step.id,
      image: step.image,
      caption: step.caption,
      location: step.location,
      suggestion: '', // Not needed for editing
      photos: step.photos || [step.image],
      source: step.source,
      hasUserPhoto: step.hasUserPhoto
    }));

    // Set editing state
    setEditingRouteId(routeId);
    setEditingRouteData(routeToEdit);
    
    // Load steps and title into Create page
    setCapturedSteps(stepsForEdit);
    setRouteTitle(routeToEdit.title);
    
    // Navigate to Create page with map view as initial view
    setCreateInitialView('map');
    navigateTo('capture');
  };

  const handleDeleteRoute = (routeId: string) => {
    // Remove from userPostedRoutes
    setUserPostedRoutes(prevRoutes => prevRoutes.filter(r => r.id !== routeId));
    
    // Remove from mockRouteData if it exists
    if (mockRouteData[routeId]) {
      delete mockRouteData[routeId];
    }
    
    // Remove from userSavedRoutes if it's there
    setUserSavedRoutes(prevRoutes => prevRoutes.filter(r => r.id !== routeId));
    
    // Clear selectedRouteData if it's the deleted route
    if (selectedRouteData?.id === routeId) {
      setSelectedRouteData(null);
      // Only navigate back if we're viewing the route detail (on 'home' screen)
      // Don't navigate if we're on 'profile' screen - the list will update automatically
      if (currentScreen === 'home') {
        navigateBack();
      }
    }
  };

  const handleLikeRoute = (route: {
    id: string;
    creator: {
      id?: string;
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
  }) => {
    // Check if route is already in saved routes
    const existingIndex = userSavedRoutes.findIndex(r => r.id === route.id);
    
    if (route.isLiked && existingIndex === -1) {
      // Add to saved routes (at the beginning)
      const savedRoute: RouteData = {
        id: route.id,
        creator: {
          id: route.creator.id || 'unknown',
          name: route.creator.name || 'Unknown',
          avatar: route.creator.avatar,
          city: route.creator.city || 'Unknown City'
        },
        title: route.title || 'UNTITLED ROUTE',
        steps: route.steps.map(step => ({
          id: step.id,
          image: step.image,
          caption: step.caption || '',
          location: step.location
        })),
        likes: 0,
        comments: 0,
        isLiked: true,
        isSaved: true
      };
      setUserSavedRoutes([savedRoute, ...userSavedRoutes]);
    } else if (!route.isLiked && existingIndex !== -1) {
      // Remove from saved routes
      setUserSavedRoutes(userSavedRoutes.filter(r => r.id !== route.id));
    }
  };

  const navigateTo = (screen: Screen, state?: Partial<NavigationState>) => {
    // Save current state to stack
    const currentState: NavigationState = {
      screen: currentScreen,
      profileUserId,
      isAuthUserProfile,
      isAuthUserFriendsList,
      profileLocationMode,
      currentProfileLocation,
      navigatedFromProfile
    };
    setNavigationStack([...navigationStack, currentState]);
    
    // Navigate to new screen
    setCurrentScreen(screen);
    if (state?.profileUserId !== undefined) {
      setProfileUserId(state.profileUserId);
    }
    if (state?.isAuthUserProfile !== undefined) setIsAuthUserProfile(state.isAuthUserProfile);
    if (state?.isAuthUserFriendsList !== undefined) setIsAuthUserFriendsList(state.isAuthUserFriendsList);
    if (state?.profileLocationMode !== undefined) setProfileLocationMode(state.profileLocationMode);
    if (state?.currentProfileLocation !== undefined) setCurrentProfileLocation(state.currentProfileLocation);
    if (state?.navigatedFromProfile !== undefined) setNavigatedFromProfile(state.navigatedFromProfile);
  };

  const navigateBack = () => {
    if (navigationStack.length > 0) {
      const previousState = navigationStack[navigationStack.length - 1];
      setNavigationStack(navigationStack.slice(0, -1));
      
      // Clear place location when navigating back from map
      setSelectedPlaceLocation(null);
      
      // Restore previous screen and its state
      setCurrentScreen(previousState.screen);
      if (previousState.profileUserId !== undefined) setProfileUserId(previousState.profileUserId);
      if (previousState.isAuthUserProfile !== undefined) setIsAuthUserProfile(previousState.isAuthUserProfile);
      if (previousState.isAuthUserFriendsList !== undefined) setIsAuthUserFriendsList(previousState.isAuthUserFriendsList);
      if (previousState.profileLocationMode !== undefined) setProfileLocationMode(previousState.profileLocationMode);
      if (previousState.currentProfileLocation !== undefined) setCurrentProfileLocation(previousState.currentProfileLocation);
      if (previousState.navigatedFromProfile !== undefined) setNavigatedFromProfile(previousState.navigatedFromProfile);
    } else {
      // If no navigation stack, go to home
      setCurrentScreen('home');
    }
  };

  const handleViewRoute = (routeId: string, fromProfile: boolean = false, profileRouteData?: any, creatorId?: string) => {
    // If route data is passed from profile, look up fresh data first to ensure we have latest edits
    if (profileRouteData && profileRouteData.steps && Array.isArray(profileRouteData.steps)) {
      // Try to get the freshest version from multiple sources to ensure correct route is selected
      const freshRouteData = 
        userPostedRoutes.find(r => r.id === routeId) || 
        userSavedRoutes.find(r => r.id === routeId) ||
        mockRouteData[routeId] ||
        profileRouteData;
      
      setSelectedRouteData({
        id: freshRouteData.id,
        creator: {
          id: freshRouteData.creator?.id || creatorId || 'auth',
          name: freshRouteData.creator?.name || authUserData.name,
          avatar: freshRouteData.creator?.avatar || authUserData.avatar,
          city: freshRouteData.creator?.city || authUserData.location
        },
        title: freshRouteData.title,
        steps: freshRouteData.steps.map((step: any) => ({
          id: step.id,
          image: step.image,
          caption: step.caption,
          location: step.location,
          photos: step.photos,
          source: step.source,
          hasUserPhoto: step.hasUserPhoto
        })),
        likes: freshRouteData.likes || 0,
        comments: freshRouteData.comments || 0,
        isLiked: freshRouteData.isLiked || false,
        isSaved: freshRouteData.isSaved || false
      });

      // If viewing from a profile, set profile route view mode with all creator's routes
      if (fromProfile && creatorId) {
        // Get the creator's posted routes
        let creatorRoutes: RouteData[];
        
        if (creatorId === 'auth') {
          creatorRoutes = userPostedRoutes;
        } else {
          // Get routes from mockUsers
          const user = mockUsers[creatorId];
          if (user) {
            creatorRoutes = user.postedRoutes
              .map(routeId => mockRouteData[routeId])
              .filter(route => route !== undefined);
          } else {
            creatorRoutes = [];
          }
        }
        
        setProfileRouteViewMode({
          creatorId,
          creatorRoutes
        });
      } else {
        // Clear profile route view mode if not from profile
        setProfileRouteViewMode(null);
      }

      // Navigate to home feed with route selected
      navigateTo('home');
      return;
    }

    // Otherwise use existing mockRouteData logic
    const route = mockRouteData[routeId];
    if (route) {
      setSelectedRouteData(route);
      // Clear profile route view mode
      setProfileRouteViewMode(null);
      // Navigate to home feed with route selected
      navigateTo('home');
    }
  };

  const handleBackFromProfileRoutes = () => {
    // Clear profile route view mode and go back to the profile
    setProfileRouteViewMode(null);
    setSelectedRouteData(null);
    navigateBack();
  };

  const handleViewProfile = (userId: string, isAuthUser: boolean = false) => {
    navigateTo('profile', { 
      profileUserId: userId, 
      isAuthUserProfile: isAuthUser
    });
  };

  const handleViewFriends = (isAuthUser: boolean = false) => {
    navigateTo('friends', { 
      isAuthUserFriendsList: isAuthUser 
    });
  };

  const handleEditProfile = () => {
    navigateTo('editProfile');
  };

  const handleSettings = () => {
    navigateTo('settings');
  };

  const handleViewNotifications = () => {
    navigateTo('notifications');
  };

  const handleNavigateToAccountInfo = () => {
    navigateTo('accountInfo');
  };

  const handleNavigateToPrivacy = () => {
    navigateTo('privacySettings');
  };

  const handleNavigateToHelpCenter = () => {
    navigateTo('helpCenter');
  };

  const handleNavigateToAbout = () => {
    navigateTo('about');
  };

  const handleLogout = () => {
    // Reset all authentication and profile states
    setHasEnteredInviteCode(false);
    setIsAuthenticated(false);
    setHasCompletedProfile(false);
    setHasCompletedViewPreference(false);
    setCurrentScreen('home');
    // Reset navigation history
    setNavigationHistory([{ screen: 'home' }]);
  };

  const handleSaveProfile = (data: { name: string; username: string; avatar: string; location: string }) => {
    setAuthUserData({
      ...authUserData,
      ...data
    });
    // Navigate back to profile after saving
    navigateBack();
  };

  const handleStartRouteTracking = (routeId: string) => {
    const route = mockRouteData[routeId];
    if (route) {
      // Create tracked route directly
      setTrackedRoute({
        id: route.id,
        title: route.title,
        steps: route.steps.map(step => ({
          image: step.image,
          caption: step.caption,
          location: step.location,
          coordinates: undefined
        })),
        currentStepIndex: 0,
        timeOfDay: undefined,
        groupSize: undefined
      });
      
      // Navigate to tracking page directly
      navigateTo('routeTracking');
    }
  };

  const handleNavigateToStep = (stepIndex: number) => {
    if (trackedRoute && trackedRoute.steps[stepIndex]) {
      const step = trackedRoute.steps[stepIndex];
      openMapsForLocation(step.location);
      
      // Update current step index
      setTrackedRoute({
        ...trackedRoute,
        currentStepIndex: stepIndex
      });
    }
  };

  const openMapsForLocation = (location: string) => {
    // Encode location for URL
    const encodedLocation = encodeURIComponent(location);
    
    // Try to open in Apple Maps on iOS, Google Maps on Android, or default maps
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    let mapsUrl = '';
    
    if (isIOS) {
      // Apple Maps URL scheme
      mapsUrl = `maps://?daddr=${encodedLocation}`;
      // Try native app first
      window.location.href = mapsUrl;
    } else if (isAndroid) {
      // Google Maps URL scheme for Android
      mapsUrl = `google.navigation:q=${encodedLocation}`;
      window.location.href = mapsUrl;
    } else {
      // Fallback to Google Maps web
      mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
      window.open(mapsUrl, '_blank');
    }
  };

  const handleStopTracking = () => {
    setTrackedRoute(null);
    navigateBack();
  };

  // Auth handlers
  const handleEmailAuth = () => {
    // TODO: Implement email authentication
    setIsAuthenticated(true);
    setLoginMethod('email');
  };

  const handleGoogleAuth = () => {
    // TODO: Implement Google authentication
    setIsAuthenticated(true);
    setLoginMethod('google');
  };

  const handleAppleAuth = () => {
    // TODO: Implement Apple authentication
    setIsAuthenticated(true);
    setLoginMethod('apple');
  };

  // Profile creation handler
  const handleProfileComplete = (userData: {
    name: string;
    username: string;
    avatar: string;
    location: string;
  }) => {
    setAuthUserData({
      id: 'auth', // Preserve the auth user ID
      ...userData
    });
    setHasCompletedProfile(true);
  };

  // View preference handler
  const handleViewPreferenceChange = (view: 'posts' | 'map') => {
    setViewPreferencePreview(view);
    setCurrentScreen(view === 'map' ? 'map' : 'home');
  };

  const handleViewPreferenceComplete = (view: 'posts' | 'map') => {
    setViewPreferencePreview(view);
    setCurrentScreen(view === 'map' ? 'map' : 'home');
    setPlayViewSwitcherHeroAnimation(true);
    setHasCompletedViewPreference(true);
  };

  // Show invite code screen first (includes login dialog)
  if (!hasEnteredInviteCode) {
    return (
      <InviteCode 
        onSuccess={(method) => {
          setHasEnteredInviteCode(true);
          setIsAuthenticated(true);
          setLoginMethod(method || 'email');
        }} 
        onOpenDev={() => {
          // Set up minimal state to access dev mode
          setHasEnteredInviteCode(true);
          setIsAuthenticated(true);
          setHasCompletedProfile(true);
          setHasCompletedViewPreference(true);
          setCurrentScreen('dev');
        }}
      />
    );
  }

  // Random first names for Google/Apple auto-fill
  const randomNames = [
    'EMMA',
    'LIAM',
    'OLIVIA',
    'NOAH',
    'AVA',
    'ETHAN',
    'SOPHIA',
    'MASON',
    'ISABELLA',
    'LUCAS',
    'MIA',
    'JACKSON',
    'CHARLOTTE',
    'AIDEN',
    'AMELIA'
  ];

  // Show profile creation if not completed
  if (!hasCompletedProfile) {
    const prefilledName = (loginMethod === 'google' || loginMethod === 'apple') 
      ? randomNames[Math.floor(Math.random() * randomNames.length)]
      : undefined;
    
    return <CreateProfile onComplete={handleProfileComplete} prefilledName={prefilledName} />;
  }

  // Show view preference onboarding after profile creation
  if (!hasCompletedViewPreference && !playViewSwitcherHeroAnimation) {
    return (
      <ViewPreferenceOnboarding 
        onComplete={handleViewPreferenceComplete}
        onBack={() => {
          // Go back to profile creation
          setHasCompletedProfile(false);
        }}
      />
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeFeed 
          key={selectedRouteData ? `${selectedRouteData.id}-${selectedRouteData.steps.length}-${selectedRouteData.steps.map(s => s.id).join(',')}` : 'home-feed'} // Force re-mount when route changes or updates
          onStartTracking={handleStartRouteTracking}
          onOpenMap={(routeId, stepIndex) => {
            setSelectedRouteId(routeId);
            setSelectedRouteStepIndex(stepIndex);
            setSelectedPlaceLocation(null); // Clear place location when opening map normally
            navigateTo('map');
          }}
          onOpenSearch={() => {
            setSearchPanelOpen(true);
            setSearchOpenedFrom('home');
            setCurrentScreen('search');
          }}
          onViewProfile={handleViewProfile}
          onOpenCreate={() => {
            setCreateInitialView('map');
            navigateTo('capture');
            // Trigger BUILD popup after navigation starts
            setTimeout(() => {
              setShowBuildPopup(true);
            }, 500);
            // Hide popup after 1500ms
            setTimeout(() => {
              setShowBuildPopup(false);
            }, 2000);
          }}
          onCapture={() => {
            setCreateInitialView('map');
            navigateTo('capture');
            // Trigger BUILD popup after navigation starts
            setTimeout(() => {
              setShowBuildPopup(true);
            }, 500);
            // Hide popup after 1500ms
            setTimeout(() => {
              setShowBuildPopup(false);
            }, 2000);
          }}
          selectedRouteData={selectedRouteData || undefined}
          initialStepIndex={selectedRouteStepIndex}
          authUserData={authUserData}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={() => setIsSoundEnabled(!isSoundEnabled)}
          onLikeRoute={handleLikeRoute}
          savedRouteIds={userSavedRoutes.map(r => r.id)}
          profileRouteViewMode={profileRouteViewMode}
          onBackFromProfileRoutes={handleBackFromProfileRoutes}
          onEditRoute={handleEditRoute}
          onDeleteRoute={handleDeleteRoute}
          onNavigateToMapWithPlace={(placeLocation) => {
            setSelectedPlaceLocation(placeLocation);
            setSelectedRouteId(null); // Clear route selection
            navigateTo('map');
          }}
          hideTopUI={!hasCompletedViewPreference}
          hideViewSwitcher={playViewSwitcherHeroAnimation}
        />;
      case 'search':
        return <Search 
          onViewRoute={handleViewRoute} 
          onViewProfile={handleViewProfile} 
          onStartTracking={handleStartRouteTracking} 
          onBack={() => {
            setSearchPanelOpen(false);
            // If we were changing a step location, go back to capture
            if (changingLocationForStepIndex !== null) {
              setChangingLocationForStepIndex(null);
              setCurrentScreen('capture');
            } 
            // If we were in profile location mode, go back to edit profile
            else if (profileLocationMode) {
              setProfileLocationMode(false);
              setCurrentProfileLocation('');
              navigateBack();
            } 
            // Otherwise go back to where search was opened from
            else {
              const returnScreen = searchOpenedFrom === 'map' ? 'map' : 'home';
              setCurrentScreen(returnScreen);
              setSearchOpenedFrom(null);
            }
          }} 
          onCapture={() => setCurrentScreen('capture')} 
          searchPanelOpen={searchPanelOpen}
          authUserData={authUserData}
          changingLocationForStepIndex={changingLocationForStepIndex}
          onLocationSelected={(newLocation) => {
            // Update profile location if in profile location mode
            if (profileLocationMode) {
              setAuthUserData({ ...authUserData, location: newLocation });
              setProfileLocationMode(false);
              setCurrentProfileLocation('');
              navigateBack();
            }
            // Update the step location using the callback from Create
            else if (changingLocationForStepIndex !== null && updateStepLocationCallback) {
              updateStepLocationCallback(changingLocationForStepIndex, newLocation);
              // Clear the step index
              setChangingLocationForStepIndex(null);
              // Navigate back to Create page
              setSearchPanelOpen(false);
              setCurrentScreen('capture');
            }
          }}
          profileLocationMode={profileLocationMode}
          currentProfileLocation={currentProfileLocation}
        />;
      case 'map':
        return <MapView 
          onBack={navigateBack}
          onSearch={() => {
            setSearchPanelOpen(true);
            setSearchOpenedFrom('map');
            setCurrentScreen('search');
          }}
          onViewProfile={(userId, isAuthUser, userAvatar) => handleViewProfile(userId, isAuthUser, userAvatar)}
          onCapture={() => {
            // Set map as initial view when navigating from map
            setCreateInitialView('map');
            navigateTo('capture');
            // Trigger BUILD popup after navigation starts
            setTimeout(() => {
              setShowBuildPopup(true);
            }, 500);
            // Hide popup after 1500ms
            setTimeout(() => {
              setShowBuildPopup(false);
            }, 2000);
          }}
          onNavigate={(routeData) => {
            // Set up tracked route from map data
            setTrackedRoute({
              id: routeData.id,
              title: routeData.title,
              steps: routeData.steps.map(step => ({
                image: step.image,
                caption: step.caption,
                location: step.location,
                coordinates: undefined
              })),
              currentStepIndex: 0,
              timeOfDay: undefined,
              groupSize: undefined
            });
            // Navigate to tracking page
            navigateTo('routeTracking');
          }}
          onPostView={(routeId, stepIndex) => {
            // Navigate to home with the selected route and step index
            setSelectedRouteId(routeId);
            setSelectedRouteStepIndex(stepIndex);
            setSelectedPlaceLocation(null); // Clear place location when navigating back
            
            // Look up route data and set it
            const route = mockRouteData[routeId];
            if (route) {
              setSelectedRouteData(route);
            }
            
            setCurrentScreen('home');
          }}
          initialSelectedRouteId={selectedRouteId}
          initialSelectedStepIndex={selectedRouteStepIndex}
          initialPlaceLocation={selectedPlaceLocation}
          authUserData={authUserData}
          onLikeRoute={handleLikeRoute}
          savedRouteIds={userSavedRoutes.map(r => r.id)}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={() => setIsSoundEnabled(!isSoundEnabled)}
          onEditRoute={handleEditRoute}
          onDeleteRoute={handleDeleteRoute}
          hideTopUI={!hasCompletedViewPreference}
          hideViewSwitcher={playViewSwitcherHeroAnimation}
        />;
      case 'capture':
        return (
          <Create 
            onPreview={(steps, title, draftId) => {
              handlePreview(steps, title, draftId);
              setShouldResetCapture(false); // Reset the flag when navigating away
            }} 
            shouldReset={shouldResetCapture}
            onViewProfile={() => handleViewProfile('auth', true)}
            onBack={navigateBack}
            onPost={handlePost}
            onOpenSearch={() => {
              // Show search overlay without unmounting Create
              setShowSearchOverlayForLocationChange(true);
            }}
            onOpenMap={() => {
              // Map view handled within Create component
            }}
            onOpenTemplates={() => navigateTo('templates')}
            externalTemplate={selectedTemplate}
            authUserData={authUserData}
            initialView={createInitialView}
            changingLocationForStepIndex={changingLocationForStepIndex}
            setChangingLocationForStepIndex={setChangingLocationForStepIndex}
            updateStepLocationCallback={updateStepLocationCallback}
            setUpdateStepLocationCallback={setUpdateStepLocationCallback}
          />
        );
      case 'profile':
        // Get the user's data from mockUsers
        const viewedUser = mockUsers[profileUserId] || mockUsers['auth'];
        
        // Get the user's posted and saved routes
        const viewedUserPostedRoutes = viewedUser.postedRoutes
          .map(routeId => mockRouteData[routeId])
          .filter(route => route !== undefined);
        
        const viewedUserSavedRoutes = viewedUser.savedRoutes
          .map(routeId => mockRouteData[routeId])
          .filter(route => route !== undefined);
        
        return (
          <UserProfile
            key={profileUserId} // Force re-mount when userId changes
            userId={profileUserId}
            isAuthUser={isAuthUserProfile}
            authUserData={authUserData}
            userData={viewedUser} // Pass the viewed user's data
            onBack={navigateBack}
            onViewRoute={(routeId, routeData) => {
              // For saved routes, use the route's creator ID, not the profile user ID
              const creatorId = routeData?.creator?.id || profileUserId;
              handleViewRoute(routeId, true, routeData, creatorId);
            }}
            onViewFriends={handleViewFriends}
            onEditProfile={handleEditProfile}
            onSettings={handleSettings}
            onViewNotifications={handleViewNotifications}
            userPostedRoutes={isAuthUserProfile 
              ? userPostedRoutes.map(route => ({
                  id: route.id,
                  title: route.title,
                  images: route.steps.map(step => step.image),
                  steps: route.steps,
                  creator: route.creator
                }))
              : viewedUserPostedRoutes.map(route => ({
                  id: route.id,
                  title: route.title,
                  images: route.steps.map(step => step.image),
                  steps: route.steps,
                  creator: route.creator
                }))
            }
            userSavedRoutes={isAuthUserProfile
              ? userSavedRoutes.map(route => ({
                  id: route.id,
                  title: route.title,
                  images: route.steps.map(step => step.image),
                  steps: route.steps,
                  creator: route.creator
                }))
              : viewedUserSavedRoutes.map(route => ({
                  id: route.id,
                  title: route.title,
                  images: route.steps.map(step => step.image),
                  steps: route.steps,
                  creator: route.creator
                }))
            }
            onEditRoute={handleEditRoute}
            onDeleteRoute={handleDeleteRoute}
            onRemoveSaved={(routeId) => {
              // Unlike the route (remove from saved)
              handleLikeRoute(routeId);
            }}
            friendStatus={isAuthUserProfile ? undefined : getFriendStatus(profileUserId)}
            onAddFriend={handleAddFriend}
          />
        );
      case 'friends':
        return (
          <FriendsList
            onBack={navigateBack}
            onAddFriend={handleAddFriend}
            getFriendStatus={getFriendStatus}
            onAcceptFriendRequest={handleAcceptFriendRequest}
            onRejectFriendRequest={handleRejectFriendRequest}
            onViewUserProfile={(userId) => {
              // Navigate to the user's profile - only pass userId, let the profile screen fetch the data
              navigateTo('profile', { profileUserId: userId, isAuthUserProfile: false });
            }}
          />
        );
      case 'editProfile':
        return (
          <EditProfile
            userData={authUserData}
            onBack={navigateBack}
            onSave={handleSaveProfile}
            onLocationClick={() => {
              navigateTo('search', { profileLocationMode: true, currentProfileLocation: authUserData.location });
            }}
          />
        );
      case 'settings':
        return (
          <Settings
            onBack={navigateBack}
            onNavigateToAccountInfo={handleNavigateToAccountInfo}
            onLogout={handleLogout}
            defaultView={viewPreferencePreview}
            onToggleDefaultView={(view: 'posts' | 'map') => {
              setViewPreferencePreview(view);
            }}
          />
        );
      case 'accountInfo':
        return (
          <AccountInformation
            onBack={navigateBack}
            onEmailUs={() => {
              // Handle email us - could open email client
            }}
            onTermsConditions={() => {
              // Handle terms & conditions
            }}
            onPrivacyPolicy={() => {
              // Handle privacy policy
            }}
            onDeleteAccount={() => {
              // Handle delete account
            }}
          />
        );
      case 'privacySettings':
        return (
          <PrivacySettings
            onBack={navigateBack}
          />
        );
      case 'helpCenter':
        return (
          <HelpCenter
            onBack={navigateBack}
          />
        );
      case 'about':
        return (
          <About
            onBack={navigateBack}
          />
        );
      case 'routeTracking':
        return trackedRoute ? (
          <RouteTrackingPage
            route={trackedRoute}
            onStopTracking={handleStopTracking}
            onNavigateToStep={handleNavigateToStep}
          />
        ) : null;
      case 'templates':
        return <TemplatesPage onBack={navigateBack} onSelectTemplate={(template) => {
          // Set the template and navigate back to Create with map view
          setSelectedTemplate(template);
          setCreateInitialView('map'); // Ensure map view is shown
          navigateBack(); // Go back to Create page
        }} />;
      case 'dev':
        return <Dev onBack={navigateBack} />;
      case 'notifications':
        return <Notifications onBack={navigateBack} />;
      default:
        return <HomeFeed onViewProfile={handleViewProfile} />;
    }
  };

  const showNavBar = currentScreen !== 'friends' && currentScreen !== 'editProfile' && currentScreen !== 'settings' && currentScreen !== 'accountInfo' && currentScreen !== 'privacySettings' && currentScreen !== 'helpCenter' && currentScreen !== 'about' && currentScreen !== 'routeTracking' && currentScreen !== 'notifications';

  return (
    <div className="h-screen w-full max-w-md mx-auto flex flex-col bg-white relative overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {/* Always render the current non-capture and non-search-from-map screen */}
        <div className={`h-full w-full ${(currentScreen === 'capture' || (currentScreen === 'search' && searchOpenedFrom === 'map')) ? 'pointer-events-none' : ''}`}>
          {currentScreen !== 'capture' && !(currentScreen === 'search' && searchOpenedFrom === 'map') && renderScreen()}
        </div>
        
        {/* Animated Create Page Overlay */}
        <AnimatePresence>
          {currentScreen === 'capture' && (
            <motion.div
              key="create-page"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ 
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.4
              }}
              className="absolute inset-0 z-50"
            >
              <Create 
                onPreview={(steps, title, draftId) => {
                  handlePreview(steps, title, draftId);
                  setShouldResetCapture(false);
                }} 
                shouldReset={shouldResetCapture}
                onViewProfile={() => handleViewProfile('auth', true)}
                onBack={navigateBack}
                onPost={handlePost}
                onOpenSearch={(currentLocation) => {
                  // Show search overlay without unmounting Create
                  setShowSearchOverlayForLocationChange(true);
                  // Set the current step location
                  setCurrentStepLocation(currentLocation || '');
                }}
                onOpenMap={() => {
                  // Map view handled within Create component
                }}
                onOpenTemplates={() => navigateTo('templates')}
                externalTemplate={selectedTemplate}
                authUserData={authUserData}
                initialView={createInitialView}
                changingLocationForStepIndex={changingLocationForStepIndex}
                setChangingLocationForStepIndex={setChangingLocationForStepIndex}
                updateStepLocationCallback={updateStepLocationCallback}
                setUpdateStepLocationCallback={setUpdateStepLocationCallback}
                editingRouteData={editingRouteData}
                isEditMode={!!editingRouteId}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Search Page from Map - slides from right */}
        <AnimatePresence>
          {currentScreen === 'search' && searchOpenedFrom === 'map' && (
            <motion.div
              key="search-from-map"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.4
              }}
              className="absolute inset-0 z-50"
            >
              <Search 
                onViewRoute={handleViewRoute} 
                onViewProfile={handleViewProfile} 
                onStartTracking={handleStartRouteTracking} 
                onBack={() => {
                  setSearchPanelOpen(false);
                  setCurrentScreen('map');
                  setSearchOpenedFrom(null);
                }} 
                onCapture={() => setCurrentScreen('capture')} 
                searchPanelOpen={searchPanelOpen}
                authUserData={authUserData}
                changingLocationForStepIndex={changingLocationForStepIndex}
                onLocationSelected={(newLocation) => {
                  // Update profile location if in profile location mode
                  if (profileLocationMode) {
                    setAuthUserData({ ...authUserData, location: newLocation });
                    setProfileLocationMode(false);
                    setCurrentProfileLocation('');
                    navigateBack();
                  }
                  // Update the step location using the callback from Create
                  else if (changingLocationForStepIndex !== null && updateStepLocationCallback) {
                    updateStepLocationCallback(changingLocationForStepIndex, newLocation);
                    // Clear the step index
                    setChangingLocationForStepIndex(null);
                    // Navigate back to Create page
                    setSearchPanelOpen(false);
                    setCurrentScreen('capture');
                  }
                }}
                profileLocationMode={profileLocationMode}
                currentProfileLocation={currentProfileLocation}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Search Page from Home - slides from right */}
        <AnimatePresence>
          {currentScreen === 'search' && searchOpenedFrom === 'home' && (
            <motion.div
              key="search-from-home"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.4
              }}
              className="absolute inset-0 z-50"
            >
              <Search 
                onViewRoute={handleViewRoute} 
                onViewProfile={handleViewProfile} 
                onStartTracking={handleStartRouteTracking} 
                onBack={() => {
                  setSearchPanelOpen(false);
                  setCurrentScreen('home');
                  setSearchOpenedFrom(null);
                }} 
                onCapture={() => setCurrentScreen('capture')} 
                searchPanelOpen={searchPanelOpen}
                authUserData={authUserData}
                changingLocationForStepIndex={changingLocationForStepIndex}
                onLocationSelected={(newLocation) => {
                  // Update profile location if in profile location mode
                  if (profileLocationMode) {
                    setAuthUserData({ ...authUserData, location: newLocation });
                    setProfileLocationMode(false);
                    setCurrentProfileLocation('');
                    navigateBack();
                  }
                  // Update the step location using the callback from Create
                  else if (changingLocationForStepIndex !== null && updateStepLocationCallback) {
                    updateStepLocationCallback(changingLocationForStepIndex, newLocation);
                    // Clear the step index
                    setChangingLocationForStepIndex(null);
                    // Navigate back to Create page
                    setSearchPanelOpen(false);
                    setCurrentScreen('capture');
                  }
                }}
                profileLocationMode={profileLocationMode}
                currentProfileLocation={currentProfileLocation}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay for Location Change - appears on top of Create */}
        <AnimatePresence>
          {showSearchOverlayForLocationChange && currentScreen === 'capture' && (
            <motion.div
              key="search-overlay"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.4
              }}
              className="absolute inset-0 z-[60]"
            >
              <Search 
                onBack={() => {
                  // Close search overlay and clear step index
                  setShowSearchOverlayForLocationChange(false);
                  setChangingLocationForStepIndex(null);
                  setCurrentStepLocation(''); // Clear current step location
                }} 
                changingLocationForStepIndex={changingLocationForStepIndex}
                currentStepLocation={currentStepLocation}
                onLocationSelected={(newLocation) => {
                  // Update the step location using the callback from Create
                  if (changingLocationForStepIndex !== null && updateStepLocationCallback) {
                    updateStepLocationCallback(changingLocationForStepIndex, newLocation);
                  }
                  // Clear the step index and close overlay
                  setChangingLocationForStepIndex(null);
                  setShowSearchOverlayForLocationChange(false);
                  setCurrentStepLocation(''); // Clear current step location
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero View Switcher Animation - appears after onboarding */}
        {playViewSwitcherHeroAnimation && (
          <motion.div
            initial={{ 
              position: 'absolute',
              left: '50%',
              top: '230px',
              translateX: '-50%',
              zIndex: 50
            }}
            animate={{ 
              top: '28px'
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
              delay: 0
            }}
            onAnimationComplete={() => {
              // Animation complete, just change the hideViewSwitcher prop
              // Don't unmount the component - just show the real switcher
              setPlayViewSwitcherHeroAnimation(false);
            }}
            className="absolute"
          >
            <div className="bg-white rounded-[16px] px-[8px] py-[6px] flex items-center gap-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] h-[47.994px]">
              {/* Grid View Button */}
              <button className="flex items-center justify-center">
                <svg 
                  className="w-[24px] h-[24px]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth={viewPreferencePreview === 'posts' ? '3' : '2'}
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    opacity: viewPreferencePreview === 'posts' ? 1 : 0.3,
                    transform: viewPreferencePreview === 'posts' ? 'scale(1)' : 'scale(0.9)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </button>

              {/* Map View Button */}
              <button className="flex items-center justify-center">
                <svg 
                  className="w-[24px] h-[24px]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth={viewPreferencePreview === 'map' ? '3' : '2'}
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    opacity: viewPreferencePreview === 'map' ? 1 : 0.3,
                    transform: viewPreferencePreview === 'map' ? 'scale(1)' : 'scale(0.9)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  <line x1="9" y1="3" x2="9" y2="18"/>
                  <line x1="15" y1="6" x2="15" y2="21"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* BUILD Popup - appears on Create page */}
        <AnimatePresence>
          {showBuildPopup && currentScreen === 'capture' && (
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]"
            >
              {/* BUILD Popup - Step tile sized */}
              <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white border-8 border-[#e9e9e9] border-solid shadow-[0px_10px_25px_0px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-1">
                {/* Hammer Icon - Simpler design */}
                <svg className="w-8 h-8" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                {/* BUILD Text */}
                <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase tracking-wider">BUILD</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* POSTED Popup - appears after posting a route */}
        <AnimatePresence>
          {showPostedPopup && (
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]"
            >
              {/* POSTED Popup - Step tile sized */}
              <div className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white border-8 border-[#e9e9e9] border-solid shadow-[0px_10px_25px_0px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-1">
                {/* Checkmark Icon - Simpler design */}
                <svg className="w-8 h-8" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {/* POSTED Text */}
                <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase tracking-wider">POSTED</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Preference Overlay - First time experience */}
        <AnimatePresence>
          {!hasCompletedViewPreference && (
            <ViewPreferenceOverlay
              previewView={viewPreferencePreview}
              onPreviewChange={handleViewPreferenceChange}
              onComplete={handleViewPreferenceComplete}
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Toast notifications - positioned at highest z-index */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <Toaster 
          position="top-center"
          offset="500px"
        />
      </div>
    </div>
  );
}
