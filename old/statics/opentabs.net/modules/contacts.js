var contacts = (function(){
  function deriveName(userAddress) {
    var parts = userAddress.split('@');
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  }
  function getUser(userAddress) {
    return {
      name: deriveName(userAddress),
      userAddress: userAddress,
	    avatar:'http://opentabs.net/avatars/'+deriveName(userAddress).toLowerCase()
    };
  }
  function getCharacters(cb) {
    //var nicks = ['butch', 'zed', 'marcellus', 'jules', 'mia', 'fabienne', 'vincent'];
    var nicks = ['mia', 'vincent', 'jules'];
    var characters = [];
    for(var i in nicks) {
      var userAddress = nicks[i]+'@opentabs.net';
    	if(localStorage.userAddress != userAddress) {
        characters.push(userAddress);
      }
    }
    cb(characters);
  }
  function getContacts(cb) {
    getCharacters(function(characters) {
      for(var i in characters) {
        cb(characters[i]);
      }
    });
  }
  return {
    getCharacters: getCharacters,
    getContacts: getContacts,
    getUser: getUser
  };
})();
