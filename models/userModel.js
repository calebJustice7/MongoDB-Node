const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    first: {
        type: String,
        required: true
    },
    last: {
        type: String 
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('User', schema);