const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    itemId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const vibeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 100 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [ itemSchema ],
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Vibe', vibeSchema)