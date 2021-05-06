/* Keven Lam */
import {getImgURI} from './imgUtils.js';

function createEventCardList(canvas, events) {
   
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = "card mb-3";
        card.style = "max-width: 600px;";
        card.dataset.id = event.event_id;

        const card_row = document.createElement('div');
        card_row.className = "row no-gutters";

        // Card Picture
        const card_imgBox = document.createElement('div');
        card_imgBox.className = "col-md-6";

        const img = document.createElement('img');
        img.className = "card-img";
        img.alt = "./img/stock.jpg";
        img.src = getImgURI(event.event_id);

        card_imgBox.append(img);

        // Card Info
        const card_bodyBox = document.createElement('div');
        card_bodyBox.className = "col-md-6";

        const card_body = document.createElement('div');
        card_body.className = "card-body";

        const card_body_title = document.createElement('h5');
        card_body_title.className = "card-title";
        card_body_title.textContent = event.name;
        
        const card_body_date = document.createElement('p');
        card_body_date.className = "card-text";
        const card_body_date_small = document.createElement('small');
        card_body_date_small.className = "font-italic";
        card_body_date_small.textContent = event.date.toString();
        card_body_date.append(card_body_date_small);
        
        const card_body_desc = document.createElement('p');
        card_body_desc.className = "card-text";
        card_body_desc.textContent = event.description;
        
        // Putting Everything Together
        card_body.append(card_body_title, card_body_date, card_body_desc);
        card_bodyBox.append(card_body);
        card_row.append(card_imgBox, card_bodyBox);
        card.append(card_row);
        
        canvas.append(card);

        // Add Event Listener to Go to Event
        card.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('event_id', card.dataset.id);
            location.href = 'event.html';
        });
    });
}

export {createEventCardList};