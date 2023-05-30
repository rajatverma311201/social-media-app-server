const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
            trim: true,
            minlength: [4, "A username must have at least 4 characters"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "A user must have a password"],
            minlength: [8, "A password must have at least 8 characters"],
            select: false,
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
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
