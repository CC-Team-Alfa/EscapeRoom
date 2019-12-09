const config = require('config');
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json());
app.use('/', home);

mongoose.connect(config.get('db.first_part_name') + config.get('db.password') + config.get('db.second_part_name'))
    .then(() => { console.log('conected do db') })
    .catch(() => { console.log('coś poszło nie tak, możliwe że chodzi o brak przypisania twojego IP do listy IP z których można uzyskać dostęp do bazy danych') })


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`open in your browser: http://localhost:${port}/`)
});



