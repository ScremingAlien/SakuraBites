
import eventBus from "../../utils/eventBus.js";
import { User, Recipe, Notification, NotificationPreference } from './user.model.js'


class UserService {

  constructor() {
    this.User = User;
    this.Recipe = Recipe;
    this.eventBus = eventBus;
  }

  async isRecipe(id) {
    const recipe = await Recipe.findById(id);
    return recipe !== null;
  }

  async addToFav({ recipeId, userId }) {

    let data = {
      message: "",
      data: {}
    }

    if (!(await this.isRecipe(recipeId))) {
      throw new Error("Recipe not found");
    }

    // check is recipe id is alredy exist in user favs
    let user = await User.findById(userId);

    if (user.favorites.includes(recipeId)) {
      // recipe is alredy incuded , so delete it
      user.favorites = user.favorites.filter((id) => id !== recipeId);
      await user.save();

      // modify data
      data.message = "Recipe removed from favorites";

      // Emit event
      this.userService.eventBus.emit("user.removed_from_favorites", {
        recipeId: recipeId,
        userId: userId,
      });

    } else {
      data.message = "Recipe added to favorites";
      user.favorites.push(recipeId);
      await user.save();

      // Emit event
      this.userService.eventBus.emit("user.added_to_favorites", {
        recipeId: recipeId,
        userId: userId,
      });
    }

    data.data = user.favorites;

    return data;

  }

  async getFav(userId) {
    let user = await User.findById(userId);
    return user.favorites;
  }
  async updatePref({ userId, body }) {
    let notifypref = await NotificationPreference.findByIdAndUpdate(userId, { preferences: { ...body } }, {  upsert: true, new: true });
    return notifypref;
  }



}

export default new UserService();
