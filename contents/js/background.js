(function(){
  var DEFAULT_ENVIRONMENT = "";
  var APPIAN_SUITE = "/suite/";
  var URL_SKELETON = "https://*"+APPIAN_SUITE+"*";
  var LOCK_ENVIRONMENT = false;
  
  var commandBindings = {
    "open-db": "/database",
    "open-designer": "/suite/designer",
    "open-design": "/suite/design",
    "open-objects": "/suite/design/objects",
    "open-rule": "/suite/design/rule",
    "open-tempo": "/suite/tempo",
    "open-admin": "/suite/admin",
    "open-interface": "/suite/design/interface"
  };

  chrome.storage.sync.get('default_env', function(result){
    if(result.default_env) DEFAULT_ENVIRONMENT = result.default_env;
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log("debug:", "WORKING");
    switch(request.type) {
      case Request.Type.SET_ENVIRONMENT: 
        console.log("set:",request)  
        var response = setDefaultEnvironment(request.data);
        sendResponse(response);
        break;
      case Request.Type.SET_LOCK: 
        console.log("set:",request);
        LOCK_ENVIRONMENT = request.data.lock;
        chrome.storage.sync.set({lock_env: LOCK_ENVIRONMENT});
        break;
      case Request.Type.OPEN_TAB_EVENT:
        console.log("open:",request);
        openTab(request.data["command"]);
        break;
    }
  });

  function openTab(command) {
    chrome.tabs.query({
      url: URL_SKELETON, // Match tabs that contain the url skeleton
      lastFocusedWindow: true // Only use the last chrome window that had focus
    }, function(tabs) {
      // and use that tab to fill in out title and url
      var tab = getTab(tabs);
      var url = !tab || LOCK_ENVIRONMENT ? DEFAULT_ENVIRONMENT : tab.url;
      var index = url.indexOf(APPIAN_SUITE);
      if (index != -1) {
        var sub = url.substr(0, index);
        appendStr = commandBindings[command];
        if(appendStr){
          newUrl = sub.concat(appendStr);
          console.log('command:', command);
          console.log('open URL:', newUrl);
          chrome.tabs.create({url: newUrl});
        }
      }
    });
  }

  function getTab(tabs){
    if(tabs.length == 0) return false;
    for(var i in tabs){
      if(tabs[i].active) return tabs[i];
    }
    return tabs[tabs.length-1];
  }

  function setDefaultEnvironment(data){
    var url = data.url;
    var https = "https://";
    var httpsIndex = url.indexOf(https);
    if(httpsIndex == -1){
      return "<div style='color:red'>Invalid envrionment URL. Envrionment URLs must use 'https'.</div>";
    }
    var index = url.indexOf(APPIAN_SUITE);
    if(index == -1){
      return "<div style='color:red'>Invalid envrionment URL. Envrionment URLs must use contain "+APPIAN_SUITE+".</div>";
    }

    DEFAULT_ENVIRONMENT = url.substring(0, index+APPIAN_SUITE.length);
    chrome.storage.sync.set({"default_env": DEFAULT_ENVIRONMENT}, function(){});
    return "<div style='color:green'>Current environment set to: "+DEFAULT_ENVIRONMENT+".</div>";
  }
})();
