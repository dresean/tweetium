# Tweetium
### basically, but not legally, twitter.
## deployed live on [heroku](https://tweetium.herokuapp.com/)

# This api will be able to:
- post, reply to, and retweet tweets
- upload an avatar, and background picture
- upload a picture to tweet with text
- like tweets, replies, and retweets
- direct message other users
- create and search hashtagged tweets
- create, alter, and delete an account
- verify email addresses
- share tweets
- add & search for specific hashtagged tweets
- view a collective timeline of tweets from followed users
- view individual tweet timelines from followed users
- and more


# Required Software
- node 11 or greater
- postgresql
- any API Development Environment, like [Postman](https://www.getpostman.com/)
- package manager like [Yarn](https://yarnpkg.com/en/)
- any database visualization tool like [DBeaver](https://dbeaver.io/)



# Getting Started
### clone the repository down to your machine
### `git clone https://github.com/dresean/tweetium.git`
### the preferred package manager is yarn for this repository
### `yarn global add nodemon`
### `cd` into the freshly cloned directory at its root
### `git branch` to check if you're on the dev branch, if not, use `git checkout dev` to switch branches
### `yarn install` or `yarn i`
### open a new terminal window, `cd` into the root tweetium directory and run `nodemon index.js`
### get back to your previous terminal
### create a `.env` file at the root directory
### fill in the environment variables in the `.env` file that suits your postgresql database needs
### please keep the `SALT` environment variable as is for fast hashing and retrival
```
DEV_DATABASE_USER=[your username]
DEV_DATABASE_NAME=[your database name]
DEV_DATABASE_PASSWORD=[your database password]
SALT=11
JWT_SECRET=[your json web token secret]
```
### once configured, from the root directory, run `knex migrate:latest --env development`
### you are now ready to start making requests to your very own Tweetium database!
### chirp!
###
###
###
###
###
###
### (more documentation coming very soon!)
