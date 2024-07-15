import { BACKEND_URL } from "./backend"
const makePostRequest = async (
    endPoint,
    body,
    contentType = 'application/json'
) => {
    try {
        var accessToken = localStorage.getItem('accessToken')
        var headers = {
            'Content-Type': contentType,
        }
        if (!endPoint.includes("login") && !endPoint.includes("login")) {
            headers.Authorization = `Bearer ${accessToken}`
        }
        let response = await window.fetch(`${BACKEND_URL.url}${endPoint}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers
        })


        if (response.status === 401 || response.status === 403 || response.status === 500) {
            // throw new Error('unauthorized')
            let error = await response.json()
            return error

        }
        let result
        if (response.status == 201 || response.status == 200) {

            result = await response.json()
            return result
        }
        return { result, response }
    }
    catch (error) {
        return {
            error,
            response: null
        }
    }
}

export default makePostRequest
