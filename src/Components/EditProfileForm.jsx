import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/user';
import { getUsers, updateUser } from '../utils/api';

export const EditProfileForm = ({ handleEditProfile }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState(loggedInUser.username);
  const [firstName, setFirstName] = useState(loggedInUser.first_name);
  const [surname, setSurname] = useState(loggedInUser.surname);
  const [level, setLevel] = useState(loggedInUser.level);
  const [team, setTeam] = useState(loggedInUser.team);
  const [usernameValidation, setUsernameValidation] = useState(true);
  const usernameRegex = /^[A-Za-z0-9]+$/;
  const [nameValidation, setNameValidation] = useState(true);
  const nameRegex = /^[A-Za-z]+$/;
  const [disable, setDisable] = useState(false);
  const [formValidation, setFormValidation] = useState(true);
  const [levelTeam, setLevelTeam] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then(({ users }) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
    if (nameRegex.test(event.target.value)) {
      setNameValidation(true);
    } else {
      setNameValidation(false);
    }
  };

  const handleSurname = (event) => {
    setSurname(event.target.value);
    if (nameRegex.test(event.target.value)) {
      setNameValidation(true);
    } else {
      setNameValidation(false);
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
    if (usernameRegex.test(event.target.value)) {
      setUsernameValidation(true);
    } else {
      setUsernameValidation(false);
    }
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
    setLevelTeam(
      users.filter((user) => user.level === parseInt(event.target.value) + 1)
    );
  };

  const handleTeam = (event) => {
    setTeam(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisable(true);
    if (usernameValidation && nameValidation) {
      const userUpdate = {
        username: username,
        first_name: firstName,
        surname: surname,
        level: level,
        team: team,
      };
      updateUser(userUpdate);
      handleEditProfile();
      setLoggedInUser(userUpdate);
    } else {
      setFormValidation(false);
    }
    setDisable(false);
  };

  if (isLoading) return <p>loading update EditProfileForm form...</p>;
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={handleFirstName}
          required
        />
      </label>
      <label>
        Surname:
        <input type="text" value={surname} onChange={handleSurname} required />
      </label>
      {nameValidation ? null : <p>Names must only contain letters</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={handleUsername}
          required
          disabled
        />
      </label>
      {usernameValidation ? null : (
        <p>Username must only contain letter and numbers</p>
      )}
      <label>
        Level:
        <select value={level} onChange={handleLevel} required>
          <option value="">Select Level</option>
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
        </select>
      </label>

      <label>
        Team:
        <select value={team} onChange={handleTeam} required>
          <option value="">Select Team</option>
          {levelTeam.map((user) => {
            return (
              <option
                key={user.username}
                value={user.first_name + ' ' + user.surname}
              >
                {user.first_name + ' ' + user.surname}
              </option>
            );
          })}
        </select>
      </label>

      {formValidation ? undefined : <p>Please fix issues and re-submit</p>}
      <input type="submit" value="Confirm" disabled={disable} />
    </form>
  );
};
