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
    const username = req.params.username
    const userId = req.userId
    let { email, password } = req.body
    email = req.body.email.toLowerCase()

    console.log(' in delete route \n \n \n \n req.email', req.email)
    console.log('req.userId', req.userId)
    console.log('req.username', req.username)
    
    return getUserByEmail(email)
    .then(user => {
        console.log("the user \n\n\n\n", user)
        if(!user || email !== currentUserEmail) {
            res
            .status(clientError.notFound)
            .json({
                Message: 'That email is incorrect, please try again'
            })
        }
        return verifyPassword(password, user)
    })
    .then(passwordMatch => {
        if(!passwordMatch) {
            res
            .status(clientError.unauthorized)
            .json({
                Message: 'Incorrect password, please try again'
            })
        }
        return deleteUser(userId)
    })
    .then(response => {
        console.log(response)
        removeAuth(req)
        res
        .status(success.resetContent)
        .json({
            Message: 'Account successfully deleted! See you later!'
        })
    })
    .catch(err => {
        console.log('There was an error deleting the account', err)
        res
        .status(serverError.internalServerError)
        .json({
            Message: 'There was an error deleting the account, please try again later.'
        })
    })
})

module.exports = Router