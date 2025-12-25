
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

router.post('/signup', validate(signupSchema), ctrl.signup);
router.post('/login', validate(loginSchema), ctrl.login);
router.post('/verify-otp', validate(verifyOtpSchema), ctrl.verifyOtp);
router.post('/forgot-password', ctrl.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), ctrl.resetPassword);
router.post('/logout', authVerifier, ctrl.logout);
router.get('/me', authVerifier, ctrl.me);

export default router;
