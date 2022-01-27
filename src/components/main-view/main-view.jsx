import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { setMovies } from "../../actions/actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    console.log("component did mount");
    axios
      .get("https://my-movies-app-new.herokuapp.com/movies")
      .then(response => {
        console.log(response.data);
        this.props.setMovies(response.data);
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
    let { movies } = this.props;
    let { user } = this.state;
    console.log("movies", movies);
    // if (!registered)
    //   return (
    //     <RegistrationView
    //       onRegister={(registered, username) =>
    //         this.onRegister(registered, username)
    //       }
    //     />
    //   );

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) {
      return <div className="main-view">The list is empty!</div>;
    } else {
      return (
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        // <Router>
        //   <Row className="main-view justify-content-md-center">
        //     <Route
        //       exact
        //       path="/"
        //       render={() => {
        //         if (!user)
        //           return (
        //             <Col>
        //               <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        //             </Col>
        //           );
        //         if (movies.length === 0) return <div className="main-view" />;
        //         // #6
        //         return <MoviesList movies={movies} />;
        //       }}
        //     />
        //     {/* The rest of routes */}
        //   </Row>
        // </Router>
      );
    }
  }
}

let mapStateToProps = state => {
  return { movies: state.movies };
};

// #8
export default connect(
  mapStateToProps,
  { setMovies }
)(MainView);
