import {fetchGET, fetchPOST} from './utils/fetchUtils.js';

/* Keven Lam */
window.onload = () => {
    populatePage(localStorage.getItem('user_id'));
}

async function populatePage(user_id) {
    
    try {
        const userInfo = await fetchGET(`/user/${user_id}`);
        const eventsInfo = await fetchGET(`/event/citizen/${user_id}`);

        console.log(userInfo);
        console.log(eventsInfo);
        
        // document.getElementById('name').textContent = `${data.first_name} ${data.last_name}`;
        // document.getElementById('email').textContent = `${data.email}`;

    } catch (err) {
        alert(err.message);
    }
}

document.getElementById('logout_button').onclick = () => {
    localStorage.clear();
    location.href = 'index.html';
}

/* Mahdi Khaliki*/
document.querySelector('.text.name').onload = (e) => {
  console.log(e);
};
