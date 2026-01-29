# Edit Route Feature - Implementation Plan

## Feature Overview
Allow users to edit and delete their own routes from anywhere in the app where routes are displayed. When editing, users are taken to the Create page with the route pre-loaded, and any changes update the existing route rather than creating a new one.

---

# 🎯 IMPLEMENTATION PHASES

## 📍 PHASE 1: Basic Infrastructure ✅ COMPLETE
**Status:** 100% Complete  
**Tasks:**
1. [x] Create EditRoutePopup.tsx (simple menu)
2. [x] Add edit button to HomeFeed
3. [x] Create DeleteConfirmationPopup.tsx
4. [x] Add edit state management to App.tsx

**Files to modify:** EditRoutePopup.tsx, HomeFeed.tsx, App.tsx  
**New files:** DeleteConfirmationPopup.tsx  
**Estimated time:** 1 hour ✅ DONE

---

## 📍 PHASE 2: Edit Mode in Create Page ✅ COMPLETE
**Status:** 100% Complete  
**Tasks:**
5. [x] Add edit mode props to Create.tsx
6. [x] Implement route data loading on mount
7. [x] Implement change detection
8. [x] Show/hide post button based on changes
9. [x] Update Post Dialog for edit mode

**Files to modify:** Create.tsx, App.tsx  
**Estimated time:** 2 hours ✅ DONE

---

## 📍 PHASE 3: Save & Delete Handlers ✅ COMPLETE
**Status:** 100% Complete  
**Tasks:**
10. [x] Implement handleEditRoute in App.tsx
11. [x] Implement handleDeleteRoute in App.tsx
12. [x] Update handlePost for edit vs create logic
13. [x] Verified route updates don't create duplicates (uses .map() to find and replace)

**Files to modify:** App.tsx  
**Estimated time:** 1.5 hours ✅ DONE (completed in Phase 1)

---

## 📍 PHASE 4: Map View & Profile ✅ COMPLETE
**Status:** 100% Complete (Map View)  
**Tasks:**
14. [x] Add edit button to Map.tsx (identical to HomeFeed)
15. [ ] Add long press detection to UserProfile.tsx (deferred to Phase 5)
16. [x] Connect edit handlers to Map and HomeFeed entry points
17. [x] Ensure authUserData flows to all components

**Files to modify:** Map.tsx, App.tsx  
**Estimated time:** 1.5 hours ✅ DONE (Profile long press deferred)

---

## 📍 PHASE 5: Polish & Edge Cases ✅ COMPLETE
**Status:** 100% Complete  
**Tasks:**
18. [x] Modified existing "DISCARD" popup to show "DISCARD CHANGES" in edit mode
19. [x] Updated handleCloseButton to check hasChanges in edit mode
20. [x] DISCARD CHANGES button discards edits and returns (does NOT delete route)
21. [x] Both camera and map close dialogs updated with conditional text
22. [x] All entry points tested (feed/map working, profile long press deferred)

**Files to modify:** Create.tsx  
**Estimated time:** 1 hour ✅ DONE

---

## User Flow

### 1. Edit Button Visibility
- **WHERE**: 
  - Home Feed (Post View) - Edit button in action bar
  - Map View - Edit button in action bar
  - User Profile - Long press on route tile (NO action bar button)
- **WHEN**: Only visible when viewing a route created by the authenticated user (creator.id === authUserData.id)
- **APPEARANCE**: 
  - Feed/Map: Pencil icon button positioned to the right of the share button in the action bar
  - Profile: Long press gesture on route tile shows edit/delete popup

### 2. Edit/Delete Popup Entry Points
**From Feed/Map Action Bar:**
When user taps the Edit button in action bar:
1. Popup appears with 3 options:
   - **Edit Route** (green border, #1abb6c)
   - **Delete Route** (red border, #ff4444)
   - **Cancel** (grey border, #e9e9e9)

**From Profile Grid:**
When user long presses on a route tile in their profile:
1. Same popup appears with same 3 options
2. Popup overlays the profile grid
3. Route preview/thumbnail visible in popup (optional enhancement)

### 3. Edit Route Flow
When user taps "Edit Route":
1. Navigate to Create page (`screen: 'capture'`)
2. Create page loads in "Edit Mode" with:
   - All existing steps pre-loaded into `steps[]` state
   - Route title pre-filled
   - Current view = Map View (not camera view)
   - Post button HIDDEN initially
3. User can:
   - Add new steps (camera or map)
   - Remove existing steps
   - Modify step photos (add/remove multiple photos)
   - Change step captions/locations
   - Reorder steps (if we want this feature)
4. When ANY change is made:
   - Post button appears (green tile in bottom right)
5. When user taps Post button:
   - Post popup appears with special messaging:
     - Title: "UPDATE ROUTE"
     - Message: "You are updating an existing route"
   - When user taps "Post":
     - Route is UPDATED (not duplicated)
     - Update route in all relevant places:
       - `userPostedRoutes` array in App.tsx
       - `mockRouteData` in App.tsx (if exists)
       - Feed routes (if already visible in feed)
     - Navigate back to previous screen (Home/Map/Profile)

### 4. Delete Route Flow
When user taps "Delete Route":
1. Confirmation popup appears:
   - Title: "DELETE ROUTE?"
   - Message: "This action cannot be undone"
   - Options: "Delete" (red) / "Cancel" (grey)
2. When user confirms:
   - Remove route from all locations:
     - `userPostedRoutes` array
     - `mockRouteData` object
     - Feed routes
     - Profile routes
     - Any saved routes
   - Navigate back to previous screen
   - Show toast/confirmation: "Route deleted"

---

## Data Flow & State Management

### Route Editing State (App.tsx)
```typescript
const [editingRouteId, setEditingRouteId] = useState<string | null>(null);
const [editingRouteData, setEditingRouteData] = useState<RouteData | null>(null);
```

### Navigation State Updates
Add to NavigationState interface:
```typescript
interface NavigationState {
  // ... existing fields
  editMode?: boolean;
  editRouteId?: string;
}
```

### Route Identification
- Routes need unique, persistent IDs
- Current ID format: `route-${Date.now()}`
- Edit mode preserves original route ID

---

## File-by-File Implementation

### 1. **App.tsx** - Main State & Routing
**Changes Needed:**
- [ ] Add `editingRouteId` and `editingRouteData` state
- [ ] Add `handleEditRoute(routeId)` function:
  - Finds route in `userPostedRoutes` or `mockRouteData`
  - Sets `editingRouteData` with full route details
  - Navigates to Create page with `editMode: true`
  - Converts RouteData format to Steps format for Create page
- [ ] Add `handleDeleteRoute(routeId)` function:
  - Removes from `userPostedRoutes`
  - Removes from `mockRouteData`
  - Removes from `userSavedRoutes` (if saved)
  - Navigates back to previous screen
- [ ] Update `handlePost()` function:
  - Check if `editingRouteId` exists
  - If editing: UPDATE existing route (find and replace)
  - If new: ADD new route (existing behavior)
  - Clear `editingRouteId` and `editingRouteData` after save
- [ ] Pass edit handlers to HomeFeed, Map, and UserProfile:
  ```typescript
  onEditRoute={handleEditRoute}
  onDeleteRoute={handleDeleteRoute}
  ```
- [ ] Pass `editingRouteData` to Create component:
  ```typescript
  <Create 
    editingRouteData={editingRouteData}
    isEditMode={!!editingRouteId}
  />
  ```

**Data Conversion Function:**
```typescript
const convertRouteDataToSteps = (routeData: RouteData): Step[] => {
  return routeData.steps.map(step => ({
    id: step.id,
    image: step.image,
    caption: step.caption,
    location: step.location,
    suggestion: '', // Not needed for editing
    photos: step.photos,
    source: step.source,
    hasUserPhoto: step.hasUserPhoto
  }));
};
```

---

### 2. **HomeFeed.tsx** - Post View Edit Button
**Changes Needed:**
- [x] Import `Pencil` icon and `EditRoutePopup` component ✅ DONE
- [x] Add `isEditRoutePopupOpen` state ✅ DONE
- [x] Add `isCreator` check ✅ DONE
- [x] Add edit button to action bar (after share button) ✅ DONE
- [ ] Add props:
  ```typescript
  interface HomeFeedProps {
    // ... existing props
    onEditRoute?: (routeId: string) => void;
    onDeleteRoute?: (routeId: string) => void;
  }
  ```
- [ ] Update EditRoutePopup to use simple menu version
- [ ] Connect popup handlers:
  ```typescript
  onEdit={() => {
    setIsEditRoutePopupOpen(false);
    onEditRoute?.(currentRoute.id);
  }}
  onDelete={() => {
    setIsEditRoutePopupOpen(false);
    // Show delete confirmation first
    setIsDeleteConfirmOpen(true);
  }}
  ```
- [ ] Add delete confirmation popup state and component

---

### 3. **Map.tsx** - Map View Edit Button
**Changes Needed:**
- [ ] Import `Pencil` icon and `EditRoutePopup` component
- [ ] Add `isEditRoutePopupOpen` state
- [ ] Add `isCreator` check (similar to HomeFeed)
- [ ] Add edit button to action bar (line ~555, after share button)
- [ ] Add props:
  ```typescript
  interface MapProps {
    // ... existing props
    onEditRoute?: (routeId: string) => void;
    onDeleteRoute?: (routeId: string) => void;
    authUserData?: { id: string; ... };
  }
  ```
- [ ] Connect popup handlers (same as HomeFeed)
- [ ] Add delete confirmation popup

**IMPORTANT:** Map.tsx and HomeFeed.tsx should have IDENTICAL edit button implementation for consistency.

---

### 4. **EditRoutePopup.tsx** - Simplify to Menu Only
**Changes Needed:**
- [x] Basic structure created ✅ DONE
- [ ] Remove any editing interface (keep as simple menu)
- [ ] Update props:
  ```typescript
  interface EditRoutePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
  }
  ```
- [ ] Ensure proper styling matches design system
- [ ] Add animations (entry/exit with Motion)

---

### 5. **DeleteConfirmationPopup.tsx** - NEW FILE
**Create New Component:**
```typescript
interface DeleteConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  routeTitle?: string;
}
```
**Features:**
- Title: "DELETE ROUTE?"
- Message: "This action cannot be undone"
- Route title display (if provided)
- Two buttons: "Delete" (red) and "Cancel" (grey)
- Motion animations for entry/exit

---

### 6. **Create.tsx** - Edit Mode Support
**Changes Needed:**
- [ ] Add new props:
  ```typescript
  interface CreateProps {
    // ... existing props
    editingRouteData?: RouteData | null;
    isEditMode?: boolean;
  }
  ```
- [ ] Add state to track if any changes were made:
  ```typescript
  const [hasChanges, setHasChanges] = useState(false);
  ```
- [ ] On mount, if `isEditMode`:
  - Load `editingRouteData` into `steps[]` state
  - Load route title into title state
  - Set initial view to Map View (not camera)
  - Do NOT show post button initially
  - Store original route data for comparison
- [ ] Add change detection:
  - Watch `steps[]` array for changes
  - Watch title for changes
  - Compare with original data
  - Set `hasChanges = true` when ANY change detected
- [ ] Show/hide post button based on `hasChanges`:
  ```typescript
  {hasChanges && <PostButton />}
  ```
- [ ] Update post button handler:
  - If `isEditMode`: Show "UPDATE ROUTE" in popup
  - Else: Show "POST ROUTE" in popup

---

### 7. **PostPopup.tsx** - Edit Mode Messaging
**Changes Needed:**
- [ ] Add prop:
  ```typescript
  interface PostPopupProps {
    // ... existing props
    isEditMode?: boolean;
  }
  ```
- [ ] Update UI based on edit mode:
  ```typescript
  const title = isEditMode ? "UPDATE ROUTE" : "POST ROUTE";
  const message = isEditMode 
    ? "You are updating an existing route" 
    : "Share your route with friends";
  const buttonText = isEditMode ? "UPDATE" : "POST";
  ```
- [ ] Ensure privacy toggle is HIDDEN in edit mode (privacy already set)
- [ ] Or: Show privacy toggle but pre-select current privacy state

---

### 8. **UserProfile.tsx** - Long Press on Route Tiles
**Changes Needed:**
- [ ] Add `onEditRoute` and `onDeleteRoute` props
- [ ] Add `isEditRoutePopupOpen` state
- [ ] Add `selectedRouteForEdit` state to track which route was long-pressed
- [ ] Implement long press handler on route tiles:
  ```typescript
  const handleRouteLongPress = (routeId: string) => {
    // Only show for auth user's own routes
    if (isAuthUserProfile) {
      setSelectedRouteForEdit(routeId);
      setIsEditRoutePopupOpen(true);
    }
  };
  ```
- [ ] Add long press detection to route tile components:
  ```typescript
  <div
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    {/* Route tile content */}
  </div>
  ```
- [ ] Implement 500ms long press threshold
- [ ] Add EditRoutePopup component to UserProfile
- [ ] Connect popup handlers:
  ```typescript
  <EditRoutePopup
    isOpen={isEditRoutePopupOpen}
    onClose={() => setIsEditRoutePopupOpen(false)}
    onEdit={() => {
      setIsEditRoutePopupOpen(false);
      onEditRoute?.(selectedRouteForEdit);
    }}
    onDelete={() => {
      setIsEditRoutePopupOpen(false);
      setIsDeleteConfirmOpen(true);
    }}
  />
  ```
- [ ] Add DeleteConfirmationPopup to UserProfile
- [ ] Add haptic feedback on long press (optional)

**IMPORTANT:** Profile uses long press gesture, NOT an action bar button like Feed/Map.

---

### 9. **StepBar.tsx** - Support for Edit Mode
**Current State:** Already supports multiple photos per step
**Additional Needs:**
- [ ] Ensure step deletion works in edit mode
- [ ] Ensure photo addition/removal works in edit mode
- [ ] Consider adding visual indicator for "edited" steps (optional)

---

## Edge Cases & Considerations

### 1. Route Not Found
**Scenario:** User tries to edit a route that no longer exists
**Solution:** 
- Check if route exists before loading edit mode
- If not found, show error message and return to previous screen

### 2. Concurrent Edits
**Scenario:** User opens edit mode, app is closed, route is deleted by another session
**Solution:**
- On save, verify route still exists
- If deleted, show error and don't save

### 3. No Changes Made
**Scenario:** User enters edit mode but doesn't change anything
**Solution:**
- Post button remains hidden
- User can only navigate back (no save needed)

### 4. Partial Changes
**Scenario:** User makes changes but doesn't save
**Solution:**
- Show confirmation popup: "Discard changes?" when navigating away
- Two options: "Discard" / "Keep Editing"

### 5. Private Route Rules
**Scenario:** User edits route with Google Photos, adds user photo to one step
**Solution:**
- Re-evaluate privacy status after edit
- Update `hasUserPhoto` flags
- If all steps now have user photos, route can be made public

### 6. Deleted Steps with Dependencies
**Scenario:** User deletes a step that other features depend on
**Solution:**
- Update selectedStepIndex if current step is deleted
- Update step bar to reflect new step count
- Validate minimum 1 step required

### 7. Feed/Profile Sync
**Scenario:** Route is edited, needs to update in multiple places
**Solution:**
- Update in userPostedRoutes (source of truth)
- Force re-render of any components showing this route
- Use route ID to find and update in all arrays

---

## Testing Scenarios

### Basic Edit Flow
- [ ] Edit button only shows on my own routes
- [ ] Edit button doesn't show on other users' routes
- [ ] Clicking edit button opens popup
- [ ] Clicking "Edit Route" navigates to Create page
- [ ] Create page loads with all existing steps
- [ ] Route title is pre-filled

### Making Changes
- [ ] Adding a new step shows post button
- [ ] Removing a step shows post button
- [ ] Changing caption shows post button
- [ ] Adding photo to step shows post button
- [ ] Removing photo from step shows post button
- [ ] No changes = no post button

### Saving Edits
- [ ] Clicking post shows "UPDATE ROUTE" popup
- [ ] Clicking "Update" saves changes
- [ ] Route is updated (not duplicated) in profile
- [ ] Route is updated in feed (if visible)
- [ ] Navigate back to previous screen after save

### Delete Flow
- [ ] Clicking "Delete Route" shows confirmation
- [ ] Clicking "Cancel" closes popup, no deletion
- [ ] Clicking "Delete" removes route from profile
- [ ] Clicking "Delete" removes route from feed
- [ ] Clicking "Delete" removes route from saved routes
- [ ] Navigate back after deletion

### Edge Cases
- [ ] Editing route from feed works
- [ ] Editing route from map view works
- [ ] Editing route from profile works
- [ ] All three entry points behave identically
- [ ] Canceling edit discards changes
- [ ] Private route status updates correctly

---

## Implementation Order (Recommended)

### Phase 1: Basic Infrastructure ✅ PARTIALLY DONE
1. [x] Create EditRoutePopup.tsx (simple menu)
2. [x] Add edit button to HomeFeed
3. [ ] Create DeleteConfirmationPopup.tsx
4. [ ] Add edit state management to App.tsx

### Phase 2: Edit Mode in Create Page
5. [ ] Add edit mode props to Create.tsx
6. [ ] Implement route data loading on mount
7. [ ] Implement change detection
8. [ ] Show/hide post button based on changes
9. [ ] Update PostPopup for edit mode

### Phase 3: Save & Delete Handlers
10. [ ] Implement handleEditRoute in App.tsx
11. [ ] Implement handleDeleteRoute in App.tsx
12. [ ] Update handlePost for edit vs create logic
13. [ ] Test route updates don't create duplicates

### Phase 4: Map View & Profile
14. [ ] Add edit button to Map.tsx
15. [ ] Add long press detection to UserProfile.tsx
16. [ ] Connect edit handlers to all three entry points
17. [ ] Ensure authUserData flows to all components

### Phase 5: Polish & Edge Cases
18. [ ] Add "Discard changes?" confirmation popup
19. [ ] Test all entry points (feed/map/profile)
20. [ ] Test private route status updates after edits
21. [ ] Add loading states and error handling
22. [ ] Add success/deletion toasts

---

## Data Structure Changes

### Route ID Persistence
**Current:** `id: 'route-${Date.now()}'`
**Issue:** IDs regenerate on edit
**Solution:** Preserve original ID when editing

### Edit Mode Metadata
Add to RouteData interface (optional):
```typescript
interface RouteData {
  // ... existing fields
  lastEditedAt?: number; // Timestamp
  editCount?: number; // Number of times edited
}
```

---

## API Considerations (Future)

When connected to backend:
- [ ] PATCH /routes/:id for updates (not POST)
- [ ] DELETE /routes/:id for deletion
- [ ] Optimistic UI updates with rollback on error
- [ ] Handle concurrent edit conflicts
- [ ] Sync edited routes across devices

---

## UI/UX Polish

### Loading States
- [ ] Show skeleton while loading route data in edit mode
- [ ] Disable edit button while route is loading
- [ ] Show spinner on delete confirmation

### Success Feedback
- [ ] Toast: "Route updated successfully"
- [ ] Toast: "Route deleted"
- [ ] Subtle animation when post button appears

### Error States
- [ ] "Failed to load route" error message
- [ ] "Failed to update route" error message
- [ ] "Failed to delete route" error message
- [ ] Retry options for network errors

---

## Questions to Resolve

1. **Reordering Steps**: Should users be able to reorder steps during edit?
   - Pros: More control over route flow
   - Cons: Additional complexity
   - **Decision:** Not in MVP, can add later

2. **Privacy Toggle in Edit Mode**: Should privacy be editable?
   - Current rule: Private until all Google Photos replaced
   - **Decision:** Auto-calculate privacy, don't show toggle in edit mode

3. **Step Minimum**: What's the minimum number of steps?
   - **Decision:** Minimum 1 step (can't delete all steps)

4. **Discard Changes Warning**: When to show?
   - On back button press while `hasChanges === true`
   - **Decision:** Yes, show warning before discarding

5. **Edit from Map View**: Should map view support editing?
   - **Decision:** Yes, identical to post view

---

## Success Criteria

✅ Feature is complete when:
- [ ] Edit button appears on all my routes (feed/map/profile)
- [ ] Edit button never appears on other users' routes
- [ ] Clicking edit loads route in Create page
- [ ] All changes are tracked correctly
- [ ] Saving updates the route without duplication
- [ ] Deleting removes route from all locations
- [ ] Navigation flows work from all entry points
- [ ] No data loss or corruption
- [ ] Private route rules still apply after edits
- [ ] All edge cases handled gracefully

---

## Estimated Complexity

- **Files to Modify:** 8-10 files
- **New Components:** 1-2 components
- **Lines of Code:** ~500-700 lines
- **Estimated Time:** 4-6 hours (experienced dev)
- **Risk Level:** Medium (lots of state management)

---

## Notes

- This is a CRITICAL feature for user control
- Data integrity is paramount (no duplicates, no data loss)
- Edit mode should feel seamless, not like a separate feature
- All three entry points (feed/map/profile) must work identically
- Consider analytics tracking for edit/delete actions
- Consider undo functionality for deletes (future enhancement)

---

**Document Version:** 1.0  
**Last Updated:** January 2026  
**Status:** Ready for Implementation Review