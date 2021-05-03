/* Keven Lam */
function getImgURI(event_id) {
    const host = window.location.hostname === '127.0.0.1' ? 
        'http://localhost:3000' : 'https://api.sandboxot.link';
    let URI = host.concat('/image/');
    URI += event_id;
    return URI;
}

export {getImgURI};