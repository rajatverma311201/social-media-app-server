const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/userService");
const HttpStatus = require("http-status");
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await userService.getAllUsers();

    res.status(HttpStatus.OK).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    // console.log(req.params.id);
    const user = await userService.getUser(req.params.id);

    if (!user) {
        return next(new AppError("No user found with that ID", 404));
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.createUser = catchAsync(async (req, res, next) => {
    const user = await userService.createUser(req.body);

    res.status(HttpStatus.CREATED).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await userService.updateUser(req.params.id, req.body);

    if (!user) {
        return next(new AppError("No user found with that ID", 404));
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
        return next(new AppError("No user found with that ID", 404));
    }

    res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        data: null,
    });
});
