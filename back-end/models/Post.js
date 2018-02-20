const mongoose = require('mongoose');

var PostSchema = mongoose.Schema({

    text:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
    },
    vote:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('post', PostSchema);