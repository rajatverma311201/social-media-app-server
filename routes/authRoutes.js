const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
