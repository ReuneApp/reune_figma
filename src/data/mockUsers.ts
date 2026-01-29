// Mock user database - each user has unique data
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  location: string;
  bio?: string;
  postedRoutes?: string[]; // Array of route IDs this user posted
  savedRoutes?: string[]; // Array of route IDs this user saved
}

// Array of genuine names for randomizing the auth user's name
const genuineNames = ['ALEX', 'JORDAN', 'TAYLOR', 'CASEY', 'MORGAN', 'RILEY', 'AVERY', 'PARKER', 'QUINN', 'REESE'];
const randomAuthName = genuineNames[Math.floor(Math.random() * genuineNames.length)];

export const mockUsers: Record<string, User> = {
  'auth': {
    id: 'auth',
    name: randomAuthName,
    username: randomAuthName.toLowerCase(),
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwcm9maWxlfGVufDF8fHx8MTc2MDQ0NjAyM3ww&ixlib=rb-4.1.0&q=80&w=400',
    location: 'PACIFIC HEIGHTS',
    bio: 'URBAN EXPLORER & COFFEE LOVER',
    postedRoutes: [], // Auth user routes are in userPostedRoutes state
    savedRoutes: []
  },
  // FRIENDS (user1-user6) - Their posts appear in the home feed
  'user1': {
    id: 'user1',
    name: 'MAYA',
    username: 'maya',
    avatar: 'https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Nzc4ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'SOHO',
    bio: 'COFFEE ENTHUSIAST & URBAN EXPLORER',
    postedRoutes: ['1', '2'],
    savedRoutes: ['5']
  },
  'user2': {
    id: 'user2',
    name: 'LUCAS',
    username: 'lucas',
    avatar: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NzgzNjc4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'CHELSEA',
    bio: 'FOODIE & WEEKEND WANDERER',
    postedRoutes: ['3', '4', '5'],
    savedRoutes: ['1']
  },
  'user3': {
    id: 'user3',
    name: 'SOPHIE',
    username: 'sophie',
    avatar: 'https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhlYWRzaG90JTIwY2FzdWFsfGVufDF8fHx8MTc2Nzg3OTExNnww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'HAYES VALLEY',
    bio: 'ART LOVER & BRUNCH EXPERT',
    postedRoutes: ['6', '7'],
    savedRoutes: ['3']
  },
  'user4': {
    id: 'user4',
    name: 'ETHAN',
    username: 'ethan',
    avatar: 'https://images.unsplash.com/photo-1764084051711-45a3b7c84c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBoZWFkc2hvdCUyMGZyaWVuZGx5fGVufDF8fHx8MTc2Nzg3OTExNnww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'SOMA',
    bio: 'TECH & TRAILS',
    postedRoutes: ['8'],
    savedRoutes: ['2', '6']
  },
  'user5': {
    id: 'user5',
    name: 'ARIA',
    username: 'aria',
    avatar: 'https://images.unsplash.com/photo-1731500573044-3551bfa73c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3Njc4NzkxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'CASTRO',
    bio: 'YOGA & VEGAN EATS',
    postedRoutes: ['9', '10'],
    savedRoutes: []
  },
  'user6': {
    id: 'user6',
    name: 'NOAH',
    username: 'noah',
    avatar: 'https://images.unsplash.com/photo-1531299102504-fc718f23c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9maWxlJTIwY2FzdWFsfGVufDF8fHx8MTc2Nzg3OTExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'MARINA',
    bio: 'RUNNER & SUNRISE CHASER',
    postedRoutes: ['11'],
    savedRoutes: ['9']
  },
  // NOT FRIENDS YET (user7-user12) - Their posts do not appear in the home feed
  'user7': {
    id: 'user7',
    name: 'ZARA',
    username: 'zara',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=400',
    location: 'NOB HILL',
    bio: 'PHOTOGRAPHY & HIDDEN GEMS',
    postedRoutes: [],
    savedRoutes: ['11']
  },
  'user8': {
    id: 'user8',
    name: 'FINN',
    username: 'finn',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    location: 'POTRERO HILL',
    bio: 'CYCLIST & BBQ MASTER',
    postedRoutes: [],
    savedRoutes: ['7']
  },
  'user9': {
    id: 'user9',
    name: 'LUNA',
    username: 'luna',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwcm9maWxlfGVufDF8fHx8MTc2MDQ0NjAyM3ww&ixlib=rb-4.1.0&q=80&w=400',
    location: 'RICHMOND',
    bio: 'BEACH WALKS & SUNSET VIEWS',
    postedRoutes: [],
    savedRoutes: []
  },
  'user10': {
    id: 'user10',
    name: 'OLIVER',
    username: 'oliver',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    location: 'SUNSET DISTRICT',
    bio: 'MUSIC & STREET FOOD',
    postedRoutes: [],
    savedRoutes: ['10']
  },
  'user11': {
    id: 'user11',
    name: 'ISLA',
    username: 'isla',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNDAzNjgwMHww&ixlib=rb-4.1.0&q=80&w=400',
    location: 'MISSION DISTRICT',
    bio: 'BOOK LOVER & CAFE HOPPER',
    postedRoutes: [],
    savedRoutes: []
  },
  'user12': {
    id: 'user12',
    name: 'LEO',
    username: 'leo',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQwMzY4MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    location: 'DOWNTOWN',
    bio: 'FITNESS ENTHUSIAST & SMOOTHIE FAN',
    postedRoutes: [],
    savedRoutes: []
  }
};

// Helper function to get user by ID
export function getUserById(userId: string): User | null {
  return mockUsers[userId] || null;
}