const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Todo = require("../models/Todo");

const privateKey = ``;

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
        return res.status(401).json({error: "Unauthorized"});
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