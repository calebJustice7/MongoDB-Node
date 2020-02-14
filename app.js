const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const routes = require("./routes/routes");
require('dotenv');

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', routes);

const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => console.log('Connected to database on port ' + port));

app.get("/", (req, res) => {
    res.render('index.pug');
})

app.listen(port);