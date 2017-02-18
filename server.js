'use strict';

var data = require('./data.js');
const express = require('express');

const  app = express();

app.use(express.static(__dirname));
app.listen(3000);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html')
});

app.get('/photos', function(request, response) {
   response.send(JSON.stringify((data.photos)))
});

console.log('Server running on port 3000');