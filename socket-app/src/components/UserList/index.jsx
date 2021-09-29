import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSocket } from "../../contexts/socket.jsx";
import { useUsers } from "../../hooks/useUsers.jsx";

import "./styles.css";

export const UserList = ({ newUser }) => {
  const { socket, messages } = useSocket();
  const {
    prevPage,
    nextPage,
    handleGetUsers,
    existUsers,
    totalUsers,
    users,
    pageNum,
    pageSize
  } = useUsers({ newUser });

  useEffect(() => {
    socket.emit(messages.client.LOAD_USERS, pageSize, pageNum);
  }, [pageNum]);

  useEffect(() => {
    socket.on(messages.server.LOAD_USERS, handleGetUsers);

    return () => {
      socket.off(messages.server.LOAD_USERS, handleGetUsers);
    };
  }, []);

  if (existUsers) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={prevPage}>Prev</button>
        <span>
          {pageSize * (pageNum - 1) + users.length} users out of {totalUsers}
        </span>
        <button onClick={nextPage}>Next</button>
      </>
    );
  }

  return <h2>No registered users</h2>;
};

UserList.propTypes = {
  newUser: PropTypes.object,
};

UserList.defaultProps = {
  newUser: null,
};