const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 21,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1000
    },
    bookings: [Schema.Types.ObjectId]
})

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        username: Joi.string().min(6).max(21).required().unique(),
        email: Joi.string().min(6).max(21).required().unique(),
        password: Joi.string().min(8).max(1000).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
