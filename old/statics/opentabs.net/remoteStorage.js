var remoteStorage = (function() {
  function getPublicItem(peer, category, item) {
    return [
      {
        peer: peer,
        thing: 'asdf',
        amount: 3,
        currency: 'EUR',
        balance: 13
      },
      {
        peer: peer,
        thing: 'asdf',
        amount: 10,
        currency: 'EUR',
        balance: 10
      }
    ]
  }
  return {
    getPublicItem: getPublicItem
  };
})();
