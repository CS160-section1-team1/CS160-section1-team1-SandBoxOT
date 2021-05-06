import {fetchGET, fetchPOST} from './utils/fetchUtils.js';
import {getImgURI} from './utils/imgUtils.js';
import {formatDateString} from './utils/dateUtils.js';

const hero_img = document.getElementById('event_hero_img');
const event_title = document.getElementById('event_title');
const event_address = document.getElementById('event_address');
const event_date = document.getElementById('event_date');
const event_desc = document.getElementById('event_desc');
const reg_btn = document.getElementById('reg-event');

window.onload = () => {
    if (!localStorage.getItem('user_id')) {
        reg_btn.style.display = 'none';
    }
    populatePage(localStorage.getItem('event_id'));
}

function populatePage(event_id) {
    fetchGET(`/event/${event_id}`)
    .then(data => {
        event_title.textContent = data.name;

        const address = data.address;
        event_address.textContent = `${address.street} ${address.city}, ${address.state} ${address.zip}`;

        event_date.textContent = formatDateString(data.date);

        event_desc.textContent = data.description;

        reg_btn.textContent = `Register for $${data.fee}`;

        loadGoogleMap(`${address.street} ${address.city}, ${address.state} ${address.zip}`);
    })
    .catch(err => {
        console.error(err);
    });

    hero_img.src = getImgURI(event_id);
}

reg_btn.addEventListener('click', (e) => {

    const ids = {
        event_id: localStorage.getItem('event_id'),
        user_id: localStorage.getItem('user_id')
    }

    fetchPOST('/event/register', ids)
    .then(data => {
        location.href = data.redirect;
    })
    .catch(err => {
        alert("Insufficient Funds. Put some Money in your Wallet.");
    });
});

// Google Map Setup
function loadGoogleMap(address) {
    // California is the default location
    let origin = new google.maps.LatLng(36.7783, -119.4179);
  
    // Create the map
    let map = new google.maps.Map(
        document.getElementById('map'), {center: origin, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP});
  
    // Search for the Event Address
    let request = {
      query: address,
      fields: ['geometry'],
    };
  
    let service = new google.maps.places.PlacesService(map);
  
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        
        // Move the map to the Event Address
        const location = results[0].geometry.location;
        map.setCenter(location);

        // Put an Info Marker
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<p>${address}</p>`
        });

        marker.addListener('mouseover', () => {
            infowindow.open(map, marker);
        })
      }
    });
}