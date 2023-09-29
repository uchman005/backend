// const {Schema,model} = require('mongoose'); object destructuring
// const personsSchema = new Schema({
const mongoose = require("mongoose");
const personsSchema = new mongoose.Schema({
  // This paragraph helps to set my data forms
  name: String, // String is shorthand for {type: String}
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  balance: { type: Number, default: 0.0 },
  role: { type: String, default: "user" },
});
const productsSchema = new mongoose.Schema({
  name: String,
  image: String,
  detail: { type: String },
  price: { type: Number },
  date: { type: Date, default: Date.now },
  quantity: { type: Number },
});

// modelling ends here

// Modelling
const Product = mongoose.model("product", productsSchema);
const Person = mongoose.model("person", personsSchema);
module.exports = { Person, Product };
