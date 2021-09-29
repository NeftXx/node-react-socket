class UserService {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  createUser(user) {
    const createdUser = this._userRepository.create(user);
    return createdUser;
  }

  getAllUsers(pageSize, pageNum) {
    const users = this._userRepository.getAll(pageSize, pageNum);
    return users;
  }
}

module.exports = UserService;
