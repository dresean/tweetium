const express = require('express')
const Router = express.Router()
const { clientError, serverError, redirection, success } = require('../../utils/statusCodes')
const { deleteTweet } = require('../../controllers/tweet/deleteTweetController')

Router
.delete('/user/:username/tweets/:id', (req, res) => {
    const username = req.params.username
    const id = req.params.id
    const currentUserId = req.userId

    if(!username || !currentUserId || !id) {
        res
        .status(clientError.badRequest)
        .json({
            Message: 'You are either not signed in, or unauthorized to complete this request, please try again'
        })
    }

    return deleteTweet(id, currentUserId)
    .then(rowsDeleted => {
        console.log('Number of rows deleted: ', rowsDeleted)
        if(rowsDeleted === 0) {
            res
            .status(clientError.notFound)
            .json({
                Message: 'We couldn\'t delete that tweet. That tweet no longer exists.'
            })
        }
        res
        .status(success.ok)
        .json({
            Message: 'Tweet deleted successfully!'
        })
    })
    .catch(err => {
        console.log('There was an error deleting the tweet \n', err, '\n details: \n', err.message)
        res
        .status(serverError.internalServerError)
        .json({
            Message: 'There was an error deleting your tweet, please try again later.'
        })
    })
})


module.exports = Router