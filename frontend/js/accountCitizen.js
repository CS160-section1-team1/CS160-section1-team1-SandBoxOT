import {fetchGET, fetchPOST} from './utils/fetchUtils.js';
import {createEventCardList} from './utils/cards.js';

/* Keven Lam */
window.onload = () => {
    populatePage(localStorage.getItem('user_id'));
}

async function populatePage(user_id) {

    try {
        const userInfo = await fetchGET(`/user/${user_id}`);
        const eventsInfo = await fetchGET(`/event/citizen/${user_id}`);
        const balanceInfo = await fetchGET(`/user/getBalance/${user_id}`);

        document.getElementById('name').textContent = `${userInfo.first_name} ${userInfo.last_name}`;
        document.getElementById('email').textContent = `${userInfo.email}`;

        document.getElementById('balance').textContent += `${balanceInfo.balance}`;

        createEventCardList(document.getElementById('account-content'), eventsInfo.eventList);

    } catch (err) {
        alert(err.message);
    }
}

document.getElementById('logout_button').onclick = () => {
    localStorage.clear();
    location.href = 'index.html';
}
