const faker = require('faker');

// limits string lenght output from faker

const makeString = () => {
const maxLength = 280
let str = faker.lorem.paragraph()
    if (str.length > maxLength) {
        str = str.slice(0, maxLength - 1)
    }
    return str
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
        body: makeString()
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
        body: makeString()
    }
}

const fakeReplyRetweet = (number) => {
    return {
        retweetId: number,
        user_id: number,
        reply_id: number,
        body: makeString()
    }
}

const fakeRetweet = (number) => {
    return {
        retweetId: number,
        user_id: number,
        tweet_id: number,
        body: makeString()
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

// makes an array of data
// if one param passed, loop 35 times
// if two params passed, loop x times
// if three params passed, start loop at x, and loop y times

// const multiply = (cb, ...rest) => {
//     let i
//     let condition
//     const arr = []
//     if(rest.length === 2){
//         i = rest[0]
//         condition = rest[0] + rest[1]
//     } else if(rest.length === 1 && rest[0] > 0) {
//         i = 0
//         condition = rest[0]
//     } else {
//         i = 0
//         condition = 35
//     }
//     for(i; i <= condition; i++) {
//         arr.push(cb(i))
//     }
//     return arr
// }

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