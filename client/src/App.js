import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { ArticleList, ArticleListItem } from "./components/ArticleList";
import { SavedArticleList, SavedArticleListItem } from "./components/SavedArticleList";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {

  // constructor() {
  //   super();
  //   this.handleFormSubmit = this.handleFormSubmit.bind(this);
  // }
  state = {
    articles: [],
    articleSearch: "",
    savedarticles: []
  };

  searchArticles = query => {
    console.log("searching...", this.state.articleSearch)
    API.search(query)
      .then(res =>this.setState({ articles: res.data.response.docs }))
      .catch(err => console.log(err));
  };


  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    this.searchArticles(this.state.articleSearch);
  };

  



  ///////save to mongoDB portion starts here/////////
  ///////////////////////////////////////
  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadArticles();
  }

  // Loads all books  and sets them to this.state.savedarticles
  loadArticles = () => {
    API.getArticles()
    .then(res => this.setState({ savedarticles: res.data}))
    .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database

  //check event.target to save.....

  handleSavingArticles = (result) => event =>{
    // handleSavingArticles = (result) => {
    console.log(result)
    event.preventDefault();
    // console.log(result.snippet)
    API.saveArticle({
      snippet: result.snippet,
      source: result.source,
      href: result.href,
      publishdate:result.publishdate

    })
    .then(res => this.loadArticles())
    .catch(err => console.log(err));

  };

  


  render() {
    return (
      <div>
        <Nav />
        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="articleSearch"
                        value={this.state.articleSearch}
                        // defaultValue = "Obama"
                        onChange={this.handleInputChange}
                      // placeholder="Search For an Article"
                      />
                    </Col>
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {!this.state.articles.length ? (
                <p className="text-center">Start Searching Here</p>
              ) : (
                  <ArticleList>
                    {this.state.articles.map(article => {
                      return (
                        <ArticleListItem
                          key={article.snippet}
                          snippet={article.snippet}
                          source={article.source}
                          href={article.web_url}
                          publishdate={article.pub_date}
                          handleSavingArticles={this.handleSavingArticles}
                        />
                      );
                    })}

                  </ArticleList>

                )}
            </Col>
          </Row>
        </Container>




        <Container>
          <Row>
          <Col size="xs-12">
          <h2> MY SAVED ARTICLES </h2>
              {!this.state.savedarticles.length ? (
                <h3 className="text-center">No Saved Articles</h3>
              ) : (
                  <SavedArticleList>
                    {this.state.savedarticles.map(savedarticle => {
                      return (
                        <SavedArticleListItem
                          key={savedarticle.snippet}
                          snippet={savedarticle.snippet}
                          source={savedarticle.source}
                          href={savedarticle.href}
                          publishdate={savedarticle.publishdate}
                        />
                      );
                    })}

                  </SavedArticleList>

                )}
            </Col>
          </Row>
        </Container>




      </div>
    );
  }
}

export default App;
