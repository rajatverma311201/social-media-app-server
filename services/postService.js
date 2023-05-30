const Post = require("../models/postModel");

const handlerFactoryService = require("./handlerFactoryService");

exports.getAllPosts = async () => await handlerFactoryService.getAll(Post)();

exports.getPost = async (id) => await handlerFactoryService.getOne(Post)(id);

exports.createPost = async (body) =>
    await handlerFactoryService.createOne(Post)(body);

exports.updatePost = async (id, body) =>
    await handlerFactoryService.updateOne(Post)(id, body);

exports.deletePost = async (id) =>
    await handlerFactoryService.deleteOne(Post)(id);
