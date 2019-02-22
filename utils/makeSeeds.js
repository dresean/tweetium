const faker = (number) => require('faker');


const fakeUser = (number) => {
    return {
        userId: number,
        name: faker.name.firstName(),
        username: faker.internet.username(),
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
        body: faker.lorem.paragraph(),
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
        body: faker.lorem.paragraph()
    }
}

const fakeRetweet = (number) => {
    return {
        retweetId: number,
        user_id: number,
        tweet_id: number,
        body: faker.lorem.paragraph()
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

module.exports = {
    fakeUser,
    fakeTweet,
    fakeRetweet,
    fakeFollow,
    fakeMessage,
    fakeReply,
    fakeLike
}