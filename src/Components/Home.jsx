import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/user';

export const Home = () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <section className="home-section">
      <h2>Welcome to salesboard!</h2>
      <p>
        Track your sales numbers in real time so you know how your team are
        performing!
      </p>
      {loggedInUser.username ? undefined : (
        <div className="home-buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </section>
  );
};
