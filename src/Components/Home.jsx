import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <section>
      <h2>Welcome to salesboard!</h2>
      <p>
        Track your sales numbers in real time so you know how your team are
        performing!
      </p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </section>
  );
};
