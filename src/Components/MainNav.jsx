import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/user';

export const MainNav = () => {
  const { loggedInUser } = useContext(UserContext);

  const activeStyle = {
    fontWeight: 'bold',
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="sales"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Sales
          </NavLink>
        </li>
        {loggedInUser.username ? (
          <li>
            <NavLink
              to="profile"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Profile
            </NavLink>
          </li>
        ) : undefined}
      </ul>
    </nav>
  );
};
