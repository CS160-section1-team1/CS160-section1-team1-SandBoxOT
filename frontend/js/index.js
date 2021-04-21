/* Keven Lam*/
import {fetchGET, fetchPOST} from './utils/fetchUtils.js';

function start() {
    if (localStorage.getItem('email')) location.href = 'account.html';
}
start();

/* Mahdi Khaliki */
document.querySelector('#signup-button').onclick = () => {
    location.href = 'signup.html';
};

/* Keven Lam */
document.querySelector('#username-field').addEventListener('submit', (e) => {
    e.preventDefault();

    const cred = {
        email: document.forms['username-field']['email'].value,
        password: document.forms['username-field']['password'].value
    }
    
    fetchPOST('/user/login', cred)
    .then(data => {
        localStorage.setItem('first_name', data.first_name);
        localStorage.setItem('last_name', data.last_name);
        localStorage.setItem('email', data.email);
        location.href = 'account.html';
    })
    .catch(err => console.error(err));

});