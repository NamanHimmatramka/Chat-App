const User = require('../models/user')
const messageController = require('../controller/messageController')
const usersMap= new Map();

module.exports = (io)=>{
    io.on('connection', (socket)=>{
        console.log('Socket Connected')
    
        socket.on('user-joined', (userId)=>{
            console.log(userId)
            User.findById(userId)
            .then((user)=>{
                usersMap.set(socket.id, user)
                console.log(usersMap)
            })
        })
    
        socket.on('send', (message)=>{
            console.log(usersMap)
            messageController.addMessage(message, usersMap.get(socket.id))
            socket.broadcast.emit('receive', {message: message, name: usersMap.get(socket.id).name})
        })
    })
}