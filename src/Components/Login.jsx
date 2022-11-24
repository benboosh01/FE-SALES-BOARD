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
        setUsername('');
        handleLogin();
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

  const handleLogin = () => {
    navigate('/profile');
  };

  if (isLoading) return <p>loading...</p>;
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        onChange={handleUsername}
        value={username}
        placeholder="Enter username..."
      />
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
