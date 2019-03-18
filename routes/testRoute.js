const express = require('express')
const Router = express.Router()
const { serverError, clientError, success, redirection } = require('../utils/statusCodes')
const { getTweetCount } = require('../controllers/testController')

Router
.get('/users/:username/tweets', (req, res) => {
    const username = req.params.username
    const userId = req.userId

    return getTweetCount(userId)
    .then(count => {
        console.log('tweetCount fetched', count)
        res
        .status(success.ok)
        .json({
        Message: 'Successfully fetched count!',
        count: Number(count[0]['count'])
        })
    })

})
module.exports = Router