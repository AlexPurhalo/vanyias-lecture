// Constants declaration
const gallery = document.getElementById('gallery'),
    avatar = document.querySelector('.avatar'),
    phone = document.querySelector('.phone'),
    email = document.querySelector('.email'),
    name = document.querySelector('.name'),
    friendsList = document.getElementById('friends'),
    button = document.querySelector('button'),
    input = document.querySelector('input'),
    replies = document.querySelector('.replies');

const photoInput = document.getElementById('photo-input');

photoInput.addEventListener('change', (e) => {
    let file = e.target.files[0];
    let types = ['image/jpeg', 'image/gif', 'image/png'];

    if (!file || !types.includes(file.type)) {
        e.target.value = null;
        throw new TypeError('Wrong type of file'); // instead of return
    }

    uploadPhoto(file);
});

function uploadPhoto(photo) {
    let container = {
        url: '/photos', resolve: onSuccess, reject: onError, data: photo
    };

    function onSuccess(response) {
        console.log(response);
    }

    post(container)
}

// Markup elements
button.addEventListener('click', addReply);

input.addEventListener('keydown', (e) => e.which == 13 && addReply());

function addReply() {
    let text = input.value.trim(), reply = document.createElement('p');

    reply.classList.add('reply');
    reply.innerHTML = `<p>${text}</p>`;
    replies.appendChild(reply);
    input.value = null;
}

// Callback function for errors messages handling
function onError(e) { throw new Error(e.message) }


// Promise function
function get(url) {
    return new Promise(function(resolve, reject) {
        const xhr= new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            (xhr.status == 200 && xhr.readyState == 4) && resolve(JSON.parse(xhr.responseText))
        };

        xhr.onerror = reject;
        xhr.open('GET', url, true);
        xhr.send(null);
    })
}

const getPhotos = () => get('/photos').then(drawPhotos);
const getProfile = () => get('https://randomuser.me/api').then(showProfile);
const getFriends = () => get('https://randomuser.me/api/?results=15').then(showFriendsList);

getPhotos().then(getProfile).then(getFriends);

function post(params) {
    const xhr = new XMLHttpRequest();

    let formData = new FormData();
    formData.append('file', params.data);

    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
            params.resolve(JSON.parse(xhr.responseText));
        }
    };

    xhr.onerror = params.reject;

    xhr.open('POST', params.url, true);
    xhr.send(formData);
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

function showProfile(profile) {
    profile = profile['results'][0];
    avatar.src = profile.picture['large'];
    phone.textContent = profile.phone;
    name.textContent = profile.name['first'] + ' ' +  profile.name['last'];
    email.textContent = profile.email
}


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