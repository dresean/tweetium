const express = require('express')
const Router = express.Router()
const { success, serverError, clientError, redirection } = require('../../utils/statusCodes')
const { findEmail, findUsername, createToken, createUser, hashPassword } = require('../../controllers/auth/signupController')


Router
.post('/signup', (req, res) => {
    let { email, username, password } = req.body
    if(!email || !username || !password){
       return res
        .status(clientError.badRequest)
        .json({Message: "Please fill all fields to continue"})
    } 
    return findEmail(email)
    .then( response => {
        if(response.length > 0) {
            res.status(clientError.unauthorized)
            .json({Message: "That email is taken!", response})
        }
        return findUsername(username)
    })
    .then( response => {
        if(response.length > 0) {
            console.log(response.length)
            res.status(clientError.unauthorized)
            .json({Message: "That username is taken!", response})
        }
        return hashPassword(password)
    })
    .then( hashedPassword => {
        req.body.password = hashedPassword
        return createUser(req.body)
    })
    .then(user => {
        console.log('user successfully created!', user)
        return createToken(user)
    })
    .then(token => {
        console.log('token successfully created!')
        res
        .status(success.created)
        .json({Message: "Account created successfully!", token})
    })
    .catch(err => {
    console.log(err)
    res.status(serverError.internalServerError)
    .json({Message: "There as a problem processing your request, please try again later.", err})
    })
})


module.exports = Router