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
    <div>
      <section className="profile-section">
        <h1>Username: {loggedInUser.username}</h1>
        <p>Name: {loggedInUser.first_name + ' ' + loggedInUser.surname}</p>
        <p>Line Manager: {loggedInUser.team}</p>
        {editProfile ? null : (
          <button className="app-btn" onClick={handleEditProfile}>
            Edit profile
          </button>
        )}
      </section>
      {editProfile ? (
        <EditProfileForm handleEditProfile={handleEditProfile} />
      ) : null}
    </div>
  );
};
