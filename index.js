require("dotenv").config(); // this loads env files to server
const express = require("express"); // // this is a very fast server
const mongoose = require("mongoose"); /// this is used to communicate with mongo dbs or any non relational data base
const bodyParser = require("body-parser"); // this is used to use to make request body available to the server
const app = express(); // this is create an instance for an express
//const secret = process.env.PAYSTACK_SECRET
const auth = require("./auth")
const PORT = process.env.PORT || 30001;
//server set up ends here
const MONGOURL = process.env.MONGOURL; // ***This paragraph handle the server connection 
mongoose.connect(MONGOURL, {
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
app.use(bodyParser.urlencoded({ extended: false })); //  this is set up for body parser
app.use(bodyParser.json()); // this is also a set up for body parser/ this set up a req.body to object
app.use(express.static(__dirname + "/public")); // all sta
const todos = [];
app.use("/auth",auth)
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

app.get("/name", async (req, res) => {
  const people = await Person.find();
  //console.log(people);
  res.render("name", { people });
});

app.get("/pages/about", (req, res) => {
  res.render("pages/about", { title: "JUMAX ABOUT" });
});

app.get('/pages/:page',(req, res)=>{
  let page = req.params.page
  let x = `JUMAX ${page.toUpperCase()}`
  res.render('pages/'+ page, {title:x}) 
  
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

app.listen(PORT, () => {
  console.log(`server is live on port ${PORT}`);
});
