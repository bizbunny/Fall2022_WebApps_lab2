const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const User = require("../models/User");

const privateKey = ``; //DELETE LATER

const router = express.Router();

//for middlware
//to verify token
router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

//for authoring new Todo
router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    complete: req.body.complete,
  });
  // await todo
  return todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        _id: savedTodo._id,
        title: savedTodo.title,
        content: savedTodo.content,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
        complete: savedTodo.complete,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

//retrieving a user's todos
router.get("/", async function (req, res, next) {
  const todo = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todo: todo });
});

router.get("/:id", async function (req, res, next) {
  const todo = await Todo.findOne().where("_id").equals(req.params.id).exec();
  return res.status(200).json(todo);
});

//for deleting a todo
router.delete("/delete/:id", async function (req, res) {
  //find what to delete by ID
  const todo = await Todo.findOneAndDelete()
    .where("_id")
    .equals(req.params.id)
    .exec(); //find a todo by ID to delete
  if (todo) {
    return res.status(200).json(todo); //if we find it, status code 200 and delete from there
  }
  return res.status(404).json({ error: "Couldn't delete todo. " });
  //couldn't find it or could not delete, so return error message since main condition has not been met
});

//toggling complete
router.delete("/update/:id", async function (req, res) {
  //find what to toggle by ID
  const todo = await Todo.findByIdAndUpdate()
    .where("_id")
    .equals(req.params.id)
    .exec();
  //update completed field related variables
  if (todo) {
    todo.complete = req.body.complete;
    todo.save();
    return res.status(200).json(todo);
  }
  return res.status(404).json({ error: "couldn't toggle todo" });
});

module.exports = router;
