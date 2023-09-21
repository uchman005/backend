const mongoose = require('mongoose');
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
module.exports = Person;