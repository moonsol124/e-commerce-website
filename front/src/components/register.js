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

    return (
        <div className="login-div">
            <form className="login-form" onSubmit={registerUser}>
                <div type="button">
                    <button onClick={props.closeRegisterPage}> close </button>
                </div>
                Register
                <div>
                    <label htmlFor="username"></label>
                    <input type="text" id="username" name="username"/>
                </div>
                <div>
                    <label htmlFor="userPassword"></label>
                    <input type="password" id="userPassword" name="userPassword" autoComplete='userPassword'/>
                </div>
                <div>
                    <label htmlFor="userPassword"></label>
                    <input type="password" id="userPassword" name="userPassword" autoComplete='userPassword'/>
                </div>
                <div>
                    {message}
                </div>
                <div className="button-container">
                    <button type="submit"> Register</button>
                </div> 
            </form>
        </div>
    )
}

export default Register;