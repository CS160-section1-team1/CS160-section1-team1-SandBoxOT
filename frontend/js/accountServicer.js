import {fetchGET, fetchPOST} from './utils/fetchUtils.js';
import {createEventCardList} from './utils/cards.js';

/* Keven Lam */
window.onload = () => {
    populatePage(localStorage.getItem('servicer_id'));
}

async function populatePage(servicer_id) {
    
    try {
        const userInfo = await fetchGET(`/serviceProvider/${servicer_id}`);
        const eventsInfo = await fetchGET(`/event/service_provider/${servicer_id}`);
        
        document.getElementById('name').textContent = `${userInfo.first_name} ${userInfo.last_name}`;
        document.getElementById('email').textContent = `${userInfo.email}`;
        document.getElementById('organization').textContent = `${userInfo.organization}`;

        createEventCardList(document.getElementById('account-content'), eventsInfo.eventList);

    } catch (err) {
        alert(err.message);
    }
}

document.getElementById('logout_button').onclick = () => {
    localStorage.clear();
    location.href = 'index.html';
}

/* Mahdi Khaliki*/
// document.querySelector('.text.name').onload = (e) => {
//   console.log(e);
// };
