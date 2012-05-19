var contactView = (function() {
  function renderTabActions(tab, userAddress) {
    var paramsSpec='{}';
    var str = '  <div class="tabButtons" >';
    if(tab.actions.input) {
      var uniqueStr = userAddress.replace('@', ':')+':'+tab.currency;
      paramsSpec = '{text: document.getElementById(\'input_'+uniqueStr+'\').value}';
      str += '    <input id="input_'+uniqueStr+'">';
    }
    for(var i in tab.actions) {
      if(i != 'input') {
        str +='      <input type="submit" value="'+tab.actions[i]
          +'" onclick="controller.tabAction(\''+userAddress+'\', \''+tab.currency+'\', \''+i
          +'\', '+paramsSpec+');">';
      }
    }
    return str;
  }
  function renderTab(tab, userAddress) {
    var str = '['+tab.type+tab.icon+'] '+tab.summary;
    if(tab.actions) {
      str += renderTabActions(tab, userAddress);
    }
    return str;
  }
  function renderTabsList(tabs, userAddress) {
    var str = '<ul>';
    for(var j in tabs) {
      var tab = tabs[j];
      str += '<li class="tabSummary'+tab.type+'">'+renderTab(tabs[j], userAddress);
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
    var str = '<tr><td><div class="summary">'
      +'  <div class="avatar">'
      +'    <img src="'+obj.avatar+'">'
      +'  </div>'
      +'  <div>'
      +'    '+obj.name
      +'  </div>'
      +'  <br>'+'</td></tr>';
    if(obj.actions) {
      str += '<tr><td>'+renderContactActions(obj)+'</td></tr>';
    }
    str += '  </div>'//end contactButtons
      +'</div>';//end summary
    return str;
  }
  function renderContact(obj) {
    var str = '<table>'+renderSummary(obj);
    if(obj.important.length) {//TODO: add tabActions in here
      str += '<tr><td><div class="importantList"><h4>Important:</h4>'
        +renderTabsList(obj.important, obj.userAddress);
        + '</div></td></tr>';
    }
    if(obj.history.length) {//TODO: add tabActions in here
      str += '<tr><td><div class="historyList"><h4>History:</h4>'
        +renderTabsList(obj.history, obj.userAddress);
        + '</div></td></tr>';
    }
    return str+'</table>';
  }
  return {
    renderContact: renderContact,
  };
})();
