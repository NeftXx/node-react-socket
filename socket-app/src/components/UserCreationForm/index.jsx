import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../contexts/socket.jsx";

const userDataInit = {
  firstName: "",
  lastName: "",
  email: "",
};

export const UserCreationForm = ({ handleSaveNewUser }) => {
  const { socket, messages } = useSocket();
  const [userData, setUserData] = useState(userDataInit);

  const handleChange = ({ target }) => {
    const value = target.value;
    setUserData({
      ...userData,
      [target.name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    socket.emit(messages.client.NEW_USER, userData);
    setUserData(userDataInit);
  };

  const handleNewUser = useCallback(({ message, error, data }) => {
    if (error === undefined) {
      console.log(message);
      handleSaveNewUser(data);
    } else {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    socket.on(messages.server.NEW_USER, handleNewUser);

    return () => {
      socket.off(messages.server.NEW_USER, handleNewUser);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={userData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={userData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

UserCreationForm.propTypes = {
  handleSaveNewUser: PropTypes.func.isRequired,
};
