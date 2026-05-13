/**
 * Plain constants used by both server and client careers code. Lives in its
 * own file so client components can import without dragging in the DB.
 */
export const VALID_DEPTS = ["Engineering", "Design", "Product", "Operations"] as const;
export const VALID_TYPES = ["Full-time", "Part-time", "Contract"] as const;
