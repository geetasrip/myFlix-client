import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null
    };
  }

  componentDidMount() {
    axios
      .get("https://my-movies-app-new.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onRegister(registered, user) {
    this.setState({
      registered,
      user
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;
    console.log("user", user);
    console.log("registerd", registered);
    if (!registered)
      return (
        <RegistrationView
          onRegister={(registered, username) =>
            this.onRegister(registered, username)
          }
        />
      );

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) {
      return <div className="main-view">The list is empty!</div>;
    } else {
      return (
        <div className="main-view">
          {selectedMovie ? (
            <MovieView
              movie={selectedMovie}
              onBackClick={newSelectedMovie => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ) : (
            movies.map(movie => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={movie => {
                  this.setSelectedMovie(movie);
                }}
              />
            ))
          )}
        </div>
      );
    }
  }
}

export default MainView;