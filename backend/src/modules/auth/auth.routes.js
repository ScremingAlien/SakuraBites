
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

router.post('/signup', validate(signupSchema), ctrl.signup); // 100
router.post('/login', validate(loginSchema), ctrl.login);  // 100
router.post('/verify-otp', validate(verifyOtpSchema), ctrl.verifyOtp);  // 100
router.get('/me', authVerifier, ctrl.me);   // 100

export default router;
