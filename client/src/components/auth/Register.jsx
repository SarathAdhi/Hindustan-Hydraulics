import React, { useState } from "react";
import './Register.scss';
import axios from "axios";

export const Register = (props) => { 
    const [email, setEmail] = useState({});
    const [pass, setPass] = useState({});

    const signup = async () => {
        console.log(email);
        console.log(pass);
        const response =  await axios.post('/auth/signup', {first_name: 'John', last_name: 'Doe', mobile: 9999999999,email: email, password: pass});
        if(response.status === 201){
            console.log("Success");
            localStorage.setItem('token', response.data.data.tokens.access_token);
        }
        const token = localStorage.getItem('token');
        console.log(token);
        console.log(response);
    }


    const handleSubmit = (e) => {

        e.preventDefault();
        signup();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
             <div className="red-box">
             <img src='./images/SphereDesign-2.png' alt="logo" className="sphere-design-register" placeholder="sphere design"></img>

                <div className="gray-box-2">
                    <form onSubmit={handleSubmit}>
                        <img src='./images/Company logo.png' className="company-logo-1" alt="logo" placeholder="logo"></img>
                        <h2 className="r-header">Create an account</h2>
                        <h3 className="r-header-subtext">Let's get started.</h3>
                        <input name="name" id="name" placeholder="Full Name" className="r-name-form" />
                        <br></br>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" className="r-email-form"/>
                        <br></br>
                        <input onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" className="r-password-form"/>
                        <button className="register-button" type="submit">Sign Up</button>
                    </form>
                        
                    <button className="signin-switch" onClick={() => props.onFormSwitch('login')}>Already have an account? Sign In</button>
                </div>
            </div>
        </div>
    )
}  
export default Register