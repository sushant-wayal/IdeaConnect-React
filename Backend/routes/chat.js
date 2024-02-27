const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ideaConnect");

const chatSchema = mongoose.Schema({
    members: [{
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
        profileImage: String,
        firstName: String,
        lastName: String,
    }],
    lastMessage: {
        type: String,
        default: "No Messages Yet",
    },
    messages: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "message",
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    }
})

const chatModel = mongoose.model("chat",chatSchema);

module.exports = chatModel;