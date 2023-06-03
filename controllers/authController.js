const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/authService");
const HttpStatus = require("http-status");
exports.signup = catchAsync(async (req, res, next) => {
    console.log(process.env.JWT_SECRET);

    const { firstName, lastName, username, password, passwordConfirm } =
        req.body;

    if (!firstName || !lastName || !username || !password || !passwordConfirm) {
        return next(
            new AppError("Please provide all fields", HttpStatus.BAD_REQUEST)
        );
    }

    if (password.length < 8) {
        return next(
            new AppError(
                "Password must be at least 8 characters long",
                HttpStatus.BAD_REQUEST
            )
        );
    }

    if (password !== passwordConfirm) {
        return next(
            new AppError("Passwords do not match!", HttpStatus.BAD_REQUEST)
        );
    }
    const { error, user, token } = await authService.signup(
        firstName,
        lastName,
        username,
        password
    );

    // console.log(error, user, token);

    if (error) {
        console.log(error);
        return next(new AppError(error.message, error.code));
    }
    // console.log("HELLO");
    res.status(HttpStatus.CREATED).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    // Check if username and password exist
    if (!username || !password) {
        return next(new AppError("Please provide username and password!", 400));
    }

    const { error, user, token } = await authService.login(username, password);

    if (error) {
        return next(new AppError(error.message, error.code));
    }

    res.status(HttpStatus.OK).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
});
