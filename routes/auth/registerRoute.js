const express = require('express')
const Router = express.Router()
const { success, serverError, clientError, redirection } = require('../../utils/statusCodes')
const { hashPassword, createUser } = require('../../controllers/auth/registerController')

// checks if a user exists in the database by email and username, if not, creates a new user
Router.post('/register', (req, res) => {
    // extract the user input, make lowercase
    let { email, username, password } = req.body
    req.body.email = email.toLowerCase()
    req.body.username = username.toLowerCase()
    email = req.body.email
    username = req.body.username

    //check for empty input
    if(!username || !email || !password) {
        return res
        .status(clientError.badRequest)
        .json({Message: 'Please fill the entire form to continue'})
    }

    return hashPassword(password)
    .then(hashedPassword => {
        req.body.password = hashedPassword
        return createUser(req.body)
    })
    .then(user => {
        console.log('user created! \n', user)
        res.status(success.created)
        return res.json({Message: 'Account successfully created!'})
    })
    .catch(err => {
        return errorTypes(err, res)
    })
})

// handle database errors thrown on bad request and erroneous error
const errorTypes = (err, res) => {
        if (err.constraint) {
        switch(err.constraint) {
            case 'user_username_unique':
            res.status(clientError.badRequest)
            res.json({Message: 'That username is taken!'})
            console.log('That username is taken!')
            break
            case 'user_email_unique':
            res.status(clientError.badRequest)
            res.json({Message: 'That email is taken!'})
            console.log('That email is taken!')
            break
            default:
            res.status(serverError.internalServerError)
            res.json({Message: 'There was a problem processing your request, please try again'})
            console.log('There was an unknown error with the database', err)
            break
        }
    }
    else {
        console.log('There was an error! \n', err)
        return res
        .status(serverError.internalServerError)
        .json({Message: 'There was a problem processing your request, please try again'})
    }
}
module.exports = Router