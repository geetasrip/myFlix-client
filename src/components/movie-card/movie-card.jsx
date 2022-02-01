import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Card, CardColumns } from "react-bootstrap";
import { Link } from "react-router-dom";
import movieimg from "../../img/images.jpeg";

export class MovieCard extends React.Component {
  render() {
    console.log("looping through each movie");
    const { movie } = this.props;

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img className="card-img" variant="top" src={movieimg} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.prototype = {
  Title: PropTypes.string.isRequired,
  onMovieClick: PropTypes.func.isRequired
};
