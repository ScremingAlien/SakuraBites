import FeedbackService from "./feedback.service.js";
import { statusCode } from '../../utils/constants/statusCode.js';
import './feedback.event.js'


export default class FeedbackController {
  constructor() {
    this.FeedbackService = FeedbackService;
  }

  markRead = async (req, res, next) => {
    try {
      await FeedbackService.markNotificationRead({
        notificationId: req.params.id,
        userId: req.user.id
      });
      res.success('Notification marked as read');
    } catch (e) { next(e); }
  };

  createReview = async (req, res, next) => {
    try {
      const data = await FeedbackService.createReview({
        recipeId: req.params.id,
        userId: req.user.id,
        ...req.body
      });

      res.success('Review added', data, statusCode.CREATED);
    } catch (e) { next(e); }
  };

  deleteReview = async (req, res, next) => {
    try {
      await FeedbackService.deleteReview({
        reviewId: req.params.id,
        userId: req.user.id
      });
      res.success('Review deleted');
    } catch (e) { next(e); }
  };

  createQuestion = async (req, res, next) => {
    try {
      const data = await FeedbackService.createQuestion({
        recipeId: req.body.recipeId,
        userId: req.user.id,
        question: req.body.question
      });
      res.success('Question posted', data, statusCode.CREATED);
    } catch (e) { next(e); }
  };

  upvoteQuestion = async (req, res, next) => {
    try {
      await FeedbackService.upvoteQuestion({
        questionId: req.params.id,
        userId: req.user.id
      });
      res.success('Question upvoted');
    } catch (e) { next(e); }
  };

  answerQuestion = async (req, res, next) => {
    try {
      const data = await FeedbackService.answerQuestion({
        questionId: req.params.id,
        userId: req.user.id,
        answer: req.body.answer
      });
      res.success('Question answered', data);
    } catch (e) { next(e); }
  };

  deleteQuestion = async (req, res, next) => {
    try {
      await FeedbackService.deleteQuestion({
        questionId: req.params.id,
        userId: req.user.id
      });
      res.success('Question deleted');
    } catch (e) { next(e); }
  };

}
