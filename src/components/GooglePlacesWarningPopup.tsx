import { motion, AnimatePresence } from 'motion/react';
import { CameraOff } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface GooglePlacesWarningPopupProps {
  isOpen: boolean;
  onClose: () => void;
  stepNumbers?: string; // e.g., "1, 3, 5"
}

export default function GooglePlacesWarningPopup({ 
  isOpen, 
  onClose,
  stepNumbers = "2, 4"
}: GooglePlacesWarningPopupProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent 
        className="bg-white border-8 border-[#e9e9e9] border-solid rounded-[30px] max-w-[340px] p-6 shadow-none w-[340px]"
        onClick={(e) => e.stopPropagation()}
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
        {stepNumbers && (
          <p className="font-['Baloo_Tamma',sans-serif] text-[12px] text-[#999999] text-center mb-6 px-2">
            {stepNumbers.includes(',') 
              ? `MISSING PHOTOS: STEPS ${stepNumbers}`
              : `MISSING PHOTOS: STEP ${stepNumbers}`}
          </p>
        )}
        
        {/* Continue button */}
        <button
          onClick={onClose}
          className="w-full bg-white border-4 border-[#e9e9e9] border-solid rounded-[20px] h-[70px] flex items-center justify-center active:scale-95 transition-transform shadow-[0px_3px_15px_0px_rgba(0,0,0,0.25)]"
        >
          <span className="font-['Baloo_Tamma',sans-serif] text-[22px] text-[#1e1e1e] uppercase">
            CONTINUE
          </span>
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
}