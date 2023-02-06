import React, { useState } from "react";
import axios from "axios";
import './signin.scss';


export const Login = (props) => { 
    const [email, setEmail] = useState({});
    const [pass, setPass] = useState({});
    // const {mobile, setMobile} = useState('');
    // const {firstName, setFirstName} = useState('');
    // const {lastName, setLastName} = useState('');

    const login = async () => {
        console.log(email);
        console.log(pass);
        const response =  await axios.post('/auth/login', {email: email, password: pass});
        // console.log(response.data.data);
        if(response.status === 200){
            console.log("Success");
            localStorage.setItem('token', response.data.data.tokens.access_token);
        }
        else{
            alert("Invalid Credentials")
        }
        const token = localStorage.getItem('token');
        console.log(token);
        console.log(response);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        console.log(email);

    }
    
    return (
        <div className="auth-form-container">
            <div className="white-box">
                <img src='./images/SphereDesign-1.png' alt="logo" className="sphere-design-login" placeholder="sphere design"></img>
                
                <div className="gray-box-1">
                    <form onSubmit={handleSubmit}>
                        <img className="company-logo-1" src='./images/companylogo.png' alt="logo" placeholder="logo"></img>
                        <h2 className="header">Welcome Back</h2>
                        <h3 className="header-subtext"> Welcome back! Please enter your details.</h3>
                        <input onChange={(e)=>{ setEmail(e.target.value)}} type="email" placeholder="youremail@gmail.com" className="email-form" />
                        <br></br>
                        <input onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" className="password-form" />
                        <button className="login-button" type="submit">Sign In</button>
                    </form>
        
                    <button className="signup-switch" onClick={() => props.onFormSwitch('register')}>Don't have an acccount already? Sign Up</button>
                </div>    
            </div>
        </div>
    )
}  
export default Login