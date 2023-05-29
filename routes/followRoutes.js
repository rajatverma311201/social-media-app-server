const express = require("express");
const followController = require("../controllers/followController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(followController.getAllFollows)
    .post(followController.createFollow);

router
    .route("/:id")
    .get(followController.getFollow)
    .patch(followController.updateFollow)
    .delete(followController.deleteFollow);

module.exports = router;
