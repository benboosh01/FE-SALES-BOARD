import { useState, useEffect } from 'react';
import { addUser, getUsers } from '../utils/api';
import { useNavigate } from 'react-router-dom';

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
  const [nameValidation, setNameValidation] = useState(true);
  const nameRegex = /^[A-Za-z]+$/;
  const [usernameTaken, setUsernameTaken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getUsers().then(({ users }) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    let userExistsVar = false;
    let usernameTakenVar = false;
    setDisable(true);
    event.preventDefault();
    const newUser = {
      username: username,
      first_name: firstName,
      surname: surname,
      level: level,
      team: team,
    };
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
    if (!userExists && !userExistsVar && !usernameTaken && !usernameTakenVar) {
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
    }
    setDisable(false);
  };

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
    setUsernameTaken(false);
    setUsername(event.target.value);
    if (usernameRegex.test(event.target.value)) {
      setUsernameValidation(true);
    } else {
      setUsernameValidation(false);
    }
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleTeam = (event) => {
    setTeam(event.target.value);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (isLoading) return <p>loading registration form...</p>;
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
        />
      </label>
      {usernameValidation ? null : (
        <p>Username must only contain letter and numbers</p>
      )}
      {usernameTaken ? <p>Username not available</p> : null}
      <label>
        Level:
        <input type="number" value={level} onChange={handleLevel} required />
      </label>
      <label>
        Team:
        <select value={team} onChange={handleTeam} required>
          <option value="">Select Team</option>
          {users
            .filter((user) => user.level === 2)
            .map((user) => {
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
      <input type="submit" value="Register" disabled={disable} />
      <button onClick={handleLogin}>Login</button>
      {userExists ? <p>User already registered - please login</p> : null}
    </form>
  );
};
