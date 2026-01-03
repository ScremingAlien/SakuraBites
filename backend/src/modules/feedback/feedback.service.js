
import eventBus from "../../utils/eventBus.js";
import { Notification, User, Review, Question } from '../user/user.model.js'

class FeedbackService {

  constructor() {

    this.eventBus = eventBus;
  }

  async createReview({ recipeId, userId, rating, comment }) {

    let revi = await Review.create({
      recipeId,
      userId,
      rating,
      comment
    })

    eventBus.emit('review.created', revi);
    return revi;
  }

  async deleteReview({ reviewId, userId }) {
    // ownership check here
    let review = await Review.findById(reviewId);
    if (!review) throw new Error('Review not found');

    if (review.userId !== userId) throw new Error('Unauthorized');

    await Review.deleteOne({ _id: reviewId });
    eventBus.emit('review.deleted', { reviewId, userId });
    return true;
  }



  async createQuestion({ recipeId, userId, question }) {

    let que = await Question.create({
      recipeId,
      userId,
      question
    });

    eventBus.emit('question.created', q);
    return q;
  }
  async getRecipeQuestions({ recipeId, userId, limit }) {

    let q = await Question.find({ recipeId: recipeId, userId: userId }).limit(limit).sort({ createdAt: -1 }).lean();
    return q;
  }

  async upvoteQuestion({ questionId, userId }) {
    let que = await Question.findById(questionId);
    if (!que) throw new Error('Question not found');

    // update
    que.upvotes += 1;
    await que.save();

    eventBus.emit('question.upvoted', { questionId, userId });
    return true;
  }

  async answerQuestion({ questionId, userId, answer }) {
    const payload = { questionId, userId, answer };
    let que = await Question.findById(questionId);
    if (!que) throw new Error('Question not found');

    que.answer.text = answer;
    que.answer.answeredBy = userId;
    que.answer.answeredAt = Date.now();
    await que.save();

    eventBus.emit('question.answered', payload);
    return payload;
  }

  async deleteQuestion({ questionId, userId }) {
    // ownership check here
    let question = await Question.findById(questionId);
    if (!question) throw new Error('Question not found');

    if (question.userId !== userId) throw new Error('Unauthorized');

    await Question.deleteOne({ _id: questionId });

    eventBus.emit('question.deleted', { questionId, userId });

    return true;
  }

  async markNotificationRead({ notificationId, userId }) {
    // find and update
    let noti = await Notification.findById(notificationId);
    if (!noti) throw new Error('Notification not found');

    noti.isRead = true;
    noti.readAt = Date.now();
    await noti.save();

    eventBus.emit('notification.read', { notificationId, userId });
    return true;
  }
}

export default new FeedbackService();
