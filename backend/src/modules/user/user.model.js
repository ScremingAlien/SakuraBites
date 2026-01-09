import mongoose, { Schema } from 'mongoose'

/**
 * category of food like curry ->  type of curry
 * recipe ke ander which work in sequence so no mess can be created
 * give option of heading so things are manged perfectly
 * ingredient list storing in recipe
 * neutricaent counting etc. like (protien, calories) per recipe
 * page for information of ingredients, their recipes etc.
 * ask question , reviews features
 * more similar like recipes storing for the recipe
 * category like break fast etc. also
 * Dinner Recipes - Fruits, Vegetables and Other Produce- Bread Recipes -Everyday Cooking - Lunch -Recipes Ingredients-  Appetizers and Snacks - Drinks -Breakfast and Brunch Desserts- Main Dishes- Side Dishes -Soups, Stews and Chili - Pasta and Noodles - Salad Recipes
 *  search funcationlity , login (simple setup)
 */

const baseOptions = {
     timestamps: true,
     versionKey: 'v',
     toJSON: { virtuals: true },
     toObject: { virtuals: true },
}

// ---------- User Model ----------
const UserSchema = new Schema({
     email: { type: String, required: true, unique: true, index: true, lowercase: true },
     name: { type: String },
     slug: { type: String, unique: true, index: true },
     avatar: {
          type: String,
          default: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
     },
     preferences: {
          dietary: [{ type: String, index: true }], // vegan, keto, nut-free
          excludedIngredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
          excludedCategories: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
     },
     isVerified: { type: Boolean, default: false },
     otp: String,
     favorites: [{ type: Schema.Types.ObjectId, ref: 'Recipe', index: true }],
     socialLinks: {
          instagram: String,
          website: String
     }
}, baseOptions)

// ---------- Ingredient Library ----------
// Separating the "Concept" of an ingredient from the "Recipe Instance"
const IngredientSchema = new Schema({
     name: { type: String, required: true, unique: true, index: true },
     slug: { type: String, unique: true },
     image: String,
     description: String, // For the ingredient info page -
     nutrientsPer100g: {
          calories: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carbs: { type: Number, default: 0 },
          fat: { type: Number, default: 0 }
     },
     usageCount: { type: Number, default: 0 } // For "Popular Ingredients" sections
}, baseOptions);

// ---------- Recipe ----------
const RecipeIngredientSchema = new Schema({
     ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
     name: String, // Denormalized name for fast display
     amount: { type: Number, required: true }, // Amount for the base servings
     unit: { type: String, required: true },
     note: String, // e.g., "finely chopped"
     isOptional: { type: Boolean, default: false },
     // Formula: (amount / recipe.baseServings) * targetServings
}, { _id: false })

const InstructionSchema = new Schema({
     step: { type: Number, required: true },
     text: { type: String, required: true },
     isHeading: { type: Boolean, default: false },
     image: String,

}, { _id: false })

const RecipeSchema = new Schema({
     title: { type: String, required: true, index: true },
     slug: { type: String, required: true, unique: true, index: true },
     authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
     description: String,
     coverImage: String,
     videoUrl: String,

     // Scaling Logic
     baseServings: { type: Number, default: 4, required: true },
     prepTime: { type: Number, index: true }, // in minutes
     cookTime: { type: Number, index: true }, // in minutes
     difficulty: { type: String, enum: ['easy', 'medium', 'hard'], index: true },

     ingredients: [RecipeIngredientSchema],
     instructions: [InstructionSchema],

     // Discovery & Organization
     categories: [{ type: String, index: true }], // ['Dinner', 'Italian']
     tags: [{ type: String, index: true }], // ['Quick', 'High Protein']

     relatedRecipeIds: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
     // Total nutrients (Calculated on save based on ingredients)
     totalNutrients: {
          calories: Number,
          protein: Number,
          carbs: Number,
          fat: Number
     },
     // Analytics/Social
     stats: {
          avgRating: { type: Number, default: 0, index: true },
          reviewCount: { type: Number, default: 0 },
          favoriteCount: { type: Number, default: 0 }
     },

     dataComplete: [
          {
               initiated: { type: Boolean, default: false },
               scaling: { type: Boolean, default: false },
               ingredients: { type: Boolean, default: false },
               instructions: { type: Boolean, default: false },
               finialized: { type: Boolean, default: false }
          }
     ],

     isDeleted: { type: Boolean, default: false, index: true }
}, baseOptions)

// Compound index for sophisticated filtering
RecipeSchema.index({ cuisine: 1, difficulty: 1, prepTime: 1 })
RecipeSchema.index({ title: 'text', description: 'text', tags: 'text' })

// ---------- Meal Plan ----------
const MealPlanItemSchema = new Schema({
     recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
     servings: { type: Number, required: true },
     mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
     isCompleted: { type: Boolean, default: false }
}, { _id: false })

const MealPlanSchema = new Schema({
     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
     date: { type: Date, required: true, index: true },
     meals: [MealPlanItemSchema],

     // Cached Grocery List for this specific plan
     groceryList: [{
          ingredientName: String,
          amount: Number,
          unit: String,
          isBought: { type: Boolean, default: false }
     }]
}, baseOptions)

// ---------- Recipe Notes & Reviews ----------
const ReviewSchema = new Schema({
     recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true, index: true },
     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
     rating: { type: Number, required: true },
     comment: String,
}, baseOptions)

ReviewSchema.index({ recipeId: 1, createdAt: -1 })

// ---------- Recommendation Events ----------
const InteractionSchema = new Schema({
     userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
     recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', index: true },
     action: { type: String, enum: ['view', 'click', 'share', 'cook_start', 'cook_complete'] },
     duration: Number, // how long they stayed on the page
     timestamp: { type: Date, default: Date.now }
}, { timestamps: false })


const QuestionSchema = new Schema({
     recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true, index: true },
     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
     question: { type: String, required: true },
     answer: {
          text: String,
          answeredBy: { type: Schema.Types.ObjectId, ref: 'User' },
          answeredAt: Date
     },
     upvotes: { type: Number, default: 0 }
}, baseOptions);

const NotificationSchema = new Schema({
     userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          index: true
     },

     // Who triggered this notification (nullable for system)
     from: String,
     type: {
          type: String,
          required: true,
          enum: [
               'RECIPE_REVIEW',
               'RECIPE_QUESTION',
               'QUESTION_ANSWERED',
               'NEW_RECIPE_FROM_FOLLOWING',
               'SYSTEM'
          ],
          index: true
     },

     // Lightweight message for in-app display
     title: String,
     message: String,

     // Status
     isRead: {
          type: Boolean,
          default: false,
          index: true
     },

     readAt: Date,


}, baseOptions)

NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 })
NotificationSchema.index({ userId: 1, createdAt: -1 })

const NotificationPreferenceSchema = new Schema({
     userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          unique: true,
          index: true
     },

     preferences: {
          RECIPE_REVIEW: {
               type: Boolean,
               default: true
          },
          RECIPE_REVIEW: {
               type: Boolean,
               default: true
          },
          RECIPE_QUESTION: {
               type: Boolean,
               default: true
          },
          QUESTION_ANSWERED: {
               type: Boolean,
               default: true
          },
          NEW_RECIPE_FROM_FOLLOWING: {
               type: Boolean,
               default: true
          },
          SYSTEM: {
               type: Boolean,
               default: true
          }
     }

}, baseOptions)

// ---------- Exports ----------
export const Notification = mongoose.model('Notification', NotificationSchema)
export const NotificationPreference = mongoose.model('NotificationPreference', NotificationPreferenceSchema)
export const User = mongoose.model('User', UserSchema)
export const Recipe = mongoose.model('Recipe', RecipeSchema)
export const Ingredient = mongoose.model('Ingredient', IngredientSchema)
export const MealPlan = mongoose.model('MealPlan', MealPlanSchema)
export const Review = mongoose.model('Review', ReviewSchema)
export const Interaction = mongoose.model('Interaction', InteractionSchema)// Define your user models here
export const Question = mongoose.model('Question', QuestionSchema);
