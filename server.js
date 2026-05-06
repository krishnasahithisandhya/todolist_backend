// backend -> server.js

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Error:", err));

// Schema
const Todo = mongoose.model("Todo", {
    text: String
});

// GET all todos
app.get("/todos", (req, res) => {
    Todo.find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

// ADD new todo
app.post("/todos", (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then(() => {
            res.json({ msg: "Todo Added Successfully" });
        })
        .catch((err) => res.json(err));
});

// DELETE todo by ID
app.delete("/todos/:id", (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ msg: "Todo Deleted Successfully" });
        })
        .catch((err) => res.json(err));
});

// PORT
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});