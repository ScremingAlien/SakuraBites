import { Router } from 'express';
import RecipeController from './recipe.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';
import { IngredientOfSchema, ingredientSchema, queryRecipeSchema, servingSchema, setMetaSchema, StepOfSchema } from './recipe.validator.js'
import authVerifier from '../../middlewares/authVerifier.js';
const router = Router();
const recipeController = new RecipeController();

/*------------------------------------
Recipe api /*
--------------------------------------*/
router.get("/:slug/by-slug", recipeController.getRecipeBySlug); // populate properly
router.get('/demo-recipe', recipeController.getDemoRecipe);

// recipe api for homepage 
router.get('/most-popular', recipeController.most_popular_recipes);
router.get('/most-reviewd', recipeController.most_reviewed_recipes);
router.get('/quick-picks', recipeController.quick_picks);
router.get('/category-highlight', recipeController.category_highlights);

// all category page
router.get('/all-category', recipeController.all_categorys);

//category page
router.get('/category-row', recipeController.category_rows);

// all recipe page
router.get('/all-recipe', recipeController.all_recipes);

// search api
router.get('/search', recipeController.search_suggestions);


/*------------------------------------
Create Recipe api /r-c/*
--------------------------------------*/
// Still need some proper testing and improvement in create recipe apis
router.post("/r-c/metadata", validate(setMetaSchema), authVerifier, recipeController.rc_metadata); // -incp
router.put("/r-c/serving/:slug", validate(servingSchema), authVerifier, recipeController.rc_serving); // -incp
router.put("/r-c/ingredient/:slug", validate(IngredientOfSchema), authVerifier, recipeController.rc_ingredient); // -incp
router.put("/r-c/steps/:slug", validate(StepOfSchema), authVerifier, recipeController.rc_steps); // -incp
router.put("/r-c/category/:slug", validate(), authVerifier, recipeController.rc_category); // -incp


/*------------------------------------
Ingredients api /ingredient/*
--------------------------------------*/
router.get("/ingredient/:slug", validate(queryRecipeSchema), recipeController.getIngredientBySlug); // 100
router.get("/ingredient/usage/:slug", recipeController.getIngredientUsageBySlug); // 20 - incomplete
router.post("/ingredient", authVerifier, validate(ingredientSchema), recipeController.createIngredient); // 100
router.put("/ingredient/:slug", authVerifier, recipeController.updateIngredient); // 0
router.delete("/ingredient/:slug", authVerifier, recipeController.deleteIngredient); // 100



/**
 * how to create recipe
 * 1. title,description,coverImage,videoUrl  should be taken -> create recipe 
 * 2. baseServings,prepTime,cookTime,difficulty   should be taken -> update recipe
 * 3. ingredient page with create ing option and select one by one ingre -> 
 * 4.  take ArrayOf ingId,amount ,unit, note?, isOptional -> update recipe
 * 5. instruction page-> take array of Instru-> step,text,isHeading,image? -> update recipe
 * 4. take category,tag -> update recipe
 * 
 *  
 */



/**
 *  create events,
 *  updateIngedent Usage
 *  when first time recipe is created send notifi, that please complete the recipe
 * 
 */
export default router;
