const express = require('express');
const {User, validate} = require('../database/user')
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async function(req, res) {
    const result = validate(req.body);
    if(result.error) {
        res.setHeader('regStatus', 'Invalid user data.')
        return res.status(400).send();
    }

    let user = await User.findOne({email: req.body.email});

    if(user) {
        res.setHeader("regStatus", "User already registered.")
        return res.status(400).send();
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedP = await bcrypt.hash(req.body.password, salt);

        user = new User({
            email: req.body.email,
            password: hashedP,
            confirmPassword: hashedP
        })

        user.save()
            .then(function() {
                res.setHeader("userId", user._id)
                return res.status(201).send()
            }
            )
            .catch(function (err) {
                console.log(err);
                res.setHeader("regStatus", "Database error")
                return res.status(404).send()
            })
    }
})

module.exports = router