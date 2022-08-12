const socket = io()
const initialize = async()=>{
    const response = await fetch('/user')
    const data = await response.json()
    socket.emit("user-joined", data.userId)
    const messageRes = await fetch('/messages')
    const messages = await messageRes.json()
    console.log(messages)
    for(let i=0; i<messages.length; i++){
        let messageObj = messages[i];
        var position = "left"
        if(messageObj.senderId == data.userId){
            position = "right"
            appendMessage("You: "+messageObj.text, position)
        }
        else{
            appendMessage(messageObj.senderName+": "+messageObj.text, position)
        }
    }
    return data.userId
}
var userId = null
initialize().then((res)=>{
    userId = res
    console.log(userId)
})

const messageForm = document.getElementById("send-container")
const messageInp = document.getElementById("messageInp")
const messageContainer = document.querySelector('.container')

const appendMessage = (message, position)=>{
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    if(message!=""){
        messageContainer.append(messageElement)
    }
}

socket.on("receive", ({message, name})=>{
    console.log("InOnReceive")
    console.log(name+" "+message)
    appendMessage(name+": "+message, 'left')
})

messageForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const message = messageInp.value
    messageInp.value=""
    socket.emit("send", message)
    appendMessage("You: "+message, 'right')
})


