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
      <ul className="main-nav-ul">
        <li className="nav-link-li">
          <NavLink className="nav-link" to="/" end>
            Home
          </NavLink>
        </li>
        <li className="nav-link-li">
          <NavLink
            className="nav-link"
            to="sales"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Sales
          </NavLink>
        </li>
        {loggedInUser.username ? (
          <li className="nav-link-li">
            <NavLink
              className="nav-link"
              to="profile"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Profile
            </NavLink>
          </li>
        ) : undefined}
        {loggedInUser.username ? (
          <li className="nav-link-li">
            <NavLink
              className="nav-link"
              to="usersalesboard"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Add Sales
            </NavLink>
          </li>
        ) : undefined}
      </ul>
    </nav>
  );
};
