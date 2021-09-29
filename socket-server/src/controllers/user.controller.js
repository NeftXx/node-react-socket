const { responseSuccess, responseError } = require("../helpers/response");
const messages = require("../helpers/messages");

class UserController {
  constructor(userService) {
    this._userService = userService;
  }

  createUser(user) {
    try {
      if (user === undefined || user === null) {
        throw new Error("The information of the new user cannot be empty.");
      }
      const newUser = this._userService.createUser(user);
      return responseSuccess(messages.SUCCESS_CREATE_USER, newUser);
    } catch (error) {
      console.error(error);
      return responseError(messages.ERROR_CREATE_USER);
    }
  }

  getAllUsers(pageSize, pageNum) {
    try {
      const users = this._userService.getAllUsers(pageSize, pageNum);
      return responseSuccess(messages.SUCCESS_LOAD_USERS, users);
    } catch (error) {
      console.error(error);
      return responseError(messages.ERROR_LOAD_USERS);
    }
  }
}

module.exports = UserController;
