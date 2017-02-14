// TODO: mount the tigers route with a a new router just for tigers
// exactly like lions below
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const morgan = require('morgan');

let lionRouter = require('./lions');
let tigerRouter = require('./tigers');

app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// this is called mounting. when ever a req comes in for
// '/lion' we want to use this router
app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);

app.use(function (err, req, res, next) {
    if (err) {
        console.log(err.message);
        res.status(500).send(err);
    }
});

app.listen(3000);
console.log('on port 3000');
