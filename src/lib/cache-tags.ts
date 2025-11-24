export const CACHE_TAGS = {
  usage_details: (userId: string) => `${userId}-usage_details` as const,
  notes: (userId: string) => `${userId}-notes` as const,
  files: (userId: string) => `${userId}-files` as const,
  shares: (userId: string) => `${userId}-shares` as const,
};
