import { useState, useEffect } from 'react';
import { addUser, getOrganisations, getUsers } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Loading } from './Loading';
import axios from 'axios';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [level, setLevel] = useState('');
  const [team, setTeam] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [disable, setDisable] = useState(false);
  const [usernameValidation, setUsernameValidation] = useState(true);
  const usernameRegex = /^[A-Za-z0-9]+$/;
  const [firstNameValidation, setFirstNameValidation] = useState(true);
  const [surnameValidation, setSurnameNameValidation] = useState(true);
  const nameRegex = /^[A-Za-z]+$/;
  const [usernameTaken, setUsernameTaken] = useState(false);
  const navigate = useNavigate();
  const [formValidation, setFormValidation] = useState(true);
  const [levelTeam, setLevelTeam] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrganisation, setSelectedOrganisation] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.all([getUsers(), getOrganisations()]).then(
      axios.spread((...allData) => {
        setUsers(allData[0].users);
        setOrganisations(allData[1].organisations);
        setIsLoading(false);
      })
    );
  }, []);

  const handleSubmit = (event) => {
    let userExistsVar = false;
    let usernameTakenVar = false;
    setDisable(true);
    event.preventDefault();
    if (firstNameValidation && surnameValidation && usernameValidation) {
      const newUser = {
        username: username,
        first_name: firstName,
        surname: surname,
        level: level,
        team: team,
        organisation: selectedOrganisation,
      };
      console.log(newUser);
      for (const user of users) {
        if (
          user.first_name.toUpperCase() === newUser.first_name.toUpperCase() &&
          user.surname.toUpperCase() === newUser.surname.toUpperCase()
        ) {
          setUserExists(true);
          userExistsVar = true;
          break;
        } else {
          setUserExists(false);
          userExistsVar = false;
        }
      }
      for (const user of users) {
        if (user.username.toUpperCase() === newUser.username.toUpperCase()) {
          setUsernameTaken(true);
          usernameTakenVar = true;
          break;
        } else {
          setUsernameTaken(false);
          usernameTakenVar = false;
        }
      }
      if (!userExistsVar && !usernameTakenVar) {
        addUser(newUser)
          .then(({ user }) => {
            setUsers((currUsers) => {
              return [...currUsers, user];
            });
          })
          .then(() => {
            setUsername('');
            setFirstName('');
            setSurname('');
            setLevel('');
            setTeam('');
          });
        setDisable(false);
        alert('user succesfully registered - please login');
        navigate('/login');
      }
    }
  };

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

  const handleUsername = (event) => {
    setUsernameTaken(false);
    setUsername(event.target.value);
    if (usernameRegex.test(event.target.value)) {
      setUsernameValidation(true);
    } else {
      setUsernameValidation(false);
    }
    validateForm();
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
    setLevelTeam(
      users.filter(
        (user) =>
          user.level === parseInt(event.target.value) + 1 &&
          user.organisation === selectedOrganisation
      )
    );
  };

  const handleTeam = (event) => {
    setTeam(event.target.value);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const validateForm = () => {
    if (firstNameValidation && surnameValidation && usernameValidation) {
      setFormValidation(true);
      setDisable(false);
    } else {
      setFormValidation(false);
      setDisable(true);
    }
  };

  const handleOrganisation = (event) => {
    setSelectedOrganisation(event.target.value);
  };

  if (isLoading) return <Loading />;
  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
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
      <input
        id="username"
        type="text"
        value={username}
        onChange={handleUsername}
        placeholder="Enter username..."
        required
      />

      {usernameValidation ? null : (
        <p className="warning">Username must only contain letter and numbers</p>
      )}
      {usernameTaken ? <p className="warning">Username not available</p> : null}
      <label htmlFor="organisation">Organisation:</label>
      <select
        value={selectedOrganisation}
        onChange={handleOrganisation}
        id="organisation"
        required
      >
        <option value="">Select Organisation</option>
        {organisations.map((organisation) => {
          return (
            <option
              key={organisation.organisation_name}
              value={organisation.organisation__name}
            >
              {organisation.organisation_name}
            </option>
          );
        })}
      </select>
      <label htmlFor="level">Level:</label>
      <select value={level} onChange={handleLevel} id="level" required>
        <option value="">Select Level</option>
        <option value={1}>Level 1</option>
        <option value={2}>Level 2</option>
      </select>
      {level && selectedOrganisation ? (
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
      <input type="submit" value="Register" disabled={disable} />
      {userExists ? (
        <p className="warning">User already registered - please login</p>
      ) : null}
      <button type="button" className="login-switch" onClick={handleLogin}>
        Go to login page
      </button>
    </form>
  );
};
