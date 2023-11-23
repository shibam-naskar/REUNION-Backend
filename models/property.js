const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img:{
        type:String,
        require: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['apartment', 'house', 'condo', 'townhouse', 'other']
    },
    fare: {
        type: Number,
        required: true,
    },
    availableFrom: {
        type: Date,
        default: Date.now
    },
    bed: {
        type: Number,
        required: true,
    },
    bathroom: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Properties', PropertySchema);