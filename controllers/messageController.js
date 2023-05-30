const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const messageService = require("../services/messageService");
const HttpStatus = require("http-status");

exports.getAllMessages = catchAsync(async (req, res, next) => {
    const messages = await messageService.getAllMessages();

    res.status(HttpStatus.OK).json({
        status: "success",
        results: messages.length,
        data: {
            messages,
        },
    });
});

exports.getMessage = catchAsync(async (req, res, next) => {
    const message = await messageService.getMessage(req.params.id);

    if (!message) {
        return next(new AppError("No message found with that ID", 404));
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            message,
        },
    });
});

exports.createMessage = catchAsync(async (req, res, next) => {
    const message = await messageService.createMessage(req.body);

    res.status(HttpStatus.CREATED).json({
        status: "success",
        data: {
            message,
        },
    });
});

exports.updateMessage = catchAsync(async (req, res, next) => {
    const message = await messageService.updateMessage(req.params.id, req.body);

    if (!message) {
        return next(new AppError("No message found with that ID", 404));
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            message,
        },
    });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
    const message = await messageService.deleteMessage(req.params.id);

    if (!message) {
        return next(new AppError("No message found with that ID", 404));
    }

    res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        data: null,
    });
});
