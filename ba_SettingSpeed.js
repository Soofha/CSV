var speedrange;
var speed;
var hot1, hot2, hot3;
window.onload=function(){
  speedrange = document.getElementById("speedrange");
  speed = document.getElementById("speed");
  hot1 = document.getElementById("hot1");
  hot2 = document.getElementById("hot2");
  hot3 = document.getElementById("hot3");
  speedrange.addEventListener("input", speedRangeInput);
  
  chrome.storage.sync.get({
    HotKey1: 0,
    HotKey2: 0,
    HotKey3: 0,
    videoSpeed: 0.5
    
  }, function(items) {
    hot1.value = items.HotKey1;
    hot2.value = items.HotKey2;
    hot3.value = items.HotKey3;
    speedrange.value=items.videoSpeed;
    speed.innerHTML=items.videoSpeed;
  });
  hot1.addEventListener("input", ()=>{ 
    chrome.storage.sync.set({
    HotKey1: hot1.value
  });});
  hot2.addEventListener("input", ()=>{ 
    chrome.storage.sync.set({
    HotKey2: hot2.value
  });});
  hot3.addEventListener("input", ()=>{ 
    chrome.storage.sync.set({
    HotKey3: hot3.value
  });});
}

  function speedRangeInput(){
    var newSpeed = speedrange.value;
    
    speed.innerHTML=newSpeed;
    
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "getSpeed", val: newSpeed});
    });
  }

  