const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');
const error = require('./middleware/error');
const home = require('./routes/home');
const login = require('./routes/login');
const register = require('./routes/register');
const roomsdates = require('./routes/roomsdates');
const reservation = require('./routes/reservation');
const account = require('./routes/account');
const helmet = require('helmet');

process.on('uncaughtException', (ex) => {
    console.log(ex.message, ex)
});

process.on('unhandledRejection', (ex) => {
    console.log(ex.message, ex)
});

app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost/EscapeRoom', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('Conected do db') })
    .catch(() => { console.log('Failed to connect to DataBase') });

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: true }));

app.use('/', home);
app.use('/login', login);
app.use('/register', register);
app.use('/roomsdates', roomsdates);
//protected routes:
app.use('/reservation', reservation);
app.use('/account', account);
//error route:
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    console.log(`Open in your browser: http://localhost:${port}/`)
});



