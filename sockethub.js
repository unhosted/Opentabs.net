var socketio = require('socket.io').listen(9000).sockets,
  config = require('./config').config;
var sockets = {};
var msgQ = {};

//this is for testing:
//var testingContacts = [];

socketio.on('connection', function(socket) {
  socket.on('testSecret', function(secret) {
    if(secret == config.socketHubSecret) {
      socket.emit('testOK', 'yes');
    } else {
      socket.emit('testErr', 'no');
    }
  });
  socket.on('register', function(data) {
    if(data.secret == config.socketHubSecret) {
      sockets[data.userAddress] = socket;
      console.log('registered '+data.userAddress);
      socket.emit('welcome', data.userAddress);
      socket.set('userAddress', data.userAddress);
      if(msgQ[data.userAddress]) {
        for(var i in msgQ[data.userAddress]) {
          socket.emit('msg', msgQ[data.userAddress][i]);
          console.log(msgQ[data.userAddress][i]);
	      }
        delete msgQ[data.userAddress];
      } else {
        console.log('no msg');
      }
    } else {
      console.log('attempt by '+data.userAddress+' with wrong secret '+data.secret);
      socket.emit('go away', data.secret);
    }
  });
  socket.on('msg', function(data) {
    console.log('message for '+data.to);
    if(sockets[data.to]) {
      data.from = socket.get('userAddress');
      sockets[data.to].emit('msg', data);
      console.log('delivered');
    } else {
      if(!msgQ[data.to]) {
        msgQ[data.to]=[];
      }
      msgQ[data.to].push(data);
      console.log('queued');
    }
  });
});
