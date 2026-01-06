import { Router } from 'express';
import UserController from './user.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';
import authVerifier from '../../middlewares/authVerifier.js';
import { notifyPrefSchema } from './user.validator.js'
const router = Router();
const userController = new UserController();

router.post('/add-to-favorites/:id', authVerifier, rateLimiter({ max: 10, windowMs: 60 * 60 * 1000 }), userController.add_to_favorites); // 100
router.get('/get-favorites', authVerifier, userController.get_favorites); // 80 -- populate properly

router.get('/notify/preference', authVerifier, userController.get_preferences); //  100
router.put('/notify/preference', authVerifier, validate(notifyPrefSchema), userController.update_preferences); //  100 


/**
 * mark fav - non fav - 100
 * 
 * profile details update -  sociallinks , avatar, name

 * get notification preferences - 100
 * update notification preferences -100
 * 
 */

export default router;
