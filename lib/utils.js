const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
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

const issueJWTVerification = (email)=>{
    const expiresIn = '1D'
    const payload = {
        sub: email,
        iat: Date.now()
    }
    const signedToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: expiresIn})
    return {
        token:signedToken,
        expires: expiresIn
    }
}
const sendVerificationMail = (email)=>{
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.PASSWORD
        }
    })
    const confirmationCode = issueJWTVerification(email).token
    transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Please Verify Your Email",
        html:`<h1>Email Confirmation</h1>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8000/user/verify/${confirmationCode}> Click here</a>
        </div>`
    })
}

module.exports.createPassword = createPassword
module.exports.createSalt = createSalt
module.exports.validPassword = validPassword
module.exports.issueJWT = issueJWT
module.exports.sendVerificationMail = sendVerificationMail