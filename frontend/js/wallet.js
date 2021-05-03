import {fetchGET, fetchPOST, fetchDELETE} from './utils/fetchUtils.js';

/* Mahdi Khaliki*/
window.onload = () => {
    populatePage(localStorage.getItem('user_id')).then(addListeners());
}

document.querySelector('form').addEventListener('submit', creditCardFormHandler());

/* Mahdi Khaliki*/
function addListeners() {
    const cards = document.querySelector(".container.cards");

    cards.addEventListener('click', e => {
        if (e.target.className !== 'btn btn-primary delete') {
          return;
        }
        const wallet_id = e.target.id;
        const balanceInfo = fetchDELETE(`/user/deleteCard/${wallet_id}`);
        e.target.parentElement.parentElement.remove();
        location.reload();
        e.preventDefault();
    });
}

/* Mahdi Khaliki*/
async function populatePage(user_id) {
    try {
        const walletInfo = await fetchGET(`/user/getCardInfo/${user_id}`);
        const balanceInfo = await fetchGET(`/user/getBalance/${user_id}`);

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        document.querySelector('.h2.balance').textContent = `Balance: `+formatter.format(balanceInfo.balance);

        displayCardInfo(walletInfo);
    } catch (err) {
        alert(err.message);
    }
}

/* Mahdi Khaliki*/
async function displayCardInfo(walletInfo) {
    const div = document.querySelector('.container.cards');

    for(let i = 0; i < walletInfo.length;) {
        const row = document.createElement('div');
        row.className = 'row';
        row.style = 'padding-left: 50px; padding-right: 50px'

        const perRow = i+2;

        for(i; i < perRow && i < walletInfo.length; i++) {
            const cardInfo = walletInfo[i];

            const col = document.createElement('div');
            col.className = 'col-sm-6';
            col.style = 'padding: 5px';

            const card = document.createElement('div');
            card.className = 'card';

            const cardTitle = determineCardIssuer(cardInfo.credit_card_num);
            const lastFourOfCardNum = cardInfo.credit_card_num.slice(-4)
            const expiration_date = cardInfo.expiration_date.split('-');
            const wallet_id = cardInfo.wallet_id;

            card.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">${cardTitle}</h5>
              <p class="card-text">**** **** **** ${lastFourOfCardNum}
              <br>${expiration_date[1]}/${expiration_date[0]}</p>
              <a id=${wallet_id} href="#" class="btn btn-primary delete">Delete</a>
            </div>`

            col.appendChild(card);
            row.appendChild(col);
        }
        div.appendChild(row);
    }
}

/* Mahdi Khaliki*/
function determineCardIssuer(cardNum) {
    const first_digit = cardNum.charAt(0);
    if(first_digit === '2' || first_digit === '5')
        return 'Mastercard';
    else if(first_digit === '3')
        return 'American Express';
    else if(first_digit === '4')
        return 'Visa';
    else if(first_digit === '6')
        return 'Discover';
    else
        return 'Unknown';
}

/* Mahdi Khaliki*/
function creditCardFormHandler(e) {
    console.log(e);
    e.preventDefault();
}
