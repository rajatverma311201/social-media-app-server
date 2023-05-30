const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const followService = require("../services/followService");

exports.getAllFollows = catchAsync(async (req, res, next) => {
    const follows = await followService.getAllFollows();

    res.status(200).json({
        status: "success",
        results: follows.length,
        data: {
            follows,
        },
    });
});

exports.getFollow = catchAsync(async (req, res, next) => {
    const follow = await followService.getFollow(req.params.id);

    if (!follow) {
        return next(new AppError("No follow found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            follow,
        },
    });
});

exports.createFollow = catchAsync(async (req, res, next) => {
    const follow = await followService.createFollow(req.body);

    res.status(201).json({
        status: "success",
        data: {
            follow,
        },
    });
});

exports.updateFollow = catchAsync(async (req, res, next) => {
    const follow = await followService.updateFollow(req.params.id, req.body);

    if (!follow) {
        return next(new AppError("No follow found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            follow,
        },
    });
});

exports.deleteFollow = catchAsync(async (req, res, next) => {
    const follow = await followService.deleteFollow(req.params.id);

    if (!follow) {
        return next(new AppError("No follow found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
