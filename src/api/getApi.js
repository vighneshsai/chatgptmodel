import { BACKEND_URL } from "./backend"

const NO_CONTENT = 204

const getToken = () => 'JWT ' + window.localStorage.getItem('Authorization')

const makeGetRequest = async (
    endPoint,
    contentType = 'application/json'
) => {
    try {

        let response = await fetch(`${BACKEND_URL.url}${endPoint}`, {
            method: "GET",
            headers: {
                'Content-Type': contentType,
            }
        })


        if (response.status === 401 || response.status === 403) {
            // throw new Error('unauthorized')
        }
        let result
        if (response.status == 201 || response.status == 200) {
            return result = response.json()
        }
    } catch (error) {
        return {
            error,
            response: null
        }
    }
}

export default makeGetRequest