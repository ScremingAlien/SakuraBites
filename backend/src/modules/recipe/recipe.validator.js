
import { z } from 'zod';
/*
export const createRecipeSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
  }),
});
*/

export const queryRecipeSchema = z.object({
  query: z.object(
    {
      type: z.enum(['RECIPE', 'INGREDIENT']).optional(),
    },
    {
      required_error: 'query is required',
      invalid_type_error: 'query must be an object',
    }
  ),
});
 
export const setMetaSchema = z.object({
  body: z.object(
    {
      title: z
        .string({ required_error: "Title is required" })
        .min(1, "Title cannot be empty"),

      description: z
        .string()
        .min(1, "Description cannot be empty")
        .optional(),

      coverImage: z
        .string()
        .url("Cover image must be a valid URL")
        .optional(),

      videoUrl: z
        .string()
        .url("Video URL must be a valid URL")
        .optional(),
    },
    {
      required_error: "Request body is required",
      invalid_type_error: "Body must be an object",
    }
  ),
});
