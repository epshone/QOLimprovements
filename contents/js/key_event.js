//window.addEventListener('keyup', doKeyPress, false);
if (window == top) {
   console.log('debug:', "Adding Event Listener");
   window.addEventListener('keydown', doKeyPress, false); //add the keyboard handler
}

// do from storage sync eventually
var KeyBindingCommands = {
  "Alt+Digit1": 1,
  "Alt+Digit2": "open-designer",
  "Alt+Digit3": "open-design",
  "Alt+Digit4": "open-rule",
  "Alt+Digit5": "open-tempo",
  "Alt+Digit6": "open-admin",
  "Alt+Shift+Digit3": "open-objects",
  "Alt+Shift+Digit4": "open-interface"
}

function doKeyPress(e){
  var keyBinding = currentKeyBinding(e);
  var command = KeyBindingCommands[keyBinding];
  if (command) {
    var request = new Request(Request.Type.OPEN_TAB_EVENT, {command: command});
    console.log("request:", request.serialize());
    chrome.runtime.sendMessage(request.serialize());
    // chrome.extension.sendRequest({command: command});
  }
};

function currentKeyBinding(e){
  var str = "";
  if(e.ctrlKey){
    str += "Ctrl+"
  }
  if(e.altKey){
    str += "Alt+"
  }
  if(e.shiftKey){
    str += "Shift+"
  }
  return str + e.code
}; 











