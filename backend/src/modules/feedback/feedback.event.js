import eventBus from "../../utils/eventBus.js";


/**
 * Review events
 */
eventBus.on('review.created', ({ recipeId, userId }) => {
  console.log('⭐ Review created for recipe', recipeId);
  // notify recipe owner
});

eventBus.on('review.deleted', ({ reviewId }) => {
  console.log('🗑️ Review deleted', reviewId);
});

/**
 * Question events
 */
eventBus.on('question.created', ({ recipeId }) => {
  console.log('❓ Question asked on recipe', recipeId);
});

eventBus.on('question.answered', ({ questionId }) => {
  console.log('✅ Question answered', questionId);
});

eventBus.on('question.upvoted', ({ questionId }) => {
  console.log('👍 Question upvoted', questionId);
});

/**
 * Notification events
 */
eventBus.on('notification.read', ({ notificationId }) => {
  console.log('🔔 Notification read', notificationId);
});
