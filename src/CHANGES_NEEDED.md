# Changes Needed for Create.tsx

## Change 1: Remove POST button from camera view StepBar
In Create.tsx, lines ~1513 and ~1706, remove the `onPostClick={handlePost}` prop from StepBar

## Change 2: Add full screen image functionality to map view
Around line 860, after `<div className="bg-white h-[852.649px]...">`, add:
```tsx
{/* Full Screen Image - Only show when not minimized */}
{!isMapImageMinimized && selectedMapStepIndex >= 0 && selectedMapStepIndex < getCombinedPlaces().length && (
  <div 
    className="absolute inset-0 z-[30] bg-black flex items-center justify-center"
    onClick={() => setIsMapImageMinimized(true)}
  >
    <img 
      src={getCombinedPlaces()[selectedMapStepIndex].image}
      alt={getCombinedPlaces()[selectedMapStepIndex].name}
      className="w-full h-full object-cover"
    />
  </div>
)}
```

## Change 3: Add onClick handler to map view step tiles (around line 1173)
Replace the button element with onClick and green border:
```tsx
<button
  onClick={() => {
    if (selectedMapStepIndex === index) {
      setIsMapImageMinimized(!isMapImageMinimized);
    } else {
      setSelectedMapStepIndex(index);
      setIsMapImageMinimized(false);
    }
  }}
  onMouseDown={() => {
    if (!place.isFromCamera) {
      handleMapPlacePressStart(parseInt(place.id.replace('map-', '')));
    }
  }}
  // ... rest of handlers
  className={`w-[95.998px] h-[95.998px] rounded-[20px] overflow-hidden flex items-center justify-center border-[8px] ${selectedMapStepIndex === index ? 'border-[#1abb6c]' : 'border-[#e9e9e9]'} shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white active:scale-95 transition-transform`}
>
```

## Change 4: Grey out USE TEMPLATE when steps exist (around line 1084)
Add disabled state and opacity:
```tsx
<button 
  onClick={(e) => {
    e.stopPropagation();
    setShowTemplatesPanel(true);
    setIsAddMenuExpanded(false);
  }}
  disabled={getCombinedPlaces().length > 0}
  className={`relative h-[47.994px] rounded-[16px] bg-white flex items-center justify-start gap-[8px] px-[16px] transition-transform whitespace-nowrap ${getCombinedPlaces().length > 0 ? 'opacity-40 cursor-not-allowed' : 'active:scale-95'}`}
>
```

## Change 5: Animate ADD menu (around line 1008-1103)
Wrap the expanded menu with animated div:
```tsx
<div className="flex flex-col-reverse gap-[6px] overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isAddMenuExpanded ? '400px' : '0px', opacity: isAddMenuExpanded ? 1 : 0 }}>
  {/* All menu buttons here */}
</div>
```

## Change 6: Remove location button in camera view when step selected
Around line 1400+, add condition to hide location button when selectedStepIndex >= 0

## Change 7: Add location chip in camera view when step selected
Add after the step bar, a location chip similar to the music chip that shows when a step is selected
