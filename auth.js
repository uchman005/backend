const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // this is a pkg used for end to end password encrypton
const saltRounds = 10;
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
router.post("/signup",(req, res) => {
  let { name, email, password } = req.body;
let err = ''
  bcrypt.genSalt(saltRounds, function (err, salt) {
    // this is used for end to end password encrypton# go to npm pkg site to view
    bcrypt.hash(password, salt, async function (err, hash) {

      const newUser = new Person({     //   this section handles new user datas
        name: name,
        email: email,
        password: hash,
     })  // Store hash in your password DB.
     try {
      await newUser.save() // this section catches error message
     } catch (error) {
      if (error){
        err=error
      }
     }  
      // This section saves the saves the users information in the database
    });
  });
//   return res.render('auth/signup', { error:' email already in use', title: 'jumax signup'})
        
// res.redirect('/auth/login')
console.log(err);
});
module.exports = router;
