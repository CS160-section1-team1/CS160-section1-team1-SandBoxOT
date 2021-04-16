/* Mahdi Khaliki*/
document.querySelector('#citizenRadioButton').onclick = (e) => {
  if(e.target.checked)
    document.querySelector('.form-label-group.organization').style.display = 'none';
};

/* Mahdi Khaliki*/
document.querySelector('#providerRadioButton').onclick = (e) => {
  if(e.target.checked)
    document.querySelector('.form-label-group.organization').style.display = 'block';
};

document.querySelector('.form-signup').addEventListener('submit', (e) => {
  const user = {};

  user.first_name = e.target.inputFirstName.value;
  user.last_name = e.target.inputLastName.value;
  user.password = e.target.inputPassword.value;
  user.confirmPass = e.target.inputConfirmPassword.value;
  user.email = e.target.inputEmail.value;

  if(!confirmPassword(user.password, user.confirmPass)) {
    e.preventDefault();
    return;
  };

  if(e.target.providerRadioButton.checked) {
    user.organization = e.target.inputOrganization.value;
  }

  callUserSignupAPI(user)

  e.preventDefault();
});

/* Mahdi Khaliki */
function confirmPassword(pass, confirmPass) {
  const alertElement = document.querySelector('.alert.alert-danger');
  if(pass !== confirmPass) {
    alertElement.innerHTML = 'Passwords do not match';
    alertElement.style.display = 'block';
    return false;
  }
  else {
    alertElement.style.display = 'none';
    return true;
  }
}

/* Mahdi Khaliki */
function callUserSignupAPI(user) {
  const host = window.location.hostname === '127.0.0.1' ? 'http://localhost:3000' : 'http://3.214.124.183';
  console.log(host);
  const route = '/signup';
  const URL = host.concat(route);

  const othePram = {
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(user),
    method: "POST"
  };

  fetch(URL, othePram)
  .then(data => {return data.json()})
  .then(res => {
    console.log(res)
    localStorage.setItem('first_name', res.first_name);
    localStorage.setItem('last_name', res.last_name);
    localStorage.setItem('email', res.email);
    location.href = 'account.html';
  })
  .catch(error => console.log(error));
}
