import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// import { setMovies } from "../../actions/actions";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { UserProfile } from "../user-profile/user-profile";
import { Row, Col } from "react-bootstrap";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      username: null,
      password: null,
      email: null,
      favorites: null
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  // axios
  //   .get("https://my-movies-app-new.herokuapp.com/movies")
  //   .then(response => {
  //     this.setState({
  //       movies: response.data
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  onRegister(registered, user) {
    this.setState({
      registered,
      user
    });
  }

  onLoggedIn(authData) {
    console.log("authData", authData.user);
    this.setState({
      user: authData.user.Username,
      username: authData.user.Username,
      password: authData.user.password,
      email: authData.user.email,
      favorites: authData.user.favorites
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }
  getMovies(token) {
    axios
      .get("https://my-movies-app-new.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://my-movies-app-new.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          name: response.data.Name,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.Favorites
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { username, password, email, favorites } = this.state;
    const { movies, user } = this.state;

    return (
      <Router>
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;

              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />

          {/* Register view */}
          <Route
            exact
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    Director={
                      movies.find(m => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    Genre={
                      movies.find(m => m.Genre.Name === match.params.name).Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/user"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <>
                  <Col>
                    <UserProfile
                      username={username}
                      password={password}
                      email={email}
                      favorites={favorites}
                      movies={movies}
                      getUser={this.getUser}
                      onBackClick={() => history.goBack()}
                      removeMovie={_id => this.onRemoveFavorite(_id)}
                    />
                  </Col>
                </>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

export default MainView;
