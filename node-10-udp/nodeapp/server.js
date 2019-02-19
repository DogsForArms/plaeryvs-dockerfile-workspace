'use strict';

var PORT = 33333;

// // INCORRECT, when hosted inside a container, listening to 127.0.0.1 is like listening to yourself, nothing is ever captured
//var HOST = '127.0.0.1';

// Listen to only the dynamically assigned IP of this container (Assumes the docker engine will assign this ip address to this container)
//var HOST = '172.17.0.2';

// Listen to all IP's
var HOST = '0.0.0.0';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message);
});

server.on('error', function(err) {
    console.log("server error:\n" + err.stack);
    server.close();
});

server.bind(PORT, HOST);