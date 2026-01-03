
import eventBus from "../../utils/eventBus.js";
import { User, Recipe, Notification, NotificationPreference } from './user.model.js'


class UserService {

  constructor() {
    this.eventBus = eventBus;
  }

  async isRecipe(id) {
    const recipe = await Recipe.findById(id);
    return recipe !== null;
  }

  async addToFav({ recipeId, userId }) {

    // check is recipe id is alredy exist in user favs
    let user = await User.findById(userId);

    if (user.favorites.includes(recipeId)) {
      throw new Error("Recipe already added to favorites");
    }

    user.favorites.push(recipeId);
    await user.save();

    // Emit event
    this.userService.eventBus.emit("user.added_to_favorites", {
      recipeId: recipeId,
      userId: userId,
    });

    return user.favorites;

  }

  async getAll() {
    return [];
  }

  async create(data) {
    const newuser = { id: Date.now(), ...data };

    // Emit event
    eventBus.emit("user.created", newuser);

    return newuser;
  }

}

export default new UserService();
