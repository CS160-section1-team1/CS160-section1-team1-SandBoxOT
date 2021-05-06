/* Keven Lam*/
import {fetchGET} from './utils/fetchUtils.js';
import {createEventCardList} from './utils/cards.js';

window.onload = () => {
  // if (localStorage.getItem('user_id')) location.href = 'account.html';
  if (localStorage.getItem('user_id')) {
    location.href = 'accountCitizen.html';
  }
  else if (localStorage.getItem('servicer_id')) {
    location.href = 'accountServicer.html';
  }
  else {
    populatePage();
  }
}

async function populatePage() {

  try {

      const eventsInfo = await fetchGET(`/event/index/recent`);
      
      createEventCardList(document.getElementById('index_content'), eventsInfo.eventList);

  } catch (err) {
      alert(err.message);
  }
}