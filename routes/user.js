const router = require('express').Router();
const User = require('../models/user')
const passport = require('passport')
const Utils = require('../lib/utils');
const jwt = require('jsonwebtoken')

router.get('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
    const decodedJwt = jwt.decode(req.cookies['jwt'], {complete: true})
    res.json({success: true, userId: decodedJwt.payload.sub})
})

router.get('/login', (req,res)=>{
    res.sendFile('html/login.html', {root: './client'})
})

router.post('/login', (req,res)=>{
    User.findOne({userName: req.body.userName})
    .then((user)=>{
        if(!user){
            res.json({success: false, msg: "User Not Registered"})
        }
        else{
            const hash = user.password
            Utils.validPassword(hash, req.body.password)
            .then((isValid)=>{
                if(isValid){
                    const newToken = Utils.issueJWT(user)
                    res.cookie('jwt',newToken.token,{
                        httpOnly: true
                    })
                    res.json({success: true, token: newToken.token, expiresIn: newToken.expires, user:user})
                }
                else{
                    res.json({success: false, msg: "Incorrect Password"})
                }
            })
        }
    })
})

router.post('/register', (req, res, next)=>{

    User.findOne({userName: req.body.userName})
    .then((user)=>{
        if(user){
            res.json({success: false, msg: "User already registered"})
        }
        else{
            Utils.createSalt()
            .then((salt)=>{
                Utils.createPassword(req.body.password, salt)
                .then((hashedPassword)=>{
                    const newUser = new User({
                        name: req.body.name,
                        userName: req.body.userName,
                        password: hashedPassword,
                    })
                    try{
                        newUser.save()
                        .then((user)=>{
                            res.json({success:true, msg: "user Saved"})
                        })
                    }
                    catch(err){
                        res.json({success: false, msg: err})
                    }
                })
            })
        }
    })
})

module.exports = router