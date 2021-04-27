import {fetchGET, fetchPOST} from './utils/fetchUtils.js';

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

  fetchPOST('/user/signup', user)
  .then(data => {
    localStorage.setItem('user_id', data.user_id);
    // location.href = 'account.html';
    location.href = 'account-pre.html';
  })
  .catch(error => console.log(error));
}
