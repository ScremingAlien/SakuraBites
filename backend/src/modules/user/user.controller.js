import UserService from "./user.service.js";
import { statusCode } from '../../utils/constants/statusCode.js';
import './user.event.js'


export default class UserController {
  constructor() {
    this.userService = UserService;
  }


  add_to_favorites = async (req, res, next) => {
    try {
      /**
       * feature/ if recipe is already added to favorite then remove it
       * feature/ if recipe is not added to favorite then add it
       */

      let d = await this.userService.addToFav({
        recipeId: req.params.id,
        userId: req.user._id,
      });

      res.success(d.message, d.data, statusCode.OK);

    } catch (err) {
      next(err);
    }
  };

  get_favorites = async (req, res, next) => {
    try {
      let d = await this.userService.getFav(req.user._id);
      res.success("Get All Favorites", d, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };


  get_preferences = async (req, res, next) => {
    try {
      let d = await this.userService.getPref(req.user._id);
      res.success("Notification Preferences", d, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  update_preferences = async (req, res, next) => {
    try {
      let d = await this.userService.updatePref({ userId: req.user._id, body: req.body });
      res.success("Updated Notification Preferences", d, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };


}
