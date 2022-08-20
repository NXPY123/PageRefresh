function onGot(tabInfo) {
  console.log(tabInfo);
}



function onError(error) {
  console.log(`Error: ${error}`);
}




function onReloaded()
{

}

function onError(error)
{
    chrome.runtime.sendMessage({interval: "error",
                                err:error}, function(response) {
        console.log(response.interval);
      });
    clearInterval(myInterval);
}


function reload(tab_id) //func to reload page on button click
{
    
    let reloading = chrome.tabs.reload(tab_id);

    reloading.then(onReloaded, onError);
} 

/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      
      if (request.stop === "clicked"){
            
            clearInterval(myInterval);
            sendResponse({interval:"cleared"});
        }

    }
  );
*/








/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );
*/
let myInterval;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      
      if (request.interval === "set"){
          
            myInterval = setInterval(() => {
            const current_tab = chrome.tabs.getCurrent();
            current_tab.then(onGot, onError);
            reload(current_tab.tab_id); 
            }, 1000/(request.rte));
            
            sendResponse({interval:"created"});
        }

        if (request.stop === "clicked"){
            
            clearInterval(myInterval);
            sendResponse({interval:"cleared"});
        }

    }
  );


  


