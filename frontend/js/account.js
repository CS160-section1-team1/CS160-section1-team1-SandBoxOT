function populatePage() {
    const first_name = localStorage.getItem('first_name');
    const last_name = localStorage.getItem('last_name');
    const email = localStorage.getItem('email');
    document.getElementById('name').textContent = `${first_name} ${last_name}`;
    document.getElementById('email').textContent = `${email}`;
}

populatePage();

document.getElementById('logout_button').onclick = () => {
    localStorage.clear();
    location.href = 'index.html';
}