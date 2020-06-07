// This import is pulling from node_modules now
const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");
const server = express();

// This is installing some middleware to allow Express
// to parse JSON request bodies. We'll go more into detail about this later.
server.use(express.json());
server.use(cors());

server.get("/api/posts", (req, res) => {
    const posts = db.find();
    posts
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The posts information could not be retrieved",
            });
        });
});

server.get("/api/posts/:id", (req, res) => {
    // The param variable matches up to the name of our URL param above
    db.findById(req.params.id)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The posts information could not be retrieved",
            });
        });
});

server.get("/api/posts/:id/comments", (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "Post not found",
                });
            } else {
                // this is returning a new promise in the chain, so we get
                // the result in the next `.then` call.
                return db.findPostComments(req.params.id);
            }
        })
        .then((comments) => {
            res.json(comments);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error getting the post",
            });
        });
});

server.post("/api/posts/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Missing user title or contents",
        });
    }

    db.insert(req.body)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error adding new post",
            });
        });
});

server.post("/api/posts/:id/comments", (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            message: "Missing text",
        });
    }

    db.insertComment(req.body)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error adding comment",
            });
        });
});

server.put("/api/posts/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Missing user title or contents",
        });
    }

    db.update(req.params.id, req.body)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "The post could not be found",
                });
            } else {
                return db.findById(req.params.id);
            }
        })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error updating the post",
            });
        });
});

server.delete("/api/posts/:id", (req, res) => {
    db.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The post has been deleted",
                });
            } else {
                res.status(404).json({
                    message: "The user could not be found",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error deleting a post",
            });
        });
});

server.listen(8080, () => {
    console.log("server started on port 8080");
});
