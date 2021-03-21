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
  //const URL = 'http://3.214.124.183/user/signup';
  const URL = '/user/signup';

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
  .then(res => {console.log(res)})
  .catch(error => console.log(error));
}
