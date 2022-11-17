import { useContext } from 'react';
import { UserContext } from '../contexts/user';

export const Profile = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <section>
      <h1>{loggedInUser.username}</h1>
      <p>{loggedInUser.first_name + ' ' + loggedInUser.surname}</p>
      <p>{loggedInUser.team}</p>
    </section>
  );
};
