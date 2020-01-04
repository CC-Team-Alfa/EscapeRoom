const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const home = require('./routes/home');
const login = require('./routes/login');
const register = require('./routes/register');
const reservation = require('./routes/reservation');

app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost/EscapeRoom', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('Conected do db') })
    .catch(() => { console.log('Coś poszło nie tak') });

app.use(express.json());
app.use(cors({ origin: "null" }));
app.use('/', home);
app.use('/login', login);
app.use('/register', register);
app.use('/reservation', reservation);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    console.log(`Open in your browser: http://localhost:${port}/`)
});



