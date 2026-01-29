import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import PlaceSelectionUI from './PlaceSelectionUI';
import PlaceGalleryPopup from './PlaceGalleryPopup';
import { useState } from 'react';

interface PlaceSelectionPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlaceSelectionPreview({ isOpen, onClose }: PlaceSelectionPreviewProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const mockPlace = {
    id: '1',
    name: 'SAKURA RAMEN HOUSE',
    category: 'JAPANESE RESTAURANT',
    distance: '1.2 MI',
    image: 'https://images.unsplash.com/photo-1732522158226-676fa2512f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHJhbWVuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjgzMjQ3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    photos: [
      'https://images.unsplash.com/photo-1732522158226-676fa2512f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHJhbWVuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjgzMjQ3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1627900440398-5db32dba8db1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGJvd2wlMjBub29kbGVzfGVufDF8fHx8MTc2ODI3Mzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1562560471-cb5b5f96c1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjgzMDA0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1636474498689-27e2d3ecf8d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG5vb2RsZXMlMjBzb3VwfGVufDF8fHx8MTc2ODMyNDcwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1743623987484-d18bb133a6e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc2ODMyNDcwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1609149401081-fb5b04b8d451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGZvb2QlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc2ODMyNDcwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1732522158226-676fa2512f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHJhbWVuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjgzMjQ3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[9999]"
        >
          {/* Close Button - Top Left */}
          <button
            onClick={onClose}
            className="absolute left-[26px] top-[28px] z-20 w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border-[3.691px] border-[#e9e9e9] active:scale-95 transition-transform"
          >
            <X className="w-5 h-5 text-black" strokeWidth={3} />
          </button>

          {/* Place Selection UI - Shared Component */}
          <PlaceSelectionUI
            place={mockPlace}
            onTileClick={() => setIsGalleryOpen(true)}
          />

          {/* Place Gallery Popup - Shared Component */}
          <PlaceGalleryPopup
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            place={mockPlace}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}