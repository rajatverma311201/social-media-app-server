const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const followService = require("../services/followService");
const HttpStatus = require("http-status");
exports.getAllFollows = catchAsync(async (req, res, next) => {
    const follows = await followService.getAllFollows();

    res.status(HttpStatus.OK).json({
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

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            follow,
        },
    });
});

exports.createFollow = catchAsync(async (req, res, next) => {
    const follow = await followService.createFollow(req.body);

    res.status(HttpStatus.CREATED).json({
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

    res.status(HttpStatus.OK).json({
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

    res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        data: null,
    });
});
