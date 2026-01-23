import eventBus from "../../../utils/eventBus.js";
import { Ingredient, Recipe } from "../../user/user.model.js";
class RecipeHomepageService {

     constructor() {
          this.eventBus = eventBus;
     }

     // homepage
     async getMostPopularRecipes(limit = 10) {
          return Recipe.find(
               { isDeleted: false },
               {
                    title: 1,
                    slug: 1,
                    coverImage: 1,
                    stats: 1,
                    prepTime: 1,
                    difficulty: 1
               }
          )
               .sort({
                    'stats.favoriteCount': -1,
                    'stats.reviewCount': -1
               })
               .limit(limit)
               .lean()
     }
     async getMostReviewedRecipes(limit = 10) {
          return Recipe.find(
               {
                    isDeleted: false,
                    'stats.reviewCount': { $gt: 0 }
               },
               {
                    title: 1,
                    slug: 1,
                    coverImage: 1,
                    stats: 1
               }
          )
               .sort({ 'stats.reviewCount': -1 })
               .limit(limit)
               .lean()
     }
     async getQuickPicks(maxPrepTime = 30, limit = 8) {
          return Recipe.find(
               {
                    isDeleted: false,
                    prepTime: { $lte: maxPrepTime }
               },
               {
                    title: 1,
                    slug: 1,
                    coverImage: 1,
                    prepTime: 1,
                    stats: 1,
                    difficulty: 1
               }
          )
               .sort({
                    "stats.favoriteCount": -1,
                    "stats.reviewCount": -1
               })
               .limit(limit)
               .lean();
     }
     async getCategoryHighlights(limit = 6) {
          return Recipe.aggregate([
               {
                    $match: { isDeleted: false }
               },
               {
                    $unwind: "$categories"
               },
               {
                    $group: {
                         _id: "$categories",
                         recipeCount: { $sum: 1 }
                    }
               },
               {
                    $sort: { recipeCount: -1 }
               },
               {
                    $limit: limit
               },
               {
                    $project: {
                         _id: 0,
                         name: "$_id",
                         recipeCount: 1,
                         description: {
                              $concat: [
                                   "Explore ",
                                   { $toString: "$recipeCount" },
                                   " recipes"
                              ]
                         }
                    }
               }
          ]);
     }
     
     // category page
     async getCategoryRow(category, limit = 8) {
          return Recipe.find(
               {
                    isDeleted: false,
                    categories: category
               },
               {
                    title: 1,
                    slug: 1,
                    coverImage: 1,
                    prepTime: 1,
                    difficulty: 1,
                    stats: 1
               }
          )
               .sort({ "stats.favoriteCount": -1 })
               .limit(limit)
               .lean();
     }

     // all recipe page
     async getAllRecipes({
          page = 1,
          limit = 12,
          category,
          difficulty,
          search
     }) {
          const skip = (page - 1) * limit

          const query = {
               isDeleted: false
          }

          if (category) query.categories = category
          if (difficulty) query.difficulty = difficulty

          if (search) {
               query.$text = { $search: search }
          }

          const [recipes, total] = await Promise.all([
               Recipe.find(query, {
                    title: 1,
                    slug: 1,
                    coverImage: 1,
                    prepTime: 1,
                    cookTime: 1,
                    difficulty: 1,
                    stats: 1
               })
                    .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),

               Recipe.countDocuments(query)
          ])

          return {
               data: recipes,
               pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
               }
          }
     }

     // all categories page
     async getAvailableCategories() {
          return Recipe.aggregate([
               {
                    $match: {
                         isDeleted: false
                    }
               },
               {
                    $unwind: "$categories"
               },
               {
                    $group: {
                         _id: "$categories",
                         recipeCount: { $sum: 1 },
                         avgPrepTime: { $avg: "$prepTime" }
                    }
               },
               {
                    $project: {
                         _id: 0,
                         name: "$_id",
                         recipeCount: 1,
                         avgPrepTime: { $round: ["$avgPrepTime", 0] },
                         description: {
                              $concat: [
                                   "Explore ",
                                   { $toString: "$recipeCount" },
                                   " recipes under ",
                                   "$_id"
                              ]
                         }
                    }
               },
               {
                    $sort: {
                         recipeCount: -1
                    }
               }
          ]);
     }

     // search api
     async getSearchSuggestions(query, limit = 5) {
          if (!query || query.length < 2) return null;

          const regex = new RegExp(`^${query}`, "i");

          const [recipes, ingredients, categories] = await Promise.all([
               Recipe.find(
                    {
                         isDeleted: false,
                         title: regex
                    },
                    { title: 1, slug: 1 }
               ).limit(limit).lean(),

               Ingredient.find(
                    { name: regex },
                    { name: 1, slug: 1 }
               ).limit(limit).lean(),

               Recipe.distinct("categories", {
                    categories: regex,
                    isDeleted: false
               })
          ]);

          return {
               recipes,
               ingredients,
               categories: categories.slice(0, limit)
          };
     }
     

}

export default new RecipeHomepageService();
