const mongoose = require('mongoose');

var VoteSchema = mongoose.Schema({

    postID:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('vote', VoteSchema);