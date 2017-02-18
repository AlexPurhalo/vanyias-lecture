var response;
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(e) {
    if (xhr.status == 200 & xhr.readyState == 4) {
        console.log(xhr.responseText)
    }
};

xhr.open('GET', '/hello', true);
xhr.send(null);