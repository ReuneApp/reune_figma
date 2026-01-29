# Reune (Make File)

This is a code bundle for Reune (Make File). The original project is available at https://www.figma.com/design/xTEbrDUB66AHV7HOE2NB5T/Reune--Make-File-.

## Overview

Reune is a social media platform designed for users to share and discover real-life experiences through curated multi-step routes. With TikTok-style vertical scrolling, interactive map integration, and comprehensive route creation tools, Reune bridges the gap between social sharing and geographic discovery.

## Key Features

### 🗺️ Dual-View System
- **Home Feed**: TikTok-style vertical scrolling feed of routes from friends.
- **Map View**: Interactive map showing all route steps and locations.
- **Seamless Continuity**: Complete bidirectional state sharing between views.
  - Selected routes persist across view switches.
  - Step index maintains position when switching views.
  - Place locations open directly on map from feed.

### 📸 Route Creation
- **Camera Mode**: Capture steps in real-time as you explore.
- **Map Mode**: Build routes by selecting Google Places.
- **Comprehensive Switching**: Full camera ↔ map view switching during route creation.
- **Multi-Photo Support**: Add multiple photos per step for richer storytelling.
- **Smart Privacy**: Routes with stock photos are private-only until users add their own photos.
- **Templates**: Pre-made route templates for quick creation.
- **Drag & Drop**: Reorder route steps with visual feedback.

### 👥 Social Features
- **Friends System**: Centralized state management for friend relationships.
  - Friends list with route counts.
  - Friend requests (incoming and outgoing).
  - View friends' profiles and routes.
- **Notifications**: Real-time notifications for friend requests, likes, and comments.
- **Profile Locations**: Edit and view user locations on map.
- **"View on Map" Button**: Navigate directly from profiles to user locations.

### 🎯 Onboarding
- **Three-Step Flow**:
  1. Invite code entry.
  2. Profile creation (name, username, location).
  3. View preference selection (Posts or Map default).

### 📱 User Experience
- **Minimal Design**: Clean, simplified brand identity.
- **Green Brand Color**: #1ABB6C across all UI elements.
- **Baloo Tamma Font**: Friendly, rounded typography.
- **Responsive**: Optimized for mobile-first experience.
- **Dark Mode Ready**: Full dark mode support.

## Product Rules

### 1. Stock Photo Privacy Rule
Routes created with Google Places stock photos are **private-only** until the user adds their own photos. This encourages authentic user-generated content.

### 2. Multiple Photos Per Step
Each route step can contain multiple photos, allowing users to capture different angles and moments from a single location.

### 3. Friends-Only Feed
The home feed only shows routes from users you're friends with, creating a curated, personal experience.

## Design System

### Colors
- **Primary Green**: #1ABB6C
- **Background**: #FFFFFF (light) / #222222 (dark)
- **Foreground**: #222222 (light) / #FFFFFF (dark)
- **Secondary**: #F7F7F7
- **Border**: #DDDDDD
- **Destructive**: #d4183d

### Typography
- **Font Family**: Baloo Tamma 2
- **Weights**: 400 (normal), 600 (medium), 700, 800
- **Base Size**: 16px

### Spacing & Borders
- **Border Radius**: 0.75rem (12px)
- **Consistent Spacing**: Tailwind spacing scale

## Mock Data

The app includes 12 fixed users with realistic data:
- **6 Friends** (user1-user6): Their routes appear in your feed.
- **2 Incoming Requests** (user7-user8): Sent you friend requests.
- **2 Outgoing Requests** (user9-user10): Awaiting your friend request response.
- **2 No Relationship** (user11-user12): No connection yet.

All users have unique:
- Profile pictures.
- Names and usernames.
- London UK locations.
- Posted and saved routes.
- Bios and interests.

## Tech Stack

### Frontend
- **React** 18+ with TypeScript.
- **Motion** (Framer Motion) for animations.
- **Tailwind CSS v4** for styling.
- **shadcn/ui** component library.
- **Lucide React** for icons.

### Key Libraries
- `react-dnd` - Drag and drop functionality.
- `sonner` - Toast notifications.
- `recharts` - Data visualization.
- `react-slick` - Carousels.
- Various UI components from shadcn/ui.

### Tools
- **Figma** - Design and component imports.
- **Unsplash** - Stock photography.
- **Google Places API** (mock implementation).

## Project Structure

```
/
├── components/           # React components
│   ├── About.tsx
│   ├── AccountInformation.tsx
│   ├── Create.tsx        # Main route creation component
│   ├── EditProfile.tsx
│   ├── FriendsList.tsx
│   ├── HomeFeed.tsx      # Vertical scrolling feed
│   ├── Map.tsx           # Interactive map view
│   ├── Notifications.tsx
│   ├── Search.tsx
│   ├── Settings.tsx
│   ├── ui/               # shadcn/ui components
│   └── ...
├── data/
│   └── mockUsers.ts      # 12 fixed users with routes
├── imports/              # Figma imported components
│   ├── svg-*.ts          # Vector graphics
│   └── *.tsx             # Imported React components
├── styles/
│   └── globals.css       # Global styles and Tailwind config
├── App.tsx               # Main app component
└── README.md
```

## Installation & Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Key Components

### App.tsx
Main application component managing:
- Authentication flow.
- Onboarding steps.
- Screen navigation.
- Global state.
- Friend system.

### HomeFeed.tsx
TikTok-style vertical feed with:
- Snap scrolling between routes.
- Route cards with user info, steps, and interactions.
- Like, comment, save functionality.
- Seamless map view switching.

### Map.tsx
Interactive map view featuring:
- All route steps as markers.
- Selected route highlighting.
- User location markers.
- Place popups with photos.
- Route path visualization.

### Create.tsx
Comprehensive route creation with:
- Camera mode for live capturing.
- Map mode for place selection.
- Template selection.
- Step editing and reordering.
- Cover photo picker.
- Privacy settings.

### FriendsList.tsx
Friends management with:
- Friends list (shows route count).
- Incoming requests.
- Outgoing requests.
- Accept/decline actions.

## Future Enhancements

- [ ] Real backend integration with Supabase.
- [ ] Actual Google Places API integration.
- [ ] Real-time messaging between friends.
- [ ] Route sharing to social media.
- [ ] Advanced search and filtering.
- [ ] Route collections and folders.
- [ ] Collaborative routes.
- [ ] AR route navigation.
- [ ] Route analytics and insights.

## Contributing

This is a Figma Make prototype. For production deployment, consider:
1. Setting up a proper backend (Supabase, Firebase, etc.).
2. Implementing real authentication.
3. Integrating actual map services (Google Maps, Mapbox).
4. Adding proper state management (Redux, Zustand).
5. Implementing data persistence.
6. Adding proper error handling.
7. Setting up CI/CD pipelines.

## License

MIT

## Attributions

- UI Components: [shadcn/ui](https://ui.shadcn.com/) (MIT License).
- Photos: [Unsplash](https://unsplash.com) (Unsplash License).
- Icons: [Lucide Icons](https://lucide.dev).

---

**Built with Figma Make** - Turning designs into functional web applications.
