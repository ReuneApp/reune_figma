import { useState } from 'react';
import { Type } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GalleryPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage: (imageUrl: string) => void;
}

interface GalleryImage {
  url: string;
  hasLocation: boolean;
  hasCaption: boolean;
}

// Solid MapPin Icon Component
const SolidMapPin = ({ size = 11, className = '' }: { size?: number; className?: string }) => (
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

// Mock gallery images with metadata - simulating user's photo library (most recent first)
const mockGalleryImages: GalleryImage[] = [
  { url: 'https://images.unsplash.com/photo-1633735672439-580d8f078b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwc3Vuc2V0fGVufDF8fHx8MTc2MDMzODIwN3ww&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyOTcyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: false },
  { url: 'https://images.unsplash.com/photo-1747918157024-a1e1c77336fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbXVzZXVtfGVufDF8fHx8MTc2MDM1OTQ0NHww&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: false, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1684568519316-f0fb02f7826b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYwMzExNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1625861886374-ad02172db792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMG5hdHVyZXxlbnwxfHx8fDE3NjAzNjUwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: false, hasCaption: false },
  { url: 'https://images.unsplash.com/photo-1611653682161-f58ba65ead46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMjg2NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: false },
  { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0fGVufDF8fHx8MTc2MDU0OTMyMnww&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjA1NDkzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: false, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2MDU0OTMyNHww&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwNTQ5MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: false, hasCaption: false },
  { url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYwNTQ5MzI2fDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: false },
  { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJvYWR8ZW58MXx8fHwxNzYwNTQ5MzI3fDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWt8ZW58MXx8fHwxNzYwNTQ5MzI4fDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: false, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGx8ZW58MXx8fHwxNzYwNTQ5MzI5fDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: false },
  { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBmb3Jlc3R8ZW58MXx8fHwxNzYwNTQ5MzMwfDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYwNTQ5MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: false, hasCaption: false },
  { url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc2MDU0OTMzMnww&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: true, hasCaption: true },
  { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWVsZCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjA1NDkzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080', hasLocation: false, hasCaption: true },
];

export default function GalleryPicker({ open, onOpenChange, onSelectImage }: GalleryPickerProps) {
  const [filterLocation, setFilterLocation] = useState(false);
  const [filterCaption, setFilterCaption] = useState(false);

  const handleSelect = (imageUrl: string) => {
    onSelectImage(imageUrl);
    onOpenChange(false);
  };

  // Filter images based on active filters
  const filteredImages = mockGalleryImages.filter(image => {
    // If no filters active, show all
    if (!filterLocation && !filterCaption) return true;
    
    // If both filters active, image must have both
    if (filterLocation && filterCaption) {
      return image.hasLocation && image.hasCaption;
    }
    
    // If only location filter active
    if (filterLocation) return image.hasLocation;
    
    // If only caption filter active
    if (filterCaption) return image.hasCaption;
    
    return true;
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-[32px] border-0 px-0 pb-8 max-h-[85vh] [&>button]:hidden">
        {/* Drag Handle */}
        <div className="w-12 h-1.5 bg-muted-foreground/40 rounded-full mx-auto mt-4 mb-6" />
        
        {/* Visually Hidden Title for Accessibility */}
        <SheetTitle className="sr-only">Choose from gallery</SheetTitle>
        <SheetDescription className="sr-only">Select a photo from your gallery</SheetDescription>
        
        <div className="px-6">
          {/* Header with Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Photos
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setFilterLocation(!filterLocation)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterLocation
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Location
            </button>
            <button
              onClick={() => setFilterCaption(!filterCaption)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterCaption
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Caption
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="max-h-[calc(85vh-180px)] overflow-y-auto -mx-6 px-6">
            {filteredImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {filteredImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(image.url)}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-muted hover:opacity-80 active:scale-95 transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <ImageWithFallback
                      src={image.url}
                      alt={`Gallery photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Metadata Indicators */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {/* Location Indicator */}
                      {image.hasLocation && (
                        <div className="w-5 h-5 rounded-full bg-black/80 flex items-center justify-center">
                          <SolidMapPin size={11} className="text-white" />
                        </div>
                      )}
                      
                      {/* Caption Indicator */}
                      {image.hasCaption && (
                        <div className="w-5 h-5 rounded-full bg-black/80 flex items-center justify-center">
                          <Type className="text-white" size={11} strokeWidth={2.5} />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No photos match your filters</p>
                <p className="text-sm mt-1">Try adjusting your filter selection</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
