function start() {
    if (localStorage.getItem('email')) location.href = 'account.html';
}
start();

/* Mahdi Khaliki */
document.querySelector('#signup-button').onclick = () => {
    location.href = 'signup.html';
};

document.querySelector('#username-field').addEventListener('submit', (e) => {
    e.preventDefault();

    const cred = {
        email : document.forms['username-field']['email'].value,
        password : document.forms['username-field']['password'].value
    }
    
    const host = window.location.hostname === '127.0.0.1' ? 'http://localhost:3000' : 'http://3.214.124.183';
    const route = '/signin';
    const URL = host.concat(route);

    const otherPram = {
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(cred),
        method: "POST"
    };

    fetch(URL, otherPram)
    .then(res => { return res.json()})
    .then(data => {
        console.log(data);
        localStorage.setItem('first_name', data.first_name);
        localStorage.setItem('last_name', data.last_name);
        localStorage.setItem('email', data.email);
        location.href = 'account.html';
    })
    .catch(err => console.error(err));
});