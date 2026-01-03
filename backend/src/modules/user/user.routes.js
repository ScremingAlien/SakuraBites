import { Router } from 'express';
import UserController from './user.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';
import authVerifier from '../../middlewares/authVerifier.js';

const router = Router();
const userController = new UserController();
 
router.post('/add-to-favorites/:id', authVerifier, rateLimiter({ max: 10, windowMs: 60 * 60 * 1000 }), validate(followSchema), userController.add_to_favorites); // 100
/**
 * mark fav - non fav - 100
 * profile details update -  sociallinks , avatar, name
 * update prerences
 * get notification preferences
 * get preferences
 * update notification preferences
 * 
 */

export default router;
