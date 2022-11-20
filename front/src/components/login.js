import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Login(props) {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function logUser(e) {
        e.preventDefault();
        const userName = e.target[1].value;
        const userPassword = e.target[2].value;
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
            props.closeLoginPage();
        })
    }

    return (
        <div className="login-div">
            <form className="login-form"  onSubmit={logUser}>
                <div type="button">
                    <button onClick={props.closeLoginPage}> close </button>
                </div>
                <div>
                Log in
                </div>
                <div>
                    <label htmlFor="username"></label>
                    <input type="text" id="username" name="username"/>
                </div>
                <div>
                    <label htmlFor="userPassword"></label>
                    <input type="password" id="userPassword" name="userPassword" autoComplete='userPassword'/>
                </div>
                <div className="button-container">
                    <button type="submit"> Log in</button>
                </div> 
                <div>
                    Do not have an account yet?
                </div>
                <div className="button-container">
                    <Link to="/user/register"><button> Create an account </button></Link>
                </div> 
                <div>
                    {message}
                </div>
            </form>
        </div>
    )
}

export default Login;