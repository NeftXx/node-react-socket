class UserRepository {
  constructor(userModel) {
    this._user = userModel;
  }

  create(user) {
    const createdUser = this._user.insert(user);
    return createdUser;
  }

  getAll(pageSize, pageNum) {
    const users = this._user.getAll(pageSize, pageNum);
    return users;
  }
}

module.exports = UserRepository;
