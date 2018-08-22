# nytreact
React App
https://secret-reef-45910.herokuapp.com/


Overview

This is a React-based rendition of the New York Times Article Search application, which involves react components, helper/util functions, and react mounting lifecycle to query and display articles based on user searches. It also uses Node, Express and MongoDB so that users can save articles to read later.

- Express routes :
/api/articles (get) - components use this to query MongoDB for all saved articles

/api/articles (post) - components use this to save an article to the database

/api/articles (delete) - components use this to delete a saved article in the database

* (get) - will load single HTML page (with ReactJS) in client/build/index.html. 



- The layout include two react components for each page Home and Saved.
Home - contains all of the JSX to be rendered on the homepage. This component contains other smaller components or JSX that renders plain HTML elements. This component is able to query the NYT API for articles. It displays the results from the API search in a rendered list that displays the article title, publication date, and allows the user to visit an article's url or save the article to the MongoDB.

Saved - Renders articles that are saved in the MongoDB and allows the user to visit the article's url or delete it from the MongoDB. 
