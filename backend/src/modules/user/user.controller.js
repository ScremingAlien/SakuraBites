import UserService from "./user.service.js";
import { statusCode } from '../../utils/constants/statusCode.js';
import './user.event.js'


export default class UserController {
  constructor() {
    this.userService = UserService;
  }

  
  add_to_favorites = async (req, res, next) => {
    try {
      let isRecipe = await this.userService.isRecipe(req.params.id);
      if (!isRecipe) return res.fail("Recipe not found", statusCode.NOT_FOUND);

      let d = await this.userService.addToFav({
        recipeId: req.params.id,
        userId: req.user.id,
      });

      res.success("Recipe added to favorites", d, statusCode.OK);

    } catch (err) {
      next(err);
    }
  };
 

}
