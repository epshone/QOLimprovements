//window.addEventListener('keyup', doKeyPress, false);
if (window == top) {
   console.log('debug:', "Adding Event Listener");
   window.addEventListener('keydown', doKeyPress, false); //add the keyboard handler
}

var altCommands = {
  "Digit1": "open-db",
  "Digit2": "open-designer",
  "Digit3": "open-design",
  "Digit4": "open-rule",
  "Digit5": "open-tempo",
  "Digit6": "open-admin",
};

var altShiftCommands = {
  "Digit3": "open-objects",
  "Digit4": "open-interface"    
};

function doKeyPress(e){
  console.log("keypress:", e);
  // e.shiftKey, e.ctrlKey, e.altKey,
  command = "";
  console.log("e.code:", e.code);
  if(e.shiftKey && e.altKey && e.ctrl) {}
  else if(e.shiftKey && e.altKey) {
    command = altShiftCommands[e.code];
  } else if(e.altKey) {
    command = altCommands[e.code];
  };
  console.log("command:", command);
  if (command) {
    console.log("request:", "sending");
    chrome.extension.sendRequest({command: command});
  }
};  











