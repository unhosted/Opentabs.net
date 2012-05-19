
    function makeTabLists(tabs) {
      //basic tab: {payer, payee, amount, currency, timestamp}, signatures, comments.
      //here is the business logic that adds 'status'
      var _statuses = {
        'pendingIn': 0,//'?' - accept, decline
        'declinedOut': 1,//'X' - close
        'hurryB': 2,//(open and last comment is from payee & viewer is payer) '!', red
        'sentL': 3,//'tick' - 'confirm'
        
	//track:
        'pendingOut': 4,// '?' - cancel
        'hurryL': 5,//(open and last comment is from payee & viewer is payee); '!', green

        //open:
        'declinedIn': 6,//'X' -
        'openB': 7,//'' - 'Settled'
        'openL': 7,//'' - 'Remind/Settled'
        'sentB': 8,//'tick'

        //history:
        'closed': 9,//''
        'settled': 10//''
      };
      var lists = {
        notif: [],
	track: [],
	open: [],
	history: []
      };
      for(var i in tabs) {
        var tab = tabs[i];
	if(isSignedByMe(tab)) {
	  if(isSignedByPeer(tab)) {
	    if(payeeIsMe(tab)) {
	      if(hasLastMessageFromMe(tab)) {
	        tab.status=_statuses.hurryL;//BLM
		tab.icon='! L';
              } else if(hasLastMessageFromPeer(tab)) {
	        tab.status=_statuses.sentL;//BLT
		tab.icon='v L';
	      } else {
	        tab.status=_statuses.openL;//BLN
		tab.icon='L';
	      }
	    } else {
	      if(hasLastMessageFromPeer(tab)) {
	        tab.status=_statuses.hurryB;//BBT
		tab.icon='! B';
              } else if(hasLastMessageFromMe(tab)) {
	        tab.status=_statuses.sentB;//BBM
		tab.icon='v B';
	      } else {
	        tab.status=_statuses.openB;//BBN
		tab.icon='B';
	      }
	    }
	  } else {
            if(hasLastCommentFromPeer(tab)) {
	      tab.status=_statuses.declinedOut;//MT
	      tab.icon='X O';
	    } else {
	      tab.status=_statuses.pendingOut;//MN
	      tab.icon='? O';
	    }
          }
	} else {
	  if(hasLastCommentFromMe(tab)) {
	    tab.status=_statuses.declinedIn;//TM
	    tab.icon='X I';
	  } else {
	    tab.status=_statuses.pendingIn;//TN
	    tab.icon='? I';
	  }
	}
	if(tab.status<4) {
	  lists.notif.push(tab);
        } else if(tab.status<7) {
	  lists.track.push(tab);
        } else if(tab.status<9) {
	  lists.open.push(tab);
	} else {
	  lists.history.push(tab);
	}
      }
      return lists;
    }
