//Requette AJAX générique
function ajaxGet(url, callBack){
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function(){
        if(req.status >= 200 &&  req.status < 400){
            callBack(req.responseText);
        }
        else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function(){
        console.error("Erreur avec l'URL " + url);
    });
    req.send(null);
}
