const express = require('express')
const { getUser, verifyPassword } = require('../../controllers/auth/signinController');
const db = require('../../db');
const { status } = require('../../utils/statusCodes')

const Router = express.Router()

Router
.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if(!email && !password) {
        return res.status()
    }
    return getUser(email)
    .then(user => {
      if (verifyPassword(password)) {
        /* login and redirect to home *//
      }
    })
})
export default Router