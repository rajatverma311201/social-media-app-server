const catchAsync = require("../utils/catchAsync");
const HttpStatus = require("http-status");
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

const signToken = (id) => {
    // console.log("sign token");
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createJwtToken = (user) => {
    const token = signToken(user._id);
    // console.log("create token");
    return token;
};

exports.signup = async (firstName, lastName, username, password) => {
    const userExist = await User.findOne({ username });
    if (userExist) {
        console.log("user dont exist");
        return {
            error: {
                message: "User already exists!",
                code: HttpStatus.BAD_REQUEST,
            },
        };
    }

    // console.log("user creation");
    const newUser = await User.create({
        firstName,
        lastName,
        username,
        password,
    });
    const token = createJwtToken(newUser);

    newUser.password = undefined;

    return {
        token,
        user: newUser,
    };
};

exports.login = async (username, password) => {
    // const { email, password } = req.body;

    // 1) Check if user exists && password is correct
    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return {
            error: {
                message: "Incorrect username or password",
                code: HttpStatus.UNAUTHORIZED,
            },
        };
    }

    // 2) If everything ok, send token to client
    const token = createJwtToken(user);
    user.password = undefined;

    return {
        token,
        user,
    };
};
