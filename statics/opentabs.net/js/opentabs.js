setTimeout(function() {
  syncer.display({
    signInDiv: 'remotestorage-bar',
    readAccess: ['contacts/mailto', 'contacts/firstName', 'contacts/lastName', 'contacts/tags'], 
    fullAccess: ['money/peers', 'public/money/tabs'],
    libDir: 'syncer/',
    onChange: function(e) {
      redraw();
    }
  });
}, 1000);
function stripSlash(str) {
  if(str[str.length-1]=='/') {
    return str.substring(0, str.length-1);
  }
  return str;
}
function arrToUl(elts, stripSlashes) {
  var str='<ul>';
  for(var i=0; i<elts.length; i++) {
    if(stripSlashes) {
      str += '<li>'+stripSlash(elts[i])+'</li>';
    } else {
      str += '<li>'+elts[i]+'</li>';
    }
  }
  return str+'</ul>';
}
function redraw() {
  var peersWithSlash = syncer.getCollection('money/peers');
  document.getElementById('tabs').innerHTML= arrToUl(peersWithSlash, true);
}
