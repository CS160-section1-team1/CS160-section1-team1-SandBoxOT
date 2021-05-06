/* Keven Lam */
function formatDateString(dateString) {
    const monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;


    const formattedDate = `${month} ${day}, ${year} | ${hours}:${minutes} ${ampm}`;
    return formattedDate;
}

export {formatDateString};