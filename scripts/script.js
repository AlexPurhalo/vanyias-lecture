let xhr = new XMLHttpRequest();
const gallery = document.getElementById('gallery');
const avatar = document.querySelector('.avatar');
const phone = document.querySelector('.phone');
const email = document.querySelector('.email');
const name = document.querySelector('.name');
const friendsList = document.getElementById('friends');
const button = document.querySelector('button');
const input = document.querySelector('input');
const replies = document.querySelector('.replies');


button.addEventListener('click', addReply)
input.addEventListener('keydown', (e) => {
    if (e.which == 13) addReply();
});

function addReply() {
    let text = input.value.trim();
    let reply = document.createElement('p');
    reply.classList.add('reply');
    reply.innerHTML = `<p>${text}</p>`;
    replies.appendChild(reply);
    input.value = null;
}

function get(url) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.status == 200 & xhr.readyState == 4) {

        }
    };

    xhr.open('GET', url, true);
    xhr.send(null);
}

get('/photos');

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

        xhr.onreadystatechange = () => {
            if (xhr.status == 200 & xhr.readyState == 4) {
                let profile = JSON.parse(xhr.responseText).results[0];
                avatar.src = profile.picture['large'];
                phone.textContent = profile.phone;
                name.textContent = profile.name['first'] + ' ' +  profile.name['last'];
                email.textContent = profile.email

                xhr = new XMLHttpRequest();

                xhr.onreadystatechange = () => {
                    if(xhr.status == 200 & xhr.readyState == 4) {
                        let friends = JSON.parse(xhr.responseText).results;
                        console.log(friends)

                        friends.map(friend => {
                            let friendPhoto = document.createElement('div'),
                                img = document.createElement('img');

                            friendPhoto.classList.add('friendPhoto');
                            img.src = friend.picture['large'];

                            friendPhoto.appendChild(img);
                            friendsList.appendChild(friendPhoto)
                        })
                    }
                };

                xhr.open('GET', 'https://randomuser.me/api/?results=15', true)
                xhr.send(null)
            }
        };

        xhr.open('GET', 'https://randomuser.me/api/', true);
        xhr.send(null)
    }
};

xhr.open('GET', '/photos', true);
xhr.send(null);