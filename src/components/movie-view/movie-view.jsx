import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./movie-view.scss";
import movieimg from "../../img/images.jpeg";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      // <Container fluid className="moviesContainer">
      //   <Row className="justify-content-md-center">
      //     <Col>
      //       <div className="movie-view">
      //         <div className="movie-poster">
      //           <img src={movieimg} width="400" height="300" />
      //         </div>
      //         <div className="movie-title">
      //           <span className="label">Title: </span>
      //           <span className="value">{movie.Title}</span>
      //         </div>
      //         <div className="movie-description">
      //           <span className="label">Description: </span>
      //           <span className="value">{movie.Description}</span>
      //         </div>
      //         <Link to={`/directors/${movie.Director.Name}`}>
      //           <Button variant="link">Director</Button>
      //         </Link>
      //         <Link to={`/genres/${movie.Genre.Name}`}>
      //           <Button variant="link">Genre</Button>
      //         </Link>
      //       </div>
      //     </Col>
      //   </Row>
      // </Container>

      <div className="content">
        <Card className="movie-view-card">
          <Card.Img
            variant="top"
            src={`https://res.cloudinary.com/dcbwemkv2/image/upload/v1651362661/${movie.ImagePath}`}
            crossOrigin="anonymous"
          />
          <Card.Body>
            <h3 className="movie-title">{movie.Title}</h3>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
            <Button variant="link" onClick={() => onBackClick()}>
              Back
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
