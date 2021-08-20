
chrome.commands.onCommand.addListener((command) => {
    
    if(command == "Speed1" || command == "Speed2" ||command == "Speed3")
    {
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "hotKeys", val: command});
      });
    }
  });