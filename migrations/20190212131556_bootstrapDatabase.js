
exports.up = function(knex, Promise) {
    return knex.schema.createTable('User', (tbl) => {
            tbl.increments('userId').unsigned().primary()
            tbl.string('name', 25).notNullable().defaultTo('')
            tbl.integer('age').unsigned().defaultTo(0)
            tbl.timestamps(true, true)
        })
        .then(result => {
            console.log('User table Created! \n', result)
        })
        .catch(err => {
            console.log('User table was not created successfully!', err)
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('User')
        .then(result => {
            console.log('User table Created! \n', result)
        })
        .catch(err => {
            console.log('User table was not created successfully!', err)
        })
};

// FIXME LATER this is going to receive oauth information, require email once data is sent back from github

const createUserTable = () => {
    return knex.schema.createTable('User', (tbl) => {
        tbl.increments('userId').unsigned().notNullable().primary()
        tbl.string('name', 50).defaultTo('')
        tbl.string('username', 25).defaultTo('')
        tbl.string('email', 50).unique().comment('might have permission from oauth2 or not, so not required')
        tbl.text('bio').defaultTo('')
        tbl.string('tagline', 40).defaultTo('')
        tbl.boolean('private').defaultTo(false)
        tbl.boolean('restrictions').defaultTo(false)
        tbl.boolean('emailVerified').defaultTo(false)
        tbl.timestamps(true, true)
    }).then(result => {
        console.log('User table created! \n', result)
    })
    .catch(err => {
        console.log('User table creation failed! \n', err);
    })
}

const createPostTable = () => {
    return knex.schema.createTable('tweet', (tbl) => {
        tbl.increments('tweetId').unsigned().primary()
        tbl.text('body')
        tbl.integer('likes')
        tbl.timestamps(true, true)
    })
}



const createLikeTable = () => {
    return knex.schema.createTable('', (tbl) => {
        tbl.increments('likeId').unsigned().primary()
        tbl.integer('user_id').references('User.userId').notNullabe()
        tbl.integer('post_id').references('Post.postId').notNullable()
        tbl.timestamps(true, true)
    })
    .then(result => {
        console.log('Like table created! \n', result)
    })
    .catch(err => {
        console.log('User table creation failed! \n', err);
    })
}

const createRestrictionsTable = () => {
  
}



const createReplyTable = () => {
    return knex.schema.createTable('reply', (tbl) => {
        tbl.increments('replyId').unsigned().primary()
        tbl.foreign
        tbl.timestamps(true, true)
    })
}

const createRepostTable = () => {
  
}
const createFollowingTable = () => {
  
}

const createMediaTable = () => {
  
}

const createFollowersTable = () => {
  
}

const createNotificationTable = () => {
  
}

const createMessageTable = () => {
  
}

const createHashtagTable = () => {

}
