const express = require('express')
const Router = express.Router()
const { clientError, serverError, redirection, success } = require('../../utils/statusCodes')
const { deleteTweet, decrementTweetCount, checkIfTweetExists } = require('../../controllers/tweet/deleteTweetController')

Router
.delete('/user/:username/tweets/:id', (req, res) => {
    const username = req.params.username
    const tweetId = req.params.id
    const currentUsername = req.username
    const userId = req.userId
    let tweetExists

    if(username !== currentUsername) {
        return res.status(clientError.badRequest).json({ Message: 'You are either not signed in, or unauthorized to complete this request, please try again'})
    }

    checkIfTweetExists(tweetId, userId)
    .then(response => {
        console.log('check if tweet exists response', response)
        if(response.length < 1) {
            return res.status(clientError.badRequest).json({Message: 'That tweet doesn\'t exist.'})
        } else {
            return deleteTweet(tweetId, userId)
                .then(response => {
                return decrementTweetCount(userId)
                })
                .then(response => {
                    return res.status(success.ok).json({Message: 'Tweet deleted successfully!'})
                })
                .catch(err => {
                    console.log('there was an error: \n \n \n', err)
                    return res.status(serverError.internalServerError).json({Message: 'There was a problem deleting your tweet, please try again'})
                })
            }
        })
    .catch(err => {
        (console.log('there was an error'))
        console.log(err)
    })
})



module.exports = Router