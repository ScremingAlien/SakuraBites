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
        userId: req.user._id
      });
      res.success('Notification marked as read');
    } catch (e) { next(e); }
  };
  getUnread = async (req, res, next) => {
    try {
      const data = await FeedbackService.unreadNoti({
        userId: req.user._id,
        limit: req.query.limit || null
      })
      res.success('UnRead Notification', data, statusCode.OK);
    } catch (e) { next(e); }
  };

  createReview = async (req, res, next) => {
    try {
      const data = await FeedbackService.createReview({
        recipeId: req.params.id,
        userId: req.user._id,
        ...req.body
      });

      res.success('Review added', data, statusCode.CREATED);
    } catch (e) { next(e); }
  };
  getReviewByUser = async (req, res, next) => {
    try {
      const data = await FeedbackService.getReviewByUser({
        userId: req.user._id,
        limit: req.query.limit || null
      });

      res.success('Review by User', data, statusCode.OK);
    } catch (e) { next(e); }
  };
  getReviewByRecipe = async (req, res, next) => {
    try {
      const data = await FeedbackService.getRevByRecipe({
        recipeId: req.params.id,
        limit: req.query.limit || null  
      });

      res.success('Review on Recipe', data, statusCode.OK);
    } catch (e) { next(e); }
  };

  deleteReview = async (req, res, next) => {
    try {
      await FeedbackService.deleteReview({
        reviewId: req.params.id,
        userId: req.user._id
      });
      res.success('Review deleted');
    } catch (e) { next(e); }
  };

  createQuestion = async (req, res, next) => {
    try {
      const data = await FeedbackService.createQuestion({
        recipeId: req.body.recipeId,
        userId: req.user._id,
        question: req.body.question
      });
      res.success('Question posted', data, statusCode.CREATED);
    } catch (e) { next(e); }
  };

  getQuestionsByRecipe = async (req, res, next) => {
    try {

      const data = await FeedbackService.getRecipeQuestions({
        recipeId: req.params.id,
        limit: req.query.limit || null || 10

      });
      res.success('Question posted', data, statusCode.OK);
    } catch (e) { next(e); }
  };

  upvoteQuestion = async (req, res, next) => {
    try {
      await FeedbackService.upvoteQuestion({
        questionId: req.params.id,
        userId: req.user._id
      });
      res.success('Question upvoted', null, statusCode.CREATED);
    } catch (e) { next(e); }
  };

  answerQuestion = async (req, res, next) => {
    try {
      const data = await FeedbackService.answerQuestion({
        questionId: req.params.id,
        userId: req.user._id,
        answer: req.body.answer
      });
      res.success('Question answered', data, statusCode.CREATED);
    } catch (e) { next(e); }
  };
  getQuestionAskedByUser = async (req, res, next) => {
    try {
      const data = await FeedbackService.questionByUser({
        userId: req.user._id,
        limit: req.query.limit || null
      });
      res.success('Question Asked By User', data, statusCode.OK);
    } catch (e) { next(e); }
  };
  getAnsweredByUser = async (req, res, next) => {
    try {
      const data = await FeedbackService.answeredByUser({
        userId: req.user._id,
        limit: req.query.limit || null
      });

      res.success('Answered By User', data, statusCode.OK);
    } catch (e) { next(e); }
  };

  deleteQuestion = async (req, res, next) => {
    try {
      await FeedbackService.deleteQuestion({
        questionId: req.params.id,
        userId: req.user._id
      });
      res.success('Question deleted', null, statusCode.OK);
    } catch (e) { next(e); }
  };

}
