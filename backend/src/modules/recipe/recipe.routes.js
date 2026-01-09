import { Router } from 'express';
import RecipeController from './recipe.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const recipeController = new RecipeController();

router.get('/', recipeController.getAll);
router.post("/", recipeController.create); // <-- new

/**
 * create recipe: - recipeM
 * get specific recipe by slug - recipeM
 * create ingredient - recipeM
 * get ingredients by recipe, by slug - recipeM
 * ingeredientUsage count increment - recipeM
 * 
 */
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
