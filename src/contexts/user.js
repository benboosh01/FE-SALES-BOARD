import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.loggedInUser)
  );
  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
