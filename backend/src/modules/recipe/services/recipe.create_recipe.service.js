import eventBus from "../../../utils/eventBus.js";
import { slugify } from "../../../utils/slugify.js";
import { Recipe, Ingredient, Interaction, User } from "../../user/user.model.js";

class CreateRecipeService {

     constructor() {
          this.INGREDIENT = Ingredient;
          this.eventBus = eventBus;
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
               recipe.dataComplete.initiated = true;
               await recipe.save();

               data.message = "Recipe created successfully";
               data.data = recipe;

               eventBus.emit("recipe.created.setmetadata", data.data);
               return data;

          } catch (error) {
               throw new Error(error);
          }
     }

     async setServing(slug, body) {
          try {
               let data = {
                    message: "",
                    data: null
               }

               let isRecipe = await Recipe.findOne({ slug: slug }).lean();
               if (!isRecipe) throw new Error("Recipe not found");

               let recipe = await Recipe.findOneAndUpdate(
                    { slug: slug },
                    {
                         $set: {
                              serving: body.serving, "dataComplete.initiated": true, "dataComplete.serving": true
                         }
                    }, { new: true });

               data.message = "Serving updated successfully";
               data.data = recipe;
               eventBus.emit("recipe.created.setserving", data.data);
               return data;

          } catch (error) {
               throw new Error(error);
          }
     }

     async setIngredients(slug, body) {
          try {
               let data = {
                    message: "",
                    data: null
               }
               let isRecipe = await Recipe.findOne({ slug: slug }).lean();
               if (!isRecipe) throw new Error("Recipe not found");

               let recipe = await Recipe.findOneAndUpdate({ slug: slug }, {
                    $set: {
                         ingredients: body.ingredients,
                         "dataComplete.ingredients": true
                    }
               }, { new: true });

               data.message = "Ingredients updated successfully";
               data.data = recipe;
               eventBus.emit("recipe.created.setingredients", data.data);
               return data;

          } catch (error) {
               throw new Error(error);
          }
     }

     async setSteps(slug, body) {
          try {
               let data = {
                    message: "",
                    data: null
               }
               let isRecipe = await Recipe.findOne({ slug: slug }).lean();
               if (!isRecipe) throw new Error("Recipe not found");

               let recipe = await Recipe.findOneAndUpdate({ slug: slug }, { $set: { steps: body.steps, "dataComplete.instructions": true } }, { new: true });

               data.message = "Steps updated successfully";
               data.data = recipe;
               eventBus.emit("recipe.created.setsteps", data.data);
               return data;

          } catch (error) {
               throw new Error(error);
          }
     }
}

export default new CreateRecipeService();
