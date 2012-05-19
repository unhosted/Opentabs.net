var contactView = (function() {
  function renderTabActions(tab, userAddress) {
    var paramsSpec='{}';
    var str = '  <div class="tabButtons" >';
    if(tab.actions.input) {
      var uniqueStr = userAddress.replace('@', ':')+':'+tab.tab.timestamp;
      paramsSpec = '{text: document.getElementById(\'input_'+uniqueStr+'\').value}';
      str += '    <input id="input_'+uniqueStr+'">';
    }
    for(var i in tab.actions) {
      if(i != 'input') {
        str +='      <input type="submit" value="'+tab.actions[i]
          +'" onclick="controller.tabAction(\''+userAddress+'\', '+tab.tab.timestamp+', \''+i
          +'\', '+paramsSpec+');">';
      }
    }
    return str;
  }
  function renderTab(tab, userAddress) {
    var str = '['+tab.icon+'] '+tab.description;
    if(tab.actions) {
      str += renderTabActions(tab, userAddress);
    }
    return str;
  }
  function renderTabsList(tabs, userAddress) {
    var str = '<ul>';
    for(var j in tabs) {
      var tab = tabs[j];
      str += '<li>'+renderTab(tabs[j], userAddress);
      str += '</li>';
    }
    return str+'</ul>';
  }
  function renderContactActions(obj) {
    var paramsSpec='{}';
    var str = '  <div class="contactButtons" >';
    if(obj.actions.input) {
      var uniqueStr = obj.userAddress.replace('@', ':');
      paramsSpec = '{text: document.getElementById(\'input_'+uniqueStr+'\').value}';
      str += '    <input id="input_'+uniqueStr+'">';
    }
    for(var i in obj.actions) {
      if(i != 'input') {
        str +='      <input type="submit" value="'+obj.actions[i]
          +'" onclick="controller.contactAction(\''+obj.userAddress+'\', \''+i
          +'\', '+paramsSpec+');">';
      }
    }
    return str;
  }
  function renderSummary(obj) {
    var str = '<div class="summary">'
      +'  <div class="avatar">'
      +'    <img src="'+obj.avatar+'">'
      +'  </div>'
      +'  <div>'
      +'    '+obj.name
      +'  </div>'
      +'  <br>';
    if(obj.actions) {
      str += renderContactActions(obj);
    }
    str += '  </div>'//end contactButtons
      +'</div>';//end summary
    return str;
  }
  function renderContact(obj) {
    var str = renderSummary(obj);
    if(obj.notif.length) {//TODO: add tabActions in here
      str += '<div class="notifList"><h4>Notif:</h4>'
        +renderTabsList(obj.notif, obj.userAddress);
        + '</div>';
    }
    if(obj.track.length) {//TODO: add tabActions in here
      str += '<div class="trackList"><h4>Track:</h4>'
        +renderTabsList(obj.track, obj.userAddress);
        + '</div>';
    }
    if(obj.open.length) {//TODO: add tabActions in here
      str += '<div class="openList"><h4>Open:</h4>'
        +renderTabsList(obj.open, obj.userAddress);
        + '</div>';
    }
    if(obj.history.length) {//TODO: add tabActions in here
      str += '<div class="historyList"><h4>History:</h4>'
        +renderTabsList(obj.history, obj.userAddress);
        + '</div>';
    }
    return str;
  }
  return {
    renderContact: renderContact,
  };
})();
