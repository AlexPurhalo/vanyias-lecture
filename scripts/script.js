var response;
var xhr = new XMLHttpRequest();

const gallery = document.getElementById('gallery');
xhr.onreadystatechange = function() {
    if (xhr.status == 200 & xhr.readyState == 4) {
        var photos = JSON.parse(xhr.responseText);

        for (var i =0; i < photos.length; i++) {
            var photo = document.createElement('div'),
                img = document.createElement('img');

            photo.classList.add('photo');
            img.src = photos[i].url;

            photo.appendChild(img);
            gallery.appendChild(photo);
        }

        xhr = new XMLHttpRequest();

        xhr.onreadystatechange  = function() {
            if (xhr.status == 200 & xhr.readyState == 4) {
                console.log(xhr.responseText)
            }
        };

        xhr.open('PUT', 'https://randomuser.me/api/', true)
        xhr.send(null)
    }
};

xhr.open('GET', '/photos', true);
xhr.send(null);