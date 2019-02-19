'use strict';

var PORT = 33333;

//172.17.0.1
//https://forums.docker.com/t/udp-port-mapping-sending-data-from-container-to-host/35762/5
//var HOST = '172.17.0.2';
//var HOST = '127.0.0.1';
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