const Joi = require('joi');
const mongoose = require('mongoose');

const roomTermSchema = new mongoose.Schema({
    room: {
        type: Number,
        required: true,
    },
    term: {
        type: Date,
        required: true
    }
})

const roomTerm = mongoose.model('roomTerm', roomTermSchema);

function validateRoomTerm(roomTerm) {
    const schema = {
        username: Joi.string().min(6).max(21).required().unique(),
        email: Joi.string().min(6).max(21).required().unique(),
        password: Joi.string().min(8).max(1000).required()
    }

    return Joi.validate(roomTerm, schema);
}

exports.roomTerm = roomTerm;
exports.validate = validateRoomTerm;
