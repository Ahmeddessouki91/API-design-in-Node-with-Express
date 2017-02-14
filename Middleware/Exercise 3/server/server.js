// TODO: user app.params to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware function to catch and handle errors, register it
// as the last middleware on app


// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const morgan = require('morgan');

let lions = [];
let id = 0;

const updateId = function (req, res, next) {
    // fill this out. this is the route middleware for the ids
    req.lionId = id++ + '';
    next();
};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.param('id', function (req, res, next, id) {
    // fill this out to find the lion based off the id
    // and attach it to req.lion. Rember to call next()
    const lion = _.find(lions, {id: req.params.id});

    if (lion != null) {
        req.lion = lion;
        next();
    } else {
        next(new Error('Oh, feck!'));
        // res.send();
    }
});

app.get('/lions', function (req, res) {
    res.json(lions);
});

app.get('/lions/:id', function (req, res) {
    // use req.lion
    const lion = req.lion;

    res.json(lion || {});
});

app.post('/lions', updateId, function (req, res) {
    let lion = req.body;

    lion.id = req.lionId;
    lions.push(lion);

    res.json(lion);
});


app.put('/lions/:id', function (req, res) {
    let update = req.body;

    if (update.id) {
        delete update.id
    }

    const lion = _.findIndex(lions, {id: req.params.id});

    if (!lions[lion]) {
        res.send();
    } else {
        const updatedLion = _.assign(lions[lion], update);
        res.json(updatedLion);
    }
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3000);
console.log('on port 3000');
