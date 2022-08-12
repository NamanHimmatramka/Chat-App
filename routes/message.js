const router = require('express').Router();
const messageController = require('../controller/messageController')

router.get('/', (req,res)=>{
    messageController.getAllMessages()
    .then((messages)=>{
        console.log(messages)
        res.json(messages)
    })
})

module.exports = router