if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // this loads env files to server
}
//import express from "express"
const path = require("path")
const {Person,Product} = require("./models")
const express = require("express"); // // this is a very fast server
const mongoose = require("mongoose"); /// this is used to communicate with mongo dbs or any non relational data base
const bodyParser = require("body-parser"); // this is used to use to make request body available to the server (this is used to create req.body)
const app = express(); // this is create an instance for an express
const flash = require("express-flash");// this is used to send message for one who re in session
const passport = require("passport"); // passport is used to aunthenticate and create session
const session = require("express-session");// this is used to create sessions for users in the database so that they will be recognised when they returned
//const secret = process.env.PAYSTACK_SECRET
const multer  = require('multer')
   // this section handles image upload
   const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);// this is for uniqueness of the uploaded files 
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));// this handles file names
    },
  });
const upload = multer({storage:storage})
// this section handles the destination where the file or image will be uploaded
//const upload1 = multer({destination:"./public/views"})
const auth = require("./auth")
const PORT = process.env.PORT || 30001;
//server set up ends here
const MONGOURL = process.env.MONGOURL; // ***This paragraph handle the server connection 
mongoose.connect(MONGOURL, {  // this takes 2 parameters# string option for database and the 2nd for option 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});
// the connection to data base programme ends here
const DB = mongoose.connection; // ***This paragraph helps me to know the condition of the server connection
DB.on("connected", () => {
  console.log("Database is connected");
});
DB.on("error", (error) => {
  console.log(`connection failed due to error: ${error}`);
});
// ###the helper that to know the condition of the connected server

// schema is used indicate or limit or control the kind of objects that will be allowed in a particular database.
//*** this used to perform operation on the database
// special NOTE: C.R.U.D create, read, update and destroy or delete
app.set("view engine", "ejs"); // this sets view engine to ejs
app.set('views', __dirname + '/views'); // this tells where view folder for vercel##
app.use(bodyParser.urlencoded({ extended: false })); //  this is set up for body parser # helps to create req.body
app.use(bodyParser.json()); // this is also a set up for body parser/ this set up a req.body to object
app.use(express.static(__dirname + "/public")); // it tells the server  the location of the static files which is in public folder
app.use(flash()); // this is used to flash messages to the user
const { checkAuthenticated } = require("./libs/auth");// this is for authentication purposes.
app.use(session({ // this is used to create authentication for users
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
})); // this is used to set up session
app.use(passport.initialize()); // this is used to initialize passport
app.use(passport.session()); // this is used to set up passport session
const todos = [];
app.use("/auth", auth)
app.get("/", function (req, res) {
  // root route "/" this is wher the app starts
  res.render("index", { title: "JUMAX HOME" });
});

app.get("/about", (req, res) => {
  res.render("about", { name: "jude", age: 50 });
});
app.post("/addtodo", (req, res) => {
  const newtodo = req.body.todo;
  todos.push(newtodo);
  console.log(todos);
  res.redirect("/todo");
  //res.json(todos)
});

// note: app.post for a post route
// app.get for a get route
// // app.get for will start a server at a particular
app.get("/todo", (req, res) => {
  res.render("todo", { todos });
});
app.get('/dashboard', checkAuthenticated, async (req, res) => {
  const user = await req.user
  res.render('dashboard', { title: 'jumax dashboard', user: user })
}); // this is a protected route
app.get("/name", async (req, res) => {
  const people = await Person.find();
  //console.log(people);
  res.render("name", { people });
});

app.get("/pages/about", (req, res) => {
  res.render("pages/about", { title: "JUMAX ABOUT" });
});

app.get('/pages/:page', (req, res) => {
  let page = req.params.page
  let x = `JUMAX ${page.toUpperCase()}`
  res.render('pages/' + page, { title: x })

})

app.get("/name/id", (req, res) => {
  res.send("testing get method");
});
app.get("/didit", (req, res) => {
  res.send("i did it myself");
});
app.get("/jude/:eze", (req, res) => {
  console.log(req.body);
  console.log(req.params.eze);
  res.send(`The dynamic: ${req.params.eze}`);
});
app.post("/jude/eze", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send("testing post method");
});
app.post("/name", async (req, res) => {
  console.log(req.body);
  let { name, age, color, height } = req.body;
  const person = new Person({
    name: name,
    age: age,
    color: color,
    height: height,
  });
  await person.save();
  res.redirect("/name");
});

app.post("/pages/imageupload",upload.array ('file'), async(req, res) => {
  const {name,details,price,quantity} = req.body
  const image = req.files[0]
  const filename=image.filename
  const newProduct= new Product({
    name:name,
    details:details,
    price:price,
    quantity:quantity,
    image:filename
    
  })
  await newProduct.save()

res.redirect('/')
})
app.listen(PORT, () => {
  console.log(`server is live on port ${PORT}`);
});
