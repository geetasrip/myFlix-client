import React, { useState } from "react";
import PropTypes from "prop-types";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegister(true, username);
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Birthday:
        <input
          type="birthday"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" onClick={handleSubmit}>
        Register
      </button>
    </form>
  );
}

RegistrationView.prototype = {
  username: PropTypes.string,
  password: PropTypes.password,
  birthday: PropTypes.string,
  email: PropTypes.email,
  onRegister: PropTypes.func.isRequired
};
