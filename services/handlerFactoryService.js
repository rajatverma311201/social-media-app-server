const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const HttpStatus = require("http-status");

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const docs = await Model.find();
        res.status(HttpStatus.OK).json({
            status: "success",
            results: docs.length,
            data: {
                docs,
            },
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(
                new AppError(
                    "No document found with that ID",
                    HttpStatus.NOT_FOUND
                )
            );
        }

        res.status(HttpStatus.OK).json({
            status: "success",
            data: null,
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(
                new AppError(
                    "No document found with that ID",
                    HttpStatus.NOT_FOUND
                )
            );
        }

        res.status(HttpStatus.OK).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(HttpStatus.CREATED).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return next(
                new AppError(
                    "No document found with that ID",
                    HttpStatus.NOT_FOUND
                )
            );
        }

        res.status(HttpStatus.OK).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });
