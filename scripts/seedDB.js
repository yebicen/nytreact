const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/nytreact"
);

const artictleSeed = [
  {
    snippet: "The Dead Zone",
    source: "Stephen King",
    href:
      "www.google.com",
    publishdate: "2016-01-01",
    date: new Date(Date.now())
  },
  {
    snippet: "Line King",
    source: "Obama",
    href:
      "www.sina.com",
    publishdate: "2016-02-01",
    date: new Date(Date.now())
  },
  
  
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(artictleSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
