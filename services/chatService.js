const Chat = require("../models/chatModel");

const handlerFactoryService = require("./handlerFactoryService");

exports.getAllChats = async () => await handlerFactoryService.getAll(Chat)();

exports.getChat = async (id) => await handlerFactoryService.getOne(Chat)(id);

exports.createChat = async (body) =>
    await handlerFactoryService.createOne(Chat)(body);

exports.updateChat = async (id, body) =>
    await handlerFactoryService.updateOne(Chat)(id, body);

exports.deleteChat = async (id) =>
    await handlerFactoryService.deleteOne(Chat)(id);
