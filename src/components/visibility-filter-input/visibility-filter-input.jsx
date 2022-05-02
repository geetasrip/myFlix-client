import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../actions/actions";
import { Form } from "react-bootstrap";

function VisibilityFilterInput(props) {
  console.log("props.visibilityFilter", props.visibilityFilter);
  return (
    <Form.Control
      className="filter-input"
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Filter"
    />
  );
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);
