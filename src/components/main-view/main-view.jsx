import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// import { setMovies } from "../../actions/actions";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { UserProfile } from "../user-profile/user-profile";
import { setMovies, setUser } from "../../actions/actions";
import MoviesList from "../movie-list/movie-list";
import { RegistrationView } from "../registration-view/registration-view";
import { NavBarView } from "../navbar-view/navbar";

import { Row, Col } from "react-bootstrap";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
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
      let user = localStorage.getItem("user");
      this.props.setUser(user);
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
    this.props.setUser(null);
  }

  onRegister(registered, user) {
    this.setState({
      registered
    });
    this.props.setUser(user);
  }

  onLoggedIn(authData) {
    this.setState({
      username: authData.user.Username,
      password: authData.user.Password,
      email: authData.user.Email,
      favorites: authData.user.FavoriteMovies
    });
    this.props.setUser(authData.user.Username);

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
        this.props.setMovies(response.data);
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
    //const { user } = this.state;
    const { movies, user } = this.props;

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
              //return <MoviesList movies={movies} />;
              return (
                <div>
                  <NavBarView onLoggedOut={() => this.onLoggedOut()} />
                  <MoviesList movies={movies} />
                </div>
              );
            }}
          />

          {/* Register view */}
          <Route
            exact
            path="/register"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <RegistrationView
                      onLoggedIn={user => this.onLoggedIn(user)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <div>
                  <NavBarView onLoggedOut={() => this.onLoggedOut()} />
                  <MoviesList movies={movies} />;
                  {/* {movies.map(m => (
                    <Col md={3} key={m._id}>
                      <MovieCard movie={m} />
                    </Col>
                  ))} */}
                </div>
              );
            }}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <div>
                  <NavBarView onLoggedOut={() => this.onLoggedOut()} />
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(m => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                </div>
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
                <div>
                  <NavBarView onLoggedOut={() => this.onLoggedOut()} />
                  <Col md={8}>
                    <DirectorView
                      Director={
                        movies.find(m => m.Director.Name === match.params.name)
                          .Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                </div>
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
                <div>
                  <NavBarView onLoggedOut={() => this.onLoggedOut()} />
                  <Col md={8}>
                    <GenreView
                      Genre={
                        movies.find(m => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                </div>
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
                <div>
                  <NavBarView onLoggedOut={() => this.onLoggedOut()} />
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
                </div>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { setMovies, setUser }
)(MainView);
