import { Router } from 'express';
import FeedbackController from './feedback.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';
import authVerifier from '../../middlewares/authVerifier.js';
import { createReviewSchema, createQuestionSchema, answerQuestionSchema } from './feedback.validator.js';
const router = Router();
const feedbackController = new FeedbackController();



/*------------------------------------
Review  /review   apis
--------------------------------------*/

router.post('/review/:id', authVerifier, validate(createReviewSchema), feedbackController.createReview); // 100
router.delete('/review/:id', authVerifier, feedbackController.deleteReview); // 100
 

/*------------------------------------
Question  /question   apis
--------------------------------------*/
router.post('/question', authVerifier, validate(createQuestionSchema), feedbackController.createQuestion); //100
router.post('/question/:id/answer', authVerifier, validate(answerQuestionSchema), feedbackController.answerQuestion); // 100
router.post('/question/:id/upvote', authVerifier, feedbackController.upvoteQuestion); // 100
router.delete('/question/:id', authVerifier, feedbackController.deleteQuestion); // 100


/*------------------------------------
Notification  /notify  apis
--------------------------------------*/
router.post('/notify/:id/mark-read', authVerifier, feedbackController.markRead); // 100


export default router;
