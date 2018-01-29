chrome.commands.onCommand.addListener(function(command) {
	chrome.tabs.query({
    	active: true,
    	lastFocusedWindow: true
	}, function(tabs) {
	    // and use that tab to fill in out title and url
	    var tab = tabs[0];
	    var url = tab.url;
	    var index = url.indexOf("/suite/");
	    if (index != -1) {
	    	var sub = url.substr(0, index);
	    	appendStr = "";
			switch(command) {
				case "open-db":
					appendStr = "/database";
					break;
				case "open-designer":
					appendStr = "/suite/designer";
					break;
				case "open-design":
					appendStr = "/suite/design";
					break;
				case "open-design-rule":
					appendStr = "/suite/design/rule";
					break;
				case "open-tempo":
					appendStr = "/suite/tempo";
					break;
				case "open-admin":
					appendStr = "/suite/admin";
					break;
			}
	    	newUrl = sub.concat(appendStr);
	    	console.log('open URL:', newUrl);
	    	chrome.tabs.create({url: newUrl})
		}
	});
});