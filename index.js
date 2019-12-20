const express = require('express')
const app = express();
const mongoose = require('mongoose');
const home = require('./routes/home');
const login = require('./routes/login');

app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost/EscapeRoom', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('Conected do db') })
    .catch(() => { console.log('coś poszło nie tak') });

app.use(express.json());
app.use('/', home);
app.use('/login', login);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    console.log(`Open in your browser: http://localhost:${port}/`)
});



