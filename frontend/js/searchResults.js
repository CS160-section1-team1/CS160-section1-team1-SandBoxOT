import {fetchGET, fetchPOST} from './utils/fetchUtils.js';
import {createEventCardList} from './utils/cards.js';

window.onload = () => {
    if (localStorage.getItem('searchQuery')) {
        const searchQuery = localStorage.getItem('searchQuery');
        populatePage(searchQuery);
    }
    
}

async function populatePage(searchQuery) {
    
    try {

        const eventsInfo = await fetchPOST(`/event/search`, {search: searchQuery});
        
        createEventCardList(document.getElementById('searchResults_content'), eventsInfo.searchResults);

    } catch (err) {
        alert(err.message);
    }
}