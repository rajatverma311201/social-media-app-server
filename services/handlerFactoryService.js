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

exports.getOne = (Model) => async (id, popOptions) => {
    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
};
