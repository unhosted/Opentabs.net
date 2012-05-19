var you = localStorage.getItem('nick')+'@opentabs.net';

function getImportantString() {
  var tabs = JSON.parse(localStorage.getItem('tabs'));
  var totals = {};
  var importantStr = '';
  for(i in tabs) {
    var iou = tabs[i];
    if(!iou.description) {
      iou.description='';
    }
    if((iou.proposer != you) && (iou.status == 'proposed') && (iou.payer == you)) {
      // incoming invoice
      importantStr += '<tr><td><strong>?</strong> '
        +iou.payee+' '+iou.description
        +'<input type="submit" value="Decline" onclick="declineIncoming('+i+');" />'
        +'<input type="submit" value="Accept" onclick="acceptIncoming('+i+');" />'
        +'</td><td class="negative">'+iou.amount+iou.currency+'</td>'
        +'</tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.proposer != you) && (iou.status == 'proposed') && (iou.payee == you)) {
      // incoming IOU
      importantStr += '<tr><td><strong>?</strong>'
        +iou.payer+' '+iou.description
        +'<input type="submit" value="Decline" onclick="declineIncoming('+i+');" />'
        +'<input type="submit" value="Accept" onclick="acceptIncoming('+i+');" />'
        +'</td><td class="positive">'+iou.amount+iou.currency+'</td>'
        +'</tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.proposer == you) && (iou.status == 'declined') && (iou.payer == you)) {
      // declined your IOU
      importantStr += '<tr><td><strong>X</strong> '
        +iou.payee+' '+iou.description
        +'<input type="submit" value="Close" onclick="closeDeclined('+i+');" />'
        +'</td><td class="negative">'+iou.amount+iou.currency+'</td>'
        +'</tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.proposer == you) && (iou.status == 'declined') && (iou.payee == you)) {
      // declined your invoice
      importantStr += '<tr><td><strong>X</strong> '
        +iou.payer+' '+iou.description
        +'<input type="submit" value="Close" onclick="closeDeclined('+i+');" />'
        +'</td><td class="positive">'+iou.amount+iou.currency+'</td>'
        +'</tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
  }
  if(importantStr.length) {
    var outStr = '<table>'
      + '<tr><th><strong>Important</strong></th><th>';
    for(currency in totals) {
      outStr += totals[currency]+currency;
    }
    outStr += '</th></tr>';
    return outStr + importantStr + '</table>';
  } else {
    return '';
  }
}
function getContactsString() {
  var contacts = JSON.parse(localStorage.getItem('contacts'));
  var tabs = JSON.parse(localStorage.getItem('tabs'));
  var contactsStr = '';
  for(var i in contacts) {
    var totals = {};
    contactsStr += '<table id="'+i+'"><tr><th><span onclick="owe('+i+');" class="avatar" id="avatar'+i+'">'+contacts[i][0]+'</span>'
      +'<span onclick="owe('+i+');" class="contactName" id="contact'+i+'">'+contacts[i]+'</span></th><th onclick="fold('+i+');">'
      +'<tr id="add'+i+'"></tr>';
    for(currency in totals) {
 	    contactsStr += totals[currency]+currency;
 	  }
    contactsStr += '</th></tr>';
    var thisContactsStr='';
    for(j in tabs) {
      var iou = tabs[j];
      if(!iou.description) {
        iou.description='';
      }
      if((iou.payee == contacts[i]) && (iou.status == 'requested')) {
        // hurry
        thisContactsStr += '<tr><td><strong>!</strong>'
          +iou.description+'<input type="submit" value="was paid" onclick="markAsPaid('+j+');" /></td>'
          +'<td class="negative">'+iou.amount+iou.currency+'</td></tr>'
        if(totals[iou.currency]==undefined) {
          totals[iou.currency]=0;
        }
        if(iou.payee==you) {
          totals[iou.currency]+= parseInt(iou.amount);
        } else {
          totals[iou.currency]-= parseInt(iou.amount);
        }
      }
      if((iou.payer == contacts[i]) && (iou.status == 'sent')) {
        // got it?
        thisContactsStr += '<tr><td><strong>&#10003;</strong> '
          +iou.description+'<input type="submit" value="was paid" onclick="markAsPaid('+j+');" /></td>'
          +'<td class="positive">'+iou.amount+iou.currency+'</td></tr>';
        if(totals[iou.currency]==undefined) {
          totals[iou.currency]=0;
        }
        if(iou.payee==you) {
          totals[iou.currency]+= parseInt(iou.amount);
        } else {
          totals[iou.currency]-= parseInt(iou.amount);
        }
      }
      if((iou.payer == contacts[i]) && (iou.status == 'requested')) {
        // you said hurry
        thisContactsStr += '<tr><td><strong>!</strong> '
          +iou.description+'<input type="submit" value="was paid" onclick="markAsPaid('+j+');" /></td>'
          +'<td class="positive">'+iou.amount+iou.currency+'</td></tr>';
        if(totals[iou.currency]==undefined) {
          totals[iou.currency]=0;
        }
        if(iou.payee==you) {
          totals[iou.currency]+= parseInt(iou.amount);
        } else {
          totals[iou.currency]-= parseInt(iou.amount);
        }
      }
    }
    thisContactsStr2 = '';
    for(j in tabs) {
      var iou = tabs[j];
      if(!iou.description) {
        iou.description='';
      }
      if((iou.payee == contacts[i]) && (iou.status == 'accepted')) {
        // you owe them
        thisContactsStr2 += '<tr class="folded'+i+'"><td>'
          +iou.description+'<input type="submit" value="was paid" onclick="markAsPaid('+j+');" /></td>'
          +'<td class="negative">'+iou.amount+iou.currency+'</td></tr>';
        if(totals[iou.currency]==undefined) {
          totals[iou.currency]=0;
        }
        if(iou.payee==you) {
          totals[iou.currency]+= parseInt(iou.amount);
        } else {
          totals[iou.currency]-= parseInt(iou.amount);
        }
      }
      if((iou.payer == contacts[i]) && (iou.status == 'accepted')) {
        // they owe you
        thisContactsStr2 += '<tr class="folded'+i+'"><td>'
          +iou.description
          +'<input type="submit" value="urgent" onclick="requestPayment('+j+');" />'
          +'<input type="submit" value="was paid" onclick="markAsPaid('+j+');" /></td>'
          +'<td class="positive">'+iou.amount+iou.currency+'</td></tr>';
        if(totals[iou.currency]==undefined) {
          totals[iou.currency]=0;
        }
        if(iou.payee==you) {
          totals[iou.currency]+= parseInt(iou.amount);
        } else {
          totals[iou.currency]-= parseInt(iou.amount);
        }
      }
      if((iou.payee == contacts[i]) && (iou.status == 'proposed') && (iou.proposer == you)) {
        // you proposed to owe
        thisContactsStr2 += '<tr class="folded'+i+'"><td><strong>?</strong> '
          +iou.description+'<input type="submit" value="Cancel" onclick="cancelProposed('+j+');" /></td>'
          +'<td class="negative">'+iou.amount+iou.currency+'</td></tr>';
        if(totals[iou.currency]==undefined) {
          totals[iou.currency]=0;
        }
        if(iou.payee==you) {
          totals[iou.currency]+= parseInt(iou.amount);
        } else {
          totals[iou.currency]-= parseInt(iou.amount);
        }
      }
      if((iou.payer == contacts[i]) && (iou.status == 'proposed') && (iou.proposer == you)) {
        // invoice you proposed
        thisContactsStr2 += '<tr class="folded'+i+'"><td><strong>?</strong> '
          +iou.description+'<input type="submit" value="Cancel" onclick="cancelProposed('+j+');" /></td>'
          +'<td class="positive">'+iou.amount+iou.currency+'</td></tr>';
        if(totals[iou.currency]==undefined) {
          totals[iou.currency]=0;
        }
        if(iou.payee==you) {
          totals[iou.currency]+= parseInt(iou.amount);
        } else {
          totals[iou.currency]-= parseInt(iou.amount);
        }
      }
    }
    if(thisContactsStr.length) {
      contactsStr += thisContactsStr;
    }
    if(thisContactsStr2.length) {
      contactsStr += '<tr onclick="fold('+i+');"><td>&hellip;</td><td></td></tr>'+thisContactsStr2;
    }
    contactsStr+='</table>';
  }
  if(contactsStr.length) {
    return '<div id="contactsDiv"><div>Opentabs.net SEARCH: <input size=5 id="search"></div>'+contactsStr+'</div>';
  } else {
    return '';
  }
}

function getHistoryString() {
  var tabs = JSON.parse(localStorage.getItem('tabs'));
  historyStr = '<table>';
  var totals= {};
  historyStr += '<tr><th><strong>History</strong></th><th>';
  for(currency in totals) {
    historyStr += totals[currency]+currency;
  }
  historyStr += '</th></tr>';
  for(i in tabs) {
    var iou = tabs[i];
    if(!iou.description) {
      iou.description='';
    }
    if((iou.proposer != you) && (iou.status == 'declined') && (iou.payee==you)) {
      // offer you refused
      historyStr += '<tr><td><strong>X</strong> '+iou.payer+' '+iou.description+'</td><td class="positive">'+iou.amount+iou.currency+'</td></tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.proposer != you) && (iou.status == 'declined') && (iou.payer==you)) {
      // invoice you declined
      historyStr += '<tr><td><strong>X</strong> '+iou.payee+' '+iou.description+'</td><td class="negative">'+iou.amount+iou.currency+'</td></tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.payer == you) && (iou.status == 'closed')) {
      // was declined
      historyStr += '<tr><td><strong>X</strong> '+iou.payee+' '+iou.description+'</td><td class="negative">'+iou.amount+iou.currency+'</td></tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.payee == you) && (iou.status == 'closed')) {
      // was declined
      historyStr += '<tr><td><strong>X</strong> '+iou.payer+' '+iou.description+'</td><td class="positive">'+iou.amount+iou.currency+'</span></tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.payer == you) && (iou.status == 'sent')) {
      // you sent
      historyStr += '<tr><td><strong>&#10003;</strong> '+iou.payee+' '+iou.description+'</td><td class="negative">'+iou.amount+iou.currency+'</td></tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.payer == you) && (iou.status == 'received')) {
      // they received
      historyStr += '<tr><td><strong>&#10003;</strong> '+iou.payee+' '+iou.description+'</td><td class="negative>'+iou.amount+iou.currency+'</td></tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
    if((iou.payee == you) && (iou.status == 'received')) {
      // you received
      historyStr += '<tr><td><strong>&#10003;</strong>'+iou.payer+' '+iou.description+'</td><td class="positive">'+iou.amount+iou.currency+'</td></tr>';
      if(totals[iou.currency]==undefined) {
        totals[iou.currency]=0;
      }
      if(iou.payee==you) {
        totals[iou.currency]+= parseInt(iou.amount);
      } else {
        totals[iou.currency]-= parseInt(iou.amount);
      }
    }
  }
  if(historyStr.length) {
    historyStr = '<div id="historyDiv"><ul>'+historyStr+'</ul>';
    for(currency in totals) {
      historyStr +='<h4>Total: '+totals[currency]+currency+'</h4>'
    }
    return historyStr+'</table>';
  } else {
    return '';
  }
}
