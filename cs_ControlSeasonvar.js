chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        
        case "getSpeed":
          speed(message.val);
          return true;
            
        break;
        case "hotKeys":
          hotKeys(message.val);
          return true;
        break;
        default:
        break;
    }
});


MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
//При добавлении/создании нового эллемента в DOM проверяем его на видео
//TODO вызывается крайне часто, не помешает оптимизация
var observer = new MutationObserver(function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    for(let node of mutation.addedNodes) {
      if(node instanceof HTMLVideoElement){ 
        speedDefault();
      }
    }
  }

});

observer.observe(document, {
    childList : true,
    subtree: true

});
speedDefault();
function hotKeys(value){
    switch(value){
      case "Speed1":
        chrome.storage.sync.get({
          HotKey1: 0
          
        }, function(items) {
          speed(items.HotKey1);
        });
        break;
      case "Speed2":
        chrome.storage.sync.get({
          HotKey2: 0
          
        }, function(items) {
          speed(items.HotKey2);
        });
        break;
      case "Speed3":
        chrome.storage.sync.get({
          HotKey3: 0
          
        }, function(items) {
          speed(items.HotKey3);
        });
        break;
      default: 
        chrome.storage.sync.get({
          HotKey1: 0
          
        }, function(items) {
          speed(items.HotKey1);
        });
        break;
    }
}
function speedDefault(){
  chrome.storage.sync.get({
    videoSpeed: 1
    
  }, function(items) {
    speed(items.videoSpeed);
  });
}
function speed(speed){
  chrome.storage.sync.set({
    videoSpeed: speed
  });
  document.querySelectorAll("video").forEach(element => {
    element.playbackRate = speed;
  });
}
