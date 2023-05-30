const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.protect);
router.route("/my").get(messageController.getMyAllMessages);

// router.use(authMiddleware.restrictTo("user"));
router
    .route("/:id/my")
    .patch(messageController.updateMyMessage)
    .delete(messageController.deleteMyMessage);

router
    .route("/")
    .get(messageController.getAllMessages)
    .post(messageController.createMessage);

router.use(authMiddleware.restrictTo("admin"));
router
    .route("/:id")
    .get(messageController.getMessage)
    .patch(messageController.updateMessage)
    .delete(messageController.deleteMessage);

module.exports = router;
