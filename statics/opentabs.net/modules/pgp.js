var pgp = (function() {
  function sign(message) {
    //FIXME: fake!
    return 'yours truly';
  }
  function getPublicKey(userAddress) {
    //FIXME: fake!
    return '';
  }
  function signatureOk(pubKey, plainText, signature) {
    //FIXME: fake!
    return true;
  }
  function verifySignature(entry) {
    //FIXME: fake!
    return (signatureOk(getPublicKey(entry.from), entry.message, entry.signature));
  }
  return {
    sign: sign,
    verifySignature: verifySignature
  };
})();
