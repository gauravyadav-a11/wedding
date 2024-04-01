require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect(
    process.env.DB_URL
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  user: String,
  password: String,
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  text: String,
});

const User = mongoose.model("User", userSchema);
const Contact = mongoose.model("Contact", contactSchema);

app.post("/api/v1/login", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ user: username, password: password });
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.post("/api/v1/contact", (req, res) => {
  const { name, email, text } = req.body;
  const contact = new Contact({ name, email, text });
  contact
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.json({
        Invalid: "Call",
      });
    });
});

app.listen(4666, () => {
  console.log("App Running");
}); 
