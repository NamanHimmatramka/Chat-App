const User = require('../models/user')
const JwtStrategy = require('passport-jwt').Strategy

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const cookieExtractor = (req=>{
    var token = null
    if(req && req.cookies){
        token=req.cookies['jwt']
    }
    // console.log(token)
    return token
})

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: SECRET_KEY
}

module.exports = (passport)=>{
    passport.use(new JwtStrategy(
        options,(jwt_payload, done)=>{
            //console.log(jwt_payload)

            User.findOne({_id: jwt_payload.sub}, (err,user)=>{
                if(err){
                    return done(err,false);
                }
                if(user){
                    return done(null, user)
                }
                else{
                    return done(null,false)
                }
            })
        }
    ))
}