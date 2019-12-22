const express = require('express');
const {User, validate} = require('../database/userCollection')
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/', async function(req, res) {
    const result = validate(req.body);
    if(result.error) {
        res.setHeader('regStatus', 'Invalid user data.')
        return res.status(400).send();
    }

    let userCheckForEmail = await User.findOne({email: req.body.email});
    let userCheckForUsername = await User.findOne({username: req.body.username});

    if(userCheckForEmail || userCheckForUsername) {
        res.setHeader("regStatus", "User already registered.")
        return res.status(400).send();
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedP = await bcrypt.hash(req.body.password, salt);

        user = new User({username: req.body.username,
                        email: req.body.email,
                        password: hashedP});

        user.save()
            .then(function() {
                res.setHeader("userId", user._id);
                return res.status(201).send("Registerd Succesfully. Now Log in dumbass");
            })
            .catch(function (err) {
                console.log(err);
                res.setHeader("regStatus", "Database error");
                return res.status(404).send();
            });
    }
});

module.exports = router;