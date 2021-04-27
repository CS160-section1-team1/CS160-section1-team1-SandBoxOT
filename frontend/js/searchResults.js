import {fetchGET, fetchPOST} from './utils/fetchUtils.js';
import {createEventCardList} from './utils/cardDisplay.js';

window.onload = () => {
    populatePage(localStorage.getItem('search'));
}

async function populatePage(searchQuery) {
    
    try {

        const eventsInfo = await fetchPOST(`/event/search`, {search: searchQuery});
        
        createEventCardList(document.getElementById('searchResults-content'), eventsInfo.searchResults);

    } catch (err) {
        alert(err.message);
    }
}