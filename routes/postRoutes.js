const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

router
    .route("/")
    .get(postController.getAllPosts)
    .post(postController.createPost);

router
    .route("/:id")
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;
