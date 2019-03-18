const express = require('express')
const Router = express.Router()
const { success, clientError, serverError, redirection } = require('../../utils/statusCodes')
const { newTweet, checkDuplicate } = require('../../controllers/tweet/newTweetController')
const { upload } = require('../../services/awsUpload')

const multiplePictureUpload = upload.array('image', 3)
const singlePictureUpload = upload.single('image')

Router
.post('/user/:username/tweet', (req, res) => {
    const { content } = req.body
    const userId = req.userId
    const username = req.params.username
    let pictureUrl
    // todo add  && !image1 below to the if statement
    if(!content) {
        res
        .status(clientError.badRequest)
        .json({
            Message: 'Please enter text or an image to post a tweet.'
        })
    }

    if(username !== req.username) {
        res
        .status(clientError.unauthorized)
        .json({
            Message: 'You are not authorized to do this. Please try logging in.'
        })
    }

    return checkDuplicate(userId, content)
    .then(duplicateCount => {
        console.log('duplicate tweet count', duplicateCount)
        if(duplicateCount[0]['count'] > 0) {
            res
            .status(clientError.badRequest)
            .json({
                Message: 'You already said that. Please say something new!'
            })
        }
        return newTweet(req)
    })
    // return singlePictureUpload(req, res, (err, pic) => {
    //     if(err) {
    //         console.log('There was an error uploading the picture', err, 'detail: \n \n', err.message, '\n\n')
    //         res
    //         .status(clientError.badRequest)
    //         .json({
    //             Message: 'There was a problem uploading your picture, please make sure it is < 1MB and try again'
    //         })
    //     }
    //     res
    //     .status(success.created)
    //     .json({
    //         Message: 'Tweet posted successfully!',
    //         imageUrl: req.file.location
    //     })
    //     pictureUrl = req.file.location
    //     return newTweet(req, pictureUrl)
    // })
    .then(response => {
        res
        .status(success.created)
        .json({
            Message: 'Tweet successfully posted!',
            response
        })
    })
    .catch(err => {
        console.log('There was an error \n', err, '\n', err.message)
        res
        .status(serverError.internalServerError)
        .json({
            Message: 'There was a problem posting your tweet, please try again later.',
        })
    })
})

module.exports = Router