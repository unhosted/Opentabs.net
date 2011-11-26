var msg = (function() {
  var socket = io.connect('http://opentabs.net:9000');
  function setCallbacks(callbacks) {
    //listen client-side:
    socket.on('testErr', callbacks.onSecretErr);
    socket.on('testOK', callbacks.onSecretOK);
    socket.on('go away', callbacks.onGoAway);
    socket.on('welcome', callbacks.onWelcome);
    socket.on('msg', callbacks.onMsg);
  }
  function testSecret(secret, onErr, onReg) {
    socket.emit('testSecret', secret);
  }
  function register(userAddress, secret, onErr, cb) {
    socket.emit('register', {userAddress: userAddress, secret: secret});
  }
  function sendMsg(entry) {
    socket.emit('msg', entry);
  }
  return {
    setCallbacks: setCallbacks,
    testSecret: testSecret,
    register: register,
    sendMsg: sendMsg,
    isConnected: function() {
      return false;
    }
  };
})();
