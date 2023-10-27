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

const TransactionSchema = new mongoose.Schema({
  reference: String,
  amount: Number,
  status: String,
  details: {type:Object, default: {}},
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "person" },
});
// modelling ends here

// Modelling
const Product = mongoose.model("product", productsSchema);
const Person = mongoose.model("person", personsSchema);
const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = { Person, Product, Transaction };

