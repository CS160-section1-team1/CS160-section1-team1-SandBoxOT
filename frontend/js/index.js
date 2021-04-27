/* Keven Lam*/
import {fetchGET, fetchPOST} from './utils/fetchUtils.js';

function start() {
    // if (localStorage.getItem('user_id')) location.href = 'account.html';
    if (localStorage.getItem('user_id')) location.href = 'account-pre.html';
}
start();

// Login Functionality
document.querySelector('#username-field').addEventListener('submit', (e) => {
    e.preventDefault();

    const cred = {
        email: document.forms['username-field']['email'].value,
        password: document.forms['username-field']['password'].value
    }
    
    fetchPOST('/user/login', cred)
    .then(data => {
        localStorage.setItem('user_id', data.user_id);
        // location.href = 'account.html';
        location.href = 'account-pre.html';
    })
    .catch(err => console.error(err));
});

// Searching Functionality
document.getElementById('search-bar').addEventListener('submit', (e) => {
    e.preventDefault();

    fetchPOST('/event/search', {search: document.forms['search-bar']['search'].value})
    .then(data => { 
        console.log(data);
    })
    .catch(err => console.error(err));
});

/* Mahdi Khaliki */
document.querySelector('#signup-button').onclick = () => {
    location.href = 'signup.html';
};

/* Thomas Zakharzhevskiy */
var popup = document.getElementById("login-popup");

document.getElementById("login-button").onclick = function() {
  popup.style.display = "block";
}

var span = document.getElementById("close-login").onclick = function() {
  popup.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}
