const express = require('express')
const { clientError, serverError } = require('../utils/statusCodes')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

// middleware for route authorization,
// checks the request headers for auth
// if no auth, send message to client
// if auth, next function
const withAuth = (req, res, next) => {
    const token = req.headers.authorization || false
    if(!token) {
        res
        .status(clientError.unauthorized)
        .json({
            Message: "You must be logged in to view this page."
        })
    } 
    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            res
            .status(serverError.internalServerError)
            .json({
                Message: "There was a problem authenticating your credentials, please try again later"
            })
        }
        console.log("decoded token \n", decoded)
        req.userId = decoded.userId
        req.email = decoded.email
        req.username = decoded.username
        req.name = decoded.name
        req.avatar = decoded.avatar
        req.background = decoded.background
        next()
    })
}

module.exports = withAuth