import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { socket, messages } from "../config/socket.js";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const value = { socket, messages };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
