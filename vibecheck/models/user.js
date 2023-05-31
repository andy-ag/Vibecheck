const mongoose = require('mongoose')
const Schema = mongoose.Schema

//TODO add ability to select username

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
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