const express = require('express')
const Router = express.Router()
const { upload } = require('../../services/awsUpload')
const { success, clientError, serverError } = require('../../utils/statusCodes')
const { incrementTweetCount, postTweetWithImage } = require('../../controllers/tweet/newPicTweetController')

const singleImage = upload.single('image')
const multipleImages = upload.array('image', 3)

Router.post('/user/:username/tweet-upload', (req, res) => {
    const username = req.params.username
    const userId = req.userId
    const currentUsername = req.username
    const { content } = req.body
    let theImageFile

    if(!userId || username !== currentUsername) {
        return res.status(clientError.unauthorized).json({Message: 'You must be logged in to do that.'})
    }

    return singleImage(req, res, (err, pic) => {
        if(err) {
            console.log('There was an error uploading the image \n\n\n', err)
            return res.status(serverError.internalServerError)
        }
        theImageFile = req.file
        console.log(theImageFile)

        return incrementTweetCount(userId)
            .then(() => {
            return postTweetWithImage(content, userId, theImageFile.location, req)
            })
            .then(response => {
            console.log('Tweet successfully posted!')
            return res.status(success.created).json({Message: 'Tweet successfully posted!', response})
        })
        .catch(err => {
        console.log('There was an error. \n\n\n', err)
        return res.status(serverError.internalServerError).json({Message: 'There was a problem posting your tweet, please try again later.'})
    })
        // return res.status(success.created).json({'imageUrl': req.file.location, content})
    })
})

module.exports = Router



module.exports = Router

