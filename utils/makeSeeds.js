const faker = (number) => require('faker');


const fakeUser = (number) => {
    return {
        userId: number,
        name: faker.name.firstName(),
        username: faker.internet.username(),
        email: ,
        bio: faker.lorem.,
        tagline: faker.lorem.words(),
        private: faker.random.boolean(),
        emailVerified: faker.random.boolean()

    }
}

const fakeTweet = (number) => {

}

const fakeLike = (number) => {

}

const fakeReplu = (number) => {

}

const fakeRetweet = (number) => {

}

const fakeFollower = (number) => {

}

const fakeMessage = (number) => {

}

