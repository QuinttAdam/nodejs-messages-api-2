// create a mongoose schema for messages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    id: {
        type: Number,
        required: false,
    },
    // message is a required string
    message: {
        type: String,
        required: true,
    },
});
// export the model to use it in index.js
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
