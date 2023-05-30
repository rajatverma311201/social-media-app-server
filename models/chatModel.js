const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        isGroupChat: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
// Define the pre-middleware function to modify isGroupChat
chatSchema.pre("save", function (next) {
    const participantsCount = this.participants.length;

    // Set isGroupChat to true if there are more than two participants
    if (participantsCount > 2) {
        this.isGroupChat = true;
    } else {
        this.isGroupChat = false;
    }

    next();
});

chatSchema.statics.getChatsByUserId = async function (userId) {
    try {
        const chats = await this.find({ participants: { $all: [userId] } });
        return chats;
    } catch (err) {
        console.log(err);
    }
};

chatSchema.statics.getChatByParticipants = async function (participants) {
    try {
        const chat = await this.findOne({
            participants: {
                $size: participants.length,
                $all: participants,
            },
        });

        return chat;
    } catch (err) {
        console.log(err);
    }
};

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
