import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface SearchBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBottomSheet({ isOpen, onClose }: SearchBottomSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchSheetExpanded, setIsSearchSheetExpanded] = useState(false);
  const [searchHistory] = useState<string[]>(['COFFEE SHOPS', 'PARKS', 'RESTAURANTS']);

  // Mock search results
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

  const filteredSearchResults = searchQuery.trim() 
    ? mockPlaces.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (query: string) => {
    console.log('Search submitted:', query);
  };

  const handleClose = () => {
    setSearchQuery('');
    setIsSearchSheetExpanded(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-[9998]"
            onClick={handleClose}
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
            className={`fixed ${isSearchSheetExpanded ? 'top-0' : 'bottom-0'} left-0 right-0 bg-white ${isSearchSheetExpanded ? 'rounded-[0px]' : 'rounded-t-[30px]'} z-[9999] flex flex-col`}
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
                  onClick={handleClose}
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
  );
}
