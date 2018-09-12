(function(){
	var DEFAULT_ENVIRONMENT = "";
	var APPIAN_SUITE = "/suite/";
	var URL_SKELETON = "https://*"+APPIAN_SUITE+"*";
	var LOCK_ENVIRONMENT = false;
	var commands = {
		OPEN_DB: "open-db",
		OPEN_DESIGNER: "open-designer",
		OPEN_DESIGN: "open-design",
		OPEN_OBJECTS: "open-objects",
		OPEN_RULE: "open-rule",
		OPEN_TEMPO: "open-tempo",
		OPEN_ADMIN: "open-admin",
		OPEN_INTERFACE: "open-interface"
	};
	var urls = {
		DATABASE: "/database",
		DESIGNER: "/suite/designer",
		DESIGN: "/suite/design",
		OBJECTS: "/suite/design/objects",
		RULE: "/suite/design/rule",
		TEMPO: "/suite/tempo",
		ADMIN: "/suite/admin",
		INTERFACE: "/suite/design/interface"
	};

	chrome.storage.sync.get('default_env', function(result){
		if(result.default_env) DEFAULT_ENVIRONMENT = result.default_env;
	});

	chrome.commands.onCommand.addListener(function(command) {
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
			    	appendStr = "";
					switch(command) {
						case commands.OPEN_DB:
							appendStr = urls.DATABASE;
							break;
						case commands.OPEN_DESIGNER:
							appendStr = urls.DESIGNER;
							break;
						case commands.OPEN_DESIGN:
							appendStr = urls.DESIGN;
							break;
						case commands.OPEN_OBJECTS:
							appendStr = urls.OBJECTS;
							break;
						case commands.OPEN_RULE:
							appendStr = urls.RULE;
							break;
						case commands.OPEN_TEMPO:
							appendStr = urls.TEMPO;
							break;
						case commands.OPEN_ADMIN:
							appendStr = urls.ADMIN;
							break;
						case commands.OPEN_INTERFACE:
							appendStr = urls.INTERFACE;
							break;
					}
		    	newUrl = sub.concat(appendStr);
		    	console.log('command:', command);
		    	console.log('open URL:', newUrl);
		    	chrome.tabs.create({url: newUrl})
			}
		});
	});

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		if(request.type === Request.Type.SET_ENVIRONMENT){
			console.log("set",request)
			var response = setDefaultEnvironment(request.data);
			sendResponse(response);
		}
		else if(request.type === Request.Type.SET_LOCK){
			console.log("set",request);
			LOCK_ENVIRONMENT = request.data.lock;
			chrome.storage.sync.set({lock_env: LOCK_ENVIRONMENT});
		}
	});

	chrome.extension.onRequest.addListener(function(request, sender) {
		console.log("REQUEST", request)
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
			    	appendStr = "";
					switch(request.command) {
						case commands.OPEN_DB:
							appendStr = urls.DATABASE;
							break;
						case commands.OPEN_DESIGNER:
							appendStr = urls.DESIGNER;
							break;
						case commands.OPEN_DESIGN:
							appendStr = urls.DESIGN;
							break;
						case commands.OPEN_OBJECTS:
							appendStr = urls.OBJECTS;
							break;
						case commands.OPEN_RULE:
							appendStr = urls.RULE;
							break;
						case commands.OPEN_TEMPO:
							appendStr = urls.TEMPO;
							break;
						case commands.OPEN_ADMIN:
							appendStr = urls.ADMIN;
							break;
						case commands.OPEN_INTERFACE:
							appendStr = urls.INTERFACE;
							break;
					}
		    	newUrl = sub.concat(appendStr);
		    	console.log('command:', request.command);
		    	console.log('open URL:', newUrl);
		    	chrome.tabs.create({url: newUrl})
			}
		});
    });

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
			return "<div style='color:red'>Invalid envrionment URL. Envrionment URLs must use 'https'.</div>"
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
