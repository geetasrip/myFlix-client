import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Card, CardColumns } from "react-bootstrap";
import { Link } from "react-router-dom";
import movieimg from "../../img/silenceofthelambs.png";

import "./movie-card.scss";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card shadow">
        <img
          className="movie-card-image"
          alt={`A marketing poster for the movie ${movie.Title}`}
          src={`https://res.cloudinary.com/dcbwemkv2/image/upload/v1651362661/${movie.ImagePath}`}
          crossOrigin="anonymous"
        />

        <Link to={`/movies/${movie._id}`}>
          <div className="card-link-bg-animated">
            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
          </div>
        </Link>
      </Card>
    );
  }
}

export default MovieCard;
