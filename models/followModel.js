const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "A follower must be specified"],
    },
    following: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "A following must be specified"],
    },
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
