const express = require('express')
const Router = express.Router()
const { clientError, serverError, redirection, success } = require('../../utils/statusCodes')
const { checkAuth, removeAuth } = require('../../controllers/auth/logoutController')
Router
.get('/logout', (req, res) => {
        if(checkAuth(req) === false) {
            res
            .status(clientError.notFound)
            .json({Message: "You are already logged out!"})
            return
        }
        removeAuth(req)
        console.log("auth removed! the auth header: ", req.headers.authorization)
        return res
        .status(success.resetContent)
        .json({
            Message: "You have successfully logged out! See you later!"
        })
    })

module.exports = Router