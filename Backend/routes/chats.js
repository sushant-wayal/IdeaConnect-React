const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ideaConnect");

const chatSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    reciver: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
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