


/*chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
});
*/


function onReloaded(){
    console.log(`Reloaded`);
}

function onError(error){
    console.log(`Error: ${error}`);
    var elem = document.getElementById("Stop_btn");
    elem.parentNode.removeChild(elem);
    clearInterval(myInterval);
    
}

function createButton(context,value,func) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.id = value;
    button.onclick = func;
    context.appendChild(button);
}

async function reload()
{
    let reloading = await chrome.tabs.reload();
    reloading.then(onReloaded, onError);
} 

document.getElementById("submit").onclick = function(){

    document.getElementById("submit").disabled = true;
    
    
    let rate = (document.getElementById("refreshNo").value)/60;
    
    createButton(document.getElementById("Stop"),"Stop_btn",function(){

        document.getElementById("submit").disabled = false;
        
        var elem = document.getElementById("Stop_btn");
       
        elem.parentNode.removeChild(elem);
        clearInterval(myInterval);
        
    });


    let myInterval = setInterval(() => {
       reload(); 
    }, 1000/rate);
  
    
    
    
}