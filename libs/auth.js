function checkAuthenticated(req, res, next) { // use this function to check if a user is authenticated
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/login')
}
const checkNotAuthenticated = (req, res, next) => { // use this function to check if a user is not authenticated
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard")
    }
    next()
}
//Usage
// const { checkAuthenticated, checkNotAuthenticated } = require("./libs/auth")
// app.get('/dashboard', checkAuthenticated, async (req, res) => {
//   const user = await req.user
//   res.render('dashboard', { title: 'jumax dashboard', user: user })
// });
module.exports = { checkAuthenticated, checkNotAuthenticated }