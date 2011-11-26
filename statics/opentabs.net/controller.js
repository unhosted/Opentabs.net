var controller= (function() {
  var updateView = function() {}
  function init(setUpdateViewCb) {
    updateView = setUpdateViewCb;
  }
  function setCallbacks(callbacks) {
    callbacks.onMsg=function(data) {
      console.log('incoming msg!');
      console.log(data);
      if(pgp.verifySignature(data)) {
        tabs.store(data.from, data);
        showContact(data.from, 'rest');
      } else {
        alert('messages signature from '+data.from+' does not match!');
      }
    };
    var origOnWelcome = callbacks.onWelcome;
    callbacks.onWelcome = function() {
      //it's OK if contacts are added one-by-one in async here:
      contacts.getContacts(function(userAddress) {
        showContact(userAddress, 'rest');
      });
      origOnWelcome();
    };
    msg.setCallbacks(callbacks);
  }
  function calcUserActions(interfaceState) {
    if(interfaceState == 'rest') {
      return {
        borrowA: 'Borrow',
        lendA: 'Lend'
      };
    } else if(interfaceState == 'borrowDialog') {
      return {
        input: 'descr',
        borrowB: 'Send',
        cancel: 'X'
      };
    } else if(interfaceState == 'lendDialog') {
      return {
        input: 'descr',
        lendB: 'Send',
        cancel: 'X'
      };
    } else {
      return {};
    }
  }
  function calcTabType(userAddress, currency) {
    var me = localStorage.userAddress;
    return (tabs.getLastEntry(userAddress, currency).message.tab.borrower == me ? 'B' : 'L');
  }
  function calcTabStatus(userAddress, currency) {
    var lastEntry = tabs.getLastEntry(userAddress, currency);
    var me = localStorage.userAddress;
    var suffix = (lastEntry.from == me ? 'Out' : 'In');
    return lastEntry.message.verb +suffix;
  }
  function calcTabIcon(tabStatus) {
    if(tabStatus == 'proposeIn' || tabStatus == 'proposeOut') {
      return '?';
    }
    if(tabStatus == 'declineOut' || tabStatus == 'declineIn') {
      return '&check;';
    }
    if(tabStatus == 'acceptOut' || tabStatus == 'acceptIn') {
      return '&check;';
    }
    return '';
  }
  function calcEntryDescription(userAddress, currency) {
    var lastEntry = tabs.getLastEntry(userAddress, currency);
    if(lastEntry) {
      if(calcTabType(userAddress, currency) == 'B') {
        return -(lastEntry.message.revision.balance)+' '+lastEntry.message.tab.currency;
      } else {
        return lastEntry.message.revision.balance+' '+lastEntry.message.tab.currency;
      }
    } else {
      return 'no entries in this tab';
    }
  }
  function calcTabSummary(userAddress, currency) {
    var lastEntry = tabs.getLastEntry(userAddress, currency);
    if(lastEntry) {
      if(calcTabType(userAddress, currency) == 'B') {
        return -(lastEntry.message.revision.balance)+' '+lastEntry.message.tab.currency;
      } else {
        return lastEntry.message.revision.balance+' '+lastEntry.message.tab.currency;
      }
    } else {
      return 'no entries in this tab';
    }
  }
  function calcTabActions(status) {
    if(status == 'proposeIn') {
      return {accept: 'Accept', declineA: 'Decline'};
    }
    if(status == 'declining') {
      return {input: 'message', cancelDecline: 'Cancel', declineB: 'Decline'};
    }
    return {showEntries: '+'};
  }
  function calcTabList(status) {
    if(status == 'proposeIn' || status == 'declining' || status == 'proposeOut') {
      return 'important';
    }
    return 'history';
  }
  function showContact(userAddress, interfaceState) { 
    //no RTTs here! this should be snappy:
    var contact = contacts.getUser(userAddress);
    contact.important = [];
    contact.history = [];
    var peerTabs = tabs.getTabs(userAddress);
    for(var currency in peerTabs) {
      var thisTab = {};
      thisTab.summary = calcTabSummary(userAddress, currency);
      thisTab.status = calcTabStatus(userAddress, currency);
      thisTab.icon= calcTabIcon(userAddress, currency);
      thisTab.type = calcTabType(userAddress, currency);
      thisTab.actions = calcTabActions(thisTab.status);
      thisTab.currency = currency;
      contact[calcTabList(thisTab.status)].push(thisTab);
    }
    contact.actions = calcUserActions(interfaceState);
    updateView(userAddress, contact);
  }
  function setUserAddress(userAddress, secret) {
    msg.register(userAddress, secret);
  }
  function testSecret(secret) {
    msg.testSecret(secret);
  }
  //function addContact(userAddress) {
  //}
  function parseEntryCreationText(text) {
    var words = text.split(' ');
    if((words.length <= 1) || (parseInt(words[0]) == NaN)) {
      return {
        amount: 1,
        currency: text,
        comment: ''
      };
    } else {
      if(words.length >= 3) {
        comment = words[2];
        for(var i = 3; i < words.length; i++) {
          comment += ' '+words[i];
        }
      } else {
        comment = '';
      }
      return {
        amount: parseInt(words[0]),
        currency: words[1],
        comment: comment
      };
    }
  }
  function createEntry(userAddress, params, borrow) {
    var parsed = parseEntryCreationText(params.text);
    var lastEntry = tabs.getLastEntry(userAddress, parsed.currency);
    var previousTimestamp;
    var previousBalance;
    var me = localStorage.userAddress;
    if(lastEntry) {
      previousTimestamp = lastEntry.message.revision.timestamp;
      var previousBorrow = (lastEntry.message.tab.borrower == me);
      if(previousBorrow == borrow) {
        previousBalance = lastEntry.message.revision.balance;
      } else {
        previousBalance = -(lastEntry.message.revision.balance);
      }
    } else {
      previousTimestamp= null;
      previousBalance= 0;
    }
    var diff = parsed.amount;
    var me = localStorage.userAddress;
    var entry = {
      from: me,
      to: userAddress,
      message: {
        verb: params.verb,
        tab: {
          borrower: (borrow ? me : userAddress),
          lender: (borrow ? userAddress : me),
          currency: parsed.currency
        },
        revision: {
          timestamp: (new Date().getTime())/1000,
          balance: previousBalance + diff
        },
        previous: previousTimestamp,
        diff: diff,
        comment: parsed.comment
      }
    }
    entry.signature = pgp.sign(entry.message);
    tabs.store(userAddress, entry);
    msg.sendMsg(entry);
  }
  function globalAction(contactId, amount, currency, description) {
  }
  function triggerAction(userAddress, action, params) {
    if(action == 'borrowA') {
      return 'borrowDialog';
    } else if(action == 'lendA') {
      return 'lendDialog';
    } else if(action=='borrowB') {
      params.verb='propose';
      createEntry(userAddress, params, true);
      return 'rest';
    } else if(action=='lendB') {
      params.verb='propose';
      createEntry(userAddress, params, false);
      return 'rest';
    } else if(action=='cancel') {
      return 'rest';
    } else {
      alert('not implemented yet: '+action);
      return 'rest';
    }
  }
  function contactAction(userAddress, action, params) {
    var newState = triggerAction(userAddress, action, params);//no RTTs here! this should be snappy
    //redraw contact from scratch:
    showContact(userAddress, newState);
  }
  function tabAction(userAddress, tabId, action, params) {
    if(action=='acceptLatest') {
      createEntry(userAddress, tabId, pgp.sign(tabs.getTab(userAddress, tabId)));
    } else if(action=='declineLatestA') {
      createEntry(userAddress, tabId, 'declining');
    } else if(action=='declineLatestB') {
      tabs.comment(userAddress, tabId, 'declined: '+params.text);
      createEntry(userAddress, tabId, 'declined');
    } else {
      alert('not implemented yet: '+action);
    }
    showContact(userAddress, 'rest');//TODO: track interfaceState per contact in some way
  }
  function getCharacters(cb) {
    contacts.getCharacters(cb);
  }
  return {
    getCharacters: getCharacters,
    init: init,
    setCallbacks: setCallbacks,
    setUserAddress: setUserAddress,
    testSecret: testSecret,
    globalAction: globalAction,
    contactAction: contactAction,
    tabAction: tabAction
  };
})();
