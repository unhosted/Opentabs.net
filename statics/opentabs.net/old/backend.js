
      /////////////
     // backend //
    /////////////
    var opentabs = (function() {
      function generateAlphaIdentities() {
        var contacts = [
         { name: 'Zed' },
         { name: 'Vincent' },
         { name: 'Fabienne'},
         { name: 'Wolf' },
         { name: 'Jules' },
         { name: 'Marcellus' },
         { name: 'Mia' },
       ];
       for(var i in contacts) {
         contacts[i].avatar = 'http://opentabs.net/screens/avatars/'
           +contacts[i].name.toLowerCase();
         contacts[i].userAddress = contacts[i].name.toLowerCase()+'@opentabs.net';
	 contacts[i].tabs = [];
       }
       return contacts;
     }
     function setContacts(contacts) {
       localStorage.contacts = JSON.stringify(contacts);
     }
     function getContacts(filter) {
       if(!localStorage.contacts) {
         setContacts(generateAlphaIdentities());
       }
       var contacts = JSON.parse(localStorage.contacts);
       if(filter && filter.length) {
	 var filtered = {};
         for(var i in contacts) {
           var prefix = contacts[i].name.substring(0, filter.length);
           if(prefix.toLowerCase() == filter.toLowerCase()) {
             filtered[i]=contacts[i];
           }
         }
	 return filtered;
       } else {
         //return contacts;
	 var filtered = {};
         for(var i in contacts) {
           filtered[i]=contacts[i];
	 }
	 return filtered;
       }
     }
     function getMe() {
       //return {
       //  name: 'Butch',
       //  userAddress: 'butch@opentabs.net',
       //  avatar: 'http://opentabs.net/screens/avatars/butch'
       //}
       return JSON.parse(localStorage.getItem('me'));
     }
     function getContact(contactId) {
       var contacts = getContacts();
       return contacts[contactId]
     }
     function addTab(contactId, tab) {
       var contacts = getContacts();
       contacts[contactId].tabs.push(tab);
       setContacts(contacts);
     }
     function sendTab(contactId, type, description) {
       var tab = {};
       if(type == 'borrow') {
         tab.payee = getContact(contactId).userName;
         tab.payer = getMe().userName;
       } else {
         tab.payer = getContact(contactId).userName;
         tab.payee = getMe().userName;
       }
       tab.description = description;
       tab.timestamp = (new Date().getTime());
       var me = getMe().userAddress;
       tab.signatures = {};
       tab.signatures[me]= 'yours truly';
       addTab(contactId, tab);
       var contacts = getContacts();
       msg.sendMsg(contacts[contactId].userAddress, tab);
     }
     return {
       getContacts: getContacts,
       sendTab: sendTab,
       processMsg: function(data) {
         var me = getMe().userAddress;
	 var contactId;
	 if(data.payer==me) {
	   contactId = findContact(data.payee);
	 } else if(data.payee == me) {
	   contactId = findContact(data.payee);
	 } else {
	   alert('how does '+JSON.stringify(data)+' affect '+me+'?');
	 }
	 if(contactId) {
	   addTab(contactId, data);
	 } else {
	   alert('cant find where to add '+JSON.stringify(data));
	 }
       },
       getMe: getMe,
       setMe: function(data) {
         localStorage.setItem('me', JSON.stringify(data));
       }
     }
   })();

