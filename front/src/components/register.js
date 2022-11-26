import '../css/login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function registerUser(e) {
        e.preventDefault();
        const userName = e.target[1].value;
        const password1 = e.target[2].value;
        const password2 = e.target[3].value;
        
        if (password1 !== password2) {
            setMessage("Passwords do not match.");
            return;
        }

        const url = "http://localhost:3000/user/create";
        const data = {username: userName, password: password1};
        const options = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(data),
        }

        fetch(url, options)
        .then(data => data.json())
        .then(response => {
            setMessage(response.message);
            props.closeRegisterPage();
        })
    }

    function getLoginPage() {
        props.setLoginPage();
        props.closeRegisterPage();
    }

    return (
        <div className="login-div">
            <div className="login-contents">
                <div className="close-btn-container" onClick={props.closeRegisterPage}>
                    <div className="close-btn scale-on-hover"></div>
                </div>
                <form className="login-form text-center" onSubmit={registerUser}>
                    <div className="login-form-item">
                        <p className="small-text">W&O</p>
                        <p className="medium-text">Create an account</p>
                        <p>Complete your sing up to receive a discount.</p>
                    </div>
                    <div className="login-form-item">
                        <label htmlFor="username"></label>
                        <input type="text" id="username" name="username" className="login-form-input" placeholder='Username'/>
                    </div>
                    <div className="login-form-item">
                        <label htmlFor="userPassword"></label>
                        <input type="password" id="userPassword" name="userPassword" autoComplete='userPassword' className="login-form-input" placeholder='Password'/>
                    </div>
                    <div className="login-form-item">
                        <label htmlFor="userPassword"></label>
                        <input type="password" id="userPassword" name="userPassword" autoComplete='userPassword' className="login-form-input" placeholder='Password confirm'/>
                    </div>
                    <div>
                        {message}
                    </div>
                    <div className="button-container">
                        <button type="submit" className="login-submit-btn"> Register</button>
                    </div> 
                    <div>
                        Already have an account?
                    </div>
                    <div className="button-container">
                        <p onClick={getLoginPage} className="scale-on-hover"> Log in </p>
                    </div> 
                </form>
                <div className="login-pic-container">
                    <div className="register-pic"></div>
                </div>
            </div>
        </div>
    )
}

export default Register;