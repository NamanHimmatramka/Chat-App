const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderName:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Messages', messageSchema);