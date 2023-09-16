const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // this is a pkg used for end to end password encrypton
const initialize = require("./passport")
const passport = require("passport")
initialize(passport)
const personsSchema = new mongoose.Schema({
  // This paragraph helps to set my data forms
  name: String, // String is shorthand for {type: String}
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  balance: { type: Number, default: 0.0 },
  role: { type: String, default: "user" },
});
// modelling ends here

// Modelling

const Person = mongoose.model("person", personsSchema);

const router = express.Router();
router.get("/login", (req, res) => {
  res.render("auth/login", { title: "jumax login" });
});
router.get("/signup", (req, res) => {
  res.render("auth/signup", { title: "jumax signup", error: null });
});
router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  let salt = await bcrypt.genSalt(10); //Generate salt
  // this is used for end to end password encrypton# go to npm pkg site to view
  let hash = await bcrypt.hash(password, salt); // Hash password
  const newUser = new Person({
    //   this section handles new user datas
    name: name,
    email: email,
    password: hash,
  });
  try {
    await newUser.save(); // this section catches error message
  } catch (error) {
    if (error) {
      return res.render("auth/signup", {
        error: " email already in use",
        title: "jumax signup",
      });
    }
  }
  // This section saves the saves the users information in the database
  res.redirect("/auth/login");
});
router.post("/login", async(req, res) => {
  let email=req.body.email;
  let password=req.body.password;
  let user=await Person.find({email:email})
  console.log(user.pop());
  
  
  let passwordMatch=await bcrypt.compare(password,user.pop().password)
  console.log(passwordMatch);
});

module.exports = router;
