'use strict';

var PORT = 33333;
//var HOST = '20.37.137.149';
var HOST = '127.0.0.1';
//var HOST = '0.0.0.0'

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