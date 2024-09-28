const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const TodoModel = require("./models/Todo.js");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.send("hello from node API");
});

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get product by id
app.get("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create todo
app.post("/api/todos", async (req, res) => {
  try {
    const task = await TodoModel.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndUpdate({ _id: id }, { done: req.query.done });
    if (!todo) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedTodo = await TodoModel.findById(id);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) {
      res.status(404).json({ message: "Product not Found" });
    }
    res.status(200).json({ message: "Product deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://chandramoulirotta11:q9nfBSsmNVcy1sDy@todo.mi2ea.mongodb.net/todos?retryWrites=true&w=majority&appName=todo"
  )
  .then(() => {
    console.log("Conneted to DB");
    app.listen(3000, () => {
      console.log(`Server connected to port 3001`);
    });
  })
  .catch(() => {
    console.log("connecton Failed");
  });
