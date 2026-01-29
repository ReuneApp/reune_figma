import { useState, useEffect } from 'react';
import { X, Edit } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import StepBar from './StepBar';
import svgPaths from '../imports/svg-4y5y8njmj6';
import imgProfilePicture from 'figma:asset/9844bfd977f4f5988b484778db92f0fb779ff0dc.png';

interface Step {
  id: string;
  image: string;
  caption: string;
  location: string;
  suggestion: string;
}

interface Draft {
  id: string;
  title: string;
  steps: Step[];
  createdAt: number;
}

interface CaptureProps {
  onPreview: (steps: Step[], routeTitle: string, draftId: string | null) => void;
  shouldReset?: boolean;
  onViewProfile?: () => void;
}

export default function Capture({ onPreview, shouldReset, onViewProfile }: CaptureProps) {
  // State management
  const [steps, setSteps] = useState<Step[]>([]);
  const [routeTitle, setRouteTitle] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [showDeleteDraftConfirm, setShowDeleteDraftConfirm] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);

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
    'Blue Bottle Coffee',
    'Golden Gate Park',
    'Tartine Bakery',
    'Dolores Park',
    'SFMOMA',
    'The Mill'
  ];

  // Load drafts from localStorage
  useEffect(() => {
    const savedDrafts = localStorage.getItem('reune_drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  // Reload drafts when returning from route preview
  useEffect(() => {
    const savedDrafts = localStorage.getItem('reune_drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, [shouldReset]);

  // Reset after successful post
  useEffect(() => {
    if (shouldReset && currentDraftId) {
      const updatedDrafts = drafts.filter(d => d.id !== currentDraftId);
      setDrafts(updatedDrafts);
      localStorage.setItem('reune_drafts', JSON.stringify(updatedDrafts));
      
      setSteps([]);
      setRouteTitle('');
      setCurrentDraftId(null);
    }
  }, [shouldReset, currentDraftId, drafts]);

  // Save draft
  const saveDraft = () => {
    if (steps.length === 0) return;

    let updatedDrafts;
    
    if (currentDraftId) {
      updatedDrafts = drafts.map(d => 
        d.id === currentDraftId 
          ? { 
              ...d, 
              title: routeTitle || 'Untitled Route',
              steps: steps,
              createdAt: Date.now()
            }
          : d
      );
    } else {
      const draft: Draft = {
        id: Date.now().toString(),
        title: routeTitle || 'Untitled Route',
        steps: steps,
        createdAt: Date.now()
      };
      updatedDrafts = [...drafts, draft];
      setCurrentDraftId(draft.id);
    }

    setDrafts(updatedDrafts);
    localStorage.setItem('reune_drafts', JSON.stringify(updatedDrafts));
  };

  // Load draft
  const loadDraft = (draft: Draft) => {
    setSteps(draft.steps);
    setRouteTitle(draft.title === 'Untitled Route' ? '' : draft.title);
    setCurrentDraftId(draft.id);
    setShowDrafts(false);
  };

  // Delete draft
  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(d => d.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('reune_drafts', JSON.stringify(updatedDrafts));
    if (updatedDrafts.length === 0) {
      setShowDrafts(false);
    }
  };

  // Handle capture - instantly add to step bar
  const handleCapture = () => {
    setIsCapturing(true);
    
    setTimeout(() => {
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      const autoLocation = mockLocationNames[Math.floor(Math.random() * mockLocationNames.length)];
      
      const newStep: Step = {
        id: Date.now().toString(),
        image: randomImage,
        caption: '',
        location: autoLocation,
        suggestion: ''
      };
      
      setSteps([...steps, newStep]);
      setIsCapturing(false);
    }, 300);
  };

  // Handle post button
  const handlePost = () => {
    onPreview(steps, routeTitle, currentDraftId);
  };

  // Handle delete button
  const handleDeleteButton = () => {
    if (steps.length > 0) {
      setShowDeleteConfirm(true);
    }
  };

  // Format time ago
  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      {/* Background - Always black */}
      <div className="absolute inset-0 bg-black" />

      {/* IDLE STATE - No steps */}
      {steps.length === 0 && (
        <>
          {/* Top Left Close Button */}
          <div className="absolute left-[26px] top-[28px] z-20">
            <button 
              onClick={() => onViewProfile?.()}
              className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
            >
              <svg className="w-[34px] h-[34px]" fill="none" viewBox="0 0 34 34">
                <path d={svgPaths.pc263700} fill="black" />
              </svg>
            </button>
          </div>

          {/* Top Right Sidebar */}
          <div className="absolute right-[26px] top-[28px] flex flex-col gap-[11.996px] z-20">
            {/* Profile Picture Button */}
            <button 
              onClick={onViewProfile}
              className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform overflow-hidden"
            >
              <div className="w-[40.612px] h-[40.612px] overflow-hidden">
                <ImageWithFallback 
                  src={imgProfilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* Gallery Button */}
            <button className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>

            {/* Map Button */}
            <button className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d={svgPaths.p2a518500} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                <path d="M14.9952 5.76215V20.7573" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                <path d="M8.9971 3.23496V18.2301" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
              </svg>
            </button>

            {/* Search Button */}
            <button className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d={svgPaths.p468a980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
                <path d={svgPaths.p1cb43700} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4992" />
              </svg>
            </button>
          </div>

          {/* Bottom Step Bar with single Capture Button */}
          <div className="absolute left-0 top-[691px] w-full z-10">
            <div className="w-full flex justify-center items-center">
              <button 
                onClick={handleCapture}
                disabled={isCapturing}
                className="w-[95.998px] h-[95.998px] rounded-[20px] bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
              />
            </div>
          </div>

          {/* Drafts Button */}
          {drafts.length > 0 && (
            <div className="absolute bottom-[140px] left-0 right-0 flex justify-center z-10">
              <button
                onClick={() => setShowDrafts(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all shadow-lg border border-white/20 active:scale-95"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-semibold uppercase">View drafts ({drafts.length})</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* HAS STEPS STATE */}
      {steps.length > 0 && (
        <>
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 pt-[28px] px-[26px] z-20">
            <div className="flex items-center justify-between gap-3">
              {/* Close/Delete Button */}
              <button
                onClick={handleDeleteButton}
                className="w-[47.994px] h-[47.994px] rounded-[16px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform"
              >
                <svg className="w-[34px] h-[34px]" fill="none" viewBox="0 0 34 34">
                  <path d={svgPaths.pc263700} fill="black" />
                </svg>
              </button>

              {/* Route Title */}
              <div
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] transition-all shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white text-[#1e1e1e]`}
              >
                <span className="text-[14px] uppercase truncate max-w-[180px]">
                  {routeTitle || 'ADD TITLE'}
                </span>
              </div>

              {/* Spacer */}
              <div className="w-[47.994px]" />
            </div>
          </div>

          {/* Bottom Step Bar */}
          <div className="absolute left-0 top-[691px] w-full z-10">
            <StepBar
              steps={steps.map(step => ({
                id: step.id,
                image: step.image,
                location: step.location
              }))}
              selectedStepIndex={-1}
              onCaptureClick={handleCapture}
              onPostClick={handlePost}
              mode="capture"
            />
          </div>
        </>
      )}

      {/* Capture Flash Effect */}
      {isCapturing && (
        <div className="absolute inset-0 bg-white animate-pulse z-50" />
      )}

      {/* SAVE/DISCARD DIALOG */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="rounded-[32px] border-0 shadow-2xl max-w-[340px]">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-xl">Save your progress?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              You have {steps.length} unsaved {steps.length === 1 ? 'step' : 'steps'} in your route. Would you like to save it as a draft?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-3 sm:flex-col mt-6">
            <AlertDialogAction
              onClick={() => {
                saveDraft();
                setSteps([]);
                setRouteTitle('');
                setShowDeleteConfirm(false);
              }}
              className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              SAVE DRAFT
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                setSteps([]);
                setRouteTitle('');
                setCurrentDraftId(null);
                setShowDeleteConfirm(false);
              }}
              className="w-full h-12 rounded-full bg-transparent hover:bg-muted text-destructive hover:text-destructive border border-border transition-all active:scale-[0.98]"
            >
              DISCARD
            </AlertDialogAction>
            <AlertDialogCancel className="w-full h-12 rounded-full mt-0 bg-transparent hover:bg-muted border-0 text-muted-foreground hover:text-foreground transition-all active:scale-[0.98]">
              CANCEL
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DRAFTS BOTTOM SHEET */}
      <Sheet open={showDrafts} onOpenChange={setShowDrafts}>
        <SheetContent side="bottom" className="rounded-t-[32px] border-0 px-0 pt-6 pb-8 max-h-[85vh] [&>button]:hidden">
          <div className="w-12 h-1.5 bg-muted-foreground/40 rounded-full mx-auto mb-6" />
          
          <SheetTitle className="sr-only">Drafts</SheetTitle>
          <SheetDescription className="sr-only">Your saved route drafts</SheetDescription>

          <div className="px-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  DRAFTS
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </div>

            {drafts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4 className="mb-2.5 text-foreground uppercase">No drafts saved</h4>
                <p className="text-sm text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
                  Start creating a route and save it as a draft to continue later
                </p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[calc(85vh-180px)]">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="relative rounded-3xl bg-muted/40 hover:bg-muted/60 border border-border/40 hover:border-border transition-all cursor-pointer active:scale-[0.98] p-4"
                    onClick={() => loadDraft(draft)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 pr-3">
                        <h3 className="font-semibold mb-1 truncate text-foreground uppercase">
                          {draft.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                          <span className="text-xs uppercase">{formatTimeAgo(draft.createdAt)}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDraftToDelete(draft.id);
                          setShowDeleteDraftConfirm(true);
                        }}
                        className="w-8 h-8 hover:bg-background/80 rounded-full flex items-center justify-center transition-colors flex-shrink-0 text-muted-foreground hover:text-foreground"
                      >
                        <X size={15} strokeWidth={2.5} />
                      </button>
                    </div>

                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
                      {draft.steps.map((step, index) => (
                        <div
                          key={step.id}
                          className="relative flex-shrink-0 w-[68px] h-[68px] rounded-2xl overflow-hidden bg-background shadow-sm"
                        >
                          <ImageWithFallback
                            src={step.image}
                            alt={`Step ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1.5 left-1.5 min-w-[22px] h-[22px] px-1.5 bg-black/75 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold leading-none">{index + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* DELETE DRAFT CONFIRMATION */}
      <AlertDialog open={showDeleteDraftConfirm} onOpenChange={setShowDeleteDraftConfirm}>
        <AlertDialogContent className="rounded-[32px] border-0 shadow-2xl max-w-[340px]">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-xl">Delete this draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This draft will be permanently removed and cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-3 sm:flex-col mt-6">
            <AlertDialogAction
              onClick={() => {
                if (draftToDelete) {
                  deleteDraft(draftToDelete);
                }
                setShowDeleteDraftConfirm(false);
                setDraftToDelete(null);
              }}
              className="w-full h-12 rounded-full bg-destructive hover:bg-destructive/90 transition-all active:scale-[0.98]"
            >
              DELETE DRAFT
            </AlertDialogAction>
            <AlertDialogCancel className="w-full h-12 rounded-full mt-0 bg-transparent hover:bg-muted border-0 text-muted-foreground hover:text-foreground transition-all active:scale-[0.98]">
              CANCEL
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}