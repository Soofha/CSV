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
//Приходится ждать 5 сек что бы страница "точно" создалась так как объекты появляютя после загрузки страницы
setTimeout(()=>{
    if(!document.getElementsByTagName("video")[0]){
        return;
    }
    chrome.storage.sync.get({
        videoSpeed: 1
        
    }, function(items) {
        speed(items.videoSpeed);
    });

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        chrome.storage.sync.get({
            videoSpeed: 1
            
        }, function(items) {
            speed(items.videoSpeed);
        });
    
    });

    observer.observe(document.getElementsByTagName("video")[0], {
        childList : true,
        attributes: true
    
    });
}, 5000);

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

  function speed(speed){
    chrome.storage.sync.set({
      videoSpeed: speed
    });
    if(document.getElementsByTagName("video")[0]){
        document.getElementsByTagName("video")[0].playbackRate=speed;
    }    
  }