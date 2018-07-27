import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { ArticleList, ArticleListItem } from "./components/ArticleList";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {

  // constructor() {
  //   super();
  //   this.handleFormSubmit = this.handleFormSubmit.bind(this);
  // }
  state = {
    articles: [],
    articleSearch: "",
    //should combine
    savedarticles:[]
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
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.search(this.state.articleSearch)
      .then(res => this.setState({ articles: res.data.response.docs }))
      .catch(err => console.log(err));
  };



 ///////API portion starts here/////////
 ///////////////////////////////////////
 // When the component mounts, load all books and save them to this.state.books
 componentDidMount() {
  this.loadArticles();
}

// Loads all books  and sets them to this.state.books
loadArticles = () => {
  API.getArticles()
    .then(res =>
      this.setState({ savedarticles: res.data})
    )
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
handleSavingArticles = event => {
  event.preventDefault();
    API.saveArticle({
      snippet: this.state.snippet,
      source: this.state.source,
      date: this.state.date
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
                        onClick={this.handleSavingArticles}
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
                <h3 className="text-center">No Articles to Display</h3>
              ) : (
                <ArticleList>
                  {this.state.articles.map(article => {
                    return (
                      <ArticleListItem
                        key={article.snippet}
                        snippet={article.snippet}
                        source={article.source}
                        href={article.web_url}
                        date={article.pub_date}
                      />
                    );
                  })}
                  <Button onClick={this.handleSavingArticles} />
                </ArticleList>
                
              )}
            </Col>
          </Row>
        </Container>




  <Container>
        <Row>
          <Col size="md-6 sm-12">
        
              <p>MY SAVED ARTICLES</p>
            {this.state.savedarticles.length ? (
              <ArticleList>
                {this.state.savedarticles.map(article => {
                  return (
                    <ArticleListItem key={article._id}>
                      <a href={"/article/" + article._id}>
                        <p>
                        {article.snippet}
                        {article.source}
                        {article.href}
                        {article.date}
                        </p>
                      </a>
                      {/* <DeleteBtn onClick={() => this.deleteArticle(article._id)} /> */}
                    </ArticleListItem>
                  );
                })}
              </ArticleList>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>




      </div>
    );
  }
}

export default App;
