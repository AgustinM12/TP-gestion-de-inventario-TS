const getCookie = (name) => {
    const cookieName = `${name}=`;
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookies.split(';');

    for (let cookie of cookiesArray) {
        cookie = cookie.trim();

        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length);
        }
    }
    return null; 
};

export default getCookie