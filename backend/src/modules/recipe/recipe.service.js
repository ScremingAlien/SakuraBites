
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

  async setMetadata(title, body, userId) {
    try {
      /**
       * if recipe exist then error othervise create
       */
      let data = {
        message: "",
        data: null
      }

      let isRecipe = await Recipe.findOne({ $or: [{ title: title }, { slug: slugify(title) }] }).lean();
      if (isRecipe) throw new Error("Recipe is already exist");

      let recipe = await Recipe.create({
        authorId: userId,
        slug: slugify(title),
        title: String(title),
        coverImage: String(body.coverImage || null),
        description: String(body.description || null),
        videoUrl: String(body.videoUrl || null),
      });

      data.message = "Recipe created successfully";
      data.data = recipe;
      eventBus.emit("recipe.created.setmetadata", data.data);
      return data;

    } catch (error) {
      throw new Error(error);
    }
  }


  async create(data) {
    const newrecipe = { id: Date.now(), ...data };

    // Emit event
    eventBus.emit("recipe.created", newrecipe);

    return newrecipe;
  }

}

export default new RecipeService();
