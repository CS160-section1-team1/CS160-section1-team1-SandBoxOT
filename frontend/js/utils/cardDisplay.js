/* Keven Lam */

// function createEventCardList(canvas, events) {

//     console.log(canvas);
   
//     events.forEach(event => {
//         const card = document.createElement('div');
//         card.classList.add('event-card-kl');

//         const img = document.createElement('img');
//         img.src = 'img/stock.jpg';
//         card.append(img);

//         const content = document.createElement('div');
//         content.classList.add('content');
        
//         const title = document.createElement('h1')
//         title.textContent = event.name;
//         content.append(title);

//         const desc = document.createElement('p');
//         desc.textContent = event.description;
//         content.append(desc);

//         const location = document.createElement('h2')
//         location.textContent = 'Location';
//         content.append(location);

//         const addr = document.createElement('p');
//         addr.textContent = `${event.street}, ${event.city}, ${event.state} ${event.zip}`;
//         content.append(addr);

//         const dateTitle = document.createElement('h2');
//         dateTitle.textContent = 'Date/Time';
//         content.append(dateTitle);

//         const datetime = document.createElement('p');
//         datetime.textContent = event.date.toString();
//         content.append(datetime);

//         const button = document.createElement('button');
//         button.type = 'submit';
//         button.testContent = 'REGISTER';
//         content.append(button);

//         card.append(content);

//         canvas.append(card);
//     });
// }

function createEventCardList(canvas, events) {
   
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = "card mb-3";
        card.style = "max-width: 600px;";

        const card_row = document.createElement('div');
        card_row.className = "row no-gutters";

        // Card Picture
        const card_imgBox = document.createElement('div');
        card_imgBox.className = "col-md-6";

        const img = document.createElement('img');
        img.className = "card-img";
        img.alt = "...";
        img.src = "./img/stock.jpg";

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
    });
}

export {createEventCardList};