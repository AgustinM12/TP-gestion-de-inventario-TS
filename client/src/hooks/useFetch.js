const useFetch = async (route, method, payload) => {

    let url = `${"http://localhost:4000/api"}${route}`

    let headers = {
        "Content-Type": "application/json",
    };

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            // Elimina los espacios y comprueba si el nombre coincide
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null; // Retorna null si no se encuentra la cookie
    }

    if (url.includes("/api/")) {
        const token = getCookie('token');
        if (token) {
            headers["Authorization"] = token;
        }
    }

    //! SIN ARCHIVOS
    if (method === "POST") {
        try {

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición", error);
        }

    } else if (method === "GET" || method === "DELETE") {
        try {
            const response = await fetch(payload ? url + payload : url, {
                method: method,
                headers: headers,
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición");
        }
    } else if (method === "PUT") {
        try {
            console.log(url);

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición", error);
        }
    }
}

export default useFetch