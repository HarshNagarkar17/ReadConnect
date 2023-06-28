import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { api } from '../config/apis';

export const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const changeUser = (value) => {

        setUser(prevUser => ({
            ...prevUser,
            ...value
        }))
    }
    function saveUser(e) {
        e.preventDefault();

        axios({
            url: `${api}/auth/register`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: user
        }
        ).then((res) => {
            if (res.status === 200) {
                alert('Account created')
            }
        }).catch((err) => {
            if (err.response) {
                setError(err.response.data.error);
              } else {
                setError("An error occurred. Please try again.");
              }
              setTimeout(() => {
                setError("");
              }, 4000)
            
        })
    }
    return (
        <div>
            <h2>Register User</h2>
            <form method="get" onSubmit={(e) => saveUser(e)}>
                <input type="text" name="username" placeholder='username' onChange={(e) => changeUser({ username: e.target.value })} id="username" />
                <input type="text" name="email" id="email" placeholder='email' onChange={(e) => changeUser({ email: e.target.value })} />
                <input type="text" name="password" id="password" placeholder='password' onChange={(e) => changeUser({ password: e.target.value })} />
                <button>Register</button>
                <br />
                <Link to="/login">Login</Link>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}
