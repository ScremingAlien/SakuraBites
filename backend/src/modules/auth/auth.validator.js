import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    email: z.string().email() 
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email()
  })
});

export const verifyOtpSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6)
  })
});
 
