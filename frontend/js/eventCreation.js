import {fetchGET, fetchPOST, fetchPOSTForm} from './utils/fetchUtils.js';

document.getElementById('eventCreation_form').addEventListener('submit', e => {
    e.preventDefault();

    const fd = new FormData(e.target);
    fd.append('service_provider_id', localStorage.getItem('servicer_id'));

    fetchPOSTForm('/event/create', fd)
    .then(data => {
        console.log(data);
        location.href = 'accountServicer.html';
    })
    .catch(err => {
        console.error(err);
    })
});