import React, { useState } from 'react'
import './style.css'
import logo from '../assets/logo.jpg'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
    const [token, setToken] = useState()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            const token = result.accessToken
            Cookies.set('token', token, { expires: 7 })
            setToken(Cookies.get('token'))
            console.log(result);
            alert("Welcome to the application!");
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div class="SignInBackground">
            <div class="container">
                <div class="FormGrey">
                    <form onSubmit={handleSubmit}>
                        <div class="logo">
                            <img src={logo} />
                        </div>
                        <div class="text">
                            <h4>Sign In</h4>
                        </div>

                        <input type="text" id="email" name="email" placeholder="Email" value={formData.email}
                            onChange={handleChange} required />
                        <input type="password" id="password" name="password" placeholder="Password" value={formData.password}
                            onChange={handleChange} required />
                        <div class="forgetPassword">
                            <a href="ForgetPassword.html">Forget Password</a>
                        </div>
                        {token ?
                            <Link to="/"><input type="submit" value="Submit" id="submit" /></Link>
                            : <input type="submit" value="Submit" id="submit" />
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
