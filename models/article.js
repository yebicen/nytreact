const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  snippet: { type: String, required: true },
  source: { type: String, required: true },
  href: { type: String, required: true },
  publishdate:{ type: String, required: true },
  Date: { type: Date, default: Date.now }
});



const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
