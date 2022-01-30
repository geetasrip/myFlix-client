import React from "react";
import axios from "axios";
import { confirm } from "react-confirm-box";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import "./user-profile.scss";

export class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: []
    };
  }

  componentDidMount() {
    //this.props.getUser();
  }

  setName(value) {
    this.setState({ name: value });
  }
  setUsername(value) {
    this.setState({ username: value });
    console.log("username", this.state.username);
  }
  setEmail(value) {
    this.setState({ email: value });
    console.log("email", this.state.email);
  }
  setPassword(value) {
    this.setState({ password: value });
    console.log("password", this.state.password);
  }
  setBirthday(value) {
    this.setState({ birthday: value });
    console.log("birthday", this.state.birthday);
  }
  editUser(e) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .put(
        `https://my-movies-app-new.herokuapp.com/user/${username}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday
        },
        {
          headers: { Authorization: `Bearer${token}` }
        }
      )
      .then(response => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday
        });
        localStorage.setItem("username", response.data.username);
        console.log("username");
        console.log("user data updated");
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteUser = async () => {
    console.log("delete user function");
    const delete_user = await confirm("Are you sure?");
    if (delete_user) {
      const username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      axios
        .delete(`https://my-movies-app-new.herokuapp.com/user/${username}`, {
          headers: { Authorization: `Bearer${token}` }
        })
        .then(() => {
          alert("user has been deleted");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.pathname = "/";
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://my-movies-app-new.herokuapp.com/user/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer${token}` }
        }
      )
      .then(response => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { username, email, favorites } = this.props;

    return (
      <Container className="UserProfile">
        <Row className="justify-content-md-center">
          <Col className="user-info">
            <div className="profileContent">
              <h3>My Profile</h3>
            </div>
            <h6>Name: {username}</h6>
            <h6>Email: {email}</h6>
          </Col>
        </Row>
        <div className="profileInformation">
          <Form className="editForm" onSubmit={e => this.editUser(e)}>
            <div>
              <h3>Edit Profile</h3>
            </div>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="New Name"
                onChange={e => this.setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="New Username"
                onChange={e => this.setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                placeholder="New Email"
                onChange={e => this.setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="New password"
                onChange={e => this.setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="Birthday"
                placeholder="New Birthday"
                onChange={e => this.setBirthday(e.target.value)}
              />
            </Form.Group>
            <div className="marginSpacer">
              <Button variant="success" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </div>
        <Row>
          <Col className="acc-btns mt-1">
            <Button
              size="md"
              variant="outline-danger"
              type="submit"
              ml="4"
              onClick={e => this.deleteUser()}
            >
              Delete Account
            </Button>
          </Col>
        </Row>

        <h3 className="favorite-Movies-title">Favorite Movies</h3>

        <Row className="favoriteMovied-col">
          {favorites &&
            favorites.map(movie => (
              <Col sm={6} md={4} lg={4} key={movie._id}>
                <div className="favoriteMoviediv">
                  <MovieCard movie={movie} />
                  <Button
                    bg="danger"
                    variant="danger"
                    className="unfav-button"
                    value={movie._id}
                    onClick={e => this.onRemoveFavorite(e, movie)}
                  >
                    Delete From Favorites
                  </Button>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}
