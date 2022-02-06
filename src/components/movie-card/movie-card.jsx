import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Card, CardColumns } from "react-bootstrap";
import { Link } from "react-router-dom";
import movieimg from "../../img/silenceofthelambs.png";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img className="card-img" variant="top" src={movieimg} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link className="link-secondary" to={`/movies/${movie._id}`}>
            <Button variant="link" className="link-danger">
              Open
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default MovieCard;
