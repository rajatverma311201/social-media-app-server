const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const postService = require("../services/postService");

exports.getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await postService.getAllPosts();

    res.status(200).json({
        status: "success",
        results: posts.length,
        data: {
            posts,
        },
    });
});

exports.getPost = catchAsync(async (req, res, next) => {
    const post = await postService.getPost(req.params.id);

    if (!post) {
        return next(new AppError("No post found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.createPost = catchAsync(async (req, res, next) => {
    const post = await postService.createPost(req.body);

    res.status(201).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.updatePost = catchAsync(async (req, res, next) => {
    const post = await postService.updatePost(req.params.id, req.body);

    if (!post) {
        return next(new AppError("No post found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await postService.deletePost(req.params.id);

    if (!post) {
        return next(new AppError("No post found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
