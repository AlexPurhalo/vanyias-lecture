let xhr = new XMLHttpRequest();

const gallery = document.getElementById('gallery');
const avatar = document.querySelector('.avatar');
const phone = document.querySelector('.phone');
const email = document.querySelector('.email');
const name = document.querySelector('.name');


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


        xhr.onreadystatechange = () => {
            if (xhr.status == 200 & xhr.readyState == 4) {
                let profile = JSON.parse(xhr.responseText).results[0];
                console.log(profile);
                avatar.src = profile.picture['large'];
                phone.textContent = profile.phone;
                name.textContent = profile.name['first'] + ' ' +  profile.name['last'];
                email.textContent = profile.email
            }
        };

        xhr.open('GET', 'https://randomuser.me/api/', true);
        xhr.send(null)
    }
};

xhr.open('GET', '/photos', true);
xhr.send(null);