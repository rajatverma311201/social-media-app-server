exports.getMyAll = (Model) => async (userId) => {
    const docs = await Model.find({ user: userId });
    return docs;
};

exports.updateMyOne = (Model) => async (docId, userId, body) => {
    const doc = await Model.findOneAndUpdate(
        { _id: docId, user: userId },
        body,
        {
            new: true,
            runValidators: true,
        }
    );

    return doc;
};

exports.deleteMyOne = (Model) => async (docId, userId) => {
    const doc = await Model.findOneAndDelete({ _id: docId, user: userId });
    return doc;
};

exports.getOne = (Model) => async (id, popOptions) => {
    // console.log("GET ONE", id);
    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    return doc;
};

exports.getAll = (Model) => async () => {
    const docs = await Model.find();
    return docs;
};

exports.deleteOne = (Model) => async (id) => {
    const doc = await Model.findByIdAndDelete(id);
    return doc;
};

exports.updateOne = (Model) => async (id, body) => {
    const doc = await Model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    return doc;
};

exports.createOne = (Model) => async (body) => {
    const doc = await Model.create(body);
    return doc;
};
