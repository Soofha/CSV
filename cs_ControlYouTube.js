

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
speedDefault();

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
   
    speedDefault();
    
});

//document.getElementsByTagName("title")[0] Костыль для поиска перехода на новое видео
  observer.observe(document.getElementsByTagName("title")[0], {
    childList : true
    
});

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
  if(document.getElementsByClassName("video-stream html5-main-video")[0]){
    document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = speed;
  }
}

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