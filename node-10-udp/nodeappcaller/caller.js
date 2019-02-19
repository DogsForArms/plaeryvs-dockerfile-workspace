'use strict';

var PORT = 33333;

// At one point this was the IP address of a container running the nodeapp image
//var HOST = '20.37.137.149';

// Currently, 127.0.0.1 -- for when nodeapp container is running on my machine
var HOST = '127.0.0.1';

var dgram = require('dgram');

var client = dgram.createSocket('udp4');

setInterval( function () {
    var messageStr = 'the time is ' + Date.now();
    var message = new Buffer(messageStr);
    client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST + ':' + PORT + ' message: ' + messageStr);
    });
}, 1000)