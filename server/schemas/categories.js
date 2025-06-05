import { z } from "zod/v4";

const categorySchema = z.object({
  name: z.string(),
  description: z.string(),
  updateDatetime: z.iso.datetime().default(null).nullable(),
});

export function validateCategory(input) {
  return categorySchema.safeParse(input);
}

export function validatePartialCategory(input) {
  return categorySchema.partial().safeParse(input);
}
