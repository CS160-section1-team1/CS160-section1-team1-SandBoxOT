import {fetchGET, fetchDELETE} from './utils/fetchUtils.js';

const welcome = document.getElementById('admin_welcome');
const users_table = document.getElementById('users_table_body');
const events_table = document.getElementById('events_table_body');

window.onload = () => {
    const admin_key = localStorage.getItem('admin_key')
    if (admin_key === 'login' || admin_key === 'reload') {
        localStorage.clear();
        populatePage();
    }
    else {
        localStorage.clear();
        location.href = 'index.html';
    }
}

function populatePage() {
    welcome.textContent = `Welcome Administrator`;

    // Get All the Users
    fetchGET('/admin/allUsers')
    .then(data => {
        buildUsersTable(users_table, data.usersList);
    })
    .catch(err => {
        alert(err.message);
    })

    // Get All the Events
    fetchGET('/admin/allEvents')
    .then(data => {
        buildEventsTable(events_table, data.eventsList);
    })
    .catch(err => {
        alert(err.message);
    })
}

function buildUsersTable(table, list) {

    list.forEach(element => {
        const row = document.createElement('tr');

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = element.user_id;
        row.append(th);

        let td = document.createElement('td');
        td.textContent = `${element.first_name} ${element.last_name}`;
        row.append(td);

        td = document.createElement('td');
        td.textContent = element.email;
        row.append(td);

        td = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = "btn btn-danger";
        delBtn.textContent = 'DELETE';
        delBtn.dataset.id = element.user_id;

        delBtn.addEventListener('click', (e) => {

            fetchDELETE(`/user/delete/${delBtn.dataset.id}`)
            .then(data => {
                localStorage.setItem('admin_key', 'reload');
                location.reload();
            })
            .catch(err => {
                alert(err.message);
            });
        });

        td.append(delBtn);
        row.append(td);

        table.append(row);
    });
}

function buildEventsTable(table, list) {

    list.forEach(element => {
        const row = document.createElement('tr');

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = element.event_id;
        row.append(th);

        let td = document.createElement('td');
        td.textContent = `${element.name}`;
        row.append(td);

        td = document.createElement('td');
        td.textContent = element.service_provider_id;
        row.append(td);

        td = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = "btn btn-danger";
        delBtn.textContent = 'DELETE';
        delBtn.dataset.id = element.event_id;

        delBtn.addEventListener('click', (e) => {

            fetchDELETE(`/event/delete/${delBtn.dataset.id}`)
            .then(data => {
                localStorage.setItem('admin_key', 'reload');
                location.reload();
            })
            .catch(err => {
                alert(err.message);
            });
        });

        td.append(delBtn);
        row.append(td);

        table.append(row);
    });
}