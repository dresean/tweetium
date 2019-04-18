exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('User', (tbl) => {
                tbl.increments('userId').unsigned().notNullable().primary()
                tbl.string('name', 50).defaultTo('')
                tbl.string('username', 25).notNullable().unique()
                tbl.text('password').notNullable()
                tbl.text('avatar').defaultTo('https://res.cloudinary.com/culterre-llc/image/upload/v1550785903/default_ffmgtg.jpg')
                tbl.text('background').defaultTo('https://res.cloudinary.com/culterre-llc/image/upload/v1554777806/defaultTwitterBackground_ejr0sq.png')
                tbl.string('email', 50).unique().comment('might have permission from oauth2 or not, so not required')
                tbl.string('bio', 160).defaultTo('')
                tbl.text('website').defaultTo('')
                tbl.integer('tweets').unsigned().defaultTo(0)
                tbl.integer('followers').unsigned().defaultTo(0)
                tbl.integer('following').unsigned().defaultTo(0)
                tbl.boolean('private').defaultTo(false)
                tbl.boolean('emailVerified').defaultTo(false)
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Tweet', (tbl) => {
                tbl.increments('tweetId').notNullable().unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.string('content', 280).notNullable()
                tbl.text('image')
                tbl.text('avatar')
                tbl.string('username', 25)
                tbl.string('name', 50)
                tbl.integer('likes').unsigned().defaultTo(0)
                tbl.integer('retweets').unsigned().defaultTo(0)
                tbl.integer('replies').unsigned().defaultTo(0)
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Like', (tbl) => {
                tbl.increments('likeId').notNullable().unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('tweet_id').references('Tweet.tweetId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Reply', (tbl) => {
                tbl.increments('replyId').notNullable().unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('tweet_id').references('Tweet.tweetId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.string('content', 280).notNullable()
                tbl.text('image')
                tbl.text('avatar')
                tbl.string('username', 25)
                tbl.string('name', 50)
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Retweet', (tbl) => {
                tbl.increments('retweetId').notNullable().unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('tweet_id').references('Tweet.tweetId').onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('reply_id').references('Reply.replyId').onDelete('CASCADE').onUpdate('CASCADE')
                tbl.string('content', 280).notNullable().defaultTo('')
                tbl.text('image')
                tbl.text('avatar')
                tbl.string('username', 25)
                tbl.string('name', 50)
                tbl.text('rtAvatar')
                tbl.string('rtUsername', 25)
                tbl.string('rtName', 50)
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Follow', (tbl) => {
                tbl.increments('followId').unsigned().primary()
                tbl.integer('followed_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('follower_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Message', (tbl) => {
                tbl.increments('messageId').unsigned().primary()
                tbl.integer('to_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('from_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.text('content').notNullable()
                tbl.text('image')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('HashtagName', (tbl) => {
                tbl.increments('hashtagNameId').unsigned().primary().notNullable()
                tbl.string('hashtagName', 250).notNullable().unique()
            }),
            knex.schema.createTable('HashtagTweet', (tbl) => {
                tbl.increments('hashtagTweetId').unsigned().primary()
                tbl.integer('hashtagName_id').references('HashtagName.hashtagNameId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('tweet_id').references('Tweet.tweetId').onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('reply_id').references('Reply.replyId').onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('retweet_id').references('Retweet.retweetId').onDelete('CASCADE').onUpdate('CASCADE')
                tbl.string('hashtagName', 250).notNullable()
            })
    ])
    .then(tables => {
        console.log('All tables created successfully! \n', tables)
    })
    .catch(err => {
        console.log('There was a problem creating the tables! \n', err)
    })
}

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('HashtagName'),
        knex.schema.dropTableIfExists('HashtagTweet'),
        knex.schema.dropTableIfExists('Message'),
        knex.schema.dropTableIfExists('Follow'),
        knex.schema.dropTableIfExists('Retweet'),
        knex.schema.dropTableIfExists('Reply'),
        knex.schema.dropTableIfExists('Like'),
        knex.schema.dropTableIfExists('Tweet'),
        knex.schema.dropTableIfExists('User')
    ])
        .then(tables => {
            console.log('All tables dropped! \n', tables)
        })
        .catch(err => {
            console.log('All tables were not dropped successfully! \n', err)
        })
}