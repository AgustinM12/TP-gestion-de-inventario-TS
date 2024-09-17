const removeTokenCookie = (cookieName) => {
    // Establece la cookie con una fecha de expiración en el pasado
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};

export default removeTokenCookie;
