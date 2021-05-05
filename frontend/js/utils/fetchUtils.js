/* Keven Lam*/
async function fetchGET(endpoint) {

    const host = window.location.hostname === '127.0.0.1' ?
        'http://localhost:3000' : 'https://api.sandboxot.link';
    const URL = host.concat(endpoint);

    let res = await fetch(URL);
    if (!res.ok) throw new Error(`Operation Failed with Status Code ${res.status}`);
    return await res.json();
}

async function fetchPOST(endpoint, body, options=null) {

    const host = window.location.hostname === '127.0.0.1' ?
        'http://localhost:3000' : 'https://api.sandboxot.link';
    const URL = host.concat(endpoint);

    let params = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        mode: 'cors'
    };
    if (options) params = options;
    params.body = JSON.stringify(body);

    let res = await fetch(URL, params);
    if (!res.ok) throw new Error(`Operation Failed with Status Code ${res.status}`);
    return await res.json();
}

async function fetchDELETE(endpoint, body, options=null) {
    const host = window.location.hostname === '127.0.0.1' ? 'http://localhost:3000' : 'https://api.sandboxot.link';

    const URL = host.concat(endpoint);

    let params = {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        mode: 'cors',
    };

    if (options) params = options;

    let res = await fetch(URL, params);
    if (!res.ok) throw new Error(`Operation Failed with Status Code ${res.status}`);
    return await res.json();
}


async function fetchPOSTForm(endpoint, formData) {

    const host = window.location.hostname === '127.0.0.1' ?
        'http://localhost:3000' : 'https://api.sandboxot.link';
    const URL = host.concat(endpoint);

    let params = {
        method: "POST",
        mode: 'cors',
        body: formData
    };

    let res = await fetch(URL, params);
    if (!res.ok) throw new Error(`Operation Failed with Status Code ${res.status}`);
    return await res.json();
}

export {fetchGET, fetchPOST, fetchPOSTForm, fetchDELETE};
