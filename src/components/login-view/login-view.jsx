import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios
      .post("https://my-movies-app-new.herokuapp.com/login", {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log("User not found");
      });
    /* then call props.onLoggedIn(username) */
    //props.onLoggedIn(username);
  };

  return (
    <div className="form-container">
      <Form className="form-login signup-form">
        <p className="h4 text-center mb-4">Sign in</p>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button
            variant="primary"
            className="buttons-login mt-4"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Link to={`/register`}>
            <Button variant="link" className="buttons-login">
              Register
            </Button>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
}
