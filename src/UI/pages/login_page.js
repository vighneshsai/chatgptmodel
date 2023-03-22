import React from 'react'
import '../styles/login.css'
import ChatGptIcon from '../../chatGptLogo.svg';

function LoginPage() {
    return (
        <div className='loginPageBackground'>
            <div className='signinBodyContent'>
                <img className='chatGptIcon' src={ChatGptIcon} />
                <div className='WelcomeBackText'>Welcome Back</div>
                <input className='inputField' placeholder='Email address' />
                <input className='inputField' placeholder='Password' />
                
                <button className='submitButton'>Submit</button>
                <div className='optionLoginText'>
                    <div className='accountText'>Didn't have an account?</div>
                    <a href='/signin' className='loginAnchor'>sign up</a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage