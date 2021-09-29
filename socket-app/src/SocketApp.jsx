import { SocketProvider } from "./contexts/socket.jsx";
import { UserCreationForm } from "./components/UserCreationForm";
import { UserList } from "./components/UserList";
import { useState } from "react";

export const SocketApp = () => {
  const [newUser, setNewUser] = useState(null);
  const handleSaveNewUser = (user) => {
    setNewUser(user);
  };

  return (
    <SocketProvider>
      <UserCreationForm handleSaveNewUser={handleSaveNewUser} />
      <hr />
      <UserList newUser={newUser} />
    </SocketProvider>
  );
};
