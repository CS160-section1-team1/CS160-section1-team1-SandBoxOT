/* Keven Lam */
import {fetchGET, fetchPOST} from './fetchUtils.js';

const navbar = document.getElementById('sot_navbar');

navbar.className = "navbar fixed-top navbar-expand-md navbar-light bg-light";
navbar.innerHTML =
    '<a class="navbar-brand" href="index.html">' +
        '<img src="./img/sandbox-icon.png" width="30" height="30" class="d-inline-block align-text-bottom" alt="">'+
        'Sandbox' +
    '</a>' +
    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
        '<span class="navbar-toggler-icon"></span>' +
    '</button>' +

    '<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
        '<ul class="navbar-nav mr-auto">' +
            '<li class="nav-item active">' +
                '<a id="navbar_login" class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal">Login <span class="sr-only">(current)</span></a>' +
            '</li>' +
            '<li class="nav-item">' +
                '<a id="navbar_signup" class="nav-link" href="signup.html">Sign Up</a>' +
            '</li>' +
        '</ul>' +
        '<form id="sot_search_bar" class="colform-inline d-flex my-2 my-md-0">' +
            '<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">' +
            '<button class="btn btn-accent btn-outline-success my-2 my-sm-0" type="submit">Search</button>' +
        '</form>' +
    '</div>';

const login_modal = document.createElement('div');
login_modal.className = "modal fade";
login_modal.id = "exampleModal";
login_modal.tabIndex = -1;
login_modal.setAttribute('role', "dialog");
login_modal.setAttribute('aria-labelledby', "exampleModalLabel");
login_modal.setAttribute('aria-hidden', "true");

login_modal.innerHTML =
    '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
            '<div class="modal-header">' +
                '<h5 class="modal-title" id="exampleModalLabel">Login</h5>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                '</button>' +
            '</div>' +
            '<div class="modal-body">' +
                '<form id="sot_login_form" class="colform-inline d-flex my-2 my-md-0">' +
                    '<input class="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username">' +
                    '<input class="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password">' +
                '</form>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                '<button type="submit" class="btn btn-filled" form="sot_login_form">Login</button>' +
            '</div>' +
        '</div>' +
    '</div>';

navbar.parentElement.insertBefore(login_modal, navbar.nextElementSibling);

// Change Navbar if Signed In
if (localStorage.getItem('user_id') || localStorage.getItem('servicer_id')) {
    document.getElementById('navbar_login').style.display = 'none';
    document.getElementById('navbar_signup').style.display = 'none';
}

// Login Functionality
document.getElementById('sot_login_form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const cred = {
        email: email,
        password: password
    }
    
    fetchPOST('/user/login', cred)
    .then(data => {
        if ('user_id' in data) {
            localStorage.setItem('user_id', data.user_id);
            location.href = 'accountCitizen.html';
            // location.href = 'account.html';
        }
        else {
            localStorage.setItem('servicer_id', data.servicer_id);
            location.href = 'accountServicer.html';
        }
    })
    .catch(err => console.error(err));
});

// Searching Functionality
document.getElementById('sot_search_bar').addEventListener('submit', (e) => {
    e.preventDefault();

    const searchQuery = e.target[0].value 
    localStorage.setItem('searchQuery', searchQuery);
    location.href = 'searchResults.html';
});