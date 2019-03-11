const express = require('express')
const { clientError, serverError } = require('../utils/statusCodes')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

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
        console.log("req.userId", req.userId)
        console.log("req.email", req.email)
        console.log("req.username", req.username)
        next()
    })
}

module.exports = withAuth