const express = require('express')
const { serverError } = require('../utils/statusCodes')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const withAuth = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        res
        .status(clientError.unauthorized)
        .json({
            Message: "You must be logged in to view this page."
        })
    } 
    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            console.log("An error occurred \n", err)
            return res
            .status(serverError.internalServerError)
            .json({
                Message: "There was a problem authenticating your credentials, please try again later"
            })
        }
        req.userId = decoded.userId
        req.email = decoded.email
        next()
    })
}

module.exports = withAuth