import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Card, CardColumns } from "react-bootstrap";
import img from "../../img/images.jpeg";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.prototype = {
  Title: PropTypes.string.isRequired,
  onMovieClick: PropTypes.func.isRequired
};
