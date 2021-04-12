/* Mahdi Khaliki */
document.querySelector('#signup-button').onclick = () => {
    location.href = 'signup.html';
};

document.querySelector('#username-field').addEventListener('submit', (e) => {
    e.preventDefault();

    const URL = window.location.hostname === '127.0.0.1' ? 'http://localhost:3000' : 'http://3.214.124.183';
    // fetch('http://localhost:3000')
    // .then(res => { return res.json()})
    // .then(data => {
    //     location.href = 'signup.html';
    //     console.log(data);
    // })
    // .catch(err => console.error(err));
    console.log(URL);
});