const express = require('express')
const Router = express.Router()
const { serverError, clientError, success } = require('../../utils/statuscodes')
const { getTweetInfo } = require('../../controllers/retweet/retweetController')

Router.post('/users/:username/tweets/:tweetId/retweet', (req, res) => {
    const tweetId = req.params.tweetId
    const username = req.params.username
    const { content, image } = req.body

    if(!tweetId || !username) {
        return res.status(clientError.badRequest).json({Message: 'Please make sure you are logged in'})
    }
})

// Reply query
/*
SELECT u.username, u.avatar, u.name
FROM User as U
WHERE U.userId = userId


INSERT INTO Reply (user_id, tweetId, content, image, avatar, username, name)
VALUES (userId, tweetId, content, image, avatar, username, name)

Increment replies on tweet
*/