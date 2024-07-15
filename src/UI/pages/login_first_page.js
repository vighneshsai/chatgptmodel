import React from 'react'
import '../styles/login.css'
import ChatGptIcon from '../../chatGptLogo.svg';
import { useNavigate } from 'react-router-dom';
function LoginFirstPage() {
    const navigate = useNavigate()
    return (
        <div className='loginBackground'>
            <div className='loginBodyContent'>
                <img className='chatGptIcon' src={ChatGptIcon} />
                <div className='welcomeText'>Welcome to ChatGPT</div>
                <div className='loginText'>Log in with your OpenAI account to continue</div>
                <div className='buttonsDiv'>
                    <button onClick={() => { navigate("/login") }} className='loginButton'>
                        Log in</button>
                    <button onClick={() => { navigate("/signin") }} className='loginButton'>Sign in</button>

                </div>
            </div>
        </div>
    )
}

export default LoginFirstPage