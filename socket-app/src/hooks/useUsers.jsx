import { useCallback, useEffect, useState } from "react";

const pageSize = 5;

export const useUsers = ({ newUser }) => {
  const [users, setUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalUsers, setTotalUsers] = useState();
  const existUsers = Array.isArray(users) && !!users.length;

  const handleGetUsers = useCallback(({ data, message, error }) => {
    if (error === undefined) {
      console.log(message);
      const { users, totalUsers } = data;
      setUsers(users);
      setTotalUsers(totalUsers);
    } else {
      console.error(error);
    }
  }, []);

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const nextPage = () => {
    if (pageSize * pageNum < totalUsers) {
      setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    if (newUser !== null) {
      setUsers([newUser, ...users]);
      setTotalUsers(totalUsers + 1);
    }
  }, [newUser]);

  return {
    prevPage,
    nextPage,
    handleGetUsers,
    existUsers,
    totalUsers,
    users,
    pageNum,
    pageSize,
  };
};
