import { z } from "zod/v4";

const sub_cateogySchema = z.object({
  name: z.string(),
  description: z.string(),
  category_id: z.int().positive().default(null).nullable(),
  updateDatetime: z.iso.datetime().default(null).nullable(),
});

export function validateSubcategory(input) {
  return sub_cateogySchema.safeParse(input);
}

export function validatePartialSubcategory(input) {
  return sub_cateogySchema.partial().safeParse(input);
}
