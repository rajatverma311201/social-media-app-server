const express = require("express");

const router = express.Router();

const postController = require("../controllers/postController");

const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.protect);
router.route("/my").get(postController.getMyAllPosts);
router.get("/:id", postController.getPost);

router
    .route("/:id/my")
    .patch(postController.updateMyPost)
    .delete(postController.deleteMyPost);

router
    .route("/")
    .get(postController.getAllPosts)
    .post(postController.createPost);

router.use(authMiddleware.restrictTo("admin"));
router
    .route("/:id")
    // .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;
