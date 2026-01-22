
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

export const ingredientSchema = z.object({
  body: z.object(
    {
      name: z
        .string({ required_error: "Name is required" })
        .min(1, "Name cannot be empty"),
      image: z
        .string()
        .url("Image must be a valid URL")
        .optional(),
      description: z
        .string()
        .min(1, "Description cannot be empty")
        .optional(),
      nutrientsPer100g: z.object({
        calories: z.number().optional(),
        protein: z.number().optional(),
        carbs: z.number().optional(),
        fat: z.number().optional(),
      }).optional(),
    },
    {
      required_error: "Request body is required",
      invalid_type_error: "Body must be an object",
    }
  ),
})

export const servingSchema = z.object({
  body: z.object(
    {
      baseServings: z
        .number({ required_error: "Base servings is required" })
        .min(1, "Base servings cannot be less than 1"),
      prepTime: z
        .number({ required_error: "Prep time is required" })
        .min(1, "Prep time cannot be less than 1"),
      cookTime: z
        .number({ required_error: "Cook time is required" })
        .min(1, "Cook time cannot be less than 1"),
      difficulty: z
        .enum(['easy', 'medium', 'hard'], { required_error: "Difficulty is required" })
        .isOptional(),
    },
    {
      required_error: "Request body is required",
      invalid_type_error: "Body must be an object",
    }
  ),
})

export const IngredientOfSchema = z.object({
  body: z.array(
    {
      ingredientId: z.string({ required_error: "Ingredient ID is required" }),
      name: z
        .string({ required_error: "Name is required" })
        .min(1, "Name cannot be empty"),
      amount: z
        .number({ required_error: "Quantity is required" })
        .min(1, "Quantity cannot be less than 1"),
      unit: z
        .string({ required_error: "Unit is required" })
        .min(1, "Unit cannot be empty"),
      note: z
        .string()
        .min(1, "Note cannot be empty")
        .optional(),
      isOptional: z
        .boolean()
        .optional(),
    },
    {
      required_error: "Request body is required",
      invalid_type_error: "Body must be an object",
    }
  ),
})
export const StepOfSchema = z.object({
  body: z.array(
    {

      text: z
        .string({ required_error: "Description is required" })
        .min(1, "Description cannot be empty"),
      step: z
        .number({ required_error: "Step id is required" }),
      image: z
        .string().isOptional(),
      isHeading: z
        .boolean().optional(),
    },
    {
      required_error: "Request body is required",
      invalid_type_error: "Body must be an object",
    }
  ),
})