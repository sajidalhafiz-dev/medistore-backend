export const Resource = {
  USER: "user",
  MEDICINE: "medicine",
  CATEGORY: "category",
  ORDER: "order",
  ORDER_ITEM: "orderItem",
  REVIEW: "review"
} as const;

export type ResourceType = (typeof Resource)[keyof typeof Resource];