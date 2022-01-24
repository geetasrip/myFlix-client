import React from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import { setMovies } from "../../actions/actions";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Expenses from "../../routes/expenses";
import Invoices from "../../routes/invoices";

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
    const { movies, user } = this.state;

    if (!user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
        </Row>
      );
    // if (movies.length === 0) return <div className="main-view" />;

    // console.log("testing");
    // console.log(movies);
    // console.log(user);

    return (
      <Router>
        <Routes>
          <Row className="main-view justify-content-md-center">
            {/* <Route
              path="/"
              render={() => {
                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match }) => {
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(m => m._id === match.params.movieId)}
                    />
                  </Col>
                );
              }}
            /> */}
            <Route path="/">
              <span>Hello world</span>
            </Route>
          </Row>
        </Routes>
      </Router>
    );
  }
}

export default MainView;
