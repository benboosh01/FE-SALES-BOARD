import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user';
import { EditProfileForm } from './EditProfileForm';

export const Profile = () => {
  const { loggedInUser } = useContext(UserContext);
  const [editProfile, setEditProfile] = useState(false);

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <section>
      <h1>{loggedInUser.username}</h1>
      <p>{loggedInUser.first_name + ' ' + loggedInUser.surname}</p>
      <p>{loggedInUser.team}</p>
      {editProfile ? (
        <EditProfileForm handleEditProfile={handleEditProfile} />
      ) : (
        <button onClick={handleEditProfile}>Edit profile</button>
      )}
    </section>
  );
};
