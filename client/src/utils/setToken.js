const setCookie = (name, value, daysToExpire = 7) => {
    // Calcula la fecha de expiración
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000)); // Días a milisegundos
    const expires = "expires=" + date.toUTCString();

    // Almacena el valor en una cookie con el nombre proporcionado
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export default setCookie