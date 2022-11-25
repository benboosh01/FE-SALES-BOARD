import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/user';
import { getUsers, updateUser } from '../utils/api';
import { Loading } from './Loading';

export const EditProfileForm = ({ handleEditProfile }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username] = useState(loggedInUser.username);
  const [firstName, setFirstName] = useState(loggedInUser.first_name);
  const [surname, setSurname] = useState(loggedInUser.surname);
  const [level, setLevel] = useState(loggedInUser.level);
  const [team, setTeam] = useState(loggedInUser.team);
  const [firstNameValidation, setFirstNameValidation] = useState(true);
  const [surnameValidation, setSurnameNameValidation] = useState(true);
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
      setFirstNameValidation(true);
    } else {
      setFirstNameValidation(false);
    }
    validateForm();
  };

  const handleSurname = (event) => {
    setSurname(event.target.value);
    if (nameRegex.test(event.target.value)) {
      setSurnameNameValidation(true);
    } else {
      setSurnameNameValidation(false);
    }
    validateForm();
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

  const validateForm = () => {
    if (firstNameValidation && surnameValidation) {
      setFormValidation(true);
      setDisable(false);
    } else {
      setFormValidation(false);
      setDisable(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisable(true);
    if (firstNameValidation && surnameValidation) {
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
      setDisable(false);
    } else {
      setFormValidation(false);
      setDisable(true);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <form onSubmit={handleSubmit} className="register-form">
      <label htmlFor="firstName">First Name:</label>
      <input
        id="firstName"
        type="text"
        value={firstName}
        onChange={handleFirstName}
        placeholder="Enter first name..."
        required
      />
      {firstNameValidation ? null : (
        <p className="warning">! Names must only contain letters</p>
      )}
      <label htmlFor="surname">Surname:</label>
      <input
        id="surname"
        type="text"
        value={surname}
        onChange={handleSurname}
        placeholder="Enter surname..."
        required
      />

      {surnameValidation ? null : (
        <p className="warning">! Names must only contain letters</p>
      )}

      <label htmlFor="username">Username:</label>
      <input id="username" type="text" value={username} required disabled />
      <label htmlFor="level">Level:</label>
      <select value={level} onChange={handleLevel} id="level" required>
        <option value="">Select Level</option>
        <option value={1}>Level 1</option>
        <option value={2}>Level 2</option>
        <option value={3}>Level 3</option>
      </select>

      {level !== loggedInUser.level ? (
        <div>
          <label htmlFor="team">Team:</label>
          <select value={team} onChange={handleTeam} id="team" required>
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
        </div>
      ) : null}

      {formValidation ? undefined : (
        <p className="warning">Please fix issues and re-submit</p>
      )}
      <input type="submit" value="Confirm" disabled={disable} />
    </form>
  );
};
