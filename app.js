// MODULES IMPORT
const express = require("express");
const morgan = require("morgan");

// MIDDLEWARES IMPORT
const globalErrorHandler = require("./middlewares/globalErrorHandler");

// ROUTES IMPORT
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const followRoutes = require("./routes/followRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
// EXPRESS APP DECLARATION
const app = express();

app.enable("trust proxy");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// 3) ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/follows", followRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/messages", messageRoutes);

// HOME PAGE ROUTE
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// NOT FOUND HANDLER
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

app.use(globalErrorHandler);

module.exports = app;
