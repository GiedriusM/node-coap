var os = require('os');
var exec = require('child_process');
var ifaces = os.networkInterfaces();
console.log(ifaces);

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

p = exec.execSync('cat /proc/sys/net/ipv6/conf/eth0/disable_ipv6');
console.log('CAT: ' + p);
exec.execSync("sudo sh -c 'echo 0 > /proc/sys/net/ipv6/conf/eth0/disable_ipv6'");
p = exec.execSync('cat /proc/sys/net/ipv6/conf/eth0/disable_ipv6');
console.log('CAT: ' + p);
ip = 'fe80::' + getRandomInt(1, 1000);
p = exec.execSync('sudo ip addr add ' + ip + ' dev eth0');
console.log('IP: ' + p);

console.log(os.networkInterfaces());

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


