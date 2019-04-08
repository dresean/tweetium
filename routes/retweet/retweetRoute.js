const express = require('express')
const Router = express.Router()
const { serverError, clientError, success } = require('../../utils/statuscodes')


Router.post('/users/:username/tweets/:tweetId/retweet', (req, res) => {
    const tweetId = req.params.tweetId
    const username = req.params.username
    const { content, image } = req.body
    let 
})