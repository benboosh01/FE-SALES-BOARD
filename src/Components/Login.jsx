import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/user';
import { getUsers } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { setLoggedInUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userFound, setUserFound] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getUsers().then(({ users }) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const user of users) {
      if (user.username === username) {
        setLoggedInUser(user);
        setUserFound(true);
        break;
      } else {
        setUserFound(false);
      }
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  if (isLoading) return <p>loading...</p>;
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" onChange={handleUsername} />
      </label>
      <input type="submit" value="Login" />
      <button onClick={handleRegister}>Register</button>
      {userFound ? null : (
        <div>
          <p>User not found.. please try again or register</p>
        </div>
      )}
    </form>
  );
};
