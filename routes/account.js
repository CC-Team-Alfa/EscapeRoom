const express = require('express');
const { roomTerm } = require('../database/roomsTermsCollection');
const { User } = require('../database/userCollection');
const passport = require('passport');
const { AccesWithJWT } = require('../middleware/passport-strategies')

const router = express.Router();
passport.use(AccesWithJWT);

router.get('/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findById(req.user._id);
    //checking if user exists
    if (!user) {
        return res.status(401).send('User not found');
    }
    //checking if user from token matches user that requests a resource
    if (req.params.username != user.username) {
        return res.status(403).send('Acces denied');
    }
    let summary = {
        username: user.username,
        email: user.email,
        bookings: await Promise.all(user.bookings.map(async (term) => await roomTerm.findById(term).select('room term -_id')))
    };
    return res.send(summary);
});

module.exports = router;