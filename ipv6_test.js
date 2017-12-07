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
});
server.on('error', (error) => {
  console.error('SERVER ERROR:', error);
});

setTimeout(() => { server.close(); }, 3000);

var client = dgram.createSocket('udp6');
client.bind(CLIENT_PORT);

function test(host, message) {
client.send(message, 0, message.length, SERVER_PORT, host,
  function(error, bytes) { 
    if (error) {
      console.error(error);
      return;
    }
    console.log('Message sent to host: "' + HOST + '", port: ' + SERVER_PORT);
  } 
);
}
setTimeout(() => { client.close(); }, 3000);

test('fe80::1', '0');
test(HOST, '1');
test(HOST, '2');
test(false, '3');
test('::1', '4');
test('fe80::1', '5');
