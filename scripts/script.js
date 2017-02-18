let response;
let xhr = new XMLHttpRequest();

const gallery = document.getElementById('gallery');

xhr.onreadystatechange  = () => {
    if (xhr.status == 200 & xhr.readyState == 4) {
        let photos = JSON.parse(xhr.responseText);

        photos.map(item => {
            let photo = document.createElement('div'),
                img = document.createElement('img');

            photo.classList.add('photo');
            img.src = item.url;

            photo.appendChild(img);
            gallery.appendChild(photo);
        });

        xhr = new XMLHttpRequest();

        xhr.open('PUT', 'https://randomuser.me/api/', true);
        xhr.send(null)
    }
};

xhr.open('GET', '/photos', true);
xhr.send(null);