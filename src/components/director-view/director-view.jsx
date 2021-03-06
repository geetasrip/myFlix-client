import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { Director, onBackClick } = this.props;

    return (
      <Container className="director-info">
        {/* <Card align="center"> */}
        <Card.Body>
          <h3 className="director-title">Director</h3>
          <div>
            <span className="label">Name: </span>
            <span className="value">{Director.Name}</span>
          </div>
          <div>
            <span className="label">Bio: </span>
            <span className="value">{Director.Bio}</span>
          </div>
          <div>
            <span className="label">Born: </span>
            <span className="value">{Director.Birthyear}</span>
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
        {/* </Card> */}
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string,
    Deathyear: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
};
