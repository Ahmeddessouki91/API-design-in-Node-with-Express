// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let lions = [];
let id = 0;

// TODO: make the REST routes to perform CRUD on lions
app.get('/lions', (req, res) => {
    res.json(lions);
});

app.get('/lions/:id', (req, res) => {
    const lion = _.find(lions, {id: req.params.id});
    return res.json(lion || {});
});

app.post('/lions', (req, res) => {
    const lion = req.body;

    lion.id = id++ + '';
    lions = lions.concat(lion);

    return res.json(lion);
});

app.put('/lions/:id', (req, res) => {
    const updatedLion = req.body;
    const updateIndex = _.findIndex(lions, {id: req.params.id});

    if (!lions[updateIndex]) {
        // No lion so return
        res.send();
    } else {
        lions = [...lions.slice(0, updateIndex), updatedLion, ...lions.slice(updateIndex + 1)];
        return res.json(updatedLion);
    }
});

app.delete('/lions/:id', (req, res) => {
    const removeIndex = _.findIndex(lions, {id: req.params.id});

    if (!lions[removeIndex]) {
        // No lion so return
        res.send();
    } else {
        const deletedLion = lions[removeIndex];
        lions = [...lions.slice(0, removeIndex), ...lions.slice(removeIndex + 1)];
        return res.json(deletedLion);
    }
});

app.listen(3000);
console.log('on port 3000');
