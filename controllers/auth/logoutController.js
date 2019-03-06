const express = require('express')

const checkAuth = (req) => {
    const token = req.headers.authorization
    return token ? true : false
}

const removeAuth = (req) => {
    return req.headers.authorization = ""
}

module.exports = {
    checkAuth,
    removeAuth
}