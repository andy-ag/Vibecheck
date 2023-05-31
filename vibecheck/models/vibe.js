const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
})

const itemSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coords: {
        type: [ Number ],
        required: true
    }
})

module.exports = mongoose.model('Vibe', vibeSchema)