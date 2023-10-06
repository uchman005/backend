function checkAuthenticated(req, res, next) {
  // use this function to check if a user is authenticated
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}
const checkNotAuthenticated = (req, res, next) => {
  // use this function to check if a user is not authenticated
  if (req.isAuthenticated()) {
    return res.redirectC;
  }
  next();
};
const confirmAdmin = (req, res, next) => {
  // use this function to check if a user is not authenticated
  if (req.isAuthenticated()) {
    if (req.user.email == "jude.e449@gmail.com") {
      return next();
    }
    res.redirect("/dasboard");
  }
  res.redirect("/auth/login");
};
//Usage
// const { checkAuthenticated, checkNotAuthenticated } = require("./libs/auth")
// app.get('/dashboard', checkAuthenticated, async (req, res) => {
//   const user = await req.user
//   res.render('dashboard', { title: 'jumax dashboard', user: user })
// });
// export{checkAuthenticated, checkNotAuthenticated }
module.exports = { checkAuthenticated, checkNotAuthenticated, confirmAdmin };
