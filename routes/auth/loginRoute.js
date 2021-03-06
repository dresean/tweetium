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
  if(req.headers.authorization) {
    return res.status(clientError.badRequest).json({Message: 'You are already logged in!'})
  }
    return getUserByEmail(email)
    .then(user => {
      verifiedUser = user[0]
      return verifyPassword(password, verifiedUser)
    })
    .then(passwordCorrect => {
      if(passwordCorrect) {
      return createToken(verifiedUser)
      .then(token => {
        return res.status(success.ok).json({Message: 'Successfully logged in!', token})
      })
      .catch(err => {
        console.log(err)
        return res.status(serverError.internalServerError).json({Message: 'There was a problem logging you in, please try again'})
      })
      } else return res.status(clientError.notFound).json({Message: 'Password incorrect, please try again'})
    })
    
    .catch(err => {
      console.log(err)
      return res.status(serverError.internalServerError).json({Message: 'There was a problem logging you in, please try again.'})
    })
})

module.exports = Router