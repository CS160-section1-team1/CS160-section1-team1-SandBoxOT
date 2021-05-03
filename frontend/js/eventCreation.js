import {fetchGET, fetchPOST, fetchPOSTForm} from './utils/fetchUtils.js';
import {getImgURI} from './utils/imgUtils.js';

window.onload = () => {
    const img = document.getElementById('img');
    console.log(getImgURI(18));
    img.src = getImgURI(18);
}

document.getElementById('eventCreation_form').addEventListener('submit', e => {
    e.preventDefault();

    const fd = new FormData(e.target);

    fetchPOSTForm('/event/create', fd)
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    })
});