
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
    if (!(await this.isRecipe(recipeId))) {
      throw new Error("Recipe not found");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const alreadyFav = user.favorites.some(
      id => id.toString() === recipeId.toString()
    );

    let update;
    let message;
    let event;

    if (alreadyFav) {
      update = { $pull: { favorites: recipeId } };
      message = "Recipe removed from favorites";
      event = "user.removed_from_favorites";
    } else {
      update = { $addToSet: { favorites: recipeId } }; // prevents duplicates
      message = "Recipe added to favorites";
      event = "user.added_to_favorites";
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      { new: true }
    );

    this.eventBus.emit(event, { recipeId, userId });

    return {
      message,
      data: updatedUser.favorites
    };
  }

  async getPref(userId) {
    let notifypref = await NotificationPreference.findOne({ userId: userId }).lean();
    return notifypref;
  }
  async getFav(userId) {
 
    let user = await User.findById(userId).select("favorites").lean();
   
    let data = await User.populate(user, { path: "favorites", select: "title slug coverImage" });
   
    return data.favorites;
  }
  async updatePref({ userId, body }) {
    let notifypref = await NotificationPreference.findByIdAndUpdate(userId, { preferences: { ...body } }, { upsert: true, new: true });
    return notifypref;
  }

}

export default new UserService();
