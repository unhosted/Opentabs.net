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
  function store(userAddress, entry) {
    if(!tabs[userAddress]) {
      tabs[userAddress] = {};
    }
    if(!tabs[userAddress][entry.message.tab.currency]) {
      tabs[userAddress][entry.message.tab.currency] = {};
    }
    tabs[userAddress][entry.message.tab.currency][entry.message.revision.timestamp] = entry;
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }
  function getTab(userAddress, currency) {
    if(!tabs[userAddress]) {
      return undefined;
    }
    return tabs[userAddress][currency];
  }
  function getLastEntry(userAddress, currency) {
    var max = 0;
    var tab = getTab(userAddress, currency);
    if(tab) {
      for(var i in tab) {
        if(i > max) {
          max = i;
        }
      }
    }
    if(max) {
      return tab[max];
    } else {
      return null;
    }
  }
  return {
    getTabs: getTabs,
    getTab: getTab,
    getLastEntry: getLastEntry,
    store: store
  }
})();
