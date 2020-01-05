const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: "Escape Room App", message: 'Hello World' })
});

module.exports = router;