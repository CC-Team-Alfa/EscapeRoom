const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Login: post /login \r\n Register: post /register \r\n See this week dates: get /roomsdates/0 \r\n Make reservation: post /reservation \r\n See account info: /account/:username')
});

module.exports = router;