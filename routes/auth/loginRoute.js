const express = require('express')
const Router = express.Router()
const { clientError, serverError, success } = require('../../utils/statusCodes')
const { getUserByEmail, verifyPassword } = require('../../controllers/auth/loginController')
const { createToken } = require('../../controllers/UserController')

Router.post('/login', (req, res) => {
  let { email, password } = req.body
  let verifiedUser

  req.body.email = email.toLowerCase()
  email = req.body.email

  if(!email || !password) {
    return res.status(clientError.badRequest).json({Message: 'Please fill out all fields to continue.'})
    }

    return getUserByEmail(email)
    .then(user => {
      verifiedUser = user[0]
      console.log('verified user? ', verifiedUser)
      return verifyPassword(req.body.password, verifiedUser)
    })
    .then(passwordCorrect => {
      console.log('Password correct? ', passwordCorrect)
      return createToken(verifiedUser)
    })
    .then(token => {
      console.log('token', token)
      return res.status(success.ok).json({Message: 'Successfully logged in!', token})
    })
    .catch(err => {
      // console.log(err)
      return res.status(serverError.internalServerError).json({Message: 'There was a problem logging you, please check the email and/or password and try again.'})
    })
})

module.exports = Router