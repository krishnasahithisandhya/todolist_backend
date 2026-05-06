require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error:", err));

// Schema
const Todo = mongoose.model("Todo", {
  text: String
});

// GET
app.get("/todos", (req, res) => {
  Todo.find().then(data => res.json(data));
});

// ADD
app.post("/todos", (req, res) => {
  const todo = new Todo({ text: req.body.text });

  todo.save().then(() => {
    res.json({ msg: "added" });
  });
});

// DELETE
app.post("/delete", (req, res) => {
  Todo.deleteOne({ text: req.body.text })
    .then(() => res.json({ msg: "deleted" }));
});

// PORT
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});