const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  authors: Array,
  description: String,
  image: String,
  link: {type: String, required: true},
  rating: Number,
  pageCount: Number,
  dateSaved: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
