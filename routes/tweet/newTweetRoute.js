const express = require('express')
const Router = express.Router()
const { success, clientError, serverError, redirection } = require('../../utils/statusCodes')
const { newTweet, checkDuplicate, incrementTweetCount } = require('../../controllers/tweet/newTweetController')

// check auth
// post tweet if not duplicate

Router
.post('/user/:username/tweet', (req, res) => {
    const { content } = req.body
    const userId = req.userId
    const username = req.params.username
    const name = req.name
    const avatar = req.avatar

    let duplicates

    if(!content) {
        return res.status(clientError.badRequest).json({
            Message: 'Please enter text or an image to post a tweet.'
        })
    }

    if(username !== req.username) {
        return res.status(clientError.unauthorized).json({
            Message: 'You are not authorized to do this.'
        })
    }
    checkDuplicate(userId, content)
    .then(duplicateCount => {
        duplicates = Number(duplicateCount[0]['count'])
        if (duplicates > 0) {
            return res.status(clientError.badRequest).json({Message: 'You already said that. Please say something new!'})
        } else {
            return incrementTweetCount(userId)
            .then(response => {
            return newTweet(req, name, avatar, username)
            })
            .then(response => {
            return res.status(success.created).json({Message: 'Tweet successfully posted!', Tweet: response})
            })
            .catch(err => {
            console.log('There was an error \n', err, '\n', err.message)
            return res.status(serverError.internalServerError).json({Message: 'There was a problem posting your tweet, please try again later.'})
            })
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(serverError.internalServerError).json({Message: 'There was an error processing your request, please try again later.'})
    })
})

module.exports = Router
