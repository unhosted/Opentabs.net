var tabs = (function() {
  var tabs = JSON.parse(localStorage.getItem('tabs'));
  if(!tabs) {
    tabs = {};
  }
  function getTabs(userAddress) {
    if(tabs[userAddress]) {
      return tabs[userAddress];
    } else {
      return [];
    }
  }
  function store(userAddress, tab) {
    if(!tabs[userAddress]) {
      tabs[userAddress] = [];
    }
    tabs[userAddress].push(tab);
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }
  function getTab(userAddress, timestamp) {
    if(!tabs[userAddress]) {
      return false;
    }
    for(var i in tabs[userAddress]) {
      if(tabs[userAddress][i].timestamp == timestamp) {
        return tabs[userAddress][i];
      }
    }
    return false;
  }
  function addSignature(userAddress, timestamp, signature) {
    if(!tabs[userAddress]) {
      return false;
    }
    for(var i in tabs[userAddress]) {
      if(tabs[userAddress][i].timestamp == timestamp) {
        tabs[userAddress][i].signatures[localStorage.userAddress] = signature;
        localStorage.setItem('tabs', JSON.stringify(tabs));
        return true;
      }
    }
    return false;
  }
  function setStatus(userAddress, timestamp, newStatus) {
    if(!tabs[userAddress]) {
      return false;
    }
    for(var i in tabs[userAddress]) {
      if(tabs[userAddress][i].timestamp == timestamp) {
        tabs[userAddress][i].status = newStatus;
        localStorage.setItem('tabs', JSON.stringify(tabs));
        return true;
      }
    }
    return false;
  }
  return {
    getTabs: getTabs,
    getTab: getTab,
    store: store,
    setStatus: setStatus,
    addSignature: addSignature
  }
})();
