const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const postService = require("../services/postService");
const HttpStatus = require("http-status");

exports.getMyAllPosts = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const posts = await postService.getMyAllPosts(userId);

    res.status(HttpStatus.OK).json({
        status: "success",
        results: posts.length,
        data: {
            posts,
        },
    });
});

exports.getMyPost = catchAsync(async (req, res, next) => {
    const userId = req.user._id;

    const postId = req.params.id;
    const post = await postService.getMyPost(postId, userId);

    if (!post) {
        return next(
            new AppError("No post found with that ID", HttpStatus.NOT_FOUND)
        );
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.updateMyPost = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await postService.updateMyPost(postId, userId, req.body);

    if (!post) {
        return next(
            new AppError("No post found with that ID", HttpStatus.NOT_FOUND)
        );
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.deleteMyPost = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await postService.deleteMyPost(postId, userId);

    if (!post) {
        return next(
            new AppError("No post found with that ID", HttpStatus.NOT_FOUND)
        );
    }

    res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        data: null,
    });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await postService.getAllPosts();

    res.status(HttpStatus.OK).json({
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
        return next(
            new AppError("No post found with that ID", HttpStatus.NOT_FOUND)
        );
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.createPost = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    req.body.user = userId;

    const post = await postService.createPost(req.body);

    res.status(HttpStatus.CREATED).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.updatePost = catchAsync(async (req, res, next) => {
    const post = await postService.updatePost(req.params.id, req.body, req);

    if (!post) {
        return next(
            new AppError("No post found with that ID", HttpStatus.NOT_FOUND)
        );
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await postService.deletePost(req.params.id);

    if (!post) {
        return next(
            new AppError("No post found with that ID", HttpStatus.NOT_FOUND)
        );
    }

    res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        data: null,
    });
});
