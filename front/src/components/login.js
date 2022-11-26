import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Login(props) {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function logUser(e) {
        e.preventDefault();
        const userName = e.target[0].value;
        const userPassword = e.target[1].value;
        const url = "http://localhost:3000/user/login";
        
        const jsonBody = {username: userName, password: userPassword};
        const options = {
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(jsonBody),
        }

        fetch(url, options)
        .then(data => data.json())
        .then(response => {
            if (response.status !== 200) {
                setMessage(response.message);
                return;
            }
            const user = JSON.stringify(response.user); 
            props.setToken(response.token, user);
            props.setLoginPage();
        })
    }

    function getRegisterPage() {
        props.setRegisterPage();    
        props.setLoginPage();
    }

    return (
        <div className="login-div">
            <div className="login-contents">
                <div className="close-btn-container" onClick={props.setLoginPage}>
                    <div className="close-btn scale-on-hover"></div>
                </div>
                <form className="login-form text-center" onSubmit={logUser}>
                    <div className="login-form-item">
                        <p className="small-text">W&O</p>
                        <p className="medium-text">It's good to see you again.</p>
                        <p>Please log in to your account.</p>
                    </div>
                    <div className="login-form-item">
                        <label htmlFor="username"></label>
                        <input type="text" id="username" name="username" placeholder='Username' className="login-form-input"/>
                    </div>
                    <div className="login-form-item">
                        <label htmlFor="userPassword"></label>
                        <input type="password" id="userPassword" name="userPassword" autoComplete='userPassword' placeholder='Password' className="login-form-input"/>
                    </div>
                    <div>
                        {message}
                    </div>
                    <div className="button-container">
                        <button type="submit" className="login-submit-btn"> Log in</button>
                    </div> 
                    <div>
                        Do not have an account yet?
                    </div>
                    <div className="button-container">
                        <p onClick={getRegisterPage} className="scale-on-hover"> Sign up </p>
                    </div> 
                </form>
                <div className="login-pic-container">
                    <div className="login-pic"></div>
                </div>
            </div>
        </div>
    )
}

export default Login;