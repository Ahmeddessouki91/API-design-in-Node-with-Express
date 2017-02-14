// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require('express'),
      fs = require('fs');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    // fs.readFile('index.html', (err, data) => {
    //     if (err) throw err;
    //     res.end(data)
    // });

    res.sendFile(`${__dirname}/index.html`, (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

const jsonData = {count: 12, message: 'hey'};

app.get('/data', (req, res) => {
    res.json(jsonData);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
