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
router.get('/review/revie-by-user', authVerifier, feedbackController.getReviewByUser); // 100
router.get('/review/:id/by-recipe', authVerifier, feedbackController.getReviewByRecipe); // 100
router.post('/review/:id', authVerifier, validate(createReviewSchema), feedbackController.createReview); // 100
router.delete('/review/:id', authVerifier, feedbackController.deleteReview); // 100
 

/*------------------------------------
Question  /question   apis
--------------------------------------*/
router.get('/questions/:id/by-recipe', authVerifier, feedbackController.getQuestionsByRecipe); // 100
router.get('/questions/que-by-user', authVerifier, feedbackController.getQuestionAskedByUser); // 100
router.get('/questions/ans-by-user', authVerifier, feedbackController.getAnsweredByUser); // 100
router.post('/question', authVerifier, validate(createQuestionSchema), feedbackController.createQuestion); //100
router.post('/question/:id/answer', authVerifier, validate(answerQuestionSchema), feedbackController.answerQuestion); // 100
router.post('/question/:id/upvote', authVerifier, feedbackController.upvoteQuestion); // 100
router.delete('/question/:id', authVerifier, feedbackController.deleteQuestion); // 100


/*------------------------------------
Notification  /notify  apis
--------------------------------------*/
router.post('/notify/:id/mark-read', authVerifier, feedbackController.markRead); // 100
router.get("/notify/unread", authVerifier, feedbackController.getUnread); // 100

export default router;
