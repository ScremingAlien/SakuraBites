
import eventBus from "../../utils/eventBus.js";
import { Recipe, Ingredient, User } from "../user/user.model.js";
import { slugify } from '../../utils/slugify.js'
class RecipeService {

  constructor() {
    this.INGREDIENT = Ingredient;
    this.eventBus = eventBus;
  }
  async isRecipebySlug(slug) {
    try {
      let isRecipe = await Recipe.findOne({ slug: slug }).lean();
      return isRecipe !== null;
    } catch (error) {
      throw new Error(error);
    }
  }

  
 
}

export default new RecipeService();
