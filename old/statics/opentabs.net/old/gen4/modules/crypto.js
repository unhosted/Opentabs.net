var crypto = (function() {
  function sign(tab) {
    //FIXME: fake!
    return 'yours truly';
  }
  function verifySender(tab) {
    //FIXME: fake!
    if(tab.borrower == localStorage.userAddress) {
      return tab.lender;
    }
    if(tab.lender == localStorage.userAddress) {
      return tab.borrower;
    }
    return null;
  }
  return {
    sign: sign,
    verifySender: verifySender
  };
})();
