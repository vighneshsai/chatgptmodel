import { BACKEND_URL } from "./backend"
import RefreshApi from "./refresh"


function MakeGetRequest ( endPoint,contentType = 'application/json')  {
    
    const FetchData = async() => {
        try {
            var accessToken = localStorage.getItem('accessToken')
            let response = await fetch(`${BACKEND_URL.url}${endPoint}`, {
                method: "GET",
                
                headers: {
                    'Content-Type': contentType,
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            var accessToken = localStorage.getItem('accessToken')
    
    
            if (response.status === 401 || response.status === 403) {
                await RefreshApi('/token' )
                return { response }
            }
            let result
            if (response.status == 201 || response.status == 200) {
                result = await response.json();
                return {result, response}
            }
        } catch (error) {
            console.log(error)
            return {
                error,
                response: null
            }
        }
    }
    return FetchData()
    
}

export default MakeGetRequest