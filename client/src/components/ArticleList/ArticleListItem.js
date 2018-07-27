import React from "react";
// import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const ArticleListItem = props => (
  <li className="list-group-item">
    <Container>
      <Row>
        <Col size="xs-12 sm-9">
          <h3>{props.snippet}</h3>
          <p>{props.source}</p>
          <a rel="noreferrer noopener" target="_blank" href={props.web_url}>
            link
          </a>
          <p>{props.date}</p>
          <button>Save</button>
        </Col>
      </Row>
    </Container>
  </li>
);
