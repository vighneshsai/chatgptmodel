import React from 'react'
import '../styles/login.css'
import ChatGptIcon from '../../chatGptLogo.svg';

function SignInPage() {
    return (
        <div className='loginPageBackground'>
            <div className='signinBodyContent'>
                <img className='chatGptIcon' src={ChatGptIcon} />
                <div className='createAccountText'>Create your account</div>
                <div className='bodyText'>Please note that phone verification is required for signup. Your number will only be used to verify your identity for security purposes.</div>
                <input className='inputField' placeholder='Email address' />
                <input className='inputField' placeholder='Set Password' />
                <input className='inputField' placeholder='Confirm Passord' />
                <button className='submitButton'>Submit</button>
                <div className='optionLoginText'>
                    <div className='accountText'>Already have an account?</div>
                    <a href='/loginPage' className='loginAnchor'>Log in</a>
                </div>
            </div>
        </div>
    )
}

export default SignInPage