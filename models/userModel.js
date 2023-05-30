const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "A user must have a first name"],
        },

        lastName: {
            type: String,
            required: [true, "A user must have a last name"],
        },

        username: {
            type: String,
            required: [true, "A user must have a username"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "A user must have a password"],
            minlength: 8,
        },

        image: {
            type: String,
            default: "default-user.png",
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
