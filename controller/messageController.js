const Messages = require('../models/message')

const addMessage = async (message, sender)=>{
    const newMessage = new Messages({
        text: message,
        senderId: sender._id,
        senderName: sender.name
    })
    try{
        const message = await newMessage.save()
    }
    catch(err){
        console.log(err)
    }
}

const getAllMessages = async ()=>{
    var messages = {}
    try{
        const res = await Messages.find()
        messages = res
    }
    catch(err){
        console.log(err)
    }
    return messages
}

module.exports.addMessage = addMessage
module.exports.getAllMessages = getAllMessages