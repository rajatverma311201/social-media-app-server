const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const followRoutes = require("./routes/followRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/follows", followRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

module.exports = app;
