const express = require("express")
const router = express.Router()
router.get('/login', (req, res)=>{
    res.render("auth/login", { title:"jumax login"})
}) 
router.get('/signup', (req, res)=>{
    res.render("auth/signup", {title:"jumax signup"})
}) 
router.post('/signup', (req, res)=>{
    console.log(req.body)
})
module.exports = router; 
