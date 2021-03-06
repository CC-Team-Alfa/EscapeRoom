const express = require('express');
const { roomTerm } = require('../database/roomsTermsCollection');

const route = express.Router();

route.get('/:week', async (req, res) => {
    let range = req.params.week*604800000;
    let m = Date.now() + range;
    let weekStart = new Date(m);
    let weekEnd = new Date(m + 604800000);
    const terms = await roomTerm.find()
    .and([{term: {$gte: weekStart}}, {term: {$lte: weekEnd}}])
    .sort({room: 1, term: 1})
    res.send(terms);
});

module.exports = route;