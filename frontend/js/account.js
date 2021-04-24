import {fetchGET, fetchPOST} from './utils/fetchUtils.js';

populatePage();

function populatePage() {
    
    fetchGET(`/user/${localStorage.getItem('user_id')}`)
    .then(data => {
        document.getElementById('name').textContent = `${data.first_name} ${data.last_name}`;
        document.getElementById('email').textContent = `${data.email}`;
    })
    .catch(err => {
        alert(err.message);
    });
}

document.getElementById('logout_button').onclick = () => {
    localStorage.clear();
    location.href = 'index.html';
}