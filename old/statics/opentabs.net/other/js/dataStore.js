var dataStore = (function() {
  var Collection = function(name) {
    return {
      getAll: function () {
        return JSON.parse(localStorage.getItem('coll:'+name));
      },
      add: function(elt) {
        var all = getAll();
        all.push(elt);
        localStorage.setItem('coll:'+name, JSON.stringify(all));
      }
    };
  }
  function addDeal(deal) {
    var deals = Collection('deals');
    deals.add(deal);
  }

  function addBalance(balance) {
    var balances = Collection('balances');
    balances.add(balance);
  }
  function findSettlements() {
    var deals = Collection('deals').getAll();
    var credits = {};
    var settlements = Collection('settlements');
    for(var i=0; i<deals.length; i++) {
      for(var j=0; j< deals[i].length; j++) {
        if(deals[i][j].amount != 0) {
          if(!credits[deals[i][j].source]) {
            credits[deals[i][j].source] = {};
          }
          if(!credits[deals[i][j].source][deals[i][j].destination]) {
            credits[deals[i][j].source][deals[i][j].destination] = [];
          }
          credits[deals[i][j].source][deals[i][j].destination].push(deals[i][j]);
        }
      }
    }
    //find cycles with only 2 participants:
    for(var personA in credits) {
      for(var personB in credits[personA]) {
        if(credits[personB] && credits[personB][personA]) {
          settlements.add([
            {
  }
  return {
    addDeal: addDeal,
    addBalance: addBalance,
    findSettlements: findSettlements,
    agreeSettlement: agreeSettlement
  };
})();
