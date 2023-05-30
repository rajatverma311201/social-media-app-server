const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const chatService = require("../services/chatService");
const HttpStatus = require("http-status");
exports.getAllChats = catchAsync(async (req, res, next) => {
    const chats = await chatService.getAllChats();

    res.status(HttpStatus.OK).json({
        status: "success",
        results: chats.length,
        data: {
            chats,
        },
    });
});

exports.getChat = catchAsync(async (req, res, next) => {
    const chat = await chatService.getChat(req.params.id);

    if (!chat) {
        return next(new AppError("No chat found with that ID", 404));
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            chat,
        },
    });
});

exports.createChat = catchAsync(async (req, res, next) => {
    const chat = await chatService.createChat(req.body);

    res.status(HttpStatus.CREATED).json({
        status: "success",
        data: {
            chat,
        },
    });
});

exports.updateChat = catchAsync(async (req, res, next) => {
    const chat = await chatService.updateChat(req.params.id, req.body);

    if (!chat) {
        return next(new AppError("No chat found with that ID", 404));
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        data: {
            chat,
        },
    });
});

exports.deleteChat = catchAsync(async (req, res, next) => {
    const chat = await chatService.deleteChat(req.params.id);

    if (!chat) {
        return next(new AppError("No chat found with that ID", 404));
    }

    res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        data: null,
    });
});
