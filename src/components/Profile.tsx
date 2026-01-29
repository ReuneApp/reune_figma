import { useState } from 'react';
import { MapPin, UsersRound, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RouteCard {
  id: string;
  title: string;
  image: string;
  likes: number;
  date: string;
}

const mockCreatedRoutes: RouteCard[] = [
  {
    id: '1',
    title: 'Sunday Coffee Crawl',
    image: 'https://images.unsplash.com/photo-1611653682161-f58ba65ead46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMjg2NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 234,
    date: '2 days ago'
  },
  {
    id: '2',
    title: 'Park Adventures',
    image: 'https://images.unsplash.com/photo-1625861886374-ad02172db792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMG5hdHVyZXxlbnwxfHx8fDE3NjAzNjUwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 456,
    date: '1 week ago'
  },
  {
    id: '3',
    title: 'Foodie Friday',
    image: 'https://images.unsplash.com/photo-1684568519316-f0fb02f7826b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYwMzExNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 789,
    date: '2 weeks ago'
  },
  {
    id: '4',
    title: 'Art Gallery Day',
    image: 'https://images.unsplash.com/photo-1747918157024-a1e1c77336fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MDM1OTQ0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 567,
    date: '3 days ago'
  },
  {
    id: '5',
    title: 'Beach Sunset',
    image: 'https://images.unsplash.com/photo-1645437043538-9821b87beb3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNvYXN0bGluZXxlbnwxfHx8fDE3NjAyODA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 890,
    date: '1 week ago'
  },
  {
    id: '6',
    title: 'Mountain Hike',
    image: 'https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAzOTY4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 321,
    date: '2 weeks ago'
  }
];

const mockSavedRoutes: RouteCard[] = [
  {
    id: '7',
    title: 'Downtown Walking Tour',
    image: 'https://images.unsplash.com/photo-1611222566037-1aa237c0f5ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldCUyMHZpZXd8ZW58MXx8fHwxNzYwNDM3ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 678,
    date: 'Saved 3 days ago'
  },
  {
    id: '8',
    title: 'Historic District',
    image: 'https://images.unsplash.com/photo-1723479812089-9f74276cf29d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MDQzNzg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 923,
    date: 'Saved 1 week ago'
  }
];

interface ProfileProps {
  onSettings?: () => void;
  onEditProfile?: () => void;
  onViewFriends?: () => void;
}

export default function Profile({ onSettings, onEditProfile, onViewFriends }: ProfileProps = {}) {
  const [activeTab, setActiveTab] = useState<'created' | 'saved'>('created');

  const user = {
    name: 'Alex Morgan',
    username: 'alexmorgan',
    avatar: 'https://images.unsplash.com/photo-1642776187162-ca6256697510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDU0ODkzMnww&ixlib=rb-4.1.0&q=80&w=400',
    city: 'San Francisco, CA',
    stats: {
      routes: 24
    }
  };

  const displayRoutes = activeTab === 'created' ? mockCreatedRoutes : mockSavedRoutes;

  return (
    <div className="h-full w-full bg-background flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between px-6 pt-16 pb-4">
          <h2 className="cursor-default">Profile</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={onViewFriends}
              className="relative bg-white box-border flex items-center justify-center p-[10px] rounded-[18px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] transition-all active:scale-95 hover:shadow-[0px_6px_16px_0px_rgba(0,0,0,0.2)]"
            >
              <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[2px] border-solid inset-0 pointer-events-none rounded-[18px]" />
              <UsersRound size={24} strokeWidth={2} className="relative text-[#1e1e1e]" />
            </button>
            <button 
              onClick={onSettings}
              className="relative bg-white box-border flex items-center justify-center p-[10px] rounded-[18px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] transition-all active:scale-95 hover:shadow-[0px_6px_16px_0px_rgba(0,0,0,0.2)]"
            >
              <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[2px] border-solid inset-0 pointer-events-none rounded-[18px]" />
              <Settings size={24} strokeWidth={2} className="relative text-[#1e1e1e]" />
            </button>
          </div>
        </div>

        {/* Profile Section - Horizontal Layout */}
        <div className="px-6 pb-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden ring-2 ring-border/30">
                <ImageWithFallback
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Info - Left Aligned */}
            <div className="flex-1 pt-2">
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-base text-muted-foreground mb-3">@{user.username}</p>
              
              {/* Info Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="bg-muted px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <MapPin size={14} strokeWidth={2} />
                  <span className="text-sm">{user.stats.routes} Routes</span>
                </div>
                <div className="bg-muted px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <MapPin size={14} strokeWidth={2} />
                  <span className="text-sm">{user.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Switcher - with padding */}
        <div className="px-6 pb-4">
          <div className="bg-[#F0F0F0] rounded-full p-1 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('created')}
              className={`flex-1 py-2.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                activeTab === 'created'
                  ? 'bg-white text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-muted-foreground'
              }`}
            >
              <span className="font-medium text-sm">Posts</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-2.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                activeTab === 'saved'
                  ? 'bg-white text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-muted-foreground'
              }`}
            >
              <span className="font-medium text-sm">Saved</span>
            </button>
          </div>
        </div>
      </div>

      {/* Routes Grid - Scrollable - Centered */}
      <div className="flex-1 overflow-y-auto px-6 pb-40">
        {displayRoutes.length > 0 ? (
          <div className="max-w-[600px] mx-auto">
            <div className="grid grid-cols-3 gap-3">
              {displayRoutes.map((route) => (
                <div
                  key={route.id}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted"
                >
                  <ImageWithFallback
                    src={route.image}
                    alt={route.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MapPin size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {activeTab === 'created' ? 'No routes yet' : 'No saved routes'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}