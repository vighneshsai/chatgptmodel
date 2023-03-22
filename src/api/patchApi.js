import { BACKEND_URL } from "./backend"
const makePatchRequest = async (
    endPoint,
    body,
    contentType = 'application/json'
) => {
    try {
        let response = await window.fetch(`${BACKEND_URL.url}${endPoint}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': contentType,
                

            }
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

export default makePatchRequest
