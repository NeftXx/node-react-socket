import { io } from "socket.io-client";
import { SERVER_URL } from "./environment.js";

export const messages = {
  server: {
    LOAD_USERS: "server:loadUsers",
    NEW_USER: "server:newUser",
  },

  client: {
    LOAD_USERS: "client:loadUsers",
    NEW_USER: "client:newUser",
  }
};

export const socket = io(SERVER_URL, { transports: ["websocket", "polling"]  });

socket.on("connect", () => {
  console.log(`socket connected: ${socket.connected}`);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", () => {
  console.log(`socket connected: ${socket.connected}`);
});
