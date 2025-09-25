---
sidebar_position: 1

---

# Shared Libraries Documentation

The Walk2gether shared libraries provide common utilities, type definitions, schemas, and API clients that are used across all applications in the ecosystem. This ensures consistency, reduces code duplication, and maintains type safety throughout the platform.

## Overview

The shared library serves as the foundation for:
- **Type Definitions**: Common TypeScript interfaces and types
- **Validation Schemas**: Zod schemas for data validation
- **API Clients**: HTTP clients for backend communication
- **Utility Functions**: Common helper functions
- **Constants**: Shared configuration and constants

## Package Structure

```
walk2gether-shared/
├── src/
│   ├── types/            # TypeScript type definitions
│   ├── schemas/          # Zod validation schemas
│   ├── api/              # API client functions
│   ├── utils/            # Utility functions
│   ├── constants/        # Shared constants
│   └── index.ts          # Main exports
├── lib/                  # Compiled JavaScript
└── package.json          # Package configuration
```

## Core Types

### User Types
```typescript
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: Location;
  preferences: UserPreferences;
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  walkPreferences: WalkPreferences;
}

export interface UserStats {
  totalWalks: number;
  totalDistance: number;
  totalDuration: number;
  streakDays: number;
  level: number;
  achievements: string[];
}
```

### Walk Types
```typescript
export interface Walk {
  id: string;
  title: string;
  description: string;
  organizer: User;
  date: Date;
  location: Location;
  route?: Route;
  difficulty: WalkDifficulty;
  maxParticipants: number;
  participants: Participant[];
  status: WalkStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum WalkStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum WalkDifficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  CHALLENGING = 'challenging'
}
```

### Location Types
```typescript
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface Route {
  waypoints: Location[];
  distance: number; // in meters
  duration: number; // in minutes
  elevationGain?: number; // in meters
}
```

## Validation Schemas

### User Schemas
```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  displayName: z.string().min(1).max(50),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  location: LocationSchema.optional(),
  preferences: UserPreferencesSchema,
  stats: UserStatsSchema,
  createdAt: z.date(),
  updatedAt: z.date()
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  stats: true
}).partial({
  preferences: true
});

export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  createdAt: true
});
```

### Walk Schemas
```typescript
export const WalkSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().max(1000),
  organizer: UserSchema,
  date: z.date().min(new Date()),
  location: LocationSchema,
  route: RouteSchema.optional(),
  difficulty: z.nativeEnum(WalkDifficulty),
  maxParticipants: z.number().min(2).max(100),
  participants: z.array(ParticipantSchema),
  status: z.nativeEnum(WalkStatus),
  tags: z.array(z.string()).max(10),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const CreateWalkSchema = WalkSchema.omit({
  id: true,
  organizer: true,
  participants: true,
  status: true,
  createdAt: true,
  updatedAt: true
});
```

## API Clients

### Base API Client
```typescript
export class ApiClient {
  private baseUrl: string;
  private authToken?: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
      ...options.headers
    };

    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }
    
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
```

### Walks API Client
```typescript
export class WalksApiClient extends ApiClient {
  async getWalks(filters?: WalkFilters): Promise<Walk[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    
    const endpoint = `/api/walks${params.toString() ? `?${params.toString()}` : ''}`;
    return this.get<Walk[]>(endpoint);
  }

  async getWalk(id: string): Promise<Walk> {
    return this.get<Walk>(`/api/walks/${id}`);
  }

  async createWalk(walkData: CreateWalkRequest): Promise<Walk> {
    const validated = CreateWalkSchema.parse(walkData);
    return this.post<Walk>('/api/walks', validated);
  }

  async updateWalk(id: string, updates: UpdateWalkRequest): Promise<Walk> {
    const validated = UpdateWalkSchema.parse(updates);
    return this.put<Walk>(`/api/walks/${id}`, validated);
  }

  async deleteWalk(id: string): Promise<void> {
    return this.delete<void>(`/api/walks/${id}`);
  }

  async joinWalk(id: string): Promise<void> {
    return this.post<void>(`/api/walks/${id}/join`, {});
  }

  async leaveWalk(id: string): Promise<void> {
    return this.delete<void>(`/api/walks/${id}/leave`);
  }
}
```

## Utility Functions

### Date Utilities
```typescript
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
};
```

### Distance Utilities
```typescript
export const calculateDistance = (
  point1: Location,
  point2: Location
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (point1.latitude * Math.PI) / 180;
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};
```

### Validation Utilities
```typescript
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

## Constants

### API Constants
```typescript
export const API_ENDPOINTS = {
  USERS: '/api/users',
  WALKS: '/api/walks',
  SEARCH: '/api/search',
  AUTH: '/api/auth',
  NOTIFICATIONS: '/api/notifications'
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;
```

### Application Constants
```typescript
export const WALK_CONSTANTS = {
  MAX_PARTICIPANTS: 50,
  MIN_PARTICIPANTS: 2,
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 1000,
  SEARCH_RADIUS_KM: 50
} as const;

export const USER_CONSTANTS = {
  MAX_DISPLAY_NAME_LENGTH: 50,
  MAX_BIO_LENGTH: 500,
  MIN_AGE: 13,
  MAX_FRIENDS: 1000
} as const;
```

## Error Handling

### Custom Error Classes
```typescript
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public value: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

## Usage Examples

### In React Native App
```typescript
import { WalksApiClient, Walk } from '@walk2gether/shared';

const api = new WalksApiClient(config.apiUrl);
api.setAuthToken(userToken);

const walks = await api.getWalks({
  location: userLocation,
  radius: 10,
  date: new Date()
});
```

### In Admin Portal
```typescript
import { UserSchema, validateEmail } from '@walk2gether/shared';

const handleUserUpdate = (userData: unknown) => {
  try {
    const user = UserSchema.parse(userData);
    // Process valid user data
  } catch (error) {
    // Handle validation error
  }
};
```

### In Backend Functions
```typescript
import { CreateWalkSchema, Walk } from '@walk2gether/shared';

export const createWalk = async (data: unknown): Promise<Walk> => {
  const walkData = CreateWalkSchema.parse(data);
  // Process walk creation
};
```

## Building and Publishing

### Development
```bash
cd walk2gether-shared
npm run build
npm run test
```

### Publishing
```bash
npm version patch
npm publish
```

## Further Reading

- [Type Definitions Reference](./types)
- [Validation Schemas](./schemas)
- [API Client Usage](./api-clients)
- [Utility Functions](./utilities)
- [Contributing Guide](./contributing)
