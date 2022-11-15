import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/user';
import { getUsers } from '../utils/api';

export const Login = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userFound, setUserFound] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then(({ users }) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    users.forEach((user) => {
      if (user.username === username) {
        setLoggedInUser(user);
      } else {
        setUserFound(false);
      }
    });
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  if (isLoading) return <p>loading...</p>;
  return (
    <form onSubmit={handleSubmit}>
      {loggedInUser ? <p>{loggedInUser.username}</p> : null}
      <label>
        Username
        <input type="text" onChange={handleUsername} />
      </label>
      <input type="submit" value="Submit" />
      {userFound && !loggedInUser.username ? null : (
        <p>User not found.. please try again or register</p>
      )}
    </form>
  );
};
