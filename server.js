'use strict';

const http = require('http');
const staticServer = require('node-static');
const file = new staticServer.Server('.');
var data = require('./data.js');

http.createServer(function(req, res) {
    if (req.url == '/photos') {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache'
        });

        res.end(JSON.stringify(data.photos))
    } else {
        file.serve(req, res);
    }
}).listen(3000);

console.log('Server running on port 3000');