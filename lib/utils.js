const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const createSalt = async ()=>{
    const salt = await bcrypt.genSalt(10)
    return salt
}
const createPassword = async(password, salt)=>{
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}
const validPassword = async(password, toCheck)=>{
    const isValid = bcrypt.compare(toCheck, password)
    return isValid
}
const issueJWT= (user)=>{
    const _id = user._id
    const expiresIn = '1D'
    const payload = {
        sub: _id,
        iat: Date.now()
    }
    const signedToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: expiresIn})
    return {
        token:signedToken,
        expires: expiresIn
    }
}

module.exports.createPassword = createPassword
module.exports.createSalt = createSalt
module.exports.validPassword = validPassword
module.exports.issueJWT = issueJWT