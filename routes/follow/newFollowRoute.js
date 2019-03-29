const express = require('express')
const Router = express.Router()
const { clientError, serverError, success } = require('../../utils/statusCodes')
const { checkDuplicateFollow, findUser, incrementFollowers, incrementFollowing, insertFollower }
= require('../../controllers/follow/newFollowController')

// finds the user that's about to be followed, checks to see
// if the current user is already following them, then follows the user

Router.post('/users/:username/follow', (req, res) => {
    const { followedId } = req.body
    const followerId = req.userId
    const username = req.param.username
    console.log('followerId \n\n\n\n', followerId)
    console.log()
    let following
    if(!followerId || followerId === undefined) {
        return res.status(clientError.unauthorized).json({Message: 'You must be logged in to do that.'})
    }

    findUser(followedId)
    .then(user => {
        console.log('found user \n', user)
        following = user[0]['username']
    })
    .catch(err => {
        console.log(err)
    })

    checkDuplicateFollow(followerId, followedId)
    .then(duplicate => {
        console.log('duplicate follower? \n', duplicate)
        if(duplicate.length > 0) {
            return res.status(clientError.badRequest).json({Message: `You are already following @${following}`})
        }
        })
    .catch(err => {
        console.log(err)
    })

    return insertFollower(followerId, followedId)
    .then(followId => {
        console.log('the follow id', followId)
        return incrementFollowing(followerId)
    })
    .then(response => {
        console.log('Incremented following?', success)
            return incrementFollowers(followedId)
    })
    .then(response => {
            return res.status(success.ok).json({Message: `You are now following ${following}`})
    })
    .catch(err => {
        console.log('There was an error', err)
        return res.status(serverError.internalServerError).json({Message: 'There was a error while trying to follow this user, please try again.'})
    })
})

module.exports = Router