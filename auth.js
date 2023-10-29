const express = require("express");
const bcrypt = require("bcrypt"); // this is a pkg used for end to end password encrypton
const initialize = require("./passport");
const passport = require("passport");
const { Person } = require("./models");
const { checkNotAuthenticated } = require("./libs/auth"); // this is a middleware that checks if a user is authenticated
initialize(
  passport,
  async email => await Person.findOne({ email: email }).then(user => user), // this section handles user login by email
  async id => await Person.findOne({ _id: id }).then(user => user) // this section handles fetching user data by id

); //this section initializes passport and passes the user data to the passport.js file
// A middleware is a function that has access to the request and response object and the next function in the application's request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
//I designed it in the libs/auth.js file
const router = express.Router();
router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("auth/login", { title: "jumax login" });
});
router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("auth/signup", { title: "jumax signup", error: null });
});
router.post("/signup", checkNotAuthenticated, async (req, res) => {
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
router.post(
  "/login",
  passport.authenticate("local", {
    // this section authenticates the user
    successRedirect: "/dashboard", // this section redirects the user to the dashboard if the user is authenticated
    failureRedirect: "/auth/login", // this section redirects the user to the login page if the user is not authenticated
    failureFlash: true, // this section flashes a message if the user is not authenticated
  })
);
router.get("/logout", (req, res) => {
  req.logOut(() => {
    console.log("logged out");
  }); // this section logs out the user
  res.redirect("/auth/login");
});

// router.post("/login", async(req, res) => {
//   let email=req.body.email;
//   let password=req.body.password;
//   let user=await Person.find({email:email})
//   console.log(user.pop());

//   let passwordMatch=await bcrypt.compare(password,user.pop().password)
//   console.log(passwordMatch);
// });

module.exports = router;
