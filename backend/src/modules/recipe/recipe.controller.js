import RecipeService from "./recipe.service.js";
import { statusCode } from '../../utils/constants/statusCode.js';
import './recipe.event.js'
import { Recipe, Ingredient } from '../user/user.model.js'
import { slugify } from "../../utils/slugify.js";

export default class RecipeController {
  constructor() {
    this.recipeService = RecipeService;
  }



  getRecipeBySlug = async (req, res, next) => {
    try {
      const sl = await Recipe.findOne({ slug: req.params.slug }).lean();
      if (!sl) throw new Error('Recipe not found');
      res.success('Get Recipe By Slug', sl, statusCode.OK);

    } catch (err) {
      next(err)
    }
  }
  getDemoRecipe = async (req, res, next) => {
    try {
      const sl = await Recipe.find().limit(4).select('title slug coverImage authorId difficulty categories ').lean();
      res.success('Get demo recipe', sl, statusCode.OK);

    } catch (err) {
      next(err)
    }
  }

  getIngredientBySlug = async (req, res, next) => {
    try {
      /** 
       * take query => type
       * if type=="recipe" => get recipe by slug
       * if type=="ingredient" => get ingredient by slug (default)
      */
      const type = String(req.query.type || 'ingredient').toUpperCase();
      const slug = req.params.slug;
      let data = null;

      if (type == 'RECIPE') {
        let recipe = await Recipe.findOne({ slug }).lean();
        if (!recipe) throw new Error('Recipe not found');
        data = recipe.ingredients;

        // populate properly lateron
        // data = await Recipe.populate(data, {
        //   path: 'ingredientId',
        //   select: 'name slug description image '
        // })


      } else {
        let ing = await Ingredient.findOne({ slug }).lean();
        if (!ing) throw new Error('Ingredient not found');
        data = ing;
      }

      res.success(`Get ${type} By Slug`, data, statusCode.OK);


    } catch (err) {
      next(err)
    }
  }



  getIngredientUsageBySlug = async (req, res, next) => {
    try {
      /**
       * increse the count of the ingredient
       */

      res.success('Get Ingredient Usage By Slug', null, statusCode.OK);

    } catch (err) {
      next(err)
    }
  }

  createIngredient = async (req, res, next) => {
    try {
      /**
       * @body
       * name, slug?, description?, image?
       */

      // is alredy present with same name? or slug
      let isAlredy = await this.recipeService.INGREDIENT.findOne({ $or: [{ name: req.body.name }, { slug: slugify(req.body.name) }] }).lean();
      if (isAlredy) throw new Error('Ingredient is already exist');

      // create
      let data = {
        name: req.body.name,
        slug: slugify(req.body.name),
        description: req.body.description || "",
        image: req.body.image || "",
      }
      if (req.body.nutrientsPer100g) {
        data.nutrientsPer100g = {
          calories: req.body.nutrientsPer100g.calories || 0,
          fat: req.body.nutrientsPer100g.fat || 0,
          carbs: req.body.nutrientsPer100g.carbs || 0,
          protein: req.body.nutrientsPer100g.protein || 0
        }
      }
      let ing = await this.recipeService.INGREDIENT.create(data);
      this.recipeService.eventBus.emit('ingredient.created', ing);
      res.success('Create Ingredient', ing, statusCode.OK);
    } catch (err) {
      next(err)
    }
  }
  updateIngredient = async (req, res, next) => {
    try {
      /**
       * @body
       * name, slug?, description?, image?
       */


    } catch (err) {
      next(err)
    }
  }
  deleteIngredient = async (req, res, next) => {
    try {
      /**
       * @body
       * name, slug?, description?, image?
       */
      let ing = await this.recipeService.INGREDIENT.findOneAndDelete({ slug: req.params.slug });
      if(!ing) throw new Error('Ingredient not found');
      this.recipeService.eventBus.emit('ingredient.deleted', ing);
      res.success('Delete Ingredient', ing, statusCode.OK);

    } catch (err) {
      next(err)
    }
  }

  /*------------------------------------
  Recipe creation controllers
  --------------------------------------*/
  rc_metadata = async (req, res, next) => {
    try {
      /**
       * @body
       * title, description?, coverImage?, videoUrl?
       */

      let d = await this.recipeService.setMetadata(req.body.title, req.body, req.user._id);
      res.success(d.message, d.data, statusCode.OK);

    } catch (err) {
      next(err)
    }
  }
  rc_serving = async (req, res, next) => {
    try {

    } catch (err) {
      next(err)
    }
  }
  rc_ingredient = async (req, res, next) => {
    try {

    } catch (err) {
      next(err)
    }
  }
  rc_steps = async (req, res, next) => {
    try {

    } catch (err) {
      next(err)
    }
  }
  rc_category = async (req, res, next) => {
    try {

    } catch (err) {
      next(err)
    }
  }



}
