import { Router } from 'express';
import RecipeController from './recipe.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';
import { queryRecipeSchema, setMetaSchema } from './recipe.validator.js'
import authVerifier from '../../middlewares/authVerifier.js';
const router = Router();
const recipeController = new RecipeController();

/*------------------------------------
Recipe api /*
--------------------------------------*/
router.get("/:slug", recipeController.getRecipeBySlug); // populate properly



/*------------------------------------
Create Recipe api /r-c/*
--------------------------------------*/
router.post("/r-c/metadata", validate(setMetaSchema), authVerifier, recipeController.rc_metadata); // -incp
router.put("/r-c/serving/:slug", validate(), authVerifier, recipeController.getIngredientBySlug); // -incp
router.put("/r-c/ingredient/:slug", validate(), authVerifier, recipeController.getIngredientBySlug); // -incp
router.put("/r-c/steps/:slug", validate(), authVerifier, recipeController.getIngredientBySlug); // -incp
router.put("/r-c/category/:slug", validate(), authVerifier, recipeController.getIngredientBySlug); // -incp


/*------------------------------------
Ingredients api /ingredient/*
--------------------------------------*/
router.get("/ingredient/:slug", validate(queryRecipeSchema), recipeController.getIngredientBySlug); // 100
router.get("/ingredient/usage/:slug", recipeController.getIngredientUsageBySlug); // 20 - incomplete



/**
 * how to create recipe
 * 1. title,description,coverImage,videoUrl  should be taken -> create recipe 
 * 2. baseServings,prepTime,cookTime,difficulty   should be taken -> update recipe
 * 3. ingredient page with create ing option and select one by one ingre -> 
 * 4.  take ArrayOf ingId,amount ,unit, note?, isOptional -> update recipe
 * 5. instruction page-> take array of Instru-> step,text,isHeading,image? -> update recipe
 * 4. take category,tag -> update recipe
 */


/**
 *  create events,
 *  updateIngedent Usage
 *  when first time recipe is created send notifi, that please complete the recipe
 * 
 */
export default router;
