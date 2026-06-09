export const WALK_REMINDERS_CHANNEL_ID = "walk-reminders" as const;
export const WALK_NOTIFICATIONS_CHANNEL_ID = "walk_notifications" as const;

/**
 * Notification category + action identifiers for the "Going / Can't make it"
 * quick-action buttons on walk invitation (and reminder) push notifications.
 *
 * Single source of truth shared by:
 *  - the Expo app, which registers the category via setNotificationCategoryAsync
 *  - the Cloud Functions, which set `categoryId` on the Expo push payload
 *  - the app's action handler, which branches on the action identifiers
 */
export const WALK_INVITE_CATEGORY_ID = "walk-invite-actions" as const;
export const WALK_INVITE_ACTION_GOING = "GOING" as const;
export const WALK_INVITE_ACTION_CANT = "CANT_MAKE_IT" as const;
