const express = require('express');
const {roomTerm, validate} = require('../database/roomsTermsCollection');
const {User} = require('../database/userCollection');
const passport = require('passport');
const {AccesWithJWT} = require('../middleware/passport-strategies')

const router = express.Router();
passport.use(AccesWithJWT);

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log('req.body :', req.body);
    console.log('req.user :', req.user);
    const result = validate(req.body);
    if(result.error) {
        console.log(result.error.message);
        res.setHeader('reservationStatus', 'Invalid termin');
        return res.status(400).send('Invalid termin');
    }
    let reserve = await roomTerm.findOne({ $and: [{room: req.body.room}, {term: req.body.term}]});
    if (reserve) {
        res.setHeader('reservationStatus', 'Reservation already exists');
        res.status(400).send('Reservation already exists');
    } else {
        reserve = new roomTerm({
            room: req.body.room,
            term: req.body.term,
        });
        reserve.save()
            .then(async function() {
                console.log('reserve :', reserve);
                const user = await User.findById(req.user._id);
                user.save();
                user.bookings.push(reserve._id);
                res.setHeader('room', reserve.room);
                res.status(201).send('Ok');
            })
            .catch(function(err) {
                res.setHeader('reservationStatus', 'Database error');
                console.log(err);
                res.status(500).send(err.message);
            })
    }
})

module.exports = router;