const faker = require('faker');



const maxLength = 280

let str = faker.lorem.paragraph()
    if (str.length > maxLength) {
        str = str.slice(0, maxLength - 1)
    }


    // generate fake data, each function simply returns an object 

const fakeUser = (number) => {
    return {
        userId: number,
        name: faker.name.firstName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),
        tagline: faker.lorem.words(),
        private: faker.random.boolean(),
        emailVerified: faker.random.boolean()
    }
}

const fakeTweet = (number) => {
    return {
        tweetId: number,
        user_id: number,
        body: str
    }
}

const fakeLike = (number) => {
    return {
    likeId: number,
    user_id: number,
    tweet_id: number,
    }
}

const fakeReply = (number) => {
    return {
        replyId: number,
        user_id: number,
        tweet_id: number,
        body: str
    }
}

const fakeRetweet = (number) => {
    return {
        retweetId: number,
        user_id: number,
        tweet_id: number,
        body: str
    }
}

const fakeFollow = (number) => {
    return {
        followed_id: number,
        follower_id: number + 1 
    }
}

const fakeMessage = (number) => {
    return {
        messageId: number,
        to_id: number,
        from_id: number + 1,
        body: faker.lorem.paragraph()
    }
}

// generate the fake data above within a loop
const multiply = (cb) => {
    const arr = []
    for(let i = 0; i <= 35; i++) {
        arr.push(cb(i))
    }
    return arr
}


module.exports = {
    fakeUser,
    fakeTweet,
    fakeLike,
    fakeReply,
    fakeRetweet,
    fakeFollow,
    fakeMessage,
    multiply,
}