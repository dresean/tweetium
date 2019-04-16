const express = require('express')
const Router = express.Router()
const { upload } = require('../../services/awsUpload')
const { success, clientError, serverError } = require('../../utils/statusCodes')


const singleImage = upload.single('image')
const multipleImages = upload.array('image', 3)

Router.post('/user/:username/tweet-upload', (req, res) => {
    const username = req.params.username
    const userId = req.userId
    const currentUsername = req.username
    const { content } = req.body

    if(!userId || username !== currentUsername) {
        return res.status(clientError.unauthorized).json({Message: 'You must be logged in to do that.'})
    }

    return singleImage(req, res, (err, pic) => {
        if(err) {
            console.log('There was an error uploading the image \n\n\n', err)
            return res.status(serverError.internalServerError)
        }
        return res.status(success.created).json({'imageUrl': req.file.location, content})
    })
})

module.exports = Router
//code above works flawlessly, however, nothing is saved to the database

// TODO add code below and insert the upload as 'image' in the Tweet Table.

// return incrementTweetCount(userId)
//         .then(() => {
//         return postTweetWithImage(content, userId, imageUrl, req)
//         })
//         .then(response => {
//         console.log('Tweet successfully posted!')
//         return res.status(success.created).json({Message: 'Tweet successfully posted!', response})
//     })
//     .catch(err => {
//         console.log('There was an error. \n\n\n', err)
//         return res.status(serverError.internalServerError).json({Message: 'There was a problem posting your tweet, please try again later.'})
//     })
module.exports = Router

