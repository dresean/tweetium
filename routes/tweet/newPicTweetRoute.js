const express = require('express')
const Router = express.Router()
const { upload } = require('../../services/awsUpload')
const { success, clientError, serverError } = require('../../utils/statusCodes')
const { postTweetWithImage, incrementTweetCount } = require('../../controllers/tweet/newPicTweetController')

const singleImage = upload.single('image')

Router.post('/user/:username/tweet-upload', (req, res) => {
    const username = req.params.username
    const userId = req.userId
    const currentUsername = req.username
    const { content } = req.body
    let imageUrl

    if(!userId || username !== currentUsername) {
        return res.status(clientError.unauthorized).json({Message: 'You must be logged in to do that.'})
    }
    singleImage(req, res, (err, pic) => {
        if(err) {
            console.log('There was an error uploading the image \n\n\n', err)
            return res.status(serverError.internalServerError)
        }
        return incrementTweetCount(userId)
        .then(() => {
        return postTweetWithImage(content, userId, req.file.location, req)
        })
        .then(response => {
        console.log('Tweet successfully posted!')
        return res.status(success.created).json({Message: 'Tweet successfully posted!', response})
    })
    .catch(err => {
        console.log('There was an error. \n\n\n', err)
        return res.status(serverError.internalServerError).json({Message: 'There was a problem posting your tweet, please try again later.'})
    })
        // return res.status(success.created).json({'imageUrl': req.file.location, response})
    })
})

module.exports = Router