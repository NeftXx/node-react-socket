const socketIO = require("socket.io");

const messages = {
  server: {
    LOAD_USERS: "server:loadUsers",
    NEW_USER: "server:newUser",
  },

  client: {
    LOAD_USERS: "client:loadUsers",
    NEW_USER: "client:newUser",
  }
};

const createServerSocket = (server, userController, serverOptions = {}) => {
  const io = new socketIO.Server(server, serverOptions);
  io.on("connection", (socket) => {
    console.log("New socket client connected with id", socket.id);

    socket.on(messages.client.NEW_USER, (newUser) => {
      const response = userController.createUser(newUser);
      io.emit(messages.server.NEW_USER, response);
    });

    socket.on(messages.client.LOAD_USERS, (pageSize, pageNum) => {
      const response = userController.getAllUsers(pageSize, pageNum);
      io.emit(messages.server.LOAD_USERS, response);
    });
  });

  return io;
};

module.exports = createServerSocket ;
