function onReloaded(){ // if reload() works
    console.log(`Reloaded`);
}
if(localStorage.getItem('submit_clicked')=='yes') //If state of popup was changed previously
{

    createButton(document.getElementById("Stop"),"Stop_btn",function(){

        document.getElementById("submit").disabled = false;
        
        var elem = document.getElementById("Stop_btn");
       
        elem.parentNode.removeChild(elem);

       localStorage.setItem('submit_clicked','no');

        chrome.runtime.sendMessage({stop: "clicked"}, function(response) {
        console.log(response.interval);
      });
        //clearInterval(myInterval);
        
    });
    
}

function onTabGot(tabInfo) {
  console.log(tabInfo);
}

function onTabError(error) {
  console.log(`Error: ${error}`);
}




function onError(error){ //if reload() returns error
    console.log(`Error: ${error}`);
    var elem = document.getElementById("Stop_btn");
    elem.parentNode.removeChild(elem);
   
    
}

function createButton(context,value,func) { //func to create button
    var button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.id = value;
    button.onclick = func;
    context.appendChild(button);
}

/*function reload() //func to reload page on button click
{
    let reloading =  chrome.tabs.reload();
    reloading.then(onReloaded, onError);
} 
*/
function logTab(tabs)// promise of tab query
{
    /*
    let tab_id;
    for (let tab of tabs) {
        tab_id = tab.id;
    }*/
    const gettingCurrent =chrome.tabs.getCurrent();
    gettingCurrent.then(onTabGot, onTabError);
    localStorage.setItem('tabId',gettingCurrent.id);
}

function onError(error) { // promise of tab query
    console.log(`Error: ${error}`);
  }


document.getElementById("submit").onclick = function(){

    document.getElementById("submit").disabled = true;


    localStorage.setItem('submit_clicked','yes'); //save current state of popup
    
    
    let rate = (document.getElementById("refreshNo").value)/60;

    
    let query = chrome.tabs.query(
        {currentWindow: true, active : true},
        //function(tabArray){tabArray[0].id;}

      )

    query.then(logTab,onError);
    

    
    
    createButton(document.getElementById("Stop"),"Stop_btn",function(){

        document.getElementById("submit").disabled = false;
        
        var elem = document.getElementById("Stop_btn");
       
        elem.parentNode.removeChild(elem);

        localStorage.setItem('submit_clicked','no');

        chrome.runtime.sendMessage({stop: "clicked"}, function(response) {
        console.log(response.interval);
      });
        //clearInterval(myInterval);
        
    });

    /*
    let myInterval = setInterval(() => {
       reload(); 
    }, 1000/rate);
  */


    
    
    chrome.runtime.sendMessage({interval: "set"
                                ,rte: rate,tab_id:localStorage.getItem('tabId')}, function(response) {
        console.log(response.interval);
      });
    
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      
      if (request.interval === "error"){
            
            onError(request.err);
            sendResponse({interval:"cleared"});
        }

    }
  );



