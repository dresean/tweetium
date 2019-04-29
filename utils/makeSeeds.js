const faker = require('faker');

// limits string length output from faker

const makeString = () => {
const maxLength = 280
let str = faker.lorem.paragraph()
    if (str.length > maxLength) {
        str = str.slice(0, maxLength - 1)
    }
    return str
}

// generate fake data, each function 
// simply returns an object 

const fakeUser = (number) => {
    let passwordString = faker.internet.password()
    console.log(`password for user ${number}: \n\n\n ${passwordString} \n`)
    return {
        userId: number,
        name: faker.name.firstName(),
        username: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLowerCase(),
        bio: faker.lorem.sentence(),
        website: 'https://google.com',
        private: faker.random.boolean(),
        emailVerified: faker.random.boolean(),
        password: faker.internet.password()
    }
}

const fakeTweet = (number) => {
    const randomNumber = () => Math.floor(Math.random() * 100)
    const text = randomNumber() > 50 ? faker.image.imageUrl() : ''
    return {
        tweetId: number,
        user_id: number,
        likes: randomNumber(),
        retweets: randomNumber(),
        replies: randomNumber(),
        content: makeString(),
        name: faker.name.firstName(),
        username: faker.internet.userName(),
        image: text
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
        content: makeString()
    }
}

const fakeReplyRetweet = (number) => {
    return {
        retweetId: number,
        user_id: number,
        reply_id: number,
        content: makeString()
    }
}

const fakeRetweet = (number) => {
    return {
        retweetId: number,
        user_id: number,
        tweet_id: number,
        content: makeString()
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
        content: faker.lorem.paragraph()
    }
}

// accepts a function above
// if only a function passed, multiply object 35 times
// if 2 arguments passed, multiply object x times
// if 3 arguements passed set start and end to object multiplication

const multiply = (cb, ...rest) => {
    let i
    let condition
    const arr = []
    switch(rest.length) {
        case 2:
        i = rest[0]
        condition = rest[0] + rest[1]
        break;
        case 1:
        i = 0
        condition = rest[0]
        break;
        default:
        i = 0
        condition = 35
        break;
    }
    for(i; i <= condition; i++) {
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
    fakeReplyRetweet,
}