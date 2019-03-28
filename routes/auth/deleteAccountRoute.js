const express = require('express')
const Router = express.Router()

const { removeAuth } = require('../../controllers/auth/logoutController')
const { deleteUser } = require('../../controllers/auth/deleteAccountController')
const { getUserByEmail, verifyPassword } = require('../../controllers/auth/loginController')
const { findEmail } = require('../../controllers/UserController')
const { clientError, serverError, redirection, success } = require('../../utils/statusCodes')


Router
.post('/user/:username/settings/delete-account', (req, res) => {
    const currentUserEmail = req.email
    const username = req.username
    const userId = req.userId

    let { email, password } = req.body
    req.body.email = email.toLowerCase()
    email = req.body.email


    console.log('in delete route:\n\n\n req.email ', req.email)
    console.log('req.userId ', req.userId)
    console.log('req.username ', req.username)

    if(!email || !password) {
        return res.status(clientError.badRequest).json({Message: 'Please fill all fields to continue.'})
    }

    if(!currentUserEmail) {
        return res.status(clientError.forbidden).json({Message: 'You must be logged in to do that.'})
    }
    if(currentUserEmail !== email) {
        return res.status(clientError.unauthorized).json({Message: 'Please enter the correct email.'})
    }
    return getUserByEmail(email)
    .then(user => {
        console.log('made it past getUserEmail')
        console.log("the user \n\n\n\n", user)
        return verifyPassword(password, user[0])
    })
    .then(passwordMatch => {
        console.log('passwords match? ', passwordMatch)
        if(!passwordMatch) {
            return false
        } else {
        return deleteUser(userId)
        }
    })
    .then(response => {
        console.log('the response \n', response)
        if(!response) {
            return res.status(clientError.unauthorized).json({Message: 'Please enter the correct password.'})
        } else if(response === 1) {
        removeAuth(req)
        return res.status(success.resetContent).json({Message: 'Account successfully deleted! See you later!'})
        }
    })
    .catch(err => {
        console.log('There was an error deleting the account', err)
        console.log(err.message)
        return res.status(serverError.internalServerError).json({Message: 'There was an error deleting the account, please check the email and/or password and try again.'})
    })
})


module.exports = Router