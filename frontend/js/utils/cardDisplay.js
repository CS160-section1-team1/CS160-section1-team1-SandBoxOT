/* Keven Lam */

function createEventCardList(canvas, events) {

    console.log(canvas);
   
    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('event-card-kl');

        const img = document.createElement('img');
        img.src = 'img/stock.jpg';
        card.append(img);

        const content = document.createElement('div');
        content.classList.add('content');
        
        const title = document.createElement('h1')
        title.textContent = event.name;
        content.append(title);

        const desc = document.createElement('p');
        desc.textContent = event.description;
        content.append(desc);

        const location = document.createElement('h2')
        location.textContent = 'Location';
        content.append(location);

        const addr = document.createElement('p');
        addr.textContent = `${event.street}, ${event.city}, ${event.state} ${event.zip}`;
        content.append(addr);

        const dateTitle = document.createElement('h2');
        dateTitle.textContent = 'Date/Time';
        content.append(dateTitle);

        const datetime = document.createElement('p');
        datetime.textContent = event.date.toString();
        content.append(datetime);

        const button = document.createElement('button');
        button.type = 'submit';
        button.testContent = 'REGISTER';
        content.append(button);

        card.append(content);

        canvas.append(card);
    });
}

export {createEventCardList};