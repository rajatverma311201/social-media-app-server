const Follow = require("../models/followModel");

const handlerFactoryService = require("./handlerFactoryService");

exports.getAllFollows = async () =>
    await handlerFactoryService.getAll(Follow)();

exports.getFollow = async (id) =>
    await handlerFactoryService.getOne(Follow)(id);

exports.createFollow = async (body) =>
    await handlerFactoryService.createOne(Follow)(body);

exports.updateFollow = async (id, body) =>
    await handlerFactoryService.updateOne(Follow)(id, body);

exports.deleteFollow = async (id) =>
    await handlerFactoryService.deleteOne(Follow)(id);
