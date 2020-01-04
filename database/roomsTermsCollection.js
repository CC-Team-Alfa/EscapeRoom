const Joi = require('joi');
const mongoose = require('mongoose');

const roomTermSchema = new mongoose.Schema({
    room: {
        type: Number,
        required: true,
        enum: [1, 2, 3]
    },
    term: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => {
                let hours = [6, 10, 14, 18, 22];
                return hours.some(hour => hour == value.getHours());
            },
            message: "Invalid termin // DB error"
        }
    }
});

const roomTerm = mongoose.model('roomTerm', roomTermSchema);

function validateRoomTerm(roomTerm) {
    const schema = {
        room: Joi.number().allow(1,2,3),
        term: Joi.date().greater(Date.now())
    }

    return Joi.validate(roomTerm, schema);
}

exports.roomTerm = roomTerm;
exports.validate = validateRoomTerm;