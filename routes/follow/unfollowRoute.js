const express = require('express')
const Router = express.Router()
const { clientError, serverError, success } = require('../../utils/statusCodes')
const { checkIfFollowing, unfollow, decrementFollowers, decrementFollowing } = require('../../controllers/follow/unfollowController')
const { findUser } = require('../../controllers/follow/newFollowController')


Router.delete('/users/:username/unfollow' , (req, res) => {
    const { followedId } = req.body
    const followerId = req.userId
    const username = req.params.username
    let unfollowing

    if(!followerId) {
        return res.status(clientError.unauthorized).json({Message: 'You must be logged in to do this.'})
    }

    findUser(followedId)
    .then(user => {
        console.log('the user to be unfollowed', user)
        unfollowing = user[0]['username']
    })
    .catch(err => {
        console.log(err)
    })

    checkIfFollowing(followerId, followedId)
    .then(duplicate => {
        if(duplicate.length === 0) {
            return res.status(clientError.notFound).json({Message: `You are not following @${unfollowing}`})
        } else {
            return unfollow(followerId, followedId)
                .then(response => {
                    return decrementFollowers(followedId)
                })
                .then(response => {
                    return decrementFollowing(followerId)
                })
                .then(response => {
                    return res.status(success.ok).json({Message: `You have successfully unfollowed @${unfollowing}`})
                })
                .catch(err => {
                    console.log('There was an error unfollowing the user inside catch', err)
                    return res.status(serverError.internalServerError).json({Message: 'There was an error unfollowing the user, please try again'})
                })
        }
    })
    .catch(err => {
        console.log('There was an error unfollowing the user outside catch', err)
        return res.status(serverError.internalServerError).json({Message: 'There was an error unfollowing the user, please try again'})
    })

})

module.exports = Router