
/*
 *  RequireJS 1.0.2 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 *   Available via the MIT or new BSD license.
 *    see: http://github.com/jrburke/requirejs for details
 *    */
var requirejs,require,define;
(function(){function J(a){return M.call(a)==="[object Function]"}function E(a){return M.call(a)==="[object Array]"}function Z(a,c,h){for(var k in c)if(!(k in K)&&(!(k in a)||h))a[k]=c[k];return d}function N(a,c,d){a=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+a);if(d)a.originalError=d;return a}function $(a,c,d){var k,j,q;for(k=0;q=c[k];k++){q=typeof q==="string"?{name:q}:q;j=q.location;if(d&&(!j||j.indexOf("/")!==0&&j.indexOf(":")===-1))j=d+"/"+(j||q.name);a[q.name]={name:q.name,location:j||
q.name,main:(q.main||"main").replace(ea,"").replace(aa,"")}}}function V(a,c){a.holdReady?a.holdReady(c):c?a.readyWait+=1:a.ready(!0)}function fa(a){function c(b,l){var f,a;if(b&&b.charAt(0)===".")if(l){p.pkgs[l]?l=[l]:(l=l.split("/"),l=l.slice(0,l.length-1));f=b=l.concat(b.split("/"));var c;for(a=0;c=f[a];a++)if(c===".")f.splice(a,1),a-=1;else if(c==="..")if(a===1&&(f[2]===".."||f[0]===".."))break;else a>0&&(f.splice(a-1,2),a-=2);a=p.pkgs[f=b[0]];b=b.join("/");a&&b===f+"/"+a.main&&(b=f)}else b.indexOf("./")===
0&&(b=b.substring(2));return b}function h(b,l){var f=b?b.indexOf("!"):-1,a=null,d=l?l.name:null,i=b,e,h;f!==-1&&(a=b.substring(0,f),b=b.substring(f+1,b.length));a&&(a=c(a,d));b&&(a?e=(f=m[a])&&f.normalize?f.normalize(b,function(b){return c(b,d)}):c(b,d):(e=c(b,d),h=E[e],h||(h=g.nameToUrl(e,null,l),E[e]=h)));return{prefix:a,name:e,parentMap:l,url:h,originalName:i,fullName:a?a+"!"+(e||""):e}}function k(){var b=!0,l=p.priorityWait,f,a;if(l){for(a=0;f=l[a];a++)if(!s[f]){b=!1;break}b&&delete p.priorityWait}return b}
function j(b,l,f){return function(){var a=ga.call(arguments,0),c;if(f&&J(c=a[a.length-1]))c.__requireJsBuild=!0;a.push(l);return b.apply(null,a)}}function q(b,l){var a=j(g.require,b,l);Z(a,{nameToUrl:j(g.nameToUrl,b),toUrl:j(g.toUrl,b),defined:j(g.requireDefined,b),specified:j(g.requireSpecified,b),isBrowser:d.isBrowser});return a}function o(b){var l,a,c,C=b.callback,i=b.map,e=i.fullName,ba=b.deps;c=b.listeners;if(C&&J(C)){if(p.catchError.define)try{a=d.execCb(e,b.callback,ba,m[e])}catch(k){l=k}else a=
d.execCb(e,b.callback,ba,m[e]);if(e)(C=b.cjsModule)&&C.exports!==void 0&&C.exports!==m[e]?a=m[e]=b.cjsModule.exports:a===void 0&&b.usingExports?a=m[e]:(m[e]=a,F[e]&&(Q[e]=!0))}else e&&(a=m[e]=C,F[e]&&(Q[e]=!0));if(D[b.id])delete D[b.id],b.isDone=!0,g.waitCount-=1,g.waitCount===0&&(I=[]);delete R[e];if(d.onResourceLoad&&!b.placeholder)d.onResourceLoad(g,i,b.depArray);if(l)return a=(e?h(e).url:"")||l.fileName||l.sourceURL,c=l.moduleTree,l=N("defineerror",'Error evaluating module "'+e+'" at location "'+
a+'":\n'+l+"\nfileName:"+a+"\nlineNumber: "+(l.lineNumber||l.line),l),l.moduleName=e,l.moduleTree=c,d.onError(l);for(l=0;C=c[l];l++)C(a)}function r(b,a){return function(f){b.depDone[a]||(b.depDone[a]=!0,b.deps[a]=f,b.depCount-=1,b.depCount||o(b))}}function u(b,a){var f=a.map,c=f.fullName,h=f.name,i=L[b]||(L[b]=m[b]),e;if(!a.loading)a.loading=!0,e=function(b){a.callback=function(){return b};o(a);s[a.id]=!0;w()},e.fromText=function(b,a){var l=O;s[b]=!1;g.scriptCount+=1;g.fake[b]=!0;l&&(O=!1);d.exec(a);
l&&(O=!0);g.completeLoad(b)},c in m?e(m[c]):i.load(h,q(f.parentMap,!0),e,p)}function v(b){D[b.id]||(D[b.id]=b,I.push(b),g.waitCount+=1)}function B(b){this.listeners.push(b)}function t(b,a){var f=b.fullName,c=b.prefix,d=c?L[c]||(L[c]=m[c]):null,i,e;f&&(i=R[f]);if(!i&&(e=!0,i={id:(c&&!d?M++ +"__p@:":"")+(f||"__r@"+M++),map:b,depCount:0,depDone:[],depCallbacks:[],deps:[],listeners:[],add:B},y[i.id]=!0,f&&(!c||L[c])))R[f]=i;c&&!d?(f=t(h(c),!0),f.add(function(){var a=h(b.originalName,b.parentMap),a=t(a,
!0);i.placeholder=!0;a.add(function(b){i.callback=function(){return b};o(i)})})):e&&a&&(s[i.id]=!1,g.paused.push(i),v(i));return i}function x(b,a,f,c){var b=h(b,c),d=b.name,i=b.fullName,e=t(b),k=e.id,j=e.deps,n;if(i){if(i in m||s[k]===!0||i==="jquery"&&p.jQuery&&p.jQuery!==f().fn.jquery)return;y[k]=!0;s[k]=!0;i==="jquery"&&f&&S(f())}e.depArray=a;e.callback=f;for(f=0;f<a.length;f++)if(k=a[f])k=h(k,d?b:c),n=k.fullName,a[f]=n,n==="require"?j[f]=q(b):n==="exports"?(j[f]=m[i]={},e.usingExports=!0):n===
"module"?e.cjsModule=j[f]={id:d,uri:d?g.nameToUrl(d,null,c):void 0,exports:m[i]}:n in m&&!(n in D)&&(!(i in F)||i in F&&Q[n])?j[f]=m[n]:(i in F&&(F[n]=!0,delete m[n],T[k.url]=!1),e.depCount+=1,e.depCallbacks[f]=r(e,f),t(k,!0).add(e.depCallbacks[f]));e.depCount?v(e):o(e)}function n(b){x.apply(null,b)}function z(b,a){if(!b.isDone){var c=b.map.fullName,d=b.depArray,g,i,e,k;if(c){if(a[c])return m[c];a[c]=!0}if(d)for(g=0;g<d.length;g++)if(i=d[g])if((e=h(i).prefix)&&(k=D[e])&&z(k,a),(e=D[i])&&!e.isDone&&
s[i])i=z(e,a),b.depCallbacks[g](i);return c?m[c]:void 0}}function A(){var b=p.waitSeconds*1E3,a=b&&g.startTime+b<(new Date).getTime(),b="",c=!1,h=!1,j;if(!(g.pausedCount>0)){if(p.priorityWait)if(k())w();else return;for(j in s)if(!(j in K)&&(c=!0,!s[j]))if(a)b+=j+" ";else{h=!0;break}if(c||g.waitCount){if(a&&b)return j=N("timeout","Load timeout for modules: "+b),j.requireType="timeout",j.requireModules=b,d.onError(j);if(h||g.scriptCount){if((G||ca)&&!W)W=setTimeout(function(){W=0;A()},50)}else{if(g.waitCount){for(H=
0;b=I[H];H++)z(b,{});g.paused.length&&w();X<5&&(X+=1,A())}X=0;d.checkReadyState()}}}}var g,w,p={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},catchError:{}},P=[],y={require:!0,exports:!0,module:!0},E={},m={},s={},D={},I=[],T={},M=0,R={},L={},F={},Q={},Y=0;S=function(b){if(!g.jQuery&&(b=b||(typeof jQuery!=="undefined"?jQuery:null))&&!(p.jQuery&&b.fn.jquery!==p.jQuery)&&("holdReady"in b||"readyWait"in b))if(g.jQuery=b,n(["jquery",[],function(){return jQuery}]),g.scriptCount)V(b,!0),g.jQueryIncremented=
!0};w=function(){var b,a,c,h,j,i;Y+=1;if(g.scriptCount<=0)g.scriptCount=0;for(;P.length;)if(b=P.shift(),b[0]===null)return d.onError(N("mismatch","Mismatched anonymous define() module: "+b[b.length-1]));else n(b);if(!p.priorityWait||k())for(;g.paused.length;){j=g.paused;g.pausedCount+=j.length;g.paused=[];for(h=0;b=j[h];h++)a=b.map,c=a.url,i=a.fullName,a.prefix?u(a.prefix,b):!T[c]&&!s[i]&&(d.load(g,i,c),c.indexOf("empty:")!==0&&(T[c]=!0));g.startTime=(new Date).getTime();g.pausedCount-=j.length}Y===
1&&A();Y-=1};g={contextName:a,config:p,defQueue:P,waiting:D,waitCount:0,specified:y,loaded:s,urlMap:E,urlFetched:T,scriptCount:0,defined:m,paused:[],pausedCount:0,plugins:L,needFullExec:F,fake:{},fullExec:Q,managerCallbacks:R,makeModuleMap:h,normalize:c,configure:function(b){var a,c,d;b.baseUrl&&b.baseUrl.charAt(b.baseUrl.length-1)!=="/"&&(b.baseUrl+="/");a=p.paths;d=p.pkgs;Z(p,b,!0);if(b.paths){for(c in b.paths)c in K||(a[c]=b.paths[c]);p.paths=a}if((a=b.packagePaths)||b.packages){if(a)for(c in a)c in
K||$(d,a[c],c);b.packages&&$(d,b.packages);p.pkgs=d}if(b.priority)c=g.requireWait,g.requireWait=!1,g.takeGlobalQueue(),w(),g.require(b.priority),w(),g.requireWait=c,p.priorityWait=b.priority;if(b.deps||b.callback)g.require(b.deps||[],b.callback)},requireDefined:function(b,a){return h(b,a).fullName in m},requireSpecified:function(b,a){return h(b,a).fullName in y},require:function(b,c,f){if(typeof b==="string"){if(J(c))return d.onError(N("requireargs","Invalid require call"));if(d.get)return d.get(g,
b,c);c=h(b,c);b=c.fullName;return!(b in m)?d.onError(N("notloaded","Module name '"+c.fullName+"' has not been loaded yet for context: "+a)):m[b]}(b&&b.length||c)&&x(null,b,c,f);if(!g.requireWait)for(;!g.scriptCount&&g.paused.length;)g.takeGlobalQueue(),w();return g.require},takeGlobalQueue:function(){U.length&&(ha.apply(g.defQueue,[g.defQueue.length-1,0].concat(U)),U=[])},completeLoad:function(b){var a;for(g.takeGlobalQueue();P.length;)if(a=P.shift(),a[0]===null){a[0]=b;break}else if(a[0]===b)break;
else n(a),a=null;a?n(a):n([b,[],b==="jquery"&&typeof jQuery!=="undefined"?function(){return jQuery}:null]);S();d.isAsync&&(g.scriptCount-=1);w();d.isAsync||(g.scriptCount-=1)},toUrl:function(a,c){var d=a.lastIndexOf("."),h=null;d!==-1&&(h=a.substring(d,a.length),a=a.substring(0,d));return g.nameToUrl(a,h,c)},nameToUrl:function(a,h,f){var j,k,i,e,m=g.config,a=c(a,f&&f.fullName);if(d.jsExtRegExp.test(a))h=a+(h?h:"");else{j=m.paths;k=m.pkgs;f=a.split("/");for(e=f.length;e>0;e--)if(i=f.slice(0,e).join("/"),
j[i]){f.splice(0,e,j[i]);break}else if(i=k[i]){a=a===i.name?i.location+"/"+i.main:i.location;f.splice(0,e,a);break}h=f.join("/")+(h||".js");h=(h.charAt(0)==="/"||h.match(/^\w+:/)?"":m.baseUrl)+h}return m.urlArgs?h+((h.indexOf("?")===-1?"?":"&")+m.urlArgs):h}};g.jQueryCheck=S;g.resume=w;return g}function ia(){var a,c,d;if(n&&n.readyState==="interactive")return n;a=document.getElementsByTagName("script");for(c=a.length-1;c>-1&&(d=a[c]);c--)if(d.readyState==="interactive")return n=d;return null}var ja=
/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ka=/require\(\s*["']([^'"\s]+)["']\s*\)/g,ea=/^\.\//,aa=/\.js$/,M=Object.prototype.toString,r=Array.prototype,ga=r.slice,ha=r.splice,G=!!(typeof window!=="undefined"&&navigator&&document),ca=!G&&typeof importScripts!=="undefined",la=G&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,da=typeof opera!=="undefined"&&opera.toString()==="[object Opera]",K={},t={},U=[],n=null,X=0,O=!1,d,r={},I,v,x,y,u,z,A,H,B,S,W;if(typeof define==="undefined"){if(typeof requirejs!==
"undefined")if(J(requirejs))return;else r=requirejs,requirejs=void 0;typeof require!=="undefined"&&!J(require)&&(r=require,require=void 0);d=requirejs=function(a,c,d){var k="_",j;!E(a)&&typeof a!=="string"&&(j=a,E(c)?(a=c,c=d):a=[]);if(j&&j.context)k=j.context;d=t[k]||(t[k]=fa(k));j&&d.configure(j);return d.require(a,c)};d.config=function(a){return d(a)};require||(require=d);d.toUrl=function(a){return t._.toUrl(a)};d.version="1.0.2";d.jsExtRegExp=/^\/|:|\?|\.js$/;v=d.s={contexts:t,skipAsync:{}};if(d.isAsync=
d.isBrowser=G)if(x=v.head=document.getElementsByTagName("head")[0],y=document.getElementsByTagName("base")[0])x=v.head=y.parentNode;d.onError=function(a){throw a;};d.load=function(a,c,h){d.resourcesReady(!1);a.scriptCount+=1;d.attach(h,a,c);if(a.jQuery&&!a.jQueryIncremented)V(a.jQuery,!0),a.jQueryIncremented=!0};define=function(a,c,d){var k,j;typeof a!=="string"&&(d=c,c=a,a=null);E(c)||(d=c,c=[]);!c.length&&J(d)&&d.length&&(d.toString().replace(ja,"").replace(ka,function(a,d){c.push(d)}),c=(d.length===
1?["require"]:["require","exports","module"]).concat(c));if(O&&(k=I||ia()))a||(a=k.getAttribute("data-requiremodule")),j=t[k.getAttribute("data-requirecontext")];(j?j.defQueue:U).push([a,c,d])};define.amd={multiversion:!0,plugins:!0,jQuery:!0};d.exec=function(a){return eval(a)};d.execCb=function(a,c,d,k){return c.apply(k,d)};d.addScriptToDom=function(a){I=a;y?x.insertBefore(a,y):x.appendChild(a);I=null};d.onScriptLoad=function(a){var c=a.currentTarget||a.srcElement,h;if(a.type==="load"||c&&la.test(c.readyState))n=
null,a=c.getAttribute("data-requirecontext"),h=c.getAttribute("data-requiremodule"),t[a].completeLoad(h),c.detachEvent&&!da?c.detachEvent("onreadystatechange",d.onScriptLoad):c.removeEventListener("load",d.onScriptLoad,!1)};d.attach=function(a,c,h,k,j,n){var o;if(G)return k=k||d.onScriptLoad,o=c&&c.config&&c.config.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),o.type=j||"text/javascript",o.charset="utf-8",o.async=!v.skipAsync[a],c&&o.setAttribute("data-requirecontext",
c.contextName),o.setAttribute("data-requiremodule",h),o.attachEvent&&!da?(O=!0,n?o.onreadystatechange=function(){if(o.readyState==="loaded")o.onreadystatechange=null,o.attachEvent("onreadystatechange",k),n(o)}:o.attachEvent("onreadystatechange",k)):o.addEventListener("load",k,!1),o.src=a,n||d.addScriptToDom(o),o;else ca&&(importScripts(a),c.completeLoad(h));return null};if(G){u=document.getElementsByTagName("script");for(H=u.length-1;H>-1&&(z=u[H]);H--){if(!x)x=z.parentNode;if(A=z.getAttribute("data-main")){if(!r.baseUrl)u=
A.split("/"),z=u.pop(),u=u.length?u.join("/")+"/":"./",r.baseUrl=u,A=z.replace(aa,"");r.deps=r.deps?r.deps.concat(A):[A];break}}}d.checkReadyState=function(){var a=v.contexts,c;for(c in a)if(!(c in K)&&a[c].waitCount)return;d.resourcesReady(!0)};d.resourcesReady=function(a){var c,h;d.resourcesDone=a;if(d.resourcesDone)for(h in a=v.contexts,a)if(!(h in K)&&(c=a[h],c.jQueryIncremented))V(c.jQuery,!1),c.jQueryIncremented=!1};d.pageLoaded=function(){if(document.readyState!=="complete")document.readyState=
"complete"};if(G&&document.addEventListener&&!document.readyState)document.readyState="loading",window.addEventListener("load",d.pageLoaded,!1);d(r);if(d.isAsync&&typeof setTimeout!=="undefined")B=v.contexts[r.context||"_"],B.requireWait=!0,setTimeout(function(){B.requireWait=!1;B.takeGlobalQueue();B.jQueryCheck();B.scriptCount||B.resume();d.checkReadyState()},0)}})();


var syncer;

//remoteStorage.js:
require(['./syncer/remoteStorage'], function(drop) {
  remoteStorage = drop;


  //sync.js itself:

  syncer = (function() {
    var indexCache = {};
    var indexKey;
    var readyState={};
    orsc=function(obj){console.log('ready state changed to:');console.log(obj);};
    oc=function(obj){console.log('incoming changeset:');console.log(obj);};
    ol=function(str){
      console.log(str);
    }
    function inspect() { 
      var popIn = document.getElementById('inspector-gadget');
      if(!popIn) {
        popIn = document.createElement('table');
        var style = ("<style>$ th, $ td {padding:0 1em;text-align:left;}$ th{font-weight:bold}$ pre{max-width:400px;max-height:300px;overflow:auto;white-space:pre-wrap;}$ h1{font:16px/32px sans-serif;}</style>").replace(/\$/g,"#inspector-gadget");
        var s = style + "<tr><th><h1>Inspector Gadget</h1></th></tr><tr><td id=\"popInLog\"></td></tr>";

        popIn.innerHTML = s;

        popIn.setAttribute("style","position:fixed;top:20px;right:20px;padding:20px;background:#fff;font:12px/20px monospace;z-index:99999;max-height:100%;overflow:auto;border-radius:10px;border:2px solid #000");
        popIn.style.display="block";
        document.body.appendChild(popIn);
         ol = function(str) {
          document.getElementById('popInLog').innerHTML = '<p>' + str + '</p>' + document.getElementById('popInLog').innerHTML;
        };
      }
    }
    function changeReadyState(field, value) {
      readyState[field]=value;
      orsc(readyState);
    }
    //localStorage keys used by this lib:
    //_unhosted/userAddress
    //_unhosted/paths
    //_unhosted/storageInfo
    //_unhosted/bearerToken
    
    //_unhosted/pullInterval
    
    //_unhosted/lastPushStartTime
    //_unhosted/lastPullStartTime
    
    //_unhosted/lastPushEndTime
    //_unhosted/lastPullEndTime
   
    //for each [path]:
    //_unhosted/index:[path]

    function connect(userAddress, readAccess, fullAccess, pullInterval, dialogPath) {
      ol('syncer.connect('
        +JSON.stringify(userAddress)+', '
        +JSON.stringify(readAccess)+', '
        +JSON.stringify(fullAccess)+', '
        +JSON.stringify(pullInterval)+', '
        +JSON.stringify(dialogPath)+');');
      if(localStorage['_unhosted/bearerToken']) {
        console.log('err: already connected');
        return;
      }
      if(typeof(dialogPath) === 'undefined') {
        dialogPath = 'syncer/dialog.html';
      }
      if(typeof(pullInterval) === 'undefined') {
        pullInterval = 60;
      }
      var paths = [];
      for(var i=0; i<readAccess.length; i++) {
        paths.push(readAccess[i]+':r');
      }
      for(var i=0; i<fullAccess.length; i++) {
        paths.push(fullAccess[i]+':rw');
      }
      localStorage['_unhosted/userAddress'] = userAddress;
      localStorage['_unhosted/paths'] = JSON.stringify(paths);
      localStorage['_unhosted/pullInterval'] = pullInterval;
      window.open(dialogPath);
      window.addEventListener('storage', function(event) {
        if(event.key=='_unhosted/bearerToken' && event.newValue) {
          if(pullInterval) {
            setInterval(work, pullInterval*1000);//will first trigger a pull if it's time for that
          }
          changeReadyState('connected', true);
        }
        if(event.key=='_unhosted/dialogResult' && event.newValue) {
          try {
            console.log(JSON.parse(event.newValue));
          } catch(e) {
            console.log('unparseable dialog result');
          }
        }
      }, false);
      //TODO: deal with dialog failures
    }
    function toWebAddress(userAddress, path) {
      return getStorageBaseAddress(userAddress)+path;
    }
    function parseObj(str) {
      var obj;
      try {
        obj = JSON.parse(str);
      } catch(e) {
      }
      if(obj) {//so str is parseable /and/ the result is not falsy
        return obj;
      } else {
        return {};
      }
    }
    function iterate(obj, itemCb, finishedCb, lastItem) {//helper function to async over an object's keys.
      if(typeof(obj) == 'object') {
        for(var thisItem in obj) {
          if(!lastItem) {
            itemCb(thisItem, function() {
              iterate(obj, itemCb, finishedCb, thisItem);
            });
            return;//execution will continue in the callback of itemCb
          } else if(thisItem == lastItem) {
            lastItem = undefined;//go execute on next one
          }
        }
      }
      finishedCb();
    }
    function pullIn(localIndex, remoteIndex, client, cb) {//iterates over remoteIndex, pulling where necessary
      iterate(remoteIndex, function(item, doneCb) {
        if(!localIndex[item] || localIndex[item] < remoteIndex[item]) {
          client.get(item/*+':'+remoteIndex[item]*/, function(err, data) {
            if(!err) {
              var oldValue = localStorage[client.path+'/'+item];
              localIndex[item]=remoteIndex[item]
              localStorage[client.path+'/']=JSON.stringify(localIndex);
              localStorage[client.path+'/'+item]=data;
              oc({
                path: client.path,
                key: item,
                oldValue: oldValue,
                newValue: data,
                timestamp: remoteIndex[item]
              });
              ol(client.path+'/'+item+' <- '+data);
            }
            doneCb();
          }); 
        } else {
          doneCb();
        }
      }, cb);
    }
    function pushOut(localIndex, remoteIndex, client, cb) {//iterates over localIndex, pushing where necessary
      var havePushed=false;
      iterate(localIndex, function(item, doneCb) {
        if(!remoteIndex[item] || remoteIndex[item] < localIndex[item]) {
          client.put(item/*+':'+localIndex[item]*/, localStorage[client.path+'/'+item], function(err) {
            if(err) {
              console.log('error pushing: '+err);
            } else {//success reported, so set remoteIndex timestamp to ours
              ol(client.path+'/'+item+' -> '+localStorage[client.path+'/'+item]);
              remoteIndex[item]=localIndex[item];
              havePushed=true;
            }
            doneCb();
           });
        } else {
          doneCb();
        }
      }, function() {
        //if(havePushed) {
          //client.put('_index', JSON.stringify(remoteIndex), function(err) {
          //  if(err) {
          //    console.log('error pushing index: '+err);
          //  }
          //  cb();
          //});
        //} else {
          cb();
        //}
      });
    }
    function pullPath(storageInfo, path, bearerToken, cb) {//calls pullIn, then pushOut for a path
      var client=remoteStorage.createClient(storageInfo, path, bearerToken);
      client.path = path;
      client.get('/', function(err, data) {
        if(!err) {
          var remoteIndex=parseObj(data);
          var localIndex = parseObj(localStorage[path+'/']);
          pullIn(localIndex, remoteIndex, client, function() {
            pushOut(localIndex, remoteIndex, client, cb);
          });
        }
      });
    }
    function pullPaths(storageInfo, paths, bearerToken, cb) {//calls pullPath once for every path
      if(paths.length) {
        var thisCat=paths.shift();
        pullPath(storageInfo, thisCat, bearerToken, function() {
          pullPaths(storageInfo, paths, bearerToken, cb);
        });
      } else {
        cb();
      }
    }
    function pull(cb) {//gathers settings and calls pullPaths
      var paths, storageInfo, bearerToken;
      try {
        paths=JSON.parse(localStorage['_unhosted/paths']);
        storageInfo=JSON.parse(localStorage['_unhosted/storageInfo']);
        bearerToken=localStorage['_unhosted/bearerToken'];
      } catch(e) {
      }
      if(paths && storageInfo && bearerToken) {
        pullPaths(storageInfo, paths, bearerToken, cb);
      }
    }
    function maybePull(now, cb) {
      if(localStorage['_unhosted/pullInterval']) {
        if(!localStorage['_unhosted/lastPullStartTime'] //never pulled yet
          || parseInt(localStorage['_unhosted/lastPullStartTime']) + localStorage['_unhosted/pullInterval']*1000 < now) {//time to pull
          localStorage['_unhosted/lastPullStartTime']=now;
          changeReadyState('syncing', true);
          pull(function() {
            changeReadyState('syncing', false);
            cb();
          });
        } else {
          cb();
        }
      } else {
        cb();
      }
    }
    function pushItem(path, key, timestamp, indexStr, valueStr, cb) {
      console.log('push '+path+'/'+key+': '+valueStr);
      if(path != '_unhosted') {
        var storageInfo, bearerToken;
        try {
          storageInfo=JSON.parse(localStorage['_unhosted/storageInfo']);
          bearerToken=localStorage['_unhosted/bearerToken'];
        } catch(e) {
        }
        if(storageInfo && bearerToken) {
          var client = remoteStorage.createClient(storageInfo, path, bearerToken);
          client.put('_index', indexStr, function(err, data) {
            client.put(key+':'+timestamp, valueStr, function(err, data) {
            });
          });
        }
      }
      if(cb) {
        cb();//not really finished here yet actually
      }
    }
    function onLoad() {
      if(localStorage['_unhosted/pullInterval']) {
        delete localStorage['_unhosted/lastPullStartTime'];
        work();
        setInterval(work, localStorage['_unhosted/pullInterval']*1000);
      }
    }
    function work() {
      var now = new Date().getTime();
      maybePull(now, function() {
      });
    }
    function onReadyStateChange(cb) {
      orsc=cb;
      changeReadyState('connected', (localStorage['_unhosted/bearerToken'] != null));
    }
    function onChange(cb) {
      oc=cb;
    }
    function getUserAddress() {
      return localStorage['_unhosted/userAddress'];
    }
    function getItem(path, key) {
      ol('syncer.getItem('
        +JSON.stringify(path)+', '
        +JSON.stringify(key)+');');
      try {
        return JSON.parse(localStorage[path+'/'+key]);
      } catch(e) {
        return null;
      }
    }
    function setItem(path, key, value) {
      ol('syncer.setItem('
        +JSON.stringify(path)+', '
        +JSON.stringify(key)+', '
        +JSON.stringify(value)+');');
      var valueStr = JSON.stringify(value);
      if(key=='_index') {
        return 'item key "_index" is reserved, pick another one please';
      } else {
        var currValStr = localStorage[path+'/'+key];
        if(valueStr != currValStr) {
          var now = new Date().getTime();
          var index;
          try {
            index=JSON.parse(localStorage[path+'/']);
          } catch(e) {
          }
          if(!index) {
            index={};
          }
          index[key]=now;
          var indexStr=JSON.stringify(index);
          localStorage[path+'/']=indexStr;
          localStorage[path+'/'+key]=valueStr;
          pushItem(path, key, now, indexStr, valueStr);
          oc({key: key, oldValue: getItem(path, key), newValue: value});
        }
      }
    }
    function removeItem(path, key) {
      ol('syncer.removeItem('
        +JSON.stringify(path)+', '
        +JSON.stringify(key)+');');
      if(key=='_index') {
        return 'item key "_index" is reserved, pick another one please';
      } else {
        var index;
        try {
          index=JSON.parse(localStorage[path+'/']);
        } catch(e) {
        }
        if(index) {
          delete index[key];
          var indexStr=JSON.stringify(index);
          localStorage[path+'/']=indexStr;
          delete localStorage[path+'/'+key];
          var now = new Date().getTime();
          pushItem(path, key, now, indexStr, null);
          oc({key: key, oldValue: getItem(path, key), newValue: undefined});
        }
      }
    } 
    function getCollection(path) {
      ol('syncer.getCollection('
        +JSON.stringify(path)+');');
      var index;
      try {
        index=JSON.parse(localStorage[path+'/']);
      } catch(e) {
      }
      if(index) {
        var items = [];
        for(var i in index) {
          try {
            items.push(JSON.parse(localStorage[path+'/'+i]));
          } catch(e) {
          }
        }
        return items;
      } else {
        return [];
      }
    }
    function display(options) {
      //TODO: check if barElement, readAccess, fullAccess, libDir, onChange are all set
      if(options.libDir.length && libDir[libDir.length - 1] != '/') {//libDir without trailing slash
        options.libDir += '/'
      }
      document.getElementById(options.barElement).innerHTML = '<div id="remotestorage-loading">Loading...</div>'
        +'<div id="remotestorage-disconnected" style="display:none">'
        +'  <input id="remotestorage-useraddress" autofocus="" placeholder="user@server"'
        +'    style="width:20em; height:2.5em; padding-left:4em; background:url(\''+options.libDir+'remoteStorage-icon.png\') no-repeat .3em center"'
        +'> <input id="remotestorage-connect" type="submit" value="connect"'
        +'    style="cursor:pointer;background-color: #006DCC; background-image: -moz-linear-gradient(center top , #0088CC, #0044CC); background-repeat: repeat-x;'
        +'      border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); border-radius: 4px; margin-left:-7em"'
        +'><a style="padding-left:2em" href="http://unhosted.org/#remotestorage">Got your remote storage yet?</a></div>'
        +'<div id="remotestorage-status"></div>';
      onReadyStateChange(function(obj) {
        if(obj.connected) {
          document.getElementById('remotestorage-disconnected').style.display='none';
          document.getElementById('remotestorage-loading').style.display='none';
          document.getElementById('remotestorage-status').style.display='block';
          document.getElementById('remotestorage-status').innerHTML=
            '<span>Connected to <strong>'
            +getUserAddress()
            +'</strong> <input type="submit" value="disconnect" id="remotestorage-disconnect"></div>'
            +(obj.syncing?' Syncing... ':'')
            +'</span>';
          document.getElementById('remotestorage-disconnect').onclick= function() { 
            localStorage.clear();
            optoins.onChange({key: null, oldValue: null, newValue: null});
            changeReadyState('connected', false);
          }
        } else {
          document.getElementById('remotestorage-loading').style.display='none';
          document.getElementById('remotestorage-status').style.display='none';
          document.getElementById('remotestorage-disconnected').style.display='block';
          document.getElementById('remotestorage-connect').onclick = function() {
            connect(document.getElementById('remotestorage-useraddress').value, options.readAccess, options.fullAccess, 10, options.libDir+'dialog.html');
          };
        }
      });
      onChange(options.onChange);
      //init all data:
      for(var i=0; i < paths.length; i++) {
        fetch(paths[i]);
      }
      function fetch(path) {
        var thisColl = getCollection(path);
        for(var key in thisColl) {
          if(key[key.length-1]=='/') {
            fetch(path+key);
          } else {
            onChangeHandler({key: path+key, newValue: getItem(path+key), oldValue: undefined});
          }
        }
      }
    }
    onLoad();
    return {
      getItem       : getItem,
      getCollection : getCollection,
      setItem       : setItem,
      removeItem    : removeItem,
      display       : display,
      inspect       : inspect
    };
  })();
  //API:
  //
  // - call display(barElement, paths, libDir, onChangeHandler({key:.., oldValue:.., newValue:..}));
  // - getCollection retrieves the array of items regardless of their id (so it makes sense to store the id inside the item)
  // - CRUD: getItem gets one item. setItem for create and update. removeItem for delete.
  //
  // a note on sync:
  // if just one client connects, then it will feel like localStorage while the user is connected. the only special case there is the moment the user connects.
  // when the page loads for the first time, there will be no data. then the user connects, and your app will receive onChange events. make sure you handle these well.
  // in fact, your app should already have a handler for 'storage' events, because they occur when another tab or window makes a change to localStorage.
  // so you'll be able to reuse that function.
  //
  // if the user tries to leave the page while there is still unsynced data, a 'leave page?' alert will be displayed. disconnecting while offline will lead to loss of data too.
  // but as long as you don't disconnect, it'll all be fine, and sync will resume when the tab is reopened and/or connectivity is re-established.
  //
  // when another device or browser makes a change, it will come in through your onChange handler. it will 'feel' like a change that came from another tab.
  // when another device makes a change while either that device or you, or both are disconnected from the remoteStorage, the change will come in later, and conflict resolution 
  // will be per item, on timestamp basis. note that these are the timestamps generated on the devices, so this only works well if all devices have their clocks in sync.
  // in all cases, you will get an event on your onChange handler for each time data is changed by another device. the event will contain both the old and the new value of the item,
  // so you can always override a change by issuing a setItem command back to the oldValue.
});

