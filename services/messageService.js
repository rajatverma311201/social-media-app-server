const Message = require("../models/messageModel");

const handlerFactoryService = require("./handlerFactoryService");

exports.getAllMessages = async () =>
    await handlerFactoryService.getAll(Message)();

exports.getMessage = async (id) =>
    await handlerFactoryService.getOne(Message)(id);

exports.createMessage = async (body) =>
    await handlerFactoryService.createOne(Message)(body);

exports.updateMessage = async (id, body) =>
    await handlerFactoryService.updateOne(Message)(id, body);

exports.deleteMessage = async (id) =>
    await handlerFactoryService.deleteOne(Message)(id);
