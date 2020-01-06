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
const compression = require('compression')
const config = require('config');

process.on('uncaughtException', (ex) => {
    console.log(ex.message, ex)
});

process.on('unhandledRejection', (ex) => {
    console.log(ex.message, ex)
});

mongoose.connect(config.get('db'), {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log(`Connected to ${config.get('db')}`) })
    .catch(() => { console.log('Failed to connect to DataBase') });

if (process.env.NODE_ENV == 'production') {
    app.use(helmet());
    app.use(compression());
}
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



