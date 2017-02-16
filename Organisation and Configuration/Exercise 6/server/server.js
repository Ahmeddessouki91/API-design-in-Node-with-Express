const express = require('express');
const app = express();
const api = require('./api/api');

// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api', api);
// set up global error handling
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send('Something broke');
});

// export the app for testing
module.exports = app;
