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
//Так как ютуб не пересоздает, а обновляет video, следим за его обновлением
var observer2 = new MutationObserver(function(mutationList, observer){
  speedDefault();
});
var observer = new MutationObserver(function(mutationsList, observer) {
  
  for(let mutation of mutationsList) {
    for(let node of mutation.addedNodes) {
      if(node instanceof HTMLVideoElement){ 
        speedDefault();
        //Когда создается новое видео начинаем за ним следить
        observer2.observe(node, {
          childList: true,
          attributes: true
        });
      }
    }
  }

});

observer.observe(document, {
    childList : true,
    subtree: true

});
//Если видео создалось раньше чем началось слежение за ним
document.querySelectorAll("video").forEach(element => {
  observer2.observe(element, {
    childList: true,
    attributes: true
  });
});
speedDefault();

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
