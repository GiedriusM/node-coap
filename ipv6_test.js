var HOST = 'ip6-localhost';
var HOST = '::1';
var SERVER_PORT = 4000;
var CLIENT_PORT  = 4001;

var dgram = require('dgram');

var message = new Buffer('(data)');

var server = dgram.createSocket('udp6');
server.bind(SERVER_PORT);

server.on('message', (msg, info) => {
  console.log('Server got message: "' + msg + '"');
  console.log(info)
  server.close();
});


var client = dgram.createSocket('udp6');
client.bind(CLIENT_PORT);

client.send(message, 0, message.length, SERVER_PORT, HOST,
  function(error, bytes) { 
    if (error) throw error;
    console.log('Message sent to host: "' + HOST + '", port: ' + SERVER_PORT);
    client.close();
  } 
);
