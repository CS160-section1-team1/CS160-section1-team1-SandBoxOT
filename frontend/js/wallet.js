import {fetchGET, fetchPOST, fetchDELETE} from './utils/fetchUtils.js';

/* Mahdi Khaliki*/
window.onload = () => {
    populatePage(localStorage.getItem('user_id')).then(addListeners);
}

document.querySelector('#creditCardForm').addEventListener('submit', creditCardFormHandler);
document.querySelector('.dropdown-menu').addEventListener('click', dropDownMenuHandler);
document.querySelector('#depositForm').addEventListener('submit', depositFormHandler);

/* Mahdi Khaliki*/
function addListeners() {
    const cards = document.querySelector(".container.cards");

    cards.addEventListener('click', e => {
        if (e.target.className !== 'btn btn-outline-danger') {
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
        populateDepositForm(walletInfo);
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
        row.style = 'padding-left: 15px; padding-right: 15px'

        const perRow = i+3;

        for(i; i < perRow && i < walletInfo.length; i++) {
            const cardInfo = walletInfo[i];

            const col = document.createElement('div');
            col.className = 'col-sm-4';
            col.style = 'padding: 5px';

            const card = document.createElement('div');
            card.className = 'card';

            const cardTitle = determineCardIssuer(cardInfo.credit_card_num);
            const lastFourOfCardNum = cardInfo.credit_card_num.slice(-4);
            const name = cardInfo.name;
            const expiration_date = cardInfo.expiration_date.split('-');
            const wallet_id = cardInfo.wallet_id;

            card.innerHTML = `
            <div class="card-body" style="margin-left: 30px">
              <h5 class="card-title">${cardTitle}</h5>
              <p class="card-text">${name}
              <br>**** **** **** ${lastFourOfCardNum}
              <br>${expiration_date[1]}/${expiration_date[0]}</p>
              <a id=${wallet_id} href="#" class="btn btn-outline-danger">Delete</a>
            </div>`

            col.appendChild(card);
            row.appendChild(col);
        }
        div.appendChild(row);
    }
}

function populateDepositForm(walletInfo) {
  const dropDownMenu = document.querySelector('.dropdown-menu');

  for(let i = 0; i < walletInfo.length; i++) {
      const cardInfo = walletInfo[i];
      const menuItem = document.createElement('button');
      const issuer = determineCardIssuer(cardInfo.credit_card_num);
      const lastFourOfCardNum = cardInfo.credit_card_num.slice(-4);

      menuItem.className = 'dropdown-item';
      menuItem.innerHTML = `${issuer} ending in ${lastFourOfCardNum}`;

      dropDownMenu.appendChild(menuItem);
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
async function creditCardFormHandler(e) {
    const user = {}
    const form = e.target;
    user.user_id = localStorage.getItem('user_id');
    user.name = form.cardOwnerName.value;
    user.credit_card_num = form.cardNumber.value;
    user.expiration_date = form.month.value+ '/' + form.year.value;
    user.cvv = form.cvv.value;

    const credit_cards = await fetchPOST(`/user/addCardInfo`, user);
}

function dropDownMenuHandler(e) {
    document.querySelector('#dropdownMenu').innerHTML = e.target.innerHTML;
    document.querySelector('.dropdown').style = 'min-width: 800px';
    e.preventDefault();
}

async function depositFormHandler(e) {
    const body =  {
        user_id: localStorage.getItem('user_id'),
        amount: e.target.amount.value
    };
    const deposit = await fetchPOST(`/user/deposit`, body);
}
