
import { Router } from 'express';
import AuthController from './auth.controller.js';
import validate from '../../middlewares/default/validate.js';
import authVerifier from '../../middlewares/authVerifier.js';
import {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
  resetPasswordSchema
} from './auth.validator.js';

const router = Router();
const ctrl = new AuthController();

<<<<<<< HEAD
router.post('/signup', validate(signupSchema), ctrl.signup); // 100
router.post('/login', validate(loginSchema), ctrl.login);  // 100
router.post('/verify-otp', validate(verifyOtpSchema), ctrl.verifyOtp);  // 100
router.get('/me', authVerifier, ctrl.me);   // 100
=======
router.post('/signup', validate(signupSchema), ctrl.signup);
router.post('/login', validate(loginSchema), ctrl.login);
router.post('/verify-otp', validate(verifyOtpSchema), ctrl.verifyOtp);
router.post('/forgot-password', ctrl.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), ctrl.resetPassword);
router.post('/logout', authVerifier, ctrl.logout);
router.get('/me', authVerifier, ctrl.me);
>>>>>>> parent of b32de3e (auth apis complete)

export default router;
