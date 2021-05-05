/* Keven Lam*/

window.onload = () => {
  // if (localStorage.getItem('user_id')) location.href = 'account.html';
  if (localStorage.getItem('user_id')) {
    location.href = 'accountCitizen.html';
  }
  else if (localStorage.getItem('servicer_id')) {
    location.href = 'accountServicer.html';
  }
}