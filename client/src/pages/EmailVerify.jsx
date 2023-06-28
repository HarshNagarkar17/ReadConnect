import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../config/apis';

export const EmailVerify = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');


    const verify = (token) => {
        axios({
            url: `${api}/auth/verify-email?token=${token}`,
            method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
        }).then((res) => {
            console.log(res);
        })
    }

    const verifyUser = (e) => {
        e.preventDefault();
        verify(token);
    }
    return (
        <>
            <h2>Verify User</h2>
            <form onSubmit={(e) => verifyUser(e)}>
                <button>Verify</button>
                <p>{token}</p>
            </form>
        </>
    )
}
