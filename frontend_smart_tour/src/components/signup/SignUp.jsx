import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import './style.css'
function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contact_no: '',
        password: ''
    });
    const [user, setUser]=useState(false)
    const navigate = useNavigate()


    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("sdcfsdjkxh");
        try {
            const response = await fetch('http://localhost:3002/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log("result",result);
            setUser(true)
            alert("SignUp successfully!");
            navigate('/signin');

        } catch (error) {
            console.error(error);
        }
    };
 

    return (
        <div class="SignUpBackground">
            <div class="container">
                <div class="FormGrey">
                    <form onSubmit={handleSubmit}>
                        <div class="logo">
                            <img src={logo} />
                        </div>
                        <div class="text">
                            <h4>Sign Up</h4>
                        </div>

                        <input type="text" id="username" name="username"   placeholder="Username" value={formData.username}
                            onChange={handleChange} required/>
                        <input type="email" id="email" name="email"  placeholder="Email" value={formData.email}
        onChange={handleChange} required/>
                        <input type="number" id="mobile" name="contact_no"  placeholder="Mobile" value={formData.contact_no}
        onChange={handleChange} required/>
                        <input type="password" id="password" name="password" placeholder="Password" value={formData.password}
        onChange={handleChange} required/>
                        <div class="checkbox">
                            <input type="checkbox" id="checkbox" name="checkbox" /><span>By creating an account your agree to
                                our
                                Terms & Conditions</span>
                        </div>
                        {/* {handleSubmit? <Link to="/SignIn"><input type="submit" value="Sign Up" id="signUp" /></Link>: <input type="submit" value="Sign Up" id="signUp" />} */}
                       
                        <div class="ForgotPassword">
                        {user? 
                        <Link to="/signin"><input type="submit" value="Sign Up" id="signUp" /></Link> :
                     <input type="submit" value="Sign Up" id="signUp" />
                        }
                            <span>Already have an Account? <a class="SignInLink" href="SignIn.html">Sign In</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}
export default Signup

