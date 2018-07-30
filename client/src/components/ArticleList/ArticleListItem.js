import React from "react";
// import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import Button from "../Button";
// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const ArticleListItem = props => (
  <li className="list-group-item">
    <Container>
      <Row>
        <Col size="xs-12 sm-9">
          <h3>{props.snippet}</h3>
          <p>{props.source}</p>
          <a rel="noreferrer noopener" target="_blank" href={props.href}>
            NY TIMES LINK
          </a>
          <p>{props.publishdate}</p>
          <Button
            onClick={props.handleSavingArticles({
              snippet: props.snippet,
              source: props.source,
              href: props.href,
              publishdate: props.publishdate})}
            type="success"
            className="input-lg"
          >
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  </li>
);
