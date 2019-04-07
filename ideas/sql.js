// JOIN SQL QUERIES
const getFollowers = (followedId) => {
    let query = db('User')
    return query
    .as('U')
    .select('')
}

// Selects all followers thumbnail info
// SELECT U.username,
//     U.name,
//     U.avatar,
//     U.bio,
//     U.background,
//     COUNT(U.followers).as('Followers'),
//     COUNT(U.following).as('Following')
//     FROM User AS 'U'
//     LEFT JOIN Follow AS 'F'
//         ON U.userId = F.follower_id
//         WHERE FollowedId = F.followed_id

// const IsFollowingYou = (followedId, followerId) => {
//     SELECT
// COUNT('*') AS 'Follows You'
// FROM User
// JOIN Follow
//     ON Follow.followed_id = FollowedId
//         HAVING Follow.follower_id = FollowerId
// }

Route:
provides FollowedId in req.body

/*
SELECT U.username,
    U.avatar,
    U.background,
    U.bio,
    U.name,
    U.username,
    U.followers,
    U.following
    FROM User AS 'U'
    LEFT JOIN Follow AS 'F'
    ON U.userId = F.followed_id
    GROUP BY U.date_created DESC;

*/


/*
get people youre following

const { FollowedId } = req.userId

SELECT U.username,
    U.avatar,
    U.background,
    U.bio,
    U.name,
    U.username,
    U.followers,
    U.following
    FROM User AS 'U'
    LEFT JOIN Follow AS 'F'
    ON U.userId = F.followerId
        WHERE F.followedId = FollowedId
    GROUP BY date_create DESC
    LIMIT 10
*/


/* 
TWEETS
Route logic before 

DELETE TWEET
select tweet

DELETE FROM tweet
WHERE Tweet.tweetId = tweetId
AND Tweet.userId = userId

GET ALL TWEETS FROM USER FOLLOWS
ROUTER: const followerId = req.userId
SQL:

WITH following AS (
    SELECT *
    FROM User
    LEFT JOIN Follow
    ON User.userId = Follow.followed_id
    WHERE Follow.follower_id = FollowerId
)
SELECT T.content,
    T.replies
    T.retweets
    T.likes,
    T.retweeted,
    T.replied,
    T.liked,
    following.username,
    following.avatar,
    following.name,
    T.created_at
FROM following
LEFT Tweet AS 'T'
ON following.userId = T.user_id
GROUP BY following.username
ORDER BY created_at DESC
LIMIT 20;

LIKE A TWEET
ROUTE const {tweetId} = req.body
const likedBy - req.userId
SQL
(update like count on tweet, 
    update likes on user tweet with likedBy avi, name, username, bio)

SQL:update like count on tweet

UPDATE tweet 
SET (likes = like + 1)
WHERE Tweet.id = tweetId;

CREATE TABLE Like (
    likeId INTEGER PRIMARY KEY,
    tweet_id INTEGER FOREIGN KEY REFERENCES Tweet(tweetId)
    user_id INTEGER FOREIGN KEY REFERENCES User(userId)
    created_at DATETIME
);


SQL: update likes on user tweet with likedBy avi, name, username, bio
WITH user_info AS (
    SELECT *
    FROM User
)
SELECT user_info.userName
FROM Tweet
LEFT JOIN Like
ON Tweet.tweetId = Like.tweet_id
 WHERE Like.user_id = UserId
 AND user_info.userId = UserId
 GROUP BY 1
 ORDER BY Like.created_at 



FROM tweet
WHERE tweet.tweetId = tweetId


UNLIKE A TWEET
(update like count on tweet, 
    delete likes on user tweet where userId & tweetId)

GET ALL LIKES

SEND MESSAGE

DELETE MESSAGE

GET ALL MESSAGES

SEND REPLY

GET ALL REPLIES

GET USER TWEETS

GET TIMELINE FOLLOWING TWEETS 
DESC

GET SPECIFIC FRIENDS TIMELINE SEARCH





const delete tweet



*/

const 
