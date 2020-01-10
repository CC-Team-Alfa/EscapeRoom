const express = require('express');
const {roomTerm, validate} = require('../database/roomsTermsCollection');
const {User} = require('../database/userCollection');
const passport = require('passport');
const {AccesWithJWT} = require('../middleware/passport-strategies')

const router = express.Router();
passport.use(AccesWithJWT);

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = validate(req.body);
    if(result.error) {
        console.log(result.error.message);
        res.setHeader('reservationStatus', 'Invalid termin');
        return res.status(400).send('Date can not be from the past');
    }
    let reserve = await roomTerm.findOne({ $and: [{room: req.body.room}, {term: req.body.term}]});
    if (reserve) {
        res.setHeader('reservationStatus', 'Reservation already exists');
        res.status(409).send('Reservation already exists');
    } else {
        reserve = new roomTerm({
            room: req.body.room,
            term: new Date(req.body.term),
        });
        console.log('************************************************');
        console.log('req.body.term :', req.body.term);
        console.log('new data req.body.term :', new Date(req.body.term));
        console.log('reserve.term :', reserve.term);
        console.log('local :', reserve.term.toLocaleDateString() + reserve.term.toLocaleTimeString());
        reserve.save()
            .then(async function() {
                const user = await User.findById(req.user._id);
                user.save();
                user.bookings.push(reserve._id);
                res.setHeader('room', reserve.room);
                res.status(201).send(`You have succesfully reserved a termin in room: ${reserve.room} at ${reserve.term}`);
            })
            .catch(function(err) {
                res.setHeader('reservationStatus', 'Database error');
                console.log(err);
                res.status(500).send(err.message);
            })
    }
})

module.exports = router;