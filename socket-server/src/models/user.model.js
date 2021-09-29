const uuid = require("uuid");
const users = [];

class User {
  insert(data) {
    const id = uuid.v4();
    const user = { id, ...data };
    users.push(user);
    return user;
  }

  getAll(pageSize, pageNum) {
    const _users = pageSize === undefined || pageNum === undefined
      ? users
      : users.slice((pageNum - 1) * pageSize, (pageNum - 1) * pageSize + pageSize);

    const totalUsers = users.length;
    return {
      totalUsers,
      users: _users
    };
  }
}

module.exports = User;
