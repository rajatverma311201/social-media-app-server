const User = require("../models/userModel");
const Post = require("../models/postModel");
const Follow = require("../models/followModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find().populate("user");
    res.status(200).json({
        status: "success",
        results: posts.length,
        data: {
            posts,
        },
    });
});
