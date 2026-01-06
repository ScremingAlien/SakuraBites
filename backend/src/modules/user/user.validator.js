
import { z } from 'zod';
const preferenceFields = z.object({
  RECIPE_REVIEW: z.boolean(),
  RECIPE_QUESTION: z.boolean(),
  QUESTION_ANSWERED: z.boolean(),
  NEW_RECIPE_FROM_FOLLOWING: z.boolean(),
  SYSTEM: z.boolean(),
});
export const notifyPrefSchema = z.object({
  body: preferenceFields
    .partial() // Allows sending only the fields the user wants to change
    .strict()  // Rejects the request if extra/unknown keys are sent
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one preference field must be provided for update.",
    }),
});

