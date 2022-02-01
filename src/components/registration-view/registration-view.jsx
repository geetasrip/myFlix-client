import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://my-movies-app-new.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const APIResponse = response.data;
        props.onLoggedIn(APIResponse);
      })
      .catch(e => {
        console.log("User not found new");
      });
    /* then call props.onLoggedIn(username) */
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    // props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>
          Password:
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formemail">
        <Form.Label>
          Email:
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>
          Birthday:
          <Form.Control
            type="birthday"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Register
      </Button>
      <Link to={`/`}>
        <Button variant="link">Login</Button>
      </Link>
    </Form>
  );
}

RegistrationView.prototype = {
  username: PropTypes.string,
  password: PropTypes.password,
  birthday: PropTypes.string,
  email: PropTypes.email,
  onLoggedIn: PropTypes.func.isRequired
};
