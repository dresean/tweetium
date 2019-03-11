const express = require('express')
const Router = express.Router()
const { tweetCount, followingCount, getUserTweets, followerCount } = require('../../controllers/profile/userProfileController')
const { clientError, serverError, success, redirection } = require('../../utils/statusCodes')
const { findUsername } = require('../../controllers/UserController')

// todo
//send out user information and tweets
// followers and other shit

Router
.get('/users/:username', (req, res) => {
    const username = req.params
    let tweets, followers, following
    const { userId } = req
    const { email } = req
    return findUsername(username)
    .then(response => {
        if(response.length < 1) {
            res
            .status(clientError.notFound)
            .json({
                Message: `Sorry, there is no user with the name ${username}`
            })
        }
        return followerCount(userId)
    })
    .then(response => {
        followers = response
        console.log('The response', response)
        res
        .status(success.ok)
        .json({
            Message: 'follower count successfully displayed',
            response,
            followers : followers
        })
    })
    .catch(err => {
        console.log('There was an error', err)
        res
        .status(serverError.internalServerError)
        .json({
            Message: 'There was an error while trying to fetch this user, please try again'
        })
    })

})
module.exports = Router