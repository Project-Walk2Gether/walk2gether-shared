# Participant Factory Function

## Overview

Created a centralized `participantFromUser()` factory function to ensure consistent participant creation across the Walk2Gether codebase.

## Location

`walk2gether-shared/src/factories/participant.ts`

## Usage

```typescript
import { participantFromUser } from 'walk2gether-shared';

const participant = {
  ...participantFromUser({
    user: { ...userData, id: userId },
    sourceType: "walk-creator",
    status: "pending",
    acceptedAt: null,
    navigationMethod: "walking",
  }),
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};
```

## Parameters

```typescript
interface ParticipantFromUserOptions {
  user: Partial<UserData> & { 
    id: string; 
    name?: string; 
    profilePicUrl?: string; 
    location?: { latitude: number; longitude: number } 
  };
  sourceType: "requested" | "invited" | "walk-creator";
  status?: "pending" | "on-the-way" | "arrived";
  acceptedAt?: any | null; // Can be Timestamp or Date
  navigationMethod?: "driving" | "walking";
}
```

## What It Does

The factory function:
1. **Extracts relevant user data** (name, photo, timezone, availability, location)
2. **Sets participant-specific fields** (status, sourceType, navigationMethod)
3. **Initializes null/undefined fields** consistently
4. **Converts user location** to participant homeLocation format
5. **Returns a standardized Participant** (minus createdAt/updatedAt)

## Implementations Updated

### 1. Firebase Functions
- `src/triggers/walks/onWalksWrite/addCreatorAsParticipant.ts`
- Used when walk creator is automatically added as a participant

### 2. Expo App
- `utils/participantManagement.ts` - `updateParticipants()` function
- Used when inviting participants to walks

### 3. WalkWizard
- Already uses `updateParticipants()` which now uses the factory

## Benefits

- ✅ **Consistency**: All participants created with same structure
- ✅ **Type Safety**: Centralized type definitions
- ✅ **Maintainability**: Update participant creation logic in one place
- ✅ **No Duplication**: Eliminates repeated participant creation code
- ✅ **Default Values**: Ensures all required fields are set correctly

## Fields Set by Factory

### From User Data:
- `userUid` - User's ID
- `displayName` - User's name or "Anonymous"
- `photoURL` - User's profile picture
- `introduction` - User's introduction text
- `timezone` - User's timezone
- `availability` - User's availability windows
- `homeLocation` - Converted from user.location

### Participant-Specific:
- `status` - Walking status (pending/on-the-way/arrived)
- `sourceType` - How they joined (requested/invited/walk-creator)
- `navigationMethod` - Travel method (walking/driving)
- `acceptedAt` - When they accepted invitation
- `route` - Set to null
- `lastLocation` - Set to undefined

### Initialized to null/undefined:
- `notifiedEstimatedArrivalTime`
- `interestExpressedAt`
- `deniedAt`
- `cancelledAt`
- `statusUpdatedAt`
- `suggestedDepartureTime`
- `suggestedDepartureNotificationSentAt`
- `hiddenAt`
- `chosenLocationIndex`

## Migration Script

Created `scripts/backfill-participants-by-id.ts` to populate `participantsById` field on existing walks.

**Usage:**
```bash
# Dry run on emulator
npm run backfill:participants:emu

# Dry run on production
npm run backfill:participants

# Actually update production
ts-node scripts/backfill-participants-by-id.ts --production --confirm
```

The script:
- Reads participants from subcollections
- Converts to BaseParticipant format
- Populates walk.participantsById object
- Skips walks that already have participantsById

## Next Steps

Consider using this factory in:
- Any new code that creates participants
- Admin tools that manage participants
- Migration scripts that transform participant data
