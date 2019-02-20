exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('User', (tbl) => {
                tbl.increments('userId').unsigned().notNullable().primary()
                tbl.string('name', 50).defaultTo('')
                tbl.string('username', 25).notNullable().unique()
                tbl.string('email', 50).unique().comment('might have permission from oauth2 or not, so not required')
                tbl.string('bio', 160).defaultTo('')
                tbl.specificType('followers', 'INT[]')
                tbl.specificType('following', 'INT[]')
                tbl.string('tagline', 40).defaultTo('')
                tbl.boolean('private').defaultTo(false)
                tbl.boolean('emailVerified').defaultTo(false)
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Tweet', (tbl) => {
                tbl.increments('tweetId').notNullable().unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.string('body', 280).notNullable()
                tbl.binary('image1')
                tbl.binary('image2')
                tbl.binary('image3')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Like', (tbl) => {
                tbl.increments('likeId').notNullable().unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('tweet_id').references('Tweet.tweetId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('reply', (tbl) => {
                tbl.increments('replyId').notNullable().unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('tweet_id').references('Tweet.tweetId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')                
                tbl.string('body', 280).notNullable()
                
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('retweet', (tbl) => {
                tbl.increments('retweetId').notNullable().unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('tweet_id').references('Tweet.tweetId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')                
                tbl.string('body', 280).notNullable().defaultTo('')
                tbl.binary('image1')
                tbl.binary('image2')
                tbl.binary('image3')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Follower', (tbl) => {
                tbl.integer('followed_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('follower_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Message', (tbl) => {
                tbl.increments('messageId').unsigned().notNullable().primary()
                tbl.integer('sent_by_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('recipient_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.binary('image1')
                tbl.binary('image2')
                tbl.binary('image3')
                tbl.timestamps(true, true)
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
        knex.schema.dropTableIfExists('Message'),
        knex.schema.dropTableIfExists('Follower'),
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