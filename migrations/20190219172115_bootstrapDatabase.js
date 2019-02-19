exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('User', (tbl) => {
                tbl.increments('userId').unsigned().notNullable().primary()
                tbl.string('name', 50).defaultTo('')
                tbl.string('username', 25).notNullable().unique()
                tbl.string('email', 50).unique().comment('might have permission from oauth2 or not, so not required')
                tbl.text('bio').defaultTo('')
                tbl.specificType('followers', 'INT[]')
                tbl.specificType('following', 'INT[]')
                tbl.string('tagline', 40).defaultTo('')
                tbl.boolean('private').defaultTo(false)
                tbl.boolean('emailVerified').defaultTo(false)
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Tweet', (tbl) => {
                tbl.increments('tweetId').unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.string('body', 280).notNullable()
                tbl.binary('image1').defaultTo('')
                tbl.binary('image3').defaultTo('')
                tbl.binary('image4').defaultTo('')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Like', (tbl) => {
                tbl.increments('likeId').unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('post_id').references('Tweet.tweetId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('reply', (tbl) => {
                tbl.increments('replyId').unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.string('body', 280).notNullable()
                tbl.binary('image1').defaultTo('')
                tbl.binary('image3').defaultTo('')
                tbl.binary('image4').defaultTo('')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('retweet', (tbl) => {
                tbl.increments('retweetId').unsigned().primary()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.string('body', 280).notNullable()
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Follower', (tbl) => {
                tbl.integer('followed_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('follower_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Media', (tbl) => {
                tbl.increments('mediaId').unsigned().notNullable()
                tbl.integer('user_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.binary('image')
                tbl.timestamps(true, true)
            }),
            knex.schema.createTable('Message', (tbl) => {
                tbl.increments('messageId').unsigned().notNullable().primary()
                tbl.integer('sent_by_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
                tbl.integer('recipient_id').references('User.userId').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
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
        knex.schema.dropTableIfExists('Media'),
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