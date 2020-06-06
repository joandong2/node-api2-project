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

// get a single post of a user by its ID
// router.get("/users/:id/posts/:postID", (req, res) => {
// 	users.findUserPostById(req.params.id, req.params.postID)
// 		.then((post) => {
// 			if (post) {
// 				res.json(post)
// 			} else {
// 				res.status(404).json({
// 					message: "Post was not found",
// 				})
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 			res.status(500).json({
// 				message: "Error getting the user post",
// 			})
// 		})
// })

// server.post("/api/posts", (req, res) => {
//     // never trust data coming from the client,
//     // always validate it to some degree. make sure it's what you're expecting
//     if (!req.body.name || !req.body.bio) {
//         return res.status(400).json({
//             errorMessage: "Please provide name and bio for the user.",
//         });
//     }

//     const newUser = db.createUser({
//         name: req.body.name,
//         bio: req.body.bio,
//     });

//     try {
//         if (newUser) {
//             res.status(201).json(newUser);
//         }
//     } catch (err) {
//         res.status(500).json({
//             errorMessage:
//                 "There was an error while saving the user to the database",
//         });
//     }
// });

// server.put("/api/posts/:id", (req, res) => {
//     if (!req.body.name || !req.body.bio) {
//         return res.status(400).json({
//             errorMessage: "Please provide name and bio for the user.",
//         });
//     }

//     const user = db.getUserById(req.params.id);

//     try {
//         if (!user) {
//             res.status(404).json({
//                 errorMessage: "The user with the specified ID does not exist.",
//             });
//         }
//         const updatedUser = db.updateUser(user.id, {
//             name: req.body.name || user.name,
//             bio: req.body.bio || user.bio,
//         });

//         res.status(200).json(updatedUser);
//     } catch (err) {
//         res.status(500).json({
//             errorMessage: "The user information could not be retrieved.",
//         });
//     }
// });

// server.delete("/api/posts/:id", (req, res) => {
//     const user = db.getUserById(req.params.id);

//     try {
//         if (!user) {
//             res.status(400).json({
//                 errorMessage: "The user with the specified ID does not exist.",
//             });
//         }
//         db.deleteUser(user.id);
//         res.status(204).end();
//     } catch (err) {
//         res.status(500).json({
//             errorMessage: "The user could not be removed.",
//         });
//     }
// });

server.listen(8080, () => {
    console.log("server started on port 8080");
});
