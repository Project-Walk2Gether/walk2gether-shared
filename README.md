# WalkMate Shared

This package contains shared types and schemas for the WalkMate application. It's designed to be used by both the walkmate-expo and walkmate-functions projects to ensure type consistency across the codebase.

## Features

- Yup schemas for data validation
- TypeScript types inferred from schemas
- Utility functions for converting between Firebase and regular types

## Installation

From the parent directory, you can link this package to your other projects:

```bash
# Build the shared package
cd walk2gether-shared
npm install
npm run build

# Link from walkmate-expo
cd ../walkmate-expo
npm install ../walk2gether-shared
```

## Usage

### Importing Types

```typescript
import { User, Walk, Pair } from 'walk2gether-shared';

// Use the types in your code
const user: User = {
  id: '123',
  name: 'John Doe',
  age: 'Older',
  location: 'New York',
  email: 'john@example.com'
};
```

### Using Schemas for Validation

```typescript
import { userSchema } from 'walk2gether-shared';

try {
  const validatedUser = await userSchema.validate(userData);
  // userData is valid
} catch (error) {
  // Handle validation error
}
```

### Converting Firebase Types

```typescript
import { fromFirebaseWalk, toFirebaseWalk } from 'walk2gether-shared';

// Convert from Firebase to regular type
const walk = fromFirebaseWalk(firebaseWalkData);

// Convert back to Firebase type
const firebaseWalk = toFirebaseWalk(walk);
```
