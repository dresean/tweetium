const { getUser, verifyPassword } = require('../../controllers/auth/loginController');
const { success, clientError, serverError, redirection } = require('../../utils/statusCodes')
const { findEmail, findUser, createToken } = require('../../controllers/User')
const express = require('express')
const Router = express.Router()


Router
.post('/login', (req, res) => {
  let verifiedUser
  const { email, password } = req.body
  console.log("verified User", verifiedUser)

  return getUser(email)
  .then( user => {
    console.log("found user", user)
    if(!user) {
      res
      .status(clientError.notFound)
      .json({
        Message: `No user with the email ${email} found, please try again or signup.`
      })
    }
    
    verifiedUser = user
    console.log("verified User", verifiedUser)

    return verifyPassword(password, user)
  })
  .then( response => {
    console.log("Correct password?", response)
    if(!response) {
      res
      .status(clientError.unauthorized)
      .json({Message: "password incorrect, please try again"})
    }
    console.log("creating token")

    return createToken(verifiedUser)
  })
  .then( token => {
    console.log("token created!", token)
    res
    .status(success.ok)
    .cookie('token', token)
    .json({
      Message: `Successfully logged in! welcome back ${verifiedUser.username}!`,
      token
    })
  })
  .catch(err => {
    console.log(err)
    res.status(clientError.notFound)
    .json(err)
  })
})

module.exports = Router