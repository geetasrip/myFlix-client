import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./movie-view.scss";
import movieimg from "../../img/images.jpeg";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="moviesContainer">
        <Row className="justify-content-md-center">
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movieimg} width="400" height="300" />
              </div>
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
