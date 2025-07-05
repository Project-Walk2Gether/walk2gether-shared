/**
 * Predefined colors for walk rounds
 * These colors are designed to be visually distinct and accessible
 */
export const WALK_PAIR_COLORS = [
  // Blues
  "#4BB4E6", // Light blue (matches the app's primary blue)
  "#0078D7", // Microsoft blue
  "#1E88E5", // Material blue
  "#4285F4", // Google blue
  
  // Greens
  "#34A853", // Google green
  "#2E7D32", // Material dark green
  "#00C853", // Material light green
  "#7CB342", // Lime green
  
  // Reds/Pinks
  "#EA4335", // Google red
  "#E53935", // Material red
  "#FF5252", // Material accent red
  "#FF4081", // Material pink
  
  // Oranges/Yellows
  "#FBBC05", // Google yellow
  "#FF9800", // Material orange
  "#FFB300", // Material amber
  "#FFC107", // Material yellow
  
  // Purples
  "#673AB7", // Material deep purple
  "#9C27B0", // Material purple
  "#AA00FF", // Material accent purple
  "#7B1FA2", // Material dark purple
  
  // Other colors
  "#00BCD4", // Material cyan
  "#009688", // Material teal
  "#795548", // Material brown
  "#607D8B", // Material blue grey
];

/**
 * Get a color for a pair based on its index
 * @param index - The index of the pair
 * @returns A color from the predefined list
 */
export function getPairColor(index: number): string {
  return WALK_PAIR_COLORS[index % WALK_PAIR_COLORS.length];
}
