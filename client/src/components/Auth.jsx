import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}

const cookies = new Cookies();

const Auth = () => {

    const [isSignup, setIsSignup] = useState(true);
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {

        // takes all the input from the form and changes the input that is being 
        // target by e.target.name
        setForm({...form, [e.target.name]: e.target.value});

    };

    const switchMode = () => {

        // This method can also be done but in react prefered way is the second one
        // setIsSignup(!isSignup);  

        // Change the state depending on the previous state
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const handleSubmit = async(e) => {

        e.preventDefault();
        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost/auth';

        // making request to the backend on different url's
        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {

            username, fullName:form.fullName, phoneNumber, avatarURL, password
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        // reloading the browser
        window.location.reload();

    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'SignUp' : 'Sign In'}</p>
                    {/* if is signup */}
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name="fullName" placeholder="FUll Name" autoComplete="off" onChange={handleChange} required/>
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="Username" autoComplete="off" onChange={handleChange} required/>
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required/>
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input type="text" name="avatarURL" placeholder="Avatar URL" autoComplete="off" onChange={handleChange} required/>
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">password</label>
                            <input type="password" name="password" autoComplete="new-password" placeholder="password" onChange={handleChange} required/>
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" name="confirmPassword" autoComplete="off" placeholder="Confirm Password" onChange={handleChange} required/>
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>
                                {isSignup ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup ? "Already Have a account? " : "Don't have a account? "}
                            <span onClick={switchMode}>
                                {isSignup ? "Sign In" : "Signup"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
};

export default Auth;