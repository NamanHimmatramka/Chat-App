const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer)
const passport = require('passport')
const cookieParser = require('cookie-parser')

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT

require('./config/socket')(io)
require('./config/database')
require('./config/passport')(passport)
app.use(passport.initialize())

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./client'))
app.use('/user', require('./routes/user'))
app.use('/messages', require('./routes/message'))
app.get('/',passport.authenticate('jwt', {session:false}),(req,res)=>{
    res.sendFile('html/index.html', {root: './client'})
})
httpServer.listen(port, ()=>{
    console.log('Server listening on port '+port)
})