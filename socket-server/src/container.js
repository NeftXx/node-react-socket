const { UserModel } = require("./models");
const { UserRepository } = require("./repositories");
const { UserService } = require("./services");
const { UserController } = require("./controllers");

const userModel = new UserModel();
const userRepository = new UserRepository(userModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

module.exports = { userController };
