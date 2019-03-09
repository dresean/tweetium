const express = require('express')
const Router = express.Router()
const { success, serverError, clientError, redirection } = require('../../utils/statusCodes')
const { createUser, hashPassword } = require('../../controllers/auth/registerController')
const { findEmail, findUsername } = require('../../controllers/UserController')

// checks if a user exists in the database by email and username, if not, creates a new user

Router
.post('/register', (req, res) => {
    let { email, username, password } = req.body
    req.body.email = email.toLowerCase()
    req.body.username = username.toLowerCase()
    if(!email || !username || !password) {
        res
        .status(clientError.badRequest)
        .json({Message: "Please fill all fields to continue."})
    } 
    return findEmail(email)
    .then(emailTaken => {
        if(emailTaken.length > 0) {
            res.status(clientError.unauthorized)
            .json({Message: "That email is taken!"})
        }
        return findUsername(username)
    })
    .then(usernameTaken => {
        if(usernameTaken.length > 0) {
            res.status(clientError.unauthorized)
            .json({Message: "That username is taken!"})
        }
        return hashPassword(password)
    })
    .then(hashedPassword => {
        req.body.password = hashedPassword
        return createUser(req.body)
    })
    .then(user => {
        console.log("user successfully created! \n", user)
        res
        .status(success.created)
        .json({Message: "Account created successfully!"})
    })
    .catch(err => {
    console.log(err)
    res.status(serverError.internalServerError)
    .json({Message: "There as a problem processing your request, please try again later.", err})
    })
})


module.exports = Router