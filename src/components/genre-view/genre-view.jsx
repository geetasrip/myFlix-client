import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick } = this.props;

    return (
      <Container className="gener-info">
        <br />
        <Card.Body>
          <h3 className="gener-title">Genre</h3>
          <div>
            <span className="label">Name: </span>
            <span className="value">{Genre.Name}</span>
          </div>
          <div>
            <span className="label">Description: </span>
            <span className="value">{Genre.Description}</span>
          </div>
          <div className="backButton">
            <Button
              size="md"
              variant="light"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </div>
        </Card.Body>
      </Container>
    );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
};
