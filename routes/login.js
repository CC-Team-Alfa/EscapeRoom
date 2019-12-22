const express = require('express');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const LoginStrategy = require('../middleware/passport-strategies').LoginStrategy;

const route = express.Router();

passport.use(LoginStrategy);

route.post('/', passport.authenticate('local', {session: false}), (req, res) => {
    //token będzie w  'req.user.token'
    res.setHeader('x-Auth-Token', req.user.token);
    return res.send('Logged in');
});

module.exports = route;