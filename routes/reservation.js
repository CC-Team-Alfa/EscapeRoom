const express = require('express');
const reservation = require('../database/roomsTermsCollectionCollection');

const router = express.Router();

router.post('/', async (req, res) => {
    let exists = false;
    let reserve = await reservation.findOne({ $and: [{room: req.body.room}, {term: req.body.term}]});
    if (reserve) {
        res.setHeader('Reservation_status', 'Reservation already exists');
        res.status(400).send();
    } else {
        reserve = new reservation({
            room: req.body.room,
            term: req.body.term,
        })
        reserve.save()
            .then(function() {
                res.setHeader('room', reserve.room);
                res.status(201).send();
            })
            .catch(function(err) {
                res.setHeader('reservationStatus', 'Database error');
                res.status(404).send();
            })
    }
})

module.exports = router;