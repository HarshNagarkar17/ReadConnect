import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api } from '../config/apis';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

export const Login = () => {
  const navigate = useNavigate();
  const { addToken, getToken } = useAuth();
  useEffect(() => {
    document.title = "Login Page"
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  function changeUser(value) {
    setUser(prevUser => ({
      ...prevUser,
      ...value
    }));
  }

  const saveUser = (e) => {
    e.preventDefault();
    axios({
      url: `${api}/auth/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: user
    }).then((data) => {
      const token = {
        access: data.data.token.access,
        refresh: data.data.token.refresh
      }
      addToken(token);
      navigate('/profile');

    })
      .catch((err) => {
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
      <h2>Login</h2>
      <form method="post" onSubmit={(e) => saveUser(e)}>
        <input type="text" name="email" id="email" onChange={(e) => changeUser({ email: e.target.value })} />
        <input type="text" name="password" id="password" onChange={(e) => changeUser({ password: e.target.value })} />
        <button>Login</button>
        <Link to="/register">register</Link>
        <Link to="/profile">profile</Link>
      </form>
      {error && <p>{error}</p>} {/* Display error message if error state is not empty */}
    </div>
  );
};
