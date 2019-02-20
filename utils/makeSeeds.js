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
    tweetId: number,
    }
}

const fakeReply = (number) => {
    return {
        replyId: number,
        user_id: number,
        
    }
}

const fakeRetweet = (number) => {

}

const fakeFollower = (number) => {

}

const fakeMessage = (number) => {

}

