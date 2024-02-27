const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ideaConnect");

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    reciver: {
        type: mongoose.Schema.ObjectId,
        ref: "chat",
    },
    messageType: String,
    message: String,
    date: {
        type: Date,
        default: Date.now,
    }
})

const messageModel = mongoose.model("message",messageSchema);

module.exports = messageModel;