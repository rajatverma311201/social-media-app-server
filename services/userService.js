const User = require("../models/userModel");

const handlerFactoryService = require("./handlerFactoryService");

exports.getAllUsers = async () => await handlerFactoryService.getAll(User)();

exports.getUser = async (id) => await handlerFactoryService.getOne(User)(id);

exports.createUser = async (body) =>
    await handlerFactoryService.createOne(User)(body);

exports.updateUser = async (id, body) =>
    await handlerFactoryService.updateOne(User)(id, body);

exports.deleteUser = async (id) =>
    await handlerFactoryService.deleteOne(User)(id);
