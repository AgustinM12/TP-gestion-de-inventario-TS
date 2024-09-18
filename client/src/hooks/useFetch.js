const useFetch = async (route, method, payload) => {

    let url = `${"http://localhost:4000/api"}${route}`

    const headers = {
        "Content-Type": "application/json",
    };

    // if (url.includes("/auth/") || url.includes("/api/")) {
    //     headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    // }

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