const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    hasUsername: {
        type: Boolean,
        required: true
    },
    username: String,
    email: String,
    ownVibes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vibe'
    }],
    likedVibes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vibe'
    }]
}, {
    timestamps: true
})

module.exports  = mongoose.model('User', userSchema)