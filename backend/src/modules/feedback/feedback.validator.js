import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().optional()
  })
});

export const createQuestionSchema = z.object({
  body: z.object({
    recipeId: z.string(),
    question: z.string().min(5)
  })
});

export const answerQuestionSchema = z.object({
  body: z.object({
    answer: z.string().min(3)
  })
});
