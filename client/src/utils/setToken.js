const setTokenCookie = (token, daysToExpire = 7) => {
    // Calcula la fecha de expiración
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000)); // Días a milisegundos
    const expires = "expires=" + date.toUTCString();

    // Almacena el token en una cookie
    document.cookie = `token=${token}; ${expires}; path=/`;
}

export default setTokenCookie