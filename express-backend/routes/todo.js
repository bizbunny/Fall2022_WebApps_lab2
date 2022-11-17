const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Todo = require("../models/Todo");

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCAOR8+HSoJZDCANwiszbZ0d5RdnV8OwAUl0c8YfiR435YQxNvf
s1IcfLSkpwCmE3md0h13hoYsIuar2zv7vouGLHnY+ezId+ZN9SEimAZbexFguhH0
BBclqsiZu9TtTCwhIy0xmDW2Iw8g7MKJI1V0g51ZJxK9J42mo4MRJSsbXQIDAQAB
AoGAe4uOaODc4hOhD8j3GNlVFb8qO1EoiCPIUfpoWqcgKT71bs7fNBmp4jzeKU+o
NlzJb6FGNyZtHRW7wJcKorOj5oWn0DqEyvpku4tYLvpW3t+hrTOm0unMhH1g03pn
89/gt82pBjGiKTxKVaEJmyDYdRSgtMFPZNQ1N+1C4bXxDdkCQQDy+KDm1PDyO7RA
zC/f+Gq5g5QLATVE6wMRBtaKGLNe5VRqENq08AZwdqbV3phvefpNU0aN/ktmVaxX
vL1POj7fAkEAhxlL+pYGDN0VD+o8IOC3VPFCZr1++Sodc8wOcQF8PpVHuyBUSEpv
J5MDJyJbQCF5yToV9npAEcHVKqhW5bM5QwJAAebiU4w9Kpg/C/bNNSKbq0IVaZSj
1xtD1eFI0qHo3YhMBdyF6b6rPjwfiDMK3GyHAg3x0nC4JF/tTm6CyNj63wJAdbov
oaCWiSMnNYUy/JuWZykOaiV7vnlazQvnEcbvlEHWDlUv3QcwMdZEixe/WPVTAW3i
sbT6m/7DWbb0cppprQJAMcVMi9tdUE2ZgBeCQBcIyI/K04K6VJ18cGM8SM7abw1D
zCpEWGKJdxM6YIYptdJgIjUaTYmmNtgYHDnaP/+1JA==
-----END RSA PRIVATE KEY-----`; //remember to erase when committing

//for middlware
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
  });
  // await todo
  return todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        id: savedTodo._id,
        title: savedTodo.title,
        content: savedTodo.content,
        author: savedTodo.author,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

//retrieving a user's todos
router.get("/", async function (req, res, next) {
  const posts = await Post.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ posts: posts });
});

router.get("/:id", async function (req, res, next) {
  const posts = await Post.find().where("_id").equals(req.params.id).exec();
  return res.status(200).json(post);
});

module.exports = router;
