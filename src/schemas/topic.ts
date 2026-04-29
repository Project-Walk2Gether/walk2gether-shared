export const TOPICS = [
  { label: "Wellness", icon: "Heart" },
  { label: "Health & Fitness", icon: "Dumbbell" },
  { label: "AI & Technology", icon: "Cpu" },
  { label: "Finance", icon: "Wallet" },
  { label: "Entrepreneurship", icon: "Rocket" },
  { label: "Career & Work", icon: "Briefcase" },
  { label: "Parenting", icon: "HandHeart" },
  { label: "Arts & Culture", icon: "Palette" },
  { label: "Nature & Outdoors", icon: "TreePine" },
  { label: "Social Impact", icon: "Lightbulb" },
  { label: "Spirituality", icon: "Sparkles" },
] as const;

export type Topic = (typeof TOPICS)[number]["label"];

export const TOPIC_LABELS = TOPICS.map((t) => t.label);
