import { useState, useEffect, useRef } from 'react';
import svgPaths from '../imports/svg-4gwldssg2s';
import { X, Search as SearchIconLucide } from 'lucide-react';

interface SearchProps {
  onBack?: () => void;
  onRouteClick?: (routeId: string) => void;
  onPlaceClick?: (placeId: string, placeName: string, placeImage: string) => void;
  changingLocationForStepIndex?: number | null; // Step index being edited, if any
  onLocationSelected?: (newLocation: string) => void; // Callback when location is selected in change mode
  currentStepLocation?: string; // Current location of the step being edited
  profileLocationMode?: boolean; // New mode for selecting profile location
  currentProfileLocation?: string; // Current profile location
}

// Solid MapPin Icon Component (filled style like in location chip)
const SolidMapPin = ({ size = 15, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// Mock nearby places for location change mode
const mockNearbyPlaces = [
  { 
    id: 'nearby-1', 
    name: 'THE BLUE CAFE', 
    category: 'COFFEE SHOP',
    distance: '0.8MI',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxMDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 'nearby-2', 
    name: 'GOLDEN GATE PARK', 
    category: 'PARK',
    distance: '1.2MI',
    image: 'https://images.unsplash.com/photo-1667757526327-dbe1edd781d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMHRyZWVzfGVufDF8fHx8MTc2Njc2NjQ1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 'nearby-3', 
    name: 'PIER 39', 
    category: 'WATERFRONT',
    distance: '2.1MI',
    image: 'https://images.unsplash.com/photo-1653182791321-422c3f7f20e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWVyJTIwd2F0ZXJmcm9udHxlbnwxfHx8fDE3NjY3NjY0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 'nearby-4', 
    name: 'UNION SQUARE', 
    category: 'PLAZA',
    distance: '0.5MI',
    image: 'https://images.unsplash.com/photo-1699192947124-683e2126f8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3F1YXJlJTIwZG93bnRvd258ZW58MXx8fHwxNzY2NzY2NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 'nearby-5', 
    name: 'ALAMO SQUARE', 
    category: 'LANDMARK',
    distance: '1.5MI',
    image: 'https://images.unsplash.com/photo-1566515610329-94f02c3707d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBob3VzZXN8ZW58MXx8fHwxNzY2NzY2NDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
].sort((a, b) => {
  // Sort by distance (extract number from string like "0.8MI")
  const distanceA = parseFloat(a.distance);
  const distanceB = parseFloat(b.distance);
  return distanceA - distanceB;
});

// Mock nearby areas for profile location mode
const mockNearbyAreas = [
  { 
    id: 'area-1', 
    name: 'MARYLEBONE', 
    category: 'NEIGHBORHOOD',
    distance: '0.3MI',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBzdHJlZXQlMjBuZWlnaGJvcmhvb2R8ZW58MXx8fHwxNzM0MDM2ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: 'area-2', 
    name: 'SHOREDITCH', 
    category: 'DISTRICT',
    distance: '0.7MI',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9yZWRpdGNoJTIwbG9uZG9ufGVufDF8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: 'area-3', 
    name: 'CAMDEN', 
    category: 'NEIGHBORHOOD',
    distance: '1.1MI',
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1kZW4lMjBsb25kb258ZW58MXx8fHwxNzM0MDM2ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: 'area-4', 
    name: 'CHELSEA', 
    category: 'NEIGHBORHOOD',
    distance: '1.5MI',
    image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVsc2VhJTIwbG9uZG9ufGVufDF8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: 'area-5', 
    name: 'BRIXTON', 
    category: 'DISTRICT',
    distance: '2.3MI',
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicml4dG9uJTIwbG9uZG9ufGVufDF8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
].sort((a, b) => {
  // Sort by distance (extract number from string like "0.8MI")
  const distanceA = parseFloat(a.distance);
  const distanceB = parseFloat(b.distance);
  return distanceA - distanceB;
});

function BackIcon() {
  return (
    <div className="relative shrink-0 size-[23.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p3152c100} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d="M18.9939 11.9961H4.99839" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-[23.992px] opacity-60 text-[#1e1e1e]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p468a980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
          <path d={svgPaths.p1cb43700} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
        </g>
      </svg>
    </div>
  );
}

export default function Search({ onBack, onPlaceClick, changingLocationForStepIndex, onLocationSelected, currentStepLocation, profileLocationMode, currentProfileLocation }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showAllNearbyPlaces, setShowAllNearbyPlaces] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('reuneSearchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        // If parsing fails, start with empty history
        setSearchHistory([]);
      }
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('reuneSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Scroll input to the end when text changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [searchQuery]);

  // Check if we're in location change mode (for steps) or profile location mode
  const isLocationChangeMode = changingLocationForStepIndex !== null && changingLocationForStepIndex !== undefined && currentStepLocation;
  const isProfileLocationMode = profileLocationMode === true;

  // Use the appropriate current location based on mode
  const currentLocation = isProfileLocationMode ? currentProfileLocation : currentStepLocation;

  // Select the appropriate data source based on mode
  const dataSource = isProfileLocationMode ? mockNearbyAreas : mockNearbyPlaces;

  // Find the current location data from nearby places or areas
  const currentLocationData = dataSource.find(place => place.name === currentLocation) || dataSource[0];

  // Filter based on search query using the appropriate data source
  const filteredNearbyPlaces = dataSource.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search submission (when user presses Enter)
  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0 && !searchHistory.includes(searchQuery.trim())) {
      // Add to history but DON'T clear the search query - keep showing results
      setSearchHistory([searchQuery.trim(), ...searchHistory]);
    }
  };

  // Remove item from search history
  const removeFromHistory = (item: string) => {
    setSearchHistory(searchHistory.filter(h => h !== item));
  };

  // Determine if we're showing search results
  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <div className="bg-white h-full overflow-clip relative w-full">
      {/* Back Button */}
      <button 
        onClick={() => {
          // If there's text in the search field, clear it first
          if (searchQuery.trim().length > 0) {
            setSearchQuery('');
          } else {
            // If search is empty, navigate back
            onBack?.();
          }
        }}
        className="absolute bg-white box-border content-stretch flex items-center justify-center left-[26px] pl-[3.691px] pr-[3.701px] py-[3.691px] rounded-[16px] size-[47.994px] top-[28px] active:scale-95 transition-transform z-20"
      >
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[3.691px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
        <BackIcon />
      </button>

      {/* Search Text Bar */}
      <div className="absolute bg-white box-border content-stretch flex gap-[18px] h-[70px] items-center left-[43px] pl-[28px] pr-[20px] rounded-[20px] top-[107px] w-[300px] z-20 overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
        <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
        <SearchIcon />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
          placeholder="SEARCH"
          className="font-['Baloo_Tamma',sans-serif] leading-[1] not-italic text-black text-[22px] bg-transparent border-none outline-none placeholder:text-[#e9e9e9] uppercase flex-1 opacity-60 placeholder:opacity-100 whitespace-nowrap"
          style={{ paddingTop: '0', paddingBottom: '0', paddingRight: '0', margin: '0', height: '22px', display: 'flex', alignItems: 'center', maxWidth: '190px' }}
          ref={inputRef}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>

      {/* Profile Location Mode - same UI as step location change */}
      {isProfileLocationMode && (
        <div className="absolute left-[43px] top-[193px] w-[300px] z-20 bottom-[40px] flex flex-col">
          {/* Only show current location when not searching */}
          {!showSearchResults && currentProfileLocation && (
            <>
              {/* Current Location Section Title */}
              <p className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase mb-[12px] mt-[12px]">
                CURRENT LOCATION
              </p>

              {/* Current Location - matches nearby results style but with green border */}
              <button
                className="flex items-center gap-[16px] mb-[24px]"
              >
                {/* Rounded square image container - matching step tile with GREEN border to show selection */}
                <div className="w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden shrink-0 flex items-center justify-center border-[8px] border-[#1ABB6C] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                  <img 
                    src={currentLocationData.image} 
                    alt={currentProfileLocation}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Place info */}
                <div className="flex flex-col items-start gap-[0px] flex-1">
                  {/* Place name */}
                  <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] text-left leading-[normal] uppercase">
                    {currentProfileLocation}
                  </p>
                  {/* Category and distance */}
                  <div className="flex items-center gap-[8px]">
                    <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
                      {currentLocationData.category}
                    </span>
                    <span className="text-[#1e1e1e] opacity-40">•</span>
                    <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
                      {currentLocationData.distance}
                    </span>
                  </div>
                </div>
              </button>
            </>
          )}

          {/* Section Title - changes based on search state */}
          <p className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase mb-[12px] mt-[12px]">
            {showSearchResults ? 'SEARCH RESULTS' : 'NEARBY AREAS'}
          </p>

          {/* Results list - scrollable */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-[12px] pb-[20px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {filteredNearbyPlaces.length > 0 ? (
              filteredNearbyPlaces.map((place) => (
                <button
                  key={place.id}
                  onClick={() => {
                    onLocationSelected?.(place.name);
                  }}
                  className="flex items-center gap-[16px] transition-all duration-300 active:scale-95"
                >
                  {/* Rounded square image container - matching step tile exactly */}
                  <div className="w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden shrink-0 flex items-center justify-center border-[8px] border-[#e9e9e9] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Place info */}
                  <div className="flex flex-col items-start gap-[0px] flex-1">
                    {/* Place name */}
                    <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] text-left leading-[normal] uppercase">
                      {place.name}
                    </p>
                    {/* Category and distance */}
                    <div className="flex items-center gap-[8px]">
                      <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
                        {place.category}
                      </span>
                      <span className="text-[#1e1e1e] opacity-40">•</span>
                      <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
                        {place.distance}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <p className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-center leading-[normal] uppercase mt-[20px]">
                NO RESULTS FOUND
              </p>
            )}
          </div>
        </div>
      )}

      {/* Default Search View - only when not in location modes */}
      {!isLocationChangeMode && !isProfileLocationMode && (
        <div className="absolute left-[43px] right-[43px] top-[203px] bottom-[40px] flex flex-col">
          {/* Show nearby places when not focused and not searching */}
          {!isSearchFocused && !showSearchResults && (
            <div className="flex flex-col overflow-y-auto px-[20px] -mx-[20px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {/* Nearby Places Section */}
              <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] opacity-40 uppercase mb-[12px]">
                NEARBY PLACES
              </p>
              <div className="flex flex-col gap-[20px] mb-[16px] py-[8px]">
                {mockNearbyPlaces.slice(0, showAllNearbyPlaces ? mockNearbyPlaces.length : 3).map((place) => (
                  <button
                    key={place.id}
                    onClick={() => {
                      onPlaceClick?.(place.id, place.name, place.image);
                    }}
                    className="flex items-center gap-[16px] transition-all duration-300 active:scale-95"
                  >
                    {/* Rounded square image container */}
                    <div className="w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden shrink-0 flex items-center justify-center border-[8px] border-[#e9e9e9] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Place info */}
                    <div className="flex flex-col items-start gap-[0px] flex-1">
                      {/* Place name */}
                      <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] text-left leading-[normal] uppercase">
                        {place.name}
                      </p>
                      {/* Category and distance */}
                      <div className="flex items-center gap-[8px]">
                        <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
                          {place.category}
                        </span>
                        <span className="text-[#1e1e1e] opacity-40">•</span>
                        <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
                          {place.distance}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Show More/Less Button - styled like location chip */}
              {mockNearbyPlaces.length > 3 && (
                <button
                  onClick={() => setShowAllNearbyPlaces(!showAllNearbyPlaces)}
                  className="bg-white h-[48px] px-[20px] py-[10px] rounded-[16px] shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)] relative active:scale-95 transition-all duration-200 self-start mb-[32px]"
                >
                  <div aria-hidden="true" className="absolute border-4 border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] uppercase relative">
                    {showAllNearbyPlaces ? 'SHOW LESS' : 'SHOW MORE'}
                  </p>
                </button>
              )}
            </div>
          )}

          {/* Show recent searches when focused and not searching */}
          {isSearchFocused && !showSearchResults && searchHistory.length > 0 && (
            <div className="flex flex-col gap-[16px] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {/* Recent Searches Section */}
              <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] opacity-40 uppercase mb-[8px]">
                RECENT SEARCHES
              </p>
              {searchHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-[12px]">
                  <button
                    onClick={() => setSearchQuery(item)}
                    className="flex-1 text-left"
                  >
                    <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] uppercase">
                      {item}
                    </p>
                  </button>
                  <button
                    onClick={() => removeFromHistory(item)}
                    className="ml-[16px] transition-all active:scale-90"
                  >
                    <X size={20} className="text-[#1e1e1e] opacity-40" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Show search results */}
          {showSearchResults && (
            <div className="flex flex-col gap-[16px] overflow-y-auto -mx-[20px] px-[20px] pb-[20px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {filteredNearbyPlaces.length > 0 ? (
                filteredNearbyPlaces.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => {
                      onPlaceClick?.(place.id, place.name, place.image);
                      // Add to search history when clicking a result
                      if (!searchHistory.includes(searchQuery.trim())) {
                        setSearchHistory([searchQuery.trim(), ...searchHistory]);
                      }
                    }}
                    className="flex items-center gap-[16px] transition-all duration-300 active:scale-95"
                  >
                    {/* Rounded square image container */}
                    <div className="w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden shrink-0 flex items-center justify-center border-[8px] border-[#e9e9e9] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Place info */}
                    <div className="flex flex-col items-start gap-[0px] flex-1">
                      {/* Place name */}
                      <p className="font-['Baloo_Tamma',sans-serif] text-[18px] text-[#1e1e1e] text-left leading-[normal] uppercase">
                        {place.name}
                      </p>
                      {/* Category and distance */}
                      <div className="flex items-center gap-[8px]">
                        <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
                          {place.category}
                        </span>
                        <span className="text-[#1e1e1e] opacity-40">•</span>
                        <span className="font-['Baloo_Tamma',sans-serif] text-[14px] opacity-40 text-[#1e1e1e] text-left leading-[normal] uppercase">
                          {place.distance}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="font-['Baloo_Tamma',sans-serif] text-[14px] text-[#1e1e1e] opacity-40 uppercase text-center py-[40px]">
                  NO RESULTS FOUND
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}