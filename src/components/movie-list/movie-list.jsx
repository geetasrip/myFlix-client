import React from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = Object.values(movies).filter(m =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }
  if (!movies) return <div className="main-view" />;

  return (
    <div className="container-fluid">
      <Row>
        <Col lg={12} style={{ margin: "0.5em" }}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      <Row>
        {filteredMovies.map(m => (
          <Col lg={4} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);
