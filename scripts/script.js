var response;
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(e) {
    if (xhr.status == 200 & xhr.readyState == 4) {
        console.log(JSON.parse(xhr.responseText))
    }
};

xhr.open('GET', '/photos', true);
xhr.send(null);