const gallery = document.getElementById('gallery');
const avatar = document.querySelector('.avatar');
const phone = document.querySelector('.phone');
const email = document.querySelector('.email');
const name = document.querySelector('.name');
const friendsList = document.getElementById('friends');
const button = document.querySelector('button');
const input = document.querySelector('input');
const replies = document.querySelector('.replies');

// Markup elements
button.addEventListener('click', addReply);

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

// Callback function
function get(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            callback(JSON.parse(xhr.responseText))
        }
    };

    xhr.open('GET', url, true);
    xhr.send(null);
}

// Elements rendering
function drawPhotos(photos) {
    photos.map(item => {
        let photo = document.createElement('div'),
            img = document.createElement('img');

        photo.classList.add('photo');
        img.src = item.url;

        photo.appendChild(img);
        gallery.appendChild(photo);
    });
}
get('/photos', drawPhotos);

function showProfile(profile) {
    profile = profile['results'][0];
    avatar.src = profile.picture['large'];
    phone.textContent = profile.phone;
    name.textContent = profile.name['first'] + ' ' +  profile.name['last'];
    email.textContent = profile.email
}
get('https://randomuser.me/api', showProfile);


function showFriendsList(friends) {
    friends['results'].map(friend => {
        let friendPhoto = document.createElement('div'),
            img = document.createElement('img');

        friendPhoto.classList.add('friendPhoto');
        img.src = friend.picture['large'];

        friendPhoto.appendChild(img);
        friendsList.appendChild(friendPhoto)
    })
}
get('https://randomuser.me/api/?results=15', showFriendsList);
