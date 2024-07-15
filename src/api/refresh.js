import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import { BACKEND_URL } from "./backend"

const RefreshApi = async(endPoint, contentType = 'application/json') => {
    // const { setAuth } = useAuth();


            try {
                let body = {
                    token: localStorage.getItem("refreshToken")
                };
                let response = await fetch(`${BACKEND_URL.url}${endPoint}`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': contentType,
                    }
                });

                if (response.status === 401 || response.status === 403) {
                    localStorage.clear();
                    return;
                }

                if (response.status === 201 || response.status === 200) {
                    let data = await response.json();
                    // setAuth(prev => {
                    //     console.log(JSON.stringify(prev));
                    //     console.log(data.accessToken);
                    //     return { ...prev, accessToken: data.accessToken }
                    // });
                    localStorage.setItem('accessToken', data.accessToken);
                }
            } catch (error) {
                localStorage.clear();
            }

    // }, [setAuth]);
}


export default RefreshApi

